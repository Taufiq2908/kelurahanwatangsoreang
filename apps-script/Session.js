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
      return null;
    }
  },

  /**
   * Destroys a session.
   * @param {string} token 
   */
  destroy: function(token) {
    if (!token) return;
    CacheService.getScriptCache().remove(this.CACHE_PREFIX + token);
    PropertiesService.getScriptProperties().deleteProperty(this.PROP_PREFIX + token);
  }
};
