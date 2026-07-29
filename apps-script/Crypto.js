/**
 * Crypto.js
 * Responsibilities: Password hashing, Salt generation, Random token generation, Constant time comparison.
 * Dependencies: Utilities (GAS built-in)
 */

const Crypto = {
  /**
   * Generates a cryptographically secure random token.
   * GAS does not have window.crypto.getRandomValues, so we use a combination of UUIDs and timestamps hashed via SHA-256 to create high entropy.
   * @param {number} lengthBytes Desired length in bytes.
   * @returns {string} Hex string of the token.
   */
  generateSecureToken: function(lengthBytes = 64) {
    let token = '';
    while (token.length < lengthBytes * 2) {
      const entropy = Utilities.getUuid() + new Date().getTime().toString() + Math.random().toString();
      const hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, entropy);
      token += hash.map(b => (b < 0 ? b + 256 : b).toString(16).padStart(2, '0')).join('');
    }
    return token.substring(0, lengthBytes * 2);
  },

  /**
   * Generates a random salt.
   * @param {number} lengthBytes 
   * @returns {string} Base64 encoded salt
   */
  generateSalt: function(lengthBytes = 32) {
    let bytes = [];
    while (bytes.length < lengthBytes) {
      const entropy = Utilities.getUuid() + Math.random().toString();
      const hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, entropy);
      bytes = bytes.concat(hash);
    }
    bytes = bytes.slice(0, lengthBytes);
    return Utilities.base64Encode(bytes);
  },

  /**
   * Computes PBKDF2 hash using HMAC-SHA256.
   * @param {string} password 
   * @param {string} saltBase64 
   * @param {number} iterations 
   * @returns {string} Base64 encoded hash
   */
  hashPassword: function(password, saltBase64, iterations = AUTH_CONFIG.PBKDF2_ITERATIONS) {
    const saltBytes = Utilities.base64Decode(saltBase64);
    let u = Utilities.computeHmacSha256Signature(Utilities.newBlob(password).getBytes(), saltBytes);
    let result = u;
    
    for (let i = 1; i < iterations; i++) {
      u = Utilities.computeHmacSha256Signature(u, saltBytes);
      for (let j = 0; j < result.length; j++) {
        result[j] ^= u[j];
      }
    }
    return Utilities.base64Encode(result);
  },

  /**
   * Compares two strings in constant time to prevent timing attacks.
   * @param {string} a 
   * @param {string} b 
   * @returns {boolean} True if they match exactly.
   */
  constantTimeCompare: function(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') return false;
    if (a.length !== b.length) return false;
    
    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= (a.charCodeAt(i) ^ b.charCodeAt(i));
    }
    return result === 0;
  }
};
