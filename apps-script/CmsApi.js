/** 
 * CMS API Endpoints - dipanggil melalui google.script.run dari CMS UI 
 */

// --- UTILITIES UNTUK PAGINATION & FILTERING ---

function processRecords(records, options) {
  options = options || {};
  let result = records.filter(r => !r.deleted_at);

  if (options.status) {
    result = result.filter(r => r.status && r.status.toLowerCase() === options.status.toLowerCase());
  }

  if (options.search) {
    const q = options.search.toLowerCase();
    result = result.filter(r => {
      return Object.values(r).some(val => String(val).toLowerCase().includes(q));
    });
  }

  // Sorting
  if (options.sortBy) {
    const sortField = options.sortBy;
    const sortOrder = options.sortOrder === 'asc' ? 1 : -1;
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (valA === valB) return 0;
      if (!valA) return sortOrder;
      if (!valB) return -sortOrder;
      return valA > valB ? sortOrder : -sortOrder;
    });
  } else {
    // default sort by date descending (assuming id/created_at/published_at)
    result.sort((a, b) => {
      const dateA = new Date(a.published_at || a.created_at || 0);
      const dateB = new Date(b.published_at || b.created_at || 0);
      return dateB - dateA;
    });
  }

  const total = result.length;
  
  if (options.limit) {
    const page = options.page || 1;
    const offset = (page - 1) * options.limit;
    result = result.slice(offset, offset + options.limit);
  }

  // Strip heavy fields to prevent V8 RPC payload crash during list fetch
  result = result.map(r => {
    const clone = Object.assign({}, r);
    delete clone.content;
    delete clone.body;
    delete clone.html_content;
    return clone;
  });

  return {
    items: result,
    total: total,
    page: options.page || 1,
    limit: options.limit || total
  };
}

// --- CMS CRUD OPERATIONS ---

function cmsUploadFile(token, base64Data, filename, mimeType, folderCategory) {
  return Middleware.run(token, (session) => {
  Logger.log("=== cmsUploadFile START ===");
  Logger.log("Source file: CmsApi.gs");
  Logger.log("Deployment marker: CLOUDINARY_FIX_V2");
  Logger.log("Provider about to be used: cloudinary (via Storage.uploadFile)");
  
    const result = Storage.uploadFile(base64Data, filename, mimeType, folderCategory);
  
  Logger.log(JSON.stringify(result));
  return result;
  });
}

function cmsDeleteFile(token, publicId, provider) {
  return Middleware.run(token, (session) => {
    return Storage.deleteFile(publicId, provider);
  });
}

function cmsGetRecords(token, sheetName, options = {}) {
  return Middleware.run(token, (session) => {
    const spreadsheet = getCmsSpreadsheetOrNull();
  if (!spreadsheet) throw new Error("CMS belum diinisialisasi.");
  
  const records = getSheetRecords(spreadsheet, sheetName, false);
  return processRecords(records, options);
  });
}

function cmsGetRecord(token, sheetName, id) {
  return Middleware.run(token, (session) => {
    const spreadsheet = getCmsSpreadsheetOrNull();
  const records = getSheetRecords(spreadsheet, sheetName, false);
  const record = records.find(r => String(r.id) === String(id) && !r.deleted_at);
  if (!record) throw new Error("Data tidak ditemukan.");
  return record;
  });
}

