/* Akhtarnameh — horary questions and elections.
 * Rules: Sahl ibn Bishr, Masha'allah, Bonatti, Lilly.
 */
(function (G) {
  'use strict';
  const KB = G.KB, E = G.AstroEngine, I = G.Interpret, T = G.I18N;
  const t = (k, p) => T.t(k, p);
  const pn = k => I.pn(k), DAY = E.DAY;

  function norm(s) { return (s || '').replace(/‌/g, '').toLowerCase(); }
  function classify(text) {
    const q = norm(text);
    let best = null, bestN = 0;
    KB.QUESTION_TYPES.forEach(qt => {
      const kws = [].concat(T.raw('qtypes.' + qt.id + '.kw') || [], (G.I18N_DATA.en && G.I18N_DATA.en.qtypes[qt.id].kw) || []);
      let n = 0; kws.forEach(k => { const kk = norm(k); if (kk && q.includes(kk)) n += kk.length > 3 ? 2 : 1; });
      if (n > bestN) { bestN = n; best = qt; }
    });
    return best;
  }
  const aspById = angle => KB.ASPECTS.find(a => a.angle === angle);
  const aname = angle => t('asp.' + aspById(angle).id + '.name');
  const fast = (a, b, ms) => Math.abs(E.speedAt(a, ms)) >= Math.abs(E.speedAt(b, ms)) ? a : b;

  function timingText(chart, key, degrees) {
    const pl = chart.planets[key];
    const mod = KB.SIGNS[pl.sign].mod, kind = KB.HOUSE_KIND[pl.house];
    const q = (mod === 'movable' ? 0 : mod === 'common' ? 1 : 2) + (kind === 'angle' ? 0 : kind === 'succedent' ? 1 : 2);
    const unit = q <= 1 ? 'days' : q === 2 ? 'weeks' : q === 3 ? 'months' : 'years';
    const n = Math.max(1, Math.round(degrees));
    return { unit, n, text: t('hor.timing', { n, mode: t('mode.' + mod), kind: t('kind.' + kind), unit: t('unit.' + unit) }) };
  }

  function judge(chart, typeId) {
    const qt = KB.QUESTION_TYPES.find(q => q.id === typeId) || KB.QUESTION_TYPES.find(q => q.id === 'friends');
    const ms = chart.ms, Pp = chart.planets;
    const A = chart.ascRuler, B = chart.houseRulers[qt.house];
    const cons = [], test = [];
    let score = 0;
    const add = (w, text) => { score += w; test.push({ w, text, tone: w > 0 ? 'good' : w < 0 ? 'hard' : 'mixed' }); };
    I.setTz(chart.tz);

    const ascDeg = chart.asc - E.signOf(chart.asc) * 30;
    if (ascDeg < 3) { cons.push(t('hor.early', { d: T.num(ascDeg, 1) })); score -= 1; }
    if (ascDeg > 27) { cons.push(t('hor.late', { d: T.num(ascDeg, 1) })); score -= 1; }
    if (E.moonVoid(chart)) { cons.push(t('hor.voc')); score -= 1.5; }
    if (Pp.moon.lon >= 195 && Pp.moon.lon <= 225) cons.push(t('hor.viaCombusta'));
    if (Pp.saturn.house === 1) cons.push(t('hor.saturn1'));
    if (Pp.saturn.house === 7) cons.push(t('hor.saturn7'));

    const sig = t('hor.sig', { a: pn(A), b: pn(B), h: qt.house, topics: I.topics(qt.house) });
    let perf = null, timing = null;

    if (A === B) add(2, t('hor.sameLord', { p: pn(A) }));
    else {
      perf = E.nextPerfection(A, B, ms, 365);
      if (perf) {
        const scA = E.signChangeMs(A, ms, 400), scB = E.signChangeMs(B, ms, 400);
        const inSign = perf.ms < Math.min(scA, scB);
        const refr = E.stationBetween(A, ms, perf.ms) || E.stationBetween(B, ms, perf.ms);
        const days = (perf.ms - ms) / DAY;
        const desc = t('hor.perf', { a: pn(A), b: pn(B), asp: aname(perf.angle), date: I.fmtDate(perf.ms, chart.tz), days: Math.round(days) });
        if (refr) add(-2, desc + ' ' + t('hor.refranation'));
        else {
          let w = perf.angle === 0 || perf.angle === 60 || perf.angle === 120 ? 3 : perf.angle === 90 ? 2 : 1;
          let note = ' ' + t('hor.perfNote.' + perf.angle);
          if (!inSign) { w -= 1; note += ' ' + t('hor.afterSign'); }
          if (days > 180) { w -= 1; note += ' ' + t('hor.far'); }
          add(w, desc + note);
          E.CLASSIC.forEach(C => {
            if (C === A || C === B || C === 'moon') return;
            [A, B].forEach(X => {
              const p2 = E.nextPerfection(C, X, ms, days, [0]);
              if (p2 && p2.ms < perf.ms) add(-1, t(['mars', 'saturn'].includes(C) ? 'hor.prohibitMal' : 'hor.prohibit', { c: pn(C), x: pn(X) }));
            });
          });
          const f = fast(A, B, ms);
          timing = timingText(chart, f, Math.min(Math.abs(E.speedAt(f, ms)) * days, 30));
          timing.date = perf.ms;
        }
      } else add(-2, t('hor.noPerf', { a: pn(A), b: pn(B) }));

      E.CLASSIC.forEach(X => {
        if (X === A || X === B) return;
        const sx = Math.abs(E.speedAt(X, ms));
        if (sx <= Math.abs(E.speedAt(A, ms)) || sx <= Math.abs(E.speedAt(B, ms))) return;
        const horizon = X === 'moon' ? 3 : 20;
        [[A, B], [B, A]].forEach(([from, to]) => {
          const last = E.lastPerfection(X, from, ms, horizon);
          const next = E.nextPerfection(X, to, ms, horizon * 1.5);
          if (last && next && next.ms < E.signChangeMs(X, ms, 60)) add(2, t('hor.translation', { x: pn(X), from: pn(from), to: pn(to) }));
        });
      });
      E.CLASSIC.forEach(C => {
        if (C === A || C === B) return;
        const sc = Math.abs(E.speedAt(C, ms));
        if (sc >= Math.abs(E.speedAt(A, ms)) || sc >= Math.abs(E.speedAt(B, ms))) return;
        const pA = E.nextPerfection(A, C, ms, 120), pB = E.nextPerfection(B, C, ms, 120);
        if (pA && pB && pA.ms < E.signChangeMs(A, ms, 200) && pB.ms < E.signChangeMs(B, ms, 200)) add(1.5, t('hor.collection', { c: pn(C) }));
      });
      const sA = Pp[A].sign, sB = Pp[B].sign;
      const rec = (planet, sign) => E.ruler(sign) === planet || E.exaltRuler(sign) === planet;
      if (rec(B, sA) && rec(A, sB)) add(2, t('hor.mutualRec', { a: pn(A), b: pn(B) }));
      else {
        if (rec(B, sA)) add(1, t('hor.recByB', { b: pn(B) }));
        if (rec(A, sB)) add(0.5, t('hor.recByA'));
      }
      if (Pp[B].house === 1) add(1, t('hor.bIn1', { b: pn(B) }));
      if (Pp[A].house === qt.house) add(0.5, t('hor.aInQ', { a: pn(A) }));
    }

    const mNext = E.moonNextAspects(chart, true)[0];
    if (mNext) {
      const asp = mNext.aspect;
      let w = 0, extra = '';
      if (mNext.planet === B) { w = asp.nature === 'hard' ? 0.5 : 1.5; extra = ' ' + t('hor.moonToB'); }
      else if (['jupiter', 'venus'].includes(mNext.planet) && asp.nature !== 'hard') { w = 1; extra = ' ' + t('hor.moonToBen'); }
      else if (['mars', 'saturn'].includes(mNext.planet) && asp.nature !== 'easy') { w = -1; extra = ' ' + t('hor.moonToMal'); }
      add(w, t('hor.moonNext', { asp: t('asp.' + asp.id + '.name'), p: pn(mNext.planet), hours: Math.max(1, Math.round(mNext.days * 24)) }) + extra);
    }
    const bp = Pp[B];
    if (bp.total <= -8) add(-1, t('hor.bWeak', { b: pn(B), s: bp.total }));
    else if (bp.total >= 8) add(0.5, t('hor.bStrong', { b: pn(B) }));
    if (bp.acc.list.some(x => x[1] === 'combust')) add(-1, t('hor.bCombust', { b: pn(B) }));
    if (Pp[A].acc.list.some(x => x[1] === 'combust')) cons.push(t('hor.aCombust', { a: pn(A) }));

    const special = [];
    if (qt.id === 'lost') {
      const l2 = chart.houseRulers[2], where = Pp[l2];
      special.push({ tone: [1, 4, 7, 10].includes(where.house) || [1, 4, 7, 10].includes(Pp.moon.house) ? 'good' : 'mixed', text: t([1, 4, 7, 10].includes(where.house) || [1, 4, 7, 10].includes(Pp.moon.house) ? 'hor.lostFound' : 'hor.lostHard') });
      special.push({ tone: 'mixed', text: t('hor.lostDir', { dir: t('dir.' + KB.SIGNS[where.sign].el), sign: I.sn(where.sign), place: t('hor.lostPlace.' + KB.SIGNS[where.sign].el) }) });
      if (where.house <= 6) special.push({ tone: 'mixed', text: t('hor.lostHidden') });
    }
    if (qt.id === 'health') special.push({ tone: 'mixed', text: t('hor.healthNote') });
    if (qt.id === 'business') {
      const l2 = chart.houseRulers[2], st = I.strength(Pp[l2].total);
      special.push({ tone: st.tone, text: t('hor.profit', { p: pn(l2), word: st.word, h: Pp[l2].house }) });
    }
    const key = score >= 3 ? 'yes' : score >= 1.5 ? 'likely' : score > -0.5 ? 'unclear' : score > -2.5 ? 'unlikely' : 'no';
    const tone = { yes: 'good', likely: 'good', unclear: 'mixed', unlikely: 'hard', no: 'hard' }[key];
    return { type: qt, querent: A, quesited: B, sig, considerations: cons, testimonies: test, special, score, verdict: t('hor.verdict.' + key), tone, timing, perfection: perf };
  }

  /* ---------- elections ---------- */
  function sunTable(startMs, days, lat, lon) {
    const A = G.Astronomy, out = [];
    const obs = new A.Observer(lat, lon, 0);
    let tt = startMs - 1.2 * DAY;
    for (let i = 0; i < days + 3; i++) {
      const sr = A.SearchRiseSet(A.Body.Sun, obs, +1, A.MakeTime(new Date(tt)), 2);
      if (!sr) return null;
      const ss = A.SearchRiseSet(A.Body.Sun, obs, -1, sr, 1);
      if (!ss) return null;
      out.push({ sr: sr.date.getTime(), ss: ss.date.getTime() });
      tt = sr.date.getTime() + 60000;
    }
    return out;
  }
  function hourFromTable(tab, ms, lon) {
    if (!tab) return null;
    for (let i = 0; i < tab.length - 1; i++) {
      const { sr, ss } = tab[i], nx = tab[i + 1].sr;
      if (ms >= sr && ms < nx) {
        const wd = new Date(sr + lon / 15 * 3600000).getUTCDay();
        const dr = KB.DAY_RULER[wd];
        const idx = ms < ss ? Math.floor((ms - sr) / ((ss - sr) / 12)) : 12 + Math.floor((ms - ss) / ((nx - ss) / 12));
        return { dayRuler: dr, hourRuler: KB.CHALDEAN[(KB.CHALDEAN.indexOf(dr) + idx) % 7], weekday: wd };
      }
    }
    return null;
  }

  function scoreElection(chart, ev, ph) {
    const Pp = chart.planets, R = [];
    let s = 0;
    const add = (w, key, p) => { s += w; R.push([w, key, p || {}]); };
    const m = Pp.moon;
    if (E.moonVoid(chart)) add(-5, 'elr.voc');
    if (m.lon >= 195 && m.lon <= 225) add(-3, 'elr.viaCombusta');
    const dSun = E.sep(m.lon, Pp.sun.lon);
    if (dSun < 12) add(-4, 'elr.moonCombust');
    else if (ev.moonPref === 'waning') { if (E.n180(m.lon - Pp.sun.lon) < 0) add(2, 'elr.waningBuy'); else add(-1, 'elr.waxingBuy'); }
    else if (ev.moonPref === 'waxing') { if (E.n180(m.lon - Pp.sun.lon) > 0) add(2.5, 'elr.waxingSell'); else add(-1, 'elr.waningSell'); }
    else if (E.n180(m.lon - Pp.sun.lon) > 0) add(2, 'elr.waxing');
    if (m.ess.list.includes('detriment') || m.ess.list.includes('fall')) add(-2, 'elr.moonDebil');
    if (m.ess.list.includes('domicile') || m.ess.list.includes('exaltation')) add(2, 'elr.moonDignified');
    const nx = E.moonNextAspects(chart, true)[0];
    if (nx) {
      if (['jupiter', 'venus'].includes(nx.planet) && nx.aspect.nature !== 'hard') add(3, 'elr.moonToBen', { p: nx.planet });
      else if (['mars', 'saturn'].includes(nx.planet) && nx.aspect.nature !== 'easy') add(-3, 'elr.moonToMal', { p: nx.planet, asp: nx.aspect.id });
      else if (['mars', 'saturn'].includes(nx.planet)) add(-0.5, 'elr.moonToMalSoft', { p: nx.planet });
    }
    const md = KB.SIGNS[m.sign].mod;
    if (ev.fixed && md === 'fixed') add(1, 'elr.moonFixed');
    if (ev.movable && md === 'movable') add(1, 'elr.moonMovable');
    const ar = chart.ascRuler;
    add(Pp[ar].total / 4, 'elr.ascRuler', { p: ar, total: Pp[ar].total });
    ev.houses.forEach(h => { const lr = chart.houseRulers[h]; add(Pp[lr].total / 5, 'elr.houseRuler', { h, p: lr, total: Pp[lr].total }); });
    E.CLASSIC.forEach(k => {
      const h = Pp[k].house;
      if (['jupiter', 'venus'].includes(k)) {
        if (h === 1 || h === 10) add(1.5, 'elr.benAngle', { p: k, h });
        if (ev.houses.includes(h) && h !== 1 && h !== 10) add(1, 'elr.benHouse', { p: k, h });
      }
      if (['mars', 'saturn'].includes(k)) {
        if (h === 1 || h === 10) add(-2, 'elr.malAngle', { p: k, h });
        if (h === 7 && (ev.id === 'marriage' || ev.id === 'contract')) add(-2, 'elr.mal7', { p: k });
      }
    });
    if (ev.noRetro && Pp[ev.noRetro].retro) add(-5, 'elr.retro', { p: ev.noRetro });
    if (ev.planet !== 'moon') add(Pp[ev.planet].total / 4, 'elr.planet', { p: ev.planet, total: Pp[ev.planet].total });
    (ev.extra || []).forEach(k => { if (Pp[k] && Pp[k].total !== undefined) add(Pp[k].total / 6, 'elr.planet', { p: k, total: Pp[k].total }); });
    if (ev.edge) { const a = chart.houseRulers[1], b = chart.houseRulers[7]; if (a !== b) { const d = Pp[a].total - Pp[b].total; if (d >= 4) add(1.5, 'elr.edgeYou'); else if (d <= -4) add(-1.5, 'elr.edgeThem'); } }
    if (ph) {
      if (ph.hourRuler === ev.planet) add(1.5, 'elr.hour', { p: ph.hourRuler });
      else if (['mars', 'saturn'].includes(ph.hourRuler) && !(ev.id === 'property' && ph.hourRuler === 'saturn')) add(-1, 'elr.hourMal', { p: ph.hourRuler });
    }
    return { score: s, reasons: R };
  }
  function reasonText(r) {
    const p = r[2], o = {};
    if (p.p) o.p = pn(p.p);
    if (p.h) o.h = p.h;
    if (p.asp) o.asp = t('asp.' + p.asp + '.name');
    if (p.total !== undefined) o.word = I.strength(p.total).word;
    return t(r[1], o);
  }

  function findElections(evId, startMs, days, lat, lon, tz, opts) {
    opts = opts || {};
    const ev = typeof evId === 'object' ? evId : (KB.ELECTIONS.find(e => e.id === evId) || KB.ELECTIONS[0]);
    const step = (opts.stepMin || 20) * 60000;
    const tab = sunTable(startMs, days, lat, lon);
    const all = [];
    for (let tt = startMs; tt < startMs + days * DAY; tt += step) {
      const lp = E.utcToLocalParts(tt, tz);
      if (opts.daytime && (lp.h < 7 || lp.h >= 22)) continue;
      const ch = E.castChart({ ms: tt, lat, lon, tz, houseSystem: opts.houseSystem || 'regio' });
      const ph = hourFromTable(tab, tt, lon);
      const r = scoreElection(ch, ev, ph);
      all.push({ ms: tt, score: r.score, reasons: r.reasons, chart: ch, hour: ph, dayKey: lp.y * 10000 + lp.m * 100 + lp.d });
    }
    const byDay = {};
    all.forEach(x => { if (!byDay[x.dayKey] || byDay[x.dayKey].score < x.score) byDay[x.dayKey] = x; });
    const best = Object.values(byDay).sort((a, b) => b.score - a.score).slice(0, opts.top || 6);
    best.forEach(b => {
      const i = all.indexOf(b);
      let lo = i, hi = i;
      while (lo > 0 && all[lo - 1].ms === all[lo].ms - step && all[lo - 1].score >= b.score - 1.5) lo--;
      while (hi < all.length - 1 && all[hi + 1].ms === all[hi].ms + step && all[hi + 1].score >= b.score - 1.5) hi++;
      b.window = [all[lo].ms, all[hi].ms + step];
    });
    const avoid = all.slice().sort((a, b) => a.score - b.score)[0];
    return { event: ev, best, avoid, count: all.length };
  }

  G.Horary = { classify, judge, findElections, scoreElection, timingText, reasonText };
})(typeof window !== 'undefined' ? window : globalThis);
