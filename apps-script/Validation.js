/** Dropdown validation setup. Rules belong exclusively to CMS_CONFIG. */

function createValidation(sheets) {
  CMS_CONFIG.validations.forEach(function (definition) {
    const sheet = sheets[definition.sheet];
    const column = getHeaderColumn(sheet, definition.header);
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(definition.values, true)
      .setAllowInvalid(false)
      .setHelpText('Pilih salah satu nilai yang tersedia.')
      .build();

    sheet.getRange(2, column, sheet.getMaxRows() - 1, 1).setDataValidation(rule);
  });
}