function cmsCreateRecord(token, sheetName, data) {
  return Middleware.run(token, (session) => {
    const spreadsheet = getCmsSpreadsheetOrNull();
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    if (typeof CMS_CONFIG !== 'undefined' && CMS_CONFIG.sheets && CMS_CONFIG.sheets[sheetName]) {
      sheet = spreadsheet.insertSheet(sheetName);
    } else {
      throw new Error("Sheet tidak ditemukan: " + sheetName);
    }
  }

  const headers = getExistingHeaders(sheet);
  const newRow = [];
  const timestamp = toISO(now());
  const newId = generateUUID();

  // Autoslug handling
  if ((sheetName === 'Berita' || sheetName === 'Edukasi') && data.title) {
    data.slug = generateUniqueSlug(spreadsheet, sheetName, data.title);
  }

  data.id = newId;
  if (headers.includes('created_at')) data.created_at = timestamp;
  if (headers.includes('updated_at')) data.updated_at = timestamp;
  
  // Published_at handling
  if (headers.includes('published_at')) {
    if (!data.published_at && data.status === 'publish') {
      data.published_at = timestamp;
    }
  }
  
  if (sheetName === 'Laporan') {
    data.tracking_code = generateTrackingCode();
  }

  for (let i = 0; i < headers.length; i++) {
    const key = headers[i];
    const lowerKey = key.toLowerCase();
    const dataKey = Object.keys(data).find(k => k.toLowerCase() === lowerKey);
    
    let value = dataKey !== undefined && data[dataKey] !== undefined ? data[dataKey] : '';
    if ((lowerKey.includes('phone') || lowerKey.includes('kontak') || lowerKey.includes('telp')) && typeof value === 'string' && value.startsWith('0')) {
      value = "'" + value;
    }
    newRow.push(value);
  }

  sheet.appendRow(newRow);
  const appendedRow = sheet.getRange(sheet.getLastRow(), 1, 1, headers.length);
  appendedRow.clearDataValidations();
  
  clearApiCache(sheetName);
  Audit.logEvent('CMS', 'Create ' + sheetName, (typeof session !== 'undefined' ? session.userId : 'SYSTEM'), 'User ' + session.userId + ' created record ' + newId);
  return { id: newId, ...data };
  });
}

function cmsUpdateRecord(token, sheetName, id, data) {
  return Middleware.run(token, (session) => {
    const spreadsheet = getCmsSpreadsheetOrNull();
  const sheet = spreadsheet.getSheetByName(sheetName);
  
  const headers = getExistingHeaders(sheet);
  const lastRow = sheet.getLastRow();
  const allData = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  
  const timestamp = toISO(now());
  
  for (let i = 0; i < allData.length; i++) {
    if (String(allData[i][headers.indexOf('id')]) === String(id)) {
      // Autoslug handling if title changed and not published yet
      if ((sheetName === 'Berita' || sheetName === 'Edukasi') && data.title) {
        const currentStatus = String(allData[i][headers.indexOf('status')]).toLowerCase();
        const currentTitle = String(allData[i][headers.indexOf('title')]);
        if (currentStatus !== 'publish' && data.title !== currentTitle) {
          data.slug = generateUniqueSlug(spreadsheet, sheetName, data.title, id);
        }
      }

      data.updated_at = timestamp;
      
      const fieldsToCheck = headers.filter(h => h.endsWith('_public_id'));
      fieldsToCheck.forEach(publicIdField => {
        const baseField = publicIdField.replace('_public_id', '');
        const providerField = baseField + '_provider';
        
        if (data[publicIdField] !== undefined) {
          const oldPublicId = allData[i][headers.indexOf(publicIdField)];
          const oldProvider = allData[i][headers.indexOf(providerField)];
          
          if (oldPublicId && oldPublicId !== data[publicIdField] && oldProvider === 'cloudinary') {
            try {
              Storage.deleteFile(oldPublicId, oldProvider);
            } catch (e) {
              AppLogger.warn('CMS', 'Delete Orphaned Media', `Failed to delete ${oldPublicId}: ${e.message}`);
            }
          }
        }
      });
      
      const rowIndex = i + 2;
      for (let j = 0; j < headers.length; j++) {
        const key = headers[j];
        const lowerKey = key.toLowerCase();
        const dataKey = Object.keys(data).find(k => k.toLowerCase() === lowerKey);
        
        if (dataKey !== undefined && data[dataKey] !== undefined) {
          let value = data[dataKey];
          if ((lowerKey.includes('phone') || lowerKey.includes('kontak') || lowerKey.includes('telp')) && typeof value === 'string' && value.startsWith('0')) {
            value = "'" + value;
          }
          const cell = sheet.getRange(rowIndex, j + 1);
          cell.clearDataValidations();
          cell.setValue(value);
        }
      }
      clearApiCache(sheetName);
      Audit.logEvent('CMS', 'Update ' + sheetName, (typeof session !== 'undefined' ? session.userId : 'SYSTEM'), 'User ' + session.userId + ' updated record ' + id);
      return { id: id, ...data };
    }
  }
  
  throw new Error("Data tidak ditemukan.");
  });
}

