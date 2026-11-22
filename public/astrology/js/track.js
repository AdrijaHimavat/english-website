/* Akhtarnameh — consent-based visitor log.
 * A short notice under each form says entries are saved, with a one-click opt-out. Two backends:
 *  - on the website: POST to window.AKHTAR_LOG_ENDPOINT (a Next.js route that writes to Supabase);
 *  - inside Claude: the artifact's own database (one document per visitor under visits/<id>).
 * The owner reads the log in /admin/astrology (website) or the Visitors tab (Claude).
 */
(function (G) {
  'use strict';
  const T = G.I18N;
  const t = (k, p) => T.t(k, p);
  const CKEY = 'akhtarnameh.consent', VKEY = 'akhtarnameh.visitor';
  const MAX_EVENTS = 150, MAX_STR = 1500;
  const get = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const put = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* optional */ } };
  let consent = get(CKEY); // 'yes' | 'no' | null
  const endpoint = G.AKHTAR_LOG_ENDPOINT || null;
  const pending = []; // events logged before consent is known are dropped, not queued

  function uuid() {
    if (G.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); });
  }
  let visitor = get(VKEY);
  if (!visitor || !/^[0-9a-f-]{36}$/.test(visitor)) { visitor = uuid(); put(VKEY, visitor); }

  function clean(v, depth) {
    depth = depth || 0;
    if (v === null || v === undefined) return null;
    if (typeof v === 'string') return v.length > MAX_STR ? v.slice(0, MAX_STR) + '…' : v;
    if (typeof v === 'number') return isFinite(v) ? Math.round(v * 10000) / 10000 : null;
    if (typeof v === 'boolean') return v;
    if (Array.isArray(v)) return depth > 3 ? null : v.slice(0, 20).map(x => clean(x, depth + 1));
    if (typeof v === 'object') { if (depth > 3) return null; const o = {}; Object.keys(v).slice(0, 30).forEach(k => { o[k] = clean(v[k], depth + 1); }); return o; }
    return null;
  }

  /* ---------- Claude artifact database ---------- */
  const cap = (G.claude && typeof G.claude.use === 'function');
  const dbP = cap ? G.claude.use('db').catch(() => null) : Promise.resolve(null);
  const userP = cap ? G.claude.use('user').catch(() => null) : Promise.resolve(null);
  let docState = null, writing = Promise.resolve(), dbBroken = false;
  async function dbRef() {
    const db = await dbP, user = await userP;
    if (!db || !user) return null;
    const id = await user.id();
    if (!id) return null;
    return db.doc('visits/' + id);
  }
  async function dbAppend(ev) {
    if (dbBroken) return;
    const ref = await dbRef();
    if (!ref) return;
    writing = writing.then(async () => {
      try {
        if (!docState) {
          const snap = await ref.get();
          docState = snap.exists ? JSON.parse(JSON.stringify(snap.data())) : { first: Date.now(), events: [] };
          if (!Array.isArray(docState.events)) docState.events = [];
        }
        docState.events.push(ev);
        if (docState.events.length > MAX_EVENTS) docState.events = docState.events.slice(-MAX_EVENTS);
        docState.last = Date.now();
        docState.count = (docState.count || 0) + 1;
        docState.visitor = visitor;
        docState.lang = ev.lang;
        if (ev.kind === 'natal') docState.natal = ev.data;
        if (ev.kind === 'partner') docState.partner = ev.data;
        await ref.set(docState);
      } catch (e) {
        if (e && (e.code === 'invalid_argument' || e.code === 'not_granted' || e.code === 'revoked')) dbBroken = true;
      }
    });
    return writing;
  }

  /* ---------- website endpoint ---------- */
  function postSite(ev) {
    try {
      fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ visitor, kind: ev.kind, lang: ev.lang, data: ev.data }), keepalive: true }).catch(() => {});
    } catch (e) { /* best effort */ }
  }

  function log(kind, data) {
    if (consent !== 'yes') return;
    const ev = { t: Date.now(), kind, lang: T.lang, data: clean(data || {}) };
    if (endpoint) postSite(ev);
    dbAppend(ev);
  }

  /* ---------- notice: one quiet line under the forms, with a way to opt out ---------- */
  async function available() {
    if (endpoint) return true;
    const db = await dbP, user = await userP;
    if (!db || !user) return false;
    try { const w = await user.can('data.write'); return w !== false; } catch (e) { return true; }
  }
  const FORMS = ['natal-form', 'love-form', 'horary-form', 'chat-form', 'trade-form'];
  function renderNotes() {
    FORMS.forEach(id => {
      const f = document.getElementById(id);
      if (!f) return;
      let n = f.parentNode.querySelector('.privnote[data-for="' + id + '"]');
      if (!n) { n = document.createElement('p'); n.className = 'privnote'; n.dataset.for = id; f.insertAdjacentElement('afterend', n); }
      const on = consent !== 'no';
      n.innerHTML = '<span></span> <button type="button" class="linkbtn"></button>';
      n.querySelector('span').textContent = t(on ? 'trackShort.note' : 'trackShort.off');
      const b = n.querySelector('button');
      b.textContent = t(on ? 'trackShort.stop' : 'trackShort.start');
      b.addEventListener('click', () => setConsent(on ? 'no' : 'yes'));
    });
  }
  function setConsent(v) {
    consent = v; put(CKEY, v);
    renderNotes();
    if (v === 'yes') log('consent', { ua: navigator.userAgent.slice(0, 160), tz: (Intl.DateTimeFormat().resolvedOptions().timeZone || '') });
  }
  let ready = false;
  async function init() {
    if (!(await available())) { consent = 'no'; return; }
    ready = true;
    if (consent === null) { consent = 'yes'; put(CKEY, 'yes'); log('consent', { ua: navigator.userAgent.slice(0, 160), tz: (Intl.DateTimeFormat().resolvedOptions().timeZone || ''), mode: 'notice' }); }
    renderNotes();
    if (typeof G.onTrackReady === 'function') G.onTrackReady(consent);
  }
  function relabel() { if (ready) renderNotes(); }

  /* ---------- owner view (Claude) ---------- */
  async function ownerData() {
    const db = await dbP, user = await userP;
    if (!db || !user) return null;
    let owner = false;
    try { owner = await user.isOwner(); } catch (e) { owner = false; }
    if (!owner) return null;
    const snap = await db.collection('visits').get();
    const rows = snap.docs.filter(d => d.exists).map(d => Object.assign({ id: d.id }, d.data()));
    let profiles = {};
    try { profiles = await user.profiles(rows.map(r => r.id)); } catch (e) { profiles = {}; }
    return { rows, profiles };
  }
  async function isOwner() {
    const user = await userP;
    if (!user) return false;
    try { return !!(await user.isOwner()); } catch (e) { return false; }
  }

  G.Track = { log, init, relabel, ownerData, isOwner, get consent() { return consent; }, visitor };
})(typeof window !== 'undefined' ? window : globalThis);
