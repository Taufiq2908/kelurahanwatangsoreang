/** REST API endpoints for the React frontend */

function handleApiRequest(e) {
  const action = e.parameter.action;

  try {
    if (action === 'dumpHtml') {
      const template = HtmlService.createTemplateFromFile('Index');
      template.appTitle = CMS_CONFIG.webApp.title;
      template.user = { email: "tester@example.com", name: "Tester" };
      template.shellConfig = JSON.stringify({
        navigation: CMS_CONFIG.webApp.navigation,
        publicWebsiteUrl: CMS_CONFIG.webApp.publicWebsiteUrl,
      });
      return ContentService.createTextOutput(template.evaluate().getContent()).setMimeType(ContentService.MimeType.TEXT);
    }

    let result = null;

    const spreadsheet = getCmsSpreadsheetOrNull();
    if (!spreadsheet) {
      throw new Error("CMS is not configured.");
    }

    // Handle POST
    if (e.postData && e.postData.contents) {
       const payload = JSON.parse(e.postData.contents);
       if (action === 'submitLaporan') {
         result = apiSubmitLaporan(spreadsheet, payload);
       } else {
         throw new Error("Unknown POST action: " + action);
       }
    } 
    // Handle GET
    else {
       if (action === 'migrate') {
         migrateDatabase();
         initializeCms();
         return ContentService.createTextOutput("Migration Complete");
       }
       if (action === 'diagnose') {
         const properties = PropertiesService.getScriptProperties();
         const spreadsheetId = properties.getProperty(CMS_CONFIG.properties.spreadsheetId);
         const ss = SpreadsheetApp.openById(spreadsheetId);
         const sheet = ss.getSheetByName('Berita');
         const lastCol = sheet.getLastColumn();
         const lastRow = sheet.getLastRow();
         const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
         const data = sheet.getRange(2, 1, Math.min(3, lastRow - 1), lastCol).getValues();
         return ContentService.createTextOutput(JSON.stringify({ lastCol, lastRow, headers, data }, null, 2));
       }
       if (action === 'fixdata') {
         const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty(CMS_CONFIG.properties.spreadsheetId));
         
         // Fix Berita
         // Current data: [id, slug, title, content, image, category, author, published_at, updated_at, deleted_at, status]
         // Expected: ['id', 'slug', 'title', 'content', 'image', 'category', 'author', 'published_at', 'updated_at', 'deleted_at', 'tags', 'status']
         const bSheet = ss.getSheetByName('Berita');
         if (bSheet && bSheet.getLastRow() > 1) {
           const bData = bSheet.getRange(2, 1, bSheet.getLastRow() - 1, bSheet.getLastColumn()).getValues();
           const newBData = bData.map(row => {
             // row[10] is currently status ("publish"). row[11] is empty.
             if (row[10] === 'publish' || row[10] === 'draft') {
               const status = row[10];
               row[10] = ''; // tags
               row[11] = status; // status
             }
             return row.slice(0, 12);
           });
           bSheet.getRange(2, 1, newBData.length, 12).setValues(newBData);
         }
         
         // Fix Edukasi
         // Current data: [id, slug, title, content, image, category, author, source, tags, published_at, updated_at, status]
         // Expected: ['id', 'slug', 'title', 'content', 'image', 'category', 'author', 'source', 'tags', 'published_at', 'updated_at', 'deleted_at', 'status']
         const eSheet = ss.getSheetByName('Edukasi');
         if (eSheet && eSheet.getLastRow() > 1) {
           const eData = eSheet.getRange(2, 1, eSheet.getLastRow() - 1, eSheet.getLastColumn()).getValues();
           const newEData = eData.map(row => {
             // row[11] is currently status ("publish"). row[12] is empty.
             if (row[11] === 'publish' || row[11] === 'draft') {
               const status = row[11];
               row[11] = ''; // deleted_at
               row[12] = status; // status
             }
             return row.slice(0, 13);
           });
           eSheet.getRange(2, 1, newEData.length, 13).setValues(newEData);
         }
         
         return ContentService.createTextOutput("Fixed data alignment!");
       }
       
       if (action === 'fixCorruptedBerita') {
         fixCorruptedBerita();
         return ContentService.createTextOutput("Fixed corrupted berita");
       }
       
       if (action === 'fixAparatur') {
         fixAparatur();
         return ContentService.createTextOutput("Fixed Aparatur");
       }
       
       if (action === 'testCreateBerita') {
         const payload = {
            title: "Testing Berita End to End",
            slug: "testing-berita-end-to-end",
            content: "Ini adalah konten berita yang dibuat untuk pengujian end to end data flow.",
            category: "Kegiatan Kelurahan",
            author: "System Test",
            published_at: new Date().toISOString(),
            status: "publish"
          };
          const res = Database.saveRow("Berita", payload);
          return ContentService.createTextOutput(JSON.stringify({ status: "success", data: res })).setMimeType(ContentService.MimeType.JSON);
       }
       
       if (action === 'diagnose2') {
         try {
           const options = { page: 1, limit: 10, search: '', status: '', sortBy: 'published_at', sortOrder: 'desc' };
           const sheetName = 'Berita';
           const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty(CMS_CONFIG.properties.spreadsheetId));
           const sheet = ss.getSheetByName(sheetName);
           const data = sheet.getDataRange().getValues();
           const headers = data[0];
           
           let records = [];
           for (let i = 1; i < data.length; i++) {
             let record = {};
             for (let j = 0; j < headers.length; j++) {
               let val = data[i][j];
               if (val instanceof Date) val = val.toISOString();
               record[headers[j]] = val;
             }
             records.push(record);
           }
           
           // processRecords logic inline
           let result = records.filter(r => !r.deleted_at);
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
           }
           return ContentService.createTextOutput(JSON.stringify(result, null, 2));
         } catch(e) {
           return ContentService.createTextOutput(JSON.stringify({error: e.message, stack: e.stack}));
         }
       }
       
       const cache = CacheService.getScriptCache();
       const dataVersion = PropertiesService.getScriptProperties().getProperty('DATA_VERSION') || '0';
       const cacheKey = `api_${action}_${dataVersion}_${e.parameter.slug || e.parameter.id || ''}`;
       const cachedResponse = cache.get(cacheKey);
       if (cachedResponse) {
         return ContentService.createTextOutput(cachedResponse).setMimeType(ContentService.MimeType.JSON);
       }

       switch (action) {
         case 'getHomepage':
           result = apiGetHomepage(spreadsheet);
           break;
         case 'getProfil':
           result = apiGetProfil(spreadsheet);
           break;
         case 'getLayanan':
           result = apiGetLayanan(spreadsheet);
           break;
         case 'getFaq':
           result = apiGetRecords(spreadsheet, 'FAQ', true);
           break;
         case 'getPeta':
           result = apiGetRecords(spreadsheet, 'Peta', true);
           break;
         case 'getPetaKategori':
           result = apiGetRecords(spreadsheet, 'PetaKategori', false);
           break;
         case 'getBerita':
           result = apiGetRecords(spreadsheet, 'Berita', true);
           break;
         case 'getBeritaDetail':
           result = apiGetRecordDetail(spreadsheet, 'Berita', e.parameter.slug || e.parameter.id);
           break;
         case 'getPengumuman':
           result = apiGetRecords(spreadsheet, 'Pengumuman', true);
           break;
         case 'getPengumumanDetail':
           result = apiGetRecordDetail(spreadsheet, 'Pengumuman', e.parameter.id);
           break;
         case 'getEdukasi':
           result = apiGetRecords(spreadsheet, 'Edukasi', true);
           break;
         case 'getEdukasiDetail':
           result = apiGetRecordDetail(spreadsheet, 'Edukasi', e.parameter.slug || e.parameter.id);
           break;
         case 'getLaporanStatus':
           result = apiGetLaporanStatus(spreadsheet, e.parameter.tracking_code);
           break;
         case 'getKontak':
           result = apiGetKontak(spreadsheet);
           break;
         case 'getAparatur':
           result = apiGetRecords(spreadsheet, 'Aparatur', true).sort((a, b) => Number(a.sort_order) - Number(b.sort_order));
           break;
         case 'fixAparatur':
           fixAparatur();
           result = { status: "success", message: "Fixed Aparatur" };
           break;
         default:
           throw new Error("Unknown GET action: " + action);
       }
       
       const jsonResult = JSON.stringify({
         status: 'success',
         data: result
       });
       
       // Cache for 15 minutes (900 seconds)
       try {
         cache.put(cacheKey, jsonResult, 900);
       } catch (err) {
         console.error("Cache Error", err);
       }

       return ContentService.createTextOutput(jsonResult).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Fallback if neither POST nor GET returns (e.g. POST success)
    const finalResult = JSON.stringify({
      status: 'success',
      data: result
    });
    return ContentService.createTextOutput(finalResult).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: String(error.message || error)
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getSheetRecords(spreadsheet, sheetName, onlyPublished) {
  Logger.log("=== getSheetRecords ===");
  Logger.log("Mencoba membuka sheet dengan nama: " + sheetName);
  
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    Logger.log("Sheet '" + sheetName + "' TIDAK DITEMUKAN! (Ingat: getSheetByName bersifat case-sensitive. Pastikan huruf besar/kecil sesuai). Mengembalikan array kosong []");
    return [];
  }
  
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    Logger.log("Sheet '" + sheetName + "' ditemukan, tapi kosong (hanya header atau tidak ada data). Mengembalikan array kosong []");
    return [];
  }
  
  const lastCol = sheet.getLastColumn();
  if (lastCol === 0) return [];
  
  Logger.log("Sheet '" + sheetName + "' ditemukan. Membaca " + (lastRow - 1) + " baris data.");
  
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const data = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
  
  const records = [];
  const statusIdx = headers.indexOf('status');
  const deletedIdx = headers.indexOf('deleted_at');
  
  for (let i = 0; i < data.length; i++) {
    // Skip empty rows (where ID is missing)
    if (!data[i][0]) continue;

    // Filter out deleted records
    if (deletedIdx !== -1 && data[i][deletedIdx]) {
      continue;
    }
    
    if (onlyPublished && statusIdx !== -1 && String(data[i][statusIdx]).toLowerCase() !== 'publish') {
      continue;
    }
    const record = {};
    for (let j = 0; j < headers.length; j++) {
      let val = data[i][j];
      if (val instanceof Date) {
        val = val.toISOString();
      }
      record[headers[j]] = val;
    }
    
    // Dynamic media object transformation
    ['image', 'photo', 'attachment'].forEach(key => {
      if (record[key] !== undefined && record[key + '_public_id']) {
        record[key + 'Meta'] = {
          url: record[key],
          publicId: record[key + '_public_id'],
          provider: record[key + '_provider']
        };
      } else if (record[key] && String(record[key]).indexOf('drive.google') !== -1) {
        record[key + 'Meta'] = {
          url: record[key],
          publicId: null,
          provider: 'drive'
        };
      }
    });
    
    records.push(record);
  }
  return records.reverse();
}

