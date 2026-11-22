/* Akhtarnameh — the plain-language reading.
 * Turns the technical judgment into warm, readable paragraphs with no jargon, degrees or scores.
 * The technical sections stay available underneath for those who want them.
 */
(function (G) {
  'use strict';
  const KB = G.KB, E = G.AstroEngine, I = G.Interpret, T = G.I18N;
  const t = (k, p) => T.t(k, p);
  const signOf = E.signOf;

  function plainReading(chart, deep, opts) {
    opts = opts || {};
    const P = chart.planets, out = [];
    const business = opts.kind === 'business';
    const asc = signOf(chart.asc);
    const tone = total => total >= 4 ? 'ease' : total >= -3 ? 'work' : 'hard';
    const temp = E.temperament(chart);

    // who you are
    out.push({ key: 'nature', title: t(business ? 'plain.h.identity' : 'plain.h.nature'), text: business ? t('signs.' + asc + '.asc') : t('plain.asc.' + asc) + ' ' + t('plain.temp.' + temp.key) });
    if (!business) {
      out.push({ key: 'heart', title: t('plain.h.heart'), text: t('plain.moon.' + P.moon.sign) });
      out.push({ key: 'drive', title: t('plain.h.drive'), text: t('plain.sun.' + P.sun.sign) });
    }
    // greatest gift: the planet independent systems agree on, else the strongest
    const gift = (deep && deep.syn.keyPlanets[0]) || chart.strongest[0];
    out.push({ key: 'gift', title: t(business ? 'plain.h.edge' : 'plain.h.gift'), text: t('plain.gift.' + gift) + ' ' + t('plain.giftTone.' + tone(P[gift].total)) });
    if (!business) {
      // love
      const venusEl = KB.SIGNS[P.venus.sign].el, dsc = signOf(chart.cusps[7]);
      const l7 = chart.houseRulers[7];
      let ease = 0;
      const asp = (a, b, o) => { const d = E.sep(a, b); return KB.ASPECTS.find(x => Math.abs(d - x.angle) <= o); };
      const sv = asp(P.saturn.lon, P.venus.lon, 6); if (sv && sv.nature !== 'easy') ease--;
      const jv = asp(P.jupiter.lon, P.venus.lon, 6); if (jv && jv.nature !== 'hard') ease++;
      if (P.venus.retro) ease--;
      if (P.saturn.house === 7) ease--;
      if (P.jupiter.house === 7 || P.venus.house === 7) ease++;
      if ([6, 8, 12].includes(P[l7].house)) ease--; else if (P[l7].total > 0) ease++;
      out.push({ key: 'love', title: t('plain.h.love'), text: t('plain.loveStyle.' + venusEl) + ' ' + t('plain.partner', { who: t('plain.partnerSign.' + dsc) }) + ' ' + t(ease > 0 ? 'plain.loveEase' : ease < 0 ? 'plain.loveLate' : 'plain.loveMixed') });
    }
    // work
    const l10 = chart.houseRulers[10];
    out.push({ key: 'work', title: t('plain.h.work'), text: t('plain.work.' + P[l10].house) + (P.saturn.total > 4 && !business ? ' ' + t('plain.workSaturn') : P.jupiter.total > 4 && !business ? ' ' + t('plain.workJupiter') : '') });
    // money
    const l2 = chart.houseRulers[2];
    const style = ['saturn', 'jupiter', 'mars', 'venus', 'mercury', 'moon', 'sun'].map(k => [k, (P[k].total > 0 ? P[k].total : 0) + ([1, 2, 10, 11].includes(P[k].house) ? 4 : 0) + (k === l2 ? 5 : 0)]).sort((a, b) => b[1] - a[1])[0][0];
    out.push({ key: 'money', title: t('plain.h.money'), text: t('plain.money', { src: T.has('plain.src.' + P[l2].house) && T.raw('plain.src.' + P[l2].house) ? t('plain.src.' + P[l2].house) : t('money.src.' + P[l2].house) }) + ' ' + t('plain.style.' + style) });
    // this chapter
    if (deep) {
      const season = deep.syn.seasonPlanets[0];
      const pr = deep.prof;
      out.push({ key: 'now', title: t('plain.h.now'), text: (season ? t('plain.now', { season: t('plain.season.' + season) }) + ' ' : '') + t(business ? 'plain.yearBiz' : 'plain.year', { topics: business ? I.topics(pr.house, true) : t('plain.yearTopic.' + pr.house) }) });
    }
    // a word of advice: the planet that needs the most care
    const weak = chart.strongest[6];
    out.push({ key: 'advice', title: t('plain.h.advice'), text: t('plain.advice.' + weak) });
    return out;
  }

  G.Plain = { plainReading };
})(typeof window !== 'undefined' ? window : globalThis);
