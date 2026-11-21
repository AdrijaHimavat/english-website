// Folds lang/<code>.topics.js (and lang/en-topics.js for English) into lang/<code>.js and deletes the topics file.
// usage: node astrology-app/test/merge-lang.cjs <code> [<code> ...]
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = path.join(__dirname, '..', 'lang');
for (const code of process.argv.slice(2)) {
  const main = path.join(dir, code + '.js');
  const extra = path.join(dir, code === 'en' ? 'en-topics.js' : code + '.topics.js');
  if (!fs.existsSync(extra)) { console.log(code + ': nothing to merge'); continue; }
  const ctx = { I18N_DATA: {} }; ctx.globalThis = ctx; ctx.window = undefined;
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(main, 'utf8').replace(/typeof window !== 'undefined' \? window : globalThis/g, 'globalThis'), ctx);
  vm.runInContext(fs.readFileSync(extra, 'utf8').replace(/typeof window !== 'undefined' \? window : globalThis/g, 'globalThis'), ctx);
  const data = ctx.I18N_DATA[code];
  const head = "/* Akhtarnameh — " + code + " catalog (mirrors the keys of lang/en.js). Placeholders in {braces} are filled by the program. */\n" +
    "(typeof window !== 'undefined' ? window : globalThis).I18N_DATA = (typeof window !== 'undefined' ? window : globalThis).I18N_DATA || {};\n" +
    "(typeof window !== 'undefined' ? window : globalThis).I18N_DATA." + code + " = ";
  fs.writeFileSync(main, head + JSON.stringify(data, null, 1) + ';\n');
  fs.unlinkSync(extra);
  console.log(code + ': merged ' + path.basename(extra));
}
