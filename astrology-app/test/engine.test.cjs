// آزمون‌های موتور: node --test astrology-app/test/
const test = require('node:test');
const assert = require('node:assert');
const G = require('./load.cjs');
const E = G.AstroEngine, A = G.Astronomy;
const near = (a, b, tol, msg) => assert.ok(Math.abs(E.n180(a - b)) <= tol, msg + ': ' + a + ' vs ' + b);

test('positions at J2000 match published values', () => {
  const ms = Date.UTC(2000, 0, 1, 12);
  near(E.lonAt('sun', ms), 280.37, 0.02, 'sun');
  near(E.lonAt('moon', ms), 223.32, 0.05, 'moon');
  near(E.lonAt('jupiter', ms), 25.25, 0.05, 'jupiter');
  near(E.lonAt('saturn', ms), 40.40, 0.05, 'saturn');
  near(E.lonAt('node', ms), 125.04, 0.02, 'mean node');
});

test('ascendant lies on the eastern horizon and MC on the meridian', () => {
  const ms = Date.UTC(1991, 2, 21, 5, 0), lat = 35.69, lon = 51.39;
  const h = E.houses(ms, lat, lon, 'placidus');
  const t = A.MakeTime(new Date(ms)), obs = new A.Observer(lat, lon, 0);
  const hor = L => {
    const v = A.RotateVector(A.Rotation_ECT_EQD(t), A.VectorFromSphere({ lat: 0, lon: L, dist: 1 }, t));
    const eq = A.EquatorFromVector(v); return A.Horizon(t, obs, eq.ra, eq.dec);
  };
  assert.ok(Math.abs(hor(h.asc).altitude) < 0.01);
  assert.ok(hor(h.asc).azimuth < 180);
  assert.ok(Math.abs(hor(h.mc).azimuth - 180) < 0.01);
});

test('Jalali calendar conversion', () => {
  assert.deepStrictEqual(E.jalaliToGregorian(1403, 1, 1), { gy: 2024, gm: 3, gd: 20 });
  assert.deepStrictEqual(E.gregorianToJalali(1979, 2, 11), { jy: 1357, jm: 11, jd: 22 });
  assert.deepStrictEqual(E.gregorianToJalali(2026, 11, 21), { jy: 1405, jm: 8, jd: 30 });
});

test('Nowruz 1405 falls at 18:15 Tehran time', () => {
  const ms = G.Mundane.equinox(2026, 'mar');
  const p = E.utcToLocalParts(ms, 'Asia/Tehran');
  assert.deepStrictEqual([p.m, p.d, p.h, p.mi], [3, 20, 18, 15]);
});

test('Great conjunction of December 2020 at 0°29′ Aquarius', () => {
  const c = G.Mundane.findConjunctions('jupiter', 'saturn', Date.UTC(2020, 10, 1), Date.UTC(2021, 1, 1), 2);
  assert.strictEqual(c.length, 1);
  near(c[0].lon, 300.49, 0.05, 'conjunction longitude');
});

test('essential dignities follow Ptolemy and Lilly', () => {
  assert.deepStrictEqual(E.essential('sun', 19, true).list.slice(0, 2), ['exaltation', 'triplicity']);
  assert.ok(E.essential('saturn', 5, true).list.includes('fall'));
  assert.strictEqual(E.termRuler(190), 'mercury');
  assert.strictEqual(E.termRuler(185), 'saturn');
  assert.strictEqual(E.faceRuler(15), 'sun');
});

test('horary judgment returns a verdict with testimonies', () => {
  const ch = E.castChart({ ms: Date.UTC(2026, 10, 21, 10), lat: 35.69, lon: 51.39, tz: 'Asia/Tehran', houseSystem: 'regio' });
  const j = G.Horary.judge(ch, 'career');
  assert.ok(j.verdict && j.testimonies.length > 0);
  assert.strictEqual(G.Horary.classify('آیا ویزای کانادا می‌گیرم؟').id, 'travel');
});

test('Bazi pillars: 1 Jan 2000 is a Wu-Wu (戊午) day; 1991-03-21 has Xin-Wei year and Xin-Mao month', () => {
  const ch = E.castChart({ ms: Date.UTC(2000, 0, 1, 12), lat: 51.48, lon: 0, tz: 'UTC', houseSystem: 'whole' });
  const b = G.Deep.bazi(ch, 'x', ch.ms);
  assert.deepStrictEqual([b.pillars[2].s, b.pillars[2].b], [4, 6]);
  const ch2 = E.castChart({ ms: Date.UTC(1991, 2, 21, 5, 0), lat: 35.69, lon: 51.39, tz: 'Asia/Tehran', houseSystem: 'whole' });
  const b2 = G.Deep.bazi(ch2, 'm', Date.UTC(2026, 0, 1));
  assert.deepStrictEqual(b2.pillars.slice(0, 2).map(p => [p.s, p.b]), [[7, 7], [7, 3]]);
  assert.ok(b2.luck && b2.luck.list.length === 9);
});

test('Vimshottari dasha periods are contiguous and total 120 years', () => {
  const ch = E.castChart({ ms: Date.UTC(1991, 2, 21, 5, 0), lat: 35.69, lon: 51.39, tz: 'Asia/Tehran', houseSystem: 'whole' });
  const v = G.Deep.vedic(ch, Date.UTC(2026, 0, 1));
  for (let i = 1; i < 9; i++) assert.ok(Math.abs(v.md[i].start - v.md[i - 1].end) < 1000);
  const span = (v.md[8].end - v.md[0].start) / (365.25 * 86400000);
  assert.ok(Math.abs(span - 120) < 1e-6);
  assert.ok(v.md[0].start <= ch.ms && v.md[0].end > ch.ms);
});

test('Zodiacal releasing L2 periods tile the L1 period', () => {
  const zr = G.Deep.zodiacalReleasing(100, 40, Date.UTC(1990, 0, 1), Date.UTC(2026, 0, 1));
  assert.strictEqual(zr.L2[0].start, zr.cur1.start);
  assert.strictEqual(zr.L2[zr.L2.length - 1].end, zr.cur1.end);
});

test('Tzolkin: 21 December 2012 (13.0.0.0.0) is 4 Ajaw', () => {
  const tz = G.Deep.tzolkin({ ms: Date.UTC(2012, 11, 21, 12), tz: 'UTC' });
  assert.deepStrictEqual([tz.num, tz.sign], [4, 19]);
});
