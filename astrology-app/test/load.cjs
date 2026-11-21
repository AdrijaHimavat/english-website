// Load the browser scripts into Node for tests.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
globalThis.Astronomy = require(path.join(root, 'vendor/astronomy.browser.min.js'));
const files = ['js/i18n.js', 'lang/en.js', 'js/kb.js', 'js/cities.js', 'js/engine.js', 'js/interpret.js', 'js/horary.js', 'js/mundane.js', 'js/deep.js'];
for (const f of files) vm.runInThisContext(fs.readFileSync(path.join(root, f), 'utf8'), { filename: f });
globalThis.loadLang = code => { const p = path.join(root, 'lang', code + '.js'); if (fs.existsSync(p)) vm.runInThisContext(fs.readFileSync(p, 'utf8'), { filename: p }); };
module.exports = globalThis;
