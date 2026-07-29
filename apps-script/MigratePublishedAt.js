function migratePublishedAt() {
  const ssId = PropertiesService.getScriptProperties().getProperty('CMS_SPREADSHEET_ID');
  if (!ssId) {
    Logger.log("No CMS_SPREADSHEET_ID found.");
    return;
  }
  const ss = SpreadsheetApp.openById(ssId);
  const sheets = ['Berita', 'Edukasi', 'Pengumuman'];
  
  sheets.forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    if (!headers.includes('published_at')) {
      sheet.getRange(1, headers.length + 1).setValue('published_at');
      Logger.log("Added published_at to " + sheetName);
    } else {
      Logger.log("published_at already exists in " + sheetName);
    }
  });
}
