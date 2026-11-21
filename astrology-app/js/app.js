/* اخترنامه — رابط کاربری */
(function () {
  'use strict';
  const KB = window.KB, E = window.AstroEngine, I = window.Interpret, H = window.Horary, M = window.Mundane, W = window.Wheel;
  const CITIES = window.CITIES;
  const fa = I.fa;
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const GMONTHS = ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'];
  const HOUSE_SYS = [['placidus', 'پلاسیدوس'], ['regio', 'رجیومونتانوس (روش لیلی)'], ['whole', 'برج کامل (هلنیستی)'], ['equal', 'خانه‌های برابر']];
  const TONE = { good: 'نیک', hard: 'دشوار', mixed: 'آمیخته' };
  const STORE = 'akhtarnameh.v1';
  const state = { natal: null, horary: null, world: null, computed: {} };

  /* ---------- حافظهٔ مرورگر ---------- */
  function load() { try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (e) { return {}; } }
  function save(patch) { try { localStorage.setItem(STORE, JSON.stringify(Object.assign(load(), patch))); } catch (e) { /* بی‌اهمیت */ } }

  /* ---------- قابلیت پرسش از Claude ---------- */
  const samplePromise = (window.claude && typeof window.claude.use === 'function')
    ? window.claude.use('sample').catch(() => null) : Promise.resolve(null);

  /* ---------- کنترل‌ها ---------- */
  function segValue(id) { const b = $(id).querySelector('[aria-pressed="true"]'); return b ? b.dataset.v : null; }
  function segSet(id, v) { $(id).querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === v))); }
  function segInit(id, onChange) {
    $(id).addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const prev = segValue(id); segSet(id, b.dataset.v);
      if (onChange && prev !== b.dataset.v) onChange(b.dataset.v, prev);
    });
  }
  function fillCities() {
    document.querySelectorAll('select.city').forEach(sel => {
      sel.innerHTML = CITIES.map((c, i) => '<option value="' + i + '">' + esc(c[0]) + '</option>').join('') + '<option value="manual">سایر شهرها (مختصات دستی)</option>';
      const prefix = sel.id.split('-')[0];
      sel.addEventListener('change', () => { $(prefix + '-manual').hidden = sel.value !== 'manual'; save({ ['city-' + prefix]: sel.value }); });
    });
  }
  function readLoc(prefix) {
    const v = $(prefix + '-city').value;
    if (v !== 'manual') { const c = CITIES[+v]; return { name: c[0], lat: c[1], lon: c[2], tz: c[3] }; }
    const lat = parseFloat($(prefix + '-lat').value), lon = parseFloat($(prefix + '-lon').value);
    let tz = $(prefix + '-tz').value.trim();
    if (!isFinite(lat) || Math.abs(lat) > 89.9 || !isFinite(lon) || Math.abs(lon) > 180) throw new Error('عرض باید بین ۹۰- و ۹۰ و طول بین ۱۸۰- و ۱۸۰ درجه باشد.');
    if (/^[+-]?\d+(\.\d+)?$/.test(tz)) tz = parseFloat(tz);
    else { try { new Intl.DateTimeFormat('en', { timeZone: tz }); } catch (e) { throw new Error('منطقهٔ زمانی «' + tz + '» شناخته نشد. نامی مانند Asia/Tehran یا عددی مانند 3.5 بنویسید.'); } }
    return { name: 'عرض ' + fa(lat.toFixed(2)) + '، طول ' + fa(lon.toFixed(2)), lat, lon, tz };
  }
  function fillMonths(cal) {
    const names = cal === 'j' ? I.JMONTHS : GMONTHS;
    const cur = $('n-month').value || '1';
    $('n-month').innerHTML = names.map((n, i) => '<option value="' + (i + 1) + '">' + n + '</option>').join('');
    $('n-month').value = cur;
  }
  function errorBox(el, msg) { el.innerHTML = '<div class="verdict hard"><div class="ans">خطا</div><p>' + esc(msg) + '</p></div>'; }

  /* ---------- نمایش ---------- */
  function toneChip(t) { return t ? '<span class="tone ' + t + '">' + TONE[t] + '</span>' : ''; }
  function renderSections(sections) {
    return sections.map(s => '<section class="sec" id="sec-' + s.id + '"><h3>' + esc(s.title) + '</h3>' +
      s.items.map(it => '<div class="item">' + (it.title ? '<h4>' + esc(it.title) + toneChip(it.tone) + '</h4>' : '') + '<p>' + esc(it.text) + '</p></div>').join('') +
      '</section>').join('');
  }
  function positionsTable(chart) {
    const rows = E.ALL.concat(['node']).map(k => {
      const pl = chart.planets[k], P = KB.PLANETS[k];
      const ess = pl.ess ? pl.ess.list.map(x => KB.DIGNITY_NAMES[x].split(' ')[0]).join('، ') : '—';
      const tot = pl.total !== undefined ? '<span class="' + (pl.total >= 0 ? 'pos' : 'neg') + '">' + fa((pl.total > 0 ? '+' : '') + pl.total) + '</span>' : '—';
      return '<tr><td><span class="glyph">' + P.glyph + '︎</span> ' + P.name + '</td><td>' + I.fmtLon(pl.lon) + (pl.retro ? ' <span class="neg">℞</span>' : '') + '</td><td>' + fa(pl.house) + '</td><td>' + ess + '</td><td>' + tot + '</td></tr>';
    });
    rows.push('<tr><td>طالع</td><td>' + I.fmtLon(chart.asc) + '</td><td>۱</td><td>خداوند: ' + KB.PLANETS[chart.ascRuler].name + '</td><td>—</td></tr>');
    rows.push('<tr><td>وسط‌السماء</td><td>' + I.fmtLon(chart.mc) + '</td><td>—</td><td>خداوند: ' + KB.PLANETS[E.ruler(E.signOf(chart.mc))].name + '</td><td>—</td></tr>');
    if (chart.lots) rows.push('<tr><td><span class="glyph">⊗</span> سهم‌السعاده</td><td>' + I.fmtLon(chart.lots.fortune) + '</td><td>' + fa(chart.lotHouses.fortune) + '</td><td>—</td><td>—</td></tr>');
    return '<div class="tablewrap"><table><thead><tr><th>اختر</th><th>موضع</th><th>خانه</th><th>قوت ذاتی</th><th>امتیاز لیلی</th></tr></thead><tbody>' + rows.join('') + '</tbody></table></div>';
  }
  function chartBlock(chart, label) {
    return '<div class="chartrow"><div>' + W.drawWheel(chart, { label }) + '</div><div>' + positionsTable(chart) + '<p class="hint" style="margin-top:8px">خط فیروزه‌ای: نظر دوستی؛ خط سرخ: نظر دشمنی؛ خط‌چین: نظر در حال انصراف. خانه‌ها: ' + HOUSE_SYS.find(h => h[0] === chart.houses.system)[1] + (chart.houses.fallback ? ' (در عرض بالا به رجیومونتانوس برگشت داده شد)' : '') + '.</p></div></div>';
  }

  /* ---------- منجّم هوش مصنوعی ---------- */
  const SYS = [
    'You are a master astrologer of the classical Perso-Arabic and Hellenistic tradition: Ptolemy, Dorotheus, Vettius Valens, Masha\'allah, Abu Ma\'shar al-Balkhi, Sahl ibn Bishr, al-Biruni (al-Tafhim), Kushyar Gilani, Bonatti and William Lilly.',
    'Answer ONLY in fluent, warm, precise Persian (Farsi), using the classical Persian technical vocabulary (طالع، خداوند خانه، قبول، کمال، نقل نور، احتراق، هبوط، شرف، فردار، انتها، ...).',
    'Rules:',
    '- Judge only from the chart data given (computed with an accurate ephemeris, tropical zodiac). Never invent positions, aspects or dates.',
    '- Start with a clear one-sentence judgment, then the reasoning by technique (significators, dignity, reception, perfection, Moon, lots, profection, firdaria, transits as relevant), then timing if asked, then concrete practical advice.',
    '- Name the authority behind a rule briefly when useful (e.g. «به قاعدهٔ لیلی»).',
    '- Astrology is a traditional symbolic art, not proven science: be candid about uncertainty without lecturing. Never predict death or a specific illness; for health, legal or money decisions say a professional should be consulted.',
    '- Keep it under about 350 words unless the user asks for more. Short paragraphs; at most a few bullet points; no tables.'
  ].join('\n');

  function md(text) {
    const lines = esc(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').split('\n');
    let html = '', list = false, para = [];
    const flush = () => { if (para.length) { html += '<p>' + para.join('<br>') + '</p>'; para = []; } };
    lines.forEach(l => {
      const t = l.trim();
      if (/^[-*•]\s+/.test(t)) { flush(); if (!list) { html += '<ul>'; list = true; } html += '<li>' + t.replace(/^[-*•]\s+/, '') + '</li>'; return; }
      if (list) { html += '</ul>'; list = false; }
      if (!t) { flush(); return; }
      if (/^#{1,4}\s/.test(t)) { flush(); html += '<p><strong>' + t.replace(/^#{1,4}\s/, '') + '</strong></p>'; return; }
      para.push(t);
    });
    flush(); if (list) html += '</ul>';
    return html;
  }

  function oracle(host, opts) {
    const box = document.createElement('section');
    box.className = 'oracle';
    box.innerHTML = '<h3>' + esc(opts.title) + '</h3><div class="log"></div>' +
      '<div class="chips sugg">' + (opts.suggestions || []).map(s => '<button type="button" class="chip" style="cursor:pointer;background:transparent">' + esc(s) + '</button>').join('') + '</div>' +
      '<form class="ask"><input type="text" aria-label="پرسش از منجّم" placeholder="' + esc(opts.placeholder || 'پرسش خود را بنویسید') + '"><button class="btn" type="submit">بپرس</button></form><p class="status" hidden></p>';
    host.appendChild(box);
    const log = box.querySelector('.log'), form = box.querySelector('form'), input = form.querySelector('input'), status = box.querySelector('.status');
    const history = [];
    let ctrl = null;
    samplePromise.then(s => {
      if (!s) {
        form.hidden = true; box.querySelector('.sugg').hidden = true;
        status.hidden = false;
        status.textContent = 'پاسخ گفت‌وگومحور منجّم فقط وقتی این صفحه در Claude باز شود در دسترس است. داوری‌های بالا کامل و بر پایهٔ قواعد کلاسیک محاسبه شده‌اند.';
      }
    });
    async function ask(q) {
      q = (q || '').trim(); if (!q) return;
      const sample = await samplePromise;
      if (!sample) return;
      if (ctrl) ctrl.abort();
      ctrl = new AbortController();
      const turn = document.createElement('div');
      turn.innerHTML = '<p class="q">پرسش: ' + esc(q) + '</p><div class="ans"><p class="status"><span class="spin"></span> منجّم در حال نگریستن به زایچه است…</p></div>';
      log.appendChild(turn);
      const ans = turn.querySelector('.ans');
      const msgs = [];
      const ctx = SYS + '\n\n=== داده‌های زایچه ===\n' + opts.context() + '\n\nامروز: ' + I.fmtDate(Date.now(), opts.tz ? opts.tz() : 'Asia/Tehran');
      if (!history.length) msgs.push({ role: 'user', content: ctx + '\n\n=== پرسش ===\n' + q });
      else {
        msgs.push({ role: 'user', content: ctx + '\n\n=== پرسش ===\n' + history[0].q });
        history.forEach((h, i) => { msgs.push({ role: 'assistant', content: h.a }); if (i < history.length - 1) msgs.push({ role: 'user', content: history[i + 1].q }); });
        msgs.push({ role: 'user', content: q });
      }
      form.querySelector('button').disabled = true;
      try {
        const res = await sample(msgs, { onText: ({ text }) => { ans.innerHTML = md(text); }, signal: ctrl.signal, cache: false });
        ans.innerHTML = md(res.text) + (res.truncated ? '<p class="status">پاسخ کوتاه شد؛ برای ادامه بپرسید «ادامه بده».</p>' : '');
        history.push({ q, a: res.text });
        if (history.length > 4) history.splice(1, 1);
      } catch (e) {
        const code = e && e.code;
        if (code === 'cancelled') return;
        let msg = 'پاسخ کامل نشد. لحظه‌ای بعد دوباره بپرسید.';
        if (code === 'not_granted') { msg = 'اجازهٔ پرسش از Claude داده نشد؛ داوری‌های قاعده‌محور بالا همچنان معتبرند.'; form.hidden = true; box.querySelector('.sugg').hidden = true; }
        if (code === 'rate_limited') msg = 'سقف پرسش‌ها پر شده است؛ کمی بعد دوباره بپرسید.';
        ans.innerHTML = (e && e.text ? md(e.text) : '') + '<p class="status">' + msg + '</p>';
      } finally { form.querySelector('button').disabled = false; }
    }
    form.addEventListener('submit', e => { e.preventDefault(); const q = input.value; input.value = ''; ask(q); });
    box.querySelector('.sugg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) ask(b.textContent); });
    return { ask };
  }

  /* ---------- زایچهٔ تولد ---------- */
  function natalInputs() {
    return {
      name: $('n-name').value.trim(), kind: segValue('n-kind'), cal: segValue('n-cal'),
      d: +$('n-day').value, m: +$('n-month').value, y: +$('n-year').value, time: $('n-time').value || '12:00',
      notime: $('n-notime').checked, city: $('n-city').value, lat: $('n-lat').value, lon: $('n-lon').value, tz: $('n-tz').value,
      sex: $('n-sex').value, houses: $('n-houses').value
    };
  }
  function computeNatal(isSample) {
    const out = $('natal-out');
    try {
      const v = natalInputs();
      if (!v.y || !v.m || !v.d || v.d < 1 || v.d > 31) throw new Error('تاریخ کامل نیست؛ روز، ماه و سال را وارد کنید.');
      let g = { gy: v.y, gm: v.m, gd: v.d };
      if (v.cal === 'j') {
        if (v.y < 1200 || v.y > 1500) throw new Error('سال خورشیدی باید بین ۱۲۰۰ و ۱۵۰۰ باشد.');
        if (v.m > 6 && v.d > 30) throw new Error('ماه‌های مهر تا اسفند حداکثر ۳۰ روزند.');
        g = E.jalaliToGregorian(v.y, v.m, v.d);
      } else if (v.y < 1800 || v.y > 2200) throw new Error('سال میلادی باید بین ۱۸۰۰ و ۲۲۰۰ باشد.');
      const [hh, mi] = v.notime ? [12, 0] : v.time.split(':').map(Number);
      const loc = readLoc('n');
      const ms = E.localToUTC(g.gy, g.gm, g.gd, hh, mi, loc.tz);
      if (ms > Date.now() + 2 * E.DAY && v.kind === 'person') throw new Error('تاریخ تولد در آینده است.');
      const chart = E.castChart({ ms, lat: loc.lat, lon: loc.lon, tz: loc.tz, houseSystem: v.houses, sex: v.sex });
      const reading = I.natalReading(chart, { kind: v.kind });
      state.natal = { chart, reading, v, loc, isSample };
      if (!isSample) save({ natal: v });
      renderNatal();
    } catch (e) { errorBox(out, e.message); }
  }
  function renderNatal() {
    const { chart, reading, v, loc, isSample } = state.natal;
    const out = $('natal-out');
    const title = v.name || (v.kind === 'business' ? 'زایچهٔ کسب‌وکار' : 'زایچهٔ تولد');
    let h = '<div class="headline"><h2>' + esc(title) + (isSample ? '<span class="badge">نمونه</span>' : '') + '</h2>' +
      '<div class="meta">' + I.fmtDate(chart.ms, chart.tz) + ' (' + I.fmtGreg(chart.ms, chart.tz) + ')، ' + esc(loc.name) + ' · طالع ' + I.fmtLon(chart.asc) + ' · ' + (chart.isDay ? 'زایچهٔ روز' : 'زایچهٔ شب') + '</div>' +
      (v.notime ? '<p class="note">ساعت تولد نامعلوم است و ظهر در نظر گرفته شد. طالع، خانه‌ها و سهام را معتبر ندانید؛ جای سیارات در برج‌ها (جز ماه) درست است.</p>' : '') + '</div>';
    h += chartBlock(chart, 'دایرهٔ ' + title);
    h += renderSections(reading.sections);
    out.innerHTML = h;
    oracle(out, {
      title: 'از منجّم دربارهٔ این زایچه بپرسید',
      placeholder: 'مثلاً: کدام پیشه برایم مناسب‌تر است؟',
      suggestions: v.kind === 'business'
        ? ['این کسب‌وکار در کدام حوزه بیشترین سود را دارد؟', 'نقطهٔ ضعف این شرکت کجاست؟', 'سال پیش رو برای این کسب‌وکار چگونه است؟']
        : ['چه پیشه‌ای برای من مناسب است؟', 'ازدواج و همسرم را چگونه می‌بینی؟', 'امسال برای من چگونه است؟', 'نقطهٔ قوت و ضعف بزرگ زندگی‌ام چیست؟'],
      context: () => I.chartDigest(chart, (v.kind === 'business' ? 'زایچهٔ تأسیس کسب‌وکار ' : 'زایچهٔ تولد ') + (v.name || '')) + '\nمحل: ' + loc.name +
        (v.notime ? '\nهشدار: ساعت تولد نامعلوم است (ظهر فرض شد).' : '') + '\nجنس: ' + ({ m: 'مرد', f: 'زن', x: 'نامشخص' })[v.sex] +
        '\n\nداوری‌های قاعده‌محور:\n' + reading.sections.filter(s => ['summary', 'time'].includes(s.id)).map(s => s.items.map(i => '- ' + (i.title ? i.title + ': ' : '') + i.text).join('\n')).join('\n'),
      tz: () => chart.tz
    });
  }

  /* ---------- پرسش ساعتی ---------- */
  function horaryIntro() {
    $('horary-out').innerHTML = '<div class="headline"><h2>پرسش در لحظه</h2><div class="meta">با زدن «بپرس»، آسمان همین لحظه در شهر شما ترسیم و داوری می‌شود.</div></div>' +
      '<section class="sec"><h3>منجّم به چه می‌نگرد</h3>' + [
        ['ملاحظات پیش از داوری', 'طالع خیلی زود یا خیلی دیر، ماه خالی‌السیر، ماه در راه سوخته و زحل در طالع یا هفتم (سهل بن بشر، لیلی).'],
        ['دلایل', 'خداوند طالع و ماه نمایندهٔ پرسنده‌اند و خداوند خانهٔ موضوع (مثلاً هفتم برای ازدواج، دهم برای کار) نمایندهٔ مطلوب.'],
        ['کمال', 'آیا دو دلیل در آیندهٔ نزدیک به نظر کامل می‌رسند؟ زمان دقیق آن با زیج محاسبه می‌شود. رجوع (بازگشت پیش از کمال) و منع نیز بررسی می‌شوند.'],
        ['نقل و جمع نور', 'اختری تندرو نور یکی را به دیگری می‌رساند، یا اختری سنگین نور هر دو را گرد می‌آورد.'],
        ['قبول و حال دلایل', 'پذیرش متقابل، احتراق، قوت ذاتی و عرضی، و اتصال بعدی ماه.']
      ].map(x => '<div class="item"><h4>' + x[0] + '</h4><p>' + x[1] + '</p></div>').join('') + '</section>';
  }
  function computeHorary() {
    const out = $('horary-out');
    try {
      const q = $('h-q').value.trim();
      if (q.length < 4) throw new Error('پرسش خود را روشن و کامل بنویسید.');
      let typeId = $('h-type').value;
      let auto = null;
      if (typeId === 'auto') { auto = H.classify(q); typeId = auto ? auto.id : 'friends'; }
      const loc = readLoc('h');
      const chart = E.castChart({ ms: Date.now(), lat: loc.lat, lon: loc.lon, tz: loc.tz, houseSystem: 'regio' });
      const j = H.judge(chart, typeId);
      state.horary = { chart, j, q, loc };
      const pct = Math.max(2, Math.min(98, (j.score + 5) / 12 * 100));
      let h = '<div class="headline"><h2>' + esc(q) + '</h2><div class="meta">' + I.fmtDate(chart.ms, loc.tz) + '، ' + esc(loc.name) + ' · موضوع: ' + esc(j.type.name) + (auto === null && $('h-type').value === 'auto' ? ' (تشخیص داده نشد؛ خانهٔ یازدهم، خانهٔ امید و آرزو)' : '') + '</div></div>';
      h += '<div class="verdict ' + j.tone + '"><div class="ans">' + esc(j.verdict) + '</div>' +
        '<div class="scale" aria-hidden="true"><i style="right:' + pct.toFixed(0) + '%"></i></div><div class="scale-l"><span>نه</span><span>نامعلوم</span><span>آری</span></div>' +
        '<p>' + esc(j.sig) + '</p>' +
        (j.timing ? '<p><strong>زمان:</strong> کمال نظر در ' + I.fmtDate(j.timing.date, loc.tz) + '. ' + esc(j.timing.text) + '</p>' : '') + '</div>';
      const secs = [];
      if (j.considerations.length) secs.push({ id: 'cons', title: 'ملاحظات پیش از داوری', items: j.considerations.map(t => ({ text: t, tone: 'mixed' })) });
      secs.push({ id: 'test', title: 'گواه‌ها', items: j.testimonies.map(t => ({ text: t.text, tone: t.tone })) });
      if (j.special.length) secs.push({ id: 'spec', title: 'نکته‌های ویژهٔ این پرسش', items: j.special });
      h += renderSections(secs);
      h += chartBlock(chart, 'زایچهٔ پرسش');
      out.innerHTML = h;
      const o = oracle(out, {
        title: 'پاسخ منجّم',
        placeholder: 'پرسش تکمیلی (مثلاً: چه کنم که بهتر شود؟)',
        suggestions: ['زمانش را دقیق‌تر بگو', 'چه چیزی مانع است؟', 'چه کنم که نتیجه بهتر شود؟'],
        context: () => {
          let c = I.chartDigest(chart, 'زایچهٔ پرسش ساعتی (رجیومونتانوس)') + '\nمحل پرسش: ' + loc.name +
            '\nموضوع: ' + j.type.name + ' (خانهٔ ' + j.type.house + ')\n' + j.sig + '\nداوری قاعده‌محور: ' + j.verdict + ' (امتیاز ' + j.score.toFixed(1) + ')\n' +
            j.considerations.map(t => '- ملاحظه: ' + t).join('\n') + '\n' + j.testimonies.map(t => '- گواه (' + t.w + '): ' + t.text).join('\n') +
            (j.special.length ? '\n' + j.special.map(s => '- ' + s.text).join('\n') : '');
          if ($('h-usenatal').checked && state.natal && !state.natal.isSample) c += '\n\n' + I.chartDigest(state.natal.chart, 'زایچهٔ تولد پرسنده');
          return c;
        },
        tz: () => loc.tz
      });
      o.ask(q);
    } catch (e) { errorBox(out, e.message); }
  }

  /* ---------- زمان‌گزینی ---------- */
  function computeElect() {
    const out = $('elect-out');
    let loc;
    try { loc = readLoc('e'); } catch (e) { errorBox(out, e.message); return; }
    const ev = $('e-type').value, days = +$('e-days').value, dayOnly = $('e-day').checked;
    out.innerHTML = '<p class="status"><span class="spin"></span> در حال سنجیدن ' + fa(days * (dayOnly ? 45 : 72)) + ' لحظه…</p>';
    const btn = document.querySelector('#elect-form .btn'); btn.disabled = true;
    setTimeout(() => {
      try {
        const start = Math.ceil(Date.now() / 600000) * 600000;
        const r = H.findElections(ev, start, days, loc.lat, loc.lon, loc.tz, { daytime: dayOnly });
        if (!r.best.length) throw new Error('در این بازه لحظه‌ای یافت نشد.');
        const max = r.best[0].score, min = Math.min(0, r.avoid ? r.avoid.score : 0);
        let h = '<div class="headline"><h2>' + esc(r.event.name) + '</h2><div class="meta">' + esc(loc.name) + ' · ' + fa(r.count) + ' لحظه سنجیده شد · بهترین زمان هر روز، مرتب از بهترین</div></div><div class="slots">';
        r.best.forEach((b, i) => {
          const lp = E.utcToLocalParts(b.ms, loc.tz);
          const pos = b.reasons.filter(x => x[0] > 0).sort((a, c) => c[0] - a[0]).slice(0, 4);
          const neg = b.reasons.filter(x => x[0] < 0).sort((a, c) => a[0] - c[0]).slice(0, 3);
          const w = Math.max(6, (b.score - min) / (max - min || 1) * 100);
          h += '<article class="slot"><div class="when">' + (i === 0 ? '<span class="badge" style="margin:0 0 0 8px">بهترین</span>' : '') + I.WEEKDAYS[lp.wd] + ' ' + I.fmtDate(b.ms, loc.tz) + '</div>' +
            '<div class="win">پنجرهٔ مناسب: ' + fa(pad(E.utcToLocalParts(b.window[0], loc.tz))) + ' تا ' + fa(pad(E.utcToLocalParts(b.window[1], loc.tz))) +
            ' · طالع ' + KB.SIGNS[E.signOf(b.chart.asc)].name + ' · ماه در ' + I.fmtLon(b.chart.planets.moon.lon) + (b.hour ? ' · ساعت ' + KB.PLANETS[b.hour.hourRuler].name : '') + '</div>' +
            '<div class="bar" aria-label="امتیاز ' + fa(b.score.toFixed(1)) + '"><b style="width:' + w.toFixed(0) + '%"></b></div>' +
            '<div class="chips">' + pos.map(x => '<span class="chip p">' + esc(x[1]) + '</span>').join('') + neg.map(x => '<span class="chip n">' + esc(x[1]) + '</span>').join('') + '</div></article>';
        });
        h += '</div>';
        if (r.avoid) {
          const neg = r.avoid.reasons.filter(x => x[0] < 0).sort((a, c) => a[0] - c[0]).slice(0, 3).map(x => x[1]).join('، ');
          h += '<p class="note">بدترین لحظهٔ این بازه: ' + I.fmtDate(r.avoid.ms, loc.tz) + ' — ' + esc(neg) + '.</p>';
        }
        h += '<p class="hint">قاعده‌ها: ماه نباید خالی‌السیر، محترق یا در راه سوخته باشد؛ بهتر است زائدالنور باشد و به سعد بپیوندد؛ خداوند طالع و خداوندان خانه‌های کار نیرومند باشند؛ سعدها در وتد و نحس‌ها دور از طالع و دهم؛ در قرارداد عطارد و در ازدواج زهره راجع نباشند. ساعت کواکب به حساب بیرونی (ساعات زمانی) سنجیده می‌شود.</p>';
        out.innerHTML = h;
        save({ elect: { ev, days, dayOnly } });
      } catch (e) { errorBox(out, e.message); }
      btn.disabled = false;
    }, 30);
  }
  const pad = p => (p.h < 10 ? '0' : '') + p.h + ':' + (p.mi < 10 ? '0' : '') + p.mi;

  /* ---------- احکام عالم ---------- */
  function computeWorld() {
    const out = $('world-out');
    let loc;
    try { loc = readLoc('w'); } catch (e) { errorBox(out, e.message); return; }
    const year = +$('w-year').value;
    if (!(year >= 1850 && year <= 2150)) { errorBox(out, 'سال را بین ۱۸۵۰ و ۲۱۵۰ وارد کنید.'); return; }
    out.innerHTML = '<p class="status"><span class="spin"></span> در حال محاسبهٔ تحویل سال، گرفتگی‌ها و قرانات…</p>';
    setTimeout(() => {
      try {
        const r = M.analyzeYear(year, loc.lat, loc.lon, loc.tz, 'placidus');
        state.world = { r, loc, year };
        let h = '<div class="headline"><h2>سال ' + fa(year - 621) + ' خورشیدی برای ' + esc(loc.name) + '</h2><div class="meta">تحویل: ' + I.fmtDate(r.ms, loc.tz) + ' · سالار سال: ' + KB.PLANETS[r.lord].name + '</div></div>';
        h += chartBlock(r.chart, 'زایچهٔ تحویل سال');
        h += renderSections(r.sections);
        out.innerHTML = h;
        oracle(out, {
          title: 'از منجّم دربارهٔ این سال بپرسید',
          placeholder: 'مثلاً: اقتصاد امسال چگونه است؟',
          suggestions: ['اقتصاد و بازار امسال چگونه است؟', 'حال مردم در این سال چگونه است؟', 'کدام فصل سال پرتنش‌تر است؟'],
          context: () => I.chartDigest(r.chart, 'زایچهٔ تحویل سال (اعتدال بهاری) ' + year + ' برای ' + loc.name) + '\n\nداوری‌های قاعده‌محور:\n' +
            r.sections.map(s => s.title + ':\n' + s.items.map(i => '- ' + (i.title ? i.title + ': ' : '') + i.text).join('\n')).join('\n'),
          tz: () => loc.tz
        });
      } catch (e) { errorBox(out, e.message); }
    }, 30);
  }

  /* ---------- کتابخانه ---------- */
  function renderLibrary() {
    const meth = [
      ['محاسبهٔ آسمان', 'جای خورشید، ماه و هفت اختر (و سه سیارهٔ نو برای آگاهی) با زیج Astronomy Engine در دایرةالبروج حقیقی همان روز؛ گره ماه به روش میانگین؛ طالع و وسط‌السماء از زمان نجومی و میل حقیقی.'],
      ['خانه‌ها', 'پلاسیدوس، رجیومونتانوس (روش لیلی برای پرسش ساعتی)، برج کامل (هلنیستی و ایرانی کهن) و خانه‌های برابر.'],
      ['قوت ذاتی', 'بیت، شرف، مثلثه (خداوندان دوروتئوسی به حیّز)، حد مصری، وجه کلدانی، و وبال و هبوط و غربت؛ با امتیاز ۵، ۴، ۳، ۲، ۱ و ۵-، ۴-، ۵- (لیلی).'],
      ['قوت عرضی', 'جایگاه در خانه، استقامت و رجوع، تندی سیر، شرقی و غربی، احتراق و زیر شعاع و صمیم، مقارنه و نظر دقیق با سعد و نحس، و همراهی با ستارگان ثابت قلب‌الاسد، سماک اعزل و رأس‌الغول.'],
      ['حیّز و مزاج', 'زایچهٔ روز و شب از ارتفاع خورشید؛ مزاج چهارگانه از طالع، خداوند طالع، ماه و ربع آن، فصل تولد و اختران طالع.'],
      ['سهام', 'سهم‌السعاده، سهم‌الغیب، ازدواج، پدر و مادر، با جابه‌جایی روز و شب به روایت بیرونی.'],
      ['دوره‌ها', 'فردارات ابومعشر با هفت زیردوره، انتهای سالانه و سال‌خدا، و گذر زحل و مشتری بر زایچه.'],
      ['پرسش ساعتی', 'ملاحظات پیش از داوری، دلایل، کمال نظر با زمان دقیق از زیج، رجوع، منع، نقل نور، جمع نور، قبول، اتصال ماه و زمان‌بندی نمادین لیلی.'],
      ['زمان‌گزینی', 'سنجش هر بیست دقیقه از بازهٔ برگزیده با قواعد ماه، طالع، خانه‌های کار، سعد و نحس در اوتاد، رجوع عطارد و زهره و ساعات کواکب.'],
      ['احکام عالم', 'زایچهٔ تحویل سال (نوروز)، سالار سال، تقسیم فصل‌ها به قاعدهٔ ابومعشر، کسوف و خسوف و برج آن‌ها، قران‌های زحل و مشتری و تحویل مثلثه، قران مریخ و زحل، و گاه‌شمار رجوع و تغییر برج سیارات.']
    ];
    $('library-out').innerHTML =
      '<div class="headline"><h2>کتابخانه و روش</h2><div class="meta">آنچه این برنامه از کدام متن برگرفته است.</div></div>' +
      '<section class="sec"><h3>متون پایه</h3><dl>' + KB.SOURCES.map(s => '<dt>' + esc(s.name) + '<span class="era">' + esc(s.era) + '</span></dt><dd>' + esc(s.use) + '</dd>').join('') + '</dl></section>' +
      '<section class="sec"><h3>آنچه محاسبه می‌شود</h3>' + meth.map(m => '<div class="item"><h4>' + m[0] + '</h4><p>' + m[1] + '</p></div>').join('') + '</section>' +
      '<section class="sec"><h3>دربارهٔ اعتبار</h3><p class="note">نجوم احکامی میراثی کهن و ارزشمند از فرهنگ ایرانی و جهانی است و این برنامه قواعد آن را دقیق و امانت‌دارانه اجرا می‌کند. با این حال، پژوهش‌های علمی تاکنون توان پیش‌بینی آن را تأیید نکرده‌اند. آن را آینه‌ای برای اندیشیدن و آشنایی با این سنت بدانید، نه حکمی قطعی؛ و در تصمیم‌های پزشکی، حقوقی و مالی با متخصص مشورت کنید.</p></section>';
  }

  /* ---------- مسیریابی ---------- */
  const VIEWS = ['natal', 'horary', 'elect', 'world', 'library'];
  function show() {
    let v = location.hash.replace('#', '');
    if (!VIEWS.includes(v)) v = 'natal';
    VIEWS.forEach(x => { $('view-' + x).hidden = x !== v; });
    document.querySelectorAll('.nav a').forEach(a => { if (a.dataset.view === v) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    if (!state.computed[v]) {
      state.computed[v] = true;
      if (v === 'elect') computeElect();
      if (v === 'world') computeWorld();
      if (v === 'library') renderLibrary();
      if (v === 'horary') horaryIntro();
    }
  }

  /* ---------- آغاز ---------- */
  function init() {
    fillCities();
    document.querySelectorAll('select.houses').forEach(s => { s.innerHTML = HOUSE_SYS.map(h => '<option value="' + h[0] + '">' + h[1] + '</option>').join(''); });
    $('h-type').innerHTML = '<option value="auto">تشخیص خودکار از متن پرسش</option>' + KB.QUESTION_TYPES.map(q => '<option value="' + q.id + '">' + q.name + ' (خانهٔ ' + fa(q.house) + ')</option>').join('');
    $('e-type').innerHTML = KB.ELECTIONS.map(e => '<option value="' + e.id + '">' + e.name + '</option>').join('');
    $('w-year').value = new Date().getUTCFullYear() - (new Date().getUTCMonth() < 2 ? 1 : 0);
    fillMonths('j');
    segInit('n-kind');
    segInit('n-cal', (cal) => {
      // تبدیل تاریخ واردشده به تقویم دیگر
      const y = +$('n-year').value, m = +$('n-month').value, d = +$('n-day').value;
      if (y && m && d) {
        try {
          if (cal === 'g') { const g = E.jalaliToGregorian(y, m, d); $('n-year').value = g.gy; fillMonths('g'); $('n-month').value = g.gm; $('n-day').value = g.gd; return; }
          const j = E.gregorianToJalali(y, m, d); $('n-year').value = j.jy; fillMonths('j'); $('n-month').value = j.jm; $('n-day').value = j.jd; return;
        } catch (e) { /* ادامه */ }
      }
      fillMonths(cal);
    });
    const st = load();
    ['h', 'e', 'w'].forEach(p => { if (st['city-' + p] && $(p + '-city').querySelector('option[value="' + st['city-' + p] + '"]')) { $(p + '-city').value = st['city-' + p]; $(p + '-manual').hidden = st['city-' + p] !== 'manual'; } });
    if (st.elect) { $('e-type').value = st.elect.ev; $('e-days').value = st.elect.days; $('e-day').checked = st.elect.dayOnly; }
    let sample = true;
    if (st.natal && st.natal.y) {
      const v = st.natal; sample = false;
      $('n-name').value = v.name || ''; segSet('n-kind', v.kind || 'person'); segSet('n-cal', v.cal || 'j'); fillMonths(v.cal || 'j');
      $('n-day').value = v.d; $('n-month').value = v.m; $('n-year').value = v.y; $('n-time').value = v.time; $('n-notime').checked = !!v.notime;
      if ($('n-city').querySelector('option[value="' + v.city + '"]')) $('n-city').value = v.city;
      $('n-manual').hidden = v.city !== 'manual';
      $('n-lat').value = v.lat; $('n-lon').value = v.lon; $('n-tz').value = v.tz; $('n-sex').value = v.sex || 'x'; $('n-houses').value = v.houses || 'placidus';
    } else { $('n-month').value = '1'; }
    $('natal-form').addEventListener('submit', e => { e.preventDefault(); computeNatal(false); });
    $('horary-form').addEventListener('submit', e => { e.preventDefault(); computeHorary(); });
    $('elect-form').addEventListener('submit', e => { e.preventDefault(); computeElect(); });
    $('world-form').addEventListener('submit', e => { e.preventDefault(); computeWorld(); });
    window.addEventListener('hashchange', show);
    computeNatal(sample);
    show();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
