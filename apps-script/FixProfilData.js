function fixProfilData() {
  const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('CMS_SPREADSHEET_ID'));
  const sheet = ss.getSheetByName('Profil');
  const data = sheet.getDataRange().getValues();
  data.forEach((row, i) => {
    if (row[1] === 'undefined' || row[1] === 'null') {
      sheet.getRange(i+1, 2).setValue('');
    }
  });
}
