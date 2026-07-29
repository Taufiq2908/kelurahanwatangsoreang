/** Spreadsheet-only data access and schema functions. */

function getOrCreateSpreadsheet() {
  const properties = PropertiesService.getScriptProperties();
  const storedId = properties.getProperty(CMS_CONFIG.properties.spreadsheetId);

  if (storedId) {
    try {
      return SpreadsheetApp.openById(storedId);
    } catch (error) {
      properties.deleteProperty(CMS_CONFIG.properties.spreadsheetId);
      AppLogger.warn('Database', 'Open Spreadsheet', 'Stored spreadsheet was unavailable; a new spreadsheet will be created.');
    }
  }

  const spreadsheet = SpreadsheetApp.create(CMS_CONFIG.spreadsheetName);
  properties.setProperty(CMS_CONFIG.properties.spreadsheetId, spreadsheet.getId());
  return spreadsheet;
}

/** Opens the configured CMS spreadsheet without creating any new resource. */
function getCmsSpreadsheetOrNull() {
  const spreadsheetId = PropertiesService.getScriptProperties()
    .getProperty(CMS_CONFIG.properties.spreadsheetId);
  if (!spreadsheetId) return null;

  try {
    return SpreadsheetApp.openById(spreadsheetId);
  } catch (error) {
    AppLogger.error('Database', 'Open CMS Spreadsheet', 'Configured CMS spreadsheet is unavailable.');
    return null;
  }
}

function createSheets(spreadsheet) {
  const requiredNames = Object.keys(CMS_CONFIG.sheets);
  const sheetsByName = {};

  spreadsheet.getSheets().forEach(function (sheet) {
    sheetsByName[sheet.getName()] = sheet;
  });

  // Reuse the default tab to preserve the original setup behavior.
  if (!sheetsByName.Berita && sheetsByName.Sheet1) {
    sheetsByName.Sheet1.setName('Berita');
    sheetsByName.Berita = sheetsByName.Sheet1;
    delete sheetsByName.Sheet1;
  }

  requiredNames.forEach(function (name) {
    if (!sheetsByName[name]) sheetsByName[name] = spreadsheet.insertSheet(name);
  });

  return requiredNames.reduce(function (result, name) {
    result[name] = sheetsByName[name];
    return result;
  }, {});
}

function createHeaders(sheets) {
  Object.keys(CMS_CONFIG.sheets).forEach(function (sheetName) {
    const sheet = sheets[sheetName];
    const expectedHeaders = CMS_CONFIG.sheets[sheetName];

    migrateLegacySchema(sheetName, sheet, expectedHeaders);
    assertOrCreateHeaders(sheet, expectedHeaders);
  });
}

function formatSheets(sheets) {
  Object.keys(CMS_CONFIG.sheets).forEach(function (sheetName) {
    const sheet = sheets[sheetName];
    const columnCount = CMS_CONFIG.sheets[sheetName].length;
    const headerRange = sheet.getRange(1, 1, 1, columnCount);

    headerRange
      .setFontWeight('bold')
      .setBackground(CMS_CONFIG.theme.headerBackground)
      .setFontColor(CMS_CONFIG.theme.headerFontColor)
      .setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, columnCount);

    if (!sheet.getFilter()) {
      sheet.getRange(1, 1, Math.max(sheet.getMaxRows(), 2), columnCount).createFilter();
    }
  });
}

function insertSettings(settingsSheet, folderIds, spreadsheet) {
  const records = CMS_CONFIG.defaultSettings.slice();
  records.push(
    ['System', 'spreadsheet_id', spreadsheet.getId(), 'Automatically generated spreadsheet ID'],
    ['System', 'spreadsheet_url', spreadsheet.getUrl(), 'Automatically generated spreadsheet URL']
  );

  Object.keys(folderIds).forEach(function (key) {
    records.push(['Drive', key, folderIds[key], 'Automatically generated Drive folder ID']);
  });

  upsertSettingRecords(settingsSheet, records, CMS_VALUES.generatedSettingKeys);
}

function insertSystemSettings(systemSheet, spreadsheet) {
  const records = CMS_CONFIG.systemSettings.slice();

  const timestamp = toISO(now());

  records.push(
    [
      'last_setup',
      timestamp,
      'Timestamp of the latest successful setup'
    ],
    [
      'spreadsheet_created_at',
      timestamp,
      'Initial spreadsheet creation timestamp'
    ]
  );

  upsertSystemRecords(systemSheet, records, CMS_VALUES.mutableSystemKeys);
}

function getHeaderColumn(sheet, headerName) {
  const lastColumn = sheet.getLastColumn();

  if (lastColumn === 0) {
    throw new Error(
      'Sheet "' +
        sheet.getName() +
        '" does not contain any headers.'
    );
  }

  const headers = sheet
    .getRange(1, 1, 1, lastColumn)
    .getValues()[0];

  const index = headers.indexOf(headerName);

  if (index === -1) {
    throw new Error(
      'Header "' +
        headerName +
        '" was not found in sheet "' +
        sheet.getName() +
        '".'
    );
  }

  return index + 1;
}

