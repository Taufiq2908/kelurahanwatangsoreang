/**
 * Session.js
 * Responsibilities: Create, Validate, and Destroy authentication sessions.
 */

const Session = {
  CACHE_PREFIX: 'SESS_C_',
  PROP_PREFIX: 'SESS_P_',

  /**
   * Creates a new session.
   * @param {string} userId 
   * @param {string} role 
   * @param {boolean} rememberMe 
   * @returns {string} The generated session token.
   */
  create: function(userId, role = 'superadmin', rememberMe = false) {
    const token = Crypto.generateSecureToken(AUTH_CONFIG.TOKEN_LENGTH_BYTES);
    const nowMs = new Date().getTime();
    const durationMs = (rememberMe ? AUTH_CONFIG.SESSION_REMEMBER_DAYS * 24 : AUTH_CONFIG.SESSION_DEFAULT_HOURS) * 60 * 60 * 1000;
    
    const sessionData = {
      userId: userId,
      role: role,
      createdAt: nowMs,
      expiresAt: nowMs + durationMs,
      lastActivity: nowMs
    };

    const sessionString = JSON.stringify(sessionData);

    // Save to PropertiesService (Persistent truth)
    PropertiesService.getScriptProperties().setProperty(this.PROP_PREFIX + token, sessionString);

    // Save to CacheService for fast lookup (max 6 hours)
    const cacheExpirySeconds = Math.floor(Math.min(21600, durationMs / 1000)); 
    CacheService.getScriptCache().put(this.CACHE_PREFIX + token, sessionString, cacheExpirySeconds);

    return token;
  },

  /**
   * Validates a token and updates the sliding idle timeout.
   * @param {string} token 
   * @returns {object|null} The session data if valid, or null if invalid/expired.
   */
  validate: function(token) {
    if (!token || typeof token !== 'string') return null;

    let sessionString = CacheService.getScriptCache().get(this.CACHE_PREFIX + token);
    let isFromCache = true;

    if (!sessionString) {
      // Fallback to PropertiesService
      sessionString = PropertiesService.getScriptProperties().getProperty(this.PROP_PREFIX + token);
      isFromCache = false;
    }

    if (!sessionString) return null; // Token not found

    try {
      const sessionData = JSON.parse(sessionString);
      const nowMs = new Date().getTime();

      // 1. Check Absolute Expiry
      if (nowMs > sessionData.expiresAt) {
        this.destroy(token);
        return null;
      }

      // 2. Check Idle Timeout
      const idleLimitMs = AUTH_CONFIG.IDLE_TIMEOUT_MINS * 60 * 1000;
      if (nowMs - sessionData.lastActivity > idleLimitMs) {
        this.destroy(token);
        return null;
      }

      // 3. Update Sliding Idle Expiry
      sessionData.lastActivity = nowMs;
      const updatedSessionString = JSON.stringify(sessionData);

      // Save back to PropertiesService async-like (fire and forget in GAS is synchronous, but fast enough for 1 key)
      PropertiesService.getScriptProperties().setProperty(this.PROP_PREFIX + token, updatedSessionString);

      // Save back to CacheService
      const remainingLifetime = Math.floor((sessionData.expiresAt - nowMs) / 1000);
      const cacheExpirySeconds = Math.min(21600, remainingLifetime);
      if (cacheExpirySeconds > 0) {
        CacheService.getScriptCache().put(this.CACHE_PREFIX + token, updatedSessionString, cacheExpirySeconds);
      }

      return sessionData;
    } catch (e) {
      AppLogger.error('Session', 'validate_ERROR', 'Failed to parse session data', e);
      this.destroy(token);
      return null;
    }
  },

  /**
   * Destroys a session.
   * @param {string} token 
   */
  destroy: function(token) {
    if (!token) return;
    try {
      CacheService.getScriptCache().remove(this.CACHE_PREFIX + token);
    } catch(e) {}
    try {
      PropertiesService.getScriptProperties().deleteProperty(this.PROP_PREFIX + token);
    } catch(e) {}
  },

  /**
   * Garbage collector for expired, malformed, or orphaned sessions.
   * @param {string} userId - The userId to enforce max active sessions.
   * @returns {object} Statistics of the cleanup process.
   */
  cleanup: function(userId) {
    const stats = { scanned: 0, deletedExpired: 0, deletedCorrupted: 0, remainingActive: 0 };
    let lock = null;
    
    try {
      lock = LockService.getScriptLock();
      // Try to acquire lock for up to 5 seconds
      if (!lock.tryLock(5000)) {
        AppLogger.warn('Session', 'CLEANUP_LOCK_TIMEOUT', 'Could not acquire lock for session cleanup, skipping.');
        return stats; // Fail-safe: skip cleanup if locked
      }

      const scriptProperties = PropertiesService.getScriptProperties();
      const allProps = scriptProperties.getProperties();
      const nowMs = new Date().getTime();
      
      // We safely fetch the idle limit, assuming AUTH_CONFIG exists
      const idleLimitMs = (typeof AUTH_CONFIG !== 'undefined' ? AUTH_CONFIG.IDLE_TIMEOUT_MINS : 30) * 60 * 1000;
      
      const activeSessionsForUser = [];

      for (const key in allProps) {
        if (key.startsWith(this.PROP_PREFIX)) {
          stats.scanned++;
          const token = key.substring(this.PROP_PREFIX.length);
          const sessionString = allProps[key];
          
          let isCorrupted = false;
          let isExpired = false;
          let sessionData = null;

          try {
            sessionData = JSON.parse(sessionString);
            
            // Validation Consistency Check
            if (!sessionData || !sessionData.userId || !sessionData.expiresAt || !sessionData.lastActivity || !sessionData.role) {
              isCorrupted = true;
            }
          } catch (e) {
            isCorrupted = true;
          }

          if (isCorrupted) {
            this.destroy(token);
            stats.deletedCorrupted++;
            continue;
          }

          // Expiry Check
          if (nowMs > sessionData.expiresAt || (nowMs - sessionData.lastActivity > idleLimitMs)) {
            isExpired = true;
          }

          if (isExpired) {
            this.destroy(token);
            stats.deletedExpired++;
            continue;
          }

          // Valid Session
          if (sessionData.userId === userId) {
            activeSessionsForUser.push({ token: token, lastActivity: sessionData.lastActivity });
          }
          stats.remainingActive++;
        }
      }

      // Max Sessions Enforcer
      const maxSessions = (typeof AUTH_CONFIG !== 'undefined' && AUTH_CONFIG.MAX_SESSIONS_PER_USER) ? AUTH_CONFIG.MAX_SESSIONS_PER_USER : 10;
      if (activeSessionsForUser.length > maxSessions) {
        // Sort by oldest lastActivity first
        activeSessionsForUser.sort((a, b) => a.lastActivity - b.lastActivity);
        const sessionsToDelete = activeSessionsForUser.length - maxSessions;
        
        for (let i = 0; i < sessionsToDelete; i++) {
          this.destroy(activeSessionsForUser[i].token);
          stats.remainingActive--;
        }
      }

    } catch (e) {
      // Complete fail-safe for the entire cleanup process
      AppLogger.error('Session', 'CLEANUP_ERROR', 'Session cleanup failed, bypassing.', e);
    } finally {
      if (lock) {
        try {
          lock.releaseLock();
        } catch(e) {}
      }
    }

    return stats;
  }
};
