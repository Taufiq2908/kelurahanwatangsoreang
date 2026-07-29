function migratePetaSchema() {
  const spreadsheet = getCmsSpreadsheetOrNull();
  if (!spreadsheet) return;
  
  const sheet = spreadsheet.getSheetByName('Peta');
  if (!sheet) return;
  
  const legacyHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const expectedHeaders = CMS_CONFIG.sheets['Peta'];
  
  if (legacyHeaders.join('|') === expectedHeaders.join('|')) {
    Logger.log("Peta already migrated");
    return;
  }
  
  const lastRow = sheet.getLastRow();
  const records = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, legacyHeaders.length).getValues() : [];
  
  sheet.clear();
  sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
  
  if (records.length > 0) {
    const newData = records.map(row => {
      const oldObj = {};
      legacyHeaders.forEach((h, i) => oldObj[h] = row[i]);
      
      const newRow = expectedHeaders.map(h => {
        if (h === 'id') return oldObj.id;
        if (h === 'slug') return oldObj.name ? oldObj.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
        if (h === 'name') return oldObj.name || '';
        if (h === 'category_id') return '';
        if (h === 'description') return oldObj.description || '';
        if (h === 'address') return oldObj.address || '';
        if (h === 'geometry_type') return 'Point';
        if (h === 'geometry_coordinates') return '';
        if (h === 'latitude') return '';
        if (h === 'longitude') return '';
        if (h === 'images') return '';
        if (h === 'phone') return '';
        if (h === 'website') return '';
        if (h === 'opening_hours') return '';
        if (h === 'display_order') return 0;
        if (h === 'featured') return 'FALSE';
        if (h === 'status') return oldObj.status || 'draft';
        if (h === 'created_at') return oldObj.created_at || new Date();
        if (h === 'updated_at') return oldObj.updated_at || new Date();
        if (h === 'deleted_at') return oldObj.deleted_at || '';
        return '';
      });
      return newRow;
    });
    
    sheet.getRange(2, 1, newData.length, expectedHeaders.length).setValues(newData);
  }
  
  // Create PetaKategori if not exists
  if (!spreadsheet.getSheetByName('PetaKategori')) {
    const katSheet = spreadsheet.insertSheet('PetaKategori');
    katSheet.getRange(1, 1, 1, CMS_CONFIG.sheets['PetaKategori'].length).setValues([CMS_CONFIG.sheets['PetaKategori']]);
  }
  
  Logger.log("Peta migration complete");
}
