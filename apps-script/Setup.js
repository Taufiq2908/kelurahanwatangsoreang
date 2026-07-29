/** Coordinates the idempotent CMS initialization workflow. */
function initializeCms() {
  const spreadsheet = getOrCreateSpreadsheet();
  const sheets = createSheets(spreadsheet);

  createHeaders(sheets);
  formatSheets(sheets);
  createValidation(sheets);

  const folderIds = createFolders();
  insertSettings(sheets.Settings, folderIds, spreadsheet);
  insertSystemSettings(sheets.System, spreadsheet);
  appendLog(sheets.Log, 'Setup', 'Initialize CMS', 'CMS initialization completed');

  const result = {
    spreadsheetId: spreadsheet.getId(),
    spreadsheetUrl: spreadsheet.getUrl(),
    folderIds: folderIds,
  };

  Audit.logEvent('Setup', 'Initialize CMS', (typeof session !== 'undefined' ? session.userId : 'SYSTEM'), 'CMS initialization completed.');
  Logger.log(JSON.stringify(result, null, 2));
  return result;
}