function cmsDeleteRecord(token, sheetName, id) {
  return Middleware.run(token, (session) => {
    const spreadsheet = getCmsSpreadsheetOrNull();
  const sheet = spreadsheet.getSheetByName(sheetName);
  
  const headers = getExistingHeaders(sheet);
  const lastRow = sheet.getLastRow();
  const allData = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  
  for (let i = 0; i < allData.length; i++) {
    if (String(allData[i][headers.indexOf('id')]) === String(id)) {
      const rowIndex = i + 2;
      if (headers.includes('deleted_at')) {
        // Soft delete
        const cell = sheet.getRange(rowIndex, headers.indexOf('deleted_at') + 1);
        cell.clearDataValidations();
        cell.setValue(toISO(now()));
      } else {
        // Fallback hard delete (should not happen with new schema)
        sheet.deleteRow(rowIndex);
      }
      clearApiCache(sheetName);
      SpreadsheetApp.flush();
      Audit.logEvent('CMS', 'Delete ' + sheetName, (typeof session !== 'undefined' ? session.userId : 'SYSTEM'), 'User ' + session.userId + ' deleted record ' + id);
      return { success: true };
    }
  }
  
  throw new Error("Data tidak ditemukan.");
  });
}

function generateUniqueSlug(spreadsheet, sheetName, title, excludeId = null) {
  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  const records = getSheetRecords(spreadsheet, sheetName, false);
  let counter = 2;
  
  while (true) {
    const exists = records.find(r => r.slug === slug && String(r.id) !== String(excludeId));
    if (!exists) break;
    slug = baseSlug + '-' + counter;
    counter++;
  }
  
  return slug;
}

function clearApiCache(sheetName) {
  try {
    PropertiesService.getScriptProperties().setProperty('DATA_VERSION', String(Date.now()));
  } catch(e) {
    console.error("Failed to clear cache", e);
  }
}

function cmsGetTrashRecords(token) {
  return Middleware.run(token, (session) => {
    const spreadsheet = getCmsSpreadsheetOrNull();
  
  const sheets = ['Berita', 'Pengumuman', 'Edukasi', 'Laporan'];
  let trash = [];
  
  sheets.forEach(sheetName => {
    const sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) return;
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const delIdx = headers.indexOf('deleted_at');
    if (delIdx === -1) return;
    
    const idIdx = headers.indexOf('id');
    const titleIdx = headers.indexOf('title') !== -1 ? headers.indexOf('title') : headers.indexOf('tracking_code');
    
    const data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
    data.forEach(row => {
      if (row[delIdx]) {
        trash.push({
          id: row[idIdx],
          sheet: sheetName,
          title: titleIdx !== -1 ? row[titleIdx] : 'Unknown',
          deleted_at: row[delIdx]
        });
      }
    });
  });
  
  trash.sort((a, b) => new Date(b.deleted_at) - new Date(a.deleted_at));
  return trash;
  });
}

function cmsRestoreRecord(token, sheetName, id) {
  return Middleware.run(token, (session) => {
    const spreadsheet = getCmsSpreadsheetOrNull();
  const sheet = spreadsheet.getSheetByName(sheetName);
  const headers = getExistingHeaders(sheet);
  const delIdx = headers.indexOf('deleted_at');
  
  if (delIdx === -1) throw new Error("Tidak mendukung restore.");
  
  const lastRow = sheet.getLastRow();
  const data = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  
  for (let i = 0; i < data.length; i++) {
    if (String(data[i][headers.indexOf('id')]) === String(id)) {
      sheet.getRange(i + 2, delIdx + 1).setValue(''); // Clear deleted_at
      clearApiCache(sheetName);
      Audit.logEvent('CMS', 'Restore ' + sheetName, (typeof session !== 'undefined' ? session.userId : 'SYSTEM'), 'User ' + session.userId + ' restored record ' + id);
      return { success: true };
    }
  }
  throw new Error("Data tidak ditemukan.");
  });
}

