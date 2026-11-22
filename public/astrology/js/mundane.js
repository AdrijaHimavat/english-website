/* Akhtarnameh — mundane astrology (Aries ingress, eclipses, conjunctions).
 * Masha'allah, Abu Ma'shar (Book of Religions and Dynasties; Revolutions of the Years of the World), Ptolemy book II.
 */
(function (G) {
  'use strict';
  const KB = G.KB, E = G.AstroEngine, I = G.Interpret, A = G.Astronomy, T = G.I18N;
  const t = (k, p) => T.t(k, p);
  const pn = k => I.pn(k), sn = i => I.sn(i), DAY = E.DAY;

  function equinox(year, which) {
    const s = A.Seasons(year);
    return ({ mar: s.mar_equinox, jun: s.jun_solstice, sep: s.sep_equinox, dec: s.dec_solstice })[which || 'mar'].date.getTime();
  }
  function findConjunctions(a, b, startMs, endMs, stepDays) {
    const out = [];
    let t0 = startMs, d0 = E.n180(E.lonAt(a, t0) - E.lonAt(b, t0));
    for (let t1 = startMs + stepDays * DAY; t1 <= endMs; t1 += stepDays * DAY) {
      const d1 = E.n180(E.lonAt(a, t1) - E.lonAt(b, t1));
      if (d0 * d1 <= 0 && Math.abs(d0) < 40 && Math.abs(d1) < 40) {
        let lo = t0, hi = t1, dl = d0;
        for (let k = 0; k < 40; k++) {
          const mid = (lo + hi) / 2, dm = E.n180(E.lonAt(a, mid) - E.lonAt(b, mid));
          if (dl * dm <= 0) hi = mid; else { lo = mid; dl = dm; }
        }
        out.push({ ms: hi, lon: E.lonAt(a, hi) });
      }
      t0 = t1; d0 = d1;
    }
    return out;
  }
  function stations(key, startMs, endMs) {
    const out = [];
    let s0 = Math.sign(E.speedAt(key, startMs));
    for (let tt = startMs + DAY; tt <= endMs; tt += DAY) {
      const s = Math.sign(E.speedAt(key, tt));
      if (s !== s0) { out.push({ ms: tt, kind: s < 0 ? 'retro' : 'direct', lon: E.lonAt(key, tt) }); s0 = s; }
    }
    return out;
  }
  function ingresses(key, startMs, endMs) {
    const out = [];
    let s0 = E.signOf(E.lonAt(key, startMs));
    for (let tt = startMs + 2 * DAY; tt <= endMs; tt += 2 * DAY) {
      const s = E.signOf(E.lonAt(key, tt));
      if (s !== s0) { out.push({ ms: tt, sign: s }); s0 = s; }
    }
    return out;
  }
  function eclipses(startMs, endMs) {
    const out = [];
    let le = A.SearchLunarEclipse(new Date(startMs));
    while (le.peak.date.getTime() < endMs) {
      out.push({ type: 'lunar', kind: le.kind, ms: le.peak.date.getTime(), lon: E.lonAt('moon', le.peak.date.getTime()) });
      le = A.NextLunarEclipse(le.peak);
    }
    let se = A.SearchGlobalSolarEclipse(new Date(startMs));
    while (se.peak.date.getTime() < endMs) {
      out.push({ type: 'solar', kind: se.kind, ms: se.peak.date.getTime(), lon: E.lonAt('sun', se.peak.date.getTime()), lat: se.latitude, lng: se.longitude });
      se = A.NextGlobalSolarEclipse(se.peak);
    }
    return out.sort((x, y) => x.ms - y.ms);
  }

  function analyzeYear(year, lat, lon, tz, houseSystem) {
    I.setTz(tz);
    const ms = equinox(year, 'mar') + 60000;
    const nextMs = equinox(year + 1, 'mar');
    const chart = E.castChart({ ms, lat, lon, tz, houseSystem: houseSystem || 'placidus' });
    const Pp = chart.planets, ascS = E.signOf(chart.asc);
    const items = [], sections = [];
    const ar = chart.ascRuler, alm = chart.almutenAsc;
    const angular = k => [1, 4, 7, 10].includes(Pp[k].house);
    const lord = [ar, alm].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => (Pp[b].total + (angular(b) ? 4 : 0)) - (Pp[a].total + (angular(a) ? 4 : 0)))[0];
    const lp = Pp[lord], st = I.strength(lp.total);
    items.push({ title: t('mun.ingressTitle'), text: t('mun.ingress', { date: I.fmtDate(ms - 60000, tz), asc: I.fmtLon(chart.asc) }) });
    items.push({ title: t('mun.lordTitle'), tone: st.tone, text: t('mun.lord', { p: pn(lord), why: t(lord === ar ? 'mun.lordWhyAsc' : 'mun.lordWhyAlm'), h: lp.house, mundane: t('houses.' + lp.house + '.mundane'), word: st.word }) + ' ' + t('mun.lordTone.' + st.tone, { good: t('pl.' + lord + '.good'), bad: t('pl.' + lord + '.bad') }) });
    const mod = KB.SIGNS[ascS].mod;
    if (mod === 'movable') {
      const qs = ['jun', 'sep', 'dec'].map(w => {
        const qm = equinox(year, w) + 60000, qc = E.castChart({ ms: qm, lat, lon, tz, houseSystem });
        return t('mun.quarter.' + w) + ': ' + I.fmtDate(qm - 60000, tz) + ' — ' + t('mun.quarterAsc', { sign: sn(E.signOf(qc.asc)), p: pn(qc.ascRuler), word: I.strength(qc.planets[qc.ascRuler].total).word });
      });
      items.push({ title: t('mun.seasonsTitle'), text: t('mun.movable') + ' ' + qs.join('. ') + '.' });
    } else if (mod === 'common') {
      const qm = equinox(year, 'sep') + 60000, qc = E.castChart({ ms: qm, lat, lon, tz, houseSystem });
      items.push({ title: t('mun.halfTitle'), text: t('mun.common', { date: I.fmtDate(qm - 60000, tz), sign: sn(E.signOf(qc.asc)) }) });
    } else items.push({ title: t('mun.fixedTitle'), text: t('mun.fixed') });
    const mn = E.moonNextAspects(chart, false)[0];
    let mt = t('mun.moon', { pos: I.fmtLon(Pp.moon.lon), h: Pp.moon.house, word: I.strength(Pp.moon.total).word });
    if (mn) {
      const k = ['jupiter', 'venus'].includes(mn.planet) && mn.aspect.nature !== 'hard' ? 'good' : ['mars', 'saturn'].includes(mn.planet) && mn.aspect.nature !== 'easy' ? 'hard' : 'mixed';
      mt += ' ' + t('mun.moonNext', { asp: t('asp.' + mn.aspect.id + '.name'), p: pn(mn.planet) }) + ' ' + t('mun.moonTone.' + k, { mundane: t('pl.' + mn.planet + '.mundane') });
    }
    items.push({ title: t('mun.moonTitle'), text: mt, tone: I.strength(Pp.moon.total).tone });
    sections.push({ id: 'year', title: t('mun.sec.year', { year, py: year - 621 }), items });

    const hs = [];
    [1, 10, 7, 4, 2, 6, 8, 9, 11, 12, 3, 5].forEach(h => {
      const inside = E.CLASSIC.filter(k => Pp[k].house === h);
      const lr = chart.houseRulers[h];
      let txt = t('houses.' + h + '.mundane') + ' — ' + t('mun.houseLord', { p: pn(lr), word: I.strength(Pp[lr].total).word });
      let sc = Pp[lr].total / 4;
      inside.forEach(k => {
        if (['jupiter', 'venus'].includes(k)) { sc += 2; txt += ' ' + t('mun.houseBen', { p: pn(k) }); }
        else if (k === 'mars') { sc -= 2; txt += ' ' + t('mun.houseMars'); }
        else if (k === 'saturn') { sc -= 2; txt += ' ' + t('mun.houseSaturn'); }
        else txt += ' ' + t('mun.houseOther', { p: pn(k) });
      });
      if (inside.length || Math.abs(sc) >= 2) hs.push({ title: t('ui.houseN', { n: h }), text: txt, tone: sc >= 1.5 ? 'good' : sc <= -1.5 ? 'hard' : 'mixed' });
    });
    sections.push({ id: 'mhouses', title: t('mun.sec.houses'), items: hs });

    const ecl = eclipses(ms, nextMs).map(e => ({
      title: t('mun.ecl.' + e.type) + ' — ' + t('mun.eclKind.' + e.kind), tone: 'mixed',
      text: t('mun.eclText', { date: I.fmtDate(e.ms, tz), pos: I.fmtLon(e.lon), meaning: t('eclipse.' + KB.SIGNS[E.signOf(e.lon)].el) }) + (e.type === 'solar' && isFinite(e.lat) && isFinite(e.lng) ? ' ' + t('mun.eclMax', { lat: T.num(Math.round(e.lat)), lng: T.num(Math.round(e.lng)) }) : '')
    }));
    sections.push({ id: 'ecl', title: t('mun.sec.ecl'), items: ecl.length ? ecl : [{ text: t('mun.noEcl') }] });

    const gc = findConjunctions('jupiter', 'saturn', Date.UTC(year - 45, 0, 1), Date.UTC(year + 25, 0, 1), 8);
    const before = gc.filter(c => c.ms <= ms), after = gc.filter(c => c.ms > ms);
    const qi = [];
    const last = before[before.length - 1];
    if (last) qi.push({ title: t('mun.gcLastTitle'), text: t('mun.gcLast', { date: I.fmtDate(last.ms, tz, false), pos: I.fmtLon(last.lon), meaning: t('gconj.' + KB.SIGNS[E.signOf(last.lon)].el) }) });
    if (after[0]) qi.push({ title: t('mun.gcNextTitle'), text: t('mun.gcNext', { date: I.fmtDate(after[0].ms, tz, false), pos: I.fmtLon(after[0].lon), el: t('el.' + KB.SIGNS[E.signOf(after[0].lon)].el) }) });
    const chain = [];
    before.concat(after).forEach(c => {
      const prev = chain[chain.length - 1];
      if (prev && c.ms - prev.ms < 400 * DAY) { prev.triple = true; return; }
      chain.push(Object.assign({}, c));
    });
    let ci = chain.findIndex(c => c.ms > ms); if (ci < 0) ci = chain.length;
    const view = chain.slice(Math.max(0, ci - 4), ci + 2);
    qi.push({ title: t('mun.gcChainTitle'), text: view.map(c => I.fmtGreg(c.ms, tz).slice(0, 4) + ' ' + sn(E.signOf(c.lon)) + (c.triple ? ' (' + t('mun.triple') + ')' : '')).join(' → ') + '. ' + t('mun.gcChain') });
    findConjunctions('mars', 'saturn', ms, nextMs, 2).forEach(c => qi.push({ title: t('mun.msTitle'), tone: 'hard', text: t('mun.ms', { date: I.fmtDate(c.ms, tz, false), pos: I.fmtLon(c.lon), sign: sn(E.signOf(c.lon)), el: t('el.' + KB.SIGNS[E.signOf(c.lon)].el) }) }));
    findConjunctions('mars', 'jupiter', ms, nextMs, 2).forEach(c => qi.push({ title: t('mun.mjTitle'), tone: 'mixed', text: t('mun.mj', { date: I.fmtDate(c.ms, tz, false), pos: I.fmtLon(c.lon) }) }));
    sections.push({ id: 'conj', title: t('mun.sec.conj'), items: qi });

    const rv = [];
    ['mercury', 'venus', 'mars', 'jupiter', 'saturn'].forEach(k => {
      stations(k, ms, nextMs).forEach(s => rv.push({ ms: s.ms, title: t('mun.station.' + s.kind, { p: pn(k) }), tone: s.kind === 'retro' ? 'mixed' : 'good', text: I.fmtDate(s.ms, tz, false) + ' · ' + I.fmtLon(s.lon) + '. ' + (s.kind === 'retro' && ['mercury', 'venus', 'mars'].includes(k) ? t('mun.retroNote.' + k) : '') }));
    });
    ['jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].forEach(k => {
      ingresses(k, ms, nextMs).forEach(g => rv.push({ ms: g.ms, title: t('mun.ingressP', { p: pn(k), sign: sn(g.sign) }), tone: 'mixed', text: I.fmtDate(g.ms, tz, false) + ' — ' + (k === 'jupiter' || k === 'saturn' ? t('mun.ingressMeaning.' + k, { sign: sn(g.sign), el: t('el.' + KB.SIGNS[g.sign].el) }) : t('nat.modernNote') + ' ' + t('pl.' + k + '.sig')) }));
    });
    rv.sort((a, b) => a.ms - b.ms);
    sections.push({ id: 'motion', title: t('mun.sec.motion'), items: rv });
    return { chart, sections, ms: ms - 60000, lord };
  }

  G.Mundane = { analyzeYear, equinox, findConjunctions, eclipses, stations, ingresses };
})(typeof window !== 'undefined' ? window : globalThis);