function apiGetRecords(spreadsheet, sheetName, onlyPublished) {
  return getSheetRecords(spreadsheet, sheetName, onlyPublished);
}

function apiGetRecordDetail(spreadsheet, sheetName, identifier) {
  const records = getSheetRecords(spreadsheet, sheetName, true);
  if (!identifier) throw new Error("ID or Slug required");
  const record = records.find(r => String(r.id) === String(identifier) || String(r.slug) === String(identifier));
  if (!record) throw new Error("Data not found");
  return record;
}

function getSettingsByCategory(spreadsheet, category) {
  const sheet = spreadsheet.getSheetByName('Settings');
  if (!sheet) return {};
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return {};
  const data = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
  const settings = {};
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === category) {
      settings[data[i][1]] = data[i][2];
    }
  }
  return settings;
}

function apiGetHomepage(spreadsheet) {
  const profilSheet = spreadsheet.getSheetByName('Profil');
  const statistik = {};
  if (profilSheet && profilSheet.getLastRow() > 1) {
    const data = profilSheet.getRange(2, 1, profilSheet.getLastRow() - 1, 2).getValues();
    data.forEach(row => {
      if (row[0] && row[0].startsWith('stat_')) {
        statistik[row[0]] = row[1];
      }
    });
  }

  const berita = getSheetRecords(spreadsheet, 'Berita', true).slice(0, 3);
  const pengumuman = getSheetRecords(spreadsheet, 'Pengumuman', true).slice(0, 3);
  const layanan = getSheetRecords(spreadsheet, 'Layanan', true).filter(l => l.featured === true || l.featured === 'TRUE').slice(0, 4);
  
  return {
    statistik: statistik,
    berita: berita,
    pengumuman: pengumuman,
    layanan: layanan
  };
}

