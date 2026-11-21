/* Akhtarnameh — user interface */
(function () {
  'use strict';
  const KB = window.KB, E = window.AstroEngine, I = window.Interpret, H = window.Horary, M = window.Mundane, W = window.Wheel, D = window.Deep, T = window.I18N, TP = window.Topics;
  const CITIES = window.CITIES;
  const t = (k, p) => T.t(k, p);
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const HOUSE_SYS = ['placidus', 'regio', 'whole', 'equal'];
  const STORE = 'akhtarnameh.v2';
  const state = { natal: null, horary: null, elect: null, world: null, love: null, trade: null, computed: {} };
  const pad2 = n => (n < 10 ? '0' : '') + n;

  function load() { try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (e) { return {}; } }
  function save(patch) { try { localStorage.setItem(STORE, JSON.stringify(Object.assign(load(), patch))); } catch (e) { /* optional */ } }

  const samplePromise = (window.claude && typeof window.claude.use === 'function') ? window.claude.use('sample').catch(() => null) : Promise.resolve(null);

  /* ---------- static text & controls ---------- */
  const FONT_EXTRA = {
    zh: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@600&display=swap',
    hi: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;700&family=Noto+Serif+Devanagari:wght@600&display=swap',
    ja: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@600&display=swap',
    ko: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=Noto+Serif+KR:wght@600&display=swap'
  };
  function cityName(id) { const m = T.raw('cities'); return (m && m[id]) || id; }
  function monthNames(cal) {
    if (cal === 'j') return t('jmonths');
    const f = new Intl.DateTimeFormat(T.lang === 'ar' ? 'ar-EG' : T.locale, { month: 'long', timeZone: 'UTC' });
    return Array.from({ length: 12 }, (_, i) => f.format(new Date(Date.UTC(2001, i, 1))));
  }
  function applyStatic() {
    const root = document.documentElement;
    root.lang = T.lang; root.dir = T.dir;
    document.title = t('ui.brand');
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    document.querySelector('.nav').setAttribute('aria-label', t('ui.sections'));
    if (FONT_EXTRA[T.lang] && !document.querySelector('link[data-font="' + T.lang + '"]')) {
      const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = FONT_EXTRA[T.lang]; l.dataset.font = T.lang; document.head.appendChild(l);
    }
    document.querySelectorAll('select.city').forEach(sel => {
      const v = sel.value;
      const opts = CITIES.map((c, i) => [i, cityName(c[0])]).sort((a, b) => a[1].localeCompare(b[1], T.locale));
      sel.innerHTML = opts.map(([i, n]) => '<option value="' + i + '">' + esc(n) + '</option>').join('') + '<option value="manual">' + esc(t('ui.manualCity')) + '</option>';
      sel.value = v || '0';
    });
    document.querySelectorAll('select.houses').forEach(sel => { const v = sel.value || 'placidus'; sel.innerHTML = HOUSE_SYS.map(h => '<option value="' + h + '">' + esc(t('hsys.' + h)) + '</option>').join(''); sel.value = v; });
    const ht = $('h-type').value || 'auto';
    $('h-type').innerHTML = '<option value="auto">' + esc(t('ui.horary.auto')) + '</option>' + KB.QUESTION_TYPES.map(q => '<option value="' + q.id + '">' + esc(t('qtypes.' + q.id + '.name')) + ' (' + esc(t('ui.houseN', { n: q.house })) + ')</option>').join('');
    $('h-type').value = ht;
    const et = $('e-type').value || 'business';
    $('e-type').innerHTML = KB.ELECTIONS.map(e => '<option value="' + e.id + '">' + esc(t('elect.' + e.id)) + '</option>').join('');
    $('e-type').value = et;
    fillMonths(segValue('n-cal'));
    fillMonths(segValue('p-cal'), 'p');
    const ta = $('t-asset').value || 'stocks';
    $('t-asset').innerHTML = Object.keys(TP.ASSETS).map(k => '<option value="' + k + '">' + esc(t('trade.asset.' + k)) + '</option>').join('');
    $('t-asset').value = ta;
    $('chat-sugg').innerHTML = t('ai.chatSugg').map(q => '<button type="button" class="chip">' + esc(q) + '</button>').join('');
    renderChatLog();
    if (!$('h-q').dataset.touched) $('h-q').value = t('ui.horary.sampleQ');
    $('lang').innerHTML = T.LANGS.map(l => '<option value="' + l[0] + '">' + l[1] + '</option>').join('');
    $('lang').value = T.lang;
  }
  function segValue(id) { const b = $(id).querySelector('[aria-pressed="true"]'); return b ? b.dataset.v : null; }
  function segSet(id, v) { $(id).querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === v))); }
  function segInit(id, onChange) {
    $(id).addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const prev = segValue(id); segSet(id, b.dataset.v);
      if (onChange && prev !== b.dataset.v) onChange(b.dataset.v, prev);
    });
  }
  function fillMonths(cal, prefix) {
    const sel = $((prefix || 'n') + '-month');
    const cur = sel.value || '1';
    sel.innerHTML = monthNames(cal).map((n, i) => '<option value="' + (i + 1) + '">' + esc(n) + '</option>').join('');
    sel.value = cur;
  }
  function calSwitch(prefix) {
    return cal => {
      const y = +$(prefix + '-year').value, m = +$(prefix + '-month').value, d = +$(prefix + '-day').value;
      if (y && m && d) {
        try {
          if (cal === 'g') { const g = E.jalaliToGregorian(y, m, d); $(prefix + '-year').value = g.gy; fillMonths('g', prefix); $(prefix + '-month').value = g.gm; $(prefix + '-day').value = g.gd; return; }
          const j = E.gregorianToJalali(y, m, d); $(prefix + '-year').value = j.jy; fillMonths('j', prefix); $(prefix + '-month').value = j.jm; $(prefix + '-day').value = j.jd; return;
        } catch (e) { /* keep values */ }
      }
      fillMonths(cal, prefix);
    };
  }
  // read a birth date/time/place from a form with the given prefix
  function readBirth(prefix, kind) {
    const cal = segValue(prefix + '-cal'), d = +$(prefix + '-day').value, m = +$(prefix + '-month').value, y = +$(prefix + '-year').value;
    if (!y || !m || !d || d < 1 || d > 31) throw new Error(t('err.date'));
    let g = { gy: y, gm: m, gd: d };
    if (cal === 'j') {
      if (y < 1200 || y > 1500) throw new Error(t('err.jyear'));
      if (m > 6 && d > 30) throw new Error(t('err.jday'));
      g = E.jalaliToGregorian(y, m, d);
    } else if (y < 1800 || y > 2200) throw new Error(t('err.gyear'));
    const notime = $(prefix + '-notime').checked;
    const [hh, mi] = notime ? [12, 0] : ($(prefix + '-time').value || '12:00').split(':').map(Number);
    const loc = readLoc(prefix);
    const ms = E.localToUTC(g.gy, g.gm, g.gd, hh, mi, loc.tz);
    if (ms > Date.now() + 2 * E.DAY && kind !== 'business') throw new Error(t('err.future'));
    return { ms, loc, notime };
  }
  function readLoc(prefix) {
    const v = $(prefix + '-city').value;
    if (v !== 'manual') { const c = CITIES[+v]; return { name: cityName(c[0]), lat: c[1], lon: c[2], tz: c[3] }; }
    const lat = parseFloat($(prefix + '-lat').value), lon = parseFloat($(prefix + '-lon').value);
    let tz = $(prefix + '-tz').value.trim();
    if (!isFinite(lat) || Math.abs(lat) > 89.9 || !isFinite(lon) || Math.abs(lon) > 180) throw new Error(t('err.coords'));
    if (/^[+-]?\d+(\.\d+)?$/.test(tz)) tz = parseFloat(tz);
    else { try { new Intl.DateTimeFormat('en', { timeZone: tz }); } catch (e) { throw new Error(t('err.tz', { tz })); } }
    return { name: t('ui.coordsName', { lat: T.num(lat, 2), lon: T.num(lon, 2) }), lat, lon, tz };
  }
  function errorBox(el, msg) { el.innerHTML = '<div class="verdict hard"><div class="ans">' + esc(t('err.title')) + '</div><p>' + esc(msg) + '</p></div>'; }

  /* ---------- rendering helpers ---------- */
  // CJK scripts: sentence joins assembled in code use Western punctuation; convert them
  function polish(x) {
    x = String(x);
    if (T.lang !== 'zh' && T.lang !== 'ja') return x;
    return x.replace(/([^\d\s])\. /g, '$1。').replace(/([^\d\s])\.$/g, '$1。').replace(/([。！？；：）」])\s+/g, '$1').replace(/; /g, '；');
  }
  function toneChip(x) { return x ? '<span class="tone ' + x + '">' + esc(t('tone.' + x)) + '</span>' : ''; }
  function pillarsHtml(ps) {
    const lab = ['year', 'month', 'day', 'hour'];
    return '<div class="pillars">' + ps.map((p, i) => '<div><small>' + esc(t('deep.bazi.pillar.' + lab[i])) + '</small><b>' + KB.STEM_CH[p.s] + '<br>' + KB.BRANCH_CH[p.b] + '</b><small>' + KB.STEM_PY[p.s] + ' ' + KB.BRANCH_PY[p.b] + '</small></div>').join('') + '</div>';
  }
  function renderSections(sections, deep) {
    return sections.map(s => '<section class="sec' + (deep ? ' deep' : '') + '" id="sec-' + s.id + '"><h3>' + esc(s.title) + '</h3>' +
      (deep && T.has('deep.note.' + s.id) ? '<p class="secnote">' + esc(t('deep.note.' + s.id)) + '</p>' : '') +
      s.items.map(it => '<div class="item">' + (it.title ? '<h4>' + esc(it.title) + toneChip(it.tone) + '</h4>' : '') + (it.pillars ? pillarsHtml(it.pillars) : '') + '<p>' + esc(polish(it.text)) + '</p></div>').join('') +
      '</section>').join('');
  }
  function positionsTable(chart) {
    const rows = E.ALL.concat(['node']).map(k => {
      const pl = chart.planets[k], P = KB.PLANETS[k];
      const ess = pl.ess ? pl.ess.list.map(x => t('dig.' + x)).join(', ') : '—';
      const tot = pl.total !== undefined ? '<span class="' + (pl.total >= 0 ? 'pos' : 'neg') + '">' + T.num(pl.total) + '</span>' : '—';
      return '<tr><td><span class="glyph">' + P.glyph + '︎</span> ' + esc(I.pn(k)) + '</td><td>' + I.fmtLon(pl.lon) + (pl.retro ? ' <span class="neg">℞</span>' : '') + '</td><td>' + T.num(pl.house) + '</td><td>' + esc(ess) + '</td><td>' + tot + '</td></tr>';
    });
    rows.push('<tr><td>' + esc(t('ui.asc')) + '</td><td>' + I.fmtLon(chart.asc) + '</td><td>' + T.num(1) + '</td><td>' + esc(t('ui.ruler')) + ': ' + esc(I.pn(chart.ascRuler)) + '</td><td>—</td></tr>');
    rows.push('<tr><td>' + esc(t('ui.mc')) + '</td><td>' + I.fmtLon(chart.mc) + '</td><td>—</td><td>' + esc(t('ui.ruler')) + ': ' + esc(I.pn(E.ruler(E.signOf(chart.mc)))) + '</td><td>—</td></tr>');
    if (chart.lots) rows.push('<tr><td><span class="glyph">⊗</span> ' + esc(t('lots.fortune.name')) + '</td><td>' + I.fmtLon(chart.lots.fortune) + '</td><td>' + T.num(chart.lotHouses.fortune) + '</td><td>—</td><td>—</td></tr>');
    return '<div class="tablewrap"><table><thead><tr><th>' + esc(t('ui.tbl.planet')) + '</th><th>' + esc(t('ui.tbl.pos')) + '</th><th>' + esc(t('ui.tbl.house')) + '</th><th>' + esc(t('ui.tbl.dignity')) + '</th><th>' + esc(t('ui.tbl.score')) + '</th></tr></thead><tbody>' + rows.join('') + '</tbody></table></div>';
  }
  function chartBlock(chart, label) {
    return '<div class="chartrow"><div>' + W.drawWheel(chart, { label }) + '</div><div>' + positionsTable(chart) + '<p class="hint" style="margin-top:8px">' + esc(t('ui.wheelLegend', { hs: t('hsys.' + chart.houses.system) })) + (chart.houses.fallback ? ' ' + esc(t('ui.hsFallback')) : '') + '</p></div></div>';
  }

  /* ---------- the AI astrologer ---------- */
  function sysPrompt() {
    return [
      'You are the most penetrating astrologer alive: a master of every classical tradition, Babylonian omen lore, Hellenistic (Dorotheus, Valens, Ptolemy, Paulus, Rhetorius), Perso-Arabic (Masha\'allah, Abu Ma\'shar, Sahl ibn Bishr, al-Biruni, al-Qabisi), Hebrew (Ibn Ezra), Latin and Renaissance (Bonatti, Lilly, Morin, Kepler), Indian Jyotish (Parashara, Varahamihira, Jaimini), Chinese Zi Ping four pillars, and the modern German and harmonic schools (Ebertin, Addey).',
      'Answer ONLY in ' + T.english + '. Use each tradition\'s own technical vocabulary where it helps, translated naturally into that language.',
      'How you read:',
      '- Judge only from the data given (computed with an accurate ephemeris). Never invent positions, dates or factors.',
      '- Do not produce generic Sun-sign or cookbook statements. Every claim must be traceable to named factors in the data.',
      '- Look for what an ordinary reader misses: testimonies that independent systems agree on (listed under KEY PLANETS, ARENAS and CURRENT TIME LORDS), hidden links (antiscia, declination parallels, midpoint pictures, harmonic aspects), dispositor chains, sect, overcoming and besiegement, and contradictions between traditions. When systems disagree, interpret the disagreement itself.',
      '- Weigh testimony like a judge: name the strongest 2-4 factors, say how they combine, and reach a clear verdict. Go deep on the person\'s inner structure and motives, not only events.',
      '- For timing, combine the time-lord systems (profection, firdaria, Vimshottari, zodiacal releasing, Bazi luck pillars, solar return, transits) and say when they converge.',
      '- Be candid that astrology is a traditional symbolic art, not proven science, in one short clause at most. Never predict death or a specific illness; for health, legal or money decisions, say a professional should be consulted.',
      '- Length: about 300-450 words unless the user asks for more. Short paragraphs, at most a few bullet points, no tables.'
    ].join('\n');
  }
  function md(text) {
    const lines = esc(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').split('\n');
    let html = '', list = false, para = [];
    const flush = () => { if (para.length) { html += '<p>' + para.join('<br>') + '</p>'; para = []; } };
    lines.forEach(l => {
      const x = l.trim();
      if (/^[-*•]\s+/.test(x)) { flush(); if (!list) { html += '<ul>'; list = true; } html += '<li>' + x.replace(/^[-*•]\s+/, '') + '</li>'; return; }
      if (list) { html += '</ul>'; list = false; }
      if (!x) { flush(); return; }
      if (/^#{1,4}\s/.test(x)) { flush(); html += '<p><strong>' + x.replace(/^#{1,4}\s/, '') + '</strong></p>'; return; }
      para.push(x);
    });
    flush(); if (list) html += '</ul>';
    return html;
  }
  function oracle(host, opts) {
    const box = document.createElement('section');
    box.className = 'oracle';
    box.innerHTML = '<h3>' + esc(opts.title) + '</h3><div class="log"></div>' +
      '<div class="chips sugg">' + (opts.suggestions || []).map(s => '<button type="button" class="chip">' + esc(s) + '</button>').join('') + '</div>' +
      '<form class="ask"><input type="text" aria-label="' + esc(opts.placeholder) + '" placeholder="' + esc(opts.placeholder) + '"><button class="btn" type="submit">' + esc(t('ui.ask')) + '</button></form><p class="status" hidden></p>';
    host.appendChild(box);
    const log = box.querySelector('.log'), form = box.querySelector('form'), input = form.querySelector('input'), status = box.querySelector('.status');
    const history = [];
    let ctrl = null;
    samplePromise.then(s => { if (!s) { form.hidden = true; box.querySelector('.sugg').hidden = true; status.hidden = false; status.textContent = t('ai.unavailable'); } });
    async function ask(q) {
      q = (q || '').trim(); if (!q) return;
      const sample = await samplePromise;
      if (!sample) return;
      if (ctrl) ctrl.abort();
      ctrl = new AbortController();
      const turn = document.createElement('div');
      turn.innerHTML = '<p class="q">' + esc(t('ai.question')) + ': ' + esc(q) + '</p><div class="ans"><p class="status"><span class="spin"></span> ' + esc(t('ai.thinking')) + '</p></div>';
      log.appendChild(turn);
      const ans = turn.querySelector('.ans');
      const ctx = sysPrompt() + '\n\n=== DATA ===\n' + opts.context() + '\n\nToday: ' + new Date().toISOString().slice(0, 10);
      const msgs = [];
      if (!history.length) msgs.push({ role: 'user', content: ctx + '\n\n=== QUESTION ===\n' + q });
      else {
        msgs.push({ role: 'user', content: ctx + '\n\n=== QUESTION ===\n' + history[0].q });
        history.forEach((h, i) => { msgs.push({ role: 'assistant', content: h.a }); if (i < history.length - 1) msgs.push({ role: 'user', content: history[i + 1].q }); });
        msgs.push({ role: 'user', content: q });
      }
      const btn = form.querySelector('button'); btn.disabled = true;
      try {
        const res = await sample(msgs, { onText: ({ text }) => { ans.innerHTML = md(text); }, signal: ctrl.signal, cache: false, modelTier: 'complex' });
        ans.innerHTML = md(res.text) + (res.truncated ? '<p class="status">' + esc(t('ai.truncated')) + '</p>' : '');
        history.push({ q, a: res.text });
        if (history.length > 4) history.splice(1, 1);
      } catch (e) {
        const code = e && e.code;
        if (code === 'cancelled') return;
        let msg = t('ai.failed');
        if (code === 'not_granted') { msg = t('ai.denied'); form.hidden = true; box.querySelector('.sugg').hidden = true; }
        if (code === 'rate_limited') msg = t('ai.limited');
        ans.innerHTML = (e && e.text ? md(e.text) : '') + '<p class="status">' + esc(msg) + '</p>';
      } finally { btn.disabled = false; }
    }
    form.addEventListener('submit', e => { e.preventDefault(); const q = input.value; input.value = ''; ask(q); });
    box.querySelector('.sugg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) ask(b.textContent); });
    return { ask };
  }

  /* ---------- natal ---------- */
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
      if (!v.y || !v.m || !v.d || v.d < 1 || v.d > 31) throw new Error(t('err.date'));
      let g = { gy: v.y, gm: v.m, gd: v.d };
      if (v.cal === 'j') {
        if (v.y < 1200 || v.y > 1500) throw new Error(t('err.jyear'));
        if (v.m > 6 && v.d > 30) throw new Error(t('err.jday'));
        g = E.jalaliToGregorian(v.y, v.m, v.d);
      } else if (v.y < 1800 || v.y > 2200) throw new Error(t('err.gyear'));
      const [hh, mi] = v.notime ? [12, 0] : v.time.split(':').map(Number);
      const loc = readLoc('n');
      const ms = E.localToUTC(g.gy, g.gm, g.gd, hh, mi, loc.tz);
      if (ms > Date.now() + 2 * E.DAY && v.kind === 'person') throw new Error(t('err.future'));
      const chart = E.castChart({ ms, lat: loc.lat, lon: loc.lon, tz: loc.tz, houseSystem: v.houses, sex: v.sex });
      state.natal = { chart, v, loc, isSample };
      if (!isSample) save({ natal: v });
      renderNatal();
    } catch (e) { errorBox(out, e.message); console.error(e); }
  }
  function renderNatal() {
    const { chart, v, loc, isSample } = state.natal;
    const out = $('natal-out');
    const reading = I.natalReading(chart, { kind: v.kind });
    const deep = D.analyze(chart, { kind: v.kind, sex: v.sex });
    const deepSecs = D.render(deep, { kind: v.kind });
    state.natal.reading = reading; state.natal.deep = deep;
    const title = v.name || t(v.kind === 'business' ? 'ui.natal.bizTitle' : 'ui.natal.title');
    let h = '<div class="headline"><h2>' + esc(title) + (isSample ? '<span class="badge">' + esc(t('ui.sample')) + '</span>' : '') + '</h2>' +
      '<div class="meta">' + I.fmtDate(chart.ms, chart.tz) + ' (' + I.fmtGreg(chart.ms, chart.tz) + ') · ' + esc(loc.name) + ' · ' + esc(t('ui.asc')) + ' ' + I.fmtLon(chart.asc) + ' · ' + esc(t(chart.isDay ? 'ui.dayChart' : 'ui.nightChart')) + '</div>' +
      (v.notime ? '<p class="note">' + esc(t('ui.notimeNote')) + '</p>' : '') + '</div>';
    h += chartBlock(chart, title);
    h += '<nav class="jump" aria-label="' + esc(t('ui.contents')) + '">' + deepSecs.map(s => '<a class="deep" href="#sec-' + s.id + '">' + esc(s.title) + '</a>').join('') + reading.sections.map(s => '<a href="#sec-' + s.id + '">' + esc(s.title) + '</a>').join('') + '</nav>';
    h += renderSections(deepSecs, true);
    h += renderSections(reading.sections, false);
    out.innerHTML = h;
    out.querySelectorAll('.jump a').forEach(a => a.addEventListener('click', e => { e.preventDefault(); const el = document.querySelector(a.getAttribute('href')); if (el) el.scrollIntoView({ behavior: 'smooth' }); }));
    oracle(out, {
      title: t('ai.natalTitle'),
      placeholder: t('ai.natalPh'),
      suggestions: v.kind === 'business' ? t('ai.bizSugg') : t('ai.natalSugg'),
      context: () => I.chartDigest(chart, (v.kind === 'business' ? 'BUSINESS FOUNDING CHART ' : 'NATAL CHART ') + (v.name || '')) + '\nplace: ' + loc.name +
        (v.notime ? '\nWARNING: birth time unknown (noon assumed); houses and Ascendant unreliable.' : '') + '\nsex: ' + v.sex +
        '\n\n=== DEEP ANALYSIS ===\n' + D.digest(deep) +
        '\n\n=== RULE-BASED SUMMARY ===\n' + reading.sections.filter(s => ['summary', 'time'].includes(s.id)).map(s => s.items.map(i => '- ' + (i.title ? i.title + ': ' : '') + i.text).join('\n')).join('\n')
    });
  }

  /* ---------- horary ---------- */
  function horaryIntro() {
    $('horary-out').innerHTML = '<div class="headline"><h2>' + esc(t('ui.horary.introTitle')) + '</h2><div class="meta">' + esc(t('ui.horary.introMeta')) + '</div></div>' +
      '<section class="sec"><h3>' + esc(t('ui.horary.looksAt')) + '</h3>' + ['cons', 'sig', 'perf', 'light', 'rec'].map(k => '<div class="item"><h4>' + esc(t('ui.horary.lk.' + k + '.t')) + '</h4><p>' + esc(t('ui.horary.lk.' + k + '.d')) + '</p></div>').join('') + '</section>';
  }
  function computeHorary() {
    try {
      const q = $('h-q').value.trim();
      if (q.length < 4) throw new Error(t('err.question'));
      let typeId = $('h-type').value, auto = null;
      if (typeId === 'auto') { auto = H.classify(q); typeId = auto ? auto.id : 'friends'; }
      const loc = readLoc('h');
      const chart = E.castChart({ ms: Date.now(), lat: loc.lat, lon: loc.lon, tz: loc.tz, houseSystem: 'regio' });
      state.horary = { chart, typeId, q, loc, autoMissed: $('h-type').value === 'auto' && !auto };
      renderHorary(true);
    } catch (e) { errorBox($('horary-out'), e.message); console.error(e); }
  }
  function renderHorary(askAI) {
    const { chart, typeId, q, loc, autoMissed } = state.horary;
    const out = $('horary-out');
    const j = H.judge(chart, typeId);
    const pct = Math.max(2, Math.min(98, (j.score + 5) / 12 * 100));
    let h = '<div class="headline"><h2>' + esc(q) + '</h2><div class="meta">' + I.fmtDate(chart.ms, loc.tz) + ' · ' + esc(loc.name) + ' · ' + esc(t('ui.horary.topic')) + ': ' + esc(t('qtypes.' + j.type.id + '.name')) + (autoMissed ? ' ' + esc(t('ui.horary.autoMissed')) : '') + '</div></div>';
    h += '<div class="verdict ' + j.tone + '"><div class="ans">' + esc(j.verdict) + '</div>' +
      '<div class="scale" aria-hidden="true"><i style="inset-inline-start:' + pct.toFixed(0) + '%"></i></div><div class="scale-l"><span>' + esc(t('ui.horary.no')) + '</span><span>' + esc(t('ui.horary.unclear')) + '</span><span>' + esc(t('ui.horary.yes')) + '</span></div>' +
      '<p>' + esc(j.sig) + '</p>' +
      (j.timing ? '<p><strong>' + esc(t('ui.horary.when')) + ':</strong> ' + esc(t('ui.horary.whenText', { date: I.fmtDate(j.timing.date, loc.tz) })) + ' ' + esc(j.timing.text) + '</p>' : '') + '</div>';
    const secs = [];
    if (j.considerations.length) secs.push({ id: 'cons', title: t('ui.horary.consTitle'), items: j.considerations.map(x => ({ text: x, tone: 'mixed' })) });
    secs.push({ id: 'test', title: t('ui.horary.testTitle'), items: j.testimonies.map(x => ({ text: x.text, tone: x.tone })) });
    if (j.special.length) secs.push({ id: 'spec', title: t('ui.horary.specTitle'), items: j.special });
    h += renderSections(secs);
    h += chartBlock(chart, t('ui.horary.chart'));
    out.innerHTML = h;
    const o = oracle(out, {
      title: t('ai.horaryTitle'), placeholder: t('ai.horaryPh'), suggestions: t('ai.horarySugg'),
      context: () => {
        let c = I.chartDigest(chart, 'HORARY CHART (Regiomontanus) for the question: "' + q + '"') + '\nplace: ' + loc.name +
          '\ntopic: ' + j.type.id + ' (house ' + j.type.house + '); querent significator ' + j.querent + ' + Moon; quesited significator ' + j.quesited +
          '\nrule-based verdict: ' + j.verdict + ' (score ' + j.score.toFixed(1) + ')\n' +
          j.considerations.map(x => '- consideration: ' + x).join('\n') + '\n' + j.testimonies.map(x => '- testimony (' + x.w + '): ' + x.text).join('\n') +
          (j.special.length ? '\n' + j.special.map(s => '- ' + s.text).join('\n') : '');
        if ($('h-usenatal').checked && state.natal && !state.natal.isSample) c += '\n\n' + I.chartDigest(state.natal.chart, "QUERENT'S NATAL CHART") + '\n' + D.digest(state.natal.deep);
        return c;
      }
    });
    if (askAI) o.ask(q);
  }

  /* ---------- elections ---------- */
  function computeElect() {
    const out = $('elect-out');
    let loc;
    try { loc = readLoc('e'); } catch (e) { errorBox(out, e.message); return; }
    const ev = $('e-type').value, days = +$('e-days').value, dayOnly = $('e-day').checked;
    out.innerHTML = '<p class="status"><span class="spin"></span> ' + esc(t('ui.elect.working', { n: days * (dayOnly ? 45 : 72) })) + '</p>';
    const btn = document.querySelector('#elect-form .btn'); btn.disabled = true;
    setTimeout(() => {
      try {
        const start = Math.ceil(Date.now() / 600000) * 600000;
        const r = H.findElections(ev, start, days, loc.lat, loc.lon, loc.tz, { daytime: dayOnly });
        if (!r.best.length) throw new Error(t('err.noSlots'));
        state.elect = { r, loc };
        renderElect();
        save({ elect: { ev, days, dayOnly } });
      } catch (e) { errorBox(out, e.message); console.error(e); }
      btn.disabled = false;
    }, 30);
  }
  function renderElect() {
    const { r, loc } = state.elect;
    const out = $('elect-out');
    I.setTz(loc.tz);
    const hm = ms => { const p = E.utcToLocalParts(ms, loc.tz); return T.digits(pad2(p.h) + ':' + pad2(p.mi)); };
    const wdf = new Intl.DateTimeFormat(T.locale, { weekday: 'long', timeZone: 'UTC' });
    const max = r.best[0].score, min = Math.min(0, r.avoid ? r.avoid.score : 0);
    let h = '<div class="headline"><h2>' + esc(t('elect.' + r.event.id)) + '</h2><div class="meta">' + esc(loc.name) + ' · ' + esc(t('ui.elect.meta', { n: r.count })) + '</div></div><div class="slots">';
    r.best.forEach((b, i) => {
      const lp = E.utcToLocalParts(b.ms, loc.tz);
      const pos = b.reasons.filter(x => x[0] > 0).sort((a, c) => c[0] - a[0]).slice(0, 4);
      const neg = b.reasons.filter(x => x[0] < 0).sort((a, c) => a[0] - c[0]).slice(0, 3);
      const w = Math.max(6, (b.score - min) / (max - min || 1) * 100);
      h += '<article class="slot"><div class="when">' + (i === 0 ? '<span class="badge" style="margin-inline:0 8px">' + esc(t('ui.elect.best')) + '</span>' : '') + esc(wdf.format(new Date(Date.UTC(lp.y, lp.m - 1, lp.d)))) + ' ' + I.fmtDate(b.ms, loc.tz) + '</div>' +
        '<div class="win">' + esc(t('ui.elect.window', { from: hm(b.window[0]), to: hm(b.window[1]) })) + ' · ' + esc(t('ui.asc')) + ' ' + esc(I.sn(E.signOf(b.chart.asc))) + ' · ' + esc(I.pn('moon')) + ' ' + I.fmtLon(b.chart.planets.moon.lon) + (b.hour ? ' · ' + esc(t('ui.elect.hour', { p: I.pn(b.hour.hourRuler) })) : '') + '</div>' +
        '<div class="bar"><b style="width:' + w.toFixed(0) + '%"></b></div>' +
        '<div class="chips">' + pos.map(x => '<span class="chip p">' + esc(H.reasonText(x)) + '</span>').join('') + neg.map(x => '<span class="chip n">' + esc(H.reasonText(x)) + '</span>').join('') + '</div></article>';
    });
    h += '</div>';
    if (r.avoid) h += '<p class="note">' + esc(t('ui.elect.avoid', { date: I.fmtDate(r.avoid.ms, loc.tz), why: T.list(r.avoid.reasons.filter(x => x[0] < 0).sort((a, c) => a[0] - c[0]).slice(0, 3).map(H.reasonText)) })) + '</p>';
    h += '<p class="hint">' + esc(t('ui.elect.rules')) + '</p>';
    out.innerHTML = h;
  }

  /* ---------- world ---------- */
  function computeWorld() {
    const out = $('world-out');
    let loc;
    try { loc = readLoc('w'); } catch (e) { errorBox(out, e.message); return; }
    const year = +$('w-year').value;
    if (!(year >= 1850 && year <= 2150)) { errorBox(out, t('err.wyear')); return; }
    out.innerHTML = '<p class="status"><span class="spin"></span> ' + esc(t('ui.world.working')) + '</p>';
    setTimeout(() => {
      try {
        const r = M.analyzeYear(year, loc.lat, loc.lon, loc.tz, 'placidus');
        state.world = { year, loc };
        let h = '<div class="headline"><h2>' + esc(t('ui.world.head', { py: year - 621, year, city: loc.name })) + '</h2><div class="meta">' + esc(t('ui.world.meta', { date: I.fmtDate(r.ms, loc.tz), p: I.pn(r.lord) })) + '</div></div>';
        h += chartBlock(r.chart, t('ui.world.chart'));
        h += renderSections(r.sections);
        out.innerHTML = h;
        oracle(out, {
          title: t('ai.worldTitle'), placeholder: t('ai.worldPh'), suggestions: t('ai.worldSugg'),
          context: () => I.chartDigest(r.chart, 'ARIES INGRESS (Nowruz) ' + year + ' for ' + loc.name) + '\n\n=== RULE-BASED JUDGMENTS ===\n' +
            r.sections.map(s => s.title + ':\n' + s.items.map(i => '- ' + (i.title ? i.title + ': ' : '') + i.text).join('\n')).join('\n')
        });
      } catch (e) { errorBox(out, e.message); console.error(e); }
    }, 30);
  }

  /* ---------- library ---------- */
  function renderLibrary() {
    const trads = t('sources');
    let h = '<div class="headline"><h2>' + esc(t('lib.title')) + '</h2><div class="meta">' + esc(t('lib.meta')) + '</div></div>';
    h += '<section class="sec"><h3>' + esc(t('lib.sourcesTitle')) + '</h3>' + trads.map(tr => '<h4 class="trad">' + esc(tr.tradition) + '</h4><dl>' + tr.books.map(s => '<dt>' + esc(s.name) + '<span class="era">' + esc(s.era) + '</span></dt><dd>' + esc(s.use) + '</dd>').join('') + '</dl>').join('') + '</section>';
    h += '<section class="sec"><h3>' + esc(t('lib.methodsTitle')) + '</h3>' + t('lib.methods').map(m => '<div class="item"><h4>' + esc(m[0]) + '</h4><p>' + esc(m[1]) + '</p></div>').join('') + '</section>';
    h += '<section class="sec"><h3>' + esc(t('lib.validityTitle')) + '</h3><p class="note">' + esc(t('lib.validity')) + '</p></section>';
    $('library-out').innerHTML = h;
  }

  /* ---------- shared: the user's own chart ---------- */
  function youLabel() {
    const n = state.natal;
    const txt = n ? (n.v.name || t('ui.love.yourChart')) + ' · ' + I.fmtGreg(n.chart.ms, n.chart.tz) + (n.isSample ? ' (' + t('ui.sample') + ')' : '') : '—';
    ['love-you', 'money-you'].forEach(id => { $(id).textContent = txt; });
  }
  function needNatal(out) {
    if (!state.natal) { errorBox(out, t('err.natalFirst')); return false; }
    return true;
  }
  function sampleNote() { return state.natal && state.natal.isSample ? '<p class="note">' + esc(t('ui.love.sampleNote')) + '</p>' : ''; }

  /* ---------- love ---------- */
  function computeLove(auto) {
    const out = $('love-out');
    if (!needNatal(out)) return;
    let partner = null;
    const hasPartner = $('p-year').value && $('p-day').value;
    try {
      if (hasPartner) {
        const b = readBirth('p');
        const chart = E.castChart({ ms: b.ms, lat: b.loc.lat, lon: b.loc.lon, tz: b.loc.tz, houseSystem: state.natal.v.houses, sex: $('p-sex').value });
        partner = { chart, name: $('p-name').value.trim(), sex: $('p-sex').value, notime: b.notime, loc: b.loc };
        partner.deep = D.analyze(chart, { kind: 'person', sex: partner.sex });
        save({ partner: { name: partner.name, cal: segValue('p-cal'), d: $('p-day').value, m: $('p-month').value, y: $('p-year').value, time: $('p-time').value, notime: b.notime, city: $('p-city').value, sex: partner.sex } });
      }
    } catch (e) { if (!auto) { errorBox(out, e.message); return; } }
    state.love = { partner, natalMs: state.natal.chart.ms };
    renderLove();
  }
  function meters(sc) {
    const m = (k, v, cls) => '<div class="meter ' + (cls || '') + '"><span>' + esc(t('syn.meter.' + k)) + '</span><b>' + T.num(v, 1) + '<small>/' + T.num(10) + '</small></b><div class="bar"><b style="width:' + (v * 10).toFixed(0) + '%"></b></div></div>';
    return '<div class="meters">' + m('attraction', sc.attraction) + m('harmony', sc.harmony) + m('durability', sc.durability) + m('friction', sc.friction, 'f') + '</div>';
  }
  function renderLove() {
    const out = $('love-out'), n = state.natal, L = state.love;
    if (!n || !L) return;
    const sex = n.v.sex;
    const mine = TP.loveNatal(n.chart, sex, n.deep, Date.now());
    let h = '<div class="headline"><h2>' + esc(t('ui.love.head')) + '</h2><div class="meta">' + esc(n.v.name || t('ui.love.yourChart')) + (L.partner ? ' & ' + esc(L.partner.name || t('ui.love.partnerName')) : '') + '</div></div>' + sampleNote();
    let syn = null;
    if (L.partner) {
      syn = TP.synastry(n.chart, L.partner.chart, sex, L.partner.sex, n.deep, L.partner.deep);
      const ov = syn.items[0];
      h += '<section class="sec"><h3>' + esc(t('ui.love.compat')) + '</h3><div class="verdict ' + ov.tone + '"><div class="big">' + T.num(ov.pct) + '٪'.replace('٪', T.lang === 'fa' || T.lang === 'ar' || T.lang === 'ur' ? '٪' : '%') + '</div><div class="ans">' + esc(ov.title) + '</div><p>' + esc(ov.text) + '</p></div>' + meters(syn.scores) + '</section>';
      h += renderSections([{ id: 'synastry', title: t('ui.love.synTitle'), items: syn.items.slice(1).filter(i => !i.scores) }]);
      if (L.partner.notime) h += '<p class="note">' + esc(t('ui.love.partnerNoTime')) + '</p>';
    } else h += '<p class="note">' + esc(t('ui.love.addPartner')) + '</p>';
    h += renderSections([{ id: 'lovenatal', title: t('ui.love.natalTitle'), items: mine }]);
    out.innerHTML = h;
    oracle(out, {
      title: t('ai.loveTitle'), placeholder: t('ai.lovePh'), suggestions: L.partner ? t('ai.loveSuggPair') : t('ai.loveSugg'),
      context: () => 'TOPIC: love, marriage and compatibility.\n' + I.chartDigest(n.chart, 'PERSON A NATAL CHART ' + (n.v.name || '')) + '\nsex A: ' + sex + '\n' + D.digest(n.deep) +
        '\n\n=== RULE-BASED LOVE READING (A) ===\n' + mine.map(i => '- ' + i.title + ': ' + i.text).join('\n') +
        (L.partner ? '\n\n' + I.chartDigest(L.partner.chart, 'PERSON B NATAL CHART ' + (L.partner.name || '')) + '\nsex B: ' + L.partner.sex + (L.partner.notime ? ' (birth time unknown)' : '') + '\n' + D.digest(L.partner.deep) +
          '\n\n=== SYNASTRY ===\ninter-aspects: ' + syn.links.map(l => 'A.' + l.a + ' ' + l.asp.id + ' B.' + l.b + ' ' + l.orb.toFixed(1)).join(', ') + '\n' + syn.items.map(i => '- ' + i.title + ': ' + i.text).join('\n') : '')
    });
  }

  /* ---------- money ---------- */
  function renderMoney() {
    const out = $('money-out');
    if (!needNatal(out)) return;
    const n = state.natal, days = +$('m-days').value;
    state.moneyFor = n.chart.ms;
    const items = TP.moneyReading(n.chart, n.deep, Date.now());
    const cal = TP.marketCalendar(Date.now(), days, n.chart.tz);
    let h = '<div class="headline"><h2>' + esc(t('ui.money.head')) + '</h2><div class="meta">' + esc(n.v.name || t('ui.love.yourChart')) + '</div></div>' + sampleNote();
    h += renderSections([{ id: 'wealth', title: t('ui.money.natalTitle'), items }, { id: 'calendar', title: t('ui.money.calTitle', { n: days }), items: cal }]);
    h += '<p class="note">' + esc(t('ui.trade.disclaimer')) + '</p>';
    out.innerHTML = h;
    oracle(out, {
      title: t('ai.moneyTitle'), placeholder: t('ai.moneyPh'), suggestions: t('ai.moneySugg'),
      context: () => 'TOPIC: money, wealth, career income and investing. Not financial advice: frame as traditional astrological judgment.\n' + I.chartDigest(n.chart, 'NATAL CHART') + '\n' + D.digest(n.deep) +
        '\n\n=== RULE-BASED MONEY READING ===\n' + items.map(i => '- ' + i.title + ': ' + i.text).join('\n') + '\n\n=== MARKET CALENDAR ===\n' + cal.map(i => '- ' + i.title + ': ' + i.text).join('\n')
    });
  }

  /* ---------- buy & sell ---------- */
  function computeTrade() {
    const out = $('trade-out');
    let loc;
    try { loc = readLoc('t'); } catch (e) { errorBox(out, e.message); return; }
    const action = segValue('t-action'), asset = $('t-asset').value, days = +$('t-days').value, dayOnly = $('t-day').checked;
    out.innerHTML = '<p class="status"><span class="spin"></span> ' + esc(t('ui.elect.working', { n: days * (dayOnly ? 45 : 72) })) + '</p>';
    const btn = document.querySelector('#trade-form .btn'); btn.disabled = true;
    setTimeout(() => {
      try {
        const now = E.castChart({ ms: Date.now(), lat: loc.lat, lon: loc.lon, tz: loc.tz, houseSystem: 'regio' });
        const deal = TP.dealHorary(now, action, asset);
        const start = Math.ceil(Date.now() / 600000) * 600000;
        const ev = TP.tradeEvent(action, asset);
        const r = H.findElections(ev, start, days, loc.lat, loc.lon, loc.tz, { daytime: dayOnly, top: 5 });
        const cal = TP.marketCalendar(Date.now(), days, loc.tz);
        state.trade = { loc, action, asset, days, now, deal, r, cal };
        save({ trade: { action, asset, days, dayOnly } });
        renderTrade();
      } catch (e) { errorBox(out, e.message); console.error(e); }
      btn.disabled = false;
    }, 30);
  }
  function renderTrade() {
    const S = state.trade, out = $('trade-out');
    if (!S) return;
    const { loc, action, asset, now, r } = S;
    const deal = TP.dealHorary(now, action, asset);
    I.setTz(loc.tz);
    const pct = Math.max(2, Math.min(98, (deal.score + 4) / 10 * 100));
    let h = '<div class="headline"><h2>' + esc(t('ui.trade.head.' + action, { asset: t('trade.asset.' + asset) })) + '</h2><div class="meta">' + esc(loc.name) + '</div></div>';
    h += '<section class="sec"><h3>' + esc(t('ui.trade.nowTitle')) + '</h3><div class="verdict ' + deal.tone + '"><div class="ans">' + esc(deal.verdict) + '</div>' +
      '<div class="scale" aria-hidden="true"><i style="inset-inline-start:' + pct.toFixed(0) + '%"></i></div><div class="scale-l"><span>' + esc(t('ui.trade.scaleNo')) + '</span><span>' + esc(t('ui.horary.unclear')) + '</span><span>' + esc(t('ui.trade.scaleYes')) + '</span></div>' +
      '<p>' + esc(deal.sig) + '</p></div></section>';
    h += renderSections([{ id: 'dealtests', title: t('ui.horary.testTitle'), items: deal.tests.map(x => ({ text: x.text, tone: x.tone })) }]);
    const hm = ms => { const p = E.utcToLocalParts(ms, loc.tz); return T.digits(pad2(p.h) + ':' + pad2(p.mi)); };
    const wdf = new Intl.DateTimeFormat(T.locale, { weekday: 'long', timeZone: 'UTC' });
    const max = r.best[0].score, min = Math.min(0, r.avoid ? r.avoid.score : 0);
    h += '<section class="sec"><h3>' + esc(t('ui.trade.bestTitle.' + action)) + '</h3><div class="slots">';
    r.best.forEach((b, i) => {
      const lp = E.utcToLocalParts(b.ms, loc.tz);
      const pos = b.reasons.filter(x => x[0] > 0).sort((a, c) => c[0] - a[0]).slice(0, 4), neg = b.reasons.filter(x => x[0] < 0).sort((a, c) => a[0] - c[0]).slice(0, 2);
      h += '<article class="slot"><div class="when">' + (i === 0 ? '<span class="badge" style="margin-inline:0 8px">' + esc(t('ui.elect.best')) + '</span>' : '') + esc(wdf.format(new Date(Date.UTC(lp.y, lp.m - 1, lp.d)))) + ' ' + I.fmtDate(b.ms, loc.tz) + '</div>' +
        '<div class="win">' + esc(t('ui.elect.window', { from: hm(b.window[0]), to: hm(b.window[1]) })) + ' · ' + esc(I.pn('moon')) + ' ' + I.fmtLon(b.chart.planets.moon.lon) + (b.hour ? ' · ' + esc(t('ui.elect.hour', { p: I.pn(b.hour.hourRuler) })) : '') + '</div>' +
        '<div class="bar"><b style="width:' + Math.max(6, (b.score - min) / (max - min || 1) * 100).toFixed(0) + '%"></b></div>' +
        '<div class="chips">' + pos.map(x => '<span class="chip p">' + esc(H.reasonText(x)) + '</span>').join('') + neg.map(x => '<span class="chip n">' + esc(H.reasonText(x)) + '</span>').join('') + '</div></article>';
    });
    h += '</div></section>';
    if (r.avoid) h += '<p class="note">' + esc(t('ui.elect.avoid', { date: I.fmtDate(r.avoid.ms, loc.tz), why: T.list(r.avoid.reasons.filter(x => x[0] < 0).sort((a, c) => a[0] - c[0]).slice(0, 3).map(H.reasonText)) })) + '</p>';
    h += renderSections([{ id: 'tcal', title: t('ui.money.calTitle', { n: S.days }), items: TP.marketCalendar(Date.now(), S.days, loc.tz) }]);
    h += '<p class="hint">' + esc(t('ui.trade.rules')) + '</p><p class="note">' + esc(t('ui.trade.disclaimer')) + '</p>';
    out.innerHTML = h;
    oracle(out, {
      title: t('ai.tradeTitle'), placeholder: t('ai.tradePh'), suggestions: t('ai.tradeSugg'),
      context: () => 'TOPIC: whether and when to ' + action + ' ' + asset + '. Not financial advice: frame as traditional astrological judgment (Lilly on buying and selling, al-Biruni/Bonatti elections).\n' +
        I.chartDigest(now, 'CHART OF THIS MOMENT (Regiomontanus)') + '\nrule-based verdict: ' + deal.verdict + ' (score ' + deal.score.toFixed(1) + ')\n' + deal.sig + '\n' + deal.tests.map(x => '- ' + x.text).join('\n') +
        '\n\nBEST WINDOWS: ' + r.best.map(b => new Date(b.ms).toISOString() + ' score ' + b.score.toFixed(1)).join('; ') +
        (state.natal && !state.natal.isSample ? '\n\n' + I.chartDigest(state.natal.chart, "USER'S NATAL CHART") + '\n' + D.digest(state.natal.deep) : '')
    });
  }

  /* ---------- chat ---------- */
  const chat = { history: [], busy: false, ctrl: null };
  function loadChat() { try { chat.history = JSON.parse(localStorage.getItem(STORE + '.chat') || '[]').slice(-30); } catch (e) { chat.history = []; } }
  function saveChat() { try { localStorage.setItem(STORE + '.chat', JSON.stringify(chat.history.slice(-30))); } catch (e) { /* optional */ } }
  function renderChatLog() {
    const log = $('chat-log');
    if (!log) return;
    if (!chat.history.length) { log.innerHTML = '<div class="msg bot"><span class="from">' + esc(t('ui.chat.astrologer')) + '</span>' + md(t('ui.chat.welcome')) + '</div>'; return; }
    log.innerHTML = chat.history.map(m => m.role === 'user' ? '<div class="msg user">' + esc(m.text) + '</div>' : '<div class="msg bot"><span class="from">' + esc(t(m.rule ? 'ui.chat.ruleFrom' : 'ui.chat.astrologer')) + '</span>' + md(m.text) + '</div>').join('');
  }
  function chatContext(q, rule) {
    const parts = ['TOPIC: open conversation with the user. Answer the latest question; use whichever data below is relevant.'];
    if ($('c-natal').checked && state.natal && !state.natal.isSample) parts.push(I.chartDigest(state.natal.chart, "USER'S NATAL CHART " + (state.natal.v.name || '')) + '\nsex: ' + state.natal.v.sex + '\n' + D.digest(state.natal.deep));
    else parts.push('(The user has not entered their own birth data; if the question needs it, ask them to fill in the Natal chart tab.)');
    if ($('c-partner').checked && state.love && state.love.partner) parts.push(I.chartDigest(state.love.partner.chart, 'PARTNER NATAL CHART ' + (state.love.partner.name || '')) + '\n' + D.digest(state.love.partner.deep));
    parts.push(I.chartDigest(rule.chart, 'HORARY CHART FOR THIS QUESTION (cast now, Regiomontanus)') + '\nrule-based horary verdict: ' + rule.j.verdict + ' (topic ' + rule.j.type.id + ', score ' + rule.j.score.toFixed(1) + ')\n' + rule.j.testimonies.map(x => '- ' + x.text).join('\n'));
    return parts.join('\n\n');
  }
  async function chatAsk(q) {
    q = (q || '').trim();
    if (!q || chat.busy) return;
    let loc;
    try { loc = readLoc('c'); } catch (e) { loc = { name: 'Tehran', lat: 35.6892, lon: 51.389, tz: 'Asia/Tehran' }; }
    chat.history.push({ role: 'user', text: q });
    renderChatLog();
    const log = $('chat-log');
    const rule = TP.ruleAnswer(q, loc, state.natal && !state.natal.isSample ? state.natal : null);
    const sample = await samplePromise;
    if (!sample) {
      chat.history.push({ role: 'bot', text: rule.text, rule: true });
      saveChat(); renderChatLog(); log.lastElementChild.scrollIntoView({ block: 'nearest' });
      return;
    }
    chat.busy = true;
    const bubble = document.createElement('div');
    bubble.className = 'msg bot';
    bubble.innerHTML = '<span class="from">' + esc(t('ui.chat.astrologer')) + '</span><p class="status"><span class="spin"></span> ' + esc(t('ai.thinking')) + '</p>';
    log.appendChild(bubble);
    const msgs = [];
    const prior = chat.history.slice(0, -1).filter(m => !m.rule).slice(-8);
    const ctx = sysPrompt() + '\n\n=== DATA ===\n' + chatContext(q, rule) + '\n\nToday: ' + new Date().toISOString().slice(0, 10);
    if (!prior.length) msgs.push({ role: 'user', content: ctx + '\n\n=== QUESTION ===\n' + q });
    else {
      let first = true;
      prior.forEach(m => {
        if (m.role === 'user') msgs.push({ role: 'user', content: first ? ctx + '\n\n=== QUESTION ===\n' + m.text : m.text });
        else if (msgs.length && msgs[msgs.length - 1].role === 'user') msgs.push({ role: 'assistant', content: m.text });
        first = false;
      });
      if (msgs.length && msgs[msgs.length - 1].role === 'user') msgs.pop();
      if (!msgs.length) msgs.push({ role: 'user', content: ctx + '\n\n=== QUESTION ===\n' + q });
      else msgs.push({ role: 'user', content: q + '\n\n(Updated data for this question)\n' + chatContext(q, rule) });
    }
    if (chat.ctrl) chat.ctrl.abort();
    chat.ctrl = new AbortController();
    try {
      const res = await sample(msgs, { onText: ({ text }) => { bubble.innerHTML = '<span class="from">' + esc(t('ui.chat.astrologer')) + '</span>' + md(text); }, signal: chat.ctrl.signal, cache: false, modelTier: 'complex' });
      chat.history.push({ role: 'bot', text: res.text });
    } catch (e) {
      const code = e && e.code;
      if (code !== 'cancelled') chat.history.push({ role: 'bot', text: (e && e.text ? e.text + '\n\n' : '') + (code === 'rate_limited' ? t('ai.limited') : code === 'not_granted' ? t('ai.denied') : t('ai.failed')) + '\n\n' + rule.text, rule: true });
    } finally {
      chat.busy = false; saveChat(); renderChatLog();
      if (log.lastElementChild) log.lastElementChild.scrollIntoView({ block: 'nearest' });
    }
  }

  /* ---------- routing & language ---------- */
  const VIEWS = ['natal', 'love', 'money', 'trade', 'chat', 'horary', 'elect', 'world', 'library'];
  function currentView() { const v = location.hash.replace('#', ''); return VIEWS.includes(v) ? v : (location.hash.startsWith('#sec-') ? 'natal' : 'natal'); }
  function show() {
    if (location.hash.startsWith('#sec-')) return;
    const v = currentView();
    VIEWS.forEach(x => { $('view-' + x).hidden = x !== v; });
    document.querySelectorAll('.nav a').forEach(a => { if (a.dataset.view === v) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    if (!state.computed[v]) {
      state.computed[v] = true;
      if (v === 'elect') computeElect();
      if (v === 'world') computeWorld();
      if (v === 'library') renderLibrary();
      if (v === 'horary') horaryIntro();
      if (v === 'trade') computeTrade();
    }
    if (v === 'love' && (!state.love || state.love.natalMs !== (state.natal && state.natal.chart.ms))) computeLove(true);
    if (v === 'money' && (!state.moneyFor || state.moneyFor !== (state.natal && state.natal.chart.ms))) renderMoney();
    if (v === 'love' || v === 'money') youLabel();
  }
  function rerender() {
    applyStatic();
    if (state.natal) renderNatal();
    if (state.horary) renderHorary(false); else if (state.computed.horary) horaryIntro();
    if (state.elect) renderElect();
    if (state.world) computeWorld();
    if (state.computed.library) renderLibrary();
    if (state.love) renderLove();
    if (state.moneyFor) renderMoney();
    if (state.trade) renderTrade();
    youLabel();
  }
  function pickLang() {
    const st = load();
    if (st.lang && T.LANGS.some(l => l[0] === st.lang)) return st.lang;
    const nav = (navigator.languages || [navigator.language || 'en']).map(x => String(x).slice(0, 2).toLowerCase());
    for (const n of nav) if (T.LANGS.some(l => l[0] === n)) return n;
    return 'en';
  }
  function setLanguage(l, cb) {
    T.load(l, err => {
      T.setLang(err ? 'en' : l);
      save({ lang: T.lang });
      cb && cb();
    });
  }

  function init() {
    segInit('n-kind');
    segInit('p-cal', calSwitch('p'));
    segInit('t-action');
    $('love-form').addEventListener('submit', e => { e.preventDefault(); computeLove(false); });
    $('money-form').addEventListener('submit', e => { e.preventDefault(); renderMoney(); });
    $('trade-form').addEventListener('submit', e => { e.preventDefault(); computeTrade(); });
    $('chat-form').addEventListener('submit', e => { e.preventDefault(); const q = $('chat-input').value; $('chat-input').value = ''; chatAsk(q); });
    $('chat-input').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('chat-form').requestSubmit(); } });
    $('chat-sugg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) chatAsk(b.textContent); });
    $('chat-clear').addEventListener('click', () => { chat.history = []; saveChat(); renderChatLog(); });
    loadChat();
    segInit('n-cal', calSwitch('n'));
    document.querySelectorAll('select.city').forEach(sel => {
      const prefix = sel.id.split('-')[0];
      sel.addEventListener('change', () => { $(prefix + '-manual').hidden = sel.value !== 'manual'; save({ ['city-' + prefix]: sel.value }); });
    });
    $('h-q').addEventListener('input', () => { $('h-q').dataset.touched = '1'; });
    $('lang').addEventListener('change', () => setLanguage($('lang').value, rerender));
    $('natal-form').addEventListener('submit', e => { e.preventDefault(); computeNatal(false); });
    $('horary-form').addEventListener('submit', e => { e.preventDefault(); computeHorary(); });
    $('elect-form').addEventListener('submit', e => { e.preventDefault(); computeElect(); });
    $('world-form').addEventListener('submit', e => { e.preventDefault(); computeWorld(); });
    window.addEventListener('hashchange', show);
    $('w-year').value = new Date().getUTCFullYear() - (new Date().getUTCMonth() < 2 ? 1 : 0);

    setLanguage(pickLang(), () => {
      const st = load();
      // default calendar follows the language; a saved chart keeps its own
      if (!st.natal) {
        if (T.lang === 'fa') { segSet('n-cal', 'j'); $('n-day').value = 1; $('n-year').value = 1370; }
        else { segSet('n-cal', 'g'); $('n-day').value = 21; $('n-year').value = 1991; }
      }
      applyStatic();
      if (!st.natal) $('n-month').value = segValue('n-cal') === 'j' ? '1' : '3';
      ['h', 'e', 'w'].forEach(p => { if (st['city-' + p] && $(p + '-city').querySelector('option[value="' + st['city-' + p] + '"]')) { $(p + '-city').value = st['city-' + p]; $(p + '-manual').hidden = st['city-' + p] !== 'manual'; } });
      if (st.elect) { $('e-type').value = st.elect.ev; $('e-days').value = st.elect.days; $('e-day').checked = st.elect.dayOnly; }
      if (st.trade) { segSet('t-action', st.trade.action); $('t-asset').value = st.trade.asset; $('t-days').value = st.trade.days; $('t-day').checked = st.trade.dayOnly; }
      if (st.partner) {
        const pp = st.partner;
        $('p-name').value = pp.name || ''; segSet('p-cal', pp.cal || 'g'); fillMonths(pp.cal || 'g', 'p');
        $('p-day').value = pp.d; $('p-month').value = pp.m; $('p-year').value = pp.y; $('p-time').value = pp.time || '12:00'; $('p-notime').checked = !!pp.notime; $('p-sex').value = pp.sex || 'x';
        if ($('p-city').querySelector('option[value="' + pp.city + '"]')) { $('p-city').value = pp.city; $('p-manual').hidden = pp.city !== 'manual'; }
      } else if (T.lang === 'fa') { segSet('p-cal', 'j'); fillMonths('j', 'p'); }
      ['t', 'c'].forEach(p => { if (st['city-' + p] && $(p + '-city').querySelector('option[value="' + st['city-' + p] + '"]')) { $(p + '-city').value = st['city-' + p]; $(p + '-manual').hidden = st['city-' + p] !== 'manual'; } });
      let sample = true;
      if (st.natal && st.natal.y) {
        const v = st.natal; sample = false;
        $('n-name').value = v.name || ''; segSet('n-kind', v.kind || 'person'); segSet('n-cal', v.cal || 'g'); fillMonths(v.cal || 'g');
        $('n-day').value = v.d; $('n-month').value = v.m; $('n-year').value = v.y; $('n-time').value = v.time; $('n-notime').checked = !!v.notime;
        if ($('n-city').querySelector('option[value="' + v.city + '"]')) $('n-city').value = v.city;
        $('n-manual').hidden = v.city !== 'manual';
        $('n-lat').value = v.lat; $('n-lon').value = v.lon; $('n-tz').value = v.tz; $('n-sex').value = v.sex || 'x'; $('n-houses').value = v.houses || 'placidus';
      }
      computeNatal(sample);
      show();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
