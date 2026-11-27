/* Akhtarnameh — structural knowledge base (language-neutral).
 * All words live in the language catalogs (lang/*.js); this file holds only rules and numbers.
 * Sources: Ptolemy (Tetrabiblos), Dorotheus, Valens, Paulus, Masha'allah, Abu Ma'shar, Sahl ibn Bishr,
 * al-Biruni (Tafhim), Ibn Ezra, Bonatti, Lilly, Parashara (BPHS), Varahamihira, Yuan Hai Zi Ping, Ebertin, Addey.
 */
(function (G) {
  'use strict';

  const PLANETS = {
    sun: { glyph: '☉', nature: ['hot', 'dry'], kind: 'luminary', sect: 'day' },
    moon: { glyph: '☽', nature: ['cold', 'moist'], kind: 'luminary', sect: 'night' },
    mercury: { glyph: '☿', nature: ['cold', 'dry'], kind: 'mixed', sect: 'either' },
    venus: { glyph: '♀', nature: ['cold', 'moist'], kind: 'benefic', sect: 'night' },
    mars: { glyph: '♂', nature: ['hot', 'dry'], kind: 'malefic', sect: 'night' },
    jupiter: { glyph: '♃', nature: ['hot', 'moist'], kind: 'benefic', sect: 'day' },
    saturn: { glyph: '♄', nature: ['cold', 'dry'], kind: 'malefic', sect: 'day' },
    uranus: { glyph: '♅', modern: true },
    neptune: { glyph: '♆', modern: true },
    pluto: { glyph: '♇', modern: true },
    node: { glyph: '☊' },
    snode: { glyph: '☋' }
  };
  const CLASSIC = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'];
  const CHALDEAN = ['saturn', 'jupiter', 'mars', 'sun', 'venus', 'mercury', 'moon'];
  const DAY_RULER = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn'];

  const SIGNS = [
    { glyph: '♈', el: 'fire', mod: 'movable', male: true }, { glyph: '♉', el: 'earth', mod: 'fixed', male: false },
    { glyph: '♊', el: 'air', mod: 'common', male: true }, { glyph: '♋', el: 'water', mod: 'movable', male: false },
    { glyph: '♌', el: 'fire', mod: 'fixed', male: true }, { glyph: '♍', el: 'earth', mod: 'common', male: false },
    { glyph: '♎', el: 'air', mod: 'movable', male: true }, { glyph: '♏', el: 'water', mod: 'fixed', male: false },
    { glyph: '♐', el: 'fire', mod: 'common', male: true }, { glyph: '♑', el: 'earth', mod: 'movable', male: false },
    { glyph: '♒', el: 'air', mod: 'fixed', male: true }, { glyph: '♓', el: 'water', mod: 'common', male: false }
  ];
  const ELEMENTS = {
    fire: { q: ['hot', 'dry'], temp: 'choleric', trip: ['sun', 'jupiter', 'saturn'] },
    earth: { q: ['cold', 'dry'], temp: 'melancholic', trip: ['venus', 'moon', 'mars'] },
    air: { q: ['hot', 'moist'], temp: 'sanguine', trip: ['saturn', 'mercury', 'jupiter'] },
    water: { q: ['cold', 'moist'], temp: 'phlegmatic', trip: ['venus', 'mars', 'moon'] }
  };
  const DOMICILE = ['mars', 'venus', 'mercury', 'moon', 'sun', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'saturn', 'jupiter'];
  const EXALT = { sun: [0, 19], moon: [1, 3], mercury: [5, 15], venus: [11, 27], mars: [9, 28], jupiter: [3, 15], saturn: [6, 21] };
  const TERMS = [
    [['jupiter', 6], ['venus', 12], ['mercury', 20], ['mars', 25], ['saturn', 30]],
    [['venus', 8], ['mercury', 14], ['jupiter', 22], ['saturn', 27], ['mars', 30]],
    [['mercury', 6], ['jupiter', 12], ['venus', 17], ['mars', 24], ['saturn', 30]],
    [['mars', 7], ['venus', 13], ['mercury', 19], ['jupiter', 26], ['saturn', 30]],
    [['jupiter', 6], ['venus', 11], ['saturn', 18], ['mercury', 24], ['mars', 30]],
    [['mercury', 7], ['venus', 17], ['jupiter', 21], ['mars', 28], ['saturn', 30]],
    [['saturn', 6], ['mercury', 14], ['jupiter', 21], ['venus', 28], ['mars', 30]],
    [['mars', 7], ['venus', 11], ['mercury', 19], ['jupiter', 24], ['saturn', 30]],
    [['jupiter', 12], ['venus', 17], ['mercury', 21], ['saturn', 26], ['mars', 30]],
    [['mercury', 7], ['jupiter', 14], ['venus', 22], ['saturn', 26], ['mars', 30]],
    [['mercury', 7], ['venus', 13], ['jupiter', 20], ['mars', 25], ['saturn', 30]],
    [['venus', 12], ['jupiter', 16], ['mercury', 19], ['mars', 28], ['saturn', 30]]
  ];
  const FACE_ORDER = ['mars', 'sun', 'venus', 'mercury', 'moon', 'saturn', 'jupiter'];
  const HOUSE_KIND = [null, 'angle', 'succedent', 'cadent', 'angle', 'succedent', 'cadent', 'angle', 'succedent', 'cadent', 'angle', 'succedent', 'cadent'];
  const JOYS = { mercury: 1, moon: 3, venus: 5, mars: 6, sun: 9, jupiter: 11, saturn: 12 };

  const ASPECTS = [
    { id: 'conj', angle: 0, glyph: '☌', nature: 'blend' },
    { id: 'sextile', angle: 60, glyph: '⚹', nature: 'easy' },
    { id: 'square', angle: 90, glyph: '□', nature: 'hard' },
    { id: 'trine', angle: 120, glyph: '△', nature: 'easy' },
    { id: 'opposition', angle: 180, glyph: '☍', nature: 'hard' }
  ];
  const MOIETY = { sun: 7.5, moon: 6, mercury: 3.5, venus: 3.5, mars: 3.75, jupiter: 4.5, saturn: 4.5, uranus: 2.5, neptune: 2.5, pluto: 2.5 };
  const MEAN_SPEED = { sun: 0.9856, moon: 13.1764, mercury: 0.9856, venus: 0.9856, mars: 0.5240, jupiter: 0.0831, saturn: 0.0335 };

  // Tropical longitudes at J2000; score is Lilly's accidental bonus where he gives one.
  const FIXED_STARS = [
    ['algol', 56.17, -5], ['alcyone', 59.99, 0], ['aldebaran', 69.79, 0], ['rigel', 76.83, 0], ['bellatrix', 80.95, 0],
    ['betelgeuse', 88.75, 0], ['sirius', 104.08, 0], ['castor', 110.23, 0], ['pollux', 113.22, 0], ['procyon', 115.79, 0],
    ['regulus', 149.83, 6], ['denebola', 171.62, 0], ['vindemiatrix', 189.93, 0], ['spica', 203.84, 5], ['arcturus', 204.23, 0],
    ['zubenelgenubi', 225.08, 0], ['zubeneschamali', 229.37, 0], ['antares', 249.76, 0], ['rasalhague', 262.45, 0],
    ['facies', 278.31, 0], ['vega', 285.32, 0], ['altair', 301.78, 0], ['denebalgedi', 323.55, 0], ['fomalhaut', 333.87, 0],
    ['achernar', 345.32, 0], ['markab', 353.49, 0], ['scheat', 359.37, 0]
  ].map(([id, lon2000, score]) => ({ id, lon2000, score }));

  const FIRDARIA = {
    day: [['sun', 10], ['venus', 8], ['mercury', 13], ['moon', 9], ['saturn', 11], ['jupiter', 12], ['mars', 7], ['node', 3], ['snode', 2]],
    night: [['moon', 9], ['saturn', 11], ['jupiter', 12], ['mars', 7], ['sun', 10], ['venus', 8], ['mercury', 13], ['node', 3], ['snode', 2]]
  };

  const QUESTION_TYPES = [
    { id: 'love', house: 7 }, { id: 'career', house: 10 }, { id: 'business', house: 10, extra: 2 }, { id: 'money', house: 2 },
    { id: 'lost', house: 2 }, { id: 'travel', house: 9 }, { id: 'study', house: 9 }, { id: 'home', house: 4 },
    { id: 'children', house: 5 }, { id: 'health', house: 6 }, { id: 'lawsuit', house: 7 }, { id: 'debt', house: 8 },
    { id: 'sibling', house: 3 }, { id: 'friends', house: 11 }, { id: 'enemy', house: 12 }
  ];
  const ELECTIONS = [
    { id: 'business', houses: [10, 2], planet: 'jupiter', fixed: true },
    { id: 'contract', houses: [7], planet: 'mercury', noRetro: 'mercury' },
    { id: 'launch', houses: [10, 3], planet: 'mercury', noRetro: 'mercury' },
    { id: 'marriage', houses: [7, 5], planet: 'venus', fixed: true, noRetro: 'venus' },
    { id: 'travel', houses: [9, 3], planet: 'moon', movable: true },
    { id: 'property', houses: [4, 2], planet: 'saturn', fixed: true },
    { id: 'interview', houses: [10, 1], planet: 'sun' }
  ];

  /* ----- Jyotish (Parashara) ----- */
  const VIMSHOTTARI = [['snode', 7], ['venus', 20], ['sun', 6], ['moon', 10], ['mars', 7], ['node', 18], ['jupiter', 16], ['saturn', 19], ['mercury', 17]];
  const VEDIC_EXALT = { sun: 0, moon: 1, mars: 9, mercury: 5, jupiter: 3, venus: 11, saturn: 6, node: 1, snode: 7 };
  const MAHAPURUSHA = { mars: 'ruchaka', mercury: 'bhadra', jupiter: 'hamsa', venus: 'malavya', saturn: 'sasa' };

  /* ----- Bazi (Zi Ping) ----- */
  const STEM_EL = ['wood', 'wood', 'fire', 'fire', 'earth', 'earth', 'metal', 'metal', 'water', 'water'];
  const STEM_CH = '甲乙丙丁戊己庚辛壬癸';
  const STEM_PY = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'];
  const BRANCH_CH = '子丑寅卯辰巳午未申酉戌亥';
  const BRANCH_PY = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];
  const BRANCH_EL = ['water', 'earth', 'wood', 'wood', 'earth', 'fire', 'fire', 'earth', 'metal', 'metal', 'earth', 'water'];
  // Hidden stems (main, middle, residual) per branch
  const HIDDEN = [[9], [5, 9, 7], [0, 2, 4], [1], [4, 1, 9], [2, 6, 4], [3, 5], [5, 3, 1], [6, 8, 4], [7], [4, 7, 3], [8, 0]];
  const WX_CYCLE = ['wood', 'fire', 'earth', 'metal', 'water']; // generating order
  // Classical Chinese planet names map the five phases onto the five visible planets
  const WX_PLANET = { wood: 'jupiter', fire: 'mars', earth: 'saturn', metal: 'venus', water: 'mercury' };
  const CLASHES = [[0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11]];
  const HARMONIES = [[0, 1, 'earth'], [2, 11, 'wood'], [3, 10, 'fire'], [4, 9, 'metal'], [5, 8, 'water'], [6, 7, 'fire']];
  const TRINES = [[[8, 0, 4], 'water'], [[11, 3, 7], 'wood'], [[2, 6, 10], 'fire'], [[5, 9, 1], 'metal']];

  /* ----- Hellenistic zodiacal releasing: minor years of the sign rulers ----- */
  const ZR_YEARS = [15, 8, 20, 25, 19, 20, 8, 15, 12, 27, 30, 12];

  G.KB = {
    PLANETS, CLASSIC, CHALDEAN, DAY_RULER, SIGNS, ELEMENTS, DOMICILE, EXALT, TERMS, FACE_ORDER, HOUSE_KIND, JOYS,
    ASPECTS, MOIETY, MEAN_SPEED, FIXED_STARS, FIRDARIA, QUESTION_TYPES, ELECTIONS,
    VIMSHOTTARI, VEDIC_EXALT, MAHAPURUSHA, STEM_EL, STEM_CH, STEM_PY, BRANCH_CH, BRANCH_PY, BRANCH_EL, HIDDEN,
    WX_CYCLE, WX_PLANET, CLASHES, HARMONIES, TRINES, ZR_YEARS
  };
})(typeof window !== 'undefined' ? window : globalThis);