function apiGetProfil(spreadsheet) {
  const profilSheet = spreadsheet.getSheetByName('Profil');
  const profil = {};
  if (profilSheet && profilSheet.getLastRow() > 1) {
    const data = profilSheet.getRange(2, 1, profilSheet.getLastRow() - 1, 2).getValues();
    data.forEach(row => { if (row[0]) profil[row[0]] = row[1]; });
  }

  if (profil.leader_photo !== undefined && profil.leader_photo_public_id) {
    profil.leader_photoMeta = {
      url: profil.leader_photo,
      publicId: profil.leader_photo_public_id,
      provider: profil.leader_photo_provider
    };
  } else if (profil.leader_photo && String(profil.leader_photo).indexOf('drive.google') !== -1) {
    profil.leader_photoMeta = {
      url: profil.leader_photo,
      publicId: null,
      provider: 'drive'
    };
  }

  const aparatur = getSheetRecords(spreadsheet, 'Aparatur', true).sort((a, b) => Number(a.sort_order) - Number(b.sort_order));
  
  return {
    ...profil,
    aparatur
  };
}

function apiGetLayanan(spreadsheet) {
  const layanan = getSheetRecords(spreadsheet, 'Layanan', true);
  // Parse requirements to array if it is string
  return layanan.map(l => ({
    ...l,
    requirements: typeof l.requirements === 'string' ? l.requirements.split('\\n').filter(Boolean) : l.requirements
  }));
}

