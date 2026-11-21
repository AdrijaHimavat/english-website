// بارگذاری اسکریپت‌های مرورگری در Node برای آزمون
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
globalThis.Astronomy = require(path.join(root, 'vendor/astronomy.browser.min.js')) || globalThis.Astronomy;
for (const f of ['js/kb.js', 'js/cities.js', 'js/engine.js', 'js/interpret.js', 'js/horary.js', 'js/mundane.js']) {
  const p = path.join(root, f);
  if (fs.existsSync(p)) vm.runInThisContext(fs.readFileSync(p, 'utf8'), { filename: p });
}
module.exports = globalThis;