function cmsHardDeleteRecord(token, sheetName, id) {
  return Middleware.run(token, (session) => {
    const spreadsheet = getCmsSpreadsheetOrNull();
  const sheet = spreadsheet.getSheetByName(sheetName);
  const headers = getExistingHeaders(sheet);
  
  const lastRow = sheet.getLastRow();
  const data = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  
  for (let i = 0; i < data.length; i++) {
    if (String(data[i][headers.indexOf('id')]) === String(id)) {
      // Delete associated media
      const fieldsToCheck = headers.filter(h => h.endsWith('_public_id'));
      fieldsToCheck.forEach(publicIdField => {
        const baseField = publicIdField.replace('_public_id', '');
        const providerField = baseField + '_provider';
        const oldPublicId = data[i][headers.indexOf(publicIdField)];
        const oldProvider = data[i][headers.indexOf(providerField)];
        if (oldPublicId && oldProvider === 'cloudinary') {
          try {
            Storage.deleteFile(oldPublicId, oldProvider);
          } catch (e) {
             AppLogger.warn('CMS', 'Delete Orphaned Media', `Failed to delete ${oldPublicId}: ${e.message}`);
          }
        }
      });

      sheet.deleteRow(i + 2);
      clearApiCache(sheetName);
      Audit.logEvent('CMS', 'Hard Delete ' + sheetName, (typeof session !== 'undefined' ? session.userId : 'SYSTEM'), 'User ' + session.userId + ' permanently deleted record ' + id);
      return { success: true };
    }
  }
  throw new Error("Data tidak ditemukan.");
  });
}


// --- PROFIL ---
function cmsGetProfil(token) {
  return Middleware.run(token, (session) => {
    const spreadsheet = getCmsSpreadsheetOrNull();
  const sheet = spreadsheet.getSheetByName('Profil');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return {};
  const data = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
  const result = {};
  data.forEach(row => {
    if (row[0]) result[row[0]] = row[1];
  });
  return result;
  });
}

function cmsUpdateProfil(token, payload) {
  return Middleware.run(token, (session) => {
  Logger.log("=== STEP 3: cmsUpdateProfil START ===");
  Logger.log("Payload received: " + JSON.stringify(payload));
  
    const spreadsheet = getCmsSpreadsheetOrNull();
  const sheet = spreadsheet.getSheetByName('Profil');
  const headers = getExistingHeaders(sheet);
  const lastRow = sheet.getLastRow();
  
  const timestamp = toISO(now());
  const data = lastRow < 2 ? [] : sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  const rowsByKey = {};
  data.forEach((row, i) => { rowsByKey[row[0]] = i + 2; });
  
  const oldPublicId = rowsByKey['leader_photo_public_id'] ? data[rowsByKey['leader_photo_public_id'] - 2][1] : null;
  const oldProvider = rowsByKey['leader_photo_provider'] ? data[rowsByKey['leader_photo_provider'] - 2][1] : null;

  if (payload['leader_photo_public_id'] !== undefined && oldPublicId && oldPublicId !== payload['leader_photo_public_id'] && oldProvider === 'cloudinary') {
    try {
      Storage.deleteFile(oldPublicId, oldProvider);
    } catch (e) {
       AppLogger.warn('CMS', 'Delete Orphaned Media', `Failed to delete ${oldPublicId}: ${e.message}`);
    }
  }
  
  Logger.log("=== STEP 4: BEFORE SETVALUES ===");
  Object.keys(payload).forEach(key => {
    const value = payload[key];
    const row = rowsByKey[key];
    if (row) {
      Logger.log("Updating row: " + row + " | key: " + key + " | value: " + value);
      sheet.getRange(row, 2, 1, 2).setValues([[value, timestamp]]);
    } else {
      Logger.log("Appending new row | key: " + key + " | value: " + value);
      sheet.appendRow([key, value, timestamp]);
      rowsByKey[key] = sheet.getLastRow();
    }
  });
  
  Logger.log("=== STEP 5: SPREADSHEET READ AFTER SAVE ===");
  SpreadsheetApp.flush();
  const checkData = sheet.getDataRange().getValues();
  checkData.forEach((r, i) => {
    if (r[0] === 'leader_photo' || r[0] === 'leader_photo_public_id' || r[0] === 'leader_photo_provider') {
      Logger.log("Row " + (i+1) + ": " + r[0] + " = " + r[1]);
    }
  });
  
  clearApiCache('Profil');
  Audit.logEvent('CMS', 'Update Profil', (typeof session !== 'undefined' ? session.userId : 'SYSTEM'), 'User ' + session.userId + ' updated Profil settings');
  return { success: true };
  });
}