function apiGetKontak(spreadsheet) {
  const kontak = getSheetRecords(spreadsheet, 'Kontak', true).sort((a, b) => Number(a.sort_order) - Number(b.sort_order));
  return kontak;
}

function apiSubmitLaporan(spreadsheet, payload) {
  const sheet = spreadsheet.getSheetByName('Laporan');
  if (!sheet) throw new Error("Laporan sheet not found");
  
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const newRow = [];
  
  const trackingCode = "WS-" + Date.now().toString(36).toUpperCase();
  const timestamp = new Date();
  
  const rowData = {
    id: generateUUID(),
    tracking_code: trackingCode,
    created_at: timestamp,
    anonymous: payload.anonymous ? 'TRUE' : 'FALSE',
    reporter_name: payload.reporter_name || '',
    reporter_phone: payload.reporter_phone ? "'" + payload.reporter_phone : '',
    category: payload.category || '',
    location: payload.location || '',
    description: payload.description || '',
    image: payload.image || '',
    status: 'Masuk',
    response: '',
    updated_at: timestamp,
    deleted_at: '',
    notification_sent: 'FALSE',
    timeline: JSON.stringify([{ status: 'Masuk', time: timestamp, note: 'Laporan diterima' }])
  };
  
  for (let i = 0; i < headers.length; i++) {
    newRow.push(rowData[headers[i]] !== undefined ? rowData[headers[i]] : '');
  }
  
  sheet.appendRow(newRow);
  return { tracking_code: trackingCode, status: 'Masuk' };
}

function apiGetLaporanStatus(spreadsheet, trackingCode) {
  const reports = getSheetRecords(spreadsheet, 'Laporan', false);
  const targetCode = String(trackingCode || '').trim().toUpperCase();
  const report = reports.find(r => 
    String(r.tracking_code || '').trim().toUpperCase() === targetCode ||
    String(r.id || '').trim().toUpperCase() === targetCode
  );
  if (!report) throw new Error("Laporan tidak ditemukan");
  
  return {
    tracking_code: report.tracking_code,
    id: report.id,
    status: report.status,
    response: report.response,
    category: report.category,
    location: report.location,
    description: report.description,
    created_at: report.created_at,
    updated_at: report.updated_at
  };
}

