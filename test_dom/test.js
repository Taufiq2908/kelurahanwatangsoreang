const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function simulate(isOldCode) {
    const data = {
        image: `" placeholder="https:\n                  <input type=" file" accept="image/jpeg, image/png, image/webp" style="font-size:12px;"><!--`
    };

    const escapeHtml = function(value) {
        if (!value) return '';
        return String(value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
    };

    let imageValue;
    if (isOldCode) {
        imageValue = data.image; // Old code did not have escapeHtml
    } else {
        imageValue = escapeHtml(data.image); // New code has escapeHtml
    }

    const html = `<input type="text" id="form-image" class="form-control mb-2" value="` + imageValue + `" placeholder="https://...">\n<input type="file" id="form-upload" accept="image/jpeg, image/png, image/webp" class="form-control" style="font-size:12px;">`;
    
    console.log("===== HTML STRING =====");
    console.log(html);
    
    console.log("===== HTML STRING JSON =====");
    console.log(JSON.stringify(html));

    const dom = new JSDOM();
    const temp = dom.window.document.createElement('div');
    temp.innerHTML = html;

    console.log("===== FILE INPUT EXISTS =====");
    console.log(temp.querySelector('#form-upload') !== null);

    console.log("===== TEXT INPUT =====");
    const textInput = temp.querySelector('#form-image');
    console.log(textInput ? textInput.outerHTML : 'null');
    
    if (!isOldCode) {
        console.log("===== RAW IMAGE =====");
        console.log(data.image);
        console.log("===== ESCAPED IMAGE =====");
        console.log(escapeHtml(data.image));
    }
}

console.log('--- SIMULATING OLD DEPLOYMENT (NO ESCAPEHTML) ---');
simulate(true);
console.log('\n--- SIMULATING NEW DEPLOYMENT (WITH ESCAPEHTML) ---');
simulate(false);