// --- KONTAK ---
function cmsGetKontak(token, options) { return cmsGetRecords(token, 'Kontak', options); }
function cmsCreateKontak(token, data) { return cmsCreateRecord(token, 'Kontak', data); }
function cmsUpdateKontak(token, id, data) { return cmsUpdateRecord(token, 'Kontak', id, data); }
function cmsDeleteKontak(token, id) { return cmsDeleteRecord(token, 'Kontak', id); }
function cmsRestoreKontak(token, id) { return cmsRestoreRecord(token, 'Kontak', id); }

// --- APARATUR ---
function cmsGetAparatur(token, options) { return cmsGetRecords(token, 'Aparatur', options); }
function cmsCreateAparatur(token, data) { return cmsCreateRecord(token, 'Aparatur', data); }
function cmsUpdateAparatur(token, id, data) { return cmsUpdateRecord(token, 'Aparatur', id, data); }
function cmsDeleteAparatur(token, id) { return cmsDeleteRecord(token, 'Aparatur', id); }
function cmsRestoreAparatur(token, id) { return cmsRestoreRecord(token, 'Aparatur', id); }

// --- LAYANAN ---
function cmsGetLayanan(token, options) { return cmsGetRecords(token, 'Layanan', options); }
function cmsCreateLayanan(token, data) { return cmsCreateRecord(token, 'Layanan', data); }
function cmsUpdateLayanan(token, id, data) { return cmsUpdateRecord(token, 'Layanan', id, data); }
function cmsDeleteLayanan(token, id) { return cmsDeleteRecord(token, 'Layanan', id); }

// --- FAQ ---
function cmsGetFaq(token, options) { return cmsGetRecords(token, 'FAQ', options); }
function cmsCreateFaq(token, data) { return cmsCreateRecord(token, 'FAQ', data); }
function cmsUpdateFaq(token, id, data) { return cmsUpdateRecord(token, 'FAQ', id, data); }
function cmsDeleteFaq(token, id) { return cmsDeleteRecord(token, 'FAQ', id); }

// --- PETA ---
function cmsGetPeta(token, options) { return cmsGetRecords(token, 'Peta', options); }
function cmsCreatePeta(token, data) { return cmsCreateRecord(token, 'Peta', data); }
function cmsUpdatePeta(token, id, data) { return cmsUpdateRecord(token, 'Peta', id, data); }
function cmsDeletePeta(token, id) { return cmsDeleteRecord(token, 'Peta', id); }

function ping() {
  return Middleware.runPublic(() => {
    return {
      ok: true,
      timestamp: new Date()
    };
  });
}

// --- DASHBOARD ---
function cmsGetDashboardStats(token) {
  return Middleware.run(token, (session) => {
    const spreadsheet = getCmsSpreadsheetOrNull();
    
    function countActive(sheetName) {
      const sheet = spreadsheet.getSheetByName(sheetName);
      if (!sheet) return 0;
      const lastRow = sheet.getLastRow();
      if (lastRow < 2) return 0;
      
      const lastCol = sheet.getLastColumn();
      if (lastCol === 0) return 0;
      
      const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
      const deletedIdx = headers.indexOf('deleted_at');
      
      // Read ID column (Column A)
      const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
      
      let deletedData = null;
      if (deletedIdx !== -1) {
        deletedData = sheet.getRange(2, deletedIdx + 1, lastRow - 1, 1).getValues();
      }
      
      let count = 0;
      for (let i = 0; i < ids.length; i++) {
        if (!ids[i][0]) continue; // Skip empty IDs
        if (deletedData && deletedData[i][0]) continue; // Skip deleted
        count++;
      }
      return count;
    }
    
    const stats = {
      berita: countActive('Berita'),
      pengumuman: countActive('Pengumuman'),
      laporan: countActive('Laporan'),
      layanan: countActive('Layanan'),
      peta: countActive('Peta'),
      edukasi: countActive('Edukasi')
    };
    return stats;
  });
}

