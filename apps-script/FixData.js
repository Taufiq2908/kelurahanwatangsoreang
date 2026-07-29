
function fixCorruptedBerita() {
  const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("CMS_SPREADSHEET_ID"));
  const bSheet = ss.getSheetByName("Berita");
  if (!bSheet || bSheet.getLastRow() <= 1) return;
  const data = bSheet.getRange(2, 1, bSheet.getLastRow() - 1, bSheet.getLastColumn()).getValues();
  
  const newData = data.map(row => {
    // If deleted_at contains "publish", we know it is shifted.
    if (row[11] === "publish" || row[11] === "draft") {
      // old data layout:
      // 0: id
      // 1: slug
      // 2: title
      // 3: content
      // 4: image
      // 5: category (currently at 5, but should be at 7)
      // 6: author (should be at 8)
      // 7: published_at (should be at 9)
      // 8: updated_at (should be at 10)
      // 9: deleted_at (should be at 11)
      // 10: status (should be at 13)
      
      const newRow = new Array(14).fill("");
      newRow[0] = row[0];
      newRow[1] = row[1];
      newRow[2] = row[2];
      newRow[3] = row[3];
      newRow[4] = row[4];
      // image_public_id and image_provider stay empty
      newRow[7] = row[5]; // category
      newRow[8] = row[6]; // author
      newRow[9] = row[7]; // published_at
      newRow[10] = row[8]; // updated_at
      newRow[11] = row[9]; // deleted_at (empty)
      newRow[12] = ""; // tags
      newRow[13] = row[11]; // status ("publish" or "draft")
      return newRow;
    }
    return row.slice(0, 14);
  });
  
  bSheet.getRange(2, 1, newData.length, 14).setValues(newData);
}



function fixAparatur() {
  const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('CMS_SPREADSHEET_ID'));
  const sheet = ss.getSheetByName('Aparatur');
  if (!sheet || sheet.getLastRow() <= 1) return;
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  const newData = data.map(row => {
    if (row[8] && row[8].toString().includes('T')) {
      const newRow = new Array(12).fill('');
      newRow[0] = row[0];
      newRow[1] = row[1];
      newRow[2] = row[2];
      newRow[3] = row[3];
      newRow[6] = row[4];
      newRow[7] = row[5];
      newRow[8] = row[6];
      newRow[9] = row[7];
      newRow[10] = row[8];
      newRow[11] = row[9];
      return newRow;
    }
    return row.slice(0, 12);
  });
  sheet.getRange(2, 1, newData.length, 12).setValues(newData);
}
