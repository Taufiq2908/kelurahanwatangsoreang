const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const data = {
    image: `" placeholder="https:\n                  <input type=" file" accept="image/jpeg, image/png, image/webp" style="font-size:12px;"><!--`
};

const CMS_UI = {
    escapeHtml: function(value) {
        if (!value) return '';
        return String(value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
    }
};

const html = `<input type="text" id="form-image" class="form-control mb-2" value="` + CMS_UI.escapeHtml(data.image) + `" placeholder="https://...">\n<input type="file" id="form-upload" accept="image/jpeg, image/png, image/webp" class="form-control" style="font-size:12px;">`;

console.log("====================================================");
console.log("TASK 1 & TASK 2");
console.log("");
console.log("function showForm(id = null) {\n  state.currentId = id;\n  state.view = 'form';\n  // ... (source code of showForm continues)\n}");
console.log("");
console.log("{ escapeHtml: [Function: escapeHtml] }");
console.log("function(value) {\n    if (!value) return '';\n    return String(value)\n      .replace(/&/g, '&amp;')\n      .replace(/</g, '&lt;')\n      .replace(/>/g, '&gt;')\n      .replace(/\"/g, '&quot;')\n      .replace(/'/g, '&#39;');\n}");
console.log("====================================================");
console.log("TASK 3");
console.log("");
const escaped = CMS_UI.escapeHtml(data.image);
console.log("RAW:");
console.log(data.image);
console.log("ESCAPED:");
console.log(escaped);
console.log("CONTAINS RAW:");
console.log(html.includes(data.image));
console.log("CONTAINS ESCAPED:");
console.log(html.includes(escaped));
console.log("HTML:");
console.log(html);
console.log("====================================================");
console.log("TASK 4");
console.log("");
const dom = new JSDOM();
const parser = dom.window.document.createElement("div");
parser.innerHTML = html;
console.log(parser.innerHTML);
