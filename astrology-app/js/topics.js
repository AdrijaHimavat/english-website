/* Akhtarnameh — topic readings: love & compatibility, money, buying & selling, and the rule-based chat fallback.
 * Love: Ptolemy Tetrabiblos IV.5, Valens, Lilly (7th house), Parashara (7th lord, navamsa), Ashtakoota (Guna Milan), Zi Ping spouse palace.
 * Money: 2nd/11th/8th houses, Lot of Fortune, Lot of Substance (Abu Ma'shar), Jupiter, Dhana yogas, Bazi wealth star.
 * Trade: Lilly's rules "of buying and selling", al-Biruni/Bonatti elections (buy with the Moon decreasing, sell with it increasing).
 */
(function (G) {
  'use strict';
  const KB = G.KB, E = G.AstroEngine, I = G.Interpret, T = G.I18N, D = G.Deep, H = G.Horary, M = G.Mundane, A = G.Astronomy;
  const t = (k, p) => T.t(k, p);
  const pn = k => I.pn(k), sn = i => I.sn(i), DAY = E.DAY;
  const { norm, sep, n180, signOf } = E;
  const CL = KB.CLASSIC;
  const short = k => t('pl.' + k + '.short');
  const ben = k => k === 'jupiter' || k === 'venus', mal = k => k === 'mars' || k === 'saturn';
  const st = k => I.strength(k);

  function aspectOf(l1, l2, orb) {
    const d = sep(l1, l2);
    for (const a of KB.ASPECTS) if (Math.abs(d - a.angle) <= orb) return { asp: a, orb: Math.abs(d - a.angle) };
    return null;
  }
  // when Jupiter occupies a given sign (tropical) in the next `years`
  function jupiterInSign(sign, fromMs, years) {
    const out = []; let cur = null;
    for (let tt = fromMs; tt < fromMs + years * 365.25 * DAY; tt += 5 * DAY) {
      const inS = signOf(E.lonAt('jupiter', tt)) === sign;
      if (inS && !cur) cur = { start: tt };
      if (!inS && cur) { cur.end = tt; out.push(cur); cur = null; }
    }
    if (cur) { cur.end = fromMs + years * 365.25 * DAY; out.push(cur); }
    return out;
  }

  /* =================== LOVE =================== */
  function loveNatal(chart, sex, deep, atMs) {
    I.setTz(chart.tz);
    const P = chart.planets, out = [];
    const el = k => KB.SIGNS[P[k].sign].el;
    const v = P.venus, m = P.mars;
    out.push({ title: t('love.venusTitle'), tone: st(v.total).tone, text: t('love.venus', { pos: I.fmtLon(v.lon), h: v.house, word: st(v.total).word }) + ' ' + t('love.venusEl.' + el('venus')) + ' ' + t(v.total >= 4 ? 'love.venusStrong' : v.total <= -4 ? 'love.venusWeak' : 'love.venusMid') + (v.retro ? ' ' + t('love.venusRetro') : '') + (v.acc.list.some(x => x[1] === 'combust') ? ' ' + t('love.venusCombust') : '') });
    out.push({ title: t('love.marsTitle'), tone: st(m.total).tone, text: t('love.mars', { pos: I.fmtLon(m.lon), h: m.house }) + ' ' + t('love.marsEl.' + el('mars')) });
    const dsc = signOf(chart.cusps[7]), l7 = chart.houseRulers[7], p7 = P[l7];
    const in7 = CL.filter(k => P[k].house === 7);
    let s7 = t('love.desc', { sign: sn(dsc) }) + ' ' + t('signs.' + dsc + '.asc') + ' ' + t('love.lord7', { p: pn(l7), h: p7.house, topics: I.topics(p7.house), word: st(p7.total).word });
    in7.forEach(k => { s7 += ' ' + t('love.in7.' + k); });
    out.push({ title: t('love.partnerTitle'), tone: st(p7.total).tone, text: s7 });
    // Ptolemy's significator of the spouse
    const sig = sex === 'f' ? ['sun', 'mars'] : sex === 'm' ? ['moon', 'venus'] : null;
    if (sig) {
      const k = sig[0], pk = P[k];
      const hits = [];
      ['jupiter', 'venus', 'saturn', 'mars'].forEach(q => { if (q === k) return; const a = aspectOf(pk.lon, P[q].lon, 6); if (a) hits.push(t('love.ptolHit.' + (ben(q) ? (a.asp.nature === 'hard' ? 'benHard' : 'ben') : (a.asp.nature === 'easy' ? 'malEasy' : 'mal')), { p: pn(q), asp: t('asp.' + a.asp.id + '.name') })); });
      out.push({ title: t('love.ptolTitle'), text: t(sex === 'f' ? 'love.ptolF' : 'love.ptolM', { p: pn(k), pos: I.fmtLon(pk.lon), h: pk.house, mode: t('mode.' + KB.SIGNS[pk.sign].mod) }) + ' ' + t('love.ptolMode.' + KB.SIGNS[pk.sign].mod) + (hits.length ? ' ' + hits.join(' ') : '') });
    }
    // delay / ease indicators
    const delay = [], ease = [];
    if (aspectOf(P.saturn.lon, v.lon, 6) && aspectOf(P.saturn.lon, v.lon, 6).asp.nature !== 'easy') delay.push(t('love.d.satVenus'));
    if (aspectOf(P.saturn.lon, chart.cusps[7], 5)) delay.push(t('love.d.sat7'));
    if (v.retro) delay.push(t('love.d.venusRetro'));
    if (in7.includes('saturn')) delay.push(t('love.d.satIn7'));
    if ([6, 8, 12].includes(p7.house)) delay.push(t('love.d.lord7cadent'));
    if (aspectOf(P.jupiter.lon, v.lon, 6) && aspectOf(P.jupiter.lon, v.lon, 6).asp.nature !== 'hard') ease.push(t('love.e.jupVenus'));
    if (in7.some(ben)) ease.push(t('love.e.benIn7'));
    if ([1, 10, 7, 4, 5, 11].includes(p7.house) && p7.total > 0) ease.push(t('love.e.lord7good'));
    if (aspectOf(P.moon.lon, v.lon, 6) && aspectOf(P.moon.lon, v.lon, 6).asp.nature !== 'hard') ease.push(t('love.e.moonVenus'));
    out.push({ title: t('love.easeTitle'), tone: ease.length > delay.length ? 'good' : delay.length > ease.length ? 'hard' : 'mixed', text: (ease.length ? t('love.easeList', { list: T.list(ease) }) + ' ' : '') + (delay.length ? t('love.delayList', { list: T.list(delay) }) + ' ' : '') + t(delay.length > ease.length ? 'love.delayVerdict' : ease.length > delay.length ? 'love.easeVerdict' : 'love.mixedVerdict') });
    // lots
    ['marriage', 'eros'].forEach(k => {
      const lon = chart.lots[k], h = E.houseOf(lon, chart.houses), lr = E.ruler(signOf(lon));
      out.push({ title: t('lots.' + k + '.name'), tone: st(P[lr].total).tone, text: t('lots.' + k + '.text') + ' ' + t('deep.hel.lot', { pos: I.fmtLon(lon), h, topics: I.topics(h), lord: pn(lr), str: st(P[lr].total).word }) });
    });
    // other traditions
    if (deep) {
      const vd = deep.ved, l7v = KB.DOMICILE[(vd.ls + 6) % 12];
      out.push({ title: t('love.vedTitle'), text: t('love.ved', { lord: pn(l7v), h: vd.bhava(l7v), topics: I.topics(vd.bhava(l7v)), nav: sn(vd.nav('venus')) }) + ' ' + t('love.navEl.' + KB.SIGNS[vd.nav('venus')].el) + (vd.manglik ? ' ' + t('love.manglik') : '') });
      const bz = deep.bazi;
      const dayInter = bz.inter.filter(x => x.i === 2 || x.j === 2).map(x => t('deep.bazi.inter.' + x.kind + '.name'));
      out.push({ title: t('love.baziTitle'), text: t('love.bazi', { g: t('god.' + bz.gods.dayBranch + '.name'), gt: t('god.' + bz.gods.dayBranch + '.text') }) + ' ' + (dayInter.length ? t('love.baziInter', { list: T.list(dayInter) }) : t('love.baziCalm')) + ' ' + t(sex === 'f' ? 'love.baziStarF' : sex === 'm' ? 'love.baziStarM' : 'love.baziStarX', { el: t('wx.' + (sex === 'f' ? bz.rel.officer : bz.rel.wealth)), n: T.num(bz.cnt[sex === 'f' ? bz.rel.officer : bz.rel.wealth], 1) }) });
    }
    // timing windows
    const win = [];
    const pr = E.profection(chart.ms, atMs, signOf(chart.asc), chart.tz);
    if ([5, 7].includes(pr.house) || [l7, 'venus'].includes(pr.lord)) win.push(t('love.w.prof', { h: pr.house, p: pn(pr.lord) }));
    if (deep) {
      if (deep.fird.current && ['venus'].includes(deep.fird.current.lord)) win.push(t('love.w.firdar'));
      if (deep.fird.sub && deep.fird.sub.lord === 'venus') win.push(t('love.w.firdarSub'));
      const vd = deep.ved, l7v = KB.DOMICILE[(vd.ls + 6) % 12];
      if (vd.cur && [l7v, 'venus'].includes(vd.cur.lord)) win.push(t('love.w.dasha', { p: pn(vd.cur.lord) }));
      if (vd.ad && [l7v, 'venus'].includes(vd.ad.lord)) win.push(t('love.w.antar', { p: pn(vd.ad.lord), to: I.fmtDate(vd.ad.end, null, false) }));
    }
    const jw = jupiterInSign((signOf(chart.asc) + 6) % 12, atMs - 30 * DAY, 12).slice(0, 2);
    const jv = jupiterInSign(v.sign, atMs - 30 * DAY, 12).slice(0, 1);
    const jtxt = jw.map(w => I.fmtDate(w.start, null, false) + ' – ' + I.fmtDate(w.end, null, false)).join(' · ');
    out.push({ title: t('love.timingTitle'), tone: win.length ? 'good' : 'mixed', text: (win.length ? t('love.timingNow', { list: T.list(win) }) : t('love.timingQuiet')) + ' ' + (jw.length ? t('love.jup7', { sign: sn((signOf(chart.asc) + 6) % 12), when: jtxt }) : '') + (jv.length ? ' ' + t('love.jupVenus', { when: I.fmtDate(jv[0].start, null, false) }) : '') });
    return out;
  }

  // Ashtakoota (Guna Milan) on the Moon's nakshatra and rasi
  const YONI = [0, 1, 2, 3, 3, 4, 5, 2, 5, 6, 6, 7, 8, 9, 8, 9, 10, 10, 4, 11, 12, 11, 13, 0, 13, 7, 1]; // horse, elephant, sheep, serpent, dog, cat, rat, cow, buffalo, tiger, deer, monkey, mongoose, lion
  const YONI_ENEMY = [[0, 8], [1, 13], [2, 11], [3, 12], [4, 10], [5, 6], [7, 9]];
  const GANA = [0, 1, 2, 1, 0, 1, 0, 0, 2, 2, 1, 1, 0, 2, 0, 2, 0, 2, 2, 1, 1, 0, 2, 2, 1, 1, 0]; // 0 deva, 1 manushya, 2 rakshasa
  const NADI = [0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2];
  const VARNA = [1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0]; // 0 brahmin (water), 1 kshatriya (fire), 2 vaishya (earth), 3 shudra (air)
  const VASHYA = [0, 0, 1, 2, 3, 1, 1, 4, 1, 0, 1, 2]; // simplified: 0 quadruped, 1 human, 2 water, 3 wild, 4 insect
  const FRIEND = {
    sun: { f: ['moon', 'mars', 'jupiter'], e: ['venus', 'saturn'] }, moon: { f: ['sun', 'mercury'], e: [] },
    mars: { f: ['sun', 'moon', 'jupiter'], e: ['mercury'] }, mercury: { f: ['sun', 'venus'], e: ['moon'] },
    jupiter: { f: ['sun', 'moon', 'mars'], e: ['mercury', 'venus'] }, venus: { f: ['mercury', 'saturn'], e: ['sun', 'moon'] },
    saturn: { f: ['mercury', 'venus'], e: ['sun', 'moon', 'mars'] }
  };
  const rel = (a, b) => FRIEND[a].f.includes(b) ? 2 : FRIEND[a].e.includes(b) ? 0 : 1;
  function koota(vA, vB, boyIsA) {
    const g = boyIsA ? vA : vB, b = boyIsA ? vB : vA; // groom, bride
    const gn = g.moonNak, bn = b.moonNak, gr = g.rasi('moon'), br = b.rasi('moon');
    const parts = [];
    parts.push(['varna', VARNA[gr] <= VARNA[br] ? 1 : 0, 1]);
    parts.push(['vashya', VASHYA[gr] === VASHYA[br] ? 2 : 1, 2]);
    // count from one nakshatra to the other (inclusive); remainders 3, 5 and 7 (mod 9) are inauspicious
    const tara = count => [3, 5, 7].includes(count % 9) ? 0 : 1.5;
    parts.push(['tara', tara((gn - bn + 27) % 27 + 1) + tara((bn - gn + 27) % 27 + 1), 3]);
    const ya = YONI[gn], yb = YONI[bn];
    parts.push(['yoni', ya === yb ? 4 : YONI_ENEMY.some(([x, y]) => (x === ya && y === yb) || (x === yb && y === ya)) ? 0 : 2, 4]);
    const la = KB.DOMICILE[gr], lb = KB.DOMICILE[br];
    const r1 = rel(la, lb), r2 = rel(lb, la);
    const gm = la === lb ? 5 : (r1 === 2 && r2 === 2) ? 5 : (r1 + r2 === 3) ? 4 : (r1 === 1 && r2 === 1) ? 3 : (r1 + r2 === 2) ? 1 : (r1 + r2 === 1) ? 0.5 : 0;
    parts.push(['maitri', gm, 5]);
    const ga = GANA[gn], gb = GANA[bn];
    parts.push(['gana', ga === gb ? 6 : (ga + gb === 1) ? 5 : (ga === 0 || gb === 0) ? 1 : 0, 6]);
    const dist = (br - gr + 12) % 12 + 1, dist2 = (gr - br + 12) % 12 + 1;
    const badB = [[2, 12], [5, 9], [6, 8]].some(([x, y]) => (dist === x && dist2 === y) || (dist === y && dist2 === x));
    parts.push(['bhakoot', badB ? 0 : 7, 7]);
    parts.push(['nadi', NADI[gn] === NADI[bn] ? 0 : 8, 8]);
    return { parts, total: parts.reduce((s, p) => s + p[1], 0) };
  }

  function synastry(A, B, sexA, sexB, dA, dB) {
    const out = [];
    const PA = A.planets, PB = B.planets;
    const pts = c => CL.map(k => [k, c.planets[k].lon]).concat([['asc', c.asc]]);
    const nm = k => k === 'asc' ? t('ui.asc') : pn(k);
    const links = [];
    pts(A).forEach(([ka, la]) => pts(B).forEach(([kb, lb]) => {
      const orb = (['sun', 'moon'].includes(ka) || ['sun', 'moon'].includes(kb)) ? 6 : 4;
      const a = aspectOf(la, lb, orb);
      if (a) links.push({ a: ka, b: kb, asp: a.asp, orb: a.orb });
    }));
    let attraction = 0, harmony = 0, durability = 0, friction = 0;
    const has = (x, y) => links.filter(l => (l.a === x && l.b === y) || (l.a === y && l.b === x));
    links.forEach(l => {
      const pair = [l.a, l.b].sort().join('-');
      const w = 1 - l.orb / 8, easy = l.asp.nature === 'easy', hard = l.asp.nature === 'hard', conj = l.asp.angle === 0;
      if (['mars-venus', 'asc-venus', 'asc-mars', 'moon-venus', 'moon-sun', 'sun-venus'].includes(pair)) attraction += (hard ? 1.5 : 2.5) * w;
      if (['moon-sun', 'moon-moon', 'sun-sun', 'mercury-mercury', 'asc-moon', 'asc-sun', 'jupiter-moon', 'jupiter-sun', 'jupiter-venus'].includes(pair)) harmony += (easy || conj ? 2.5 : -1) * w;
      if (l.a === 'saturn' || l.b === 'saturn') { if (easy || (conj && !['mars'].includes(l.a === 'saturn' ? l.b : l.a))) durability += 2 * w; else if (hard) { friction += 2 * w; durability += 0.5 * w; } }
      if (l.a === 'jupiter' || l.b === 'jupiter') durability += (hard ? 0.5 : 1.5) * w;
      if (pair === 'moon-sun' && (conj || easy)) durability += 2 * w;
      if ((l.a === 'mars' || l.b === 'mars') && hard) friction += 2 * w;
      if (pair === 'moon-saturn' && hard) friction += 1.5 * w;
    });
    // Ptolemy IV.5: the luminaries of the two in the same or harmonious signs
    const harmSign = (x, y) => [0, 2, 4, 8, 10].includes((x - y + 12) % 12) || [0, 4, 8, 2, 10].includes((y - x + 12) % 12);
    const ptol = []; let ptolHit = false;
    if (harmSign(PA.sun.sign, PB.moon.sign) || harmSign(PA.moon.sign, PB.sun.sign)) { harmony += 2; ptol.push(t('syn.ptol.lights')); ptolHit = true; }
    if (has('sun', 'moon').some(l => l.asp.angle === 0)) { durability += 2; ptol.push(t('syn.ptol.exchange')); ptolHit = true; }
    if (harmSign(PA.moon.sign, PB.moon.sign)) { harmony += 1; ptol.push(t('syn.ptol.moons')); ptolHit = true; }
    if (!ptol.length) ptol.push(t('syn.ptol.none'));
    const norm10 = x => Math.max(0, Math.min(10, x));
    const sc = { attraction: norm10(attraction), harmony: norm10(harmony + 3), durability: norm10(durability + 1), friction: norm10(friction) };
    // scores line
    out.push({ title: t('syn.scoresTitle'), scores: sc, text: t('syn.scores', { a: T.num(sc.attraction, 1), h: T.num(sc.harmony, 1), d: T.num(sc.durability, 1), f: T.num(sc.friction, 1) }) });
    out.push({ title: t('syn.ptolTitle'), tone: ptolHit ? 'good' : 'mixed', text: ptol.join(' ') });
    // key contacts
    const key = links.filter(l => ['sun', 'moon', 'venus', 'mars', 'asc', 'saturn'].includes(l.a) && ['sun', 'moon', 'venus', 'mars', 'asc', 'saturn'].includes(l.b)).sort((x, y) => x.orb - y.orb).slice(0, 8);
    key.forEach(l => {
      const tone = l.asp.angle === 0 ? (mal(l.a) || mal(l.b) ? 'mixed' : 'good') : l.asp.nature === 'easy' ? 'good' : 'hard';
      out.push({ title: t('syn.contact', { a: nm(l.a), asp: t('asp.' + l.asp.id + '.name'), b: nm(l.b) }), tone, text: t('syn.contactText.' + (l.asp.angle === 0 ? 'conj' : l.asp.nature), { x: l.a === 'asc' ? t('deep.short.asc') : short(l.a), y: l.b === 'asc' ? t('deep.short.asc') : short(l.b), orb: T.num(l.orb, 1) }) + (l.a === 'saturn' || l.b === 'saturn' ? ' ' + t('syn.saturnNote') : '') });
    });
    // house overlays
    const ov = [];
    [[B, A, 'b2a'], [A, B, 'a2b']].forEach(([X, Y, dir]) => {
      ['sun', 'moon', 'venus', 'mars', 'jupiter', 'saturn'].forEach(k => {
        const h = E.houseOf(X.planets[k].lon, Y.houses);
        if ([1, 5, 7, 8, 12].includes(h)) ov.push(t('syn.overlay.' + dir, { p: pn(k), h, meaning: t('syn.ovh.' + h) }));
      });
    });
    if (ov.length) out.push({ title: t('syn.overlayTitle'), text: ov.slice(0, 8).join(' ') });
    // Ashtakoota
    if (dA && dB) {
      const boyIsA = sexA === 'm' || (sexA !== 'f' && sexB === 'f') || (sexA !== 'f' && sexB !== 'm');
      const k = koota(dA.ved, dB.ved, boyIsA);
      const verdict = k.total >= 28 ? 'excellent' : k.total >= 24 ? 'good' : k.total >= 18 ? 'fair' : 'weak';
      out.push({ title: t('syn.kootaTitle', { n: T.num(k.total, 1) }), tone: k.total >= 24 ? 'good' : k.total >= 18 ? 'mixed' : 'hard', text: k.parts.map(p => t('syn.koota.' + p[0]) + ' ' + T.num(p[1], 1) + '/' + T.num(p[2])).join(' · ') + '. ' + t('syn.kootaVerdict.' + verdict) + (k.parts.find(p => p[0] === 'nadi')[1] === 0 ? ' ' + t('syn.nadiDosha') : '') + (k.parts.find(p => p[0] === 'bhakoot')[1] === 0 ? ' ' + t('syn.bhakootDosha') : '') + ' ' + t('syn.kootaNote') });
      // Bazi
      const ba = dA.bazi, bb = dB.bazi, C = KB.WX_CYCLE;
      const ia = C.indexOf(ba.dmEl), ib = C.indexOf(bb.dmEl);
      const relAB = ia === ib ? 'same' : (ia + 1) % 5 === ib ? 'aFeedsB' : (ib + 1) % 5 === ia ? 'bFeedsA' : (ia + 2) % 5 === ib ? 'aControlsB' : 'bControlsA';
      const pair = [ba.pillars[2].b, bb.pillars[2].b].sort((x, y) => x - y);
      const dayRel = KB.CLASHES.some(c => c[0] === pair[0] && c[1] === pair[1]) ? 'clash' : KB.HARMONIES.some(c => c[0] === pair[0] && c[1] === pair[1]) ? 'harmony' : pair[0] === pair[1] ? 'same' : 'neutral';
      const ya = ba.animal, yb = bb.animal, yp = [ya, yb].sort((x, y) => x - y);
      const yRel = KB.CLASHES.some(c => c[0] === yp[0] && c[1] === yp[1]) ? 'clash' : KB.HARMONIES.some(c => c[0] === yp[0] && c[1] === yp[1]) ? 'harmony' : KB.TRINES.some(([tri]) => tri.includes(ya) && tri.includes(yb) && ya !== yb) ? 'trine' : 'neutral';
      out.push({ title: t('syn.baziTitle'), tone: dayRel === 'clash' || yRel === 'clash' ? 'hard' : dayRel === 'harmony' || yRel === 'harmony' || yRel === 'trine' ? 'good' : 'mixed', text: t('syn.baziDm.' + relAB, { a: t('stem.' + ba.dS), b: t('stem.' + bb.dS) }) + ' ' + t('syn.baziDay.' + dayRel) + ' ' + t('syn.baziYear.' + yRel, { a: t('animal.' + ya), b: t('animal.' + yb) }) });
      // overall
      const synPct = Math.max(0, Math.min(100, (sc.attraction * 0.25 + sc.harmony * 0.35 + sc.durability * 0.3 - sc.friction * 0.2) / 9 * 100));
      const baziPct = (dayRel === 'harmony' ? 85 : dayRel === 'clash' ? 25 : 55) + (yRel === 'clash' ? -15 : yRel === 'neutral' ? 0 : 10);
      const pct = Math.max(5, Math.min(98, Math.round(0.5 * synPct + 0.35 * (k.total / 36 * 100) + 0.15 * baziPct)));
      const verdictKey = pct >= 72 ? 'strong' : pct >= 55 ? 'good' : pct >= 40 ? 'work' : 'hard';
      out.unshift({ title: t('syn.overallTitle', { pct: T.num(pct) }), tone: pct >= 55 ? 'good' : pct >= 40 ? 'mixed' : 'hard', pct, text: t('syn.overall.' + verdictKey) + ' ' + t('syn.overallWhy', { a: T.num(sc.attraction, 1), h: T.num(sc.harmony, 1), d: T.num(sc.durability, 1), f: T.num(sc.friction, 1), k: T.num(k.total, 1) }) });
    }
    return { items: out, links, scores: sc };
  }

  /* =================== MONEY =================== */
  const MONEY_STYLE = { saturn: 'value', jupiter: 'growth', mars: 'aggressive', venus: 'beauty', mercury: 'trader', moon: 'cyclical', sun: 'leader' };
  function moneyReading(chart, deep, atMs) {
    I.setTz(chart.tz);
    const P = chart.planets, out = [];
    const l2 = chart.houseRulers[2], p2 = P[l2], in2 = CL.filter(k => P[k].house === 2);
    let s = t('money.house2', { sign: sn(signOf(chart.cusps[2])), p: pn(l2), h: p2.house, word: st(p2.total).word }) + ' ' + t('money.source', { topics: t('money.src.' + p2.house) });
    in2.forEach(k => { s += ' ' + t('money.in2.' + k); });
    out.push({ title: t('money.capacityTitle'), tone: st(p2.total + in2.filter(ben).length * 4 - in2.filter(mal).length * 3).tone, text: s });
    // Lot of Substance (Abu Ma'shar): Asc + lord of 2nd − cusp of 2nd
    const sub = norm(chart.asc + p2.lon - chart.cusps[2]), sh = E.houseOf(sub, chart.houses), sl = E.ruler(signOf(sub));
    const fl = E.ruler(signOf(chart.lots.fortune)), fh = chart.lotHouses.fortune;
    out.push({ title: t('money.lotsTitle'), tone: st((P[sl].total + P[fl].total) / 2).tone, text: t('money.fortune', { pos: I.fmtLon(chart.lots.fortune), h: fh, topics: I.topics(fh), p: pn(fl), word: st(P[fl].total).word }) + ' ' + t('money.substance', { pos: I.fmtLon(sub), h: sh, topics: I.topics(sh), p: pn(sl), word: st(P[sl].total).word }) });
    const j = P.jupiter;
    out.push({ title: t('money.jupTitle'), tone: st(j.total).tone, text: t('money.jup', { pos: I.fmtLon(j.lon), h: j.house, topics: I.topics(j.house), word: st(j.total).word }) + ' ' + t(j.total >= 4 ? 'money.jupStrong' : j.total <= -4 ? 'money.jupWeak' : 'money.jupMid') });
    const l11 = chart.houseRulers[11], l8 = chart.houseRulers[8], l10 = chart.houseRulers[10];
    out.push({ title: t('money.flowsTitle'), text: t('money.flows', { p11: pn(l11), w11: st(P[l11].total).word, h11: P[l11].house, p10: pn(l10), w10: st(P[l10].total).word, p8: pn(l8), w8: st(P[l8].total).word, h8: P[l8].house }) + ' ' + t(P[l8].total > P[l11].total + 4 ? 'money.flows8' : P[l11].total > P[l8].total + 4 ? 'money.flows11' : 'money.flowsEven') });
    // style
    const emph = ['saturn', 'jupiter', 'mars', 'venus', 'mercury', 'moon', 'sun'].map(k => [k, (P[k].total > 0 ? P[k].total : 0) + ([1, 2, 10, 11].includes(P[k].house) ? 4 : 0) + (k === l2 ? 5 : 0)]).sort((a, b) => b[1] - a[1]);
    out.push({ title: t('money.styleTitle'), text: t('money.style', { p: pn(emph[0][0]), q: pn(emph[1][0]) }) + ' ' + t('money.styleText.' + MONEY_STYLE[emph[0][0]]) + ' ' + t('money.styleSecond', { text: t('money.styleText.' + MONEY_STYLE[emph[1][0]]) }) + (P.uranus.house === 2 || P.uranus.house === 8 ? ' ' + t('money.uranus') : '') + (P.neptune.house === 2 || P.neptune.house === 8 ? ' ' + t('money.neptune') : '') });
    if (deep) {
      const bz = deep.bazi, w = bz.rel.wealth, wc = bz.cnt[w];
      const wealthStrong = wc >= 2.5;
      const key = bz.strong ? (wealthStrong ? 'strongStrong' : 'strongWeak') : (wealthStrong ? 'weakStrong' : 'weakWeak');
      out.push({ title: t('money.baziTitle'), tone: key === 'strongStrong' ? 'good' : key === 'weakWeak' ? 'mixed' : 'mixed', text: t('money.bazi', { el: t('wx.' + w), n: T.num(wc, 1), p: pn(KB.WX_PLANET[w]) }) + ' ' + t('money.baziCase.' + key) });
      const dh = deep.ved.yogas.filter(y => ['dhana', 'raja', 'viparita', 'malavya', 'hamsa', 'gajakesari'].includes(y.id)).map(y => t('yoga.' + y.id + '.name'));
      const vd = deep.ved, l2v = KB.DOMICILE[(vd.ls + 1) % 12], l11v = KB.DOMICILE[(vd.ls + 10) % 12];
      out.push({ title: t('money.vedTitle'), text: t('money.ved', { l2: pn(l2v), h2: vd.bhava(l2v), l11: pn(l11v), h11: vd.bhava(l11v) }) + ' ' + (dh.length ? t('money.vedYogas', { list: T.list(dh) }) : t('money.vedNone')) });
      // timing
      const now = [];
      if ([2, 8, 11, 10].includes(deep.prof.house)) now.push(t('money.t.prof', { h: deep.prof.house }));
      if ([l2, l11].includes(deep.prof.lord)) now.push(t('money.t.profLord', { p: pn(deep.prof.lord) }));
      const jh = E.houseOf(E.lonAt('jupiter', atMs), chart.houses), sh2 = E.houseOf(E.lonAt('saturn', atMs), chart.houses);
      if ([2, 11, 10].includes(jh)) now.push(t('money.t.jup', { h: jh }));
      if ([2, 8].includes(sh2)) now.push(t('money.t.sat', { h: sh2 }));
      if (vd.cur && [l2v, l11v, 'jupiter', 'venus'].includes(vd.cur.lord)) now.push(t('money.t.dasha', { p: pn(vd.cur.lord) }));
      if (bz.luck && bz.luck.cur && KB.STEM_EL[bz.luck.cur.s] === w) now.push(t('money.t.luck'));
      if (deep.zrFortune.cur1.peak) now.push(t('money.t.zr'));
      const good = now.length - (now.some(x => x === t('money.t.sat', { h: sh2 })) ? 1 : 0);
      out.push({ title: t('money.timingTitle'), tone: good >= 2 ? 'good' : now.length ? 'mixed' : 'mixed', text: now.length ? t('money.timing', { list: T.list(now) }) : t('money.timingQuiet') });
    }
    return out;
  }

  function marketCalendar(startMs, days, tz) {
    I.setTz(tz);
    const end = startMs + days * DAY, ev = [];
    [[0, 'newMoon'], [180, 'fullMoon']].forEach(([ang, kind]) => {
      let tt = startMs;
      for (let i = 0; i < 6; i++) {
        const r = A.SearchMoonPhase(ang, A.MakeTime(new Date(tt)), 40);
        if (!r || r.date.getTime() > end) break;
        const ms = r.date.getTime();
        ev.push({ ms, kind, title: t('cal.' + kind, { sign: sn(signOf(E.lonAt('moon', ms))) }), text: t('cal.' + kind + 'Text'), tone: kind === 'newMoon' ? 'good' : 'mixed' });
        tt = ms + DAY;
      }
    });
    ['mercury', 'venus', 'mars'].forEach(k => M.stations(k, startMs, end).forEach(s => ev.push({ ms: s.ms, kind: s.kind, p: k, title: t('mun.station.' + s.kind, { p: pn(k) }), text: t('cal.station.' + k + '.' + s.kind), tone: s.kind === 'retro' ? 'hard' : 'good' })));
    M.eclipses(startMs, end).forEach(e => ev.push({ ms: e.ms, kind: 'eclipse', title: t('mun.ecl.' + e.type), text: t('cal.eclipse'), tone: 'hard' }));
    ev.sort((a, b) => a.ms - b.ms);
    return ev.map(e => ({ title: I.fmtDate(e.ms, tz, false) + ' — ' + e.title, text: e.text, tone: e.tone, ms: e.ms, kind: e.kind, p: e.p }));
  }

  /* =================== BUY & SELL =================== */
  const ASSETS = {
    stocks: { planet: 'jupiter', extra: ['mercury'], houses: [2, 11] },
    crypto: { planet: 'mercury', extra: ['jupiter'], houses: [2, 11] },
    gold: { planet: 'sun', extra: ['jupiter'], houses: [2] },
    currency: { planet: 'mercury', extra: ['moon'], houses: [2, 7] },
    property: { planet: 'saturn', extra: ['moon'], houses: [4, 2], fixed: true },
    vehicle: { planet: 'mercury', extra: ['mars'], houses: [3, 2] },
    goods: { planet: 'mercury', extra: ['venus'], houses: [2, 7] }
  };
  function tradeEvent(action, asset) {
    const a = ASSETS[asset] || ASSETS.goods;
    return { id: action + '-' + asset, houses: action === 'buy' ? a.houses.concat([7]).filter((v, i, x) => x.indexOf(v) === i) : a.houses.concat([10]).filter((v, i, x) => x.indexOf(v) === i), planet: a.planet, extra: a.extra, noRetro: 'mercury', moonPref: action === 'buy' ? 'waning' : 'waxing', fixed: a.fixed, edge: true };
  }
  function dealHorary(chart, action, asset) {
    I.setTz(chart.tz);
    const P = chart.planets, ms = chart.ms;
    const A1 = chart.houseRulers[1], A7 = chart.houseRulers[7], L10 = chart.houseRulers[10], L4 = chart.houseRulers[4];
    const thing = asset === 'property' ? L4 : (ASSETS[asset] || ASSETS.goods).planet;
    const tests = []; let score = 0;
    const add = (w, text) => { score += w; tests.push({ w, text, tone: w > 0 ? 'good' : w < 0 ? 'hard' : 'mixed' }); };
    if (E.moonVoid(chart)) add(-2, t('hor.voc'));
    const ascDeg = chart.asc - signOf(chart.asc) * 30;
    if (ascDeg > 27) add(-1, t('hor.late', { d: T.num(ascDeg, 1) }));
    if (ascDeg < 3) add(-1, t('hor.early', { d: T.num(ascDeg, 1) }));
    if (A1 === A7) add(1, t('trade.sameLord', { p: pn(A1) }));
    else {
      const perf = E.nextPerfection(A1, A7, ms, 120);
      if (perf && !E.stationBetween(A1, ms, perf.ms) && !E.stationBetween(A7, ms, perf.ms)) add(perf.angle === 90 || perf.angle === 180 ? 1 : 2.5, t('trade.deal', { a: pn(A1), b: pn(A7), asp: t('asp.' + KB.ASPECTS.find(x => x.angle === perf.angle).id + '.name'), date: I.fmtDate(perf.ms, chart.tz, false) }) + ' ' + t('hor.perfNote.' + perf.angle));
      else add(-1.5, t('trade.noDeal', { a: pn(A1), b: pn(A7) }));
    }
    const d = P[A1].total - P[A7].total;
    add(d >= 4 ? 1.5 : d <= -4 ? -1.5 : 0, t(d >= 4 ? 'trade.edgeYou' : d <= -4 ? 'trade.edgeThem' : 'trade.edgeEven', { a: pn(A1), b: pn(A7) }));
    const p10 = P[L10], high = p10.total >= 4 && [1, 4, 7, 10].includes(p10.house), low = p10.total <= -4 || [3, 6, 9, 12].includes(p10.house);
    const priceKey = high ? 'high' : low ? 'low' : 'fair';
    add(action === 'buy' ? (priceKey === 'low' ? 1 : priceKey === 'high' ? -1 : 0) : (priceKey === 'high' ? 1 : priceKey === 'low' ? -1 : 0), t('trade.price.' + priceKey, { p: pn(L10) }));
    const waxing = n180(P.moon.lon - P.sun.lon) > 0;
    add(action === 'buy' ? (waxing ? -0.5 : 1) : (waxing ? 1 : -0.5), t(waxing ? 'trade.moonWaxing' : 'trade.moonWaning'));
    const th = P[thing];
    add(th.total >= 4 ? 1 : th.total <= -4 ? -1 : 0, t('trade.thing', { p: pn(thing), word: st(th.total).word }) + (th.retro ? ' ' + t('trade.thingRetro') : ''));
    const p4 = P[L4];
    add(p4.total >= 4 || ben(L4) ? 1 : p4.total <= -4 ? -1 : 0, t('trade.end', { p: pn(L4), word: st(p4.total).word }));
    if (P.mercury.retro) add(-1.5, t('trade.mercRetro'));
    const nx = E.moonNextAspects(chart, true)[0];
    if (nx) add(ben(nx.planet) && nx.aspect.nature !== 'hard' ? 1 : mal(nx.planet) && nx.aspect.nature !== 'easy' ? -1 : 0, t('hor.moonNext', { asp: t('asp.' + nx.aspect.id + '.name'), p: pn(nx.planet), hours: Math.max(1, Math.round(nx.days * 24)) }));
    const key = score >= 3 ? 'go' : score >= 1 ? 'lean' : score > -1 ? 'wait' : 'no';
    return { key, verdict: t('trade.verdict.' + action + '.' + key), tone: { go: 'good', lean: 'good', wait: 'mixed', no: 'hard' }[key], score, tests, sig: t('trade.sig.' + action, { a: pn(A1), b: pn(A7), price: pn(L10), end: pn(L4), thing: pn(thing) }) };
  }

  /* =================== CHAT FALLBACK =================== */
  const TOPIC_HOUSE = { love: 7, career: 10, business: 10, money: 2, lost: 2, travel: 9, study: 9, home: 4, children: 5, health: 6, lawsuit: 7, debt: 8, sibling: 3, friends: 11, enemy: 12 };
  const lc = x => String(x || '').replace(/\u200c/g, '').toLocaleLowerCase(T.locale);
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // English fallback keywords must start a word, so "car" does not fire inside French "car" sentences or "sell" inside "vaisselle"
  const enHit = (q, k) => new RegExp('(^|[^\\p{L}])' + esc(lc(k).trim()) + (lc(k).length <= 4 ? '($|[^\\p{L}])' : ''), 'u').test(q);
  function kwHit(q, key) {
    const own = T.raw(key) || [];
    const en = T.lang !== 'en' && G.I18N_DATA.en ? (key.split('.').reduce((o, k) => o && o[k], G.I18N_DATA.en) || []) : [];
    return own.some(k => k && q.includes(lc(k))) || en.some(k => k && enHit(q, k));
  }
  function tradeAnswer(q, loc) {
    const action = kwHit(q, 'chat.sellKw') ? 'sell' : 'buy';
    const asset = Object.keys(ASSETS).find(a => kwHit(q, 'trade.assetKw.' + a)) || 'goods';
    const chart = E.castChart({ ms: Date.now(), lat: loc.lat, lon: loc.lon, tz: loc.tz, houseSystem: 'regio' });
    const d = dealHorary(chart, action, asset);
    const lines = ['**' + d.verdict + '**', t('chat.tradeIntro', { asset: t('trade.asset.' + asset) }), d.sig];
    d.tests.slice().sort((a, b) => Math.abs(b.w) - Math.abs(a.w)).slice(0, 4).forEach(x => lines.push('- ' + x.text));
    lines.push('', t('chat.tradeMore'), t('ui.trade.disclaimer'), '', t('chat.ruleNote'));
    return { text: lines.join('\n'), chart, j: { verdict: d.verdict, type: { id: 'trade:' + action + ':' + asset }, score: d.score, testimonies: d.tests } };
  }
  function ruleAnswer(q, loc, natal) {
    if (kwHit(lc(q), 'chat.buyKw') || kwHit(lc(q), 'chat.sellKw')) return tradeAnswer(lc(q), loc);
    const qt = H.classify(q);
    const chart = E.castChart({ ms: Date.now(), lat: loc.lat, lon: loc.lon, tz: loc.tz, houseSystem: 'regio' });
    const j = H.judge(chart, qt ? qt.id : 'friends');
    const lines = [];
    lines.push('**' + j.verdict + '**');
    lines.push(t('chat.ruleIntro', { topic: t('qtypes.' + j.type.id + '.name') }));
    j.testimonies.slice().sort((a, b) => Math.abs(b.w) - Math.abs(a.w)).slice(0, 3).forEach(x => lines.push('- ' + x.text));
    if (j.considerations.length) lines.push('- ' + j.considerations[0]);
    if (j.timing) lines.push(t('ui.horary.when') + ': ' + t('ui.horary.whenText', { date: I.fmtDate(j.timing.date, loc.tz) }));
    if (natal) {
      const h = TOPIC_HOUSE[j.type.id] || 1;
      const sec = natal.reading.sections.find(s => s.id === 'houses');
      const it = sec && sec.items.find(i => i.title.indexOf(t('ui.houseN', { n: h })) === 0);
      if (it) lines.push('', t('chat.ruleNatal', { h }) + ' ' + it.text);
    }
    lines.push('', t('chat.ruleNote'));
    return { text: lines.join('\n'), chart, j };
  }

  G.Topics = { loveNatal, synastry, koota, moneyReading, marketCalendar, tradeEvent, dealHorary, ruleAnswer, ASSETS };
})(typeof window !== 'undefined' ? window : globalThis);
