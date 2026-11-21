/* Akhtarnameh — English strings for the Love, Money, Buy & sell and Chat sections (merged into the English catalog). */
(function (G) {
  const D = G.I18N_DATA = G.I18N_DATA || {};
  const merge = (a, b) => { Object.keys(b).forEach(k => { if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') merge(a[k], b[k]); else a[k] = b[k]; }); return a; };
  merge(D.en = D.en || {}, {
    ui: {
      tab: { love: 'Love & compatibility', money: 'Money & wealth', trade: 'Buy & sell', chat: 'Chat with the astrologer' },
      love: {
        title: 'Love and compatibility', intro: 'Your love nature from your own chart, and compatibility with another person judged by Ptolemy, India\'s Guna Milan and the Chinese pillars.',
        you: 'Your chart:', change: 'change', partner: 'The other person', submit: 'Read love and compatibility',
        hint: 'Leave the other person empty to see only your own love reading. An unknown birth time still allows most of the comparison.',
        yourChart: 'Your chart', partnerName: 'the other person', sampleNote: 'This uses the sample chart. Enter your own birth data in the Natal chart tab for a personal reading.',
        head: 'Love, marriage and compatibility', compat: 'Overall compatibility', synTitle: 'How the two charts meet', natalTitle: 'Your love nature',
        partnerNoTime: 'The other person\'s birth time is unknown: their Ascendant, houses and the Moon\'s exact degree are approximate.',
        addPartner: 'Add the other person\'s birth data to see your compatibility.'
      },
      money: {
        title: 'Money and wealth', intro: 'Where money comes from in your chart, how well you hold it, your financial style, the timing of the present, and the market calendar ahead.',
        range: 'Calendar range', d90: 'Three months', submit: 'Read money and timing', head: 'Money, wealth and financial timing',
        natalTitle: 'Your money chart', calTitle: 'Market calendar: the next {n} days'
      },
      trade: {
        title: 'Buy and sell', intro: 'Should you buy or sell right now, and when is the best moment? Judged by Lilly\'s rules on buying and selling and the elections of al-Biruni and Bonatti.',
        action: 'I want to', buy: 'Buy', sell: 'Sell', asset: 'What', submit: 'Judge now and find the best times',
        disclaimer: 'This is traditional astrological judgment, not financial advice. Markets carry real risk; decide with your own research or a qualified adviser.',
        head: { buy: 'Buying: {asset}', sell: 'Selling: {asset}' }, nowTitle: 'Right now', scaleNo: 'Wait', scaleYes: 'Go',
        bestTitle: { buy: 'Best moments to buy', sell: 'Best moments to sell' },
        rules: 'Rules: the buyer is the Ascendant and the seller the 7th house; the 10th shows the price and the 4th the end of the deal. Buy while the Moon is decreasing in light and sell while she is increasing (al-Biruni, Bonatti); avoid a void Moon and Mercury retrograde; prefer the planet of the asset strong and the Moon applying to a benefic.'
      },
      chat: {
        title: 'Chat with the astrologer', intro: 'Ask anything: love, money, buying and selling, work, the year ahead. Each question is also cast as a horary chart for its moment.',
        useNatal: 'Use my natal chart', usePartner: 'Include the other person (from Love)', where: 'I am in', ph: 'Write your question…',
        clear: 'Clear conversation', note: 'Answers are traditional symbolic judgment, not certainty.', astrologer: 'Astrologer', ruleFrom: 'Astrologer (classical rules)',
        welcome: 'Greetings. I read your chart with the methods of Ptolemy, Abu Ma\'shar, al-Biruni, Lilly, Parashara and the Chinese masters. Ask me about love, money, buying and selling, work or the year ahead. For a personal reading, first enter your birth data in the **Natal chart** tab.'
      }
    },
    err: { natalFirst: 'Cast your natal chart first in the Natal chart tab.' },
    ai: {
      loveTitle: 'Ask the astrologer about love', lovePh: 'e.g. When will I meet the right person?',
      loveSugg: ['When is my next window for love?', 'What kind of partner truly suits me?', 'What pattern keeps repeating in my relationships?'],
      loveSuggPair: ['Are we truly compatible?', 'What will hold us together, and what could break us?', 'Is marriage between us a good idea, and when?'],
      moneyTitle: 'Ask the astrologer about money', moneyPh: 'e.g. Which field will make me the most money?',
      moneySugg: ['Where does my money truly come from?', 'Is this a good year to invest?', 'Am I better suited to a salary or my own business?'],
      tradeTitle: 'Ask the astrologer about this deal', tradePh: 'e.g. Should I wait until next week?',
      tradeSugg: ['Should I act now or wait?', 'Is the price likely to rise or fall?', 'What is the biggest risk in this deal?'],
      chatSugg: ['Will I find love this year?', 'Is it a good time to invest?', 'Should I buy or sell now?', 'Will I get the job?', 'How will the coming year be for me?']
    },
    syn: {
      meter: { attraction: 'Attraction', harmony: 'Harmony', durability: 'Durability', friction: 'Friction' },
      scoresTitle: 'Scores', scores: 'Attraction {a}, harmony {h}, durability {d}, friction {f} (out of 10).',
      overallTitle: 'Compatibility {pct}%',
      overall: {
        strong: 'A strong bond: attraction, understanding and staying power support each other. Such unions are counted among the fortunate in the classical texts.',
        good: 'A good match: real affinity, with a few points that ask for conscious care.',
        work: 'A bond that asks for work: there is a meeting point, but differences are significant and the relationship grows only with effort and maturity.',
        hard: 'A difficult combination: the charts pull in different directions. It can teach a great deal, but harmony will not come by itself.'
      },
      overallWhy: 'Synastry: attraction {a}, harmony {h}, durability {d}, friction {f}; Guna Milan {k}/36.',
      ptolTitle: 'Ptolemy\'s rule of the luminaries (Tetrabiblos IV.5)',
      ptol: {
        lights: 'The Sun of one and the Moon of the other stand in the same or harmonious signs: Ptolemy\'s first sign of a lasting, concordant union.',
        exchange: 'The Sun of one conjoins the Moon of the other: the classic signature of marriage and deep mutual recognition.',
        moons: 'Both Moons are in the same or harmonious signs: daily life, moods and needs fit together naturally.',
        none: 'The luminaries are not in harmonious signs: by Ptolemy\'s rule concord must be built through other ties, such as Venus, Jupiter and shared purpose.'
      },
      contact: '{a} {asp} {b}',
      contactText: {
        conj: '"{x}" of one fuses with "{y}" of the other (orb {orb}°): a strong, immediate bond in this area.',
        easy: '"{x}" of one supports "{y}" of the other (orb {orb}°): ease and natural understanding here.',
        hard: '"{x}" of one challenges "{y}" of the other (orb {orb}°): a magnetism that also brings tension to be worked through.'
      },
      saturnNote: 'Saturn contacts are the glue of long relationships: they bind and stabilise, and can also feel heavy or restricting.',
      overlayTitle: 'Each one\'s planets in the other\'s houses',
      overlay: { b2a: 'Their {p} falls in your house {h}: {meaning}', a2b: 'Your {p} falls in their house {h}: {meaning}' },
      ovh: { 1: 'felt strongly and personally; it shapes how the other sees themselves.', 5: 'romance, play and pleasure.', 7: 'the house of marriage itself: a natural pull toward partnership.', 8: 'intensity, intimacy and shared resources.', 12: 'something hidden or karmic; a bond that is hard to explain.' },
      kootaTitle: 'Guna Milan (Ashtakoota): {n} of 36',
      koota: { varna: 'Varna', vashya: 'Vashya', tara: 'Tara', yoni: 'Yoni', maitri: 'Graha Maitri', gana: 'Gana', bhakoot: 'Bhakoot', nadi: 'Nadi' },
      kootaVerdict: { excellent: 'Excellent by the Indian standard (28 or more).', good: 'Good (24 or more).', fair: 'Acceptable (18 or more), the traditional minimum for marriage.', weak: 'Below the traditional minimum of 18.' },
      nadiDosha: 'Nadi dosha: both Moons are in the same nadi, which the texts treat as the most serious mismatch, mainly for health and children; many cancellations exist.',
      bhakootDosha: 'Bhakoot dosha: the Moon signs are in a 2-12, 5-9 or 6-8 relation, which can strain finances or harmony.',
      kootaNote: 'Computed from the sidereal Moon of each person (Vashya and Yoni simplified).',
      baziTitle: 'Chinese pillars: day masters and branches',
      baziDm: {
        same: 'Both day masters are of the same phase ({a} and {b}): peers and allies, sometimes rivals.',
        aFeedsB: 'Your day master {a} nourishes theirs ({b}): you give and support; they flourish through you.',
        bFeedsA: 'Their day master {b} nourishes yours ({a}): they support you and help you grow.',
        aControlsB: 'Your day master {a} controls theirs ({b}): in classical Zi Ping this is the man\'s wife star, a traditional pairing, as long as control does not become domination.',
        bControlsA: 'Their day master {b} controls yours ({a}): in classical Zi Ping this is the woman\'s husband star, a traditional pairing that brings structure and challenge.'
      },
      baziDay: { clash: 'The two day branches (spouse palaces) clash: lively, but prone to friction in daily life together.', harmony: 'The two day branches form a six harmony: a secret, natural fit between the spouse palaces.', same: 'The day branches are the same: similar needs in intimacy.', neutral: 'The day branches are neutral to each other.' },
      baziYear: { clash: 'The year animals {a} and {b} clash.', harmony: 'The year animals {a} and {b} are a harmonious pair.', trine: 'The year animals {a} and {b} belong to the same trine of allies.', neutral: 'The year animals {a} and {b} are neutral.' }
    },
    love: {
      venusTitle: 'Venus: how you love', venus: 'Venus at {pos}, house {h}, {word}.',
      venusEl: { fire: 'You love with fire: openly, quickly, with admiration and pursuit.', earth: 'You love through the senses and through loyalty: slowly, tangibly, for the long run.', air: 'You love through the mind: conversation, friendship and freedom matter as much as passion.', water: 'You love deeply and emotionally: you need closeness, trust and to be truly understood.' },
      venusStrong: 'A strong Venus gives charm and good fortune in love; affection comes to you.', venusWeak: 'A weak Venus means love asks for more effort and discernment; disappointments teach what you truly value.', venusMid: 'Venus is moderate: love depends on choices and timing.',
      venusRetro: 'Venus retrograde at birth: love is re-examined; old bonds return, and the heart chooses late but knowingly.', venusCombust: 'Venus combust: feelings are hidden or overshadowed by duty and ego; love grows when it is brought into the open.',
      marsTitle: 'Mars: desire and pursuit', mars: 'Mars at {pos}, house {h}.',
      marsEl: { fire: 'Desire is direct and bold; you pursue openly.', earth: 'Desire is steady and physical; you prove love through action.', air: 'Desire starts in the mind; wit and words arouse you.', water: 'Desire is emotional and intense; you need deep connection.' },
      partnerTitle: 'The partner you are drawn to (7th house)', desc: 'The Descendant is in {sign}; the partner tends to show this nature:',
      lord7: 'The lord of the 7th, {p}, sits in house {h} and is {word}: partners are met through, and marriage is bound up with, {topics}.',
      in7: { sun: 'The Sun in the 7th: a partner of standing and strong character; you may define yourself through relationship.', moon: 'The Moon in the 7th: a strong need for partnership; the partner is caring, or changeable.', mercury: 'Mercury in the 7th: a partner who is young in spirit, communicative or connected to work and trade.', venus: 'Venus in the 7th: one of the best signs for a happy, harmonious marriage.', mars: 'Mars in the 7th: passion and also quarrels; a strong-willed partner.', jupiter: 'Jupiter in the 7th: a generous, wise or fortunate partner; marriage brings growth.', saturn: 'Saturn in the 7th: late or serious commitment, often to an older or responsible partner; lasting once made.' },
      ptolTitle: 'Ptolemy\'s significator of the spouse',
      ptolM: 'For a man Ptolemy judges the wife from the Moon: here {p} at {pos}, house {h}, in a {mode} sign.',
      ptolF: 'For a woman Ptolemy judges the husband from the Sun: here {p} at {pos}, house {h}, in a {mode} sign.',
      ptolMode: { movable: 'A cardinal sign: marriage may come early, or more than once.', fixed: 'A fixed sign: one lasting marriage is indicated.', common: 'A mutable sign: more than one significant union is possible.' },
      ptolHit: { ben: 'Its {asp} with {p} promises a good and helpful spouse.', benHard: 'Its {asp} with {p} gives benefit mixed with excess.', malEasy: 'Its {asp} with {p} adds seriousness and steadiness.', mal: 'Its {asp} with {p} brings friction, delay or a demanding partner.' },
      easeTitle: 'Ease or delay in marriage',
      d: { satVenus: 'Saturn afflicts Venus', sat7: 'Saturn touches the Descendant', venusRetro: 'Venus is retrograde', satIn7: 'Saturn occupies the 7th', lord7cadent: 'the 7th lord is in a hidden house' },
      e: { jupVenus: 'Jupiter helps Venus', benIn7: 'a benefic occupies the 7th', lord7good: 'the 7th lord is well placed', moonVenus: 'the Moon and Venus agree' },
      easeList: 'In favour: {list}.', delayList: 'Delaying factors: {list}.',
      easeVerdict: 'Love and marriage come relatively easily.', delayVerdict: 'Commitment tends to come later, after maturity; what is built then is solid.', mixedVerdict: 'Ease and delay are balanced: timing and choices decide.',
      vedTitle: 'Indian view: the 7th lord and the navamsa', ved: 'The sidereal 7th lord {lord} sits in bhava {h} ({topics}). Venus in the navamsa (the chart of marriage) is in {nav}.',
      navEl: { fire: 'A spirited, independent spouse.', earth: 'A practical, loyal spouse.', air: 'A sociable, intelligent spouse.', water: 'A sensitive, devoted spouse.' },
      manglik: 'Mars placement (Kuja dosha) is present: tradition advises a partner with a similar Mars, or patience before marrying.',
      baziTitle: 'Chinese view: the spouse palace', bazi: 'Your spouse palace (day branch) holds {g}: {gt}',
      baziInter: 'The spouse palace is involved in: {list}.', baziCalm: 'The spouse palace is undisturbed: a stable inner picture of partnership.',
      baziStarM: 'For a man the wife star is {el}; its strength in the chart is {n}.', baziStarF: 'For a woman the husband star is {el}; its strength in the chart is {n}.', baziStarX: 'Choose a sex in the Natal chart settings to read the spouse star.',
      w: { prof: 'the profection year activates house {h} (lord {p})', firdar: 'the firdaria of Venus is running', firdarSub: 'the Venus sub-period of the firdaria is running', dasha: 'the mahadasha of {p}', antar: 'the antardasha of {p} (until {to})' },
      timingTitle: 'Timing of love', timingNow: 'Active now: {list}. This is a favourable period for meeting or committing.', timingQuiet: 'No main love time lord is active right now.',
      jup7: 'Jupiter, the great benefic, transits your 7th sign ({sign}): {when}; traditionally the strongest window for marriage.', jupVenus: 'Jupiter returns to the sign of your Venus from {when}: a season of affection and opportunity.'
    },
    money: {
      capacityTitle: 'Capacity for wealth (2nd house)', house2: 'The 2nd house is in {sign}; its lord {p} sits in house {h} and is {word}.', source: 'Money comes through {topics}.',
      src: { 1: 'your own person, skills and initiative', 2: 'your own resources and what you already hold', 3: 'communication, writing, selling, short trips, siblings and neighbours', 4: 'land, property, family and inherited foundations', 5: 'creativity, entertainment, speculation and children', 6: 'service, employment, craft and health work', 7: 'partners, clients, marriage and contracts', 8: 'other people\'s money: investors, loans, inheritance and shared assets', 9: 'foreign lands, teaching, law, publishing and travel', 10: 'career, authority and public reputation', 11: 'friends, networks, patrons and the profits of work', 12: 'work behind the scenes, institutions, distant or isolated places and confidential matters' },
      in2: { sun: 'The Sun in the 2nd: earning through position, leadership and visibility; spending on status.', moon: 'The Moon in the 2nd: fluctuating income; earning from the public, food, homes or anything that changes.', mercury: 'Mercury in the 2nd: earning by the mind: trade, writing, teaching, numbers.', venus: 'Venus in the 2nd: a classic sign of wealth; earning through beauty, art, pleasure or partnership.', mars: 'Mars in the 2nd: bold earning and bold spending; money through effort, engineering or risk.', jupiter: 'Jupiter in the 2nd: the best signature of abundance; money grows and returns.', saturn: 'Saturn in the 2nd: wealth built slowly and kept carefully; early scarcity, later solidity.' },
      lotsTitle: 'Lots of Fortune and Substance', fortune: 'The Lot of Fortune at {pos}, house {h} ({topics}); its lord {p} is {word}.', substance: 'The Lot of Substance (Abu Ma\'shar) at {pos}, house {h} ({topics}); its lord {p} is {word}.',
      jupTitle: 'Jupiter, significator of wealth', jup: 'Jupiter at {pos}, house {h} ({topics}), {word}.', jupStrong: 'A strong Jupiter: opportunities come, and generosity returns multiplied.', jupWeak: 'A weak Jupiter: growth needs discipline; beware of overextending and trusting the wrong people.', jupMid: 'Jupiter is moderate: growth follows effort and good counsel.',
      flowsTitle: 'Income, career and other people\'s money', flows: 'Lord of the 11th (income from work) {p11}: {w11}, in house {h11}. Lord of the 10th (career) {p10}: {w10}. Lord of the 8th (loans, investors, inheritance) {p8}: {w8}, in house {h8}.',
      flows8: 'Other people\'s money is stronger than your own income: partnerships, investors, loans or inheritance play a large role.', flows11: 'Your own earnings are stronger than other people\'s money: build income from your work and network.', flowsEven: 'Own income and others\' money are balanced.',
      styleTitle: 'Your financial temperament', style: 'Your money is led by {p}, seconded by {q}.',
      styleText: { value: 'Saturn style: patient, value-driven and long-term; real estate, land, and slow compounding suit you.', growth: 'Jupiter style: growth and expansion; education, publishing, law, international ventures.', aggressive: 'Mars style: fast, competitive and risk-taking; set strict limits.', beauty: 'Venus style: beauty, design, luxury, hospitality and partnerships.', trader: 'Mercury style: trading, commerce, technology and information; quick decisions.', cyclical: 'Moon style: cyclical and intuitive; consumer goods, food, homes; watch the cycles.', leader: 'Sun style: leadership, your own enterprise and public reputation.' },
      styleSecond: 'Secondary note: {text}', uranus: 'Uranus touches your money houses: sudden gains and losses; technology and the unusual.', neptune: 'Neptune touches your money houses: intuition, but also confusion; verify everything in writing.',
      baziTitle: 'Chinese view: the wealth star', bazi: 'Your wealth element is {el} (strength {n}); its planet is {p}.',
      baziCase: { strongStrong: 'A strong day master with a strong wealth star: you can carry great wealth. Classical texts call this a rich chart.', strongWeak: 'A strong day master with a weak wealth star: the capacity is there but opportunities must be created; wealth arrives in favourable luck pillars.', weakStrong: 'A weak day master facing strong wealth: wealth is visible but heavy to hold. Partnerships, support and caution with debt are key.', weakWeak: 'Both modest: steady, earned prosperity rather than windfalls; build resources first.' },
      vedTitle: 'Indian view: lords of wealth and gain', ved: 'The 2nd lord {l2} is in bhava {h2}; the 11th lord {l11} is in bhava {h11}.', vedYogas: 'Wealth-related yogas: {list}.', vedNone: 'No classic wealth yoga stands out; wealth follows the dashas of the 2nd and 11th lords.',
      t: { prof: 'the profection year activates house {h}', profLord: 'the year lord {p} rules a money house', jup: 'Jupiter transits your house {h}', sat: 'Saturn transits your house {h} (tighten and consolidate)', dasha: 'the mahadasha of {p}', luck: 'the luck pillar carries your wealth element', zr: 'zodiacal releasing from Fortune is in a peak period' },
      timingTitle: 'Financial timing now', timing: 'Active now: {list}.', timingQuiet: 'No major financial time lord is active now: a period for steady work and preparation rather than big moves.'
    },
    cal: {
      newMoon: 'New Moon in {sign}', fullMoon: 'Full Moon in {sign}',
      newMoonText: 'A beginning: traditionally good for starting, planting and buying for the long run.', fullMoonText: 'A culmination: things come to a head; traditionally good for selling and completing, poor for starting.',
      station: { mercury: { retro: 'Mercury retrograde begins: delays, misunderstandings and revised deals. Read contracts twice.', direct: 'Mercury turns direct: communication and deals clear up.' }, venus: { retro: 'Venus retrograde begins: values and prices are reassessed; avoid luxury purchases.', direct: 'Venus turns direct: confidence in value returns.' }, mars: { retro: 'Mars retrograde begins: energy turns inward; avoid aggressive moves.', direct: 'Mars turns direct: momentum returns.' } },
      eclipse: 'Eclipses mark sudden turning points; traditional astrologers avoid starting or committing near them.'
    },
    trade: {
      assetKw: { stocks: ['stock', 'share', 'equity', 'etf', 'index'], crypto: ['crypto', 'bitcoin', 'btc', 'ethereum', 'eth', 'coin', 'token'], gold: ['gold', 'silver', 'coin', 'metal'], currency: ['dollar', 'euro', 'currency', 'forex', 'usd', 'exchange rate'], property: ['house', 'home', 'apartment', 'flat', 'property', 'land', 'real estate'], vehicle: ['car', 'vehicle', 'motorbike', 'motorcycle', 'truck'], goods: ['goods', 'stock of', 'merchandise', 'product', 'inventory'] },
      asset: { stocks: 'Stocks and shares', crypto: 'Cryptocurrency', gold: 'Gold and precious metals', currency: 'Foreign currency', property: 'House or property', vehicle: 'Car or vehicle', goods: 'Goods and merchandise' },
      sig: { buy: 'You (the buyer) are {a}; the seller is {b}; the price is shown by {price}, the thing by {thing}, and the end of the deal by {end}.', sell: 'You (the seller) are {a}; the buyer is {b}; the price is shown by {price}, the thing by {thing}, and the end of the deal by {end}.' },
      sameLord: 'One planet ({p}) rules both sides: the deal is in your hands.',
      deal: '{a} and {b} perfect a {asp} on {date}: the deal can be made.', noDeal: '{a} and {b} do not come together soon: the deal is unlikely to close now.',
      edgeYou: 'Your significator {a} is stronger than the other side\'s ({b}): you hold the advantage.', edgeThem: 'The other side ({b}) is stronger than you ({a}): they hold the advantage; negotiate carefully.', edgeEven: 'Both sides ({a} and {b}) are of similar strength.',
      price: { high: 'The lord of the 10th ({p}) is strong and angular: the price is high or firm.', low: 'The lord of the 10th ({p}) is weak or cadent: the price is low or negotiable.', fair: 'The lord of the 10th ({p}) is moderate: the price is fair.' },
      moonWaxing: 'The Moon is increasing in light: by tradition prices tend to rise, which favours selling.', moonWaning: 'The Moon is decreasing in light: by tradition prices tend to fall, which favours buying.',
      thing: 'The planet of the asset, {p}, is {word}.', thingRetro: 'It is retrograde: second thoughts, returns or hidden defects.',
      end: 'The end of the deal (lord of the 4th, {p}) is {word}.', mercRetro: 'Mercury, lord of commerce, is retrograde: errors in papers and changes of mind.',
      verdict: {
        buy: { go: 'Buy: the sky supports buying now.', lean: 'Leaning toward buying, with care over price and terms.', wait: 'Wait: the signs are mixed; a better moment is listed below.', no: 'Do not buy now: the testimonies are against it.' },
        sell: { go: 'Sell: the sky supports selling now.', lean: 'Leaning toward selling, with care over price and terms.', wait: 'Wait: the signs are mixed; a better moment is listed below.', no: 'Do not sell now: the testimonies are against it.' }
      }
    },
    elr: { waningBuy: 'Moon decreasing (good for buying)', waxingBuy: 'Moon increasing (prices up)', waxingSell: 'Moon increasing (good for selling)', waningSell: 'Moon decreasing (prices down)', edgeYou: 'your significator stronger than the other side', edgeThem: 'the other side stronger' },
    chat: {
      buyKw: ['buy', 'purchase', 'invest in', 'should i get'], sellKw: ['sell', 'cash out', 'take profit', 'get rid of'],
      tradeIntro: 'Judged by Lilly\'s rules on buying and selling for this moment ({asset}):', tradeMore: 'The Buy & sell tab lists the best upcoming moments.',
      ruleIntro: 'Judged by the classical rules of horary for this moment (topic: {topic}):',
      ruleNatal: 'In your natal chart, house {h}:',
      ruleNote: 'For a fuller, conversational answer, open this page in Claude.'
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
