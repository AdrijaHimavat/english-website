/* اخترنامه — موتور محاسبات
 * موقعیت سیارات از astronomy-engine (دقت حدود یک دقیقهٔ قوسی)، دایرة‌البروج حقیقی همان‌روز (استوایی/تروپیکال).
 */
(function (G) {
  'use strict';
  const A = G.Astronomy;
  const KB = G.KB;
  const D2R = Math.PI / 180, R2D = 180 / Math.PI, DAY = 86400000;
  const norm = x => ((x % 360) + 360) % 360;
  const n180 = x => { x = norm(x); return x > 180 ? x - 360 : x; };
  const sep = (a, b) => Math.abs(n180(a - b));
  const signOf = lon => Math.floor(norm(lon) / 30);
  const BODY = { sun: 'Sun', moon: 'Moon', mercury: 'Mercury', venus: 'Venus', mars: 'Mars', jupiter: 'Jupiter', saturn: 'Saturn', uranus: 'Uranus', neptune: 'Neptune', pluto: 'Pluto' };
  const CLASSIC = KB.CLASSIC;
  const ALL = CLASSIC.concat(['uranus', 'neptune', 'pluto']);

  /* ---------- زمان و تقویم ---------- */
  function div(a, b) { return ~~(a / b); }
  function mod(a, b) { return a - ~~(a / b) * b; }
  const BREAKS = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
  function jalCal(jy) {
    let gy = jy + 621, leapJ = -14, jp = BREAKS[0], jm, jump = 0, n, i;
    for (i = 1; i < BREAKS.length; i++) {
      jm = BREAKS[i]; jump = jm - jp; if (jy < jm) break;
      leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4); jp = jm;
    }
    n = jy - jp;
    leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
    if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;
    const leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
    const march = 20 + leapJ - leapG;
    if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
    let leap = mod(mod(n + 1, 33) - 1, 4); if (leap === -1) leap = 4;
    return { leap, gy, march };
  }
  function g2d(gy, gm, gd) {
    let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408;
    return d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  }
  function d2g(jdn) {
    let j = 4 * jdn + 139361631;
    j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
    const i = div(mod(j, 1461), 4) * 5 + 308;
    const gd = div(mod(i, 153), 5) + 1, gm = mod(div(i, 153), 12) + 1;
    return { gy: div(j, 1461) - 100100 + div(8 - gm, 6), gm, gd };
  }
  function jalaliToGregorian(jy, jm, jd) {
    const r = jalCal(jy);
    return d2g(g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1);
  }
  function gregorianToJalali(gy, gm, gd) {
    const jdn = g2d(gy, gm, gd);
    let jy = gy - 621; const r = jalCal(jy);
    let k = jdn - g2d(gy, 3, r.march), jm, jd;
    if (k >= 0) {
      if (k <= 185) { jm = 1 + div(k, 31); jd = mod(k, 31) + 1; return { jy, jm, jd }; }
      k -= 186;
    } else {
      jy -= 1; k += 179; if (jalCal(jy).leap === 1) k += 1;
    }
    jm = 7 + div(k, 30); jd = mod(k, 30) + 1;
    return { jy, jm, jd };
  }

  // اختلاف ساعت محلی با UTC در لحظهٔ ms برای منطقهٔ زمانی IANA (به میلی‌ثانیه)
  const dtfCache = {};
  function tzOffset(ms, tz) {
    if (typeof tz === 'number') return tz * 3600000;
    let f = dtfCache[tz];
    if (!f) {
      f = dtfCache[tz] = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    }
    const p = {}; f.formatToParts(new Date(ms)).forEach(x => { p[x.type] = x.value; });
    const asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second);
    return asUTC - Math.floor(ms / 1000) * 1000;
  }
  function localToUTC(y, m, d, h, mi, tz) {
    const guess = Date.UTC(y, m - 1, d, h, mi);
    let off = tzOffset(guess - tzOffset(guess, tz), tz);
    return guess - off;
  }
  function utcToLocalParts(ms, tz) {
    const t = new Date(ms + tzOffset(ms, tz));
    return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate(), h: t.getUTCHours(), mi: t.getUTCMinutes(), wd: t.getUTCDay() };
  }

  /* ---------- اجرام ---------- */
  function lonAt(key, ms) {
    const t = A.MakeTime(new Date(ms));
    if (key === 'moon') return norm(A.EclipticGeoMoon(t).lon);
    if (key === 'sun') return norm(A.SunPosition(t).elon);
    if (key === 'node' || key === 'snode') {
      const T = (t.tt) / 36525;
      const om = norm(125.0445479 - 1934.1362891 * T + 0.0020754 * T * T + T * T * T / 467441);
      return key === 'node' ? om : norm(om + 180);
    }
    return norm(A.Ecliptic(A.GeoVector(A.Body[BODY[key]], t, true)).elon);
  }
  function speedAt(key, ms) {
    const h = key === 'moon' ? 0.05 * DAY : 0.5 * DAY;
    return n180(lonAt(key, ms + h) - lonAt(key, ms - h)) / (2 * h / DAY);
  }

  /* ---------- طالع و خانه‌ها ---------- */
  function angles(ms, lat, lon) {
    const t = A.MakeTime(new Date(ms));
    const eps = A.e_tilt(t).tobl * D2R;
    const ramc = norm(A.SiderealTime(t) * 15 + lon);
    const r = ramc * D2R, phi = lat * D2R;
    const mc = norm(Math.atan2(Math.sin(r), Math.cos(r) * Math.cos(eps)) * R2D);
    const asc = norm(Math.atan2(Math.cos(r), -(Math.sin(r) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) * R2D);
    return { ramc, eps, mc, asc, phi };
  }
  // نقطهٔ دایرةالبروج با مطلع مایل oa زیر قطب pole
  function asc1(oa, pole, eps) {
    const o = oa * D2R;
    return norm(Math.atan2(Math.sin(o), Math.cos(o) * Math.cos(eps) - Math.tan(pole) * Math.sin(eps)) * R2D);
  }
  function between(x, a, b) { const w = norm(b - a); return norm(x - a) < w; }

  function houses(ms, lat, lon, system) {
    const an = angles(ms, lat, lon);
    const { ramc, eps, mc, asc, phi } = an;
    const c = new Array(13);
    let used = system;
    if (system === 'whole') {
      const s = signOf(asc) * 30;
      for (let i = 1; i <= 12; i++) c[i] = norm(s + 30 * (i - 1));
    } else if (system === 'equal') {
      for (let i = 1; i <= 12; i++) c[i] = norm(asc + 30 * (i - 1));
    } else if (system === 'regio') {
      const p1 = Math.atan(Math.tan(phi) * 0.5), p2 = Math.atan(Math.tan(phi) * Math.sin(60 * D2R));
      c[10] = mc; c[1] = asc;
      c[11] = asc1(ramc + 30, p1, eps); c[12] = asc1(ramc + 60, p2, eps);
      c[2] = asc1(ramc + 120, p2, eps); c[3] = asc1(ramc + 150, p1, eps);
    } else { // placidus
      let ok = true;
      const cusp = (f, below) => {
        let l = below ? norm(asc + 30 * f * 3) : norm(mc + 30 * f * 3);
        for (let k = 0; k < 30; k++) {
          const dec = Math.asin(Math.sin(eps) * Math.sin(l * D2R));
          const x = Math.tan(dec) * Math.tan(phi);
          if (Math.abs(x) >= 1) { ok = false; return l; }
          const ad = Math.asin(x) * R2D;
          const ra = below ? ramc + 90 + ad + f * (90 - ad) : ramc + f * (90 + ad);
          const nl = norm(Math.atan2(Math.sin(ra * D2R), Math.cos(ra * D2R) * Math.cos(eps)) * R2D);
          if (sep(nl, l) < 1e-7) { l = nl; break; }
          l = nl;
        }
        return l;
      };
      c[10] = mc; c[1] = asc;
      c[11] = cusp(1 / 3, false); c[12] = cusp(2 / 3, false);
      c[2] = cusp(1 / 3, true); c[3] = cusp(2 / 3, true);
      if (!ok) { const r = houses(ms, lat, lon, 'regio'); r.fallback = true; return r; }
    }
    if (system === 'regio' || system === 'placidus') {
      // اطمینان از ترتیب درست (رفع ابهام ۱۸۰ درجه)
      if (!between(c[11], mc, asc)) c[11] = norm(c[11] + 180);
      if (!between(c[12], mc, asc)) c[12] = norm(c[12] + 180);
      if (!between(c[2], asc, norm(mc + 180))) c[2] = norm(c[2] + 180);
      if (!between(c[3], asc, norm(mc + 180))) c[3] = norm(c[3] + 180);
      c[4] = norm(mc + 180); c[7] = norm(asc + 180);
      c[5] = norm(c[11] + 180); c[6] = norm(c[12] + 180);
      c[8] = norm(c[2] + 180); c[9] = norm(c[3] + 180);
    }
    return { cusps: c, asc, mc, ramc, eps: eps * R2D, system: used };
  }
  function houseOf(lon, h) {
    if (h.system === 'whole') return (signOf(lon) - signOf(h.cusps[1]) + 12) % 12 + 1;
    for (let i = 1; i <= 12; i++) {
      const a = h.cusps[i], b = h.cusps[i % 12 + 1];
      if (between(lon, a, b)) return i;
    }
    return 1;
  }

  /* ---------- قوت‌ها (دلایل ذاتی و عرضی) ---------- */
  const el = s => ['fire', 'earth', 'air', 'water'][s % 4];
  function ruler(sign) { return KB.DOMICILE[sign]; }
  function exaltRuler(sign) { for (const p in KB.EXALT) if (KB.EXALT[p][0] === sign) return p; return null; }
  function tripRuler(sign, isDay) { const t = KB.ELEMENTS[el(sign)].trip; return isDay ? t[0] : t[1]; }
  function termRuler(lon) { const s = signOf(lon), d = norm(lon) - s * 30; for (const [p, e] of KB.TERMS[s]) if (d < e) return p; return KB.TERMS[s][4][0]; }
  function faceRuler(lon) { return KB.FACE_ORDER[Math.floor(norm(lon) / 10) % 7]; }

  function essential(p, lon, isDay) {
    const s = signOf(lon), list = [];
    let score = 0;
    if (ruler(s) === p) { score += 5; list.push('domicile'); }
    if (KB.EXALT[p] && KB.EXALT[p][0] === s) { score += 4; list.push('exaltation'); }
    if (tripRuler(s, isDay) === p) { score += 3; list.push('triplicity'); }
    if (termRuler(lon) === p) { score += 2; list.push('term'); }
    if (faceRuler(lon) === p) { score += 1; list.push('face'); }
    if (ruler((s + 6) % 12) === p) { score -= 5; list.push('detriment'); }
    if (KB.EXALT[p] && (KB.EXALT[p][0] + 6) % 12 === s) { score -= 4; list.push('fall'); }
    if (!list.some(x => ['domicile', 'exaltation', 'triplicity', 'term', 'face'].includes(x))) { score -= 5; list.push('peregrine'); }
    return { score, list };
  }
  function almuten(lon, isDay) {
    const pts = {}; CLASSIC.forEach(p => { pts[p] = 0; });
    const s = signOf(lon);
    pts[ruler(s)] += 5;
    const ex = exaltRuler(s); if (ex) pts[ex] += 4;
    pts[tripRuler(s, isDay)] += 3; pts[termRuler(lon)] += 2; pts[faceRuler(lon)] += 1;
    return CLASSIC.slice().sort((a, b) => pts[b] - pts[a])[0];
  }
  const HOUSE_PTS = { 1: 5, 10: 5, 7: 4, 4: 4, 11: 4, 2: 3, 5: 3, 9: 2, 3: 1, 12: -5, 8: -2, 6: -2 };

  function fixedStarLon(lon2000, ms) {
    const years = (ms - Date.UTC(2000, 0, 1, 12)) / (365.25 * DAY);
    return norm(lon2000 + years * 50.29 / 3600);
  }

  function accidental(p, pl, chart) {
    const list = []; let score = 0;
    const add = (v, code, arg) => { score += v; list.push([v, code, arg]); };
    add(HOUSE_PTS[pl.house], 'house', pl.house);
    if (p !== 'sun' && p !== 'moon') {
      if (pl.speed < 0) add(-5, 'retro'); else add(4, 'direct');
    }
    if (KB.MEAN_SPEED[p]) {
      if (Math.abs(pl.speed) > KB.MEAN_SPEED[p]) add(2, 'swift'); else add(-2, 'slow');
    }
    const sun = chart.planets.sun;
    if (p !== 'sun') {
      const d = sep(pl.lon, sun.lon);
      if (d <= 17 / 60) add(5, 'cazimi');
      else if (d <= 8.5) add(-5, 'combust');
      else if (d <= 17) add(-4, 'beams');
      else add(5, 'free');
      const ahead = n180(pl.lon - sun.lon) > 0;
      if (['mars', 'jupiter', 'saturn'].includes(p)) { if (!ahead) add(2, 'oriental'); else add(-2, 'occidental'); }
      if (['venus', 'mercury'].includes(p)) { if (ahead) add(2, 'occidental'); else add(-2, 'oriental'); }
      if (p === 'moon') { if (ahead) add(2, 'waxing'); else add(-2, 'waning'); }
    }
    ['jupiter', 'venus', 'mars', 'saturn'].forEach(q => {
      if (q === p) return;
      const d = sep(pl.lon, chart.planets[q].lon);
      const good = q === 'jupiter' || q === 'venus';
      if (d <= 1) add(good ? 5 : -5, 'partileConj', q);
      else if (Math.abs(d - 120) <= 1 || Math.abs(d - 60) <= 1) { if (good) add(4, 'partileTrine', q); }
      else if (Math.abs(d - 180) <= 1) { if (!good) add(-4, 'partileOpp', q); }
      else if (Math.abs(d - 90) <= 1) { if (!good) add(-3, 'partileSquare', q); }
    });
    KB.FIXED_STARS.forEach(st => {
      if (st.score && sep(pl.lon, fixedStarLon(st.lon2000, chart.ms)) <= 1.5) add(st.score, 'star', st.id);
    });
    return { score, list };
  }

  /* ---------- declination & sidereal ---------- */
  function declination(key, ms) {
    const t = A.MakeTime(new Date(ms));
    let v;
    if (key === 'moon') v = A.GeoMoon(t);
    else v = A.GeoVector(A.Body[BODY[key]], t, true);
    const eqd = A.RotateVector(A.Rotation_EQJ_EQD(t), v);
    return A.EquatorFromVector(eqd).dec;
  }
  function obliquity(ms) { return A.e_tilt(A.MakeTime(new Date(ms))).tobl; }
  // Lahiri (Chitrapaksha) ayanamsa, linear model: 23°51'11" at J2000, 50.29"/year
  function ayanamsa(ms) { return 23.8531 + (ms - Date.UTC(2000, 0, 1, 12)) / (365.25 * DAY) * 50.29 / 3600; }

  /* ---------- نظرات ---------- */
  function aspectBetween(a, b, keyA, keyB) {
    const d = sep(a.lon, b.lon);
    const limit = (KB.MOIETY[keyA] || 2.5) + (KB.MOIETY[keyB] || 2.5);
    for (const asp of KB.ASPECTS) {
      const orb = Math.abs(d - asp.angle);
      if (orb <= limit) {
        const dt = 0.01;
        const d2 = sep(a.lon + a.speed * dt, b.lon + b.speed * dt);
        const applying = Math.abs(d2 - asp.angle) < orb;
        return { a: keyA, b: keyB, aspect: asp, orb, applying, exact: orb < 0.17 };
      }
    }
    return null;
  }

  /* ---------- زایچه ---------- */
  function sunAltitude(ms, lat, lon) {
    const t = A.MakeTime(new Date(ms));
    const obs = new A.Observer(lat, lon, 0);
    const eq = A.Equator(A.Body.Sun, t, obs, true, true);
    return A.Horizon(t, obs, eq.ra, eq.dec, 'normal').altitude;
  }

  function castChart(opts) {
    const { ms, lat, lon } = opts;
    const system = opts.houseSystem || 'placidus';
    const h = houses(ms, lat, lon, system);
    const chart = { ms, lat, lon, tz: opts.tz, houses: h, asc: h.asc, mc: h.mc, cusps: h.cusps, planets: {} };
    const keys = ALL.concat(['node', 'snode']);
    keys.forEach(k => {
      const L = lonAt(k, ms);
      const sp = (k === 'node' || k === 'snode') ? -0.053 : speedAt(k, ms);
      chart.planets[k] = { key: k, lon: L, speed: sp, retro: sp < 0 && k !== 'node' && k !== 'snode', sign: signOf(L), deg: L - signOf(L) * 30, house: houseOf(L, h) };
    });
    chart.sunAlt = sunAltitude(ms, lat, lon);
    chart.isDay = chart.sunAlt > -0.833;
    // قوت‌ها
    CLASSIC.forEach(k => {
      const pl = chart.planets[k];
      pl.ess = essential(k, pl.lon, chart.isDay);
      pl.acc = accidental(k, pl, chart);
      pl.total = pl.ess.score + pl.acc.score;
    });
    // نظرات میان سیارات کلاسیک (و سیارات نو با فلک کوچک)
    chart.aspects = [];
    for (let i = 0; i < ALL.length; i++) for (let j = i + 1; j < ALL.length; j++) {
      const a = ALL[i], b = ALL[j];
      if (KB.PLANETS[a].modern && KB.PLANETS[b].modern) continue;
      const asp = aspectBetween(chart.planets[a], chart.planets[b], a, b);
      if (asp) chart.aspects.push(asp);
    }
    // سهام
    const P = chart.planets, asc = h.asc, day = chart.isDay;
    const lot = (x, y) => norm(asc + x - y);
    chart.lots = {
      fortune: day ? lot(P.moon.lon, P.sun.lon) : lot(P.sun.lon, P.moon.lon),
      spirit: day ? lot(P.sun.lon, P.moon.lon) : lot(P.moon.lon, P.sun.lon),
      marriage: opts.sex === 'f' ? lot(P.saturn.lon, P.venus.lon) : lot(P.venus.lon, P.saturn.lon),
      father: day ? lot(P.saturn.lon, P.sun.lon) : lot(P.sun.lon, P.saturn.lon),
      mother: day ? lot(P.moon.lon, P.venus.lon) : lot(P.venus.lon, P.moon.lon)
    };
    const L = chart.lots;
    // Hermetic lots (Paulus Alexandrinus)
    L.eros = day ? lot(P.venus.lon, L.spirit) : lot(L.spirit, P.venus.lon);
    L.necessity = day ? lot(L.fortune, P.mercury.lon) : lot(P.mercury.lon, L.fortune);
    L.courage = day ? lot(L.fortune, P.mars.lon) : lot(P.mars.lon, L.fortune);
    L.victory = day ? lot(P.jupiter.lon, L.spirit) : lot(L.spirit, P.jupiter.lon);
    L.nemesis = day ? lot(L.fortune, P.saturn.lon) : lot(P.saturn.lon, L.fortune);
    chart.lotHouses = {}; for (const k in chart.lots) chart.lotHouses[k] = houseOf(chart.lots[k], h);
    // خداوند طالع، کدخدای زایچه (قوی‌ترین)
    chart.ascRuler = ruler(signOf(asc));
    chart.almutenAsc = almuten(asc, day);
    chart.strongest = CLASSIC.slice().sort((a, b) => P[b].total - P[a].total);
    chart.moonPhase = norm(P.moon.lon - P.sun.lon);
    chart.houseRulers = []; for (let i = 1; i <= 12; i++) chart.houseRulers[i] = ruler(signOf(h.cusps[i]));
    return chart;
  }

  /* ---------- مزاج (روش لیلی/بطلمیوس) ---------- */
  function temperament(chart) {
    const tally = { hot: 0, cold: 0, dry: 0, moist: 0 }, why = [];
    const addQ = (q, w, label) => { q.forEach(x => { tally[x] += w; }); why.push(label); };
    const P = chart.planets;
    const ascS = signOf(chart.asc);
    addQ(KB.ELEMENTS[el(ascS)].q, 1, 'برج طالع');
    const ar = chart.ascRuler;
    addQ(ar === 'mercury' ? KB.ELEMENTS[el(P.mercury.sign)].q : KB.PLANETS[ar].nature, 1, 'خداوند طالع');
    addQ(KB.ELEMENTS[el(P[ar].sign)].q, 1, 'برج خداوند طالع');
    addQ(KB.ELEMENTS[el(P.moon.sign)].q, 1, 'برج ماه');
    const ph = chart.moonPhase;
    addQ(ph < 90 ? ['hot', 'moist'] : ph < 180 ? ['hot', 'dry'] : ph < 270 ? ['cold', 'dry'] : ['cold', 'moist'], 1, 'ربع ماه');
    const ss = P.sun.sign;
    addQ(ss <= 2 ? ['hot', 'moist'] : ss <= 5 ? ['hot', 'dry'] : ss <= 8 ? ['cold', 'dry'] : ['cold', 'moist'], 1, 'فصل تولد');
    CLASSIC.forEach(k => { if (P[k].house === 1 && k !== 'mercury') addQ(KB.PLANETS[k].nature, 1, 'سیاره در طالع'); });
    const hot = tally.hot >= tally.cold, dry = tally.dry >= tally.moist;
    const key = hot ? (dry ? 'choleric' : 'sanguine') : (dry ? 'melancholic' : 'phlegmatic');
    // مزاج دوم
    const hot2 = Math.abs(tally.hot - tally.cold), dry2 = Math.abs(tally.dry - tally.moist);
    const secondKey = hot2 < dry2 ? ((!hot) ? (dry ? 'choleric' : 'sanguine') : (dry ? 'melancholic' : 'phlegmatic'))
      : (hot ? (!dry ? 'choleric' : 'sanguine') : (!dry ? 'melancholic' : 'phlegmatic'));
    return { key, second: secondKey, tally };
  }

  /* ---------- فردارات ---------- */
  function firdaria(birthMs, isDay, atMs) {
    const seq = KB.FIRDARIA[isDay ? 'day' : 'night'];
    const YEAR = 365.2422 * DAY;
    const out = []; let t = birthMs, cycle = 0;
    while (t < atMs + 80 * YEAR && out.length < 40) {
      for (const [lord, yrs] of seq) {
        const start = t, end = t + yrs * YEAR;
        const subs = [];
        if (lord !== 'node' && lord !== 'snode') {
          const order = ['sun', 'venus', 'mercury', 'moon', 'saturn', 'jupiter', 'mars'];
          let i = order.indexOf(lord); const len = (end - start) / 7;
          for (let k = 0; k < 7; k++) subs.push({ lord: order[(i + k) % 7], start: start + k * len, end: start + (k + 1) * len });
        }
        out.push({ lord, start, end, subs, cycle });
        t = end;
      }
      cycle++;
      if (t > atMs + 30 * YEAR) break;
    }
    const cur = out.find(p => atMs >= p.start && atMs < p.end);
    const sub = cur && cur.subs.find(s => atMs >= s.start && atMs < s.end);
    return { periods: out, current: cur, sub };
  }

  /* ---------- انتها (سال‌خدای فلکی) ---------- */
  function profection(birthMs, atMs, ascSign, tz) {
    const b = utcToLocalParts(birthMs, tz), a = utcToLocalParts(atMs, tz);
    let age = a.y - b.y;
    if (a.m < b.m || (a.m === b.m && a.d < b.d)) age--;
    age = Math.max(0, age);
    const sign = (ascSign + age) % 12;
    return { age, sign, house: age % 12 + 1, lord: ruler(sign) };
  }

  /* ---------- جست‌وجوی کمال نظر (برای پرسش ساعتی) ---------- */
  // نخستین لحظه‌ای که فاصلهٔ a و b به یکی از زوایای بطلمیوسی می‌رسد
  function nextPerfection(a, b, startMs, maxDays, angles) {
    angles = angles || [0, 60, 90, 120, 180];
    const step = (a === 'moon' || b === 'moon') ? 0.125 : 0.5;
    let t0 = startMs, d0 = sep(lonAt(a, t0), lonAt(b, t0));
    for (let i = 1; i * step <= maxDays; i++) {
      const t1 = startMs + i * step * DAY;
      const d1 = sep(lonAt(a, t1), lonAt(b, t1));
      for (const ang of angles) {
        if ((d0 - ang) * (d1 - ang) <= 0 && !(ang === 0 && d0 === 0) && Math.abs(d0 - d1) < 60) {
          // بازه را با دوبخشی دقیق کن
          let lo = t0, hi = t1, dl = d0;
          for (let k = 0; k < 30; k++) {
            const mid = (lo + hi) / 2, dm = sep(lonAt(a, mid), lonAt(b, mid));
            if ((dl - ang) * (dm - ang) <= 0) hi = mid; else { lo = mid; dl = dm; }
          }
          if (Math.abs(sep(lonAt(a, hi), lonAt(b, hi)) - ang) < 0.05) return { ms: hi, angle: ang };
        }
      }
      t0 = t1; d0 = d1;
    }
    return null;
  }
  function lastPerfection(a, b, startMs, maxDays) {
    const step = 0.125;
    let t0 = startMs, d0 = sep(lonAt(a, t0), lonAt(b, t0));
    for (let i = 1; i * step <= maxDays; i++) {
      const t1 = startMs - i * step * DAY;
      const d1 = sep(lonAt(a, t1), lonAt(b, t1));
      for (const ang of [0, 60, 90, 120, 180]) {
        if ((d0 - ang) * (d1 - ang) <= 0 && Math.abs(d0 - d1) < 60) return { ms: t1, angle: ang };
      }
      t0 = t1; d0 = d1;
    }
    return null;
  }
  function signChangeMs(key, startMs, maxDays) {
    const s0 = signOf(lonAt(key, startMs));
    const step = key === 'moon' ? 0.05 : 0.5;
    for (let i = 1; i * step <= maxDays; i++) {
      const t = startMs + i * step * DAY;
      if (signOf(lonAt(key, t)) !== s0) return t;
    }
    return Infinity;
  }
  function stationBetween(key, t0, t1) {
    if (key === 'sun' || key === 'moon') return false;
    const n = Math.max(4, Math.ceil((t1 - t0) / (2 * DAY)));
    let s0 = Math.sign(speedAt(key, t0));
    for (let i = 1; i <= n; i++) {
      const s = Math.sign(speedAt(key, t0 + (t1 - t0) * i / n));
      if (s !== s0) return true;
    }
    return false;
  }

  /* ---------- ماه خالی‌السیر ---------- */
  function moonNextAspects(chart, limitToSign) {
    const P = chart.planets, m = P.moon;
    const leaveDeg = 30 - m.deg;
    const res = [];
    CLASSIC.forEach(k => {
      if (k === 'moon') return;
      const p = P[k], rel = m.speed - p.speed;
      if (rel <= 0) return;
      let best = null;
      KB.ASPECTS.forEach(asp => {
        [asp.angle, -asp.angle].forEach(sg => {
          // زاویهٔ لازم: moon - p ≡ sg
          let need = norm(p.lon + sg - m.lon);
          const days = need / rel;
          const moved = need * m.speed / rel;
          if (need > 0.0001 && (!best || days < best.days)) best = { planet: k, aspect: asp, days, moved };
        });
      });
      if (best && (!limitToSign || best.moved <= leaveDeg)) res.push(best);
    });
    return res.sort((a, b) => a.days - b.days);
  }
  function moonVoid(chart) { return moonNextAspects(chart, true).length === 0; }

  /* ---------- ساعات کواکب ---------- */
  const srCache = {};
  function riseSet(kind, ms, lat, lon) {
    const obs = new A.Observer(lat, lon, 0);
    const r = A.SearchRiseSet(A.Body.Sun, obs, kind, A.MakeTime(new Date(ms)), 2);
    return r ? r.date.getTime() : null;
  }
  function planetaryHour(ms, lat, lon) {
    const key = Math.floor(ms / (3 * 3600000)) + ':' + lat.toFixed(2) + ':' + lon.toFixed(2);
    try {
      let sr = riseSet(+1, ms - 1.5 * DAY, lat, lon);
      if (sr === null) return null;
      let nx = riseSet(+1, sr + 60000, lat, lon);
      while (nx !== null && nx <= ms) { sr = nx; nx = riseSet(+1, sr + 60000, lat, lon); }
      const ss = riseSet(-1, sr, lat, lon);
      if (ss === null || nx === null) return null;
      const wd = new Date(sr + lon / 15 * 3600000).getUTCDay();
      const dayRuler = KB.DAY_RULER[wd];
      let idx, len, start;
      if (ms < ss) { len = (ss - sr) / 12; idx = Math.floor((ms - sr) / len); start = sr + idx * len; }
      else { len = (nx - ss) / 12; idx = 12 + Math.floor((ms - ss) / len); start = ss + (idx - 12) * len; }
      const ci = KB.CHALDEAN.indexOf(dayRuler);
      return { dayRuler, hourRuler: KB.CHALDEAN[(ci + idx) % 7], index: idx, start, end: start + len, weekday: wd, sunrise: sr, sunset: ss };
    } catch (e) { return null; }
  }

  G.AstroEngine = {
    norm, n180, sep, signOf, DAY, CLASSIC, ALL,
    jalaliToGregorian, gregorianToJalali, tzOffset, localToUTC, utcToLocalParts,
    lonAt, speedAt, angles, houses, houseOf, ruler, exaltRuler, tripRuler, termRuler, faceRuler,
    essential, almuten, castChart, temperament, firdaria, profection, aspectBetween,
    nextPerfection, lastPerfection, signChangeMs, stationBetween, moonNextAspects, moonVoid,
    planetaryHour, sunAltitude, fixedStarLon, el, declination, obliquity, ayanamsa, A
  };
})(typeof window !== 'undefined' ? window : globalThis);
