/* Akhtarnameh — natal interpretation (classical rules), all text through I18N */
(function (G) {
  'use strict';
  const KB = G.KB, E = G.AstroEngine, T = G.I18N;
  const t = (k, p) => T.t(k, p);
  const pad2 = n => (n < 10 ? '0' : '') + n;
  const pn = k => t('pl.' + k + '.name');
  const sn = i => t('signs.' + i + '.name');
  const topics = (h, business) => t('houses.' + h + (business ? '.business' : '.topics'));
  const P = k => KB.PLANETS[k];
  let curTz = 'UTC';

  function fmtLon(lon) {
    const tot = Math.round(E.norm(lon) * 60) % 21600;
    const s = Math.floor(tot / 1800), deg = Math.floor((tot % 1800) / 60), min = tot % 60;
    return '⁦' + T.num(deg) + '°' + T.digits(pad2(min)) + '′⁩ ' + sn(s);
  }
  function fmtDate(ms, tz, withTime) {
    tz = tz || curTz;
    const p = E.utcToLocalParts(ms, tz);
    let s;
    if (T.lang === 'fa') {
      const j = E.gregorianToJalali(p.y, p.m, p.d);
      s = T.num(j.jd) + ' ' + t('jmonths')[j.jm - 1] + ' ' + T.num(j.jy);
    } else {
      const loc = T.lang === 'ar' ? 'ar-EG' : T.locale;
      s = new Intl.DateTimeFormat(loc, { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(Date.UTC(p.y, p.m - 1, p.d)));
    }
    if (withTime !== false) s += t('ui.at') + T.digits(pad2(p.h) + ':' + pad2(p.mi));
    return s;
  }
  function fmtGreg(ms, tz) { const p = E.utcToLocalParts(ms, tz || curTz); return T.digits(p.y + '-' + pad2(p.m) + '-' + pad2(p.d)); }
  function setTz(tz) { curTz = tz; }
  function strength(total) {
    const k = total >= 12 ? 'vstrong' : total >= 4 ? 'strong' : total >= -3 ? 'mid' : total >= -10 ? 'weak' : 'vweak';
    return { word: t('str.' + k), tone: total >= 4 ? 'good' : total >= -3 ? 'mixed' : 'hard' };
  }
  function inSect(k, chart) {
    const s = P(k).sect; if (s === 'either') return true;
    return chart.isDay ? s === 'day' : s === 'night';
  }
  const short = k => t('pl.' + k + '.short');
  function accLabel(x) { return t('acc.' + x[1], { n: x[2], p: x[1] === 'star' ? t('stars.' + x[2] + '.name') : x[2] ? pn(x[2]) : '' }); }

  function planetText(k, chart, business) {
    const pl = chart.planets[k];
    const st = strength(pl.total);
    let s = t('nat.planetPos', { planet: pn(k), pos: fmtLon(pl.lon), h: pl.house, retro: pl.retro ? ' (' + t('nat.retroMark') + ')' : '' }) + ' ';
    s += t('nat.planetDig', { ess: T.list(pl.ess.list.map(x => t('dig.' + x))), es: pl.ess.score, acc: pl.acc.score, word: st.word, total: pl.total }) + ' ';
    s += t('nat.planetBrings', { sig: t('pl.' + k + '.sig'), topics: topics(pl.house, business) }) + ' ';
    if (st.tone === 'good') s += t('nat.planetGood', { good: t('pl.' + k + '.good') });
    else if (st.tone === 'hard') s += t('nat.planetBad', { bad: t('pl.' + k + '.bad') });
    else s += t('nat.planetMixed');
    if (k === 'saturn' || k === 'mars') s += ' ' + t(inSect(k, chart) ? 'nat.malInSect' : 'nat.malOutSect', { planet: pn(k) });
    if ((k === 'jupiter' || k === 'venus') && inSect(k, chart)) s += ' ' + t('nat.benInSect', { planet: pn(k) });
    if (KB.JOYS[k] === pl.house) s += ' ' + t('nat.joy', { planet: pn(k) });
    const notable = pl.acc.list.filter(x => ['cazimi', 'combust', 'star', 'partileConj'].includes(x[1]));
    if (notable.length) s += ' ' + t('nat.notable', { list: T.list(notable.map(accLabel)) });
    return { text: s, tone: st.tone };
  }

  function aspectText(a) {
    const asp = a.aspect;
    const mal = ['mars', 'saturn'], ben = ['jupiter', 'venus'];
    const hasMal = mal.includes(a.a) || mal.includes(a.b), hasBen = ben.includes(a.a) || ben.includes(a.b);
    let s = t('nat.aspHead', { a: pn(a.a), asp: t('asp.' + asp.id + '.name'), b: pn(a.b), orb: T.num(a.orb, 1), dir: t(a.applying ? 'nat.applying' : 'nat.separating') }) + ' ';
    const prm = { x: short(a.a), y: short(a.b) };
    let tone = 'mixed';
    if (asp.nature === 'easy') { tone = 'good'; s += t(hasBen ? 'nat.aspEasyBen' : hasMal ? 'nat.aspEasyMal' : 'nat.aspEasy', prm); }
    else if (asp.nature === 'hard') { tone = 'hard'; s += t(hasMal ? 'nat.aspHardMal' : hasBen ? 'nat.aspHardBen' : 'nat.aspHard', prm); }
    else {
      if (hasMal && hasBen) s += t('nat.aspConjMixed', prm);
      else if (hasMal) { s += t('nat.aspConjMal', prm); tone = 'hard'; }
      else if (hasBen) { s += t('nat.aspConjBen', prm); tone = 'good'; }
      else s += t('nat.aspConj', prm);
    }
    if (P(a.a).modern || P(a.b).modern) s += ' ' + t('nat.modernNote');
    return { text: s, tone };
  }

  function houseJudgement(i, chart, business) {
    const lord = chart.houseRulers[i], lp = chart.planets[lord], st = strength(lp.total);
    const inside = E.CLASSIC.filter(k => chart.planets[k].house === i);
    let score = lp.total / 4;
    const bits = [t('nat.houseLord', { sign: sn(E.signOf(chart.cusps[i])), lord: pn(lord), h: lp.house, word: st.word })];
    if (lp.house !== i) bits.push(t('nat.houseLink', { topics: topics(lp.house, business) }));
    else bits.push(t('nat.houseOwn'));
    if ([6, 8, 12].includes(lp.house) && i !== lp.house) { score -= 1.5; bits.push(t('nat.houseCadent')); }
    if ([1, 10, 7, 4].includes(lp.house)) { score += 1; bits.push(t('nat.houseAngle')); }
    inside.forEach(k => {
      const kp = chart.planets[k];
      if (k === 'jupiter' || k === 'venus') { score += 2 + (kp.total > 0 ? 1 : 0); bits.push(t(kp.total < -4 ? 'nat.houseBenWeak' : 'nat.houseBen', { planet: pn(k) })); }
      else if (k === 'saturn' || k === 'mars') {
        const pen = inSect(k, chart) || kp.total > 3 ? 1 : 2.5; score -= pen;
        bits.push(t(pen < 2 ? 'nat.houseMalMild' : 'nat.houseMalHard', { planet: pn(k) }));
      } else bits.push(t('nat.houseOther', { planet: pn(k), x: short(k) }));
    });
    if (chart.lotHouses.fortune === i) { score += 1; bits.push(t('nat.houseFortune')); }
    const tone = score >= 2 ? 'good' : score <= -1.5 ? 'hard' : 'mixed';
    bits.push(t('nat.verdict.' + tone));
    return { i, title: business ? t('houses.' + i + '.business') : t('houses.' + i + '.title'), text: bits.join(' '), tone };
  }

  function transitsNow(chart, nowMs) {
    return ['saturn', 'jupiter'].map(k => {
      const lon = E.lonAt(k, nowMs), h = E.houseOf(lon, chart.houses);
      let s = t('nat.transit', { planet: pn(k), pos: fmtLon(lon), h, topics: topics(h) }) + ' ' + t('nat.transitMeaning.' + k);
      const hits = [];
      [['sun', pn('sun')], ['moon', pn('moon')], ['asc', t('ui.asc')], ['mc', t('ui.mc')]].forEach(([key, nm]) => {
        const target = key === 'asc' ? chart.asc : key === 'mc' ? chart.mc : chart.planets[key].lon;
        const d = E.sep(lon, target);
        KB.ASPECTS.forEach(a => { if (Math.abs(d - a.angle) <= 3) hits.push(t('nat.transitHit', { asp: t('asp.' + a.id + '.name'), target: nm })); });
      });
      if (hits.length) s += ' ' + t('nat.transitActive', { list: T.list(hits) });
      return { title: t('nat.transitTitle.' + k), text: s, tone: k === 'saturn' ? 'mixed' : 'good' };
    });
  }

  function natalReading(chart, opts) {
    setTz(chart.tz);
    const business = opts.kind === 'business';
    const now = opts.nowMs || Date.now();
    const sections = [];
    const Pp = chart.planets;
    const ascS = E.signOf(chart.asc);
    const ar = chart.ascRuler, arP = Pp[ar];
    const temp = E.temperament(chart);
    const lord = chart.strongest[0];
    const sum = [];
    sum.push({ text: t(chart.isDay ? 'nat.sectDay' : 'nat.sectNight') });
    sum.push({ text: t('nat.asc', { pos: fmtLon(chart.asc), el: t('el.' + KB.SIGNS[ascS].el), mode: t('mode.' + KB.SIGNS[ascS].mod) }) + ' ' + (business ? t('nat.ascBusiness') + ' ' : '') + t('signs.' + ascS + '.asc') });
    sum.push({ text: t(business ? 'nat.ascRulerBiz' : 'nat.ascRuler', { planet: pn(ar), h: arP.house, word: strength(arP.total).word, topics: topics(arP.house, business) }), tone: strength(arP.total).tone });
    if (!business) {
      sum.push({ text: t('nat.temp', { temp: t('temp.' + temp.key + '.name'), second: t('temp.' + temp.second + '.name') }) + ' ' + t('temp.' + temp.key + '.text') });
      sum.push({ text: t('nat.sunIn', { sign: sn(Pp.sun.sign) }) + ' ' + t('signs.' + Pp.sun.sign + '.sun') });
      const ph = chart.moonPhase;
      const phk = ph < 45 ? 'new' : ph < 135 ? 'waxing' : ph < 180 ? 'gibbous' : ph < 225 ? 'full' : ph < 315 ? 'waning' : 'balsamic';
      sum.push({ text: t('nat.moonIn', { sign: sn(Pp.moon.sign), phase: t('nat.moonPhase.' + phk) }) + ' ' + t('signs.' + Pp.moon.sign + '.moon') });
    }
    sum.push({ text: t('nat.strongest', { planet: pn(lord), score: Pp[lord].total, good: t('pl.' + lord + '.good'), weak: pn(chart.strongest[6]), bad: t('pl.' + chart.strongest[6] + '.bad') }), tone: 'good' });
    const elc = { fire: 0, earth: 0, air: 0, water: 0 };
    E.CLASSIC.forEach(k => { elc[KB.SIGNS[Pp[k].sign].el] += (k === 'sun' || k === 'moon') ? 2 : 1; });
    elc[KB.SIGNS[ascS].el] += 2;
    const es = Object.keys(elc).sort((a, b) => elc[b] - elc[a]);
    sum.push({ text: t('nat.elements', { list: es.map(e => t('el.' + e) + ' ' + T.num(elc[e])).join(' · '), top: t('el.' + es[0]), low: t('el.' + es[3]) }) });
    sections.push({ id: 'summary', title: t('nat.sec.summary'), items: sum });

    const order = business ? [1, 2, 10, 7, 6, 11, 8, 3, 9, 4, 5, 12] : [1, 2, 10, 7, 5, 6, 3, 4, 9, 11, 8, 12];
    sections.push({ id: 'houses', title: t(business ? 'nat.sec.housesBiz' : 'nat.sec.houses'), items: order.map(i => houseJudgement(i, chart, business)).map(h => ({ title: t('ui.houseN', { n: h.i }) + ' — ' + h.title, text: h.text, tone: h.tone })) });
    sections.push({ id: 'planets', title: t('nat.sec.planets'), items: E.CLASSIC.map(k => Object.assign({ title: pn(k) + ' ' + P(k).glyph }, planetText(k, chart, business))) });
    const asps = chart.aspects.slice().sort((x, y) => x.orb - y.orb);
    sections.push({ id: 'aspects', title: t('nat.sec.aspects'), items: asps.map(a => Object.assign({ title: pn(a.a) + ' ' + a.aspect.glyph + ' ' + pn(a.b) }, aspectText(a))) });
    sections.push({
      id: 'lots', title: t('nat.sec.lots'), items: ['fortune', 'spirit', 'marriage', 'father', 'mother'].filter(k => !business || k === 'fortune' || k === 'spirit').map(k => {
        const lon = chart.lots[k], h = chart.lotHouses[k], lr = E.ruler(E.signOf(lon));
        return { title: t('lots.' + k + '.name'), text: t('lots.' + k + '.text') + ' ' + t('deep.hel.lot', { pos: fmtLon(lon), h, topics: topics(h, business), lord: pn(lr), str: strength(Pp[lr].total).word }), tone: strength(Pp[lr].total).tone };
      })
    });
    const tl = [];
    if (!business) {
      const fd = E.firdaria(chart.ms, chart.isDay, now);
      if (fd.current) {
        tl.push({ title: t('nat.firdarTitle'), text: t('nat.firdar', { from: fmtDate(fd.current.start, null, false), to: fmtDate(fd.current.end, null, false), text: t('firdar.' + fd.current.lord) }) + (fd.sub ? ' ' + t('nat.firdarSub', { planet: pn(fd.sub.lord), to: fmtDate(fd.sub.end, null, false), x: short(fd.sub.lord) }) : ''), tone: ['jupiter', 'venus', 'sun', 'node'].includes(fd.current.lord) ? 'good' : 'mixed' });
        const fl = fd.current.lord;
        if (Pp[fl] && Pp[fl].total !== undefined) {
          tl.push({ title: t('nat.firdarLordTitle'), text: t('nat.firdarLord', { planet: pn(fl), word: strength(Pp[fl].total).word, h: Pp[fl].house, topics: topics(Pp[fl].house) }), tone: strength(Pp[fl].total).tone });
        }
      }
    }
    const pr = E.profection(chart.ms, now, ascS, chart.tz);
    tl.push({ title: t(business ? 'nat.profTitleBiz' : 'nat.profTitle', { n: pr.age + 1 }), text: t('nat.prof', { sign: sn(pr.sign), h: pr.house, topics: topics(pr.house, business), planet: pn(pr.lord), word: strength(Pp[pr.lord].total).word }), tone: strength(Pp[pr.lord].total).tone });
    transitsNow(chart, now).forEach(x => tl.push(x));
    sections.push({ id: 'time', title: t('nat.sec.time'), items: tl });
    return { sections, temperament: temp, profection: pr };
  }

  function chartDigest(chart, label) {
    setTz(chart.tz);
    const L = [label + ' — ' + fmtDate(chart.ms, chart.tz) + ' (UTC ' + new Date(chart.ms).toISOString() + '), lat ' + chart.lat.toFixed(2) + ', lon ' + chart.lon.toFixed(2)];
    L.push('sect: ' + (chart.isDay ? 'day' : 'night') + '; ASC ' + chart.asc.toFixed(2) + '° (' + fmtLon(chart.asc) + '); MC ' + chart.mc.toFixed(2) + '°; houses: ' + chart.houses.system + '; signs index 0=Aries');
    L.push('cusps: ' + chart.cusps.slice(1).map((c, i) => (i + 1) + ':' + c.toFixed(1)).join(', '));
    E.ALL.concat(['node']).forEach(k => {
      const pl = chart.planets[k];
      let s = k + ': ' + pl.lon.toFixed(2) + '° (' + fmtLon(pl.lon) + '), house ' + pl.house + (pl.retro ? ', retrograde' : '');
      if (pl.ess) s += ', essential ' + pl.ess.list.join('/') + ', Lilly total ' + pl.total + ' (ess ' + pl.ess.score + ', acc ' + pl.acc.score + ': ' + pl.acc.list.map(x => x[1] + (x[2] ? ':' + x[2] : '')).join(',') + ')';
      L.push(s);
    });
    L.push('aspects: ' + chart.aspects.map(a => a.a + ' ' + a.aspect.id + ' ' + a.b + ' (' + a.orb.toFixed(1) + '° ' + (a.applying ? 'applying' : 'separating') + ')').join('; '));
    L.push('lots: ' + Object.keys(chart.lots).map(k => k + ' ' + chart.lots[k].toFixed(1) + '° h' + E.houseOf(chart.lots[k], chart.houses)).join('; '));
    return L.join('\n');
  }

  G.Interpret = { fmtLon, fmtDate, fmtGreg, setTz, strength, natalReading, planetText, aspectText, chartDigest, pn, sn, topics, short, inSect, accLabel };
})(typeof window !== 'undefined' ? window : globalThis);
