/** HtmlService entry point and presentation helpers for the CMS shell. */

function doGet(e) {
  if (e && e.parameter && e.parameter.action) {
    const action = e.parameter.action;

    if (action === 'listTrackingCodes') {
      const sheetName = 'Laporan';
      const spreadsheet = getCmsSpreadsheetOrNull();
      const sheet = spreadsheet.getSheetByName(sheetName);
      const headers = getExistingHeaders(sheet);
      const data = sheet.getRange(2, 1, Math.max(1, sheet.getLastRow() - 1), headers.length).getValues();
      const codes = data.map(r => r[headers.indexOf('tracking_code')]);
      return ContentService.createTextOutput(JSON.stringify(codes)).setMimeType(ContentService.MimeType.JSON);
    }
    return handleApiRequest(e);
  }
  return createCmsShell(e);
}

function doPost(e) {
  return handleApiRequest(e);
}

function createCmsShell(e) {
  const template = HtmlService.createTemplateFromFile('Index');
  template.appTitle = CMS_CONFIG.webApp.title;
  // User data will be managed by token in localStorage, not rendered on server
  template.user = { name: 'Admin', email: 'admin' }; 
  template.shellConfig = JSON.stringify({
    navigation: CMS_CONFIG.webApp.navigation,
    publicWebsiteUrl: CMS_CONFIG.webApp.publicWebsiteUrl,
  });

  return template.evaluate()
    .setTitle(CMS_CONFIG.webApp.title)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // Required if reverse proxy via Cloudflare
}

/** Expose apiLogin to google.script.run */
function apiLogin(username, password, rememberMe) {
  return Middleware.runPublic(() => {
    const result = Authentication.login(username, password, rememberMe);
    if (!result.success) {
      throw new Error(result.message);
    }
    return result;
  });
}

/** Expose apiLogout to google.script.run */
function apiLogout(token) {
  return Middleware.runPublic(() => {
    return Authentication.logout(token);
  });
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
