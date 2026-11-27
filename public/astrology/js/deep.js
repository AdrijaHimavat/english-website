/* Akhtarnameh — deep reading across traditions.
 * Hellenistic (Valens, Paulus, Rhetorius), Perso-Arabic (Abu Ma'shar, al-Biruni, Ibn Ezra), Indian (Parashara,
 * Varahamihira), Chinese (Zi Ping four pillars), German/modern (Ebertin midpoints, Addey harmonics, Jones shapes,
 * Rudhyar lunation), Maya (Tzolk'in). The synthesis step looks for factors that independent systems agree on.
 */
(function (G) {
  'use strict';
  const KB = G.KB, E = G.AstroEngine, A = G.Astronomy, I = G.Interpret, T = G.I18N;
  const t = (k, p) => T.t(k, p);
  const DAY = E.DAY, YEAR = 365.2422 * DAY;
  const { norm, sep, n180, signOf } = E;
  const CL = KB.CLASSIC;
  const PTS = CL.concat(['uranus', 'neptune', 'pluto']);
  const pn = k => I.pn(k), sn = i => I.sn(i);
  const nm = x => T.num(x, 1);

  /* ================= Hellenistic ================= */
  function sect(chart) {
    const d = chart.isDay;
    return { benefic: d ? 'jupiter' : 'venus', benOut: d ? 'venus' : 'jupiter', malefic: d ? 'mars' : 'saturn', malIn: d ? 'saturn' : 'mars' };
  }
  function overcoming(chart) {
    const P = chart.planets, out = [];
    CL.forEach(a => CL.forEach(b => {
      if (a === b) return;
      if (P[a].sign === (P[b].sign + 9) % 12) out.push({ a, b });
    }));
    return out;
  }
  function besieged(chart) {
    const P = chart.planets, out = [];
    CL.forEach(p => {
      const others = CL.filter(q => q !== p).map(q => ({ q, d: n180(P[q].lon - P[p].lon) }));
      const before = others.filter(o => o.d < 0).sort((x, y) => y.d - x.d)[0] || others.sort((x, y) => y.d - x.d)[0];
      const after = others.filter(o => o.d > 0).sort((x, y) => x.d - y.d)[0] || others.sort((x, y) => x.d - y.d)[0];
      if (!before || !after) return;
      const pair = [before.q, after.q].sort().join('+');
      if (Math.abs(before.d) > 15 || Math.abs(after.d) > 15) return;
      if (pair === 'mars+saturn') out.push({ p, kind: 'malefic' });
      if (pair === 'jupiter+venus') out.push({ p, kind: 'benefic' });
    });
    return out;
  }
  function lastPhase(target, ms) {
    let tt = ms - 33 * DAY, last = null;
    for (let i = 0; i < 4; i++) {
      const r = A.SearchMoonPhase(target, A.MakeTime(new Date(tt)), 40);
      if (!r || r.date.getTime() > ms) break;
      last = r.date.getTime(); tt = last + DAY;
    }
    return last;
  }
  function syzygy(chart) {
    const nmn = lastPhase(0, chart.ms), fm = lastPhase(180, chart.ms);
    const isNew = nmn >= fm;
    const ms = isNew ? nmn : fm;
    let lon = E.lonAt('moon', ms);
    if (!isNew && E.sunAltitude(ms, chart.lat, chart.lon) > 0) lon = E.lonAt('sun', ms);
    return { kind: isNew ? 'new' : 'full', ms, lon, lord: E.ruler(signOf(lon)), house: E.houseOf(lon, chart.houses) };
  }
  function almutenFiguris(chart, syz) {
    const pts = {}; CL.forEach(p => { pts[p] = 0; });
    const day = chart.isDay;
    [chart.planets.sun.lon, chart.planets.moon.lon, chart.asc, chart.lots.fortune, syz.lon].forEach(lon => {
      const s = signOf(lon);
      pts[E.ruler(s)] += 5;
      const ex = E.exaltRuler(s); if (ex) pts[ex] += 4;
      pts[E.tripRuler(s, day)] += 3; pts[E.termRuler(lon)] += 2; pts[E.faceRuler(lon)] += 1;
    });
    const order = CL.slice().sort((a, b) => pts[b] - pts[a]);
    return { planet: order[0], points: pts[order[0]], pts };
  }
  function dispositors(chart) {
    const P = chart.planets, disp = {};
    CL.forEach(p => { disp[p] = E.ruler(P[p].sign); });
    const finals = CL.filter(p => disp[p] === p);
    const ends = CL.map(p => { const seen = [p]; let x = p; while (!seen.includes(disp[x])) { x = disp[x]; seen.push(x); } return { p, end: disp[x], path: seen }; });
    const sole = finals.length === 1 && ends.every(e => e.end === finals[0]) ? finals[0] : null;
    const mutual = [];
    CL.forEach(a => CL.forEach(b => { if (a < b && disp[a] === b && disp[b] === a) mutual.push([a, b]); }));
    // loops longer than two
    const loops = [];
    CL.forEach(p => {
      let x = p; const path = [];
      for (let i = 0; i < 8; i++) { path.push(x); x = disp[x]; if (x === p && path.length > 2) { const key = path.slice().sort().join(); if (!loops.some(l => l.key === key)) loops.push({ key, path }); break; } if (path.includes(x)) break; }
    });
    return { disp, finals, sole, mutual, loops };
  }
  function zodiacalReleasing(lotLon, fortuneLon, birthMs, atMs) {
    const Y = 360 * DAY, MO = 30 * DAY;
    const fs = signOf(fortuneLon);
    const peak = s => { const r = (s - fs + 12) % 12; return r === 9 ? 'major' : r === 0 || r === 6 || r === 3 ? 'minor' : null; };
    const L1 = []; let tt = birthMs, s = signOf(lotLon);
    while (tt < atMs + 60 * Y && L1.length < 40) { const len = KB.ZR_YEARS[s] * Y; L1.push({ sign: s, start: tt, end: tt + len, peak: peak(s) }); tt += len; s = (s + 1) % 12; }
    const cur1 = L1.find(p => atMs >= p.start && atMs < p.end);
    const L2 = []; let t2 = cur1.start, s2 = cur1.sign, n = 0, lb = false;
    while (t2 < cur1.end && L2.length < 40) {
      const len = KB.ZR_YEARS[s2] * MO;
      L2.push({ sign: s2, start: t2, end: Math.min(t2 + len, cur1.end), peak: peak(s2), lb });
      lb = false; t2 += len; n++; s2 = (s2 + 1) % 12;
      if (n === 12) { s2 = (cur1.sign + 6) % 12; lb = true; }
    }
    const cur2 = L2.find(p => atMs >= p.start && atMs < p.end) || L2[L2.length - 1];
    const nextMajor = L1.find(p => p.start > atMs && p.peak === 'major');
    const nextL2Peak = L2.find(p => p.start > atMs && p.peak === 'major');
    return { cur1, cur2, nextMajor, nextL2Peak, L1, L2 };
  }

  /* ================= Patterns ================= */
  function patterns(chart) {
    const P = chart.planets;
    const L = k => P[k].lon;
    const asp = (a, b, ang, orb) => Math.abs(sep(L(a), L(b)) - ang) <= orb;
    const configs = [];
    const add = (type, pl, extra) => {
      const key = type + ':' + pl.slice().sort().join();
      if (!configs.some(c => c.key === key)) configs.push(Object.assign({ key, type, planets: pl }, extra || {}));
    };
    const n = PTS.length;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) for (let k = j + 1; k < n; k++) {
      const a = PTS[i], b = PTS[j], c = PTS[k];
      if (asp(a, b, 120, 7) && asp(b, c, 120, 7) && asp(a, c, 120, 7)) add('grandtrine', [a, b, c], { el: KB.SIGNS[P[a].sign].el });
    }
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const a = PTS[i], b = PTS[j];
      if (asp(a, b, 180, 7)) PTS.forEach(c => {
        if (c === a || c === b) return;
        if (asp(a, c, 90, 7) && asp(b, c, 90, 7)) {
          const d = PTS.find(x => x !== a && x !== b && x !== c && asp(c, x, 180, 7) && asp(a, x, 90, 7) && asp(b, x, 90, 7));
          if (d) add('grandcross', [a, b, c, d], { mod: KB.SIGNS[P[a].sign].mod });
          else add('tsquare', [a, b, c], { apex: c, mod: KB.SIGNS[P[c].sign].mod, empty: norm(L(c) + 180) });
        }
      });
      if (asp(a, b, 60, 3)) PTS.forEach(c => {
        if (c === a || c === b) return;
        if (asp(a, c, 150, 2.5) && asp(b, c, 150, 2.5)) add('yod', [a, b, c], { apex: c });
      });
    }
    configs.filter(c => c.type === 'grandtrine').forEach(g => {
      g.planets.forEach(x => {
        const others = g.planets.filter(y => y !== x);
        PTS.forEach(d => {
          if (g.planets.includes(d)) return;
          if (asp(x, d, 180, 7) && asp(others[0], d, 60, 6) && asp(others[1], d, 60, 6)) add('kite', g.planets.concat([d]), { apex: d });
        });
      });
    });
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const a = PTS[i], b = PTS[j];
      if (!asp(a, b, 180, 6)) continue;
      for (let k = 0; k < n; k++) for (let l = k + 1; l < n; l++) {
        const c = PTS[k], d = PTS[l];
        if ([a, b].includes(c) || [a, b].includes(d) || !asp(c, d, 180, 6)) continue;
        if ((asp(a, c, 120, 6) && asp(b, d, 120, 6) && asp(a, d, 60, 5) && asp(b, c, 60, 5)) ||
          (asp(a, d, 120, 6) && asp(b, c, 120, 6) && asp(a, c, 60, 5) && asp(b, d, 60, 5))) add('mystic', [a, b, c, d]);
      }
    }
    for (let s = 0; s < 12; s++) {
      const inS = PTS.filter(k => P[k].sign === s);
      if (inS.length >= 3) add('stellium', inS, { sign: s, house: E.houseOf(L(inS[0]), chart.houses) });
    }
    // Jones shape
    const lons = PTS.map(L).sort((x, y) => x - y);
    const gaps = lons.map((x, i) => norm(lons[(i + 1) % lons.length] - x));
    const maxGap = Math.max.apply(null, gaps), span = 360 - maxGap;
    let shape, handle = null;
    if (span <= 125) shape = 'bundle';
    else if (span <= 185) shape = 'bowl';
    else {
      for (const k of PTS) {
        const rest = PTS.filter(x => x !== k).map(L).sort((x, y) => x - y);
        const g2 = rest.map((x, i) => norm(rest[(i + 1) % rest.length] - x));
        const mg = Math.max.apply(null, g2);
        if (360 - mg <= 185) { const gi = g2.indexOf(mg); const from = rest[gi]; if (norm(L(k) - from) < mg && norm(L(k) - from) > 0) { handle = k; break; } }
      }
      if (handle) shape = 'bucket';
      else if (span <= 245) shape = 'locomotive';
      else if (gaps.filter(g => g >= 60).length >= 2) shape = 'seesaw';
      else if (new Set(PTS.map(k => P[k].sign)).size >= 7 && maxGap <= 75) shape = 'splash';
      else shape = 'splay';
    }
    const above = PTS.filter(k => P[k].house >= 7).length, east = PTS.filter(k => [10, 11, 12, 1, 2, 3].includes(P[k].house)).length;
    // aspects counted on the classical seven
    const count = {}; CL.forEach(k => { count[k] = 0; });
    chart.aspects.forEach(a => { if (count[a.a] !== undefined) count[a.a]++; if (count[a.b] !== undefined) count[a.b]++; });
    const unaspected = CL.filter(k => !chart.aspects.some(a => (a.a === k || a.b === k) && !KB.PLANETS[a.a === k ? a.b : a.a].modern));
    const mostAspected = CL.slice().sort((x, y) => count[y] - count[x])[0];
    // declinations
    const obl = E.obliquity(chart.ms);
    const dec = {}; PTS.forEach(k => { dec[k] = E.declination(k, chart.ms); });
    const oob = PTS.filter(k => Math.abs(dec[k]) > obl);
    const parallels = [];
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const a = PTS[i], b = PTS[j];
      if (KB.PLANETS[a].modern && KB.PLANETS[b].modern) continue;
      if (Math.sign(dec[a]) === Math.sign(dec[b]) && Math.abs(dec[a] - dec[b]) <= 1) parallels.push({ a, b, kind: 'parallel', orb: Math.abs(dec[a] - dec[b]) });
      else if (Math.sign(dec[a]) !== Math.sign(dec[b]) && Math.abs(dec[a] + dec[b]) <= 1) parallels.push({ a, b, kind: 'contraparallel', orb: Math.abs(dec[a] + dec[b]) });
    }
    // antiscia
    const APTS = PTS.concat(['asc', 'mc']);
    const lonX = k => k === 'asc' ? chart.asc : k === 'mc' ? chart.mc : L(k);
    const antiscia = [];
    for (let i = 0; i < APTS.length; i++) for (let j = i + 1; j < APTS.length; j++) {
      const a = APTS[i], b = APTS[j];
      if ((a === 'asc' || a === 'mc') && (b === 'asc' || b === 'mc')) continue;
      if (KB.PLANETS[a] && KB.PLANETS[a].modern && KB.PLANETS[b] && KB.PLANETS[b].modern) continue;
      const o1 = sep(norm(180 - lonX(a)), lonX(b)), o2 = sep(norm(360 - lonX(a)), lonX(b));
      if (o1 <= 1.5) antiscia.push({ a, b, kind: 'antiscia', orb: o1 });
      else if (o2 <= 1.5) antiscia.push({ a, b, kind: 'contra', orb: o2 });
    }
    // midpoints (90° dial)
    const MPTS = PTS.concat(['asc', 'mc']);
    const mids = [];
    const important = k => ['sun', 'moon', 'asc', 'mc'].includes(k);
    for (let i = 0; i < MPTS.length; i++) for (let j = i + 1; j < MPTS.length; j++) {
      const a = MPTS[i], b = MPTS[j];
      if (a === 'asc' && b === 'mc') continue;
      const m = norm(lonX(a) + n180(lonX(b) - lonX(a)) / 2);
      MPTS.forEach(c => {
        if (c === a || c === b) return;
        const x = norm(lonX(c) - m) % 90, d = Math.min(x, 90 - x);
        const lim = important(c) || important(a) || important(b) ? 1.5 : 1;
        if (d <= lim) mids.push({ a, b, c, orb: d, rank: d - (important(c) ? 0.6 : 0) - (important(a) || important(b) ? 0.2 : 0) + (KB.PLANETS[c] && KB.PLANETS[c].modern ? 0.3 : 0) });
      });
    }
    mids.sort((x, y) => x.rank - y.rank);
    // harmonic aspects
    const HARM = [{ h: 5, angles: [72, 144], orb: 1.5 }, { h: 7, angles: [360 / 7, 720 / 7, 1080 / 7], orb: 1 }, { h: 9, angles: [40, 80, 160], orb: 1 }];
    const harmonics = HARM.map(H => {
      const links = [];
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const a = PTS[i], b = PTS[j];
        if (KB.PLANETS[a].modern && KB.PLANETS[b].modern) continue;
        const d = sep(L(a), L(b));
        if (H.angles.some(x => Math.abs(d - x) <= H.orb)) links.push([a, b]);
      }
      // connected groups
      const groups = [];
      links.forEach(([a, b]) => {
        const ga = groups.find(g => g.has(a)), gb = groups.find(g => g.has(b));
        if (ga && gb && ga !== gb) { gb.forEach(x => ga.add(x)); groups.splice(groups.indexOf(gb), 1); }
        else if (ga) ga.add(b); else if (gb) gb.add(a); else groups.push(new Set([a, b]));
      });
      return { h: H.h, links, groups: groups.map(g => Array.from(g)).sort((x, y) => y.length - x.length) };
    });
    return { configs, shape, handle, above, below: PTS.length - above, east, west: PTS.length - east, count, unaspected, mostAspected, dec, oob, obl, parallels, antiscia, mids: mids.slice(0, 10), harmonics };
  }

  /* ================= Jyotish ================= */
  function vedic(chart, atMs) {
    const P = chart.planets, ay = E.ayanamsa(chart.ms);
    const keys = CL.concat(['node', 'snode']);
    const sid = {}; keys.forEach(k => { sid[k] = norm(P[k].lon - ay); });
    const lagna = norm(chart.asc - ay), ls = signOf(lagna);
    const rasi = k => signOf(sid[k]);
    const bhava = k => (rasi(k) - ls + 12) % 12 + 1;
    const from = (k, ref) => (rasi(k) - ref + 12) % 12 + 1;
    const NAK = 40 / 3;
    const nak = lon => Math.floor(lon / NAK);
    const pada = lon => Math.floor((lon % NAK) / (NAK / 4)) + 1;
    const V = KB.VIMSHOTTARI;
    const mn = nak(sid.moon), frac = (sid.moon % NAK) / NAK, first = mn % 9;
    const Y = 365.25 * DAY;
    let tt = chart.ms - frac * V[first][1] * Y;
    const md = [];
    for (let i = 0; i < 18; i++) { const [lord, yrs] = V[(first + i) % 9]; md.push({ lord, yrs, start: tt, end: tt + yrs * Y }); tt += yrs * Y; }
    const cur = md.find(d => atMs >= d.start && atMs < d.end);
    let ad = null, nextMd = null;
    if (cur) {
      const idx = V.findIndex(v => v[0] === cur.lord);
      let s = cur.start;
      for (let j = 0; j < 9; j++) { const [l, y] = V[(idx + j) % 9]; const len = cur.yrs * y / 120 * Y; if (atMs >= s && atMs < s + len) { ad = { lord: l, start: s, end: s + len }; break; } s += len; }
      nextMd = md[md.indexOf(cur) + 1];
    }
    const nav = k => Math.floor(sid[k] / (10 / 3)) % 12;
    const own = k => KB.DOMICILE[rasi(k)] === k;
    const exalted = k => KB.VEDIC_EXALT[k] === rasi(k);
    const debil = k => KB.VEDIC_EXALT[k] !== undefined && (KB.VEDIC_EXALT[k] + 6) % 12 === rasi(k);
    const kendra = h => [1, 4, 7, 10].includes(h);
    const lordOf = h => KB.DOMICILE[(ls + h - 1) % 12];
    const yogas = [];
    const ms = rasi('moon');
    if (kendra(from('jupiter', ms))) yogas.push({ id: 'gajakesari' });
    if (rasi('sun') === rasi('mercury')) yogas.push({ id: 'budhaditya' });
    Object.keys(KB.MAHAPURUSHA).forEach(k => { if ((own(k) || exalted(k)) && kendra(bhava(k))) yogas.push({ id: KB.MAHAPURUSHA[k], planet: k }); });
    const real = ['mars', 'mercury', 'jupiter', 'venus', 'saturn'];
    if (!real.some(k => [2, 12].includes(from(k, ms))) && !real.some(k => rasi(k) === ms)) {
      const cancelled = real.some(k => kendra(bhava(k)) || kendra(from(k, ms)));
      yogas.push({ id: cancelled ? 'kemadrumaCancelled' : 'kemadruma' });
    }
    if (rasi('moon') === rasi('mars')) yogas.push({ id: 'chandramangala' });
    const kendraL = [1, 4, 7, 10].map(lordOf), trikL = [1, 5, 9].map(lordOf);
    const raja = [];
    kendraL.forEach(a => trikL.forEach(b => {
      if (a === b || raja.some(r => r.join() === [a, b].sort().join())) return;
      const ra = rasi(a), rb = rasi(b);
      if (ra === rb || (ra + 6) % 12 === rb || (KB.DOMICILE[ra] === b && KB.DOMICILE[rb] === a)) raja.push([a, b].sort());
    }));
    raja.forEach(r => yogas.push({ id: 'raja', a: r[0], b: r[1] }));
    const dhanaA = [2, 11].map(lordOf), dhanaB = [1, 5, 9].map(lordOf);
    dhanaA.forEach(a => dhanaB.forEach(b => { if (a !== b && rasi(a) === rasi(b) && !yogas.some(y => y.id === 'dhana')) yogas.push({ id: 'dhana', a, b }); }));
    [6, 8, 12].forEach(h => { const l = lordOf(h); if ([6, 8, 12].includes(bhava(l)) && !yogas.some(y => y.id === 'viparita' && y.planet === l)) yogas.push({ id: 'viparita', planet: l, house: h }); });
    CL.forEach(k => { if (debil(k)) { const disp = KB.DOMICILE[rasi(k)]; if (kendra(bhava(disp)) || kendra(from(disp, ms))) yogas.push({ id: 'neechabhanga', planet: k }); } });
    CL.forEach(a => CL.forEach(b => { if (a < b && KB.DOMICILE[rasi(a)] === b && KB.DOMICILE[rasi(b)] === a) yogas.push({ id: 'parivartana', a, b }); }));
    const rahu = sid.node;
    const side = CL.map(k => norm(sid[k] - rahu) < 180);
    if (side.every(x => x) || side.every(x => !x)) yogas.push({ id: 'kalasarpa' });
    const satNow = signOf(norm(E.lonAt('saturn', atMs) - E.ayanamsa(atMs)));
    const ss = (satNow - ms + 12) % 12;
    const sadeSati = ss === 11 ? 'rising' : ss === 0 ? 'peak' : ss === 1 ? 'setting' : null;
    const varg = CL.filter(k => nav(k) === rasi(k));
    return { ay, sid, lagna, ls, rasi, bhava, nak, pada, moonNak: mn, lagnaNak: nak(lagna), md, cur, ad, nextMd, nav, own, exalted, debil, yogas, sadeSati, varg, lagnaLord: lordOf(1), manglik: [1, 2, 4, 7, 8, 12].includes(bhava('mars')) };
  }

  /* ================= Bazi ================= */
  function bazi(chart, sex, atMs) {
    const lmt = chart.ms + chart.lon / 15 * 3600000;
    const d = new Date(lmt);
    const y = d.getUTCFullYear(), mo = d.getUTCMonth() + 1, hr = d.getUTCHours() + d.getUTCMinutes() / 60;
    const sun = chart.planets.sun.lon;
    const by = (mo <= 2 && sun >= 270 && sun < 315) ? y - 1 : y;
    const yS = ((by - 4) % 10 + 10) % 10, yB = ((by - 4) % 12 + 12) % 12;
    const mi = Math.floor(norm(sun - 315) / 30);
    const mB = (2 + mi) % 12, mS = ((yS % 5) * 2 + 2 + mi) % 10;
    const jdn = Math.floor(lmt / DAY) + 2440588 + (hr >= 23 ? 1 : 0);
    const di = ((jdn + 49) % 60 + 60) % 60;
    const dS = di % 10, dB = di % 12;
    const hB = Math.floor((hr + 1) / 2) % 12, hS = ((dS % 5) * 2 + hB) % 10;
    const pillars = [{ s: yS, b: yB }, { s: mS, b: mB }, { s: dS, b: dB }, { s: hS, b: hB }];
    const cnt = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
    pillars.forEach((p, i) => {
      cnt[KB.STEM_EL[p.s]] += 1;
      KB.HIDDEN[p.b].forEach((h, j) => { cnt[KB.STEM_EL[h]] += (j === 0 ? 1 : j === 1 ? 0.5 : 0.3) * (i === 1 ? 2 : 1); });
    });
    const C = KB.WX_CYCLE, dmEl = KB.STEM_EL[dS], di5 = C.indexOf(dmEl);
    const rel = { self: dmEl, resource: C[(di5 + 4) % 5], output: C[(di5 + 1) % 5], wealth: C[(di5 + 2) % 5], officer: C[(di5 + 3) % 5] };
    const total = Object.values(cnt).reduce((a, b) => a + b, 0);
    const support = cnt[rel.self] - 1 + cnt[rel.resource];
    const ratio = support / (total - 1);
    const strong = ratio >= 0.5;
    const fav = strong ? [rel.output, rel.wealth, rel.officer] : [rel.resource, rel.self];
    const god = s => {
      const e = KB.STEM_EL[s], same = (s % 2) === (dS % 2);
      const r = Object.keys(rel).find(k => rel[k] === e);
      return ({ self: same ? 'friend' : 'rob', output: same ? 'eating' : 'hurting', wealth: same ? 'iwealth' : 'dwealth', officer: same ? 'seven' : 'officer', resource: same ? 'iresource' : 'dresource' })[r];
    };
    const gods = { year: god(yS), month: god(mS), hour: god(hS), dayBranch: god(KB.HIDDEN[dB][0]), monthBranch: god(KB.HIDDEN[mB][0]) };
    const inter = [];
    const bs = pillars.map(p => p.b);
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
      const pr = [bs[i], bs[j]].sort((a, b) => a - b);
      if (KB.CLASHES.some(c => c[0] === pr[0] && c[1] === pr[1])) inter.push({ kind: 'clash', i, j });
      const h = KB.HARMONIES.find(c => c[0] === pr[0] && c[1] === pr[1]);
      if (h) inter.push({ kind: 'harmony', i, j, el: h[2] });
    }
    KB.TRINES.forEach(([tri, el]) => {
      const present = tri.filter(b => bs.includes(b));
      if (present.length === 3) inter.push({ kind: 'trine', el });
      else if (present.length === 2 && present.includes(tri[1])) inter.push({ kind: 'halftrine', el });
    });
    const COMB = [[0, 5, 'earth'], [1, 6, 'metal'], [2, 7, 'water'], [3, 8, 'wood'], [4, 9, 'fire']];
    const ss = pillars.map(p => p.s);
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
      const c = COMB.find(x => (x[0] === ss[i] && x[1] === ss[j]) || (x[1] === ss[i] && x[0] === ss[j]));
      if (c) inter.push({ kind: 'stemcomb', i, j, el: c[2] });
    }
    let luck = null;
    if (sex === 'm' || sex === 'f') {
      const yang = yS % 2 === 0, fwd = (yang && sex === 'm') || (!yang && sex === 'f');
      let jie;
      if (fwd) { const r = A.SearchSunLongitude(norm(315 + 30 * (mi + 1)), A.MakeTime(new Date(chart.ms)), 40); jie = r && r.date.getTime(); }
      else { const r = A.SearchSunLongitude(norm(315 + 30 * mi), A.MakeTime(new Date(chart.ms - 35 * DAY)), 40); jie = r && r.date.getTime(); }
      if (jie) {
        const startAge = Math.abs(jie - chart.ms) / DAY / 3;
        const age = (atMs - chart.ms) / YEAR;
        const list = [];
        for (let k = 1; k <= 9; k++) {
          const s = ((mS + (fwd ? k : -k)) % 10 + 10) % 10, b = ((mB + (fwd ? k : -k)) % 12 + 12) % 12;
          list.push({ s, b, from: startAge + (k - 1) * 10, to: startAge + k * 10 });
        }
        luck = { fwd, startAge, list, cur: list.find(l => age >= l.from && age < l.to) || null, age };
      }
    }
    const strongestEl = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a])[0];
    const weakestEl = Object.keys(cnt).sort((a, b) => cnt[a] - cnt[b])[0];
    return { pillars, cnt, dS, dmEl, rel, strong, ratio, fav, gods, inter, luck, animal: yB, strongestEl, weakestEl };
  }

  /* ================= Others ================= */
  function solarReturn(chart, atMs, houseSystem) {
    if (atMs - chart.ms < 300 * DAY) return null;
    const r = A.SearchSunLongitude(chart.planets.sun.lon, A.MakeTime(new Date(atMs - 366 * DAY)), 370);
    if (!r) return null;
    let ms = r.date.getTime();
    if (ms > atMs) { const r2 = A.SearchSunLongitude(chart.planets.sun.lon, A.MakeTime(new Date(atMs - 731 * DAY)), 370); if (!r2) return null; ms = r2.date.getTime(); }
    return { ms, chart: E.castChart({ ms, lat: chart.lat, lon: chart.lon, tz: chart.tz, houseSystem }) };
  }
  function progressions(chart, atMs) {
    const age = (atMs - chart.ms) / YEAR;
    const pms = chart.ms + age * DAY;
    const sun = E.lonAt('sun', pms), moon = E.lonAt('moon', pms);
    const phase = Math.floor(norm(moon - sun) / 45);
    const lastNew = lastPhase(0, pms);
    return { age, sun, moon, phase, moonHouse: E.houseOf(moon, chart.houses), sunChanged: signOf(sun) !== chart.planets.sun.sign, lastNewAge: lastNew ? (lastNew - chart.ms) / DAY : null };
  }
  function crossing(key, target, fromMs, toMs, stepDays) {
    let t0 = fromMs, d0 = n180(E.lonAt(key, t0) - target);
    for (let t1 = fromMs + stepDays * DAY; t1 <= toMs; t1 += stepDays * DAY) {
      const d1 = n180(E.lonAt(key, t1) - target);
      if (d0 * d1 <= 0 && Math.abs(d0 - d1) < 40) {
        let lo = t0, hi = t1, dl = d0;
        for (let k = 0; k < 30; k++) { const m = (lo + hi) / 2, dm = n180(E.lonAt(key, m) - target); if (dl * dm <= 0) hi = m; else { lo = m; dl = dm; } }
        return hi;
      }
      t0 = t1; d0 = d1;
    }
    return null;
  }
  function returns(chart, atMs) {
    const P = chart.planets, b = chart.ms, out = [];
    const push = (kind, ms) => { if (ms) out.push({ kind, ms }); };
    push('saturn1', crossing('saturn', P.saturn.lon, b + 26 * YEAR, b + 31 * YEAR, 3));
    push('saturn2', crossing('saturn', P.saturn.lon, b + 56 * YEAR, b + 61 * YEAR, 3));
    push('uranusOpp', crossing('uranus', norm(P.uranus.lon + 180), b + 37 * YEAR, b + 45 * YEAR, 4));
    push('jupiterNext', crossing('jupiter', P.jupiter.lon, Math.max(atMs, b + 10 * YEAR), atMs + 13 * YEAR, 2));
    push('nodeNext', crossing('node', P.node.lon, Math.max(atMs, b + 17 * YEAR), atMs + 19 * YEAR, 5));
    return out;
  }
  function tzolkin(chart) {
    const lp = E.utcToLocalParts(chart.ms, chart.tz);
    const jdn = Math.floor(Date.UTC(lp.y, lp.m - 1, lp.d) / DAY) + 2440588;
    const x = jdn - 584283;
    return { num: ((x + 3) % 13 + 13) % 13 + 1, sign: ((x + 19) % 20 + 20) % 20 };
  }

  /* ================= Analysis ================= */
  function analyze(chart, opts) {
    const atMs = opts.nowMs || Date.now();
    const D = { chart, atMs };
    D.sect = sect(chart);
    D.over = overcoming(chart);
    D.besieged = besieged(chart);
    D.syz = syzygy(chart);
    D.almuten = almutenFiguris(chart, D.syz);
    D.disp = dispositors(chart);
    D.zrSpirit = zodiacalReleasing(chart.lots.spirit, chart.lots.fortune, chart.ms, atMs);
    D.zrFortune = zodiacalReleasing(chart.lots.fortune, chart.lots.fortune, chart.ms, atMs);
    D.pat = patterns(chart);
    D.ved = vedic(chart, atMs);
    D.bazi = bazi(chart, opts.sex, atMs);
    D.mansion = Math.floor(chart.planets.moon.lon / (360 / 28));
    D.hour = E.planetaryHour(chart.ms, chart.lat, chart.lon);
    D.sr = opts.kind === 'business' ? null : solarReturn(chart, atMs, chart.houses.system);
    D.prog = progressions(chart, atMs);
    D.ret = returns(chart, atMs);
    D.tz = tzolkin(chart);
    D.fird = E.firdaria(chart.ms, chart.isDay, atMs);
    D.prof = E.profection(chart.ms, atMs, signOf(chart.asc), chart.tz);
    D.syn = synthesize(D);
    return D;
  }

  function synthesize(D) {
    const C = D.chart, P = C.planets, score = {}, why = {};
    const give = (k, w, code, param) => { if (!CL.includes(k)) return; score[k] = (score[k] || 0) + w; (why[k] = why[k] || []).push([code, param]); };
    give(C.ascRuler, 3, 'ascRuler');
    give(D.almuten.planet, 3, 'almuten');
    give(C.strongest[0], 2, 'geniture');
    if (D.disp.sole) give(D.disp.sole, 3, 'final');
    CL.forEach(k => {
      if (sep(P[k].lon, C.asc) <= 5) give(k, 3, 'conjAngle', 'asc');
      else if (sep(P[k].lon, C.mc) <= 5) give(k, 3, 'conjAngle', 'mc');
      else if ([1, 10].includes(P[k].house)) give(k, 1, 'angular');
    });
    D.pat.configs.forEach(c => {
      if (c.type === 'stellium') give(E.ruler(c.sign), 2, 'stellium', c.sign);
      if (c.type === 'tsquare') give(c.apex, 2, 'tApex');
      if (c.type === 'yod') give(c.apex, 3, 'yodApex');
    });
    give(D.pat.mostAspected, 1, 'mostAspected');
    D.pat.oob.forEach(k => give(k, 1, 'oob'));
    give(D.ved.lagnaLord, 2, 'lagnaLord');
    give(KB.VIMSHOTTARI[D.ved.moonNak % 9][0], 1, 'nakLord');
    give(KB.WX_PLANET[D.bazi.dmEl], 2, 'dmPlanet', D.bazi.dmEl);
    give(KB.WX_PLANET[D.bazi.strongestEl], 1, 'baziStrong', D.bazi.strongestEl);
    give(D.syz.lord, 1, 'syzygyLord');
    if (D.hour) { give(D.hour.hourRuler, 1, 'hourLord'); give(D.hour.dayRuler, 0.5, 'dayLord'); }
    const keyPlanets = Object.keys(score).sort((a, b) => score[b] - score[a]).slice(0, 3).filter(k => score[k] >= 4);

    // arenas
    const arena = {}, aw = {};
    const ga = (h, w, code, param) => { arena[h] = (arena[h] || 0) + w; (aw[h] = aw[h] || []).push([code, param]); };
    for (let h = 1; h <= 12; h++) {
      const inside = PTS.filter(k => P[k].house === h);
      if (inside.length) ga(h, inside.reduce((s, k) => s + (k === 'sun' || k === 'moon' ? 2 : KB.PLANETS[k].modern ? 0.5 : 1), 0), 'planets', inside.length);
    }
    ga(P[C.ascRuler].house, 2, 'ascRuler');
    ga(C.lotHouses.fortune, 1, 'fortune');
    ga(C.lotHouses.spirit, 1, 'spirit');
    ga(P[D.almuten.planet].house, 1, 'almuten');
    ga(P.node.house, 1, 'node');
    ga(P[D.sect.benefic].house, 1, 'benefic');
    ga(P[D.sect.malefic].house, 1, 'malefic');
    const arenas = Object.keys(arena).map(Number).sort((a, b) => arena[b] - arena[a]).slice(0, 3);

    // time lords now
    const lords = [];
    lords.push(['profection', D.prof.lord]);
    if (D.fird.current && CL.includes(D.fird.current.lord)) lords.push(['firdar', D.fird.current.lord]);
    if (D.fird.sub) lords.push(['firdarSub', D.fird.sub.lord]);
    if (D.ved.cur) lords.push(['dasha', D.ved.cur.lord]);
    if (D.ved.ad) lords.push(['antardasha', D.ved.ad.lord]);
    lords.push(['zr1', E.ruler(D.zrSpirit.cur1.sign)]);
    lords.push(['zr2', E.ruler(D.zrSpirit.cur2.sign)]);
    if (D.bazi.luck && D.bazi.luck.cur) lords.push(['luck', KB.WX_PLANET[KB.STEM_EL[D.bazi.luck.cur.s]]]);
    if (D.sr) lords.push(['sr', D.sr.chart.ascRuler]);
    lords.push(['progMoon', E.ruler(signOf(D.prog.moon))]);
    const freq = {}; lords.forEach(([, p]) => { freq[p] = (freq[p] || 0) + 1; });
    const seasonPlanets = Object.keys(freq).filter(p => freq[p] >= 3 || (freq[p] >= 2 && Object.values(freq).every(v => v <= freq[p]))).sort((a, b) => freq[b] - freq[a]);

    // hidden links: connections without a classical aspect
    const aspected = (a, b) => C.aspects.some(x => (x.a === a && x.b === b) || (x.a === b && x.b === a));
    const hidden = [];
    const hpush = (a, b, via, extra) => {
      if (!KB.PLANETS[a] || !KB.PLANETS[b] || a === b || aspected(a, b)) return;
      if (KB.PLANETS[a].modern && KB.PLANETS[b].modern) return;
      if (hidden.some(h => [h.a, h.b].sort().join() === [a, b].sort().join())) return;
      hidden.push(Object.assign({ a, b, via }, extra || {}));
    };
    D.pat.antiscia.forEach(x => hpush(x.a, x.b, x.kind));
    D.pat.parallels.forEach(x => hpush(x.a, x.b, x.kind));
    D.pat.harmonics.forEach(H => H.links.forEach(([a, b]) => hpush(a, b, 'h' + H.h)));
    D.pat.mids.slice(0, 6).forEach(m => { if (KB.PLANETS[m.c] && KB.PLANETS[m.a]) hpush(m.a, m.c, 'midpoint', { other: m.b }); });

    // cross-tradition
    const tempKey = E.temperament(C).key;
    const TEMP_WX = { choleric: 'fire', sanguine: 'wood', melancholic: 'metal', phlegmatic: 'water' };
    return { score, why, keyPlanets, arena, aw, arenas, lords, freq, seasonPlanets, hidden: hidden.slice(0, 7), tempKey, tempWx: TEMP_WX[tempKey] };
  }

  /* ================= Rendering ================= */
  const CONTROL = { fire: 'water', wood: 'metal', metal: 'fire', water: 'earth', earth: 'wood' };
  function short(k) { return t('pl.' + k + '.short'); }
  function lordLabel(code) { return t('deep.lords.' + code); }
  function pillarName(p) { return KB.STEM_CH[p.s] + KB.BRANCH_CH[p.b] + ' ' + KB.STEM_PY[p.s] + '-' + KB.BRANCH_PY[p.b]; }
  function wx(e) { return t('wx.' + e); }
  const date = ms => I.fmtDate(ms, null, false);

  function render(D, opts) {
    const C = D.chart, P = C.planets, S = D.syn, out = [];
    I.setTz(C.tz);
    const business = opts.kind === 'business';
    const topics = h => I.topics(h, business);

    /* --- synthesis --- */
    const syn = [];
    S.keyPlanets.forEach((k, i) => {
      const st = I.strength(P[k].total);
      const reasons = S.why[k].map(([code, prm]) => t('deep.why.' + code, {
        angle: prm === 'asc' ? t('ui.asc') : t('ui.mc'), sign: typeof prm === 'number' ? sn(prm) : '', element: prm ? wx(prm) : ''
      }));
      syn.push({ title: (i === 0 ? t('deep.syn.keyTitle') : t('deep.syn.keyTitle2')) + ': ' + pn(k), tone: st.tone,
        text: t('deep.syn.key', { planet: pn(k), n: S.why[k].length, reasons: T.list(reasons), sig: t('pl.' + k + '.sig') }) + ' ' + t('deep.syn.how.' + st.tone, { planet: pn(k) }) });
    });
    if (!S.keyPlanets.length) syn.push({ title: t('deep.syn.keyTitle'), text: t('deep.syn.keyNone') });
    S.arenas.forEach(h => {
      const reasons = S.aw[h].map(([code, prm]) => t('deep.arena.' + code, { n: prm || 0, planet: pn(code === 'benefic' ? D.sect.benefic : code === 'malefic' ? D.sect.malefic : C.ascRuler) }));
      syn.push({ title: t('deep.syn.arenaTitle', { house: h }), text: t('deep.syn.arena', { house: h, topics: topics(h), reasons: T.list(reasons) }) });
    });
    const lordTxt = T.list(S.lords.map(([code, p]) => lordLabel(code) + ' → ' + pn(p)));
    if (S.seasonPlanets.length) {
      const k = S.seasonPlanets[0];
      syn.push({ title: t('deep.syn.timingTitle'), tone: I.strength(P[k].total).tone, text: t('deep.syn.timing', { list: lordTxt, planet: pn(k), n: S.freq[k], total: S.lords.length, season: t('deep.season.' + k) }) + (S.seasonPlanets[1] ? ' ' + t('deep.syn.timing2', { planet: pn(S.seasonPlanets[1]), season: t('deep.season.' + S.seasonPlanets[1]) }) : '') });
    } else syn.push({ title: t('deep.syn.timingTitle'), text: t('deep.syn.timingNone', { list: lordTxt }) });
    const flags = [];
    if (D.zrSpirit.cur1.peak === 'major' || D.zrSpirit.cur2.peak === 'major') flags.push(t('deep.flag.zrPeak'));
    if (D.zrSpirit.cur2.lb) flags.push(t('deep.flag.lb'));
    if (D.ved.sadeSati) flags.push(t('deep.flag.sadeSati', { phase: t('deep.sadeSati.' + D.ved.sadeSati) }));
    D.ret.forEach(r => { if (Math.abs(r.ms - D.atMs) < 0.75 * YEAR && /saturn|uranus/.test(r.kind)) flags.push(t('deep.flag.return', { what: t('deep.ret.' + r.kind), date: date(r.ms) })); });
    if (flags.length) syn.push({ title: t('deep.syn.flagsTitle'), tone: 'mixed', text: flags.join(' ') });
    S.hidden.forEach(h => {
      syn.push({ title: t('deep.syn.hiddenTitle', { a: pn(h.a), b: pn(h.b) }), text: t('deep.syn.hidden', { a: pn(h.a), b: pn(h.b), via: t('deep.via.' + h.via, { other: h.other ? (h.other === 'asc' || h.other === 'mc' ? t('ui.' + h.other) : pn(h.other)) : '' }), x: short(h.a), y: short(h.b) }) });
    });
    // cross-tradition
    const cross = [];
    const tsS = P.sun.sign, ssS = D.ved.rasi('sun');
    cross.push(t(tsS === ssS ? 'deep.cross.sunSame' : 'deep.cross.sunDiff', { t: sn(tsS), s: sn(ssS) }));
    cross.push(t('deep.cross.asc', { asc: sn(signOf(C.asc)), lagna: sn(D.ved.ls), ar: pn(C.ascRuler), ll: pn(D.ved.lagnaLord) }) + ' ' + t(C.ascRuler === D.ved.lagnaLord ? 'deep.cross.ascSame' : 'deep.cross.ascDiff', { ar: pn(C.ascRuler), ll: pn(D.ved.lagnaLord) }));
    const b = D.bazi;
    if (S.tempWx === b.strongestEl) cross.push(t('deep.cross.tempSame', { temp: t('temp.' + S.tempKey + '.name'), wx: wx(b.strongestEl), remedy: wx(CONTROL[b.strongestEl]), remedyText: t('deep.remedy.' + CONTROL[b.strongestEl]) }));
    else cross.push(t('deep.cross.tempDiff', { temp: t('temp.' + S.tempKey + '.name'), wx: wx(b.strongestEl) }));
    cross.push(t('deep.cross.moon', { nak: t('nak.' + D.ved.moonNak + '.name'), man: t('mansion.' + D.mansion + '.name') }));
    syn.push({ title: t('deep.syn.crossTitle'), text: cross.join(' ') });
    out.push({ id: 'synthesis', title: t('deep.sec.synthesis'), items: syn });

    /* --- Hellenistic & Perso-Arabic --- */
    const hel = [];
    const sc = D.sect;
    hel.push({ title: t('deep.hel.sectTitle'), text: t('deep.hel.sect', { ben: pn(sc.benefic), bh: P[sc.benefic].house, bt: topics(P[sc.benefic].house), mal: pn(sc.malefic), mh: P[sc.malefic].house, mt: topics(P[sc.malefic].house) }) + ' ' + (P[sc.malefic].total > 3 ? t('deep.hel.malStrong', { mal: pn(sc.malefic) }) : P[sc.malefic].total < -6 ? t('deep.hel.malWeak', { mal: pn(sc.malefic) }) : ''), tone: 'mixed' });
    const important = [C.ascRuler, 'sun', 'moon'];
    D.over.filter(o => (['mars', 'saturn', 'jupiter', 'venus'].includes(o.a)) && important.includes(o.b)).forEach(o => {
      const mal = o.a === 'mars' || o.a === 'saturn';
      hel.push({ title: t('deep.hel.overTitle', { a: pn(o.a), b: pn(o.b) }), tone: mal ? 'hard' : 'good', text: t('deep.hel.over', { a: pn(o.a), b: pn(o.b) }) + ' ' + t(mal ? (o.a === sc.malefic ? 'deep.hel.overMalContrary' : 'deep.hel.overMal') : 'deep.hel.overBen', { a: pn(o.a), b: pn(o.b), y: short(o.b) }) });
    });
    D.besieged.forEach(x => hel.push({ title: t('deep.hel.besiegedTitle.' + x.kind, { p: pn(x.p) }), tone: x.kind === 'malefic' ? 'hard' : 'good', text: t('deep.hel.besieged.' + x.kind, { p: pn(x.p), x: short(x.p) }) }));
    hel.push({ title: t('deep.hel.syzTitle'), text: t('deep.hel.syz', { kind: t('deep.syz.' + D.syz.kind), date: date(D.syz.ms), pos: I.fmtLon(D.syz.lon), lord: pn(D.syz.lord), h: D.syz.house, topics: topics(D.syz.house) }) });
    hel.push({ title: t('deep.hel.almutenTitle'), text: t('deep.hel.almuten', { p: pn(D.almuten.planet), pts: D.almuten.points }) + ' ' + t(D.almuten.planet === C.ascRuler ? 'deep.hel.almutenSame' : 'deep.hel.almutenDiff', { ar: pn(C.ascRuler), p: pn(D.almuten.planet), x: short(D.almuten.planet), y: short(C.ascRuler) }) });
    const dp = D.disp;
    let dtext;
    if (dp.sole) dtext = t('deep.hel.dispSole', { p: pn(dp.sole) });
    else if (dp.finals.length > 1) dtext = t('deep.hel.dispMany', { list: T.list(dp.finals.map(pn)) });
    else dtext = t('deep.hel.dispLoop');
    dp.mutual.forEach(([a, b]) => { dtext += ' ' + t('deep.hel.mutual', { a: pn(a), b: pn(b), ta: topics(P[a].house), tb: topics(P[b].house) }); });
    dp.loops.forEach(l => { dtext += ' ' + t('deep.hel.loop', { loop: l.path.map(pn).join(' → ') + ' → ' + pn(l.path[0]) }); });
    hel.push({ title: t('deep.hel.dispTitle'), text: dtext + ' ' + t('deep.hel.chains', { chains: CL.map(k => pn(k) + ' → ' + pn(dp.disp[k])).join(' · ') }) });
    const zr = D.zrSpirit;
    let zt = t('deep.hel.zr', { s1: sn(zr.cur1.sign), l1: pn(E.ruler(zr.cur1.sign)), f1: date(zr.cur1.start), t1: date(zr.cur1.end), s2: sn(zr.cur2.sign), l2: pn(E.ruler(zr.cur2.sign)), t2: date(zr.cur2.end) });
    if (zr.cur1.peak) zt += ' ' + t('deep.hel.zrPeak.' + zr.cur1.peak);
    if (zr.cur2.peak === 'major') zt += ' ' + t('deep.hel.zrPeak2');
    if (zr.cur2.lb) zt += ' ' + t('deep.flag.lb');
    if (zr.nextL2Peak) zt += ' ' + t('deep.hel.zrNext2', { s: sn(zr.nextL2Peak.sign), d: date(zr.nextL2Peak.start) });
    if (zr.nextMajor) zt += ' ' + t('deep.hel.zrNext', { s: sn(zr.nextMajor.sign), d: date(zr.nextMajor.start) });
    hel.push({ title: t('deep.hel.zrTitle'), text: zt, tone: zr.cur1.peak === 'major' ? 'good' : 'mixed' });
    hel.push({ title: t('deep.hel.zrfTitle'), text: t('deep.hel.zrf', { s: sn(D.zrFortune.cur1.sign), l: pn(E.ruler(D.zrFortune.cur1.sign)), to: date(D.zrFortune.cur1.end), s2: sn(D.zrFortune.cur2.sign), t2: date(D.zrFortune.cur2.end) }) });
    ['eros', 'necessity', 'courage', 'victory', 'nemesis'].forEach(k => {
      const lon = C.lots[k], h = E.houseOf(lon, C.houses), lr = E.ruler(signOf(lon)), st = I.strength(P[lr].total);
      hel.push({ title: t('lots.' + k + '.name'), tone: st.tone, text: t('lots.' + k + '.text') + ' ' + t('deep.hel.lot', { pos: I.fmtLon(lon), h, topics: topics(h), lord: pn(lr), str: st.word }) });
    });
    const man = D.mansion;
    hel.push({ title: t('deep.hel.mansionTitle'), text: t('deep.hel.mansion', { n: man + 1, name: t('mansion.' + man + '.name'), meaning: t('mansion.' + man + '.meaning') }) });
    if (D.hour) hel.push({ title: t('deep.hel.hourTitle'), text: t('deep.hel.hour', { day: new Intl.DateTimeFormat(T.locale, { weekday: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2023, 0, 1 + D.hour.weekday))), dr: pn(D.hour.dayRuler), hr: pn(D.hour.hourRuler), x: short(D.hour.hourRuler) }) });
    if (D.sr) {
      const sr = D.sr.chart, srAr = sr.ascRuler;
      const ang = CL.filter(k => [1, 4, 7, 10].includes(sr.planets[k].house));
      hel.push({ title: t('deep.hel.srTitle'), text: t('deep.hel.sr', { date: I.fmtDate(D.sr.ms), asc: sn(signOf(sr.asc)), lord: pn(srAr), h: P[srAr].house, topics: topics(P[srAr].house), ang: ang.length ? T.list(ang.map(k => pn(k) + ' (' + t('ui.houseN', { n: sr.planets[k].house }) + ')')) : t('deep.none'), moonH: sr.planets.moon.house, moonT: topics(sr.planets.moon.house) }), tone: I.strength(sr.planets[srAr].total).tone });
    }
    out.push({ id: 'hellenistic', title: t('deep.sec.hellenistic'), items: hel });

    /* --- Patterns --- */
    const pt = [], pa = D.pat;
    pt.push({ title: t('deep.pat.shapeTitle', { shape: t('shape.' + pa.shape + '.name') }), text: t('shape.' + pa.shape + '.text') + (pa.handle ? ' ' + t('deep.pat.handle', { p: pn(pa.handle), x: short(pa.handle) }) : '') });
    pt.push({ title: t('deep.pat.hemiTitle'), text: t('deep.pat.hemi', { above: pa.above, below: pa.below, east: pa.east, west: pa.west }) + ' ' + t(pa.above > pa.below + 2 ? 'deep.pat.hemiAbove' : pa.below > pa.above + 2 ? 'deep.pat.hemiBelow' : 'deep.pat.hemiBalanced') + ' ' + t(pa.east > pa.west + 2 ? 'deep.pat.hemiEast' : pa.west > pa.east + 2 ? 'deep.pat.hemiWest' : 'deep.pat.hemiEW') });
    pa.configs.forEach(c => {
      const prm = { planets: T.list(c.planets.map(pn)), apex: c.apex ? pn(c.apex) : '', x: c.apex ? short(c.apex) : '', el: c.el ? t('el.' + c.el) : '', mode: c.mod ? t('mode.' + c.mod) : '', sign: c.sign !== undefined ? sn(c.sign) : '', h: c.house || '', topics: c.house ? topics(c.house) : '', empty: c.empty !== undefined ? sn(signOf(c.empty)) : '' };
      pt.push({ title: t('config.' + c.type + '.name') + ': ' + prm.planets, tone: ['grandtrine', 'kite'].includes(c.type) ? 'good' : ['tsquare', 'grandcross'].includes(c.type) ? 'hard' : 'mixed', text: t('config.' + c.type + '.text', prm) });
    });
    pa.unaspected.forEach(k => pt.push({ title: t('deep.pat.unaspTitle', { p: pn(k) }), text: t('deep.pat.unasp', { p: pn(k), x: short(k) }) }));
    pa.oob.forEach(k => pt.push({ title: t('deep.pat.oobTitle', { p: pn(k) }), text: t('deep.pat.oob', { p: pn(k), dec: T.num(Math.abs(pa.dec[k]), 1), obl: T.num(pa.obl, 1), x: short(k) }) }));
    if (pa.parallels.length) pt.push({ title: t('deep.pat.parTitle'), text: pa.parallels.map(x => t('deep.pat.' + x.kind, { a: pn(x.a), b: pn(x.b), orb: T.num(x.orb, 1) })).join(' ') + ' ' + t('deep.pat.parNote') });
    if (pa.antiscia.length) pt.push({ title: t('deep.pat.antTitle'), text: pa.antiscia.map(x => t('deep.pat.' + x.kind, { a: x.a === 'asc' || x.a === 'mc' ? t('ui.' + x.a) : pn(x.a), b: x.b === 'asc' || x.b === 'mc' ? t('ui.' + x.b) : pn(x.b), orb: T.num(x.orb, 1) })).join(' ') + ' ' + t('deep.pat.antNote') });
    const pnx = k => k === 'asc' || k === 'mc' ? t('ui.' + k) : pn(k);
    const shx = k => k === 'asc' ? t('deep.short.asc') : k === 'mc' ? t('deep.short.mc') : short(k);
    pa.mids.slice(0, 8).forEach(m => pt.push({ title: pnx(m.a) + '/' + pnx(m.b) + ' = ' + pnx(m.c), text: t('deep.pat.mid', { a: pnx(m.a), b: pnx(m.b), c: pnx(m.c), orb: T.num(m.orb, 1), x: shx(m.a), y: shx(m.b), z: shx(m.c) }) }));
    pa.harmonics.forEach(H => H.groups.forEach(g => { if (g.length >= 2) pt.push({ title: t('deep.harm.' + H.h + '.name') + ': ' + T.list(g.map(pn)), text: t('deep.harm.' + H.h + '.text', { planets: T.list(g.map(pn)) }) }); }));
    out.push({ id: 'patterns', title: t('deep.sec.patterns'), items: pt });

    /* --- Jyotish --- */
    const v = D.ved, vj = [];
    const vpos = k => sn(v.rasi(k)) + ' ' + T.num(v.sid[k] % 30, 1) + '°';
    vj.push({ title: t('deep.ved.siderealTitle'), text: t('deep.ved.sidereal', { ay: T.num(v.ay, 2), lagna: sn(v.ls) + ' ' + T.num(v.lagna % 30, 1) + '°', moon: vpos('moon'), sun: vpos('sun'), ll: pn(v.lagnaLord), h: v.bhava(v.lagnaLord) }) });
    vj.push({ title: t('deep.ved.nakTitle'), text: t('deep.ved.nak', { nak: t('nak.' + v.moonNak + '.name'), pada: v.pada(v.sid.moon), lord: pn(KB.VIMSHOTTARI[v.moonNak % 9][0]), meaning: t('nak.' + v.moonNak + '.meaning'), lnak: t('nak.' + v.lagnaNak + '.name') }) });
    if (v.cur) {
      const ml = v.cur.lord;
      const vd = k => v.exalted(k) ? t('deep.ved.exalted') : v.debil(k) ? t('deep.ved.debil') : v.own(k) ? t('deep.ved.own') : t('deep.ved.neutral');
      vj.push({ title: t('deep.ved.dashaTitle'), tone: v.exalted(ml) || v.own(ml) ? 'good' : v.debil(ml) ? 'hard' : 'mixed', text: t('deep.ved.dasha', { md: pn(ml), f: date(v.cur.start), to: date(v.cur.end), ad: v.ad ? pn(v.ad.lord) : '—', adto: v.ad ? date(v.ad.end) : '—', h: v.bhava(ml), topics: topics(v.bhava(ml)), dig: vd(ml), season: t('deep.season.' + ml) }) + (v.nextMd ? ' ' + t('deep.ved.next', { md: pn(v.nextMd.lord), d: date(v.nextMd.start) }) : '') });
    }
    vj.push({ title: t('deep.ved.navTitle'), text: (v.varg.length ? t('deep.ved.varg', { list: T.list(v.varg.map(pn)) }) : t('deep.ved.noVarg')) + ' ' + t('deep.ved.nav', { moon: sn(v.nav('moon')), venus: sn(v.nav('venus')), jup: sn(v.nav('jupiter')) }) });
    v.yogas.forEach(y => vj.push({ title: t('yoga.' + y.id + '.name'), tone: ['kemadruma', 'kalasarpa'].includes(y.id) ? 'hard' : ['kemadrumaCancelled', 'parivartana'].includes(y.id) ? 'mixed' : 'good', text: t('yoga.' + y.id + '.text', { p: y.planet ? pn(y.planet) : '', a: y.a ? pn(y.a) : '', b: y.b ? pn(y.b) : '', h: y.house || '' }) }));
    vj.push({ title: t('deep.ved.nodesTitle'), text: t('deep.ved.nodes', { h1: v.bhava('node'), t1: topics(v.bhava('node')), h2: v.bhava('snode'), t2: topics(v.bhava('snode')) }) });
    if (v.sadeSati) vj.push({ title: t('deep.ved.sadeTitle'), tone: 'mixed', text: t('deep.flag.sadeSati', { phase: t('deep.sadeSati.' + v.sadeSati) }) });
    if (v.manglik && !business) vj.push({ title: t('deep.ved.manglikTitle'), tone: 'mixed', text: t('deep.ved.manglik', { h: v.bhava('mars') }) });
    out.push({ id: 'jyotish', title: t('deep.sec.jyotish'), items: vj });

    /* --- Bazi --- */
    const bz = [], bi = D.bazi;
    const PIL = ['year', 'month', 'day', 'hour'];
    bz.push({ title: t('deep.bazi.pillarsTitle'), text: t('deep.bazi.pillars', { y: pillarName(bi.pillars[0]), m: pillarName(bi.pillars[1]), d: pillarName(bi.pillars[2]), h: pillarName(bi.pillars[3]), animal: t('animal.' + bi.animal) }), pillars: bi.pillars });
    bz.push({ title: t('deep.bazi.dmTitle', { dm: t('stem.' + bi.dS) }), tone: 'mixed', text: t('dm.' + bi.dS) + ' ' + t(bi.strong ? 'deep.bazi.strong' : 'deep.bazi.weak', { pct: Math.round(bi.ratio * 100) }) + ' ' + t('deep.bazi.fav', { fav: T.list(bi.fav.map(wx)), planets: T.list(bi.fav.map(e => pn(KB.WX_PLANET[e]))) }) });
    bz.push({ title: t('deep.bazi.elTitle'), text: KB.WX_CYCLE.map(e => wx(e) + ' ' + T.num(bi.cnt[e], 1)).join(' · ') + '. ' + t('deep.bazi.el', { strong: wx(bi.strongestEl), weak: wx(bi.weakestEl) }) });
    const gl = ['year', 'month', 'hour'].map(k => t('deep.bazi.pillar.' + k) + ': ' + t('god.' + bi.gods[k] + '.name')).join(' · ');
    const gset = Array.from(new Set([bi.gods.year, bi.gods.month, bi.gods.hour, bi.gods.dayBranch]));
    bz.push({ title: t('deep.bazi.godsTitle'), text: gl + '. ' + gset.map(g => t('god.' + g + '.name') + ': ' + t('god.' + g + '.text')).join(' ') + ' ' + t('deep.bazi.spouse', { g: t('god.' + bi.gods.dayBranch + '.name') }) });
    bi.inter.forEach(x => {
      const prm = { p1: x.i !== undefined ? t('deep.bazi.pillar.' + PIL[x.i]) : '', p2: x.j !== undefined ? t('deep.bazi.pillar.' + PIL[x.j]) : '', el: x.el ? wx(x.el) : '', m1: x.i !== undefined ? t('deep.bazi.pmean.' + PIL[x.i]) : '', m2: x.j !== undefined ? t('deep.bazi.pmean.' + PIL[x.j]) : '' };
      bz.push({ title: t('deep.bazi.inter.' + x.kind + '.name'), tone: x.kind === 'clash' ? 'hard' : 'good', text: t('deep.bazi.inter.' + x.kind + '.text', prm) });
    });
    if (bi.luck) {
      const c = bi.luck.cur;
      if (c) bz.push({ title: t('deep.bazi.luckTitle'), tone: bi.fav.includes(KB.STEM_EL[c.s]) ? 'good' : 'mixed', text: t('deep.bazi.luck', { p: pillarName(c), el: wx(KB.STEM_EL[c.s]), from: Math.round(c.from), to: Math.round(c.to), start: T.num(bi.luck.startAge, 1) }) + ' ' + t(bi.fav.includes(KB.STEM_EL[c.s]) ? 'deep.bazi.luckGood' : 'deep.bazi.luckHard') });
    } else if (!business) bz.push({ title: t('deep.bazi.luckTitle'), text: t('deep.bazi.luckNeedSex') });
    bz.push({ title: t('deep.bazi.bridgeTitle'), text: t('deep.bazi.bridge', { dmP: pn(KB.WX_PLANET[bi.dmEl]), dmEl: wx(bi.dmEl), cond: I.strength(P[KB.WX_PLANET[bi.dmEl]].total).word }) });
    out.push({ id: 'bazi', title: t('deep.sec.bazi'), items: bz });

    /* --- Progressions, returns, Maya --- */
    const pr = [], g = D.prog;
    pr.push({ title: t('deep.prog.title'), text: t('deep.prog.text', { sun: I.fmtLon(g.sun), moon: I.fmtLon(g.moon), h: g.moonHouse, topics: topics(g.moonHouse), phase: t('phase.' + g.phase + '.name'), phaseText: t('phase.' + g.phase + '.text') }) + (g.lastNewAge !== null && g.lastNewAge >= 0 ? ' ' + t('deep.prog.newMoon', { age: T.num(g.lastNewAge, 1) }) : '') + (g.sunChanged ? ' ' + t('deep.prog.sunChanged', { s: sn(signOf(g.sun)) }) : '') });
    if (!business && D.ret.length) pr.push({ title: t('deep.ret.title'), text: D.ret.map(r => t('deep.ret.' + r.kind) + ': ' + date(r.ms) + (r.ms < D.atMs ? ' ' + t('deep.past') : '')).join(' · ') + ' — ' + t('deep.ret.note') });
    pr.push({ title: t('deep.maya.title'), text: t('deep.maya.text', { n: D.tz.num, sign: t('tzolkin.' + D.tz.sign + '.name'), meaning: t('tzolkin.' + D.tz.sign + '.meaning') }) });
    out.push({ id: 'cycles', title: t('deep.sec.cycles'), items: pr });
    return out;
  }

  // compact data block for the AI astrologer
  function digest(D) {
    const S = D.syn, v = D.ved, b = D.bazi, pa = D.pat;
    const L = [];
    L.push('KEY PLANETS (convergent testimony): ' + S.keyPlanets.map(k => k + ' [' + S.why[k].map(w => w[0] + (w[1] !== undefined ? ':' + w[1] : '')).join(', ') + ']').join('; '));
    L.push('ARENAS (houses): ' + S.arenas.map(h => h + ' [' + S.aw[h].map(w => w[0]).join(', ') + ']').join('; '));
    L.push('CURRENT TIME LORDS: ' + S.lords.map(l => l[0] + '=' + l[1]).join(', '));
    L.push('HIDDEN LINKS (no classical aspect): ' + S.hidden.map(h => h.a + '-' + h.b + ' via ' + h.via + (h.other ? '(' + h.other + ')' : '')).join('; '));
    L.push('SECT: benefic of sect ' + D.sect.benefic + ' h' + D.chart.planets[D.sect.benefic].house + ', malefic contrary to sect ' + D.sect.malefic + ' h' + D.chart.planets[D.sect.malefic].house);
    L.push('OVERCOMING: ' + D.over.map(o => o.a + '>' + o.b).join(', ') + '; BESIEGED: ' + D.besieged.map(x => x.p + '(' + x.kind + ')').join(', '));
    L.push('PRENATAL SYZYGY: ' + D.syz.kind + ' ' + D.syz.lon.toFixed(1) + ' lord ' + D.syz.lord + ' h' + D.syz.house + '; ALMUTEN FIGURIS: ' + D.almuten.planet + '; DISPOSITORS: ' + JSON.stringify(D.disp.disp) + ' sole final=' + D.disp.sole + ' mutual=' + JSON.stringify(D.disp.mutual));
    L.push('ZR SPIRIT: L1 ' + D.zrSpirit.cur1.sign + ' (' + new Date(D.zrSpirit.cur1.start).toISOString().slice(0, 10) + '..' + new Date(D.zrSpirit.cur1.end).toISOString().slice(0, 10) + ', peak ' + D.zrSpirit.cur1.peak + '), L2 ' + D.zrSpirit.cur2.sign + ' (to ' + new Date(D.zrSpirit.cur2.end).toISOString().slice(0, 10) + ', peak ' + D.zrSpirit.cur2.peak + ', LB ' + D.zrSpirit.cur2.lb + '); ZR FORTUNE L1 ' + D.zrFortune.cur1.sign + ' (signs 0=Aries)');
    L.push('HERMETIC LOTS: ' + ['eros', 'necessity', 'courage', 'victory', 'nemesis'].map(k => k + ' ' + D.chart.lots[k].toFixed(1)).join(', '));
    L.push('PATTERNS: shape ' + pa.shape + (pa.handle ? ' handle ' + pa.handle : '') + '; configs ' + pa.configs.map(c => c.type + '(' + c.planets.join('/') + (c.apex ? ' apex ' + c.apex : '') + ')').join(', ') + '; unaspected ' + pa.unaspected.join(',') + '; OOB ' + pa.oob.join(',') + '; parallels ' + pa.parallels.map(x => x.a + '-' + x.b + ' ' + x.kind).join(', ') + '; antiscia ' + pa.antiscia.map(x => x.a + '-' + x.b + ' ' + x.kind).join(', '));
    L.push('MIDPOINTS: ' + pa.mids.map(m => m.a + '/' + m.b + '=' + m.c + ' ' + m.orb.toFixed(1)).join(', ') + '; HARMONICS: ' + pa.harmonics.map(H => 'H' + H.h + ':' + H.groups.map(g => g.join('/')).join('|')).join(' '));
    L.push('JYOTISH (Lahiri ' + v.ay.toFixed(2) + '): lagna sign ' + v.ls + ', moon nakshatra ' + (v.moonNak + 1) + ' pada ' + v.pada(v.sid.moon) + ', dasha ' + (v.cur ? v.cur.lord + '/' + (v.ad ? v.ad.lord : '') + ' until ' + new Date(v.cur.end).toISOString().slice(0, 10) : '') + ', yogas ' + v.yogas.map(y => y.id + (y.planet ? ':' + y.planet : '') + (y.a ? ':' + y.a + '+' + y.b : '')).join(', ') + ', vargottama ' + v.varg.join(',') + ', sade sati ' + v.sadeSati + ', rahu bhava ' + v.bhava('node'));
    L.push('BAZI: pillars ' + b.pillars.map(pillarName).join(' | ') + '; day master ' + KB.STEM_PY[b.dS] + ' ' + b.dmEl + (b.strong ? ' strong' : ' weak') + ' (' + Math.round(b.ratio * 100) + '%), useful ' + b.fav.join(',') + '; elements ' + JSON.stringify(b.cnt) + '; ten gods ' + JSON.stringify(b.gods) + '; interactions ' + b.inter.map(x => x.kind + (x.el ? ':' + x.el : '') + (x.i !== undefined ? ' ' + x.i + '-' + x.j : '')).join(', ') + (b.luck && b.luck.cur ? '; luck pillar ' + pillarName(b.luck.cur) + ' ages ' + b.luck.cur.from.toFixed(1) + '-' + b.luck.cur.to.toFixed(1) : ''));
    L.push('ARABIC LUNAR MANSION ' + (D.mansion + 1) + '; PLANETARY DAY/HOUR ' + (D.hour ? D.hour.dayRuler + '/' + D.hour.hourRuler : '-') + '; SOLAR RETURN ' + (D.sr ? new Date(D.sr.ms).toISOString().slice(0, 10) + ' asc sign ' + signOf(D.sr.chart.asc) + ' ruler ' + D.sr.chart.ascRuler : '-'));
    L.push('PROGRESSED: sun ' + D.prog.sun.toFixed(1) + ' moon ' + D.prog.moon.toFixed(1) + ' (natal h' + D.prog.moonHouse + ') lunation phase ' + D.prog.phase + '/8; RETURNS ' + D.ret.map(r => r.kind + ' ' + new Date(r.ms).toISOString().slice(0, 10)).join(', ') + '; TZOLKIN ' + D.tz.num + '-' + D.tz.sign);
    return L.join('\n');
  }

  G.Deep = { analyze, render, digest, bazi, vedic, patterns, zodiacalReleasing, syzygy, dispositors, almutenFiguris, tzolkin, pillarName };
})(typeof window !== 'undefined' ? window : globalThis);
