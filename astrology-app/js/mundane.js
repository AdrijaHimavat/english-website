/* اخترنامه — احکام عالم (تحویل سال، کسوف و خسوف، قرانات) */
(function (G) {
  'use strict';
  const KB = G.KB, E = G.AstroEngine, I = G.Interpret, A = G.Astronomy;
  const fa = I.fa, P = k => KB.PLANETS[k], DAY = E.DAY;

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
    for (let t = startMs + DAY; t <= endMs; t += DAY) {
      const s = Math.sign(E.speedAt(key, t));
      if (s !== s0) { out.push({ ms: t, kind: s < 0 ? 'retro' : 'direct', lon: E.lonAt(key, t) }); s0 = s; }
    }
    return out;
  }
  function ingresses(key, startMs, endMs) {
    const out = [];
    let s0 = E.signOf(E.lonAt(key, startMs));
    const step = key === 'mars' ? 1 : 2;
    for (let t = startMs + step * DAY; t <= endMs; t += step * DAY) {
      const s = E.signOf(E.lonAt(key, t));
      if (s !== s0) { out.push({ ms: t, sign: s, from: s0 }); s0 = s; }
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
  const KIND_FA = { penumbral: 'نیم‌سایه‌ای', partial: 'جزئی', total: 'کلی', annular: 'حلقوی', hybrid: 'دورگه' };

  function analyzeYear(year, lat, lon, tz, houseSystem) {
    const ms = equinox(year, 'mar') + 60000; // یک دقیقه پس از اعتدال تا خورشید آشکارا در حمل باشد
    const nextMs = equinox(year + 1, 'mar');
    const chart = E.castChart({ ms, lat, lon, tz, houseSystem: houseSystem || 'placidus' });
    const Pp = chart.planets;
    const ascS = E.signOf(chart.asc);
    const items = [];
    const sections = [];

    // سالار سال
    const ar = chart.ascRuler, alm = chart.almutenAsc;
    const cand = [ar, alm].filter((v, i, a) => a.indexOf(v) === i);
    const angular = k => [1, 4, 7, 10].includes(Pp[k].house);
    let lord = cand.slice().sort((a, b) => (Pp[b].total + (angular(b) ? 4 : 0)) - (Pp[a].total + (angular(a) ? 4 : 0)))[0];
    const lp = Pp[lord];
    items.push({ title: 'لحظهٔ تحویل سال', text: 'خورشید در ' + I.fmtDate(ms - 60000, tz) + ' به نقطهٔ اعتدال بهاری (آغاز حمل) می‌رسد. طالع تحویل در این شهر ' + I.fmtLon(chart.asc) + ' است.' });
    items.push({ title: 'سالار سال', text: P(lord).name + ' سالار سال است (' + (lord === ar ? 'خداوند طالع تحویل' : 'مستولی بر درجهٔ طالع') + '). در خانهٔ ' + fa(lp.house) + ' (' + KB.HOUSES[lp.house].mundane + ') و ' + I.strength(lp.total).word + '. ' + (I.strength(lp.total).tone === 'good' ? 'سالی است که «' + P(lord).good + '» در جامعه نمود بیشتری دارد.' : I.strength(lp.total).tone === 'hard' ? 'سالار سال ضعیف است: «' + P(lord).bad + '» و ناتوانی در اداره و سامان‌دهی.' : 'نیک و بد سال آمیخته است.'), tone: I.strength(lp.total).tone });
    const mod = KB.SIGNS[ascS].mod;
    if (mod === 'movable') {
      const qs = [['jun', 'تابستان (تحویل سرطان)'], ['sep', 'پاییز (تحویل میزان)'], ['dec', 'زمستان (تحویل جدی)']].map(([w, nm]) => {
        const qm = equinox(year, w) + 60000, qc = E.castChart({ ms: qm, lat, lon, tz, houseSystem });
        return nm + ': ' + I.fmtDate(qm, tz) + '، طالع ' + KB.SIGNS[E.signOf(qc.asc)].name + ' و خداوند آن ' + P(qc.ascRuler).name + ' (' + I.strength(qc.planets[qc.ascRuler].total).word + ')';
      });
      items.push({ title: 'فصل‌ها', text: 'طالع تحویل منقلب است؛ به قاعدهٔ ابومعشر این زایچه فقط بر سه ماه نخست حکم می‌راند و هر فصل زایچهٔ خود را دارد. ' + qs.join('. ') + '.' });
    } else if (mod === 'common') {
      const qm = equinox(year, 'sep') + 60000, qc = E.castChart({ ms: qm, lat, lon, tz, houseSystem });
      items.push({ title: 'نیمهٔ دوم سال', text: 'طالع ذوجسدین است؛ این زایچه بر شش ماه نخست حکم می‌راند و تحویل میزان (' + I.fmtDate(qm, tz) + ') با طالع ' + KB.SIGNS[E.signOf(qc.asc)].name + ' نیمهٔ دوم را رقم می‌زند.' });
    } else items.push({ title: 'دوام حکم', text: 'طالع ثابت است؛ به قاعدهٔ ابومعشر این زایچه بر سراسر سال حکم می‌راند.' });

    // ماه: حال عامهٔ مردم
    const mn = E.moonNextAspects(chart, false)[0];
    items.push({ title: 'ماه، نمایندهٔ مردم', text: 'ماه در ' + I.fmtLon(Pp.moon.lon) + '، خانهٔ ' + fa(Pp.moon.house) + ' و ' + I.strength(Pp.moon.total).word + ' است.' + (mn ? ' نخستین اتصال آن ' + mn.aspect.name + ' با ' + P(mn.planet).name + ' است: ' + (['jupiter', 'venus'].includes(mn.planet) && mn.aspect.nature !== 'hard' ? 'مردم سال را با گشایش و امید تجربه می‌کنند.' : ['mars', 'saturn'].includes(mn.planet) && mn.aspect.nature !== 'easy' ? 'رنج و فشار بر مردم، به‌ویژه از سوی «' + P(mn.planet).mundane + '».' : 'حال مردم میانه است.') : ''), tone: I.strength(Pp.moon.total).tone });
    sections.push({ id: 'year', title: 'تحویل سال ' + fa(year) + ' میلادی (نوروز ' + fa(year - 621) + ')', items });

    // خانه‌های عالم
    const hs = [];
    [1, 10, 7, 4, 2, 6, 8, 9, 11, 12, 3, 5].forEach(h => {
      const inside = E.CLASSIC.filter(k => Pp[k].house === h);
      const lr = chart.houseRulers[h];
      let txt = KB.HOUSES[h].mundane + ' — خداوند: ' + P(lr).name + ' (' + I.strength(Pp[lr].total).word + ').';
      let sc = Pp[lr].total / 4;
      inside.forEach(k => {
        if (['jupiter', 'venus'].includes(k)) { sc += 2; txt += ' ' + P(k).name + ' اینجاست: گشایش و فراوانی.'; }
        else if (['mars', 'saturn'].includes(k)) { sc -= 2; txt += ' ' + P(k).name + ' اینجاست: ' + (k === 'mars' ? 'تنش، درگیری یا آتش.' : 'کندی، کمبود یا فشار دیرپا.'); }
        else txt += ' ' + P(k).name + ' اینجاست.';
      });
      if (inside.length || Math.abs(sc) >= 2) hs.push({ title: 'خانهٔ ' + fa(h), text: txt, tone: sc >= 1.5 ? 'good' : sc <= -1.5 ? 'hard' : 'mixed' });
    });
    sections.push({ id: 'mhouses', title: 'خانه‌های برجستهٔ تحویل', items: hs });

    // کسوف و خسوف
    const ecl = eclipses(ms, nextMs).map(e => {
      const s = E.signOf(e.lon), elx = KB.SIGNS[s].el;
      return { title: (e.type === 'solar' ? 'کسوف (خورشیدگرفتگی) ' : 'خسوف (ماه‌گرفتگی) ') + KIND_FA[e.kind], text: I.fmtDate(e.ms, tz) + ' در ' + I.fmtLon(e.lon) + '. گرفتگی ' + ECL(elx) + (e.type === 'solar' && e.lat !== undefined ? ' بیشینه در عرض ' + fa(e.lat.toFixed(0)) + '° و طول ' + fa(e.lng.toFixed(0)) + '°.' : ''), tone: 'mixed' };
    });
    function ECL(x) { return KB.ECLIPSE_SIGN[x]; }
    sections.push({ id: 'ecl', title: 'گرفتگی‌های سال (بطلمیوس، کتاب دوم)', items: ecl.length ? ecl : [{ text: 'در این سال گرفتگی ثبت نشد.' }] });

    // قرانات
    const gc = findConjunctions('jupiter', 'saturn', Date.UTC(year - 45, 0, 1), Date.UTC(year + 25, 0, 1), 8);
    const before = gc.filter(c => c.ms <= ms), after = gc.filter(c => c.ms > ms);
    const qi = [];
    const last = before[before.length - 1];
    if (last) {
      const elx = KB.SIGNS[E.signOf(last.lon)].el;
      qi.push({ title: 'آخرین قران اعظم (زحل و مشتری)', text: I.fmtDate(last.ms, tz, false) + ' در ' + I.fmtLon(last.lon) + '. ' + KB.GREAT_CONJ[elx] + ' به گفتهٔ ابومعشر قران زحل و مشتری هر بیست سال یک‌بار رخ می‌دهد و سرشت دوره را تا قران بعدی رقم می‌زند.' });
    }
    if (after[0]) qi.push({ title: 'قران بعدی', text: I.fmtDate(after[0].ms, tz, false) + ' در ' + I.fmtLon(after[0].lon) + ' (مثلثهٔ ' + KB.ELEMENTS[KB.SIGNS[E.signOf(after[0].lon)].el].name + 'ی).' });
    const chain = [];
    before.concat(after).forEach(c => {
      const prev = chain[chain.length - 1];
      if (prev && c.ms - prev.ms < 400 * DAY) { prev.triple = true; return; }
      chain.push(Object.assign({}, c));
    });
    const ci = chain.findIndex(c => c.ms > ms);
    const view = chain.slice(Math.max(0, (ci < 0 ? chain.length : ci) - 4), (ci < 0 ? chain.length : ci) + 2);
    qi.push({ title: 'زنجیرهٔ قرانات اخیر', text: view.map(c => fa(I.fmtGreg(c.ms, tz).slice(0, 4)) + ' ' + KB.SIGNS[E.signOf(c.lon)].name + (c.triple ? ' (سه‌گانه)' : '')).join(' ← ') + '. هر حدود ۲۰۰ سال قران‌ها به مثلثهٔ تازه‌ای می‌روند («تحویل مثلثه») که ابومعشر آن را نشان دگرگونی بزرگ دولت‌ها و آیین‌ها می‌داند.' });
    const ms2 = findConjunctions('mars', 'saturn', ms, nextMs, 2);
    ms2.forEach(c => qi.push({ title: 'قران مریخ و زحل', text: I.fmtDate(c.ms, tz, false) + ' در ' + I.fmtLon(c.lon) + '. در سنت ابومعشر این قران (به‌ویژه در سرطان) نشانهٔ تنش، فتنه و سختی است؛ حوزهٔ آن را برج ' + KB.SIGNS[E.signOf(c.lon)].name + ' (عنصر ' + KB.ELEMENTS[KB.SIGNS[E.signOf(c.lon)].el].name + ') نشان می‌دهد.', tone: 'hard' }));
    const mj = findConjunctions('mars', 'jupiter', ms, nextMs, 2);
    mj.forEach(c => qi.push({ title: 'قران مریخ و مشتری', text: I.fmtDate(c.ms, tz, false) + ' در ' + I.fmtLon(c.lon) + ': جنبش در قانون، دین و دولت؛ شتاب در تصمیم‌های بزرگ.', tone: 'mixed' }));
    sections.push({ id: 'conj', title: 'قرانات (کتاب القرانات ابومعشر)', items: qi });

    // بازگشت‌ها و تغییر برج‌ها
    const rv = [];
    ['mercury', 'venus', 'mars', 'jupiter', 'saturn'].forEach(k => {
      const st = stations(k, ms, nextMs);
      st.forEach(s => rv.push({ ms: s.ms, title: P(k).name + (s.kind === 'retro' ? ' راجع می‌شود' : ' مستقیم می‌شود'), text: I.fmtDate(s.ms, tz, false) + ' در ' + I.fmtLon(s.lon) + (s.kind === 'retro' && k === 'mercury' ? '. دورهٔ بازگشت عطارد: برای قرارداد، خرید ابزار و رونمایی محتاط باشید.' : s.kind === 'retro' && k === 'venus' ? '. بازگشت زهره: بازنگری در رابطه‌ها و ارزش‌ها.' : s.kind === 'retro' && k === 'mars' ? '. بازگشت مریخ: درگیری‌های کهنه دوباره سر برمی‌آورند.' : '.'), tone: s.kind === 'retro' ? 'mixed' : 'good' }));
    });
    ['jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].forEach(k => {
      ingresses(k, ms, nextMs).forEach(g => rv.push({ ms: g.ms, title: P(k).name + ' به ' + KB.SIGNS[g.sign].name + ' می‌رود', text: I.fmtDate(g.ms, tz, false) + '. ' + (P(k).modern ? '(نشانهٔ مدرن) ' : '') + (k === 'jupiter' ? 'گشایش و رونق در حوزهٔ برج ' + KB.SIGNS[g.sign].name + ' (' + KB.ELEMENTS[KB.SIGNS[g.sign].el].name + ').' : k === 'saturn' ? 'سخت‌گیری و بازسازی در حوزهٔ برج ' + KB.SIGNS[g.sign].name + '.' : P(k).sig + '.'), tone: 'mixed' }));
    });
    rv.sort((a, b) => a.ms - b.ms);
    sections.push({ id: 'motion', title: 'گاه‌شمار حرکت سیارات در این سال', items: rv });
    return { chart, sections, ms: ms - 60000, lord };
  }

  G.Mundane = { analyzeYear, equinox, findConjunctions, eclipses, stations, ingresses };
})(typeof window !== 'undefined' ? window : globalThis);
