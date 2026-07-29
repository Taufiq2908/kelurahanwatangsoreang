function migrateDatabase() {
  const properties = PropertiesService.getScriptProperties();
  const spreadsheetId = properties.getProperty(CMS_CONFIG.properties.spreadsheetId);
  if (!spreadsheetId) return;
  const ss = SpreadsheetApp.openById(spreadsheetId);
  
  ['Berita', 'Edukasi'].forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;
    
    const lastCol = sheet.getLastColumn();
    if (lastCol === 0) return;
    
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    const excerptIdx = headers.findIndex(h => String(h).toLowerCase() === 'excerpt');
    if (excerptIdx !== -1) {
      sheet.deleteColumn(excerptIdx + 1);
    }
    
    // Refresh headers after deletion
    const newHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const thumbIdx = newHeaders.findIndex(h => String(h).toLowerCase() === 'thumbnail');
    if (thumbIdx !== -1) {
      sheet.getRange(1, thumbIdx + 1).setValue('image');
    }
    
    // Finally, force exact CMS_CONFIG headers to guarantee no mismatch for these two sheets
    const expected = CMS_CONFIG.sheets[sheetName];
    sheet.getRange(1, 1, 1, expected.length).setValues([expected]);
  });
  
  // Ensure all other sheets also have the exact headers defined in CMS_CONFIG
  Object.keys(CMS_CONFIG.sheets).forEach(sheetName => {
    if (sheetName !== 'Berita' && sheetName !== 'Edukasi') {
      const sheet = ss.getSheetByName(sheetName);
      if (sheet) {
        const expected = CMS_CONFIG.sheets[sheetName];
        sheet.getRange(1, 1, 1, expected.length).setValues([expected]);
      }
    }
  });
}

function migrateInitialData() {
  const ss = getCmsSpreadsheetOrNull();
  if (!ss) return;
  const timestamp = new Date().toISOString();

  // Populate Profil
  const profilData = {
    leader_name: 'Hj. Andi Hasmawati, S.E',
    leader_position: 'Lurah Watang Soreang',
    leader_sambutan: 'Assalamu Alaikum Warahmatullahi Wabarakatuh.\n\nSelamat datang di website resmi Kelurahan Watang Soreang...',
    profile_vision: 'Terwujudnya Kelurahan Watang Soreang yang Religius, Mandiri, dan Sejahtera.',
    profile_mission: '1. Meningkatkan pelayanan publik yang prima dan profesional.\n2. Mewujudkan pemberdayaan ekonomi masyarakat.\n3. Membangun infrastruktur yang berkelanjutan.',
    profile_history: 'Kelurahan Watang Soreang merupakan salah satu kelurahan di Kecamatan Soreang, Kota Parepare...',
    stat_population: '8450',
    stat_households: '2120',
    stat_male: '4100',
    stat_female: '4350',
    stat_rt: '25',
    stat_rw: '8',
    stat_area: '150.5',
    op_days: 'Senin - Jumat',
    op_hours: '08:00 - 16:00 WITA',
    op_email: 'watangsoreang@parepare.go.id',
    op_phone: '(0421) 123456',
    op_address: 'Jl. Pemuda No. 12, Kelurahan Watang Soreang, Kec. Soreang, Kota Parepare',
    op_maps: 'https://maps.google.com'
  };
  
  const profilSheet = ss.getSheetByName('Profil');
  if (profilSheet) {
    if (profilSheet.getLastRow() <= 1) {
      Object.keys(profilData).forEach(key => {
        profilSheet.appendRow([key, profilData[key], timestamp]);
      });
    }
  }

  // Populate Kontak
  const kontakSheet = ss.getSheetByName('Kontak');
  if (kontakSheet) {
    if (kontakSheet.getLastRow() <= 1) {
      const kontakRows = [
        [generateUUID(), 'office', 'Kantor Kelurahan', 'Pusat Pelayanan', '(0421) 123456', '081234567890', 'watangsoreang@parepare.go.id', 'Jl. Pemuda No. 12', '', '', '1', 'TRUE', timestamp, timestamp, ''],
        [generateUUID(), 'emergency', 'Puskesmas', 'Fasilitas Kesehatan', '(0421) 654321', '', '', 'Jl. Kesehatan No. 1', '', '', '2', 'TRUE', timestamp, timestamp, '']
      ];
      kontakRows.forEach(row => kontakSheet.appendRow(row));
    }
  }

  // Populate Aparatur
  const aparaturSheet = ss.getSheetByName('Aparatur');
  if (aparaturSheet) {
    if (aparaturSheet.getLastRow() <= 1) {
      const aparaturRows = [
        [generateUUID(), 'Hj. Andi Hasmawati, S.E', 'Lurah', '', '197501012000122001', '1', 'TRUE', timestamp, timestamp, ''],
        [generateUUID(), 'Budi Santoso, S.IP', 'Sekretaris Lurah', '', '198002022005011002', '2', 'TRUE', timestamp, timestamp, '']
      ];
      aparaturRows.forEach(row => aparaturSheet.appendRow(row));
    }
  }
}
