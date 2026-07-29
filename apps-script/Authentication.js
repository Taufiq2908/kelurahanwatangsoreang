/**
 * Authentication.js
 * Responsibilities: Login verification, brute force protection.
 */

const Authentication = {
  BF_PREFIX: 'BF_ATTEMPTS_',
  BF_LOCK_PREFIX: 'BF_LOCK_',
  ADMIN_USERNAME_KEY: 'ADMIN_USERNAME',
  ADMIN_HASH_KEY: 'ADMIN_HASH', // Format: saltBase64:pbkdf2HashBase64

  /**
   * Attempts to login a user.
   * @param {string} username 
   * @param {string} password 
   * @param {boolean} rememberMe 
   * @returns {object} { success: boolean, token: string|null, message: string }
   */
  login: function(username, password, rememberMe = false) {
    if (!username || !password) {
      return { success: false, message: 'Username dan Password wajib diisi.' };
    }

    // 1. Check Brute Force Lockout
    const cache = CacheService.getScriptCache();
    const lockKey = this.BF_LOCK_PREFIX + username;
    if (cache.get(lockKey)) {
      Audit.logEvent('AUTH', 'LOGIN_LOCKED', username, 'Account is temporarily locked due to multiple failed attempts.');
      return { success: false, message: 'Akun terkunci sementara karena terlalu banyak percobaan gagal. Coba lagi dalam 30 menit.' };
    }

    // 2. Fetch Stored Credentials
    const props = PropertiesService.getScriptProperties();
    const storedUsername = props.getProperty(this.ADMIN_USERNAME_KEY);
    const storedHashData = props.getProperty(this.ADMIN_HASH_KEY);

    if (!storedUsername || !storedHashData) {
      AppLogger.error('AUTH', 'NO_CREDENTIALS', 'Admin credentials are not configured in Script Properties.');
      return { success: false, message: 'Sistem belum dikonfigurasi. Hubungi Developer.' };
    }

    // 3. Constant Time Username Check (Prevents timing attacks on username enumeration)
    const isUsernameValid = Crypto.constantTimeCompare(username, storedUsername);

    // 4. Verify Password (Even if username is wrong, we still hash to prevent timing attacks)
    const [saltBase64, expectedHashBase64] = storedHashData.split(':');
    const computedHashBase64 = Crypto.hashPassword(password, saltBase64, AUTH_CONFIG.PBKDF2_ITERATIONS);
    const isPasswordValid = Crypto.constantTimeCompare(computedHashBase64, expectedHashBase64);

    if (isUsernameValid && isPasswordValid) {
      // Login Success
      // Clear brute force counters
      cache.remove(this.BF_PREFIX + username);
      cache.remove(lockKey);

      // Garbage Collect Old Sessions (Fail-safe)
      try {
        const stats = Session.cleanup(username);
        if (stats) {
          const logMessage = `\nSession Cleanup\nScanned : ${stats.scanned}\nExpired : ${stats.deletedExpired}\nCorrupted : ${stats.deletedCorrupted}\nRemaining : ${stats.remainingActive}`;
          AppLogger.info('AUTH', 'SESSION_CLEANUP', logMessage);
        }
      } catch (e) {
        AppLogger.error('AUTH', 'SESSION_CLEANUP_FAILED', 'Bypassing session cleanup error to allow login.', e);
      }

      // Create Session
      const token = Session.create(username, 'superadmin', rememberMe);
      Audit.logEvent('AUTH', 'LOGIN_SUCCESS', username, 'User logged in successfully.');
      
      return { success: true, token: token, message: 'Login berhasil.' };
    } else {
      // Login Failed - Increment Brute Force Counter
      const attemptsKey = this.BF_PREFIX + username;
      let attempts = parseInt(cache.get(attemptsKey) || '0', 10);
      attempts += 1;
      
      if (attempts >= AUTH_CONFIG.MAX_LOGIN_ATTEMPTS) {
        // Lock account for 30 minutes
        cache.put(lockKey, 'LOCKED', AUTH_CONFIG.LOCKOUT_DURATION_MINS * 60);
        Audit.logEvent('AUTH', 'LOGIN_LOCKED', username, 'Max login attempts reached.');
      } else {
        cache.put(attemptsKey, attempts.toString(), 3600); // Store attempts for 1 hour
      }

      Audit.logEvent('AUTH', 'LOGIN_FAILED', username, 'Invalid username or password.');
      return { success: false, message: 'Username atau Password salah.' };
    }
  },

  /**
   * Logs out a user by destroying their session token.
   * @param {string} token 
   */
  logout: function(token) {
    if (!token) return { success: true };
    const sessionData = Session.validate(token);
    if (sessionData) {
      Audit.logEvent('AUTH', 'LOGOUT', sessionData.userId, 'User logged out explicitly.');
      Session.destroy(token);
    }
    return { success: true, message: 'Logout berhasil.' };
  },

  /**
   * Utility script for developer to setup initial admin account.
   * Do NOT expose this to the frontend. Run this once from Apps Script Editor.
   */
  setupAdminAccount: function(username, password) {
    const salt = Crypto.generateSalt();
    const hash = Crypto.hashPassword(password, salt, AUTH_CONFIG.PBKDF2_ITERATIONS);
    const hashData = salt + ':' + hash;

    PropertiesService.getScriptProperties().setProperties({
      [this.ADMIN_USERNAME_KEY]: username,
      [this.ADMIN_HASH_KEY]: hashData
    });
    
    AppLogger.info('AUTH', 'SETUP_ADMIN', 'Admin credentials have been updated.');
    return 'Admin setup complete.';
  }
};
