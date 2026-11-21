// Renders every text-producing path in a language and reports missing keys or unfilled placeholders.
// usage: node test/render-all.cjs [lang]
const G = require('./load.cjs');
const lang = process.argv[2] || 'en';
const full = process.argv.includes('--full');
if (full) G.loadTopics();
if (lang !== 'en') G.loadLang(lang);
G.I18N.setLang(lang);
const E = G.AstroEngine, I = G.Interpret, H = G.Horary, M = G.Mundane, D = G.Deep, KB = G.KB, T = G.I18N;
const texts = [];
const collect = secs => secs.forEach(s => { texts.push(s.title); s.items.forEach(i => { texts.push(i.title || ''); texts.push(i.text); }); });
const cases = [
  [Date.UTC(1991, 2, 21, 5, 0), 35.69, 51.39, 'Asia/Tehran', 'm', 'person'],
  [Date.UTC(1985, 9, 12, 22, 40), 51.51, -0.13, 'Europe/London', 'f', 'person'],
  [Date.UTC(2003, 6, 3, 11, 15), -33.87, 151.21, 'Australia/Sydney', 'x', 'person'],
  [Date.UTC(2015, 0, 7, 3, 5), 40.71, -74.0, 'America/New_York', 'm', 'business'],
  [Date.UTC(1972, 11, 30, 16, 50), 28.61, 77.21, 'Asia/Kolkata', 'f', 'person']
];
let t0 = Date.now();
cases.forEach(([ms, lat, lon, tz, sex, kind]) => {
  for (const hs of ['placidus', 'whole', 'regio']) {
    const ch = E.castChart({ ms, lat, lon, tz, houseSystem: hs, sex });
    collect(I.natalReading(ch, { kind, nowMs: Date.UTC(2026, 10, 21) }).sections);
    const d = D.analyze(ch, { kind, sex, nowMs: Date.UTC(2026, 10, 21) });
    collect(D.render(d, { kind }));
    D.digest(d);
  }
});
const tNatal = Date.now() - t0;
KB.QUESTION_TYPES.forEach((q, i) => {
  const ch = E.castChart({ ms: Date.UTC(2026, 10, 21, 3 + i, 7 * i), lat: 35.69, lon: 51.39, tz: 'Asia/Tehran', houseSystem: 'regio' });
  const j = H.judge(ch, q.id);
  texts.push(j.sig, j.verdict); j.considerations.forEach(x => texts.push(x)); j.testimonies.forEach(x => texts.push(x.text)); j.special.forEach(x => texts.push(x.text));
  if (j.timing) texts.push(j.timing.text);
});
[2026, 2020, 1999].forEach(y => collect(M.analyzeYear(y, 35.69, 51.39, 'Asia/Tehran', 'placidus').sections));
const el = H.findElections('marriage', Date.UTC(2026, 10, 21), 3, 35.69, 51.39, 'Asia/Tehran', {});
el.best.forEach(b => b.reasons.forEach(r => texts.push(H.reasonText(r))));
KB.ELECTIONS.forEach(e => texts.push(T.t('elect.' + e.id)));
if (full) {
  const TP = G.Topics;
  const mk = (ms, lat, lon, tz, sex) => { const c = E.castChart({ ms, lat, lon, tz, houseSystem: 'placidus', sex }); return { c, d: D.analyze(c, { kind: 'person', sex, nowMs: Date.UTC(2026, 10, 21) }) }; };
  const P1 = mk(Date.UTC(1991, 2, 21, 5, 0), 35.69, 51.39, 'Asia/Tehran', 'm'), P2 = mk(Date.UTC(1993, 7, 14, 14, 20), 35.69, 51.39, 'Asia/Tehran', 'f'), P3 = mk(Date.UTC(1988, 0, 3, 1, 0), 51.5, -0.1, 'Europe/London', 'x');
  const push = x => { texts.push(x.title || ''); texts.push(x.text); };
  [[P1, 'm'], [P2, 'f'], [P3, 'x']].forEach(([X, s]) => { TP.loveNatal(X.c, s, X.d, Date.UTC(2026, 10, 21)).forEach(push); TP.moneyReading(X.c, X.d, Date.UTC(2026, 10, 21)).forEach(push); });
  TP.synastry(P1.c, P2.c, 'm', 'f', P1.d, P2.d).items.forEach(push);
  TP.synastry(P2.c, P3.c, 'f', 'x', P2.d, P3.d).items.forEach(push);
  TP.marketCalendar(Date.UTC(2026, 10, 21), 90, 'Asia/Tehran').forEach(push);
  Object.keys(TP.ASSETS).forEach(asset => ['buy', 'sell'].forEach(act => {
    const now = E.castChart({ ms: Date.UTC(2026, 10, 21, 9), lat: 35.69, lon: 51.39, tz: 'Asia/Tehran', houseSystem: 'regio' });
    const d = TP.dealHorary(now, act, asset); texts.push(d.verdict, d.sig); d.tests.forEach(x => texts.push(x.text));
    texts.push(T.t('trade.asset.' + asset), T.t('ui.trade.head.' + act, { asset: T.t('trade.asset.' + asset) }));
  }));
  const r2 = H.findElections(TP.tradeEvent('sell', 'stocks'), Date.UTC(2026, 10, 21), 4, 35.69, 51.39, 'Asia/Tehran', { daytime: true });
  r2.best.forEach(b => b.reasons.forEach(x => texts.push(H.reasonText(x))));
  const nat = { reading: I.natalReading(P1.c, { kind: 'person' }) };
  const qs = [].concat(T.t('ai.chatSugg'), [T.t('ui.horary.sampleQ')]);
  qs.forEach(q => texts.push(TP.ruleAnswer(q, { lat: 35.69, lon: 51.39, tz: 'Asia/Tehran' }, nat).text));
  ['buy', 'sell'].forEach(k => texts.push(T.t('ui.trade.bestTitle.' + k)));
}
const bad = new Set();
const keyRe = /\b(ui|nat|hor|mun|deep|elr|err|ai|lib|love|money|syn|trade|cal|chat|acc|pl|signs|houses|lots|stars|firdar|qtypes|elect|eclipse|gconj|phase|shape|config|yoga|wx|stem|animal|dm|god|nak|mansion|tzolkin|temp|dig|asp|el|mode|kind|unit|dir|str|tone|hsys)\.[A-Za-z0-9_.]+/;
texts.forEach(s => {
  if (typeof s !== 'string') { bad.add('non-string: ' + JSON.stringify(s).slice(0, 80)); return; }
  const m = s.match(keyRe); if (m) bad.add('missing key: ' + m[0] + '   in: ' + s.slice(0, 90));
  const p = s.match(/\{[a-zA-Z0-9]+\}/); if (p) bad.add('unfilled ' + p[0] + ' in: ' + s.slice(0, 90));
  if (/undefined|NaN/.test(s)) bad.add('undefined/NaN in: ' + s.slice(0, 120));
});
console.log(lang, 'texts', texts.length, 'natal+deep ms', tNatal, 'problems', bad.size);
[...bad].slice(0, 60).forEach(b => console.log('  ' + b));
process.exitCode = bad.size ? 1 : 0;
