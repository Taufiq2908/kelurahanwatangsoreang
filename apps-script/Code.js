/**
 * Apps Script entry point. Run this function from the Apps Script editor.
 * No API endpoint or HTMLService UI is implemented in this project.
 */
function runSimulatedTests() {
  Logger.log("Simulation complete");
}

function testLogin() {
  try {
    const result = apiLogin('admin', 'adminwatsor', false);
    Logger.log("Login Result: " + JSON.stringify(result));
  } catch (e) {
    Logger.log("Login Error: " + e.toString() + "\nStack: " + e.stack);
  }
}

function resetAdminPassword() {
  Logger.log(Authentication.setupAdminAccount('admin', 'adminwatsor'));
}

function getEvaluatedHtml() { return HtmlService.createTemplateFromFile('Index').evaluate().getContent(); }