function getSettingsRows(settingsSheet) {
  const lastRow = settingsSheet.getLastRow();
  if (lastRow < 2) return {};

  return settingsSheet.getRange(2, 1, lastRow - 1, 2).getValues().reduce(function (rows, values, index) {
    if (values[1]) rows[values[1]] = index + 2;
    return rows;
  }, {});
}

/** Returns all non-empty values for one Settings key, optionally scoped to a category. */
function getSettingValuesByKey(settingsSheet, key, category) {
  const lastRow = settingsSheet.getLastRow();
  if (lastRow < 2) return [];

  return settingsSheet.getRange(2, 1, lastRow - 1, 3).getDisplayValues()
    .filter(function (row) { return row[1] === key && row[2] !== '' && (!category || row[0] === category); })
    .map(function (row) { return row[2]; });
}

function assertOrCreateHeaders(sheet, expectedHeaders) {
  const currentHeaders = sheet.getRange(1, 1, 1, expectedHeaders.length).getDisplayValues()[0];
  const hasContent = currentHeaders.some(function (value) { return value !== ''; });

  if (hasContent && currentHeaders.join('|') !== expectedHeaders.join('|')) {
    throw new Error('Headers in sheet "' + sheet.getName() + '" do not match the expected CMS schema.');
  }
  if (!hasContent) sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
}

function migrateLegacySchema(sheetName, sheet, expectedHeaders) {
  const legacyHeaders = getExistingHeaders(sheet);
  if (legacyHeaders.length === 0 || legacyHeaders.join('|') === expectedHeaders.join('|')) return;

  if (sheetName === 'Settings' && legacyHeaders.join('|') === 'key|value') {
    const records = sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues() : [];
    sheet.clear();
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    if (records.length) {
      sheet.getRange(2, 1, records.length, 4).setValues(records.map(function (row) {
        return ['Legacy', row[0], row[1], 'Migrated from the previous Settings schema'];
      }));
    }
    return;
  }

  if (sheetName === 'Log' && legacyHeaders.join('|') === 'timestamp|action|user|description') {
    const records = sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getValues() : [];
    sheet.clear();
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    if (records.length) {
      sheet.getRange(2, 1, records.length, 5).setValues(records.map(function (row) {
        return [row[0], 'Legacy', row[1], row[2], row[3]];
      }));
    }
    return;
  }

  // Automatic column alignment for CMS modules (e.g. adding image_public_id, image_provider)
  if (['Berita', 'Pengumuman', 'Edukasi', 'Laporan', 'Aparatur', 'Kontak'].indexOf(sheetName) !== -1) {
    const lastRow = sheet.getLastRow();
    const records = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, legacyHeaders.length).getValues() : [];
    
    sheet.clear();
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    
    if (records.length > 0) {
      const newRecords = records.map(function(row) {
        const newRow = new Array(expectedHeaders.length).fill('');
        legacyHeaders.forEach(function(header, idx) {
          const newIdx = expectedHeaders.indexOf(header);
          if (newIdx !== -1) {
            newRow[newIdx] = row[idx];
          }
        });
        return newRow;
      });
      sheet.getRange(2, 1, newRecords.length, expectedHeaders.length).setValues(newRecords);
    }
  }
}

function getExistingHeaders(sheet) {
  const lastColumn = sheet.getLastColumn();

  // Empty sheet
  if (lastColumn === 0) {
    const sheetName = sheet.getName();
    if (typeof CMS_CONFIG !== 'undefined' && CMS_CONFIG.sheets && CMS_CONFIG.sheets[sheetName]) {
      const defaultHeaders = CMS_CONFIG.sheets[sheetName];
      if (defaultHeaders.length > 0) {
        sheet.getRange(1, 1, 1, defaultHeaders.length).setValues([defaultHeaders]);
        return defaultHeaders;
      }
    }
    return [];
  }

  return sheet
    .getRange(1, 1, 1, lastColumn)
    .getDisplayValues()[0]
    .map((header) => header.trim().toLowerCase());
}

function upsertSettingRecords(settingsSheet, records, forceUpdateKeys) {
  const rowsByKey = getSettingsRows(settingsSheet);
  records.forEach(function (record) {
    const row = rowsByKey[record[1]];
    if (!row) {
      settingsSheet.appendRow(record);
    } else if (forceUpdateKeys.indexOf(record[1]) !== -1) {
      settingsSheet.getRange(row, 1, 1, 4).setValues([record]);
    }
  });
}

function upsertSystemRecords(systemSheet, records, forceUpdateKeys) {
  const rowsByKey = getKeyRows(systemSheet);
  records.forEach(function (record) {
    const row = rowsByKey[record[0]];
    if (!row) {
      systemSheet.appendRow(record);
    } else if (forceUpdateKeys.indexOf(record[0]) !== -1) {
      systemSheet.getRange(row, 1, 1, 3).setValues([record]);
    }
  });
}

function getKeyRows(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return {};
  return sheet.getRange(2, 1, lastRow - 1, 1).getValues().reduce(function (rows, values, index) {
    if (values[0]) rows[values[0]] = index + 2;
    return rows;
  }, {});
}