function cmsGetRecentLogs(token, limit = 10) {
  return Middleware.run(token, (session) => {
    const spreadsheet = getCmsSpreadsheetOrNull();
    const sheet = spreadsheet.getSheetByName('Log');
    if (!sheet) return [];
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return [];
    
    const startRow = Math.max(2, lastRow - limit + 1);
    const numRows = lastRow - startRow + 1;
    const data = sheet.getRange(startRow, 1, numRows, 5).getValues();
    
    return data.map(row => ({
      timestamp: row[0],
      level: row[1],
      module: row[2],
      action: row[3],
      message: row[4]
    })).reverse();
  });
}

function cmsGetSystemHealth(token) {
  return Middleware.run(token, (session) => {
    const spreadsheet = getCmsSpreadsheetOrNull();
    const health = {
      apps_script: 'OK',
      google_sheets: spreadsheet ? 'OK' : 'ERROR',
      auth: 'OK'
    };
    return health;
  });
}

// --- PETA KATEGORI ---
function cmsGetPetaKategori(token, options) { return cmsGetRecords(token, 'PetaKategori', options); }
function cmsCreatePetaKategori(token, data) { return cmsCreateRecord(token, 'PetaKategori', data); }
function cmsUpdatePetaKategori(token, id, data) { return cmsUpdateRecord(token, 'PetaKategori', id, data); }
function cmsDeletePetaKategori(token, id) { return cmsDeleteRecord(token, 'PetaKategori', id); }

// --- MAPS EXTRACTION ---
function cmsExtractGoogleMapsUrl(token, url) {
  console.log("TOKEN", token);
  console.log("URL", url);
  return Middleware.run(token, (session) => {
    if (!url || !url.startsWith('http')) throw new Error('Invalid URL');
    
    try {
      let lat = null;
      let lng = null;
      
      const extractFromText = (rawText) => {
        let text = rawText;
        try { text = decodeURIComponent(rawText); } catch(e) {}
        
        // Priority 1: Exact PIN location from 3d/4d parameters
        let match = text.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
        if (match) return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
        
        // Priority 2: Map center from @ or ll= or q=
        match = text.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (match) return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
        match = text.match(/center=(-?\d+\.\d+)%2C(-?\d+\.\d+)/);
        if (match) return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
        match = text.match(/ll=(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (match) return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
        match = text.match(/q=(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (match) return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
        match = text.match(/APP_INITIALIZATION_STATE=\[\[\[\[(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (match) return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) }; 
        return null;
      };

      // 1. Try from URL directly
      let coords = extractFromText(url);
      if (coords) {
        console.log("SUCCESS");
        console.log("COORDS", coords);
        return { success: true, latitude: coords.lat, longitude: coords.lng };
      }

      // 2. If short URL, try fetching the redirect location
      if (url.includes('goo.gl') || url.includes('maps.app')) {
        const redirRes = UrlFetchApp.fetch(url, {
          followRedirects: false,
          muteHttpExceptions: true
        });
        const headers = redirRes.getHeaders();
        const location = headers['Location'] || headers['location'];
        if (location) {
          coords = extractFromText(location);
          if (coords) {
            console.log("SUCCESS");
        console.log("COORDS", coords);
        return { success: true, latitude: coords.lat, longitude: coords.lng };
          }
          // Update URL to the resolved location for the next step
          url = location;
          console.log("LOCATION", location);
        }
      }
      
      // 3. Fallback: fetch HTML and search
      const response = UrlFetchApp.fetch(url, {
        followRedirects: true,
        muteHttpExceptions: true
      });
      const html = response.getContentText();
      
      coords = extractFromText(html);
      
      if (coords) {
        console.log("SUCCESS");
        console.log("COORDS", coords);
        return { success: true, latitude: coords.lat, longitude: coords.lng };
      } else {
        return { success: false, error: 'Tidak dapat mengekstrak koordinat dari link Maps ini. Coba gunakan link panjang atau isi manual.' };
      }
    } catch (e) {
      Logger.log('Error extracting maps url: ' + e.toString());
      return { success: false, error: 'Gagal memproses URL: ' + e.toString() };
    }
  });
}

