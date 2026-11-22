// Validates a translated catalog against the English master.
// usage: node astrology-app/test/check-lang.cjs <code>
const path = require('path'), { execFileSync } = require('child_process');
const G = require('./load.cjs');
const code = process.argv[2];
const full = process.argv.includes('--full');
if (!code) { console.error('usage: check-lang.cjs <code> [--full]'); process.exit(2); }
if (full) G.loadTopics();
G.loadLang(code);
const en = G.I18N_DATA.en, tr = G.I18N_DATA[code];
if (!tr) { console.error('lang/' + code + '.js did not register I18N_DATA.' + code); process.exit(1); }
const probs = [];
const ph = s => (s.match(/\{[a-zA-Z0-9]+\}/g) || []).sort().join(',');
const FREE_LEN = /(^|\.)(kw|natalSugg|bizSugg|horarySugg|worldSugg|loveSugg|loveSuggPair|moneySugg|tradeSugg|chatSugg|buyKw|sellKw|stocks|crypto|gold|currency|property|vehicle|goods)$/;
function walk(a, b, p) {
  if (p === 'cities') {
    Object.keys(b || {}).forEach(k => { if (!G.CITIES.some(c => c[0] === k)) probs.push('unknown city id: ' + k); });
    const miss = G.CITIES.filter(c => !(b || {})[c[0]]).map(c => c[0]);
    if (miss.length && code !== 'en') probs.push('cities missing (' + miss.length + '): ' + miss.slice(0, 8).join(', '));
    return;
  }
  if (typeof a === 'string') {
    if (typeof b !== 'string') { probs.push('not a string: ' + p); return; }
    if (!b.trim()) probs.push('empty: ' + p);
    if (ph(a) !== ph(b)) probs.push('placeholders differ at ' + p + ': en[' + ph(a) + '] ' + code + '[' + ph(b) + ']');
    return;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) { probs.push('not an array: ' + p); return; }
    if (!FREE_LEN.test(p) && a.length !== b.length) probs.push('array length differs at ' + p + ': ' + a.length + ' vs ' + b.length);
    if (FREE_LEN.test(p)) { if (!b.length) probs.push('empty list: ' + p); return; }
    a.forEach((x, i) => walk(x, b[i], p + '.' + i));
    return;
  }
  if (a && typeof a === 'object') {
    if (!b || typeof b !== 'object') { probs.push('missing object: ' + p); return; }
    Object.keys(a).forEach(k => { if (!(k in b)) { if (!(p === '' && k === 'dash')) probs.push('missing key: ' + (p ? p + '.' : '') + k); } else walk(a[k], b[k], (p ? p + '.' : '') + k); }); // dash: owner-only screen, English fallback is fine
    Object.keys(b).forEach(k => { if (!(k in a) && p !== 'cities') probs.push('extra key: ' + (p ? p + '.' : '') + k); });
  }
}
walk(en, tr, '');
console.log(code + ': ' + (probs.length ? probs.length + ' structure problems' : 'structure OK'));
probs.slice(0, 50).forEach(x => console.log('  ' + x));
let renderOk = true;
try { console.log(execFileSync('node', [path.join(__dirname, 'render-all.cjs'), code].concat(full ? ['--full'] : []), { encoding: 'utf8' }).trim()); }
catch (e) { renderOk = false; console.log((e.stdout || '') + (e.stderr || '')); }
process.exitCode = probs.length || !renderOk ? 1 : 0;
