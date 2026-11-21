/* اخترنامه — تفسیر زایچه بر پایهٔ قواعد کلاسیک */
(function (G) {
  'use strict';
  const KB = G.KB, E = G.AstroEngine;
  const FA = '۰۱۲۳۴۵۶۷۸۹';
  const fa = s => String(s).replace(/\d/g, d => FA[d]);
  const JMONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
  const WEEKDAYS = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
  const pad = n => (n < 10 ? '0' : '') + n;
  const P = k => KB.PLANETS[k];
  const S = i => KB.SIGNS[i];

  function fmtLon(lon) {
    let tot = Math.round(E.norm(lon) * 60) % 21600;
    const s = Math.floor(tot / 1800), deg = Math.floor((tot % 1800) / 60), min = tot % 60;
    return '\u2066' + fa(deg) + '°' + fa(pad(min)) + '′\u2069 ' + S(s).name;
  }
  function fmtDate(ms, tz, withTime) {
    const p = E.utcToLocalParts(ms, tz);
    const j = E.gregorianToJalali(p.y, p.m, p.d);
    let s = fa(j.jd) + ' ' + JMONTHS[j.jm - 1] + ' ' + fa(j.jy);
    if (withTime !== false) s += '، ساعت ' + fa(pad(p.h) + ':' + pad(p.mi));
    return s;
  }
  function fmtGreg(ms, tz) { const p = E.utcToLocalParts(ms, tz); return p.y + '-' + pad(p.m) + '-' + pad(p.d); }
  function strength(total) {
    if (total >= 12) return { word: 'بسیار نیرومند', tone: 'good' };
    if (total >= 4) return { word: 'نیرومند', tone: 'good' };
    if (total >= -3) return { word: 'میانه‌حال', tone: 'mixed' };
    if (total >= -10) return { word: 'ضعیف', tone: 'hard' };
    return { word: 'سخت آسیب‌دیده', tone: 'hard' };
  }
  const SHORT = {
    sun: 'اراده و جاه', moon: 'احساس و تن', mercury: 'اندیشه و سخن', venus: 'عشق و لذت', mars: 'شور و ستیز',
    jupiter: 'بخت و رشد', saturn: 'صبر و محدودیت', uranus: 'دگرگونی ناگهانی', neptune: 'خیال و ابهام', pluto: 'قدرت پنهان'
  };
  function inSect(k, chart) {
    const s = P(k).sect; if (s === 'either') return true;
    return chart.isDay ? s === 'day' : s === 'night';
  }
  function dignityLine(k, chart) {
    const pl = chart.planets[k];
    const names = pl.ess.list.map(x => KB.DIGNITY_NAMES[x]);
    return names.join('، ');
  }

  function planetText(k, chart, business) {
    const pl = chart.planets[k], p = P(k);
    const st = strength(pl.total);
    const hTopics = business ? KB.BUSINESS_HOUSES[pl.house] : KB.HOUSES[pl.house].topics;
    let t = p.name + ' در ' + fmtLon(pl.lon) + '، خانهٔ ' + fa(pl.house) + (pl.retro ? '، راجع' : '') + '. ';
    t += 'قوت ذاتی: ' + dignityLine(k, chart) + ' (' + fa(pl.ess.score) + ')، قوت عرضی ' + fa(pl.acc.score) + '؛ در مجموع ' + st.word + ' (امتیاز ' + fa(pl.total) + '). ';
    t += 'این سیاره «' + p.sig + '» را به حوزهٔ «' + hTopics + '» می‌آورد. ';
    if (st.tone === 'good') t += 'چون نیرومند است، چهرهٔ نیک آن آشکار می‌شود: ' + p.good + '.';
    else if (st.tone === 'hard') t += 'چون ضعیف است، این حوزه با دشواری همراه است: ' + p.bad + '.';
    else t += 'نیکی و دشواری آن آمیخته است و نتیجه به کوشش و زمان بستگی دارد.';
    if (k === 'saturn' || k === 'mars') {
      t += inSect(k, chart) ? ' در این زایچه ' + p.name + ' هم‌حیّز است، پس سختی‌هایش سازنده‌تر و قابل‌مهارتر است.' : ' در این زایچه ' + p.name + ' بیرون از حیّز است، پس آسیب آن تیزتر است و باید آگاهانه مهار شود.';
    }
    if (k === 'jupiter' || k === 'venus') {
      if (inSect(k, chart)) t += ' ' + p.name + ' هم‌حیّز است و نیکی‌اش کامل‌تر می‌رسد.';
    }
    if (KB.JOYS[k] === pl.house) t += ' ' + p.name + ' در «فرح» (شادی) خود است و در این خانه آسوده کار می‌کند.';
    return { text: t, tone: st.tone };
  }

  function aspectText(a) {
    const pa = P(a.a), pb = P(a.b), asp = a.aspect;
    const mal = ['mars', 'saturn'], ben = ['jupiter', 'venus'];
    const hasMal = mal.includes(a.a) || mal.includes(a.b), hasBen = ben.includes(a.a) || ben.includes(a.b);
    let t = pa.name + ' ' + asp.name + ' ' + pb.name + ' (فاصله از دقیق: ' + fa(a.orb.toFixed(1)) + '°، ' + (a.applying ? 'در حال اتصال' : 'در حال انصراف') + '). ';
    const x = '«' + SHORT[a.a] + '»', y = '«' + SHORT[a.b] + '»';
    let tone = 'mixed';
    if (asp.nature === 'easy') {
      t += x + ' و ' + y + ' یکدیگر را یاری می‌کنند'; tone = 'good';
      t += hasBen ? '؛ نشانهٔ نعمت و گشایش.' : hasMal ? '؛ سختی به تدبیر و صبر بدل می‌شود.' : '.';
    } else if (asp.nature === 'hard') {
      t += 'میان ' + x + ' و ' + y + ' کشاکش است'; tone = 'hard';
      t += hasMal ? '؛ آزمون و فشار، که با آگاهی می‌تواند به نیرو بدل شود.' : hasBen ? '؛ نعمتی که با زیاده‌روی یا ناهماهنگی به دست می‌آید.' : '.';
    } else {
      t += x + ' و ' + y + ' درهم می‌آمیزند';
      if (hasMal && hasBen) t += '؛ آمیزه‌ای از نیکی و سختی.';
      else if (hasMal) { t += '؛ نیرویی شدید که باید به کار درست گرفته شود.'; tone = 'hard'; }
      else if (hasBen) { t += '؛ نشانهٔ برکت.'; tone = 'good'; }
      else t += '.';
    }
    if (pa.modern || pb.modern) t += ' (این نظر از ستارهٔ نوپیدا است و در سنت کلاسیک جایی ندارد.)';
    return { text: t, tone };
  }

  const TOPIC_TITLES = [null, 'جان، منش و تن', 'مال و درآمد', 'خواهر و برادر، سفر کوتاه و آموزش', 'پدر، خانه و ملک',
    'فرزند، عشق و شادی', 'سلامت و کار روزانه', 'ازدواج و شریک', 'بحران‌ها، مال دیگران و میراث', 'سفر دور، دانش و باور',
    'پیشه، جاه و آوازه', 'دوستان و آرزوها', 'دشمنان پنهان و خلوت'];

  function houseJudgement(i, chart, business) {
    const cusp = chart.cusps[i], sign = E.signOf(cusp), lord = chart.houseRulers[i];
    const lp = chart.planets[lord];
    const st = strength(lp.total);
    const inside = E.CLASSIC.filter(k => chart.planets[k].house === i);
    let score = lp.total / 4;
    const bits = [];
    const topicI = business ? KB.BUSINESS_HOUSES[i] : KB.HOUSES[i].topics;
    bits.push('سرِ خانه در ' + S(sign).name + ' است و خداوند آن ' + P(lord).name + ' است که در خانهٔ ' + fa(lp.house) + ' نشسته و ' + st.word + ' است.');
    if (lp.house !== i) {
      const topicJ = business ? KB.BUSINESS_HOUSES[lp.house] : KB.HOUSES[lp.house].topics;
      bits.push('پس امور این خانه با «' + topicJ + '» گره می‌خورد و از آن راه رقم می‌خورد.');
    } else bits.push('خداوند در خانهٔ خود نشسته است؛ این حوزه به خود متکی و استوار است.');
    if ([6, 8, 12].includes(lp.house) && i !== lp.house) { score -= 1.5; bits.push('خداوند در خانه‌ای «ساقط» (۶، ۸ یا ۱۲) است و با طالع پیوند ضعیفی دارد؛ رسیدن به خواسته‌های این حوزه کوشش بیشتری می‌طلبد.'); }
    if ([1, 10, 7, 4].includes(lp.house)) { score += 1; bits.push('خداوند در وتد است؛ اثر این حوزه در زندگی پررنگ و آشکار است.'); }
    inside.forEach(k => {
      const kp = chart.planets[k];
      if (k === 'jupiter' || k === 'venus') { score += 2 + (kp.total > 0 ? 1 : 0); bits.push(P(k).name + ' (سعد) در این خانه است و آن را برکت می‌دهد' + (kp.total < -4 ? '، هرچند خودش ضعیف است' : '') + '.'); }
      else if (k === 'saturn' || k === 'mars') { const pen = inSect(k, chart) || kp.total > 3 ? 1 : 2.5; score -= pen; bits.push(P(k).name + ' (نحس) در این خانه است: ' + (pen < 2 ? 'سختی‌ای که با انضباط مهار می‌شود.' : 'تأخیر، تنش یا آسیب در این حوزه؛ هشیاری لازم است.')); }
      else bits.push(P(k).name + ' در این خانه است و «' + SHORT[k] + '» را بدان می‌افزاید.');
    });
    for (const lk in chart.lotHouses) if (lk === 'fortune' && chart.lotHouses[lk] === i) { score += 1; bits.push('سهم‌السعاده در این خانه افتاده؛ بخت آدمی با این حوزه گره خورده است.'); }
    const tone = score >= 2 ? 'good' : score <= -1.5 ? 'hard' : 'mixed';
    const verdict = tone === 'good' ? 'داوری: نیک و یاری‌رسان.' : tone === 'hard' ? 'داوری: دشوار؛ نیازمند صبر و تدبیر.' : 'داوری: آمیخته؛ بسته به کوشش و زمان.';
    return { i, title: business ? KB.BUSINESS_HOUSES[i] : TOPIC_TITLES[i], text: bits.join(' ') + ' ' + verdict, tone, score, topic: topicI };
  }

  function transitsNow(chart, nowMs) {
    const out = [];
    ['saturn', 'jupiter'].forEach(k => {
      const lon = E.lonAt(k, nowMs), h = E.houseOf(lon, chart.houses);
      let t = P(k).name + ' اکنون در ' + fmtLon(lon) + ' است و از خانهٔ ' + fa(h) + ' زایچهٔ شما می‌گذرد (' + KB.HOUSES[h].topics + '). ';
      t += k === 'saturn' ? 'این حوزه اکنون میدان آزمون، مسئولیت و ساختن آهسته است.' : 'این حوزه اکنون میدان گشایش، رشد و فرصت است.';
      const hits = [];
      [['sun', 'خورشید'], ['moon', 'ماه'], ['asc', 'طالع'], ['mc', 'میانهٔ آسمان']].forEach(([key, nm]) => {
        const target = key === 'asc' ? chart.asc : key === 'mc' ? chart.mc : chart.planets[key].lon;
        const d = E.sep(lon, target);
        KB.ASPECTS.forEach(a => { if (Math.abs(d - a.angle) <= 3) hits.push(a.name + ' با ' + nm + 'ِ اصلی'); });
      });
      if (hits.length) t += ' نظر فعال: ' + hits.join('، ') + '.';
      out.push({ text: t, tone: k === 'saturn' ? 'mixed' : 'good' });
    });
    return out;
  }

  function natalReading(chart, opts) {
    const business = opts.kind === 'business';
    const now = opts.nowMs || Date.now();
    const sections = [];
    const Pp = chart.planets;
    const ascS = E.signOf(chart.asc);
    const ar = chart.ascRuler, arP = Pp[ar];
    const temp = E.temperament(chart);
    const lord = chart.strongest[0];

    // خلاصه
    const sum = [];
    sum.push({ text: 'زایچه ' + (chart.isDay ? 'روزی' : 'شبی') + ' است (خورشید ' + (chart.isDay ? 'بالای' : 'زیر') + ' افق). ' + (chart.isDay ? 'خورشید، مشتری و زحل اختران هم‌حیّزند و زحل کمتر زیان می‌رساند.' : 'ماه، زهره و مریخ اختران هم‌حیّزند و مریخ کمتر زیان می‌رساند.') });
    sum.push({ text: 'طالع ' + fmtLon(chart.asc) + ' (' + S(ascS).alt + '، برج ' + KB.ELEMENTS[S(ascS).el].name + 'ی و ' + KB.MODES[S(ascS).mod] + '). ' + (business ? 'هویت این کسب‌وکار ' : '') + S(ascS).asc });
    sum.push({ text: 'خداوند طالع ' + P(ar).name + ' است، در خانهٔ ' + fa(arP.house) + ' و ' + strength(arP.total).word + '؛ ' + (business ? 'سرنوشت شرکت' : 'جان و مسیر زندگی') + ' به «' + (business ? KB.BUSINESS_HOUSES[arP.house] : KB.HOUSES[arP.house].topics) + '» گرایش دارد.', tone: strength(arP.total).tone });
    if (!business) {
      sum.push({ text: 'مزاج غالب: ' + KB.TEMPERAMENTS[temp.key].name + ' با رگه‌ای از ' + KB.TEMPERAMENTS[temp.second].name.split(' ')[0] + '. ' + KB.TEMPERAMENTS[temp.key].text });
      sum.push({ text: 'خورشید در ' + S(Pp.sun.sign).name + ': ' + S(Pp.sun.sign).sun });
      const ph = chart.moonPhase;
      const phName = ph < 45 ? 'نو' : ph < 135 ? 'فزاینده (تربیع نخست)' : ph < 180 ? 'نزدیک بدر' : ph < 225 ? 'بدر' : ph < 315 ? 'کاهنده' : 'پیش از محاق';
      sum.push({ text: 'ماه در ' + S(Pp.moon.sign).name + ' (ماه ' + phName + '): ' + S(Pp.moon.sign).moon });
    }
    sum.push({ text: 'نیرومندترین اختر (کدخدای زایچه به روش امتیاز لیلی): ' + P(lord).name + ' با امتیاز ' + fa(Pp[lord].total) + '. «' + P(lord).good + '» بزرگ‌ترین سرمایهٔ ' + (business ? 'این کسب‌وکار' : 'صاحب زایچه') + ' است. ضعیف‌ترین: ' + P(chart.strongest[6]).name + '؛ مراقب «' + P(chart.strongest[6]).bad + '» باشید.', tone: 'good' });
    // توازن عناصر
    const elc = { fire: 0, earth: 0, air: 0, water: 0 };
    E.CLASSIC.forEach(k => { elc[KB.SIGNS[Pp[k].sign].el] += (k === 'sun' || k === 'moon') ? 2 : 1; });
    elc[S(ascS).el] += 2;
    const elSorted = Object.keys(elc).sort((a, b) => elc[b] - elc[a]);
    sum.push({ text: 'توازن عناصر: ' + elSorted.map(e => KB.ELEMENTS[e].name + ' ' + fa(elc[e])).join('، ') + '. عنصر چیره ' + KB.ELEMENTS[elSorted[0]].name + ' و عنصر کم‌رنگ ' + KB.ELEMENTS[elSorted[3]].name + ' است.' });
    sections.push({ id: 'summary', title: 'خلاصهٔ حکم', items: sum });

    // احکام خانه‌ها
    const order = business ? [1, 2, 10, 7, 6, 11, 8, 3, 9, 4, 5, 12] : [1, 2, 10, 7, 5, 6, 3, 4, 9, 11, 8, 12];
    sections.push({ id: 'houses', title: business ? 'احکام حوزه‌های کسب‌وکار' : 'احکام دوازده خانه', items: order.map(i => houseJudgement(i, chart, business)).map(h => ({ title: 'خانهٔ ' + fa(h.i) + ' — ' + h.title, text: h.text, tone: h.tone })) });

    // سیارات
    sections.push({ id: 'planets', title: 'هفت اختر', items: E.CLASSIC.map(k => Object.assign({ title: P(k).name + ' ' + P(k).glyph }, planetText(k, chart, business))) });

    // نظرات
    const asps = chart.aspects.filter(a => !(P(a.a).modern && P(a.b).modern)).sort((x, y) => x.orb - y.orb);
    sections.push({ id: 'aspects', title: 'نظرات', items: asps.map(a => Object.assign({ title: P(a.a).name + ' ' + a.aspect.glyph + ' ' + P(a.b).name }, aspectText(a))) });

    // سهام
    sections.push({
      id: 'lots', title: 'سهام (بیرونی)', items: Object.keys(chart.lots).filter(k => !business || k === 'fortune' || k === 'spirit').map(k => {
        const lon = chart.lots[k], h = chart.lotHouses[k], lr = E.ruler(E.signOf(lon));
        return { title: KB.LOTS[k].name, text: KB.LOTS[k].text + ': در ' + fmtLon(lon) + '، خانهٔ ' + fa(h) + ' (' + (business ? KB.BUSINESS_HOUSES[h] : KB.HOUSES[h].topics) + '). خداوند آن ' + P(lr).name + ' و ' + strength(Pp[lr].total).word + ' است.', tone: strength(Pp[lr].total).tone };
      })
    });

    // دوره‌ها
    const tl = [];
    if (!business) {
      const fd = E.firdaria(chart.ms, chart.isDay, now);
      if (fd.current) {
        tl.push({ title: 'فردار کنونی', text: 'از ' + fmtDate(fd.current.start, chart.tz, false) + ' تا ' + fmtDate(fd.current.end, chart.tz, false) + ' — ' + KB.FIRDAR_TEXT[fd.current.lord] + (fd.sub ? ' زیردوره: ' + P(fd.sub.lord).name + ' (تا ' + fmtDate(fd.sub.end, chart.tz, false) + ')؛ رنگ ' + SHORT[fd.sub.lord] + ' بر این دوره افزوده می‌شود.' : ''), tone: (['jupiter', 'venus', 'sun', 'node'].includes(fd.current.lord) ? 'good' : ['saturn', 'mars', 'snode'].includes(fd.current.lord) ? 'mixed' : 'mixed') });
        if (fd.current.lord in Pp && Pp[fd.current.lord].total !== undefined) {
          tl.push({ title: 'حال خداوند فردار در زایچه', text: P(fd.current.lord).name + ' در زایچهٔ اصلی ' + strength(Pp[fd.current.lord].total).word + ' است و در خانهٔ ' + fa(Pp[fd.current.lord].house) + ' نشسته؛ پس این دوره بیشتر «' + KB.HOUSES[Pp[fd.current.lord].house].topics + '» را برجسته می‌کند.', tone: strength(Pp[fd.current.lord].total).tone });
        }
      }
    }
    const pr = E.profection(chart.ms, now, ascS, chart.tz);
    tl.push({ title: 'سال‌خدای انتها (سال ' + fa(pr.age + 1) + 'ام ' + (business ? 'فعالیت' : 'زندگی') + ')', text: 'طالع منتهی به ' + S(pr.sign).name + ' رسیده (خانهٔ ' + fa(pr.house) + '): امسال «' + (business ? KB.BUSINESS_HOUSES[pr.house] : KB.HOUSES[pr.house].topics) + '» در کانون است. سال‌خدا ' + P(pr.lord).name + ' است که در زایچه ' + strength(Pp[pr.lord].total).word + ' است؛ گذر و نظرهای او امسال وزن بیشتری دارند.', tone: strength(Pp[pr.lord].total).tone });
    transitsNow(chart, now).forEach((x, i) => tl.push(Object.assign({ title: i === 0 ? 'گذر زحل' : 'گذر مشتری' }, x)));
    sections.push({ id: 'time', title: 'دوره‌های زمانی و اکنون', items: tl });
    return { sections, temperament: temp, profection: pr };
  }

  // خلاصهٔ متنی زایچه برای فرستادن به هوش مصنوعی
  function chartDigest(chart, label) {
    const lines = [label + ' — ' + fmtDate(chart.ms, chart.tz) + ' (UTC ' + new Date(chart.ms).toISOString() + ')، عرض ' + chart.lat.toFixed(2) + '، طول ' + chart.lon.toFixed(2)];
    lines.push('حیّز: ' + (chart.isDay ? 'روزی' : 'شبی') + '؛ طالع ' + fmtLon(chart.asc) + '؛ میانهٔ آسمان ' + fmtLon(chart.mc) + '؛ سیستم خانه‌ها: ' + chart.houses.system);
    lines.push('سرِ خانه‌ها: ' + chart.cusps.slice(1).map((c, i) => fa(i + 1) + ':' + fmtLon(c)).join('، '));
    E.ALL.concat(['node']).forEach(k => {
      const pl = chart.planets[k];
      let s = P(k).name + ': ' + fmtLon(pl.lon) + '، خانهٔ ' + fa(pl.house) + (pl.retro ? '، راجع' : '');
      if (pl.ess) s += '، دلایل ذاتی: ' + pl.ess.list.map(x => KB.DIGNITY_NAMES[x]).join('/') + '، امتیاز کل لیلی ' + pl.total;
      lines.push(s);
    });
    lines.push('نظرات: ' + chart.aspects.map(a => P(a.a).name + ' ' + a.aspect.name + ' ' + P(a.b).name + ' (' + a.orb.toFixed(1) + '° ' + (a.applying ? 'اتصال' : 'انصراف') + ')').join('؛ '));
    lines.push('سهام: ' + Object.keys(chart.lots).map(k => KB.LOTS[k].name + ' ' + fmtLon(chart.lots[k]) + ' خانهٔ ' + chart.lotHouses[k]).join('؛ '));
    return lines.join('\n');
  }

  G.Interpret = { fa, fmtLon, fmtDate, fmtGreg, strength, natalReading, planetText, aspectText, chartDigest, JMONTHS, WEEKDAYS, SHORT, inSect };
})(typeof window !== 'undefined' ? window : globalThis);
