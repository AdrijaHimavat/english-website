/* اخترنامه — پرسش ساعتی (مسائل) و اختیارات
 * قواعد: سهل بن بشر، ماشاءالله، بوناتی، لیلی.
 */
(function (G) {
  'use strict';
  const KB = G.KB, E = G.AstroEngine, I = G.Interpret;
  const fa = I.fa, P = k => KB.PLANETS[k], DAY = E.DAY;

  function classify(text) {
    const t = (text || '').replace(/‌/g, '').toLowerCase();
    let best = null, bestN = 0;
    KB.QUESTION_TYPES.forEach(q => {
      let n = 0; q.kw.forEach(k => { if (t.includes(k.replace(/‌/g, '').toLowerCase())) n += k.length > 3 ? 2 : 1; });
      if (n > bestN) { bestN = n; best = q; }
    });
    return best;
  }

  function aspectName(angle) { return KB.ASPECTS.find(a => a.angle === angle); }
  const fast = (a, b, ms) => Math.abs(E.speedAt(a, ms)) >= Math.abs(E.speedAt(b, ms)) ? a : b;

  function timingText(chart, key, degrees) {
    const pl = chart.planets[key];
    const mod = KB.SIGNS[pl.sign].mod;
    const kind = KB.HOUSES[pl.house].kind;
    const q = (mod === 'movable' ? 0 : mod === 'common' ? 1 : 2) + (kind === 'angle' ? 0 : kind === 'succedent' ? 1 : 2);
    const unit = q <= 1 ? 'روز' : q === 2 ? 'هفته' : q === 3 ? 'ماه' : 'سال';
    const n = Math.max(1, Math.round(degrees));
    return { unit, n, text: 'به حساب نمادین لیلی (' + fa(n) + ' درجه تا کمال؛ برج ' + KB.MODES[mod] + ' در خانهٔ ' + (kind === 'angle' ? 'وتد' : kind === 'succedent' ? 'مایل' : 'ساقط') + '): حدود ' + fa(n) + ' ' + unit + '.' };
  }

  function judge(chart, typeId, extra) {
    const qt = KB.QUESTION_TYPES.find(q => q.id === typeId) || KB.QUESTION_TYPES.find(q => q.id === 'friends');
    const ms = chart.ms, Pp = chart.planets;
    const A = chart.ascRuler, B = chart.houseRulers[qt.house];
    const cons = [], test = [];
    let score = 0;
    const add = (w, text) => { score += w; test.push({ w, text, tone: w > 0 ? 'good' : w < 0 ? 'hard' : 'mixed' }); };

    // ملاحظات پیش از داوری
    const ascDeg = chart.asc - E.signOf(chart.asc) * 30;
    if (ascDeg < 3) cons.push('طالع در درجه‌های نخست برج است (' + fa(ascDeg.toFixed(1)) + '°): هنوز زود است و کار پخته نشده؛ پرسش ممکن است زودهنگام باشد.');
    if (ascDeg > 27) cons.push('طالع در درجه‌های پایانی برج است (' + fa(ascDeg.toFixed(1)) + '°): کار از دست رفته یا پرسنده پیش‌تر تصمیم گرفته است.');
    const voc = E.moonVoid(chart);
    if (voc) { cons.push('ماه خالی‌السیر است (پیش از ترک برج به هیچ اختری نظر نمی‌کند). به گفتهٔ لیلی «کار به جایی نمی‌رسد» مگر دلایل دیگر بسیار نیرومند باشند.'); score -= 1.5; }
    if (Pp.moon.lon >= 195 && Pp.moon.lon <= 225) cons.push('ماه در «راه سوخته» (۱۵ میزان تا ۱۵ عقرب) است: کار پر از آشفتگی و ناپایداری است.');
    if (Pp.saturn.house === 1) cons.push('زحل در طالع است: پرسنده نگران یا ناامید است و کار با درنگ پیش می‌رود.');
    if (Pp.saturn.house === 7) cons.push('زحل در خانهٔ هفتم است: داوری منجّم ممکن است خطا کند (هشدار سنتی)؛ با احتیاط بنگرید.');

    const sig = 'دلیل پرسنده: ' + P(A).name + ' (خداوند طالع) و ماه. دلیل مطلوب: ' + P(B).name + ' (خداوند خانهٔ ' + fa(qt.house) + '، ' + KB.HOUSES[qt.house].topics + ').';
    let perf = null, timing = null;

    if (A === B) {
      add(2, 'یک اختر (' + P(A).name + ') خداوند هر دو خانه است: کار در دست خود پرسنده است و پیوندش با مطلوب آماده است.');
    } else {
      perf = E.nextPerfection(A, B, ms, 365);
      if (perf) {
        const asp = aspectName(perf.angle);
        const scA = E.signChangeMs(A, ms, 400), scB = E.signChangeMs(B, ms, 400);
        const inSign = perf.ms < Math.min(scA, scB);
        const refr = E.stationBetween(A, ms, perf.ms) || E.stationBetween(B, ms, perf.ms);
        const days = (perf.ms - ms) / DAY;
        let desc = P(A).name + ' و ' + P(B).name + ' به ' + asp.name + ' می‌رسند (کمال نظر) در ' + I.fmtDate(perf.ms, chart.tz) + ' (حدود ' + fa(Math.round(days)) + ' روز دیگر).';
        if (refr) {
          add(-2, desc + ' اما یکی از دو دلیل پیش از کمال می‌ایستد و بازمی‌گردد (رجوع): «تردید و بازگشت»؛ کار نیمه‌کاره می‌ماند یا یکی از دو طرف پشیمان می‌شود.');
        } else {
          let w = perf.angle === 0 ? 3 : perf.angle === 120 || perf.angle === 60 ? 3 : perf.angle === 90 ? 2 : 1;
          let note = perf.angle === 90 ? ' کار انجام می‌شود ولی با رنج و دشواری.' : perf.angle === 180 ? ' کار شاید انجام شود اما با کشمکش و پشیمانی (به قول لیلی: با بیزاری).' : perf.angle === 0 ? ' اتصال جسمانی: نیرومندترین گواه انجام کار.' : ' آسان و با رضایت.';
          if (!inSign) { w -= 1; note += ' کمال پس از تغییر برج یکی از دلایل رخ می‌دهد: کار با تغییری در شرایط یا شیوه انجام می‌شود.'; }
          if (days > 180) { w -= 1; note += ' زمان کمال دور است.'; }
          add(w, desc + note);
          // منع (حائل‌شدن اختری دیگر به مقارنه)
          E.CLASSIC.forEach(C => {
            if (C === A || C === B || C === 'moon') return;
            [A, B].forEach(X => {
              const p2 = E.nextPerfection(C, X, ms, days, [0]);
              if (p2 && p2.ms < perf.ms) add(-1, 'منع: ' + P(C).name + ' پیش از کمال، با ' + P(X).name + ' مقارنه می‌کند و میان کار حائل می‌شود' + (['mars', 'saturn'].includes(C) ? ' (نحس است؛ مانعی جدی).' : '؛ شخص یا عامل سومی در کار دخالت می‌کند.'));
            });
          });
          const f = fast(A, B, ms);
          const degs = Math.abs(E.speedAt(f, ms)) * days;
          timing = timingText(chart, f, Math.min(degs, 30));
          timing.date = perf.ms;
        }
      } else {
        add(-2, 'میان ' + P(A).name + ' و ' + P(B).name + ' تا یک سال آینده هیچ نظر کاملی شکل نمی‌گیرد.');
      }

      // نقل نور
      E.CLASSIC.forEach(X => {
        if (X === A || X === B) return;
        const sx = Math.abs(E.speedAt(X, ms));
        if (sx <= Math.abs(E.speedAt(A, ms)) || sx <= Math.abs(E.speedAt(B, ms))) return;
        const horizon = X === 'moon' ? 3 : 20;
        [[A, B], [B, A]].forEach(([from, to]) => {
          const last = E.lastPerfection(X, from, ms, horizon);
          const next = E.nextPerfection(X, to, ms, horizon * 1.5);
          if (last && next && next.ms < E.signChangeMs(X, ms, 60)) {
            add(2, 'نقل نور: ' + P(X).name + ' از ' + P(from).name + ' جدا شده و به ' + P(to).name + ' می‌پیوندد؛ واسطه‌ای (کسی که با ' + (X === 'moon' ? 'ماه' : P(X).name) + ' نموده می‌شود) کار را به سرانجام می‌رساند.');
          }
        });
      });
      // جمع نور
      E.CLASSIC.forEach(C => {
        if (C === A || C === B) return;
        const sc = Math.abs(E.speedAt(C, ms));
        if (sc >= Math.abs(E.speedAt(A, ms)) || sc >= Math.abs(E.speedAt(B, ms))) return;
        const pA = E.nextPerfection(A, C, ms, 120), pB = E.nextPerfection(B, C, ms, 120);
        if (pA && pB && pA.ms < E.signChangeMs(A, ms, 200) && pB.ms < E.signChangeMs(B, ms, 200)) {
          add(1.5, 'جمع نور: هر دو دلیل به ' + P(C).name + ' (اختری سنگین‌تر) می‌پیوندند؛ شخصی بزرگ‌تر یا نهادی سوم دو طرف را به هم می‌رساند.');
        }
      });
      // قبول (پذیرش)
      const sA = Pp[A].sign, sB = Pp[B].sign;
      const domOrEx = (planet, sign) => E.ruler(sign) === planet || E.exaltRuler(sign) === planet;
      if (domOrEx(B, sA) && domOrEx(A, sB)) add(2, 'قبول متقابل (تبادل): ' + P(A).name + ' و ' + P(B).name + ' هر یک در جایگاه قوت دیگری‌اند؛ دو طرف همدیگر را می‌خواهند و کار حتی بی‌نظر هم می‌تواند سامان یابد.');
      else {
        if (domOrEx(B, sA)) add(1, 'دلیل مطلوب (' + P(B).name + ') پرسنده را «قبول» می‌کند: طرف مقابل/مطلوب به پرسنده روی خوش نشان می‌دهد.');
        if (domOrEx(A, sB)) add(0.5, 'پرسنده دلیل مطلوب را قبول می‌کند: پرسنده بر کار تسلط و میل دارد.');
      }
      if (Pp[B].house === 1) add(1, P(B).name + ' (دلیل مطلوب) در طالع است: مطلوب خودش به سوی پرسنده می‌آید.');
      if (Pp[A].house === qt.house) add(0.5, P(A).name + ' (دلیل پرسنده) در خانهٔ مطلوب است: پرسنده سخت در پی آن است.');
    }

    // ماه همکار دلیل پرسنده
    const mNext = E.moonNextAspects(chart, true)[0];
    if (mNext) {
      const asp = mNext.aspect;
      let w = 0, extraT = '';
      if (mNext.planet === B) { w = asp.nature === 'hard' ? 0.5 : 1.5; extraT = ' ماه به دلیل مطلوب می‌پیوندد: گواهی بر انجام کار.'; }
      else if (['jupiter', 'venus'].includes(mNext.planet) && asp.nature !== 'hard') { w = 1; extraT = ' پیوستن ماه به سعد: پایان خوش.'; }
      else if (['mars', 'saturn'].includes(mNext.planet) && asp.nature !== 'easy') { w = -1; extraT = ' پیوستن ماه به نحس با نظر دشمنی: مانع یا ناکامی در پایان راه.'; }
      add(w, 'اتصال بعدی ماه: ' + asp.name + ' با ' + P(mNext.planet).name + ' (حدود ' + fa(Math.max(1, Math.round(mNext.days * 24))) + ' ساعت دیگر).' + extraT);
    }
    // حال دلیل مطلوب
    const bp = Pp[B];
    if (bp.total <= -8) add(-1, P(B).name + ' (خود مطلوب) سخت ضعیف است (امتیاز ' + fa(bp.total) + '): مطلوب کم‌ارزش‌تر از انتظار یا آسیب‌دیده است.');
    else if (bp.total >= 8) add(0.5, P(B).name + ' (خود مطلوب) نیرومند است: چیزی که می‌خواهید ارزشمند و پایدار است.');
    if (bp.acc.list.some(x => x[1] === 'محترق')) add(-1, P(B).name + ' محترق است (زیر تابش خورشید): کار پنهان، ناتوان یا در ترس است.');
    if (Pp[A].acc.list.some(x => x[1] === 'محترق')) cons.push(P(A).name + ' (دلیل پرسنده) محترق است: پرسنده نگران، پنهان‌کار یا در تنگناست.');

    // پرسش‌های ویژه
    const special = [];
    if (qt.id === 'lost') {
      const l2 = chart.houseRulers[2];
      const where = Pp[l2];
      if ([1, 4, 7, 10].includes(where.house) || [1, 4, 7, 10].includes(Pp.moon.house)) special.push({ tone: 'good', text: 'خداوند خانهٔ دوم یا ماه در وتد است: چیز گمشده پیدا می‌شود (قاعدهٔ لیلی).' });
      else special.push({ tone: 'mixed', text: 'نه خداوند دوم و نه ماه در وتد نیستند: یافتن آن دشوارتر است.' });
      special.push({ tone: 'mixed', text: 'جهت احتمالی: سوی ' + KB.SIGNS[where.sign].dir + ' (برج ' + KB.SIGNS[where.sign].name + ')؛ ' + (KB.SIGNS[where.sign].el === 'water' ? 'نزدیک آب، آشپزخانه یا جای نمناک.' : KB.SIGNS[where.sign].el === 'earth' ? 'نزدیک زمین، کف خانه یا جای سنگی.' : KB.SIGNS[where.sign].el === 'air' ? 'در بلندی، کنار پنجره یا قفسه.' : 'نزدیک گرما، آتش یا دیوار.') });
      if (where.house <= 6 && where.house >= 1) special.push({ tone: 'mixed', text: 'دلیل گمشده زیر افق است: احتمالاً در خانه یا جایی بسته و پوشیده است.' });
    }
    if (qt.id === 'health') special.push({ tone: 'mixed', text: 'این داوری نمادین است؛ برای هر تصمیم درمانی حتماً با پزشک مشورت کنید.' });
    if (qt.id === 'business' && qt.extra) {
      const l2 = chart.houseRulers[2];
      special.push({ tone: I.strength(Pp[l2].total).tone, text: 'سود (خداوند خانهٔ دوم، ' + P(l2).name + ') ' + I.strength(Pp[l2].total).word + ' است و در خانهٔ ' + fa(Pp[l2].house) + ' نشسته.' });
    }

    let verdict, tone;
    if (score >= 3) { verdict = 'آری — نشانه‌ها بر انجام کار گواهی می‌دهند.'; tone = 'good'; }
    else if (score >= 1.5) { verdict = 'احتمالاً آری، اما با شرط و کوشش.'; tone = 'good'; }
    else if (score > -0.5) { verdict = 'نامعلوم؛ گواه‌ها هم‌وزن‌اند. بهتر است صبر کنید و چندی بعد دوباره بپرسید.'; tone = 'mixed'; }
    else if (score > -2.5) { verdict = 'بعید است؛ موانع بیش از یاری‌هاست.'; tone = 'hard'; }
    else { verdict = 'نه — آسمان این کار را تأیید نمی‌کند.'; tone = 'hard'; }
    return { type: qt, querent: A, quesited: B, sig, considerations: cons, testimonies: test, special, score, verdict, tone, timing, perfection: perf };
  }

  /* ---------- اختیارات ---------- */
  function sunTable(startMs, days, lat, lon) {
    const out = [];
    const obs = new G.Astronomy.Observer(lat, lon, 0);
    let t = startMs - 1.2 * DAY;
    for (let i = 0; i < days + 3; i++) {
      const sr = G.Astronomy.SearchRiseSet(G.Astronomy.Body.Sun, obs, +1, G.Astronomy.MakeTime(new Date(t)), 2);
      if (!sr) return null;
      const srMs = sr.date.getTime();
      const ss = G.Astronomy.SearchRiseSet(G.Astronomy.Body.Sun, obs, -1, sr, 1);
      if (!ss) return null;
      out.push({ sr: srMs, ss: ss.date.getTime() });
      t = srMs + 60000;
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
        let idx;
        if (ms < ss) idx = Math.floor((ms - sr) / ((ss - sr) / 12)); else idx = 12 + Math.floor((ms - ss) / ((nx - ss) / 12));
        return { dayRuler: dr, hourRuler: KB.CHALDEAN[(KB.CHALDEAN.indexOf(dr) + idx) % 7], weekday: wd };
      }
    }
    return null;
  }

  function scoreElection(chart, ev, ph) {
    const Pp = chart.planets, R = [];
    let s = 0;
    const add = (w, t) => { s += w; R.push([w, t]); };
    const m = Pp.moon;
    if (E.moonVoid(chart)) add(-5, 'ماه خالی‌السیر');
    if (m.lon >= 195 && m.lon <= 225) add(-3, 'ماه در راه سوخته');
    const dSun = E.sep(m.lon, Pp.sun.lon);
    if (dSun < 12) add(-4, 'ماه محترق (نزدیک محاق)');
    else if (E.n180(m.lon - Pp.sun.lon) > 0) add(2, 'ماه زائدالنور');
    if (m.ess.list.includes('detriment') || m.ess.list.includes('fall')) add(-2, 'ماه در وبال یا هبوط');
    if (m.ess.list.includes('domicile') || m.ess.list.includes('exaltation')) add(2, 'ماه در بیت یا شرف');
    const nx = E.moonNextAspects(chart, true)[0];
    if (nx) {
      if (['jupiter', 'venus'].includes(nx.planet) && nx.aspect.nature !== 'hard') add(3, 'ماه به ' + P(nx.planet).name + ' می‌پیوندد');
      else if (['mars', 'saturn'].includes(nx.planet) && nx.aspect.nature !== 'easy') add(-3, 'ماه به ' + P(nx.planet).name + ' با ' + nx.aspect.name + ' می‌پیوندد');
      else if (['mars', 'saturn'].includes(nx.planet)) add(-0.5, 'ماه به ' + P(nx.planet).name + ' (نظر دوستی) می‌پیوندد');
    }
    const msod = KB.SIGNS[m.sign].mod;
    if (ev.fixed && msod === 'fixed') add(1, 'ماه در برج ثابت (پایداری)');
    if (ev.movable && msod === 'movable') add(1, 'ماه در برج منقلب (شتاب)');
    const ar = chart.ascRuler;
    add(Pp[ar].total / 4, 'خداوند طالع (' + P(ar).name + ') ' + I.strength(Pp[ar].total).word);
    ev.houses.forEach(h => {
      const lr = chart.houseRulers[h];
      add(Pp[lr].total / 5, 'خداوند خانهٔ ' + fa(h) + ' (' + P(lr).name + ') ' + I.strength(Pp[lr].total).word);
    });
    E.CLASSIC.forEach(k => {
      const h = Pp[k].house;
      if (['jupiter', 'venus'].includes(k)) {
        if (h === 1 || h === 10) add(1.5, P(k).name + ' در وتد ' + fa(h));
        if (ev.houses.includes(h) && h !== 1 && h !== 10) add(1, P(k).name + ' در خانهٔ ' + fa(h));
      }
      if (['mars', 'saturn'].includes(k)) {
        if (h === 1 || h === 10) add(-2, P(k).name + ' در وتد ' + fa(h));
        if (h === 7 && (ev.id === 'marriage' || ev.id === 'contract')) add(-2, P(k).name + ' در خانهٔ هفتم');
      }
    });
    if (ev.noRetro && Pp[ev.noRetro].retro) add(-5, P(ev.noRetro).name + ' راجع است');
    if (ev.planet !== 'moon') add(Pp[ev.planet].total / 4, P(ev.planet).name + ' (دلیل کار) ' + I.strength(Pp[ev.planet].total).word);
    if (ph) {
      if (ph.hourRuler === ev.planet) add(1.5, 'ساعت ' + P(ph.hourRuler).name);
      else if (['mars', 'saturn'].includes(ph.hourRuler) && !(ev.id === 'property' && ph.hourRuler === 'saturn')) add(-1, 'ساعت ' + P(ph.hourRuler).name);
    }
    return { score: s, reasons: R };
  }

  function findElections(evId, startMs, days, lat, lon, tz, opts) {
    opts = opts || {};
    const ev = KB.ELECTIONS.find(e => e.id === evId) || KB.ELECTIONS[0];
    const step = (opts.stepMin || 20) * 60000;
    const tab = sunTable(startMs, days, lat, lon);
    const all = [];
    for (let t = startMs; t < startMs + days * DAY; t += step) {
      const lp = E.utcToLocalParts(t, tz);
      if (opts.daytime && (lp.h < 7 || lp.h >= 22)) continue;
      const ch = E.castChart({ ms: t, lat, lon, tz, houseSystem: opts.houseSystem || 'regio' });
      const ph = hourFromTable(tab, t, lon);
      const r = scoreElection(ch, ev, ph);
      all.push({ ms: t, score: r.score, reasons: r.reasons, chart: ch, hour: ph, dayKey: lp.y * 10000 + lp.m * 100 + lp.d });
    }
    const byDay = {};
    all.forEach(x => { if (!byDay[x.dayKey] || byDay[x.dayKey].score < x.score) byDay[x.dayKey] = x; });
    const best = Object.values(byDay).sort((a, b) => b.score - a.score).slice(0, opts.top || 6);
    best.forEach(b => {
      // پنجرهٔ پیوسته پیرامون بهترین لحظه
      const i = all.indexOf(b);
      let lo = i, hi = i;
      while (lo > 0 && all[lo - 1].ms === all[lo].ms - step && all[lo - 1].score >= b.score - 1.5) lo--;
      while (hi < all.length - 1 && all[hi + 1].ms === all[hi].ms + step && all[hi + 1].score >= b.score - 1.5) hi++;
      b.window = [all[lo].ms, all[hi].ms + step];
    });
    const avoid = all.slice().sort((a, b) => a.score - b.score)[0];
    return { event: ev, best, avoid, count: all.length };
  }

  G.Horary = { classify, judge, findElections, scoreElection, timingText };
})(typeof window !== 'undefined' ? window : globalThis);
