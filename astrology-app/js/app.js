/* Akhtarnameh — a simple interface.
 * Home → About me / Love / Money & work / Ask / The right time / More.
 * The visitor enters their birthday once; every page reuses it. Readings are short plain paragraphs;
 * all calculations stay folded under "technical details" at the bottom of each page.
 */
(function () {
  'use strict';
  const KB = window.KB, E = window.AstroEngine, I = window.Interpret, H = window.Horary, M = window.Mundane, W = window.Wheel, D = window.Deep, T = window.I18N, TP = window.Topics, PL = window.Plain;
  const TR = window.Track || { log() {}, init() {}, relabel() {}, isOwner: async () => false, ownerData: async () => null };
  const CITIES = window.CITIES;
  const t = (k, p) => T.t(k, p);
  const $ = id => document.getElementById(id);
  const esc = s => String(s === undefined || s === null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const STORE = 'akhtarnameh.v2';
  const pad2 = n => (n < 10 ? '0' : '') + n;
  const state = { natal: null, partner: null, biz: null, when: null, world: null, owner: false, painted: {} };

  function load() { try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (e) { return {}; } }
  function save(patch) { try { localStorage.setItem(STORE, JSON.stringify(Object.assign(load(), patch))); } catch (e) { /* optional */ } }
  const samplePromise = (window.claude && typeof window.claude.use === 'function') ? window.claude.use('sample').catch(() => null) : Promise.resolve(null);

  /* ---------- small helpers ---------- */
  const FONT_EXTRA = {
    zh: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@600&display=swap',
    hi: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;700&family=Noto+Serif+Devanagari:wght@600&display=swap',
    ja: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@600&display=swap',
    ko: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=Noto+Serif+KR:wght@600&display=swap'
  };
  const HOME_CITY = { fa: 'Tehran', en: 'London', ar: 'Cairo', tr: 'Istanbul', es: 'Madrid', fr: 'Paris', de: 'Berlin', ru: 'Moscow', zh: 'Beijing', hi: 'Delhi', pt: 'São Paulo', ur: 'Karachi', ja: 'Tokyo', ko: 'Seoul', it: 'Rome', id: 'Jakarta' };
  function defaultCity() { const i = CITIES.findIndex(c => c[0] === HOME_CITY[T.lang]); return String(i < 0 ? 0 : i); }
  function cityName(id) { const m = T.raw('cities'); return (m && m[id]) || id; }
  function monthNames(cal) {
    if (cal === 'j') return t('jmonths');
    const f = new Intl.DateTimeFormat(T.lang === 'ar' ? 'ar-EG' : T.locale, { month: 'long', timeZone: 'UTC' });
    return Array.from({ length: 12 }, (_, i) => f.format(new Date(Date.UTC(2001, i, 1))));
  }
  // CJK: sentence joins assembled in code use Western punctuation; convert them
  function polish(x) {
    x = String(x);
    if (T.lang !== 'zh' && T.lang !== 'ja') return x;
    return x.replace(/([^\d\s])\. /g, '$1。').replace(/([^\d\s])\.$/g, '$1。').replace(/([。！？；：）」])\s+/g, '$1').replace(/; /g, '；');
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
  const weekday = (ms, tz) => { const p = E.utcToLocalParts(ms, tz); return new Intl.DateTimeFormat(T.locale, { weekday: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(p.y, p.m - 1, p.d))); };
  const hm = (ms, tz) => { const p = E.utcToLocalParts(ms, tz); return T.digits(pad2(p.h) + ':' + pad2(p.mi)); };
  const dayLabel = (ms, tz) => weekday(ms, tz) + ' ' + I.fmtDate(ms, tz, false);
  function errorCard(msg) { return '<div class="card"><p class="note" style="border-color:var(--hard)">' + esc(msg) + '</p></div>'; }
  function hero(title, sub) { return '<div class="hero"><h1>' + esc(title) + '</h1>' + (sub ? '<p>' + sub + '</p>' : '') + '</div>'; }

  /* ---------- the birth form (used for you, the other person and a business) ---------- */
  function years(cal, future) {
    const nowY = new Date().getFullYear() + (future ? 1 : 0);
    const out = [];
    if (cal === 'j') { const top = E.gregorianToJalali(nowY, 12, 31).jy; for (let y = top; y >= 1279; y--) out.push(y); }
    else for (let y = nowY; y >= 1900; y--) out.push(y);
    return out;
  }
  function dateSelects(p, cal, v, future) {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const opt = (val, label, sel) => '<option value="' + val + '"' + (String(sel) === String(val) ? ' selected' : '') + '>' + esc(label) + '</option>';
    return '<select id="' + p + '-d" aria-label="' + esc(t('s.f.day')) + '">' + '<option value="">' + esc(t('s.f.day')) + '</option>' + days.map(d => opt(d, T.num(d), v.d)).join('') + '</select>' +
      '<select id="' + p + '-m" aria-label="' + esc(t('s.f.month')) + '">' + '<option value="">' + esc(t('s.f.month')) + '</option>' + monthNames(cal).map((n, i) => opt(i + 1, n, v.m)).join('') + '</select>' +
      '<select id="' + p + '-y" aria-label="' + esc(t('s.f.year')) + '">' + '<option value="">' + esc(t('s.f.year')) + '</option>' + years(cal, future).map(y => opt(y, T.digits(String(y)), v.y)).join('') + '</select>';
  }
  function cityOptions(sel) {
    const opts = CITIES.map((c, i) => [i, cityName(c[0])]).sort((a, b) => a[1].localeCompare(b[1], T.locale));
    return opts.map(([i, n]) => '<option value="' + i + '"' + (String(sel) === String(i) ? ' selected' : '') + '>' + esc(n) + '</option>').join('') +
      '<option value="manual"' + (sel === 'manual' ? ' selected' : '') + '>' + esc(t('s.f.otherCity')) + '</option>';
  }
  // o: { name, nameLabel, dateLabel, timeLabel, cityLabel, sex, future }
  function birthFields(p, v, o) {
    v = v || {};
    const cal = v.cal || (T.lang === 'fa' ? 'j' : 'g');
    const city = v.city !== undefined && v.city !== '' ? v.city : defaultCity();
    let h = '';
    if (o.name) h += '<div class="field"><label for="' + p + '-name">' + esc(o.nameLabel || t('s.f.name')) + '</label><input type="text" id="' + p + '-name" maxlength="60" placeholder="' + esc(t('s.f.namePh')) + '" value="' + esc(v.name || '') + '"></div>';
    h += '<div class="field" data-cal="' + cal + '" id="' + p + '-datefield"><span class="lbl">' + esc(o.dateLabel || t('s.f.date')) + '</span><div class="date3" id="' + p + '-date">' + dateSelects(p, cal, v, o.future) + '</div>' +
      (T.lang === 'fa' || cal === 'j' ? '<button type="button" class="linkbtn" data-caltoggle="' + p + '">' + esc(t(cal === 'j' ? 's.f.toGreg' : 's.f.toJalali')) + '</button>' : '') + '</div>';
    h += '<div class="field"><label for="' + p + '-time">' + esc(o.timeLabel || t('s.f.time')) + '</label><input type="time" id="' + p + '-time" value="' + esc(v.notime ? '' : (v.time || '')) + '"><p class="help">' + esc(t('s.f.timeHelp')) + '</p></div>';
    h += '<div class="field"><label for="' + p + '-city">' + esc(o.cityLabel || t('s.f.city')) + '</label><select id="' + p + '-city" class="city">' + cityOptions(city) + '</select>' +
      '<div id="' + p + '-manual" class="row2"' + (city === 'manual' ? '' : ' hidden') + ' style="margin-top:6px">' +
      '<input type="number" step="0.0001" id="' + p + '-lat" aria-label="' + esc(t('ui.lat')) + '" placeholder="' + esc(t('ui.lat')) + '" value="' + esc(v.lat || '') + '">' +
      '<input type="number" step="0.0001" id="' + p + '-lon" aria-label="' + esc(t('ui.lon')) + '" placeholder="' + esc(t('ui.lon')) + '" value="' + esc(v.lon || '') + '">' +
      '<input type="text" id="' + p + '-tz" dir="ltr" style="grid-column:1/-1" aria-label="' + esc(t('ui.tz')) + '" placeholder="' + esc(t('ui.tz')) + ' (Europe/London)" value="' + esc(v.tz || '') + '"></div></div>';
    if (o.sex) {
      const sx = v.sex || 'x';
      h += '<div class="field"><span class="lbl">' + esc(t('s.f.sex')) + '</span><div class="picks" data-pick="' + p + '-sex">' +
        [['f', 's.f.woman'], ['m', 's.f.man'], ['x', 's.f.skip']].map(([k, l]) => '<button type="button" data-v="' + k + '" aria-pressed="' + (sx === k) + '">' + esc(t(l)) + '</button>').join('') + '</div></div>';
    }
    return h;
  }
  function pickValue(name) { const b = document.querySelector('[data-pick="' + name + '"] [aria-pressed="true"]'); return b ? b.dataset.v : null; }
  function readLoc(p) {
    const v = $(p + '-city').value;
    if (v !== 'manual') { const c = CITIES[+v]; return { name: cityName(c[0]), lat: c[1], lon: c[2], tz: c[3] }; }
    const lat = parseFloat($(p + '-lat').value), lon = parseFloat($(p + '-lon').value);
    let tz = $(p + '-tz').value.trim();
    if (!isFinite(lat) || Math.abs(lat) > 89.9 || !isFinite(lon) || Math.abs(lon) > 180) throw new Error(t('err.coords'));
    if (/^[+-]?\d+(\.\d+)?$/.test(tz)) tz = parseFloat(tz);
    else { try { new Intl.DateTimeFormat('en', { timeZone: tz }); } catch (e) { throw new Error(t('err.tz', { tz })); } }
    return { name: t('ui.coordsName', { lat: T.num(lat, 2), lon: T.num(lon, 2) }), lat, lon, tz };
  }
  // read the form into a saved record { name, cal, d, m, y, time, notime, city, lat, lon, tz, sex } plus { ms, loc }
  function readBirth(p, kind) {
    const cal = $(p + '-datefield').dataset.cal;
    const d = +$(p + '-d').value, m = +$(p + '-m').value, y = +$(p + '-y').value;
    if (!y || !m || !d) throw new Error(t('err.date'));
    let g = { gy: y, gm: m, gd: d };
    if (cal === 'j') { if (m > 6 && d > 30) throw new Error(t('err.jday')); g = E.jalaliToGregorian(y, m, d); }
    const time = $(p + '-time').value, notime = !time;
    const [hh, mi] = notime ? [12, 0] : time.split(':').map(Number);
    const loc = readLoc(p);
    const ms = E.localToUTC(g.gy, g.gm, g.gd, hh, mi, loc.tz);
    if (ms > Date.now() + 2 * E.DAY && kind !== 'business') throw new Error(t('err.future'));
    const nameEl = $(p + '-name');
    const rec = { name: nameEl ? nameEl.value.trim() : '', cal, d, m, y, time: time || '12:00', notime, city: $(p + '-city').value, lat: $(p + '-lat').value, lon: $(p + '-lon').value, tz: $(p + '-tz').value, sex: pickValue(p + '-sex') || 'x' };
    return { rec, ms, loc };
  }
  // the same record, re-read from storage (no form)
  function castFrom(rec, kind) {
    let g = { gy: +rec.y, gm: +rec.m, gd: +rec.d };
    if (rec.cal === 'j') g = E.jalaliToGregorian(g.gy, g.gm, g.gd);
    let loc;
    if (rec.city === 'manual') { let tz = rec.tz; if (/^[+-]?\d+(\.\d+)?$/.test(String(tz))) tz = parseFloat(tz); loc = { name: t('ui.coordsName', { lat: T.num(+rec.lat, 2), lon: T.num(+rec.lon, 2) }), lat: +rec.lat, lon: +rec.lon, tz }; }
    else { const c = CITIES[+rec.city] || CITIES[0]; loc = { name: cityName(c[0]), lat: c[1], lon: c[2], tz: c[3] }; }
    const [hh, mi] = rec.notime ? [12, 0] : String(rec.time || '12:00').split(':').map(Number);
    const ms = E.localToUTC(g.gy, g.gm, g.gd, hh, mi, loc.tz);
    const chart = E.castChart({ ms, lat: loc.lat, lon: loc.lon, tz: loc.tz, houseSystem: rec.houses || 'placidus', sex: rec.sex || 'x' });
    const deep = D.analyze(chart, { kind, sex: rec.sex || 'x' });
    return { chart, deep, loc, ms, v: Object.assign({ kind }, rec) };
  }
  const birthLog = (v, loc, ms) => ({ name: v.name || '', kind: v.kind || 'person', cal: v.cal, input: v.y + '-' + v.m + '-' + v.d, time: v.notime ? null : v.time, notime: !!v.notime, utc: new Date(ms).toISOString(), city: loc.name, lat: loc.lat, lon: loc.lon, tz: String(loc.tz), sex: v.sex });

  // shared form behaviour: calendar switch, "another city", pick buttons
  document.addEventListener('click', e => {
    const tg = e.target.closest('[data-caltoggle]');
    if (tg) {
      const p = tg.dataset.caltoggle, f = $(p + '-datefield'), cal = f.dataset.cal, next = cal === 'j' ? 'g' : 'j';
      let d = +$(p + '-d').value, m = +$(p + '-m').value, y = +$(p + '-y').value;
      if (d && m && y) { try { if (next === 'g') { const g = E.jalaliToGregorian(y, m, d); y = g.gy; m = g.gm; d = g.gd; } else { const j = E.gregorianToJalali(y, m, d); y = j.jy; m = j.jm; d = j.jd; } } catch (er) { d = m = y = ''; } }
      f.dataset.cal = next;
      $(p + '-date').innerHTML = dateSelects(p, next, { d, m, y }, p === 'b');
      tg.textContent = t(next === 'j' ? 's.f.toGreg' : 's.f.toJalali');
      return;
    }
    const pk = e.target.closest('[data-pick] button');
    if (pk) { pk.parentNode.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === pk))); pk.parentNode.dispatchEvent(new Event('pick', { bubbles: true })); }
  });
  document.addEventListener('change', e => {
    if (e.target.matches('select.city')) { const p = e.target.id.split('-')[0]; const box = $(p + '-manual'); if (box) box.hidden = e.target.value !== 'manual'; }
  });

  /* ---------- the plain reading ---------- */
  const ICON = { nature: '🌿', heart: '💗', drive: '🔥', gift: '✨', love: '❤️', work: '💼', money: '💰', now: '🗓️', advice: '💡' };
  function cardTitle(x, business) {
    if (business && x.key === 'nature') return t('s.h.identity');
    if (business && x.key === 'gift') return t('s.h.edge');
    return T.has('s.h.' + x.key) ? t('s.h.' + x.key) : x.title;
  }
  function pcards(items, keys, business) {
    return '<div class="stack">' + keys.map(k => items.find(x => x.key === k)).filter(Boolean).map(x =>
      '<article class="pcard"><span class="ic" aria-hidden="true">' + ICON[x.key] + '</span><h3>' + esc(cardTitle(x, business)) + '</h3><p>' + esc(polish(x.text)) + '</p></article>').join('') + '</div>';
  }
  function giftOf(chart, deep) {
    const k = (deep && deep.syn.keyPlanets.find(p => E.ALL.includes(p))) || chart.strongest[0];
    return k;
  }

  /* ---------- technical details (folded) ---------- */
  function toneChip(x) { return x ? '<span class="tone ' + x + '">' + esc(t('tone.' + x)) + '</span>' : ''; }
  function pillarsHtml(ps) {
    const lab = ['year', 'month', 'day', 'hour'];
    return '<div class="pillars">' + ps.map((p, i) => '<div><small>' + esc(t('deep.bazi.pillar.' + lab[i])) + '</small><b>' + KB.STEM_CH[p.s] + '<br>' + KB.BRANCH_CH[p.b] + '</b><small>' + KB.STEM_PY[p.s] + ' ' + KB.BRANCH_PY[p.b] + '</small></div>').join('') + '</div>';
  }
  function renderSections(sections, deep) {
    return sections.map(s => '<section class="sec' + (deep ? ' deep' : '') + '"><h3>' + esc(s.title) + '</h3>' +
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
    return '<div class="tablewrap"><table><thead><tr><th>' + esc(t('ui.tbl.planet')) + '</th><th>' + esc(t('ui.tbl.pos')) + '</th><th>' + esc(t('ui.tbl.house')) + '</th><th>' + esc(t('ui.tbl.dignity')) + '</th><th>' + esc(t('ui.tbl.score')) + '</th></tr></thead><tbody>' + rows.join('') + '</tbody></table></div>';
  }
  function techBox(inner) { return '<details class="tech"><summary>' + esc(t('s.tech')) + '</summary>' + inner + '</details>'; }
  function chartTech(n, label) {
    const reading = I.natalReading(n.chart, { kind: n.v.kind });
    n.reading = reading;
    return W.drawWheel(n.chart, { label }) + positionsTable(n.chart) + renderSections(D.render(n.deep, { kind: n.v.kind }), true) + renderSections(reading.sections, false);
  }

  /* ---------- the AI astrologer ---------- */
  function sysPrompt(len) {
    return [
      'You are a kind, wise astrologer who has mastered every classical tradition (Hellenistic, Persian and Arabic, Indian, Chinese). You talk with people like a warm, honest friend.',
      'Answer ONLY in ' + T.english + '.' + (T.lang === 'fa' ? ' Use simple, modern, everyday Persian with the intimate «تو»; never literary, bookish or archaic words.' : ' Use simple, modern, everyday language.'),
      'How to write:',
      '- Use the simplest everyday words and short sentences. Someone who knows nothing about astrology must understand every single word.',
      '- No jargon at all: never mention planets, houses, aspects, degrees, signs (except their birth sign if it fits naturally), scores, techniques, traditions or book names. Only say what it means for their life, feelings and choices.',
      '- Start with the direct answer in the first sentence.',
      '- Be specific and personal: base everything on the data below (computed with an accurate ephemeris). Where several methods agree (KEY PLANETS, ARENAS, CURRENT TIME LORDS), that is what matters most.',
      '- Warm, encouraging and honest. A little poetry is welcome, but never vague.',
      '- For timing, use plain periods such as "from early spring" or "in the next two months".',
      '- Never predict death or illness. For health, legal or money decisions, gently suggest talking to a professional.',
      '- Length: ' + (len || 'about 80 to 150 words') + ', unless the request says otherwise. Short paragraphs. No headings, no lists, no tables.'
    ].join('\n');
  }
  // a button that asks the astrologer, then shows the answer with a follow-up box
  function aiBox(host, o) {
    const box = document.createElement('div');
    box.className = 'stack';
    box.innerHTML = '<button type="button" class="btn soft">' + esc(o.button) + '</button>';
    host.appendChild(box);
    const history = [];
    let ctrl = null, card = null;
    samplePromise.then(s => { if (!s) box.remove(); });
    function open() {
      if (card) return;
      box.innerHTML = '<section class="letter"><h2>' + esc(o.title) + '</h2><div class="log"></div>' +
        '<div class="chips sugg">' + (o.suggestions || []).map(s => '<button type="button" class="chip">' + esc(s) + '</button>').join('') + '</div>' +
        '<form><input type="text" aria-label="' + esc(t('s.ai.ph')) + '" placeholder="' + esc(t('s.ai.ph')) + '"><button class="btn" type="submit">' + esc(t('s.ask.send')) + '</button></form></section>';
      card = box.firstChild;
      const form = card.querySelector('form'), input = form.querySelector('input');
      form.addEventListener('submit', e => { e.preventDefault(); const q = input.value; input.value = ''; ask(q); });
      card.querySelector('.sugg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { b.remove(); ask(b.textContent); } });
    }
    async function ask(q, hidden) {
      q = (q || '').trim(); if (!q) return;
      const sample = await samplePromise;
      if (!sample) return;
      open();
      if (ctrl) ctrl.abort();
      ctrl = new AbortController();
      const log = card.querySelector('.log');
      const turn = document.createElement('div');
      turn.innerHTML = (history.length ? '<p class="q">' + esc(q) + '</p>' : '') + '<div class="ans"><p class="status"><span class="spin"></span> ' + esc(t('s.ai.thinking')) + '</p></div>';
      log.appendChild(turn);
      const ans = turn.querySelector('.ans');
      const ctx = sysPrompt(o.len) + '\n\n=== DATA ===\n' + o.context() + '\n\nToday: ' + new Date().toISOString().slice(0, 10);
      const msgs = [];
      if (!history.length) msgs.push({ role: 'user', content: ctx + '\n\n=== REQUEST ===\n' + (hidden || q) });
      else {
        msgs.push({ role: 'user', content: ctx + '\n\n=== REQUEST ===\n' + history[0].send });
        history.forEach((h, i) => { msgs.push({ role: 'assistant', content: h.a }); if (i < history.length - 1) msgs.push({ role: 'user', content: history[i + 1].send }); });
        msgs.push({ role: 'user', content: q });
      }
      const btn = card.querySelector('form button'); btn.disabled = true;
      try {
        const res = await sample(msgs, { onText: ({ text }) => { ans.innerHTML = md(text); }, signal: ctrl.signal, cache: false, modelTier: 'complex' });
        ans.innerHTML = md(res.text);
        history.push({ send: hidden || q, a: res.text });
        if (history.length > 4) history.splice(1, 1);
        TR.log('ask', { tab: o.tab, q, a: res.text });
      } catch (e) {
        const code = e && e.code;
        if (code === 'cancelled') return;
        const msg = t(code === 'rate_limited' ? 's.ai.limited' : code === 'not_granted' ? 's.ai.denied' : 's.ai.failed');
        ans.innerHTML = (e && e.text ? md(e.text) : '') + '<p class="status">' + esc(msg) + '</p>';
      } finally { btn.disabled = false; }
    }
    box.querySelector('button').addEventListener('click', () => ask(o.button.replace(/^✨\s*/, ''), o.prompt));
    return { ask };
  }

  /* ---------- your chart ---------- */
  function setNatal(rec) {
    const n = castFrom(rec, 'person');
    n.plain = PL.plainReading(n.chart, n.deep, { kind: 'person' });
    state.natal = n;
    state.painted = {};
  }
  function needProfile() {
    return '<div class="card" style="text-align:center"><div style="font-size:2.2rem">🎂</div><h2>' + esc(t('s.need.title')) + '</h2><p class="sub">' + esc(t('s.need.text')) + '</p><a class="btn" href="#profile">' + esc(t('s.need.go')) + '</a></div>';
  }
  function profileLine() {
    const n = state.natal;
    return esc((n.v.name || t('s.home.you')) + ' · ' + I.fmtDate(n.chart.ms, n.chart.tz, false) + ' · ' + n.loc.name);
  }
  function natalDigest(n, label) {
    return I.chartDigest(n.chart, label + ' ' + (n.v.name || '')) + '\nplace: ' + n.loc.name + (n.v.notime ? '\nWARNING: birth time unknown (noon assumed); houses and Ascendant unreliable.' : '') + '\nsex: ' + (n.v.sex || 'x') + '\n\n=== DEEP ANALYSIS ===\n' + D.digest(n.deep);
  }

  function profileForm(first) {
    const st = load();
    return '<form class="card f" id="profile-form" autocomplete="off">' + birthFields('n', st.natal, { name: true, sex: true }) +
      '<button class="btn" type="submit">' + esc(t(first ? 's.f.go' : 's.f.save')) + '</button></form>';
  }
  function wireProfile() {
    const f = $('profile-form');
    f.addEventListener('submit', e => {
      e.preventDefault();
      const old = f.querySelector('.formerr'); if (old) old.remove();
      try {
        const { rec, ms, loc } = readBirth('n', 'person');
        rec.houses = (load().natal || {}).houses || 'placidus';
        save({ natal: rec });
        setNatal(rec);
        TR.log('natal', birthLog(rec, loc, ms));
        location.hash = '#me';
      } catch (er) {
        const p = document.createElement('p'); p.className = 'note formerr'; p.style.borderColor = 'var(--hard)'; p.textContent = er.message;
        f.insertBefore(p, f.lastElementChild); console.error(er);
      }
    });
  }

  /* ---------- pages ---------- */
  function renderHome(el) {
    if (!state.natal) {
      el.innerHTML = hero(t('s.start.title'), esc(t('s.start.sub'))) + profileForm(true);
      wireProfile();
      return;
    }
    const n = state.natal;
    const tile = (href, ic, k, wide) => '<a class="tile' + (wide ? ' wide' : '') + '" href="' + href + '"><span class="ic" aria-hidden="true">' + ic + '</span><b>' + esc(t('s.card.' + k + '.t')) + '</b><span>' + esc(t('s.card.' + k + '.d')) + '</span></a>';
    el.innerHTML = hero(n.v.name ? t('s.home.hi', { name: n.v.name }) : t('s.home.hiAnon'), esc(t('s.home.sub'))) +
      '<div class="who"><span>' + profileLine() + '</span><a href="#profile">' + esc(t('s.home.edit')) + '</a></div>' +
      '<div class="tiles">' + tile('#me', '✨', 'me') + tile('#love', '❤️', 'love') + tile('#money', '💰', 'money') + tile('#ask', '💬', 'ask') + tile('#when', '🗓️', 'when', true) + tile('#more', '🔭', 'more', true) + '</div>';
  }
  function renderProfile(el) {
    el.innerHTML = hero(t('s.f.date'), esc(t('s.start.sub'))) + profileForm(!state.natal);
    wireProfile();
  }

  function renderMe(el) {
    if (!state.natal) { el.innerHTML = needProfile(); return; }
    const n = state.natal, P = n.chart.planets;
    const words = [t('s.w.asc')[E.signOf(n.chart.asc)], t('s.w.moon')[P.moon.sign], t('s.w.gift.' + giftOf(n.chart, n.deep))].filter(Boolean);
    let h = hero(n.v.name ? t('s.me.title', { name: n.v.name }) : t('s.me.titleAnon'), '<span class="sign">☀️ ' + esc(t('s.me.sign', { sign: I.sn(P.sun.sign) })) + '</span>');
    h += '<div class="card"><p class="tagtitle">' + esc(t('s.me.words')) + '</p><div class="tags">' + words.map(w => '<span class="tag">' + esc(w) + '</span>').join('') + '</div></div>';
    if (n.v.notime) h += '<p class="note">' + esc(t('s.me.notime')) + '</p>';
    h += pcards(n.plain, ['nature', 'heart', 'drive', 'gift', 'now', 'advice']);
    h += '<div id="me-ai"></div>';
    h += '<div class="tiles"><a class="tile" href="#love"><span class="ic">❤️</span><b>' + esc(t('s.card.love.t')) + '</b><span>' + esc(t('s.card.love.d')) + '</span></a><a class="tile" href="#money"><span class="ic">💰</span><b>' + esc(t('s.card.money.t')) + '</b><span>' + esc(t('s.card.money.d')) + '</span></a></div>';
    h += techBox(chartTech(n, n.v.name || t('s.home.you')));
    el.innerHTML = h;
    aiBox($('me-ai'), {
      tab: 'me', button: t('s.me.letterBtn'), title: t('s.me.letterTitle'), len: 'about 220 words in 4 short paragraphs',
      prompt: 'Write me a short personal letter (about 220 words, 4 short paragraphs, no headings): who I really am underneath, what my heart needs, my special gift and the shadow side that comes with it, and what this period of my life is asking of me. End with one warm piece of advice. Don\'t repeat what I already read on the page; go deeper.',
      suggestions: t('s.sugg.me'),
      context: () => natalDigest(n, 'NATAL CHART') + '\n\n=== ALREADY SHOWN TO THE USER (do not repeat) ===\n' + n.plain.map(x => x.text).join('\n')
    });
  }

  function renderLove(el) {
    if (!state.natal) { el.innerHTML = needProfile(); return; }
    const n = state.natal, L = state.partner;
    let h = hero(t('s.love.title')) + pcards(n.plain, ['love', 'heart']);
    let syn = null;
    h += '<div class="card" id="love-pair">';
    if (L) {
      syn = TP.synastry(n.chart, L.chart, n.v.sex || 'x', L.v.sex || 'x', n.deep, L.deep);
      const ov = syn.items[0], sc = syn.scores;
      const k = ov.pct >= 72 ? 'strong' : ov.pct >= 55 ? 'good' : ov.pct >= 40 ? 'work' : 'hard';
      const pct = T.num(ov.pct) + (['fa', 'ar', 'ur'].includes(T.lang) ? '٪' : '%');
      const meter = (key, v, f) => '<div class="meter' + (f ? ' f' : '') + '"><span>' + esc(t('s.love.m.' + key)) + '</span><div class="bar"><b style="width:' + Math.max(4, v * 10).toFixed(0) + '%"></b></div></div>';
      h += '<div class="match"><span class="names">' + esc((n.v.name || t('s.love.you')) + ' ❤️ ' + (L.v.name || t('s.love.them'))) + '</span><span class="pct">' + pct + '</span><p>' + esc(t('s.love.v.' + k)) + '</p></div>' +
        '<div class="meters">' + meter('attraction', sc.attraction) + meter('harmony', sc.harmony) + meter('durability', sc.durability) + meter('friction', sc.friction, true) + '</div>' +
        (L.v.notime ? '<p class="note" style="margin-top:12px">' + esc(t('s.love.notime')) + '</p>' : '') +
        '<p style="margin:12px 0 0;text-align:center"><button type="button" class="linkbtn" id="love-other">' + esc(t('s.love.other')) + '</button></p>';
    } else {
      h += '<h2>' + esc(t('s.love.pairTitle')) + '</h2><p class="sub">' + esc(t('s.love.pairSub')) + '</p><form class="f" id="partner-form" autocomplete="off">' +
        birthFields('p', load().partner, { name: true, nameLabel: t('s.love.pname'), timeLabel: t('s.love.ptime'), cityLabel: t('s.love.pcity') }) +
        '<button class="btn" type="submit">' + esc(t('s.love.go')) + '</button></form>';
    }
    h += '</div><div id="love-ai"></div>';
    const mine = TP.loveNatal(n.chart, n.v.sex || 'x', n.deep, Date.now());
    h += techBox((syn ? renderSections([{ id: 'synastry', title: t('ui.love.synTitle'), items: syn.items.slice(1).filter(i => !i.scores) }]) : '') + renderSections([{ id: 'lovenatal', title: t('ui.love.natalTitle'), items: mine }]));
    el.innerHTML = h;
    if ($('love-other')) $('love-other').addEventListener('click', () => { state.partner = null; paint('love', true); });
    if ($('partner-form')) $('partner-form').addEventListener('submit', e => {
      e.preventDefault();
      try {
        const { rec, ms, loc } = readBirth('p', 'person');
        save({ partner: rec });
        state.partner = castFrom(rec, 'person');
        TR.log('partner', Object.assign(birthLog(rec, loc, ms), {}));
        paint('love', true);
        $('love-pair').scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (er) { const f = $('partner-form'); const p = document.createElement('p'); p.className = 'note'; p.style.borderColor = 'var(--hard)'; p.textContent = er.message; f.insertBefore(p, f.lastElementChild); }
    });
    aiBox($('love-ai'), {
      tab: 'love', title: t('s.love.aiTitle'),
      button: t(L ? 's.love.aiPair' : 's.love.aiSolo'),
      prompt: L ? 'In about 180 words: describe our relationship. What draws us together, where we might clash, and how we can make it last?' : 'In about 150 words: what does love look like for me, what kind of person suits me, and when and how is love likely to come into my life?',
      suggestions: t(L ? 's.sugg.pair' : 's.sugg.love'),
      context: () => 'TOPIC: love, marriage and compatibility.\n' + natalDigest(n, 'PERSON A (the user) NATAL CHART') + '\n\n=== RULE-BASED LOVE READING (A) ===\n' + mine.map(i => '- ' + i.title + ': ' + i.text).join('\n') +
        (L ? '\n\n' + natalDigest(L, 'PERSON B NATAL CHART') + '\n\n=== SYNASTRY ===\ncompatibility ' + syn.items[0].pct + '%\ninter-aspects: ' + syn.links.map(l => 'A.' + l.a + ' ' + l.asp.id + ' B.' + l.b + ' ' + l.orb.toFixed(1)).join(', ') + '\n' + syn.items.map(i => '- ' + i.title + ': ' + i.text).join('\n') : '')
    });
  }

  function calIcon(k) { return { newMoon: '🌱', fullMoon: '🌕', retro: '⚠️', direct: '✅', eclipse: '🌑' }[k] || '•'; }
  function calText(e) { return e.kind === 'retro' || e.kind === 'direct' ? t('s.cal.' + e.kind + '.' + e.p) : t('s.cal.' + e.kind); }
  function renderMoney(el) {
    if (!state.natal) { el.innerHTML = needProfile(); return; }
    const n = state.natal, tz = n.chart.tz;
    const cal = TP.marketCalendar(Date.now(), 45, tz);
    let h = hero(t('s.money.title')) + pcards(n.plain, ['work', 'money']);
    h += '<div class="card"><h2>' + esc(t('s.money.days')) + '</h2><div class="days">' +
      (cal.length ? cal.map(e => '<div class="day"><span class="ic" aria-hidden="true">' + calIcon(e.kind) + '</span><b>' + esc(dayLabel(e.ms, tz)) + '</b><span>' + esc(calText(e)) + '</span></div>').join('') : '<p class="sub">' + esc(t('s.money.none')) + '</p>') + '</div></div>';
    h += '<div id="money-ai"></div><p class="note">' + esc(t('s.money.note')) + '</p>';
    const items = TP.moneyReading(n.chart, n.deep, Date.now());
    h += techBox(renderSections([{ id: 'wealth', title: t('ui.money.natalTitle'), items }, { id: 'calendar', title: t('ui.money.calTitle', { n: 45 }), items: cal }]));
    el.innerHTML = h;
    aiBox($('money-ai'), {
      tab: 'money', title: t('s.money.aiTitle'), button: t('s.money.ai'),
      prompt: 'In about 150 words: how can I earn more money, what kind of work suits me best, and what should I watch out for in the coming months?',
      suggestions: t('s.sugg.money'),
      context: () => 'TOPIC: money, career and income. Not financial advice.\n' + natalDigest(n, 'NATAL CHART') + '\n\n=== RULE-BASED MONEY READING ===\n' + items.map(i => '- ' + i.title + ': ' + i.text).join('\n') + '\n\n=== COMING DAYS ===\n' + cal.map(i => '- ' + i.title + ': ' + i.text).join('\n')
    });
  }

  /* ---------- the right time ---------- */
  const WHEN_EV = [['buy', '🛒'], ['sell', '🏷️'], ['business', '🚀'], ['contract', '✍️'], ['launch', '📣'], ['marriage', '💍'], ['travel', '✈️'], ['property', '🏠'], ['interview', '🤝']];
  function whenLoc() {
    if (state.natal) return state.natal.loc;
    const c = CITIES[+defaultCity()]; return { name: cityName(c[0]), lat: c[1], lon: c[2], tz: c[3] };
  }
  function renderWhen(el) {
    const st = load().when || {};
    const ev = st.ev || 'buy', asset = st.asset || 'gold', days = st.days || 30;
    let h = hero(t('s.when.title'), esc(t('s.when.sub')));
    h += '<form class="card f" id="when-form"><div class="field"><span class="lbl">' + esc(t('s.when.what')) + '</span><div class="picks" data-pick="w-ev">' +
      WHEN_EV.map(([k, ic]) => '<button type="button" data-v="' + k + '" aria-pressed="' + (k === ev) + '">' + ic + ' ' + esc(t('s.when.ev.' + k)) + '</button>').join('') + '</div></div>' +
      '<div class="field" id="w-assetf"' + (ev === 'buy' || ev === 'sell' ? '' : ' hidden') + '><label for="w-asset">' + esc(t('s.when.asset')) + '</label><select id="w-asset">' + Object.keys(TP.ASSETS).map(k => '<option value="' + k + '"' + (k === asset ? ' selected' : '') + '>' + esc(t('trade.asset.' + k)) + '</option>').join('') + '</select></div>' +
      '<div class="field"><span class="lbl">' + esc(t('s.when.range')) + '</span><div class="picks" data-pick="w-days">' + [14, 30, 60].map(d => '<button type="button" data-v="' + d + '" aria-pressed="' + (d === +days) + '">' + esc(t('s.when.r' + d)) + '</button>').join('') + '</div></div>' +
      '<button class="btn" type="submit">' + esc(t('s.when.go')) + '</button></form><div id="when-out" class="stack" aria-live="polite"></div>';
    el.innerHTML = h;
    $('when-form').addEventListener('pick', () => { const v = pickValue('w-ev'); $('w-assetf').hidden = !(v === 'buy' || v === 'sell'); });
    $('when-form').addEventListener('submit', e => { e.preventDefault(); computeWhen(); });
    if (state.when) showWhen();
  }
  function computeWhen() {
    const out = $('when-out');
    const ev = pickValue('w-ev') || 'buy', asset = $('w-asset').value, days = +(pickValue('w-days') || 30);
    const loc = whenLoc();
    out.innerHTML = '<p class="status"><span class="spin"></span> ' + esc(t('s.loading')) + '</p>';
    const btn = document.querySelector('#when-form .btn'); btn.disabled = true;
    save({ when: { ev, asset, days } });
    setTimeout(() => {
      try {
        const trade = ev === 'buy' || ev === 'sell';
        const start = Math.ceil(Date.now() / 600000) * 600000;
        let deal = null;
        if (trade) deal = TP.dealHorary(E.castChart({ ms: Date.now(), lat: loc.lat, lon: loc.lon, tz: loc.tz, houseSystem: 'regio' }), ev, asset);
        const r = H.findElections(trade ? TP.tradeEvent(ev, asset) : ev, start, days, loc.lat, loc.lon, loc.tz, { daytime: true, top: 5 });
        if (!r.best.length) throw new Error(t('err.noSlots'));
        state.when = { ev, asset, days, loc, deal, r };
        TR.log(trade ? 'trade' : 'elect', trade ? { action: ev, asset, days, city: loc.name, verdict: deal.verdict } : { type: ev, days, city: loc.name });
        showWhen();
        out.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (er) { out.innerHTML = errorCard(er.message); console.error(er); }
      btn.disabled = false;
    }, 30);
  }
  function showWhen() {
    const S = state.when, out = $('when-out');
    if (!S || !out) return;
    const { r, loc, deal } = S, tz = loc.tz;
    I.setTz(tz);
    let h = '';
    if (deal) h += '<div class="card nowbox ' + deal.tone + '"><span class="ic" aria-hidden="true">' + (deal.tone === 'good' ? '🟢' : deal.tone === 'hard' ? '🔴' : '🟡') + '</span><div><small class="sub">' + esc(t('s.when.now')) + '</small><p>' + esc(t('s.when.nowv.' + deal.key)) + '</p></div></div>';
    const max = r.best[0].score;
    const stars = s => '★'.repeat(s >= max * 0.85 ? 3 : s >= max * 0.6 ? 2 : 1).padEnd(3, '☆');
    h += '<div class="card"><h2>' + esc(t('s.when.best')) + '</h2>' + r.best.map((b, i) =>
      '<div class="slot"><b>' + esc(dayLabel(b.ms, tz)) + (i === 0 ? '<span class="top1">' + esc(t('s.when.top')) + '</span>' : '') + '</b><span class="t">' + esc(t('s.when.window', { from: hm(b.window[0], tz), to: hm(b.window[1], tz) })) + '</span><span class="stars" aria-hidden="true">' + stars(b.score) + '</span></div>').join('') + '</div>';
    if (r.avoid) h += '<p class="note">' + esc(t('s.when.avoid', { date: dayLabel(r.avoid.ms, tz) })) + '</p>';
    h += '<a class="btn ghost" href="#ask">💬 ' + esc(t('s.when.ask')) + '</a>';
    let tech = r.best.map(b => '<div class="item"><h4>' + I.fmtDate(b.ms, tz) + '</h4><p>' + esc(b.reasons.map(H.reasonText).join(' · ')) + '</p></div>').join('');
    if (deal) tech = '<p>' + esc(deal.verdict) + '</p><p>' + esc(deal.sig) + '</p>' + renderSections([{ id: 'dealtests', title: t('ui.horary.testTitle'), items: deal.tests.map(x => ({ text: x.text, tone: x.tone })) }]) + tech;
    h += techBox(tech + '<p class="secnote">' + esc(t('ui.elect.rules')) + '</p>');
    out.innerHTML = h;
  }

  /* ---------- ask ---------- */
  const chat = { history: [], busy: false, ctrl: null };
  function loadChat() { try { chat.history = JSON.parse(localStorage.getItem(STORE + '.chat') || '[]').slice(-30); } catch (e) { chat.history = []; } }
  function saveChat() { try { localStorage.setItem(STORE + '.chat', JSON.stringify(chat.history.slice(-30))); } catch (e) { /* optional */ } }
  function chatLogHtml() {
    const bot = html => '<div class="msg bot"><span class="from">' + esc(t('s.ask.me')) + '</span>' + html + '</div>';
    if (!chat.history.length) return bot(md(t('s.ask.welcome')));
    return chat.history.map(m => m.role === 'user' ? '<div class="msg user">' + esc(m.text) + '</div>' : bot(md(m.text))).join('');
  }
  function renderAsk(el) {
    el.innerHTML = hero(t('s.ask.title'), esc(t('s.ask.sub'))) +
      (!state.natal ? '<p class="note"><a href="#profile">' + esc(t('s.ask.tip')) + '</a></p>' : '') +
      '<div class="chatlog" id="chat-log" aria-live="polite">' + chatLogHtml() + '</div>' +
      '<div class="chips" id="chat-sugg"' + (chat.history.length ? ' hidden' : '') + '>' + t('s.ask.sugg').map(q => '<button type="button" class="chip">' + esc(q) + '</button>').join('') + '</div>' +
      '<form class="chatform" id="chat-form" autocomplete="off"><textarea id="chat-input" rows="2" placeholder="' + esc(t('s.ask.ph')) + '" aria-label="' + esc(t('s.ask.ph')) + '"></textarea><button class="btn" type="submit">' + esc(t('s.ask.send')) + '</button></form>' +
      (chat.history.length ? '<button type="button" class="linkbtn" id="chat-clear">' + esc(t('s.ask.clear')) + '</button>' : '');
    $('chat-form').addEventListener('submit', e => { e.preventDefault(); const q = $('chat-input').value; $('chat-input').value = ''; chatAsk(q); });
    $('chat-input').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('chat-form').requestSubmit(); } });
    $('chat-sugg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) chatAsk(b.textContent); });
    if ($('chat-clear')) $('chat-clear').addEventListener('click', () => { chat.history = []; saveChat(); paint('ask', true); });
  }
  function ruleFallback(rule) {
    const j = rule.j;
    const tone = j.tone || (j.score >= 1 ? 'good' : j.score <= -1 ? 'hard' : 'mixed');
    let s = t('s.ask.fb.' + tone);
    if (j.timing && j.timing.date) s += ' ' + t('s.ask.fb.when', { date: I.fmtDate(j.timing.date, rule.chart.tz, false) });
    return s;
  }
  function chatContext(rule) {
    const parts = ['TOPIC: open conversation with the user. Answer the latest question; use whichever data below is relevant.'];
    if (state.natal) parts.push(natalDigest(state.natal, "USER'S NATAL CHART"));
    else parts.push('(The user has not entered their birthday; if the question really needs it, kindly suggest adding it on the home page.)');
    if (state.partner) parts.push(natalDigest(state.partner, 'PARTNER NATAL CHART'));
    parts.push(I.chartDigest(rule.chart, 'HORARY CHART FOR THIS QUESTION (cast now, Regiomontanus)') + '\nrule-based horary verdict: ' + rule.j.verdict + ' (topic ' + rule.j.type.id + ', score ' + rule.j.score.toFixed(1) + ')\n' + rule.j.testimonies.map(x => '- ' + x.text).join('\n'));
    return parts.join('\n\n');
  }
  async function chatAsk(q) {
    q = (q || '').trim();
    if (!q || chat.busy) return;
    const loc = whenLoc();
    chat.history.push({ role: 'user', text: q });
    $('chat-sugg').hidden = true;
    const log = $('chat-log');
    log.innerHTML = chatLogHtml();
    const rule = TP.ruleAnswer(q, loc, state.natal || null);
    const sample = await samplePromise;
    if (!sample) {
      const a = ruleFallback(rule);
      chat.history.push({ role: 'bot', text: a });
      TR.log('chat', { q, a, rule: true, verdict: rule.j.verdict });
      saveChat(); paint('ask', true); $('chat-log').lastElementChild.scrollIntoView({ block: 'nearest' });
      return;
    }
    chat.busy = true;
    const bubble = document.createElement('div');
    bubble.className = 'msg bot';
    bubble.innerHTML = '<span class="from">' + esc(t('s.ask.me')) + '</span><p class="status"><span class="spin"></span> ' + esc(t('s.ai.thinking')) + '</p>';
    log.appendChild(bubble);
    bubble.scrollIntoView({ block: 'nearest' });
    const ctx = sysPrompt() + '\n\n=== DATA ===\n' + chatContext(rule) + '\n\nToday: ' + new Date().toISOString().slice(0, 10);
    const prior = chat.history.slice(0, -1).slice(-8);
    const msgs = [];
    prior.forEach(m => {
      if (m.role === 'user') { if (!msgs.length || msgs[msgs.length - 1].role === 'assistant') msgs.push({ role: 'user', content: m.text }); }
      else if (msgs.length && msgs[msgs.length - 1].role === 'user') msgs.push({ role: 'assistant', content: m.text });
    });
    while (msgs.length && msgs[0].role !== 'user') msgs.shift();
    if (msgs.length && msgs[msgs.length - 1].role === 'user') msgs.pop();
    msgs.push({ role: 'user', content: q });
    msgs[0] = { role: 'user', content: ctx + '\n\n=== QUESTION ===\n' + msgs[0].content };
    if (chat.ctrl) chat.ctrl.abort();
    chat.ctrl = new AbortController();
    try {
      const res = await sample(msgs, { onText: ({ text }) => { bubble.innerHTML = '<span class="from">' + esc(t('s.ask.me')) + '</span>' + md(text); }, signal: chat.ctrl.signal, cache: false, modelTier: 'complex' });
      chat.history.push({ role: 'bot', text: res.text });
      TR.log('chat', { q, a: res.text });
    } catch (e) {
      const code = e && e.code;
      if (code !== 'cancelled') chat.history.push({ role: 'bot', text: (e && e.text ? e.text + '\n\n' : '') + ruleFallback(rule) });
    } finally {
      chat.busy = false; saveChat();
      if (currentView() === 'ask') { paint('ask', true); const last = $('chat-log').lastElementChild; if (last) last.scrollIntoView({ block: 'nearest' }); }
    }
  }

  /* ---------- more ---------- */
  function renderMore(el) {
    const tile = (href, ic, tt, d) => '<a class="tile wide" href="' + href + '"><span class="ic" aria-hidden="true">' + ic + '</span><b>' + esc(t(tt)) + '</b><span>' + esc(t(d)) + '</span></a>';
    el.innerHTML = hero(t('s.more.title')) + '<div class="tiles">' + tile('#when', '🗓️', 's.card.when.t', 's.card.when.d') +
      tile('#biz', '🏢', 's.more.biz.t', 's.more.biz.d') + tile('#world', '🌍', 's.more.world.t', 's.more.world.d') + tile('#lib', '📚', 's.more.lib.t', 's.more.lib.d') +
      (state.owner ? tile('#visitors', '👥', 's.more.visitors.t', 's.more.visitors.d') : '') + '</div>';
  }

  function renderBiz(el) {
    const st = load().biz;
    let h = hero(t('s.biz.title'), esc(t('s.biz.sub')));
    h += '<form class="card f" id="biz-form" autocomplete="off">' + birthFields('b', st, { name: true, nameLabel: t('s.f.bizName'), dateLabel: t('s.f.bizDate'), timeLabel: t('s.f.bizTime'), cityLabel: t('s.f.bizCity'), future: true }) +
      '<button class="btn" type="submit">' + esc(t('s.f.bizGo')) + '</button></form><div id="biz-out" class="stack"></div>';
    el.innerHTML = h;
    $('biz-form').addEventListener('submit', e => {
      e.preventDefault();
      try {
        const { rec, ms, loc } = readBirth('b', 'business');
        save({ biz: rec });
        state.biz = castFrom(rec, 'business');
        state.biz.plain = PL.plainReading(state.biz.chart, state.biz.deep, { kind: 'business' });
        TR.log('natal', birthLog(Object.assign({ kind: 'business' }, rec), loc, ms));
        showBiz();
        $('biz-out').scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (er) { $('biz-out').innerHTML = errorCard(er.message); }
    });
    if (state.biz) showBiz();
  }
  function showBiz() {
    const b = state.biz, out = $('biz-out');
    if (!b || !out) return;
    out.innerHTML = '<div class="hero"><h1>🏢 ' + esc(b.v.name || t('s.biz.title')) + '</h1><p>' + esc(I.fmtDate(b.chart.ms, b.chart.tz, false) + ' · ' + b.loc.name) + '</p></div>' +
      pcards(b.plain, ['nature', 'gift', 'work', 'money', 'now', 'advice'], true) + '<div id="biz-ai"></div>' + techBox(chartTech(b, b.v.name || t('s.biz.title')));
    aiBox($('biz-ai'), {
      tab: 'biz', title: t('s.money.aiTitle'), button: t('s.biz.ai'),
      prompt: 'In about 180 words: describe this business\'s character, its strengths and its risks, and what the coming year looks like for it.',
      suggestions: t('s.sugg.biz'),
      context: () => natalDigest(b, 'BUSINESS FOUNDING CHART')
    });
  }

  function renderWorld(el) {
    const st = load().world || {};
    const y0 = new Date().getUTCFullYear() - (new Date().getUTCMonth() < 2 ? 1 : 0);
    el.innerHTML = hero(t('s.world.title'), esc(t('s.more.world.d'))) +
      '<form class="card f" id="world-form"><div class="row2"><div class="field"><label for="wy-year">' + esc(t('s.f.year')) + '</label><input type="number" id="wy-year" value="' + (st.year || y0) + '"></div>' +
      '<div class="field"><label for="wy-city">' + esc(t('ui.world.city')) + '</label><select id="wy-city" class="city">' + cityOptions(st.city || defaultCity()).replace(/<option value="manual"[^<]*<\/option>/, '') + '</select></div></div>' +
      '<button class="btn" type="submit">' + esc(t('ui.world.submit')) + '</button></form><div id="world-out" class="stack"></div>';
    $('world-form').addEventListener('submit', e => { e.preventDefault(); computeWorld(); });
    if (state.world) computeWorld(true);
  }
  function computeWorld(again) {
    const out = $('world-out');
    const year = +$('wy-year').value, ci = $('wy-city').value, c = CITIES[+ci];
    if (!(year >= 1850 && year <= 2150)) { out.innerHTML = errorCard(t('err.wyear')); return; }
    const loc = { name: cityName(c[0]), lat: c[1], lon: c[2], tz: c[3] };
    save({ world: { year, city: ci } });
    out.innerHTML = '<p class="status"><span class="spin"></span> ' + esc(t('s.loading')) + '</p>';
    setTimeout(() => {
      try {
        const r = M.analyzeYear(year, loc.lat, loc.lon, loc.tz, 'placidus');
        state.world = { year, loc };
        if (!again) TR.log('world', { year, city: loc.name });
        out.innerHTML = '<div class="hero"><h1>' + esc(t('ui.world.head', { py: year - 621, year, city: loc.name })) + '</h1></div><div id="world-ai"></div>' +
          '<p class="note">' + esc(t('s.world.pro')) + '</p>' + techBox(W.drawWheel(r.chart, { label: t('ui.world.chart') }) + renderSections(r.sections));
        aiBox($('world-ai'), {
          tab: 'world', title: t('s.money.aiTitle'), button: t('s.world.ai'),
          prompt: 'In about 180 words and very simple words: what does this year look like for this country? The general mood, the economy, people\'s lives, and what to watch out for.',
          suggestions: t('s.sugg.world'),
          context: () => I.chartDigest(r.chart, 'ARIES INGRESS (Nowruz) ' + year + ' for ' + loc.name) + '\n\n=== RULE-BASED JUDGMENTS ===\n' + r.sections.map(s => s.title + ':\n' + s.items.map(i => '- ' + (i.title ? i.title + ': ' : '') + i.text).join('\n')).join('\n')
        });
      } catch (er) { out.innerHTML = errorCard(er.message); console.error(er); }
    }, 30);
  }

  function renderLib(el) {
    const trads = t('sources');
    let h = hero(t('s.more.lib.t'), esc(t('s.more.lib.d')));
    h += '<div class="card"><h2>' + esc(t('lib.sourcesTitle')) + '</h2>' + trads.map(tr => '<h4 class="trad">' + esc(tr.tradition) + '</h4><dl>' + tr.books.map(s => '<dt>' + esc(s.name) + '<span class="era">' + esc(s.era) + '</span></dt><dd>' + esc(s.use) + '</dd>').join('') + '</dl>').join('') + '</div>';
    h += '<div class="card"><h2>' + esc(t('lib.methodsTitle')) + '</h2>' + t('lib.methods').map(m => '<div class="item"><h4>' + esc(m[0]) + '</h4><p>' + esc(m[1]) + '</p></div>').join('') + '</div>';
    h += '<div class="card"><h2>' + esc(t('lib.validityTitle')) + '</h2><p>' + esc(t('lib.validity')) + '</p></div>';
    el.innerHTML = h;
  }

  /* ---------- owner: visitors (inside Claude) ---------- */
  const fmtTs = ms => { try { return new Intl.DateTimeFormat(T.locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ms)); } catch (e) { return new Date(ms).toISOString(); } };
  function evLine(e) {
    const d = e.data || {};
    let body = '';
    if (e.kind === 'natal' || e.kind === 'partner') body = [d.name, d.input + (d.cal === 'j' ? ' (' + t('ui.natal.jalali') + ')' : ''), d.notime ? t('ui.natal.notime') : d.time, d.city, d.sex, d.kind === 'business' ? t('ui.natal.business') : ''].filter(Boolean).join(' · ');
    else if (e.kind === 'horary') body = d.q + '\n→ ' + (d.verdict || '');
    else if (e.kind === 'chat' || e.kind === 'ask') body = (d.tab ? '[' + d.tab + '] ' : '') + d.q + '\n→ ' + (d.a || '');
    else if (e.kind === 'trade') body = [d.action, d.asset, d.verdict].filter(Boolean).join(' · ');
    else body = Object.keys(d).map(k => k + ': ' + (typeof d[k] === 'object' ? JSON.stringify(d[k]) : d[k])).join(' · ');
    return '<div class="ev"><small>' + esc(fmtTs(e.t)) + ' · ' + esc(t('dash.kind.' + e.kind)) + ' · ' + esc(e.lang || '') + '</small><p>' + esc(body) + '</p></div>';
  }
  async function renderVisitors(el) {
    el.innerHTML = '<p class="status"><span class="spin"></span> ' + esc(t('dash.loading')) + '</p>';
    let res = null;
    try { res = await TR.ownerData(); } catch (e) { res = null; }
    if (!res) { el.innerHTML = '<p class="note">' + esc(t('dash.noAccess')) + '</p>'; return; }
    const rows = res.rows.sort((a, b) => (b.last || 0) - (a.last || 0));
    const all = rows.flatMap(r => r.events || []);
    const kinds = {}, langs = {};
    all.forEach(e => { kinds[e.kind] = (kinds[e.kind] || 0) + 1; langs[e.lang] = (langs[e.lang] || 0) + 1; });
    const kpi = (k, v) => '<div><span>' + esc(t('dash.k.' + k)) + '</span><b>' + T.num(v) + '</b></div>';
    let h = hero(t('dash.title'), esc(t('dash.meta')));
    h += '<div class="dash-kpis">' + kpi('visitors', rows.length) + kpi('charts', rows.filter(r => r.natal).length) + kpi('questions', (kinds.horary || 0) + (kinds.chat || 0) + (kinds.ask || 0)) + kpi('events', all.length) + '</div>';
    h += '<p class="status">' + esc(t('dash.langs')) + ': ' + Object.keys(langs).sort((a, b) => langs[b] - langs[a]).map(l => esc(l) + ' ' + T.num(langs[l])).join(' · ') + '</p>';
    if (!rows.length) h += '<p class="note">' + esc(t('dash.empty')) + '</p>';
    rows.forEach(r => {
      const p = res.profiles[r.id] || {};
      const n = r.natal;
      h += '<details class="vrow"><summary><b>' + esc(p.name || p.email || t('dash.anon')) + '</b>' + (p.email && p.name ? '<span>' + esc(p.email) + '</span>' : '') +
        '<span>' + esc(t('dash.seen', { first: fmtTs(r.first || r.last), last: fmtTs(r.last || r.first) })) + '</span><span>' + esc(t('dash.count', { n: r.count || (r.events || []).length })) + '</span>' +
        (n ? '<span>' + esc([n.name, n.input, n.time, n.city].filter(Boolean).join(' · ')) + '</span>' : '') + '</summary>' + (r.events || []).slice().reverse().map(evLine).join('') + '</details>';
    });
    el.innerHTML = h;
  }

  /* ---------- routing ---------- */
  const VIEWS = { home: renderHome, profile: renderProfile, me: renderMe, love: renderLove, money: renderMoney, ask: renderAsk, when: renderWhen, more: renderMore, biz: renderBiz, world: renderWorld, lib: renderLib, visitors: renderVisitors };
  const TAB_OF = { home: 'home', profile: 'home', me: 'me', love: 'love', money: 'money', ask: 'ask' };
  const seen = {};
  function currentView() { const v = location.hash.replace('#', ''); return VIEWS[v] ? v : 'home'; }
  // draw a page; pages that hold work in progress (an answer, a form) are kept until something they depend on changes
  function paint(v, force) {
    const key = T.lang + '|' + (state.natal ? state.natal.chart.ms + ':' + state.natal.v.name : '-') + '|' + (state.partner ? state.partner.chart.ms : '-') + '|' + state.owner;
    if (!force && state.painted[v] === key && !['home', 'profile', 'visitors'].includes(v)) return;
    state.painted[v] = key;
    VIEWS[v]($('view-' + v));
    TR.relabel();
  }
  function show() {
    const v = currentView();
    Object.keys(VIEWS).forEach(x => { $('view-' + x).hidden = x !== v; });
    document.querySelectorAll('.tabbar a').forEach(a => { if (a.dataset.tab === TAB_OF[v]) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    paint(v);
    window.scrollTo(0, 0);
    if (!seen[v]) { seen[v] = true; TR.log('view', { view: v }); }
  }

  /* ---------- language ---------- */
  function applyStatic() {
    const root = document.documentElement;
    root.lang = T.lang; root.dir = T.dir;
    document.title = t('ui.brand');
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelector('.tabbar').setAttribute('aria-label', t('ui.sections'));
    $('lang').setAttribute('aria-label', t('ui.language'));
    if (FONT_EXTRA[T.lang] && !document.querySelector('link[data-font="' + T.lang + '"]')) {
      const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = FONT_EXTRA[T.lang]; l.dataset.font = T.lang; document.head.appendChild(l);
    }
    $('lang').innerHTML = T.LANGS.filter(l => T.READY.includes(l[0])).map(l => '<option value="' + l[0] + '">' + l[1] + '</option>').join('');
    $('lang').value = T.lang;
  }
  function pickLang() {
    const st = load();
    if (st.lang && T.READY.includes(st.lang)) return st.lang;
    const nav = (navigator.languages || [navigator.language || 'en']).map(x => String(x).slice(0, 2).toLowerCase());
    for (const n of nav) if (T.READY.includes(n)) return n;
    return 'en';
  }
  function setLanguage(l, cb) { T.load(l, err => { T.setLang(err ? 'en' : l); save({ lang: T.lang }); cb && cb(); }); }
  function restore() {
    const st = load();
    state.natal = null; state.partner = null; state.biz = null;
    try { if (st.natal && st.natal.y) setNatal(st.natal); } catch (e) { console.error(e); }
    try { if (st.partner && st.partner.y) state.partner = castFrom(st.partner, 'person'); } catch (e) { console.error(e); }
    state.painted = {};
  }

  function init() {
    loadChat();
    $('lang').addEventListener('change', () => setLanguage($('lang').value, () => {
      applyStatic();
      restore(); // names of places and signs are re-read in the new language
      if (state.biz) state.biz = null;
      show();
      TR.log('lang', { lang: T.lang });
    }));
    window.addEventListener('hashchange', show);
    window.onTrackReady = v => { if (v === 'yes') TR.log('visit', { view: currentView(), ref: document.referrer ? document.referrer.slice(0, 200) : '' }); };
    setLanguage(pickLang(), () => {
      applyStatic();
      restore();
      show();
      TR.init();
      TR.isOwner().then(o => { if (o) { state.owner = true; if (currentView() === 'more') paint('more', true); } });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
