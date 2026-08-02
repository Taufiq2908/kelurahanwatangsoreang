function debugBerita() {
  const ss = SpreadsheetApp.openById(CMS_CONFIG.spreadsheetId);
  const sheet = ss.getSheetByName('Berita');
  const data = sheet.getDataRange().getValues();
  return JSON.stringify(data);
}
