const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const data = { image: '" placeholder="https: <input type="' };
const html = <input type="text" id="form-image" class="form-control mb-2" value=" + data.image + " placeholder="https://...">\n<input type="file" id="form-upload" accept="image/jpeg, image/png, image/webp" class="form-control" style="font-size:12px;">;
const dom = new JSDOM();
const temp = dom.window.document.createElement('div');
temp.innerHTML = html;
console.log(temp.innerHTML);

