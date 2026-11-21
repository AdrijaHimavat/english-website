/* Akhtarnameh — i18n core
 * Catalogs live in lang/<code>.js and register themselves on I18N_DATA.
 * English is the master catalog and the fallback for any missing key.
 */
(function (G) {
  'use strict';
  const DATA = G.I18N_DATA = G.I18N_DATA || {};
  // [code, native name, direction, BCP-47 locale, English name for the AI prompt]
  const LANGS = [
    ['fa', 'فارسی', 'rtl', 'fa-IR', 'Persian (Farsi)'],
    ['en', 'English', 'ltr', 'en-GB', 'English'],
    ['ar', 'العربية', 'rtl', 'ar', 'Arabic'],
    ['tr', 'Türkçe', 'ltr', 'tr-TR', 'Turkish'],
    ['es', 'Español', 'ltr', 'es-ES', 'Spanish'],
    ['fr', 'Français', 'ltr', 'fr-FR', 'French'],
    ['de', 'Deutsch', 'ltr', 'de-DE', 'German'],
    ['ru', 'Русский', 'ltr', 'ru-RU', 'Russian'],
    ['zh', '中文', 'ltr', 'zh-CN', 'Simplified Chinese'],
    ['hi', 'हिन्दी', 'ltr', 'hi-IN', 'Hindi'],
    ['pt', 'Português', 'ltr', 'pt-BR', 'Portuguese'],
    ['ur', 'اردو', 'rtl', 'ur-PK', 'Urdu'],
    ['ja', '日本語', 'ltr', 'ja-JP', 'Japanese'],
    ['ko', '한국어', 'ltr', 'ko-KR', 'Korean'],
    ['it', 'Italiano', 'ltr', 'it-IT', 'Italian'],
    ['id', 'Bahasa Indonesia', 'ltr', 'id-ID', 'Indonesian']
  ];
  // languages whose catalogs ship with this build (the selector lists only these)
  const READY = ['fa', 'en', 'ar', 'tr', 'es', 'fr', 'de', 'ru', 'zh', 'hi', 'pt', 'id', 'ja', 'ur', 'it'];
  const DIGITS = { fa: '۰۱۲۳۴۵۶۷۸۹', ar: '٠١٢٣٤٥٦٧٨٩' };
  let lang = 'en';
  const nfCache = {};

  function info(l) { return LANGS.find(x => x[0] === (l || lang)) || LANGS[1]; }
  function get(obj, key) {
    if (!obj) return undefined;
    const parts = key.split('.');
    let o = obj;
    for (const p of parts) { if (o == null) return undefined; o = o[p]; }
    return o;
  }
  function digits(s) {
    const d = DIGITS[lang];
    return d ? String(s).replace(/[0-9]/g, x => d[x]) : String(s);
  }
  function num(n, dec) {
    if (typeof n !== 'number' || !isFinite(n)) return String(n);
    dec = dec || 0;
    const k = lang + ':' + dec;
    let f = nfCache[k];
    if (!f) {
      const loc = lang === 'ar' ? 'ar-EG' : info()[3];
      f = nfCache[k] = new Intl.NumberFormat(loc, { useGrouping: false, minimumFractionDigits: dec, maximumFractionDigits: dec });
    }
    return f.format(n);
  }
  function raw(key, l) {
    let v = get(DATA[l || lang], key);
    if (v === undefined || v === null || v === '') v = get(DATA.en, key);
    return v;
  }
  function t(key, p) {
    const v = raw(key);
    if (v === undefined) return key;
    if (typeof v !== 'string') return v;
    if (!p) return v;
    return v.replace(/\{(\w+)\}/g, (m, k) => {
      if (!(k in p)) return m;
      const x = p[k];
      return typeof x === 'number' ? num(x) : String(x);
    });
  }
  function has(key) { return raw(key) !== undefined; }
  function list(arr) {
    arr = arr.filter(Boolean);
    try { return new Intl.ListFormat(info()[3], { style: 'long', type: 'conjunction' }).format(arr); }
    catch (e) { return arr.join(', '); }
  }
  function setLang(l) { if (LANGS.some(x => x[0] === l)) lang = l; }
  function load(l, cb) {
    if (DATA[l] || typeof document === 'undefined') { cb && cb(); return; }
    const s = document.createElement('script');
    s.src = 'lang/' + l + '.js';
    s.onload = () => cb && cb();
    s.onerror = () => cb && cb(new Error('load failed'));
    document.head.appendChild(s);
  }

  G.I18N = {
    LANGS, READY, t, has, raw, num, digits, list, setLang, load, info,
    get lang() { return lang; },
    get dir() { return info()[2]; },
    get locale() { return info()[3]; },
    get english() { return info()[4]; }
  };
})(typeof window !== 'undefined' ? window : globalThis);
