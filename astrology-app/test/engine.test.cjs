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
