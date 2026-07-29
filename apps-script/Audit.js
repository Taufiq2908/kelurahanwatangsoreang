/**
 * Audit.js
 * Responsibilities: Security event logging, business logic logging to Google Sheets.
 */

const Audit = {
  /**
   * Logs an event to the 'Log' sheet.
   * @param {string} module e.g., 'AUTH', 'BERITA'
   * @param {string} action e.g., 'LOGIN_SUCCESS', 'UPDATE'
   * @param {string} userId The identifier of the user (e.g., 'admin') or IP if available
   * @param {string} description Human readable details
   */
  logEvent: function(module, action, userId, description) {
    try {
      const spreadsheet = getCmsSpreadsheetOrNull();
      if (!spreadsheet) return;
      const sheet = spreadsheet.getSheetByName('Log');
      if (sheet) {
        sheet.appendRow([now(), module, action, userId || 'SYSTEM', description]);
      }
    } catch (e) {
      AppLogger.error('Audit', 'logEvent_FAILED', description, e);
    }
  }
};
