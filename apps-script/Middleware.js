/**
 * Middleware.js
 * Responsibilities: Request validation, Session validation, Error catching, Standardizing API responses.
 */

const Middleware = {
  /**
   * Executes a backend function with full middleware protection.
   * @param {string} token 
   * @param {function} actionFn The function to execute if validation passes.
   * @returns {object} Standardized response { success, code, message, data, timestamp }
   */
  run: function(token, actionFn) {
    const timestamp = new Date().toISOString();

    try {
      // 1. Validate Token
      if (!token) {
        return this._formatResponse(false, 401, 'Unauthorized: Token missing', null, timestamp);
      }

      // 2. Validate Session
      const sessionData = Session.validate(token);
      if (!sessionData) {
        return this._formatResponse(false, 401, 'Unauthorized: Session expired or invalid', null, timestamp);
      }

      // 3. (Future) Validate Authorization / Role here
      // if (sessionData.role !== 'superadmin') { return 403 Forbidden }

      // 4. Execute Action
      const data = actionFn(sessionData);

      // 5. Return Success
      return this._formatResponse(true, 200, 'Success', data, timestamp);

    } catch (error) {
      // 6. Global Error Handler
      AppLogger.error('Middleware', 'EXECUTION_ERROR', error.message, error);
      return this._formatResponse(false, 500, 'Internal Server Error: ' + error.message, null, timestamp);
    }
  },

  /**
   * Executes an unauthenticated public backend function safely.
   */
  runPublic: function(actionFn) {
    const timestamp = new Date().toISOString();
    try {
      const data = actionFn();
      return this._formatResponse(true, 200, 'Success', data, timestamp);
    } catch (error) {
      AppLogger.error('Middleware', 'PUBLIC_EXECUTION_ERROR', error.message, error);
      return this._formatResponse(false, 500, 'Internal Server Error: ' + error.message, null, timestamp);
    }
  },

  _formatResponse: function(success, code, message, data, timestamp) {
    return {
      success: success,
      code: code,
      message: message,
      data: data,
      timestamp: timestamp
    };
  }
};
