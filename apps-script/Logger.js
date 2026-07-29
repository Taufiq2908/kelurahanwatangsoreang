/** 
 * Logger.js
 * Responsibilities: System logging, console debugging, warnings, errors.
 * Note: Does not write to Google Sheets. Use Audit.js for that.
 */

const AppLogger = {
  info: function(module, action, description) {
    console.log(this._format('INFO', module, action, description));
  },
  
  warn: function(module, action, description) {
    console.warn(this._format('WARNING', module, action, description));
  },
  
  error: function(module, action, description, errorObj = null) {
    let msg = this._format('ERROR', module, action, description);
    if (errorObj) {
      msg += ' | Stack: ' + (errorObj.stack || JSON.stringify(errorObj));
    }
    console.error(msg);
  },

  _format: function(level, module, action, description) {
    return '[' + level + '] [' + module + '] ' + action + ': ' + description;
  }
};
