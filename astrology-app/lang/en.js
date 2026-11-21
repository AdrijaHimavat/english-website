/* Akhtarnameh — en catalog (mirrors the keys of lang/en.js). Placeholders in {braces} are filled by the program. */
(typeof window !== 'undefined' ? window : globalThis).I18N_DATA = (typeof window !== 'undefined' ? window : globalThis).I18N_DATA || {};
(typeof window !== 'undefined' ? window : globalThis).I18N_DATA.en = {
 "ui": {
  "brand": "Akhtarnameh",
  "tagline": "Natal charts, horary questions, elections and world-year judgments, read with an accurate ephemeris and the rules of the Babylonian, Greek, Persian, Arabic, Indian and Chinese masters",
  "language": "Language",
  "sections": "Sections",
  "tab": {
   "natal": "Natal chart",
   "horary": "Horary question",
   "elect": "Elections",
   "world": "Mundane (world year)",
   "library": "Library & method",
   "love": "Love & compatibility",
   "money": "Money & wealth",
   "trade": "Buy & sell",
   "chat": "Chat with the astrologer"
  },
  "natal": {
   "title": "Natal chart",
   "bizTitle": "Business chart",
   "name": "Name (optional)",
   "namePh": "e.g. Sara, or a company name",
   "kind": "Chart type",
   "person": "Person",
   "business": "Business founding",
   "calendar": "Calendar",
   "greg": "Gregorian",
   "jalali": "Solar Hijri",
   "date": "Date",
   "day": "Day",
   "month": "Month",
   "year": "Year",
   "time": "Local time",
   "notime": "I don't know the exact time",
   "sex": "Sex (for the lot of marriage and Chinese luck pillars)",
   "male": "Male",
   "female": "Female",
   "nosex": "Prefer not to say",
   "houses": "House system",
   "submit": "Cast and judge the chart",
   "hint": "A sample is filled in. Enter your own date and city."
  },
  "city": "City",
  "lat": "Latitude",
  "lon": "Longitude (east +)",
  "tz": "Time zone (e.g. Asia/Tehran or 3.5)",
  "more": "More settings",
  "manualCity": "Other place (enter coordinates)",
  "coordsName": "lat {lat}, lon {lon}",
  "horary": {
   "title": "Horary question",
   "intro": "In the tradition of Sahl ibn Bishr and William Lilly, the chart of the moment a sincere question is asked holds its answer.",
   "q": "Your question",
   "topic": "Topic",
   "city": "Where you are now",
   "usenatal": "Also show my natal chart to the astrologer",
   "submit": "Ask",
   "hint": "The chart is cast for this moment. Ask a question once; tradition does not trust the second asking.",
   "auto": "Detect from the question",
   "autoMissed": "(topic not detected: judged by the 11th house, the house of hopes)",
   "sampleQ": "Will the new venture I am pursuing succeed?",
   "introTitle": "A question in the moment",
   "introMeta": "Press \"Ask\" and the sky of this very moment over your city is cast and judged.",
   "looksAt": "What the astrologer examines",
   "lk": {
    "cons": {
     "t": "Considerations before judgment",
     "d": "An Ascendant too early or too late, a void-of-course Moon, the Moon in the via combusta, Saturn in the 1st or 7th (Sahl ibn Bishr, Lilly)."
    },
    "sig": {
     "t": "Significators",
     "d": "The ruler of the Ascendant and the Moon signify the querent; the ruler of the house of the matter (7th for marriage, 10th for career) signifies what is asked about."
    },
    "perf": {
     "t": "Perfection",
     "d": "Do the two significators complete an aspect soon? Its exact date is computed from the ephemeris. Refranation and prohibition are checked too."
    },
    "light": {
     "t": "Translation and collection of light",
     "d": "A faster planet carries the light of one significator to the other, or a heavier planet gathers both."
    },
    "rec": {
     "t": "Reception and condition",
     "d": "Mutual reception, combustion, essential and accidental strength, and the Moon's next aspect."
    }
   },
   "no": "No",
   "unclear": "Unclear",
   "yes": "Yes",
   "when": "When",
   "whenText": "the aspect perfects on {date}.",
   "consTitle": "Considerations before judgment",
   "testTitle": "Testimonies",
   "specTitle": "Notes for this kind of question",
   "chart": "Horary chart"
  },
  "elect": {
   "title": "Elections",
   "intro": "Find the best moment to begin, by the rules of Dorotheus, Bonatti and al-Tusi: the Moon, the Ascendant ruler, the houses of the matter and the planetary hours.",
   "what": "For what?",
   "range": "Search range",
   "d7": "Next 7 days",
   "d14": "Two weeks",
   "d30": "One month",
   "d60": "Two months",
   "daytime": "Only between 07:00 and 22:00",
   "submit": "Find the best times",
   "working": "Weighing {n} moments…",
   "meta": "{n} moments weighed · the best moment of each day, best first",
   "best": "Best",
   "window": "Good window: {from} to {to}",
   "hour": "hour of {p}",
   "avoid": "Worst moment in this range: {date} — {why}.",
   "rules": "Rules: the Moon should not be void of course, combust or in the via combusta; better waxing and applying to a benefic; the Ascendant ruler and the lords of the houses of the matter should be strong; benefics angular and malefics away from the 1st and 10th; Mercury not retrograde for contracts nor Venus for marriage. Planetary hours follow al-Biruni's seasonal hours."
  },
  "world": {
   "title": "Mundane astrology",
   "intro": "The Aries ingress (the moment of Nowruz), the lord of the year, eclipses, the Jupiter–Saturn conjunctions and the year's planetary timeline, after Masha'allah and Abu Ma'shar.",
   "year": "Gregorian year (the spring equinox of that year)",
   "city": "Capital or city",
   "submit": "Judge the year",
   "working": "Computing the ingress, eclipses and conjunctions…",
   "head": "The year {py} SH ({year}) for {city}",
   "meta": "Ingress: {date} · lord of the year: {p}",
   "chart": "Aries ingress chart"
  },
  "footer": "Positions come from Astronomy Engine (about one arcminute of accuracy) in the true ecliptic of date; sidereal positions use the Lahiri ayanamsa. Astrology is a traditional, symbolic art; it does not replace a doctor, lawyer or financial adviser.",
  "asc": "Ascendant",
  "mc": "Midheaven",
  "ascShort": "ASC",
  "mcShort": "MC",
  "ruler": "ruler",
  "houseN": "House {n}",
  "tbl": {
   "planet": "Planet",
   "pos": "Position",
   "house": "House",
   "dignity": "Essential dignity",
   "score": "Lilly score"
  },
  "wheelLegend": "Turquoise lines: harmonious aspects; red: hard aspects; dashed: separating. Houses: {hs}.",
  "hsFallback": "(at this latitude the system falls back to Regiomontanus)",
  "sample": "Sample",
  "dayChart": "day chart",
  "nightChart": "night chart",
  "notimeNote": "Birth time unknown: noon was used. Do not trust the Ascendant, houses, lots, the hour pillar or anything that depends on them; the planets' signs (except the Moon's) are right.",
  "contents": "Contents",
  "wheel": "Chart wheel",
  "at": ", ",
  "ask": "Ask",
  "love": {
   "title": "Love and compatibility",
   "intro": "Your love nature from your own chart, and compatibility with another person judged by Ptolemy, India's Guna Milan and the Chinese pillars.",
   "you": "Your chart:",
   "change": "change",
   "partner": "The other person",
   "submit": "Read love and compatibility",
   "hint": "Leave the other person empty to see only your own love reading. An unknown birth time still allows most of the comparison.",
   "yourChart": "Your chart",
   "partnerName": "the other person",
   "sampleNote": "This uses the sample chart. Enter your own birth data in the Natal chart tab for a personal reading.",
   "head": "Love, marriage and compatibility",
   "compat": "Overall compatibility",
   "synTitle": "How the two charts meet",
   "natalTitle": "Your love nature",
   "partnerNoTime": "The other person's birth time is unknown: their Ascendant, houses and the Moon's exact degree are approximate.",
   "addPartner": "Add the other person's birth data to see your compatibility."
  },
  "money": {
   "title": "Money and wealth",
   "intro": "Where money comes from in your chart, how well you hold it, your financial style, the timing of the present, and the market calendar ahead.",
   "range": "Calendar range",
   "d90": "Three months",
   "submit": "Read money and timing",
   "head": "Money, wealth and financial timing",
   "natalTitle": "Your money chart",
   "calTitle": "Market calendar: the next {n} days"
  },
  "trade": {
   "title": "Buy and sell",
   "intro": "Should you buy or sell right now, and when is the best moment? Judged by Lilly's rules on buying and selling and the elections of al-Biruni and Bonatti.",
   "action": "I want to",
   "buy": "Buy",
   "sell": "Sell",
   "asset": "What",
   "submit": "Judge now and find the best times",
   "disclaimer": "This is traditional astrological judgment, not financial advice. Markets carry real risk; decide with your own research or a qualified adviser.",
   "head": {
    "buy": "Buying: {asset}",
    "sell": "Selling: {asset}"
   },
   "nowTitle": "Right now",
   "scaleNo": "Wait",
   "scaleYes": "Go",
   "bestTitle": {
    "buy": "Best moments to buy",
    "sell": "Best moments to sell"
   },
   "rules": "Rules: the buyer is the Ascendant and the seller the 7th house; the 10th shows the price and the 4th the end of the deal. Buy while the Moon is decreasing in light and sell while she is increasing (al-Biruni, Bonatti); avoid a void Moon and Mercury retrograde; prefer the planet of the asset strong and the Moon applying to a benefic."
  },
  "chat": {
   "title": "Chat with the astrologer",
   "intro": "Ask anything: love, money, buying and selling, work, the year ahead. Each question is also cast as a horary chart for its moment.",
   "useNatal": "Use my natal chart",
   "usePartner": "Include the other person (from Love)",
   "where": "I am in",
   "ph": "Write your question…",
   "clear": "Clear conversation",
   "note": "Answers are traditional symbolic judgment, not certainty.",
   "astrologer": "Astrologer",
   "ruleFrom": "Astrologer (classical rules)",
   "welcome": "Greetings. I read your chart with the methods of Ptolemy, Abu Ma'shar, al-Biruni, Lilly, Parashara and the Chinese masters. Ask me about love, money, buying and selling, work or the year ahead. For a personal reading, first enter your birth data in the **Natal chart** tab."
  }
 },
 "hsys": {
  "placidus": "Placidus",
  "regio": "Regiomontanus (Lilly)",
  "whole": "Whole sign (Hellenistic)",
  "equal": "Equal houses"
 },
 "tone": {
  "good": "favourable",
  "hard": "difficult",
  "mixed": "mixed"
 },
 "str": {
  "vstrong": "very strong",
  "strong": "strong",
  "mid": "middling",
  "weak": "weak",
  "vweak": "badly afflicted"
 },
 "err": {
  "title": "Something needs fixing",
  "coords": "Latitude must be between −90 and 90 and longitude between −180 and 180.",
  "tz": "Time zone \"{tz}\" was not recognised. Use a name like Asia/Tehran or a number like 3.5.",
  "date": "The date is incomplete: enter day, month and year.",
  "jyear": "A Solar Hijri year must be between 1200 and 1500.",
  "jday": "The months Mehr to Esfand have at most 30 days.",
  "gyear": "A Gregorian year must be between 1800 and 2200.",
  "future": "That birth date is in the future.",
  "question": "Write your question clearly and completely.",
  "noSlots": "No moments were found in this range.",
  "wyear": "Enter a year between 1850 and 2150.",
  "natalFirst": "Cast your natal chart first in the Natal chart tab."
 },
 "ai": {
  "unavailable": "The conversational astrologer works when this page is opened in Claude. All the judgments above are computed in full from the classical rules.",
  "question": "Question",
  "thinking": "The astrologer is studying the chart…",
  "truncated": "The answer was cut short; ask \"continue\" for the rest.",
  "failed": "The answer did not finish. Ask again in a moment.",
  "denied": "Permission to ask Claude was not given; the rule-based judgments above still stand.",
  "limited": "The question limit has been reached; try again a little later.",
  "natalTitle": "Ask the astrologer about this chart",
  "natalPh": "e.g. What work am I truly made for?",
  "natalSugg": [
   "What is the hidden thread of my life?",
   "What work am I truly made for?",
   "How do you see my marriage and partner?",
   "What does this period of my life mean?",
   "Where do the traditions contradict each other in my chart?"
  ],
  "bizSugg": [
   "Where does this business make the most profit?",
   "What is the hidden weakness of this company?",
   "How does the coming year look for this business?"
  ],
  "horaryTitle": "The astrologer's answer",
  "horaryPh": "Follow-up (e.g. what can I do to improve it?)",
  "horarySugg": [
   "Give me the timing more precisely",
   "What is the obstacle?",
   "What should I do to improve the outcome?"
  ],
  "worldTitle": "Ask the astrologer about this year",
  "worldPh": "e.g. How will the economy fare this year?",
  "worldSugg": [
   "How will the economy and markets fare?",
   "How will ordinary people fare this year?",
   "Which season is the most tense?"
  ],
  "loveTitle": "Ask the astrologer about love",
  "lovePh": "e.g. When will I meet the right person?",
  "loveSugg": [
   "When is my next window for love?",
   "What kind of partner truly suits me?",
   "What pattern keeps repeating in my relationships?"
  ],
  "loveSuggPair": [
   "Are we truly compatible?",
   "What will hold us together, and what could break us?",
   "Is marriage between us a good idea, and when?"
  ],
  "moneyTitle": "Ask the astrologer about money",
  "moneyPh": "e.g. Which field will make me the most money?",
  "moneySugg": [
   "Where does my money truly come from?",
   "Is this a good year to invest?",
   "Am I better suited to a salary or my own business?"
  ],
  "tradeTitle": "Ask the astrologer about this deal",
  "tradePh": "e.g. Should I wait until next week?",
  "tradeSugg": [
   "Should I act now or wait?",
   "Is the price likely to rise or fall?",
   "What is the biggest risk in this deal?"
  ],
  "chatSugg": [
   "Will I find love this year?",
   "Is it a good time to invest?",
   "Should I buy or sell now?",
   "Will I get the job?",
   "How will the coming year be for me?"
  ]
 },
 "pl": {
  "sun": {
   "name": "Sun",
   "short": "will and honour",
   "sig": "life force, will, honour, the father, rulers and those in authority, reputation",
   "good": "magnanimity, confidence, generosity, rank and respect",
   "bad": "vanity, arrogance, domineering, and wounds to pride",
   "mundane": "the ruler and the government"
  },
  "moon": {
   "name": "Moon",
   "short": "feeling and body",
   "sig": "the body, feelings, the mother, the wife in a man's chart, the common people, change and travel",
   "good": "kindness, strong instinct, adaptability, popularity",
   "bad": "moodiness, restlessness, dependence and worry",
   "mundane": "the common people"
  },
  "mercury": {
   "name": "Mercury",
   "short": "mind and speech",
   "sig": "intellect, speech, writing, calculation, trade, contracts, the young and siblings",
   "good": "a sharp mind, eloquence, skill in learning, numbers and commerce",
   "bad": "trickery, a scattered mind, lies and inconsistency",
   "mundane": "scribes, merchants, the press and letters"
  },
  "venus": {
   "name": "Venus",
   "short": "love and pleasure",
   "sig": "love, marriage, beauty, art, joy, comfort and adornment",
   "good": "charm, artistic taste, peacemaking, success in love and friendship",
   "bad": "indolence, excess in pleasure, softness and unstable attachments",
   "mundane": "women, festivities and abundance"
  },
  "mars": {
   "name": "Mars",
   "short": "drive and conflict",
   "sig": "courage, strife, war, fire, iron, surgery, speed and anger",
   "good": "bravery, practical competence, the force to push through and defend what is right",
   "bad": "hot temper, aggression, accidents and cuts, haste",
   "mundane": "war, unrest, fires and the army"
  },
  "jupiter": {
   "name": "Jupiter",
   "short": "fortune and growth",
   "sig": "good fortune, religion and learning, justice, increase of wealth, children, judges and sages",
   "good": "generosity, optimism, integrity, growth and abundance",
   "bad": "excess, empty promises, credulity and hypocrisy",
   "mundane": "religion, law, plenty and peace"
  },
  "saturn": {
   "name": "Saturn",
   "short": "patience and limits",
   "sig": "time, patience, structure, hard work, old age, land, delay, sorrow and wisdom",
   "good": "endurance, depth, discipline, lasting wealth and lasting honour",
   "bad": "fear, isolation, miserliness, delay, loss and heavy labour without reward",
   "mundane": "drought, famine, chronic disease, the old and the landowners"
  },
  "uranus": {
   "name": "Uranus",
   "short": "sudden change",
   "sig": "sudden change, innovation and rupture (modern interpretation)"
  },
  "neptune": {
   "name": "Neptune",
   "short": "dream and ambiguity",
   "sig": "dreams, ambiguity, spirituality and deception (modern interpretation)"
  },
  "pluto": {
   "name": "Pluto",
   "short": "hidden power",
   "sig": "hidden power, collapse and regeneration (modern interpretation)"
  },
  "node": {
   "name": "North Node (Rahu)",
   "short": "hunger and increase",
   "sig": "increase: with benefics it increases good, with malefics harm; in India, worldly hunger and obsession"
  },
  "snode": {
   "name": "South Node (Ketu)",
   "short": "release and detachment",
   "sig": "decrease and release; in India, past mastery, detachment and spiritual insight"
  }
 },
 "signs": {
  "0": {
   "name": "Aries",
   "asc": "A fiery, pioneering nature: fearless, direct, quick to begin and sometimes impatient to finish. A keen face and an ardent look; flares up quickly and calms quickly.",
   "sun": "The Sun in its exaltation: the power to initiate, courage and the wish to lead. Haste must be married to judgment.",
   "moon": "Quick, immediate feelings; attaches fast and is hurt fast. Needs independence and action."
  },
  "1": {
   "name": "Taurus",
   "asc": "Calm, steady and of good taste; slow to decide but holds to the decision. Attached to comfort, beauty and possessions, and hard to dislodge.",
   "sun": "Steadiness, patience and a gift for building wealth; stubbornness must be turned into constancy.",
   "moon": "The Moon in its exaltation: emotional calm, loyalty and a sense of safety drawn from tangible things."
  },
  "2": {
   "name": "Gemini",
   "asc": "Curious, talkative and versatile; a nimble, adaptable mind that flees monotony. Clever in learning and trade, though at times scattered.",
   "sun": "Intelligence, curiosity and skill in communication; a doubleness in desires.",
   "moon": "A heart soothed by conversation; weighs feelings with reason and changes quickly."
  },
  "3": {
   "name": "Cancer",
   "asc": "Sensitive, devoted to family and protective; a cautious shell around a soft interior. A strong emotional memory and attachment to home and roots.",
   "sun": "Nurturing, loyalty to family and sensitivity; the Sun here needs a safe haven.",
   "moon": "The Moon in its own sign: deep feeling, maternal care and strong emotional intelligence."
  },
  "4": {
   "name": "Leo",
   "asc": "Magnanimous, generous and wanting to be seen; a warm, commanding presence. Sensitive to honour and respect, and loyal in friendship.",
   "sun": "The Sun in its own sign: sovereignty, creativity and a warm heart; pride is the trap.",
   "moon": "Needs admiration and emotional warmth; a showy, generous love."
  },
  "5": {
   "name": "Virgo",
   "asc": "Precise, diligent and discerning; drawn to service, order and cleanliness. An analytical mind that sometimes worries too much over details.",
   "sun": "Precision, skill and service; a perfectionism that becomes severity if unchecked.",
   "moon": "Calmed by order and usefulness; shows feeling through work and care."
  },
  "6": {
   "name": "Libra",
   "asc": "Gracious, just and fond of beauty; shines in relationship and partnership. Avoids conflict and at times hesitates in decisions.",
   "sun": "The Sun in its fall: the self finds itself in the mirror of others; diplomacy and fairness, but a need for independent judgment.",
   "moon": "A heart calmed by company and harmony; needs a balanced relationship."
  },
  "7": {
   "name": "Scorpio",
   "asc": "Deep, secretive and powerful; intense feeling behind a calm face. Slow to trust; forgets neither friendship nor injury.",
   "sun": "A deep will, endurance in suffering and the power to transform.",
   "moon": "The Moon in its fall: intense, hidden emotions; needs complete trust before opening the heart."
  },
  "8": {
   "name": "Sagittarius",
   "asc": "Free-spirited, optimistic and fond of knowledge; drawn to travel, philosophy and learning. Frank to the point of bluntness, and allergic to confinement.",
   "sun": "A search for meaning, optimism and open-heartedness; needs far horizons.",
   "moon": "A free, adventurous heart, soothed by travel, study and ideals."
  },
  "9": {
   "name": "Capricorn",
   "asc": "Serious, ambitious and enduring; climbs the mountain step by step. Heavier in youth and lighter in age, and knows the value of time.",
   "sun": "Ambition, responsibility and organising power; success that comes late but lasts.",
   "moon": "The Moon in its detriment: restrained feeling; seeks security in work and achievement."
  },
  "10": {
   "name": "Aquarius",
   "asc": "Independent, thoughtful and humane; faithful to principles and unafraid of new paths. A friend of the group who keeps an inner distance.",
   "sun": "The Sun in its detriment: individuality in the service of the collective; new ideas and firm principles.",
   "moon": "Feelings weighed by reason and ideals; needs freedom within relationship."
  },
  "11": {
   "name": "Pisces",
   "asc": "Kind, imaginative and compassionate; absorbs the moods of others and leans toward art and mysticism. Soft boundaries; must guard against deception and dispersal.",
   "sun": "Compassion, intuition and imagination; a self that finds meaning in service and faith.",
   "moon": "An oceanic, empathic heart; needs solitude and a spiritual refuge."
  }
 },
 "el": {
  "fire": "fire",
  "earth": "earth",
  "air": "air",
  "water": "water"
 },
 "mode": {
  "movable": "cardinal (movable)",
  "fixed": "fixed",
  "common": "mutable (common)"
 },
 "kind": {
  "angle": "angular",
  "succedent": "succedent",
  "cadent": "cadent"
 },
 "unit": {
  "days": "days",
  "weeks": "weeks",
  "months": "months",
  "years": "years"
 },
 "dir": {
  "fire": "east",
  "earth": "south",
  "air": "west",
  "water": "north"
 },
 "temp": {
  "choleric": {
   "name": "choleric (hot and dry)",
   "text": "Ardent, quick-tempered, ambitious and industrious; quick to act and fond of leading. Must master anger and haste."
  },
  "sanguine": {
   "name": "sanguine (hot and moist)",
   "text": "Cheerful, sociable, hopeful and open-hearted; enjoys life and has many friends. Must not take commitments lightly."
  },
  "melancholic": {
   "name": "melancholic (cold and dry)",
   "text": "Profound, precise, cautious and constant; given to reflection and learning. Must guard against pessimism and withdrawal."
  },
  "phlegmatic": {
   "name": "phlegmatic (cold and moist)",
   "text": "Calm, patient, kind and accommodating; rarely agitated and brings peace. Must fight sluggishness and too much delay."
  }
 },
 "dig": {
  "domicile": "domicile",
  "exaltation": "exaltation",
  "triplicity": "triplicity",
  "term": "term (bound)",
  "face": "face (decan)",
  "detriment": "detriment",
  "fall": "fall",
  "peregrine": "peregrine"
 },
 "acc": {
  "house": "in house {n}",
  "retro": "retrograde",
  "direct": "direct",
  "swift": "swift in motion",
  "slow": "slow in motion",
  "cazimi": "cazimi (in the heart of the Sun)",
  "combust": "combust",
  "beams": "under the Sun's beams",
  "free": "free of the Sun's beams",
  "oriental": "oriental",
  "occidental": "occidental",
  "waxing": "increasing in light",
  "waning": "decreasing in light",
  "partileConj": "partile conjunction with {p}",
  "partileTrine": "partile friendly aspect with {p}",
  "partileOpp": "partile opposition with {p}",
  "partileSquare": "partile square with {p}",
  "star": "with the fixed star {p}"
 },
 "asp": {
  "conj": {
   "name": "conjunction"
  },
  "sextile": {
   "name": "sextile"
  },
  "square": {
   "name": "square"
  },
  "trine": {
   "name": "trine"
  },
  "opposition": {
   "name": "opposition"
  }
 },
 "houses": {
  "1": {
   "title": "Self, character and body",
   "topics": "the self and body, temperament, the beginning of life",
   "mundane": "the people of the country and the general state of society",
   "business": "the company itself, its spirit and brand identity"
  },
  "2": {
   "title": "Money and income",
   "topics": "possessions, income, savings and financial means",
   "mundane": "the treasury, the economy, the budget",
   "business": "cash flow, profit and assets"
  },
  "3": {
   "title": "Siblings, short journeys, early learning",
   "topics": "siblings, kin, short journeys, messages and basic education",
   "mundane": "communications, transport, the media and neighbours",
   "business": "advertising, communications, small contracts and distribution"
  },
  "4": {
   "title": "Father, home and property",
   "topics": "the father, home, land and property, roots and the end of matters",
   "mundane": "land, agriculture, real estate and the opposition to the government",
   "business": "premises, property and foundations; the final outcome"
  },
  "5": {
   "title": "Children, love and pleasure",
   "topics": "children, pleasure, love affairs, recreation and creation",
   "mundane": "births, entertainment, ambassadors and messengers",
   "business": "creativity, speculative investment and entertainment"
  },
  "6": {
   "title": "Health and daily work",
   "topics": "illness, daily work, subordinates, animals and toil",
   "mundane": "public health, workers and the armed forces",
   "business": "employees, routine and services"
  },
  "7": {
   "title": "Marriage and partnership",
   "topics": "marriage, partners, contracts, open enemies and lawsuits",
   "mundane": "war and peace, foreign relations and open enemies",
   "business": "partners, clients, competitors and major contracts"
  },
  "8": {
   "title": "Crises, others' money and inheritance",
   "topics": "death and inheritance, the partner's money, loans, fears and crises",
   "mundane": "mortality, debts and foreign money",
   "business": "debt, other people's capital, investors and taxes"
  },
  "9": {
   "title": "Long journeys, learning and belief",
   "topics": "long journeys, religion, philosophy, higher learning, dreams and prophecy",
   "mundane": "religion, the courts, universities and voyages",
   "business": "distant markets, exports, law and training"
  },
  "10": {
   "title": "Career, rank and reputation",
   "topics": "career and profession, rank and fame, the mother (in Lilly), the ruler",
   "mundane": "the ruler, the government and the nation's standing",
   "business": "reputation, management and market position"
  },
  "11": {
   "title": "Friends and hopes",
   "topics": "friends, hopes and wishes, patrons and the income of one's work",
   "mundane": "parliament, the government's friends and allies",
   "business": "business income, networks and backers"
  },
  "12": {
   "title": "Hidden enemies and seclusion",
   "topics": "hidden enemies, sorrow, confinement, solitude and secret matters",
   "mundane": "prisons, conspiracies and hidden enemies",
   "business": "hidden competitors, concealed losses and unseen risks"
  }
 },
 "lots": {
  "fortune": {
   "name": "Lot of Fortune",
   "text": "The place of luck, the body, health and livelihood."
  },
  "spirit": {
   "name": "Lot of Spirit",
   "text": "The place of the mind and will, of profession and chosen actions."
  },
  "marriage": {
   "name": "Lot of Marriage",
   "text": "The indicator of wedlock (after Hermes and al-Biruni)."
  },
  "father": {
   "name": "Lot of the Father",
   "text": "The condition of the father and the paternal inheritance."
  },
  "mother": {
   "name": "Lot of the Mother",
   "text": "The condition of the mother and the bond with her."
  },
  "eros": {
   "name": "Lot of Eros (Paulus)",
   "text": "Desire and longing: what the heart reaches for, in love and beyond."
  },
  "necessity": {
   "name": "Lot of Necessity (Paulus)",
   "text": "Constraint and struggle: what life compels, and the enmities that shape us."
  },
  "courage": {
   "name": "Lot of Courage (Paulus)",
   "text": "Daring and boldness, and also treachery: how one fights."
  },
  "victory": {
   "name": "Lot of Victory (Paulus)",
   "text": "Faith, success and the rewards of hope."
  },
  "nemesis": {
   "name": "Lot of Nemesis (Paulus)",
   "text": "What one cannot escape: hidden debts of fate, losses and their meaning."
  }
 },
 "stars": {
  "algol": {
   "name": "Algol"
  },
  "alcyone": {
   "name": "Alcyone (Pleiades)"
  },
  "aldebaran": {
   "name": "Aldebaran"
  },
  "rigel": {
   "name": "Rigel"
  },
  "bellatrix": {
   "name": "Bellatrix"
  },
  "betelgeuse": {
   "name": "Betelgeuse"
  },
  "sirius": {
   "name": "Sirius"
  },
  "castor": {
   "name": "Castor"
  },
  "pollux": {
   "name": "Pollux"
  },
  "procyon": {
   "name": "Procyon"
  },
  "regulus": {
   "name": "Regulus"
  },
  "denebola": {
   "name": "Denebola"
  },
  "vindemiatrix": {
   "name": "Vindemiatrix"
  },
  "spica": {
   "name": "Spica"
  },
  "arcturus": {
   "name": "Arcturus"
  },
  "zubenelgenubi": {
   "name": "Zubenelgenubi"
  },
  "zubeneschamali": {
   "name": "Zubeneschamali"
  },
  "antares": {
   "name": "Antares"
  },
  "rasalhague": {
   "name": "Rasalhague"
  },
  "facies": {
   "name": "Facies"
  },
  "vega": {
   "name": "Vega"
  },
  "altair": {
   "name": "Altair"
  },
  "denebalgedi": {
   "name": "Deneb Algedi"
  },
  "fomalhaut": {
   "name": "Fomalhaut"
  },
  "achernar": {
   "name": "Achernar"
  },
  "markab": {
   "name": "Markab"
  },
  "scheat": {
   "name": "Scheat"
  }
 },
 "firdar": {
  "sun": "The Sun's period: coming into the light, rank, dealings with the powerful and the father, the search for a name.",
  "venus": "Venus's period: love and friendship, marriage and art, comfort and beauty.",
  "mercury": "Mercury's period: learning, writing, trade, short journeys and skill.",
  "moon": "The Moon's period: change, moves, family and the mother, the state of body and heart.",
  "saturn": "Saturn's period: hard work and building, responsibility, patience and trial; slow but lasting fruit.",
  "jupiter": "Jupiter's period: opening, growth, learning and faith, increase of fortune and wealth.",
  "mars": "Mars's period: effort and competition, courage, conflict and haste; risk of accidents.",
  "node": "The North Node's period: increase and rising; new things enter life.",
  "snode": "The South Node's period: decrease and letting go; the end of a chapter and preparation for the next."
 },
 "nat": {
  "sec": {
   "summary": "Summary judgment",
   "houses": "The twelve houses",
   "housesBiz": "Areas of the business",
   "planets": "The seven planets",
   "aspects": "Aspects",
   "lots": "Lots",
   "time": "Time lords and the present"
  },
  "sectDay": "A day chart (the Sun above the horizon). The Sun, Jupiter and Saturn are of the sect in favour, so Saturn does less harm.",
  "sectNight": "A night chart (the Sun below the horizon). The Moon, Venus and Mars are of the sect in favour, so Mars does less harm.",
  "asc": "Ascendant {pos} ({el}, {mode}).",
  "ascBusiness": "The identity of this business:",
  "ascRuler": "The ruler of the Ascendant is {planet}, in house {h} and {word}: the life and its path lean toward {topics}.",
  "ascRulerBiz": "The ruler of the Ascendant is {planet}, in house {h} and {word}: the company's fate leans toward {topics}.",
  "temp": "Dominant temperament: {temp}, with a strain of {second}.",
  "sunIn": "Sun in {sign}:",
  "moonIn": "Moon in {sign} ({phase}):",
  "moonPhase": {
   "new": "new",
   "waxing": "waxing",
   "gibbous": "nearly full",
   "full": "full",
   "waning": "waning",
   "balsamic": "balsamic, before the dark of the Moon"
  },
  "strongest": "The strongest planet by Lilly's scoring is {planet} (score {score}): \"{good}\" is the native's greatest capital. The weakest is {weak}; beware of \"{bad}\".",
  "elements": "Balance of elements: {list}. {top} predominates and {low} is scarce.",
  "houseLord": "The cusp falls in {sign}; its lord {lord} sits in house {h} and is {word}.",
  "houseLink": "So the affairs of this house are bound up with, and decided through, {topics}.",
  "houseOwn": "The lord is in its own house: this area stands on its own feet.",
  "houseCadent": "The lord is in a \"fallen\" house (6, 8 or 12) that does not see the Ascendant; what this house promises takes more effort to obtain.",
  "houseAngle": "The lord is angular: this area is prominent and visible in the life.",
  "houseBen": "{planet}, a benefic, is in this house and blesses it.",
  "houseBenWeak": "{planet}, a benefic, is in this house and blesses it, though it is weak itself.",
  "houseMalMild": "{planet}, a malefic, is in this house: a hardship that discipline can master.",
  "houseMalHard": "{planet}, a malefic, is in this house: delay, tension or harm here; vigilance is needed.",
  "houseOther": "{planet} is in this house and adds {x}.",
  "houseFortune": "The Lot of Fortune falls here; luck is tied to this area.",
  "verdict": {
   "good": "Judgment: favourable and helpful.",
   "mixed": "Judgment: mixed; it depends on effort and timing.",
   "hard": "Judgment: difficult; it calls for patience and strategy."
  },
  "planetPos": "{planet} at {pos}, house {h}{retro}.",
  "planetDig": "Essential dignity: {ess} ({es}); accidental {acc}; overall {word} (Lilly score {total}).",
  "planetBrings": "It brings {sig} into the field of {topics}.",
  "planetGood": "Being strong, its good face shows: {good}.",
  "planetBad": "Being weak, this area comes with difficulty: {bad}.",
  "planetMixed": "Its good and its difficulty are mixed; the outcome depends on effort and time.",
  "malInSect": "{planet} is of the sect in favour here, so its hardships are more constructive and easier to contain.",
  "malOutSect": "{planet} is contrary to the sect here, so its harm is sharper and must be consciously restrained.",
  "benInSect": "{planet} is of the sect in favour, so its goodness arrives more fully.",
  "joy": "{planet} is in its joy and works at ease in this house.",
  "notable": "Notable: {list}.",
  "retroMark": "retrograde",
  "aspHead": "{a} {asp} {b} (orb {orb}°, {dir}).",
  "applying": "applying",
  "separating": "separating",
  "aspEasy": "\"{x}\" and \"{y}\" assist each other.",
  "aspEasyBen": "\"{x}\" and \"{y}\" assist each other; a sign of grace and opening.",
  "aspEasyMal": "\"{x}\" and \"{y}\" assist each other; hardship turns into strategy and patience.",
  "aspHard": "There is tension between \"{x}\" and \"{y}\".",
  "aspHardMal": "There is tension between \"{x}\" and \"{y}\"; trial and pressure that, made conscious, become strength.",
  "aspHardBen": "There is tension between \"{x}\" and \"{y}\"; a gift won through excess or mismatch.",
  "aspConj": "\"{x}\" and \"{y}\" fuse.",
  "aspConjMixed": "\"{x}\" and \"{y}\" fuse; a blend of grace and hardship.",
  "aspConjMal": "\"{x}\" and \"{y}\" fuse; an intense force that must be put to right use.",
  "aspConjBen": "\"{x}\" and \"{y}\" fuse; a sign of blessing.",
  "modernNote": "(A modern planet: not part of the classical system.)",
  "firdarTitle": "Current firdaria (Abu Ma'shar)",
  "firdar": "From {from} to {to}. {text}",
  "firdarSub": "Sub-period of {planet} until {to}: the colour of \"{x}\" is added.",
  "firdarLordTitle": "The firdaria lord in the natal chart",
  "firdarLord": "{planet} is {word} in the natal chart and sits in house {h}, so this period highlights {topics}.",
  "profTitle": "Annual profection (year {n} of life)",
  "profTitleBiz": "Annual profection (year {n} of activity)",
  "prof": "The Ascendant has been profected to {sign} (house {h}): this year {topics} is in focus. The lord of the year is {planet}, {word} in the chart; its transits and aspects weigh more this year.",
  "transit": "{planet} is now at {pos}, passing through your house {h} ({topics}).",
  "transitMeaning": {
   "saturn": "This area is now the field of testing, responsibility and slow building.",
   "jupiter": "This area is now the field of opening, growth and opportunity."
  },
  "transitHit": "{asp} to the natal {target}",
  "transitActive": "Active contacts: {list}.",
  "transitTitle": {
   "saturn": "Transit of Saturn",
   "jupiter": "Transit of Jupiter"
  }
 },
 "qtypes": {
  "love": {
   "name": "Love, marriage or someone's return",
   "kw": [
    "marry",
    "marriage",
    "love",
    "relationship",
    "boyfriend",
    "girlfriend",
    "husband",
    "wife",
    "partner",
    "come back",
    "return to me",
    "divorce",
    "ex ",
    "propose",
    "ازدواج",
    "عشق",
    "رابطه",
    "برمی‌گرد",
    "همسر"
   ]
  },
  "career": {
   "name": "Job, hiring, promotion or position",
   "kw": [
    "job",
    "career",
    "hired",
    "promotion",
    "interview",
    "boss",
    "position",
    "work",
    "شغل",
    "کار",
    "استخدام",
    "ترفیع"
   ]
  },
  "business": {
   "name": "Business and the success of a venture",
   "kw": [
    "business",
    "company",
    "startup",
    "venture",
    "shop",
    "store",
    "project",
    "deal",
    "کسب",
    "تجارت",
    "شرکت"
   ]
  },
  "money": {
   "name": "Money, income or profit",
   "kw": [
    "money",
    "income",
    "profit",
    "salary",
    "rich",
    "wealth",
    "invest",
    "پول",
    "درآمد",
    "سود"
   ]
  },
  "lost": {
   "name": "A lost object",
   "kw": [
    "lost",
    "find",
    "missing",
    "stolen",
    "theft",
    "where is",
    "گم",
    "پیدا",
    "دزد"
   ]
  },
  "travel": {
   "name": "Long journey, emigration or visa",
   "kw": [
    "travel",
    "trip",
    "visa",
    "abroad",
    "emigrat",
    "immigrat",
    "residency",
    "passport",
    "سفر",
    "مهاجرت",
    "ویزا"
   ]
  },
  "study": {
   "name": "Study, exam or admission",
   "kw": [
    "exam",
    "test",
    "university",
    "admission",
    "degree",
    "pass",
    "study",
    "کنکور",
    "آزمون",
    "امتحان",
    "دانشگاه"
   ]
  },
  "home": {
   "name": "House, property or land",
   "kw": [
    "house",
    "home",
    "apartment",
    "property",
    "land",
    "rent",
    "flat",
    "خانه",
    "ملک",
    "زمین"
   ]
  },
  "children": {
   "name": "Children or pregnancy",
   "kw": [
    "child",
    "baby",
    "pregnan",
    "son",
    "daughter",
    "birth",
    "بچه",
    "فرزند",
    "باردار"
   ]
  },
  "health": {
   "name": "Illness and recovery",
   "kw": [
    "sick",
    "ill",
    "illness",
    "disease",
    "recover",
    "surgery",
    "health",
    "بیمار",
    "درمان",
    "بهبود"
   ]
  },
  "lawsuit": {
   "name": "Lawsuit, court or rival",
   "kw": [
    "court",
    "lawsuit",
    "sue",
    "lawyer",
    "case",
    "rival",
    "verdict",
    "دادگاه",
    "شکایت",
    "رقیب"
   ]
  },
  "debt": {
   "name": "Loan, debt or inheritance",
   "kw": [
    "loan",
    "debt",
    "owe",
    "inherit",
    "mortgage",
    "credit",
    "وام",
    "بدهی",
    "ارث"
   ]
  },
  "sibling": {
   "name": "Sibling, neighbour or news",
   "kw": [
    "brother",
    "sister",
    "sibling",
    "neighbour",
    "neighbor",
    "news",
    "message",
    "letter",
    "برادر",
    "خواهر",
    "خبر"
   ]
  },
  "friends": {
   "name": "A wish, a friend or a hope",
   "kw": [
    "wish",
    "hope",
    "friend",
    "dream come true",
    "آرزو",
    "امید",
    "دوست"
   ]
  },
  "enemy": {
   "name": "Hidden enemy, secrets or confinement",
   "kw": [
    "enemy",
    "secret",
    "hidden",
    "prison",
    "jail",
    "spell",
    "envy",
    "دشمن",
    "راز",
    "زندان"
   ]
  }
 },
 "elect": {
  "business": "Starting a business or opening a shop",
  "contract": "Signing a contract",
  "launch": "Launching a product, website or campaign",
  "marriage": "Marriage or engagement",
  "travel": "Starting a journey",
  "property": "Buying property or moving house",
  "interview": "Job interview or meeting a superior"
 },
 "elr": {
  "voc": "Moon void of course",
  "viaCombusta": "Moon in the via combusta",
  "moonCombust": "Moon combust (near the dark of the Moon)",
  "waxing": "Moon waxing",
  "moonDebil": "Moon in detriment or fall",
  "moonDignified": "Moon in domicile or exaltation",
  "moonToBen": "Moon applies to {p}",
  "moonToMal": "Moon applies to {p} by {asp}",
  "moonToMalSoft": "Moon applies to {p} (friendly aspect)",
  "moonFixed": "Moon in a fixed sign (durability)",
  "moonMovable": "Moon in a cardinal sign (speed)",
  "ascRuler": "Ascendant ruler {p} {word}",
  "houseRuler": "lord of house {h} ({p}) {word}",
  "benAngle": "{p} on angle {h}",
  "benHouse": "{p} in house {h}",
  "malAngle": "{p} on angle {h}",
  "mal7": "{p} in the 7th house",
  "retro": "{p} retrograde",
  "planet": "{p} (the planet of the matter) {word}",
  "hour": "hour of {p}",
  "hourMal": "hour of {p}",
  "waningBuy": "Moon decreasing (good for buying)",
  "waxingBuy": "Moon increasing (prices up)",
  "waxingSell": "Moon increasing (good for selling)",
  "waningSell": "Moon decreasing (prices down)",
  "edgeYou": "your significator stronger than the other side",
  "edgeThem": "the other side stronger"
 },
 "hor": {
  "early": "The Ascendant is in the first degrees of its sign ({d}°): it is too early; the matter has not ripened and the question may be premature.",
  "late": "The Ascendant is in the last degrees of its sign ({d}°): the matter is already decided or has slipped away.",
  "voc": "The Moon is void of course (she makes no aspect before leaving her sign). Lilly says \"nothing will come of the matter\" unless other testimonies are very strong.",
  "viaCombusta": "The Moon is in the via combusta (15° Libra to 15° Scorpio): the matter is full of disorder and instability.",
  "saturn1": "Saturn is in the 1st house: the querent is anxious or despondent and the matter moves slowly.",
  "saturn7": "Saturn is in the 7th house: the traditional warning that the astrologer's judgment may err; read with care.",
  "sig": "Querent: {a} (ruler of the Ascendant) and the Moon. Quesited: {b} (ruler of house {h}: {topics}).",
  "sameLord": "One planet ({p}) rules both houses: the matter is in the querent's own hands and the link to it is already made.",
  "perf": "{a} and {b} perfect a {asp} on {date} (about {days} days from now).",
  "refranation": "But one of them stations and turns back before perfection (refranation): doubt and retreat; the matter is left unfinished or one party regrets it.",
  "perfNote": {
   "0": "A bodily conjunction: the strongest testimony that the matter will be done.",
   "60": "With ease and goodwill.",
   "90": "It comes to pass, but with trouble and delay.",
   "120": "Easily and with satisfaction.",
   "180": "It may come to pass, but with strife and regret."
  },
  "afterSign": "Perfection comes after a significator changes sign: the matter happens with a change of circumstances or method.",
  "far": "The perfection is distant in time.",
  "prohibit": "Prohibition: {c} conjoins {x} before the perfection and comes between them; a third person or factor interferes.",
  "prohibitMal": "Prohibition: {c} conjoins {x} before the perfection; a malefic stands in the way, a serious obstacle.",
  "noPerf": "No perfected aspect forms between {a} and {b} within the next year.",
  "translation": "Translation of light: {x} separates from {from} and applies to {to}; an intermediary (signified by {x}) brings the matter to completion.",
  "collection": "Collection of light: both significators apply to {c}, a heavier planet; a senior person or a third institution brings the two together.",
  "mutualRec": "Mutual reception: {a} and {b} each stand in the other's dignity; both sides want each other, and the matter can be settled even without an aspect.",
  "recByB": "The quesited ({b}) receives the querent: the other party or the thing sought is favourably disposed.",
  "recByA": "The querent receives the quesited: the querent has control of and desire for the matter.",
  "bIn1": "{b}, the quesited, is in the Ascendant: the thing sought comes to the querent by itself.",
  "aInQ": "{a}, the querent's significator, is in the house of the matter: the querent is strongly set on it.",
  "moonNext": "The Moon's next aspect: {asp} to {p} (in about {hours} hours).",
  "moonToB": "The Moon applies to the quesited: a testimony that the matter will be done.",
  "moonToBen": "The Moon applies to a benefic: a good ending.",
  "moonToMal": "The Moon applies to a malefic by a hard aspect: an obstacle or disappointment at the end.",
  "bWeak": "{b} (the thing itself) is badly afflicted (score {s}): it is worth less than hoped, or damaged.",
  "bStrong": "{b} (the thing itself) is strong: what you want is valuable and lasting.",
  "bCombust": "{b} is combust (burnt by the Sun): the matter is hidden, powerless or fearful.",
  "aCombust": "{a} (the querent's significator) is combust: the querent is worried, secretive or under pressure.",
  "lostFound": "The ruler of the 2nd house or the Moon is angular: the lost object will be found (Lilly's rule).",
  "lostHard": "Neither the ruler of the 2nd nor the Moon is angular: it will be harder to find.",
  "lostDir": "Probable direction: {dir} (sign of {sign}); {place}",
  "lostPlace": {
   "fire": "near heat, fire or a wall.",
   "earth": "near the ground, a floor or a stony place.",
   "air": "up high, by a window or on a shelf.",
   "water": "near water, a kitchen or a damp place."
  },
  "lostHidden": "The significator of the object is below the horizon: it is probably indoors, covered or enclosed.",
  "healthNote": "This judgment is symbolic; for any treatment decision, consult a physician.",
  "profit": "Profit (the ruler of the 2nd house, {p}) is {word} and sits in house {h}.",
  "timing": "By Lilly's symbolic timing ({n} degrees to perfection; {mode} sign, {kind} house): about {n} {unit}.",
  "verdict": {
   "yes": "Yes: the testimonies agree that it will be done.",
   "likely": "Probably yes, with conditions and effort.",
   "unclear": "Unclear: the testimonies are balanced. Better to wait and ask again later.",
   "unlikely": "Unlikely: the obstacles outweigh the help.",
   "no": "No: the sky does not support this matter."
  }
 },
 "mun": {
  "ingressTitle": "The moment of the ingress",
  "ingress": "The Sun reaches the vernal equinox (0° Aries) on {date}. The Ascendant of the ingress in this city is {asc}.",
  "lordTitle": "Lord of the year",
  "lord": "{p} is the lord of the year ({why}). It is in house {h} ({mundane}) and {word}.",
  "lordWhyAsc": "ruler of the ingress Ascendant",
  "lordWhyAlm": "almuten of the Ascendant degree",
  "lordTone": {
   "good": "A year in which \"{good}\" shows more in society.",
   "mixed": "The year's good and ill are mixed.",
   "hard": "The lord of the year is weak: \"{bad}\", and weakness in governing and ordering."
  },
  "seasonsTitle": "The seasons",
  "movable": "The ingress Ascendant is cardinal; by Abu Ma'shar's rule this chart governs only the first three months and each season has its own chart.",
  "quarter": {
   "jun": "Summer (Cancer ingress)",
   "sep": "Autumn (Libra ingress)",
   "dec": "Winter (Capricorn ingress)"
  },
  "quarterAsc": "Ascendant {sign}, its ruler {p} ({word})",
  "halfTitle": "The second half of the year",
  "common": "The Ascendant is mutable; this chart governs six months, and the Libra ingress ({date}, Ascendant {sign}) decides the second half.",
  "fixedTitle": "Duration",
  "fixed": "The Ascendant is fixed; by Abu Ma'shar's rule this chart governs the whole year.",
  "moonTitle": "The Moon, signifier of the people",
  "moon": "The Moon at {pos}, house {h}, {word}.",
  "moonNext": "Her first application is a {asp} to {p}:",
  "moonTone": {
   "good": "the people experience the year with relief and hope.",
   "hard": "hardship and pressure on the people, especially from {mundane}.",
   "mixed": "the people fare middling."
  },
  "sec": {
   "year": "Ingress of {year} (Nowruz {py})",
   "houses": "Prominent houses of the ingress",
   "ecl": "Eclipses of the year (Ptolemy, book II)",
   "conj": "Conjunctions (Abu Ma'shar)",
   "motion": "Timeline of planetary motion this year"
  },
  "houseLord": "lord: {p} ({word}).",
  "houseBen": "{p} is here: opening and abundance.",
  "houseMars": "Mars is here: tension, conflict or fire.",
  "houseSaturn": "Saturn is here: slowness, scarcity or lasting pressure.",
  "houseOther": "{p} is here.",
  "ecl": {
   "solar": "Solar eclipse",
   "lunar": "Lunar eclipse"
  },
  "eclKind": {
   "penumbral": "penumbral",
   "partial": "partial",
   "total": "total",
   "annular": "annular",
   "hybrid": "hybrid"
  },
  "eclText": "{date} at {pos}. An eclipse in {meaning}",
  "eclMax": "Greatest eclipse at latitude {lat}° and longitude {lng}°.",
  "noEcl": "No eclipses fall in this year.",
  "gcLastTitle": "The last great conjunction (Saturn and Jupiter)",
  "gcLast": "{date} at {pos}. {meaning} According to Abu Ma'shar, the conjunction of Saturn and Jupiter every twenty years sets the character of the period until the next.",
  "gcNextTitle": "The next great conjunction",
  "gcNext": "{date} at {pos} ({el} triplicity).",
  "gcChainTitle": "Chain of recent conjunctions",
  "triple": "triple",
  "gcChain": "About every two centuries the conjunctions move into a new triplicity (a \"mutation\"), which Abu Ma'shar reads as a great change of dynasties and creeds.",
  "msTitle": "Conjunction of Mars and Saturn",
  "ms": "{date} at {pos}. In Abu Ma'shar's tradition this conjunction (above all in Cancer) signals tension, sedition and hardship; its field is shown by {sign} ({el}).",
  "mjTitle": "Conjunction of Mars and Jupiter",
  "mj": "{date} at {pos}: agitation in law, religion and government; haste in great decisions.",
  "station": {
   "retro": "{p} turns retrograde",
   "direct": "{p} turns direct"
  },
  "retroNote": {
   "mercury": "Mercury retrograde: be careful with contracts, buying equipment and launches.",
   "venus": "Venus retrograde: relationships and values are reviewed.",
   "mars": "Mars retrograde: old conflicts resurface."
  },
  "ingressP": "{p} enters {sign}",
  "ingressMeaning": {
   "jupiter": "Opening and prosperity in the domain of {sign} ({el}).",
   "saturn": "Strictness and rebuilding in the domain of {sign}."
  }
 },
 "eclipse": {
  "fire": "a fire sign: its effects fall on the east and on those in power; fevers, drought, fires and conflict.",
  "earth": "an earth sign: effects on agriculture, land, the economy and property; dearness or scarcity of goods.",
  "air": "an air sign: effects on ideas, law, commerce and communication; violent winds and airborne epidemics.",
  "water": "a water sign: effects on the sea, floods, fishing and the condition of the common people."
 },
 "gconj": {
  "fire": "Fire triplicity: in Abu Ma'shar's tradition, the rise of kingdoms, creeds and prophets; zeal, war and foundations.",
  "earth": "Earth triplicity (roughly 1842 to 2020): the age of industry, material wealth, land and capital.",
  "air": "Air triplicity (since the December 2020 conjunction in Aquarius): the age of ideas, technology, communication and networks; change in law and social structure.",
  "water": "Water triplicity: the age of feeling, faith, migrations and hidden transformations."
 },
 "jmonths": [
  "Farvardin",
  "Ordibehesht",
  "Khordad",
  "Tir",
  "Mordad",
  "Shahrivar",
  "Mehr",
  "Aban",
  "Azar",
  "Dey",
  "Bahman",
  "Esfand"
 ],
 "deep": {
  "sec": {
   "synthesis": "The master's synthesis",
   "hellenistic": "Hellenistic and Perso-Arabic depths",
   "patterns": "Hidden patterns and geometry",
   "jyotish": "Indian Jyotish (Parashara)",
   "bazi": "Chinese Four Pillars (Zi Ping)",
   "cycles": "Progressions, returns and the Maya calendar"
  },
  "note": {
   "synthesis": "The old masters never judged by one factor. Here every system below was computed independently; where Greek, Persian, Indian and Chinese methods point to the same planet, house or period, the testimony is strong.",
   "hellenistic": "Sect, overcoming, besiegement, the prenatal lunation, the almuten, the chain of dispositors and zodiacal releasing: the techniques of Valens, Paulus, Rhetorius, Abu Ma'shar and Ibn Ezra.",
   "patterns": "Configurations, chart shape, declination, antiscia, midpoints and harmonics reveal connections that ordinary aspects miss.",
   "jyotish": "The sidereal zodiac (Lahiri), lunar mansions, the Vimshottari dasha, the navamsa and the yogas of Brihat Parashara Hora Shastra and Varahamihira.",
   "bazi": "The Four Pillars of Destiny in local solar time, the day master, the ten gods and the branch interactions of the Yuan Hai Zi Ping.",
   "cycles": "Secondary progressions and the progressed lunation (Rudhyar), planetary returns, and the sacred day count of the Maya."
  },
  "why": {
   "ascRuler": "ruler of the Ascendant (Ptolemy)",
   "almuten": "almuten of the chart (Ibn Ezra)",
   "geniture": "strongest by Lilly's dignity score",
   "final": "final dispositor: every chain of rulership ends in it",
   "conjAngle": "conjunct the {angle}",
   "angular": "angular",
   "stellium": "ruler of the stellium in {sign}",
   "tApex": "apex of a T-square",
   "yodApex": "apex of a Yod (finger of fate)",
   "mostAspected": "the most aspected planet",
   "oob": "out of bounds in declination",
   "lagnaLord": "lord of the sidereal Lagna (Parashara)",
   "nakLord": "lord of the Moon's nakshatra",
   "dmPlanet": "planet of the Chinese day master's element ({element})",
   "baziStrong": "planet of the strongest Chinese element ({element})",
   "syzygyLord": "lord of the prenatal lunation",
   "hourLord": "ruler of the planetary hour of birth",
   "dayLord": "ruler of the day of birth"
  },
  "syn": {
   "keyTitle": "The hidden axis",
   "keyTitle2": "Second key",
   "key": "{planet} is singled out {n} times by independent systems: {reasons}. When Greek, Persian, Indian and Chinese methods converge on one planet, the masters treated it as the planet of the soul's work: {sig}.",
   "how": {
    "good": "Its condition is strong: {planet} carries its mandate with ease and authority.",
    "mixed": "Its condition is middling: {planet} carries its mandate through effort, in phases.",
    "hard": "Its condition is difficult: {planet} carries its mandate through crisis; the gift is real but arrives through hardship, often late."
   },
   "keyNone": "No single planet dominates: the chart is democratic, its power spread across several centres. Such people develop in many directions and resist being defined.",
   "arenaTitle": "Arena of life: house {house}",
   "arena": "House {house} ({topics}) is where the chart concentrates its force: {reasons}.",
   "timingTitle": "The convergence of the present",
   "timing": "Running now: {list}. {planet} appears in {n} of these {total} time-lord systems; the traditions agree that this is the season of {planet}: {season}",
   "timing2": "A second voice is {planet}: {season}",
   "timingNone": "The current time lords ({list}) all differ: a transitional, many-voiced period without one dominant theme.",
   "flagsTitle": "Signals of the moment",
   "hiddenTitle": "Secret bridge: {a} and {b}",
   "hidden": "{a} and {b} form no classical aspect, yet they are joined by {via}. What looks separate in the life is wired together underneath: \"{x}\" and \"{y}\" act on each other covertly.",
   "crossTitle": "Where the traditions agree and disagree"
  },
  "arena": {
   "planets": "{n} planet(s) reside here",
   "ascRuler": "the Ascendant ruler {planet} is here",
   "fortune": "the Lot of Fortune falls here",
   "spirit": "the Lot of Spirit falls here",
   "almuten": "the almuten of the chart is here",
   "node": "the North Node is here",
   "benefic": "the benefic of sect {planet} is here",
   "malefic": "the malefic contrary to sect {planet} is here"
  },
  "lords": {
   "profection": "profection year lord",
   "firdar": "firdaria",
   "firdarSub": "firdaria sub-period",
   "dasha": "Vimshottari mahadasha",
   "antardasha": "antardasha",
   "zr1": "zodiacal releasing from Spirit (L1)",
   "zr2": "zodiacal releasing (L2)",
   "luck": "Bazi luck pillar",
   "sr": "solar-return Ascendant ruler",
   "progMoon": "progressed Moon's ruler"
  },
  "season": {
   "sun": "stepping into visibility, authority and self-definition; recognition, and the question of what one truly stands for.",
   "moon": "change, movement, family and the body; feelings rise to the surface and life rearranges itself around needs.",
   "mercury": "learning, writing, negotiating and trading; the mind is the instrument, and decisions multiply.",
   "venus": "love, pleasure, art and reconciliation; relationships and values take centre stage.",
   "mars": "action, competition and courage; conflict that forces decisions, and a risk of haste.",
   "jupiter": "expansion, teachers, faith and opportunity; doors open, and the danger is excess.",
   "saturn": "building under pressure, responsibility and maturation; what is false falls away and what is real is made to last.",
   "node": "hunger for the new and the foreign, ambition and obsession; something grows larger than planned.",
   "snode": "release, loss and inner mastery; letting go of what was, turning toward the spirit."
  },
  "flag": {
   "zrPeak": "Zodiacal releasing places you in a peak period (angular to the Lot of Fortune): career and public life come to the foreground.",
   "lb": "A \"loosing of the bond\" is active: Valens's signal of a sudden turn in vocation and direction.",
   "sadeSati": "Sade Sati is running ({phase}): Saturn is crossing the sidereal sign of the Moon or its neighbours, India's seven and a half years of emotional maturation.",
   "return": "{what} on {date}: a structural turning point of life."
  },
  "sadeSati": {
   "rising": "rising phase, Saturn in the 12th from the Moon",
   "peak": "peak, Saturn over the natal Moon",
   "setting": "setting phase, Saturn in the 2nd from the Moon"
  },
  "via": {
   "antiscia": "antiscia (mirror points across the solstices, Firmicus)",
   "contra": "contra-antiscia (mirror points across the equinoxes)",
   "parallel": "a parallel of declination",
   "contraparallel": "a contra-parallel of declination",
   "h5": "a quintile-type aspect (5th harmonic)",
   "h7": "a septile-type aspect (7th harmonic)",
   "h9": "a novile-type aspect (9th harmonic)",
   "midpoint": "a midpoint picture with {other}"
  },
  "cross": {
   "sunSame": "Tropical Sun and sidereal Sun both in {t}: the seasonal and the stellar zodiacs agree, so the solar nature is unambiguous.",
   "sunDiff": "Tropical Sun in {t}, sidereal Sun in {s}: the visible, seasonal personality ({t}) rests on a deeper {s} layer that the Indian tradition calls karma, and which shows itself with age.",
   "asc": "Western Ascendant {asc}, sidereal Lagna {lagna}.",
   "ascSame": "Both systems give the same ruler ({ar}): the body and the path speak with one voice.",
   "ascDiff": "The rulers differ ({ar} in the West, {ll} in India): two agendas live in one person, and maturity means integrating {ar} with {ll}.",
   "tempSame": "Greek temperament: {temp}. Chinese five phases: the strongest is {wx}. Both systems independently diagnose the same excess; both prescribe {remedy} as the medicine: {remedyText}",
   "tempDiff": "Greek temperament: {temp}. Chinese five phases: the strongest is {wx}. The systems disagree, which is itself information: the surface temperament and the deeper constitution pull in different directions, and such people often feel misread.",
   "moon": "The Moon stands in the Indian nakshatra {nak} and the Arabic lunar mansion {man}; read both together for the emotional core."
  },
  "remedy": {
   "water": "stillness, depth, rest, reflection",
   "metal": "discipline, pruning, clear limits",
   "fire": "warmth, passion, visibility",
   "earth": "structure, routine, grounding",
   "wood": "growth, movement, new beginnings"
  },
  "hel": {
   "sectTitle": "Sect: the helper and the adversary",
   "sect": "The benefic of the sect, {ben}, is in house {bh}: the most reliable source of good ({bt}). The malefic contrary to the sect, {mal}, is in house {mh}: where life's sharpest trials gather ({mt}).",
   "malStrong": "Because {mal} is dignified, its trials end in mastery.",
   "malWeak": "Because {mal} is also weak, this is the chart's most sensitive point; awareness turns it from fate into choice.",
   "overTitle": "{a} overcomes {b}",
   "over": "{a} stands in the superior square (10th sign) from {b}: the agenda of {a} dominates that of {b}.",
   "overMalContrary": "The malefic contrary to sect presses on {b}: pressure from circumstance or authority has shaped \"{y}\" from early on.",
   "overMal": "A malefic stands over {b}: discipline and hardship shape \"{y}\", but in sect it is more teacher than enemy.",
   "overBen": "A benefic stands over {b}: protection and patronage watch over \"{y}\".",
   "besiegedTitle": {
    "malefic": "{p} besieged",
    "benefic": "{p} enclosed by benefics"
   },
   "besieged": {
    "malefic": "{p} is besieged between Mars and Saturn: hemmed in and forced to act under constraint; \"{x}\" grows under siege.",
    "benefic": "{p} is enclosed by Venus and Jupiter: protected and supported; \"{x}\" is guarded."
   },
   "syzTitle": "The prenatal lunation",
   "syz": "The {kind} before birth fell on {date} at {pos}, ruled by {lord} in house {h}. Ptolemy and Bonatti treat it as the seed of the life; its lord shows what the soul came to resolve: {topics}.",
   "almutenTitle": "Almuten of the chart",
   "almuten": "By the points of the five hylegical places (Ibn Ezra, al-Qabisi), {p} rules the chart with {pts} points.",
   "almutenSame": "It is also the Ascendant ruler: the chart speaks with one voice.",
   "almutenDiff": "It differs from the Ascendant ruler {ar}: the person (Ascendant) and the soul's ruler (almuten) have different agendas; \"{x}\" works behind \"{y}\".",
   "dispTitle": "The chain of rulership",
   "dispSole": "Every chain of rulership ends in {p}, in its own sign: {p} is the king of this chart, the final authority behind every decision.",
   "dispMany": "Several planets rule themselves ({list}): independent centres of power that rarely obey one another.",
   "dispLoop": "There is no final dispositor: authority circulates.",
   "mutual": "{a} and {b} are in mutual reception: a closed loop of support between {ta} and {tb}.",
   "loop": "A ring of rulership: {loop}. Power flows in a circle; this person gains strength from relationships between parts of life rather than from a single centre.",
   "chains": "Chains: {chains}.",
   "zrTitle": "Zodiacal releasing from Spirit (Valens): the story of vocation",
   "zr": "Current chapter (L1): {s1}, ruled by {l1}, from {f1} to {t1}. Current sub-chapter (L2): {s2}, ruled by {l2}, until {t2}.",
   "zrPeak": {
    "major": "This chapter is a major peak (10th from Fortune): the summit of visibility and achievement.",
    "minor": "This chapter is angular to Fortune: an active, eventful period."
   },
   "zrPeak2": "The sub-chapter is itself a peak: a high point within the chapter.",
   "zrNext2": "Next peak sub-chapter: {s} from {d}.",
   "zrNext": "Next major peak chapter: {s} from {d}.",
   "zrfTitle": "Zodiacal releasing from Fortune: body and circumstance",
   "zrf": "Current chapter: {s} (ruled by {l}) until {to}; sub-chapter {s2} until {t2}.",
   "lot": "At {pos}, house {h} ({topics}); its lord {lord} is {str}.",
   "mansionTitle": "Lunar mansion (al-Biruni, Picatrix)",
   "mansion": "The Moon is in mansion {n}, {name}: {meaning}",
   "hourTitle": "Day and hour of birth",
   "hour": "Born on a {day} (day of {dr}) in the hour of {hr}. Al-Biruni notes that the hour ruler colours the native's manner: \"{x}\".",
   "srTitle": "Solar return (tahwil al-sinin) of this year",
   "sr": "The Sun returned to its natal place on {date}. Return Ascendant {asc}, ruled by {lord}, which sits in natal house {h} ({topics}). Angular planets in the return: {ang}. The return Moon in house {moonH} colours the year's feeling ({moonT})."
  },
  "syz": {
   "new": "new moon",
   "full": "full moon"
  },
  "none": "none",
  "pat": {
   "shapeTitle": "Chart shape: {shape}",
   "handle": "The handle is {p}: everything pours through it; \"{x}\" is the outlet of the whole life.",
   "hemiTitle": "Hemispheres",
   "hemi": "{above} planets above the horizon and {below} below; {east} in the eastern half and {west} in the western.",
   "hemiAbove": "A life lived in public view, oriented to outer achievement.",
   "hemiBelow": "An inward, private life that builds foundations before showing itself.",
   "hemiBalanced": "Inner and outer life are balanced.",
   "hemiEast": "The eastern emphasis makes the person self-directed: they shape their circumstances.",
   "hemiWest": "The western emphasis means destiny arrives through others: relationships shape the path.",
   "hemiEW": "Self and others weigh equally.",
   "unaspTitle": "{p} unaspected",
   "unasp": "{p} makes no classical aspect: it acts outside the system, all or nothing; \"{x}\" may appear only in particular settings, as a sudden talent or a blind spot.",
   "oobTitle": "{p} out of bounds",
   "oob": "{p} has a declination of {dec}°, beyond the Sun's limit of {obl}°: it moves outside the usual path; \"{x}\" is unconventional, extreme and unbound by the rules.",
   "parTitle": "Parallels of declination",
   "parallel": "{a} is parallel to {b} (orb {orb}°).",
   "contraparallel": "{a} is contra-parallel to {b} (orb {orb}°).",
   "parNote": "Parallels work like conjunctions, contra-parallels like oppositions, in a dimension the ordinary chart does not show.",
   "antTitle": "Antiscia (mirror points)",
   "antiscia": "{a} touches the antiscion of {b} (orb {orb}°).",
   "contra": "{a} touches the contra-antiscion of {b} (orb {orb}°).",
   "antNote": "Firmicus and Lilly treat antiscia as concealed conjunctions: linked matters work together out of sight.",
   "mid": "Planetary picture (Ebertin, Hamburg school), orb {orb}°: the blend of \"{x}\" and \"{y}\" is focused and expressed through \"{z}\"."
  },
  "short": {
   "asc": "the self and body",
   "mc": "aim and career"
  },
  "harm": {
   "5": {
    "name": "Quintile web (5th harmonic)",
    "text": "{planets} are linked by quintiles, Kepler's aspect of creation: a signature of personal style, craft and the will to shape. Addey saw the fifth harmonic as how a person builds and makes."
   },
   "7": {
    "name": "Septile web (7th harmonic)",
    "text": "{planets} are linked by septiles: inspiration, fated attractions and what moves a person beyond reason. The seventh harmonic shows what enchants."
   },
   "9": {
    "name": "Novile web (9th harmonic)",
    "text": "{planets} are linked by noviles: joy, spiritual maturity and the ideal of union. The ninth harmonic is the navamsa of India seen through Western eyes."
   }
  },
  "ved": {
   "siderealTitle": "The sidereal chart",
   "sidereal": "With the Lahiri ayanamsa ({ay}°): Lagna {lagna}, Moon {moon}, Sun {sun}. The Lagna lord {ll} sits in bhava {h}.",
   "nakTitle": "Nakshatra of the Moon",
   "nak": "The Moon is in {nak}, pada {pada}, ruled by {lord}: {meaning} The Lagna is in {lnak}.",
   "dashaTitle": "Vimshottari dasha",
   "dasha": "Mahadasha of {md} from {f} to {to}; antardasha of {ad} until {adto}. {md} occupies bhava {h} ({topics}) and is {dig}. The period brings {season}",
   "next": "Next mahadasha: {md} from {d}.",
   "exalted": "exalted",
   "debil": "debilitated",
   "own": "in its own sign",
   "neutral": "in a neutral sign",
   "navTitle": "Navamsa (D9)",
   "varg": "Vargottama (same sign in the rasi and navamsa charts): {list}. These planets are doubly reliable; what they promise is delivered.",
   "noVarg": "No planet is vargottama.",
   "nav": "Navamsa of the Moon: {moon}; of Venus (the spouse in the navamsa): {venus}; of Jupiter (dharma and teachers): {jup}.",
   "nodesTitle": "The axis of Rahu and Ketu",
   "nodes": "Rahu in bhava {h1}: hunger and obsession around {t1}. Ketu in bhava {h2}: past mastery and detachment around {t2}.",
   "sadeTitle": "Sade Sati",
   "manglikTitle": "Kuja dosha (Mars placement)",
   "manglik": "Mars is in bhava {h} from the Lagna, the placement Indian tradition calls Kuja (Mangal) dosha: Martian heat in the domain of partnership. Traditional texts list many cancellations; read it as a call for a partner of matching strength, not as a curse."
  },
  "bazi": {
   "pillarsTitle": "The Four Pillars",
   "pillars": "Year {y}, month {m}, day {d}, hour {h} (local solar time). Year animal: {animal}.",
   "dmTitle": "Day master: {dm}",
   "strong": "The day master is strong ({pct}% of the chart supports it).",
   "weak": "The day master is weak ({pct}% of the chart supports it).",
   "fav": "Useful elements: {fav}; in the old Chinese naming of the planets these are {planets}.",
   "elTitle": "Balance of the five phases",
   "el": "{strong} is strongest and {weak} is weakest.",
   "godsTitle": "The ten gods",
   "spouse": "The spouse palace (day branch) holds {g}: the inner pattern of intimate partnership.",
   "pillar": {
    "year": "Year",
    "month": "Month",
    "day": "Day",
    "hour": "Hour"
   },
   "pmean": {
    "year": "ancestry, society and early life",
    "month": "parents, career and youth",
    "day": "the self and the spouse",
    "hour": "children, later life and legacy"
   },
   "inter": {
    "clash": {
     "name": "Clash of branches",
     "text": "The {p1} and {p2} pillars clash: conflict and movement between {m1} and {m2}."
    },
    "harmony": {
     "name": "Six harmony",
     "text": "The {p1} and {p2} pillars combine into {el}: a bond and secret support between {m1} and {m2}."
    },
    "trine": {
     "name": "Three harmony frame",
     "text": "A full three-harmony frame of {el}: a powerful alliance that strengthens {el} throughout the chart."
    },
    "halftrine": {
     "name": "Half three harmony",
     "text": "A half frame of {el}: a partial alliance that tilts the chart toward {el}."
    },
    "stemcomb": {
     "name": "Stem combination",
     "text": "The stems of the {p1} and {p2} pillars combine (into {el}): attraction and binding between {m1} and {m2}."
    }
   },
   "luckTitle": "Current 10-year luck pillar",
   "luck": "{p} ({el}), ages {from} to {to}; the luck pillars began at age {start}.",
   "luckGood": "Its element is among the useful ones: a supportive decade.",
   "luckHard": "Its element is not among the useful ones: a decade that asks more effort.",
   "luckNeedSex": "Choose a sex under \"More settings\" to compute the luck pillars; their direction depends on it.",
   "bridgeTitle": "Bridge between China and the West",
   "bridge": "In classical Chinese the planets are named after the five phases. Your day master is {dmEl}, the phase of {dmP}; in the Western chart {dmP} is {cond}. Read the two together: the Chinese self and its Western planet tell one story."
  },
  "prog": {
   "title": "Secondary progressions",
   "text": "Progressed Sun {sun}; progressed Moon {moon}, moving through natal house {h}: the emotional climate of these two and a half years centres on {topics}. Progressed lunation phase: {phase}, {phaseText}",
   "newMoon": "The last progressed new moon fell at age {age}: a seed was planted then that is still unfolding.",
   "sunChanged": "The progressed Sun has moved into {s}: the self has changed its colouring since birth."
  },
  "ret": {
   "title": "Planetary returns",
   "saturn1": "First Saturn return",
   "saturn2": "Second Saturn return",
   "uranusOpp": "Uranus opposition (mid-life)",
   "jupiterNext": "Next Jupiter return",
   "nodeNext": "Next nodal return",
   "note": "Returns are structural turning points: what was built is tested and the next chapter is chosen."
  },
  "past": "(past)",
  "maya": {
   "title": "The Maya Tzolk'in",
   "text": "Day {n} {sign} in the 260-day sacred count (GMT correlation): {meaning}"
  }
 },
 "phase": {
  "0": {
   "name": "New",
   "text": "instinctive, emerging, projecting the self into a new cycle."
  },
  "1": {
   "name": "Crescent",
   "text": "struggling to break free of the past and assert the new."
  },
  "2": {
   "name": "First Quarter",
   "text": "crisis in action: building, deciding, clearing the ground."
  },
  "3": {
   "name": "Gibbous",
   "text": "perfecting, analysing, refining the vision."
  },
  "4": {
   "name": "Full",
   "text": "fulfilment and illumination; relationships reveal the meaning."
  },
  "5": {
   "name": "Disseminating",
   "text": "sharing what has been learned, teaching, spreading."
  },
  "6": {
   "name": "Last Quarter",
   "text": "crisis in consciousness: reorientation and letting go of old forms."
  },
  "7": {
   "name": "Balsamic",
   "text": "release, completion and the seed of the future; a prophetic, inward time."
  }
 },
 "shape": {
  "bundle": {
   "name": "Bundle",
   "text": "All planets within a third of the circle: a concentrated, specialised life, intensely focused on few things."
  },
  "bowl": {
   "name": "Bowl",
   "text": "All planets within one half: a person who carries a mission and feels the empty half as something to be filled."
  },
  "bucket": {
   "name": "Bucket",
   "text": "A bowl with a single \"handle\" planet: all the energy of the life pours out through one point."
  },
  "locomotive": {
   "name": "Locomotive",
   "text": "Planets spread over two thirds with an empty third: driving, self-propelled energy that keeps moving."
  },
  "seesaw": {
   "name": "Seesaw",
   "text": "Two opposing groups: a life of weighing opposites, swinging between poles until they are reconciled."
  },
  "splash": {
   "name": "Splash",
   "text": "Planets scattered evenly around the circle: wide interests and adaptability; the danger is dispersion."
  },
  "splay": {
   "name": "Splay",
   "text": "Irregular clusters: a strongly individual, independent character who resists classification."
  }
 },
 "config": {
  "grandtrine": {
   "name": "Grand trine",
   "text": "{planets} in a grand trine in {el}: a closed circuit of talent; gifts that flow so easily they can go unused unless challenged."
  },
  "tsquare": {
   "name": "T-square",
   "text": "{planets}, with {apex} at the apex ({mode}): the engine of the chart. Chronic tension discharges through {apex} (\"{x}\"). The empty leg, in {empty}, is where release and resolution lie."
  },
  "grandcross": {
   "name": "Grand cross",
   "text": "{planets} form a grand cross ({mode}): pulled in four directions at once, this person develops extraordinary resilience."
  },
  "yod": {
   "name": "Yod (finger of fate)",
   "text": "{planets}: two planets in sextile point at {apex} by quincunxes. A calling or adjustment that cannot be avoided, focused through \"{x}\"."
  },
  "kite": {
   "name": "Kite",
   "text": "{planets} form a kite: the talent of the grand trine is given a direction and a target by {apex}."
  },
  "mystic": {
   "name": "Mystic rectangle",
   "text": "{planets} form a mystic rectangle: two oppositions harmonised by trines and sextiles; tension that is practically managed."
  },
  "stellium": {
   "name": "Stellium",
   "text": "{planets} gather in {sign} (house {h}): the life pours a disproportionate amount of energy into {topics}."
  }
 },
 "yoga": {
  "gajakesari": {
   "name": "Gaja Kesari yoga",
   "text": "Jupiter in a kendra from the Moon: the elephant and the lion; wisdom, reputation and lasting goodwill."
  },
  "budhaditya": {
   "name": "Budha-Aditya yoga",
   "text": "The Sun and Mercury in one sign: intelligence, skill and success through the intellect."
  },
  "ruchaka": {
   "name": "Ruchaka yoga (Mahapurusha)",
   "text": "{p} strong in a kendra: courage, command and physical vigour."
  },
  "bhadra": {
   "name": "Bhadra yoga (Mahapurusha)",
   "text": "{p} strong in a kendra: eloquence, learning and mercantile skill."
  },
  "hamsa": {
   "name": "Hamsa yoga (Mahapurusha)",
   "text": "{p} strong in a kendra: wisdom, virtue and respect from the learned."
  },
  "malavya": {
   "name": "Malavya yoga (Mahapurusha)",
   "text": "{p} strong in a kendra: beauty, refinement, comfort and artistic gifts."
  },
  "sasa": {
   "name": "Sasa yoga (Mahapurusha)",
   "text": "{p} strong in a kendra: authority over people, endurance and organising power."
  },
  "kemadruma": {
   "name": "Kemadruma yoga",
   "text": "No planet stands in the 2nd or 12th from the Moon: emotional solitude and the need to rely on oneself."
  },
  "kemadrumaCancelled": {
   "name": "Kemadruma, cancelled",
   "text": "Kemadruma is present but cancelled by planets in kendras: early loneliness that turns into self-reliance."
  },
  "chandramangala": {
   "name": "Chandra-Mangala yoga",
   "text": "The Moon with Mars: emotional drive turned into earning power and enterprise."
  },
  "raja": {
   "name": "Raja yoga",
   "text": "The lords of a kendra and a trikona ({a} and {b}) join: power and dharma unite; rise in status."
  },
  "dhana": {
   "name": "Dhana yoga",
   "text": "The lords of wealth and fortune ({a} and {b}) join: capacity to accumulate wealth."
  },
  "viparita": {
   "name": "Viparita Raja yoga",
   "text": "The lord of the {h}th house ({p}) sits in a dusthana: success that arises from adversity and from others' misfortunes."
  },
  "neechabhanga": {
   "name": "Neecha Bhanga",
   "text": "{p} is debilitated but its debilitation is cancelled: a weakness that becomes an exceptional strength."
  },
  "parivartana": {
   "name": "Parivartana (exchange)",
   "text": "{a} and {b} exchange signs: the two areas they rule are inseparably bound."
  },
  "kalasarpa": {
   "name": "Kala Sarpa pattern",
   "text": "All planets lie on one side of the Rahu–Ketu axis: a life driven by the nodal axis, with intense swings of fortune (a later, non-classical doctrine)."
  }
 },
 "wx": {
  "wood": "Wood",
  "fire": "Fire",
  "earth": "Earth",
  "metal": "Metal",
  "water": "Water"
 },
 "stem": {
  "0": "Yang Wood (Jia 甲)",
  "1": "Yin Wood (Yi 乙)",
  "2": "Yang Fire (Bing 丙)",
  "3": "Yin Fire (Ding 丁)",
  "4": "Yang Earth (Wu 戊)",
  "5": "Yin Earth (Ji 己)",
  "6": "Yang Metal (Geng 庚)",
  "7": "Yin Metal (Xin 辛)",
  "8": "Yang Water (Ren 壬)",
  "9": "Yin Water (Gui 癸)"
 },
 "animal": {
  "0": "Rat",
  "1": "Ox",
  "2": "Tiger",
  "3": "Rabbit",
  "4": "Dragon",
  "5": "Snake",
  "6": "Horse",
  "7": "Goat",
  "8": "Monkey",
  "9": "Rooster",
  "10": "Dog",
  "11": "Pig"
 },
 "dm": {
  "0": "Jia Wood is the tall tree: upright, principled and slow to bend. It grows steadily, needs space and sunlight (fire) to flourish, water to be nourished and metal to be shaped.",
  "1": "Yi Wood is the vine and the flower: flexible, diplomatic, surviving by winding around obstacles; resilience disguised as softness.",
  "2": "Bing Fire is the Sun: generous, radiant and open, wanting to warm everyone; it can exhaust itself and hates to be hidden.",
  "3": "Ding Fire is the candle and the star: intimate, perceptive, a steady glow that illuminates details; loyal, but it flickers in the wind.",
  "4": "Wu Earth is the mountain: stable, reliable and reserved; slow to move, immovable once set.",
  "5": "Ji Earth is the fertile field: nurturing, accommodating and practical; it cultivates others and can absorb too much.",
  "6": "Geng Metal is raw ore and the sword: decisive, just, blunt and heroic; it needs fire to be forged into usefulness.",
  "7": "Xin Metal is the jewel: refined, sensitive, valuing beauty and recognition; it needs water to shine and dislikes coarse treatment.",
  "8": "Ren Water is the ocean and the great river: expansive, intelligent, restless and strategic; it must be channelled by earth.",
  "9": "Gui Water is rain, dew and mist: intuitive, imaginative and subtle, nourishing unseen."
 },
 "god": {
  "friend": {
   "name": "Friend (比肩)",
   "text": "peers, independence and self-reliance; competition for shared resources."
  },
  "rob": {
   "name": "Rob Wealth (劫财)",
   "text": "rivalry, daring and risk; money that is shared or lost; social charisma."
  },
  "eating": {
   "name": "Eating God (食神)",
   "text": "talent expressed with ease: enjoyment, art, food and a gentle creativity."
  },
  "hurting": {
   "name": "Hurting Officer (伤官)",
   "text": "brilliance and rebellion; critique of authority, performance and unconventional genius."
  },
  "iwealth": {
   "name": "Indirect Wealth (偏财)",
   "text": "windfalls, deals and generosity; classically the father."
  },
  "dwealth": {
   "name": "Direct Wealth (正财)",
   "text": "steady income, diligence and saving; classically the wife in a man's chart."
  },
  "seven": {
   "name": "Seven Killings (七杀)",
   "text": "pressure, danger and the will to conquer; command under fire."
  },
  "officer": {
   "name": "Direct Officer (正官)",
   "text": "status, rules, reputation and responsibility; classically the husband in a woman's chart."
  },
  "iresource": {
   "name": "Indirect Resource (偏印)",
   "text": "unusual learning, metaphysics, intuition and solitude."
  },
  "dresource": {
   "name": "Direct Resource (正印)",
   "text": "the mother, education, protection, credentials and kindness."
  }
 },
 "nak": {
  "0": {
   "name": "Ashwini",
   "meaning": "the Ashvin twins, divine healers: speed, healing and fresh beginnings."
  },
  "1": {
   "name": "Bharani",
   "meaning": "Yama: bearing burdens, transitions of birth and death, restraint and intensity."
  },
  "2": {
   "name": "Krittika",
   "meaning": "Agni, the razor flame: cutting, purifying, sharp judgment and nourishing fire."
  },
  "3": {
   "name": "Rohini",
   "meaning": "Prajapati, the creator: growth, beauty, fertility, attraction and desire."
  },
  "4": {
   "name": "Mrigashira",
   "meaning": "Soma, the deer's head: searching, curiosity, the restless quest."
  },
  "5": {
   "name": "Ardra",
   "meaning": "Rudra, the storm: destruction that clears the way, intense emotion, research."
  },
  "6": {
   "name": "Punarvasu",
   "meaning": "Aditi: return and renewal, recovery of light after darkness, generosity."
  },
  "7": {
   "name": "Pushya",
   "meaning": "Brihaspati: nourishment, protection and dharma; the most auspicious of the mansions."
  },
  "8": {
   "name": "Ashlesha",
   "meaning": "the Nagas, the coiled serpent: hypnotic insight, binding, hidden power and cunning."
  },
  "9": {
   "name": "Magha",
   "meaning": "the ancestors (Pitris), the throne: lineage, royalty, honour and tradition."
  },
  "10": {
   "name": "Purva Phalguni",
   "meaning": "Bhaga: pleasure, love, rest and creativity."
  },
  "11": {
   "name": "Uttara Phalguni",
   "meaning": "Aryaman: contracts, patronage, loyalty and marriage."
  },
  "12": {
   "name": "Hasta",
   "meaning": "Savitar, the hand: skill, craft and the power to make things real."
  },
  "13": {
   "name": "Chitra",
   "meaning": "Vishvakarma, the bright jewel: design, brilliance and architecture."
  },
  "14": {
   "name": "Swati",
   "meaning": "Vayu, the shoot in the wind: independence, trade and flexibility."
  },
  "15": {
   "name": "Vishakha",
   "meaning": "Indra and Agni, the triumphal arch: single-minded ambition and victory after long effort."
  },
  "16": {
   "name": "Anuradha",
   "meaning": "Mitra, the lotus: friendship, devotion, cooperation and success far from home."
  },
  "17": {
   "name": "Jyeshtha",
   "meaning": "Indra, the eldest: seniority, protection, power and jealousy."
  },
  "18": {
   "name": "Mula",
   "meaning": "Nirriti, the root: getting to the root of things, uprooting, radical change."
  },
  "19": {
   "name": "Purva Ashadha",
   "meaning": "the Waters: invincibility, purification and persuasion."
  },
  "20": {
   "name": "Uttara Ashadha",
   "meaning": "the Vishvadevas: final victory, righteousness and lasting success."
  },
  "21": {
   "name": "Shravana",
   "meaning": "Vishnu, the ear: listening, learning, connection and renown through knowledge."
  },
  "22": {
   "name": "Dhanishta",
   "meaning": "the eight Vasus, the drum: rhythm, wealth, music and fame."
  },
  "23": {
   "name": "Shatabhisha",
   "meaning": "Varuna, the hundred physicians: healing, secrecy and cosmic law."
  },
  "24": {
   "name": "Purva Bhadrapada",
   "meaning": "Aja Ekapada: fiery idealism, ascetic intensity and transformation."
  },
  "25": {
   "name": "Uttara Bhadrapada",
   "meaning": "Ahir Budhnya, the serpent of the deep: depth, wisdom, restraint and stability."
  },
  "26": {
   "name": "Revati",
   "meaning": "Pushan, the shepherd: nourishment, safe journeys, compassion and completion."
  }
 },
 "mansion": {
  "0": {
   "name": "al-Sharatain",
   "meaning": "good for journeys and swift beginnings; unfavourable for partnerships."
  },
  "1": {
   "name": "al-Butain",
   "meaning": "finding hidden things and holding fast; steadiness."
  },
  "2": {
   "name": "al-Thurayya (the Pleiades)",
   "meaning": "good fortune, commerce and safe voyages; prosperity."
  },
  "3": {
   "name": "al-Dabaran",
   "meaning": "discord and obstinacy; the undoing of works."
  },
  "4": {
   "name": "al-Haq'a",
   "meaning": "learning, the favour of rulers and safe travel."
  },
  "5": {
   "name": "al-Han'a",
   "meaning": "love and friendship, the hunt and the siege."
  },
  "6": {
   "name": "al-Dhira",
   "meaning": "gain, commerce and affection between friends."
  },
  "7": {
   "name": "al-Nathra",
   "meaning": "love, friendship, travel and victory."
  },
  "8": {
   "name": "al-Tarf",
   "meaning": "harm and discord; good only for defence."
  },
  "9": {
   "name": "al-Jabha",
   "meaning": "love, strengthening of buildings and help against enemies."
  },
  "10": {
   "name": "al-Zubra",
   "meaning": "respect and awe, journeys, commerce and the freeing of captives."
  },
  "11": {
   "name": "al-Sarfa",
   "meaning": "separation and change; good for crops and servants."
  },
  "12": {
   "name": "al-Awwa",
   "meaning": "benevolence, commerce, harvest and liberation."
  },
  "13": {
   "name": "al-Simak",
   "meaning": "love between spouses and healing; poor for sea voyages."
  },
  "14": {
   "name": "al-Ghafr",
   "meaning": "unearthing treasure, friendship and the scattering of enemies."
  },
  "15": {
   "name": "al-Zubana",
   "meaning": "commerce and release from bonds; hindered journeys."
  },
  "16": {
   "name": "al-Iklil",
   "meaning": "turning ill fortune to good, lasting love and enduring buildings."
  },
  "17": {
   "name": "al-Qalb (the heart)",
   "meaning": "enmity and plots, victory over enemies and strong foundations."
  },
  "18": {
   "name": "al-Shawla (the sting)",
   "meaning": "siege, expulsion and the ruin of enemies; help in childbirth."
  },
  "19": {
   "name": "al-Na'aim",
   "meaning": "taming, binding and commerce."
  },
  "20": {
   "name": "al-Balda",
   "meaning": "harvest, building and gain; separation of spouses."
  },
  "21": {
   "name": "Sa'd al-Dhabih",
   "meaning": "escape, healing and departure."
  },
  "22": {
   "name": "Sa'd Bula",
   "meaning": "healing, harmony in marriage and the freeing of captives."
  },
  "23": {
   "name": "Sa'd al-Su'ud",
   "meaning": "the luck of lucks: marriage, good fortune and victory."
  },
  "24": {
   "name": "Sa'd al-Akhbiya",
   "meaning": "protection of crops, vengeance and siege."
  },
  "25": {
   "name": "al-Fargh al-Mukdim",
   "meaning": "unity and love, protection of travellers."
  },
  "26": {
   "name": "al-Fargh al-Mu'akhar",
   "meaning": "increase of trade and harvest, healing."
  },
  "27": {
   "name": "Batn al-Hut",
   "meaning": "increase of commerce, finding lost things, safety at sea and harmony in marriage."
  }
 },
 "tzolkin": {
  "0": {
   "name": "Imix (Crocodile)",
   "meaning": "the primordial waters: nurturing, beginnings and trust in life."
  },
  "1": {
   "name": "Ik' (Wind)",
   "meaning": "breath and spirit: communication, inspiration and change."
  },
  "2": {
   "name": "Ak'bal (Night)",
   "meaning": "the house of darkness: dreams, the inner sanctuary and mystery."
  },
  "3": {
   "name": "K'an (Seed)",
   "meaning": "the maize seed: potential, abundance and patient growth."
  },
  "4": {
   "name": "Chikchan (Serpent)",
   "meaning": "life force: instinct, passion and vitality."
  },
  "5": {
   "name": "Kimi (Death)",
   "meaning": "transformation, the ancestors and release."
  },
  "6": {
   "name": "Manik' (Deer)",
   "meaning": "healing, generosity and stewardship."
  },
  "7": {
   "name": "Lamat (Star)",
   "meaning": "harmony, fertility, art and abundance."
  },
  "8": {
   "name": "Muluk (Water)",
   "meaning": "emotion, purification and offering."
  },
  "9": {
   "name": "Ok (Dog)",
   "meaning": "loyalty, love and guidance; the heart."
  },
  "10": {
   "name": "Chuwen (Monkey)",
   "meaning": "artistry, play and the weaving of time."
  },
  "11": {
   "name": "Eb' (Road)",
   "meaning": "the path of life, service and community."
  },
  "12": {
   "name": "B'en (Reed)",
   "meaning": "authority, home and upward growth."
  },
  "13": {
   "name": "Ix (Jaguar)",
   "meaning": "magic, the wisdom of the earth and shamanic sight."
  },
  "14": {
   "name": "Men (Eagle)",
   "meaning": "vision, aspiration and freedom."
  },
  "15": {
   "name": "Kib' (Owl)",
   "meaning": "the wisdom of the ancestors, forgiveness and the inner voice."
  },
  "16": {
   "name": "Kab'an (Earth)",
   "meaning": "movement, synchronicity and knowledge."
  },
  "17": {
   "name": "Etz'nab' (Flint)",
   "meaning": "truth, cutting through illusion, decisiveness."
  },
  "18": {
   "name": "Kawak (Storm)",
   "meaning": "renewal and catalysis; healing through upheaval."
  },
  "19": {
   "name": "Ajaw (Lord)",
   "meaning": "the Sun: mastery, enlightenment and completion."
  }
 },
 "lib": {
  "title": "Library and method",
  "meta": "What this program takes from which tradition and text.",
  "sourcesTitle": "Foundational texts of the world's traditions",
  "methodsTitle": "What is computed",
  "validityTitle": "On validity",
  "validity": "Astrology is an ancient and rich heritage of human culture, and this program applies its rules faithfully and precisely. Scientific studies, however, have not confirmed its predictive power. Treat it as a mirror for reflection and a way into this tradition, not as a verdict; for medical, legal and financial decisions, consult a professional.",
  "methods": [
   [
    "The sky",
    "Sun, Moon and seven planets (plus three modern planets for reference) from the Astronomy Engine ephemeris in the true ecliptic of date; the mean lunar node; Ascendant and Midheaven from sidereal time and true obliquity; declinations; Lahiri sidereal positions."
   ],
   [
    "Houses",
    "Placidus, Regiomontanus (Lilly's choice for horary), whole sign (Hellenistic and early Persian) and equal houses."
   ],
   [
    "Essential and accidental dignity",
    "Domicile, exaltation, triplicity (Dorothean, by sect), Egyptian terms, Chaldean faces, detriment, fall and peregrination, plus house, motion, speed, orientality, combustion, cazimi, partile aspects and the royal stars, all scored on Lilly's table."
   ],
   [
    "Hellenistic",
    "Sect, benefic and malefic of sect, overcoming (superior square), besiegement, prenatal syzygy, ten lots including the seven Hermetic lots of Paulus, zodiacal releasing from Spirit and Fortune with peaks and loosing of the bond."
   ],
   [
    "Perso-Arabic",
    "Firdaria with sub-periods, annual profections, solar return (tahwil), almuten of the chart, chain of dispositors and receptions, the 28 lunar mansions, planetary days and hours."
   ],
   [
    "Patterns",
    "Grand trines, T-squares, grand crosses, yods, kites, mystic rectangles and stelliums; Jones chart shapes; hemispheres; unaspected and out-of-bounds planets; parallels, antiscia and contra-antiscia; Ebertin midpoint pictures; quintile, septile and novile harmonics."
   ],
   [
    "Jyotish",
    "Sidereal Lagna, 27 nakshatras with padas, Vimshottari mahadasha and antardasha, navamsa and vargottama, Gaja Kesari, Budha-Aditya, the five Mahapurusha, Raja, Dhana, Viparita, Neecha Bhanga, Parivartana, Kemadruma, Kala Sarpa, Sade Sati and Kuja dosha."
   ],
   [
    "Bazi",
    "Four pillars in local solar time with the Lichun year boundary and solar-term months, day master strength with hidden stems, useful elements, the ten gods, clashes, harmonies, three-harmony frames, stem combinations and the ten-year luck pillars."
   ],
   [
    "Synthesis",
    "Key planets named by several independent systems, life arenas, current time lords across seven systems, hidden links between planets with no aspect, and agreements and contradictions between traditions."
   ],
   [
    "Horary",
    "Considerations before judgment, significators, perfection with the exact date from the ephemeris, refranation, prohibition, translation and collection of light, reception, the Moon's next aspect and Lilly's symbolic timing."
   ],
   [
    "Elections",
    "Every 20 minutes over the chosen range, scored on the Moon, the Ascendant, the houses of the matter, benefics and malefics on the angles, retrogrades of Mercury and Venus, and planetary hours."
   ],
   [
    "Mundane",
    "The Aries ingress, the lord of the year, quarter charts by Abu Ma'shar's rule, eclipses and their signs, Jupiter–Saturn conjunctions and mutations, Mars–Saturn and Mars–Jupiter conjunctions, stations and ingresses."
   ],
   [
    "Progressions and cycles",
    "Secondary progressions, the progressed lunation phase, Saturn and Jupiter returns, the Uranus opposition, the nodal return and the Maya Tzolk'in."
   ]
  ]
 },
 "sources": [
  {
   "tradition": "Mesopotamia",
   "books": [
    {
     "name": "Enuma Anu Enlil",
     "era": "c. 1600–1000 BCE, Babylon",
     "use": "The omen tradition: eclipses and lunar signs read for king and country; the root of mundane astrology."
    },
    {
     "name": "MUL.APIN",
     "era": "c. 1000 BCE",
     "use": "Star catalogue, the path of the Moon and the first zodiacal framework."
    }
   ]
  },
  {
   "tradition": "Hellenistic",
   "books": [
    {
     "name": "Dorotheus of Sidon, Carmen Astrologicum",
     "era": "1st century CE",
     "use": "Triplicity lords, elections and the rules for the Moon at beginnings."
    },
    {
     "name": "Claudius Ptolemy, Tetrabiblos",
     "era": "2nd century CE, Alexandria",
     "use": "Natures of planets and signs, temperament, aspect theory, mundane eclipses, the Egyptian terms, the prenatal syzygy."
    },
    {
     "name": "Vettius Valens, Anthology",
     "era": "2nd century CE",
     "use": "Sect, lots and zodiacal releasing with its peaks and loosing of the bond."
    },
    {
     "name": "Firmicus Maternus, Mathesis",
     "era": "4th century CE",
     "use": "Antiscia, the doctrine of the chart's ruler, detailed natal delineation."
    },
    {
     "name": "Paulus Alexandrinus, Introduction; Rhetorius",
     "era": "4th–7th centuries CE",
     "use": "The seven Hermetic lots; overcoming and besiegement."
    }
   ]
  },
  {
   "tradition": "Persian and Arabic",
   "books": [
    {
     "name": "Masha'allah",
     "era": "8th century, Basra",
     "use": "Horary judgment and the revolutions of the years of the world."
    },
    {
     "name": "Abu Ma'shar al-Balkhi, The Great Introduction; Book of Religions and Dynasties",
     "era": "9th century, Balkh and Baghdad",
     "use": "Firdaria, the great conjunctions and their mutations, the revolutions of the years of the world."
    },
    {
     "name": "Sahl ibn Bishr, Introduction and The Fifty Judgments",
     "era": "9th century, Khorasan",
     "use": "Considerations before judgment and the modes of perfection."
    },
    {
     "name": "al-Qabisi, Introduction to Astrology",
     "era": "10th century",
     "use": "The almuten and the weighing of testimonies."
    },
    {
     "name": "Kushyar Gilani, Mujmal al-Usul",
     "era": "10th–11th century",
     "use": "Principles of judgment and the strength of planets."
    },
    {
     "name": "Abu Rayhan al-Biruni, Kitab al-Tafhim",
     "era": "1029, in Persian and Arabic",
     "use": "Definitions, houses, the 97 lots, the lunar mansions and planetary hours."
    },
    {
     "name": "Ghayat al-Hakim (Picatrix)",
     "era": "10th–11th century",
     "use": "The 28 lunar mansions and their uses."
    },
    {
     "name": "Nasir al-Din al-Tusi, Si Fasl",
     "era": "13th century",
     "use": "Calendar knowledge and elections, in Persian."
    }
   ]
  },
  {
   "tradition": "Hebrew",
   "books": [
    {
     "name": "Abraham ibn Ezra, The Beginning of Wisdom; The Book of Reasons",
     "era": "12th century",
     "use": "The almuten of the chart, dignities and the reasons behind the rules."
    }
   ]
  },
  {
   "tradition": "Latin and Renaissance Europe",
   "books": [
    {
     "name": "Guido Bonatti, Liber Astronomiae",
     "era": "13th century",
     "use": "Elections, the order of the firdaria and practical judgment."
    },
    {
     "name": "Johannes Kepler, Harmonices Mundi",
     "era": "1619",
     "use": "The minor aspects (quintile, sesquiquadrate) and the harmonic view of the sky."
    },
    {
     "name": "Placidus de Titis, Primum Mobile",
     "era": "1650s",
     "use": "The Placidus house system."
    },
    {
     "name": "William Lilly, Christian Astrology",
     "era": "1647",
     "use": "The table of essential and accidental dignity, horary rules, timing and temperament."
    },
    {
     "name": "Jean-Baptiste Morin, Astrologia Gallica",
     "era": "1661",
     "use": "Rulership and determination: how a planet acts through the houses it rules."
    }
   ]
  },
  {
   "tradition": "India",
   "books": [
    {
     "name": "Brihat Parashara Hora Shastra",
     "era": "classical compilation",
     "use": "Rasi and navamsa, bhavas, the Vimshottari dasha and the yogas."
    },
    {
     "name": "Varahamihira, Brihat Jataka and Brihat Samhita",
     "era": "6th century, Ujjain",
     "use": "Natal yogas and mundane omens."
    },
    {
     "name": "Kalyanavarma, Saravali; Mantreswara, Phaladeepika",
     "era": "10th–14th centuries",
     "use": "Yogas, cancellations and the effects of planets in houses."
    },
    {
     "name": "Jaimini Sutras",
     "era": "classical",
     "use": "Sign aspects and karakas."
    }
   ]
  },
  {
   "tradition": "China",
   "books": [
    {
     "name": "Xu Ziping, Yuan Hai Zi Ping",
     "era": "Song dynasty",
     "use": "The four pillars centred on the day master and the ten gods."
    },
    {
     "name": "San Ming Tong Hui",
     "era": "Ming dynasty",
     "use": "Branch interactions, the strength of the day master and the luck pillars."
    },
    {
     "name": "Di Tian Sui",
     "era": "Ming dynasty",
     "use": "Balance of the five phases and the choice of useful elements."
    }
   ]
  },
  {
   "tradition": "Maya",
   "books": [
    {
     "name": "Dresden Codex",
     "era": "11th–12th century",
     "use": "The 260-day Tzolk'in and its almanacs; Venus tables."
    }
   ]
  },
  {
   "tradition": "Modern",
   "books": [
    {
     "name": "Reinhold Ebertin, The Combination of Stellar Influences",
     "era": "1940",
     "use": "Midpoints and planetary pictures on the 90° dial."
    },
    {
     "name": "Marc Edmund Jones, The Guide to Horoscope Interpretation",
     "era": "1941",
     "use": "Chart shapes."
    },
    {
     "name": "Dane Rudhyar, The Lunation Cycle",
     "era": "1967",
     "use": "The eight lunation phases and the progressed lunation."
    },
    {
     "name": "John Addey, Harmonics in Astrology",
     "era": "1976",
     "use": "The harmonic theory of aspects (fifth, seventh, ninth)."
    }
   ]
  }
 ],
 "cities": {},
 "syn": {
  "meter": {
   "attraction": "Attraction",
   "harmony": "Harmony",
   "durability": "Durability",
   "friction": "Friction"
  },
  "scoresTitle": "Scores",
  "scores": "Attraction {a}, harmony {h}, durability {d}, friction {f} (out of 10).",
  "overallTitle": "Compatibility {pct}%",
  "overall": {
   "strong": "A strong bond: attraction, understanding and staying power support each other. Such unions are counted among the fortunate in the classical texts.",
   "good": "A good match: real affinity, with a few points that ask for conscious care.",
   "work": "A bond that asks for work: there is a meeting point, but differences are significant and the relationship grows only with effort and maturity.",
   "hard": "A difficult combination: the charts pull in different directions. It can teach a great deal, but harmony will not come by itself."
  },
  "overallWhy": "Synastry: attraction {a}, harmony {h}, durability {d}, friction {f}; Guna Milan {k}/36.",
  "ptolTitle": "Ptolemy's rule of the luminaries (Tetrabiblos IV.5)",
  "ptol": {
   "lights": "The Sun of one and the Moon of the other stand in the same or harmonious signs: Ptolemy's first sign of a lasting, concordant union.",
   "exchange": "The Sun of one conjoins the Moon of the other: the classic signature of marriage and deep mutual recognition.",
   "moons": "Both Moons are in the same or harmonious signs: daily life, moods and needs fit together naturally.",
   "none": "The luminaries are not in harmonious signs: by Ptolemy's rule concord must be built through other ties, such as Venus, Jupiter and shared purpose."
  },
  "contact": "{a} {asp} {b}",
  "contactText": {
   "conj": "\"{x}\" of one fuses with \"{y}\" of the other (orb {orb}°): a strong, immediate bond in this area.",
   "easy": "\"{x}\" of one supports \"{y}\" of the other (orb {orb}°): ease and natural understanding here.",
   "hard": "\"{x}\" of one challenges \"{y}\" of the other (orb {orb}°): a magnetism that also brings tension to be worked through."
  },
  "saturnNote": "Saturn contacts are the glue of long relationships: they bind and stabilise, and can also feel heavy or restricting.",
  "overlayTitle": "Each one's planets in the other's houses",
  "overlay": {
   "b2a": "Their {p} falls in your house {h}: {meaning}",
   "a2b": "Your {p} falls in their house {h}: {meaning}"
  },
  "ovh": {
   "1": "felt strongly and personally; it shapes how the other sees themselves.",
   "5": "romance, play and pleasure.",
   "7": "the house of marriage itself: a natural pull toward partnership.",
   "8": "intensity, intimacy and shared resources.",
   "12": "something hidden or karmic; a bond that is hard to explain."
  },
  "kootaTitle": "Guna Milan (Ashtakoota): {n} of 36",
  "koota": {
   "varna": "Varna",
   "vashya": "Vashya",
   "tara": "Tara",
   "yoni": "Yoni",
   "maitri": "Graha Maitri",
   "gana": "Gana",
   "bhakoot": "Bhakoot",
   "nadi": "Nadi"
  },
  "kootaVerdict": {
   "excellent": "Excellent by the Indian standard (28 or more).",
   "good": "Good (24 or more).",
   "fair": "Acceptable (18 or more), the traditional minimum for marriage.",
   "weak": "Below the traditional minimum of 18."
  },
  "nadiDosha": "Nadi dosha: both Moons are in the same nadi, which the texts treat as the most serious mismatch, mainly for health and children; many cancellations exist.",
  "bhakootDosha": "Bhakoot dosha: the Moon signs are in a 2-12, 5-9 or 6-8 relation, which can strain finances or harmony.",
  "kootaNote": "Computed from the sidereal Moon of each person (Vashya and Yoni simplified).",
  "baziTitle": "Chinese pillars: day masters and branches",
  "baziDm": {
   "same": "Both day masters are of the same phase ({a} and {b}): peers and allies, sometimes rivals.",
   "aFeedsB": "Your day master {a} nourishes theirs ({b}): you give and support; they flourish through you.",
   "bFeedsA": "Their day master {b} nourishes yours ({a}): they support you and help you grow.",
   "aControlsB": "Your day master {a} controls theirs ({b}): in classical Zi Ping this is the man's wife star, a traditional pairing, as long as control does not become domination.",
   "bControlsA": "Their day master {b} controls yours ({a}): in classical Zi Ping this is the woman's husband star, a traditional pairing that brings structure and challenge."
  },
  "baziDay": {
   "clash": "The two day branches (spouse palaces) clash: lively, but prone to friction in daily life together.",
   "harmony": "The two day branches form a six harmony: a secret, natural fit between the spouse palaces.",
   "same": "The day branches are the same: similar needs in intimacy.",
   "neutral": "The day branches are neutral to each other."
  },
  "baziYear": {
   "clash": "The year animals {a} and {b} clash.",
   "harmony": "The year animals {a} and {b} are a harmonious pair.",
   "trine": "The year animals {a} and {b} belong to the same trine of allies.",
   "neutral": "The year animals {a} and {b} are neutral."
  }
 },
 "love": {
  "venusTitle": "Venus: how you love",
  "venus": "Venus at {pos}, house {h}, {word}.",
  "venusEl": {
   "fire": "You love with fire: openly, quickly, with admiration and pursuit.",
   "earth": "You love through the senses and through loyalty: slowly, tangibly, for the long run.",
   "air": "You love through the mind: conversation, friendship and freedom matter as much as passion.",
   "water": "You love deeply and emotionally: you need closeness, trust and to be truly understood."
  },
  "venusStrong": "A strong Venus gives charm and good fortune in love; affection comes to you.",
  "venusWeak": "A weak Venus means love asks for more effort and discernment; disappointments teach what you truly value.",
  "venusMid": "Venus is moderate: love depends on choices and timing.",
  "venusRetro": "Venus retrograde at birth: love is re-examined; old bonds return, and the heart chooses late but knowingly.",
  "venusCombust": "Venus combust: feelings are hidden or overshadowed by duty and ego; love grows when it is brought into the open.",
  "marsTitle": "Mars: desire and pursuit",
  "mars": "Mars at {pos}, house {h}.",
  "marsEl": {
   "fire": "Desire is direct and bold; you pursue openly.",
   "earth": "Desire is steady and physical; you prove love through action.",
   "air": "Desire starts in the mind; wit and words arouse you.",
   "water": "Desire is emotional and intense; you need deep connection."
  },
  "partnerTitle": "The partner you are drawn to (7th house)",
  "desc": "The Descendant is in {sign}; the partner tends to show this nature:",
  "lord7": "The lord of the 7th, {p}, sits in house {h} and is {word}: partners are met through, and marriage is bound up with, {topics}.",
  "in7": {
   "sun": "The Sun in the 7th: a partner of standing and strong character; you may define yourself through relationship.",
   "moon": "The Moon in the 7th: a strong need for partnership; the partner is caring, or changeable.",
   "mercury": "Mercury in the 7th: a partner who is young in spirit, communicative or connected to work and trade.",
   "venus": "Venus in the 7th: one of the best signs for a happy, harmonious marriage.",
   "mars": "Mars in the 7th: passion and also quarrels; a strong-willed partner.",
   "jupiter": "Jupiter in the 7th: a generous, wise or fortunate partner; marriage brings growth.",
   "saturn": "Saturn in the 7th: late or serious commitment, often to an older or responsible partner; lasting once made."
  },
  "ptolTitle": "Ptolemy's significator of the spouse",
  "ptolM": "For a man Ptolemy judges the wife from the Moon: here {p} at {pos}, house {h}, in a {mode} sign.",
  "ptolF": "For a woman Ptolemy judges the husband from the Sun: here {p} at {pos}, house {h}, in a {mode} sign.",
  "ptolMode": {
   "movable": "A cardinal sign: marriage may come early, or more than once.",
   "fixed": "A fixed sign: one lasting marriage is indicated.",
   "common": "A mutable sign: more than one significant union is possible."
  },
  "ptolHit": {
   "ben": "Its {asp} with {p} promises a good and helpful spouse.",
   "benHard": "Its {asp} with {p} gives benefit mixed with excess.",
   "malEasy": "Its {asp} with {p} adds seriousness and steadiness.",
   "mal": "Its {asp} with {p} brings friction, delay or a demanding partner."
  },
  "easeTitle": "Ease or delay in marriage",
  "d": {
   "satVenus": "Saturn afflicts Venus",
   "sat7": "Saturn touches the Descendant",
   "venusRetro": "Venus is retrograde",
   "satIn7": "Saturn occupies the 7th",
   "lord7cadent": "the 7th lord is in a hidden house"
  },
  "e": {
   "jupVenus": "Jupiter helps Venus",
   "benIn7": "a benefic occupies the 7th",
   "lord7good": "the 7th lord is well placed",
   "moonVenus": "the Moon and Venus agree"
  },
  "easeList": "In favour: {list}.",
  "delayList": "Delaying factors: {list}.",
  "easeVerdict": "Love and marriage come relatively easily.",
  "delayVerdict": "Commitment tends to come later, after maturity; what is built then is solid.",
  "mixedVerdict": "Ease and delay are balanced: timing and choices decide.",
  "vedTitle": "Indian view: the 7th lord and the navamsa",
  "ved": "The sidereal 7th lord {lord} sits in bhava {h} ({topics}). Venus in the navamsa (the chart of marriage) is in {nav}.",
  "navEl": {
   "fire": "A spirited, independent spouse.",
   "earth": "A practical, loyal spouse.",
   "air": "A sociable, intelligent spouse.",
   "water": "A sensitive, devoted spouse."
  },
  "manglik": "Mars placement (Kuja dosha) is present: tradition advises a partner with a similar Mars, or patience before marrying.",
  "baziTitle": "Chinese view: the spouse palace",
  "bazi": "Your spouse palace (day branch) holds {g}: {gt}",
  "baziInter": "The spouse palace is involved in: {list}.",
  "baziCalm": "The spouse palace is undisturbed: a stable inner picture of partnership.",
  "baziStarM": "For a man the wife star is {el}; its strength in the chart is {n}.",
  "baziStarF": "For a woman the husband star is {el}; its strength in the chart is {n}.",
  "baziStarX": "Choose a sex in the Natal chart settings to read the spouse star.",
  "w": {
   "prof": "the profection year activates house {h} (lord {p})",
   "firdar": "the firdaria of Venus is running",
   "firdarSub": "the Venus sub-period of the firdaria is running",
   "dasha": "the mahadasha of {p}",
   "antar": "the antardasha of {p} (until {to})"
  },
  "timingTitle": "Timing of love",
  "timingNow": "Active now: {list}. This is a favourable period for meeting or committing.",
  "timingQuiet": "No main love time lord is active right now.",
  "jup7": "Jupiter, the great benefic, transits your 7th sign ({sign}): {when}; traditionally the strongest window for marriage.",
  "jupVenus": "Jupiter returns to the sign of your Venus from {when}: a season of affection and opportunity."
 },
 "money": {
  "capacityTitle": "Capacity for wealth (2nd house)",
  "house2": "The 2nd house is in {sign}; its lord {p} sits in house {h} and is {word}.",
  "source": "Money comes through {topics}.",
  "src": {
   "1": "your own person, skills and initiative",
   "2": "your own resources and what you already hold",
   "3": "communication, writing, selling, short trips, siblings and neighbours",
   "4": "land, property, family and inherited foundations",
   "5": "creativity, entertainment, speculation and children",
   "6": "service, employment, craft and health work",
   "7": "partners, clients, marriage and contracts",
   "8": "other people's money: investors, loans, inheritance and shared assets",
   "9": "foreign lands, teaching, law, publishing and travel",
   "10": "career, authority and public reputation",
   "11": "friends, networks, patrons and the profits of work",
   "12": "work behind the scenes, institutions, distant or isolated places and confidential matters"
  },
  "in2": {
   "sun": "The Sun in the 2nd: earning through position, leadership and visibility; spending on status.",
   "moon": "The Moon in the 2nd: fluctuating income; earning from the public, food, homes or anything that changes.",
   "mercury": "Mercury in the 2nd: earning by the mind: trade, writing, teaching, numbers.",
   "venus": "Venus in the 2nd: a classic sign of wealth; earning through beauty, art, pleasure or partnership.",
   "mars": "Mars in the 2nd: bold earning and bold spending; money through effort, engineering or risk.",
   "jupiter": "Jupiter in the 2nd: the best signature of abundance; money grows and returns.",
   "saturn": "Saturn in the 2nd: wealth built slowly and kept carefully; early scarcity, later solidity."
  },
  "lotsTitle": "Lots of Fortune and Substance",
  "fortune": "The Lot of Fortune at {pos}, house {h} ({topics}); its lord {p} is {word}.",
  "substance": "The Lot of Substance (Abu Ma'shar) at {pos}, house {h} ({topics}); its lord {p} is {word}.",
  "jupTitle": "Jupiter, significator of wealth",
  "jup": "Jupiter at {pos}, house {h} ({topics}), {word}.",
  "jupStrong": "A strong Jupiter: opportunities come, and generosity returns multiplied.",
  "jupWeak": "A weak Jupiter: growth needs discipline; beware of overextending and trusting the wrong people.",
  "jupMid": "Jupiter is moderate: growth follows effort and good counsel.",
  "flowsTitle": "Income, career and other people's money",
  "flows": "Lord of the 11th (income from work) {p11}: {w11}, in house {h11}. Lord of the 10th (career) {p10}: {w10}. Lord of the 8th (loans, investors, inheritance) {p8}: {w8}, in house {h8}.",
  "flows8": "Other people's money is stronger than your own income: partnerships, investors, loans or inheritance play a large role.",
  "flows11": "Your own earnings are stronger than other people's money: build income from your work and network.",
  "flowsEven": "Own income and others' money are balanced.",
  "styleTitle": "Your financial temperament",
  "style": "Your money is led by {p}, seconded by {q}.",
  "styleText": {
   "value": "Saturn style: patient, value-driven and long-term; real estate, land, and slow compounding suit you.",
   "growth": "Jupiter style: growth and expansion; education, publishing, law, international ventures.",
   "aggressive": "Mars style: fast, competitive and risk-taking; set strict limits.",
   "beauty": "Venus style: beauty, design, luxury, hospitality and partnerships.",
   "trader": "Mercury style: trading, commerce, technology and information; quick decisions.",
   "cyclical": "Moon style: cyclical and intuitive; consumer goods, food, homes; watch the cycles.",
   "leader": "Sun style: leadership, your own enterprise and public reputation."
  },
  "styleSecond": "Secondary note: {text}",
  "uranus": "Uranus touches your money houses: sudden gains and losses; technology and the unusual.",
  "neptune": "Neptune touches your money houses: intuition, but also confusion; verify everything in writing.",
  "baziTitle": "Chinese view: the wealth star",
  "bazi": "Your wealth element is {el} (strength {n}); its planet is {p}.",
  "baziCase": {
   "strongStrong": "A strong day master with a strong wealth star: you can carry great wealth. Classical texts call this a rich chart.",
   "strongWeak": "A strong day master with a weak wealth star: the capacity is there but opportunities must be created; wealth arrives in favourable luck pillars.",
   "weakStrong": "A weak day master facing strong wealth: wealth is visible but heavy to hold. Partnerships, support and caution with debt are key.",
   "weakWeak": "Both modest: steady, earned prosperity rather than windfalls; build resources first."
  },
  "vedTitle": "Indian view: lords of wealth and gain",
  "ved": "The 2nd lord {l2} is in bhava {h2}; the 11th lord {l11} is in bhava {h11}.",
  "vedYogas": "Wealth-related yogas: {list}.",
  "vedNone": "No classic wealth yoga stands out; wealth follows the dashas of the 2nd and 11th lords.",
  "t": {
   "prof": "the profection year activates house {h}",
   "profLord": "the year lord {p} rules a money house",
   "jup": "Jupiter transits your house {h}",
   "sat": "Saturn transits your house {h} (tighten and consolidate)",
   "dasha": "the mahadasha of {p}",
   "luck": "the luck pillar carries your wealth element",
   "zr": "zodiacal releasing from Fortune is in a peak period"
  },
  "timingTitle": "Financial timing now",
  "timing": "Active now: {list}.",
  "timingQuiet": "No major financial time lord is active now: a period for steady work and preparation rather than big moves."
 },
 "cal": {
  "newMoon": "New Moon in {sign}",
  "fullMoon": "Full Moon in {sign}",
  "newMoonText": "A beginning: traditionally good for starting, planting and buying for the long run.",
  "fullMoonText": "A culmination: things come to a head; traditionally good for selling and completing, poor for starting.",
  "station": {
   "mercury": {
    "retro": "Mercury retrograde begins: delays, misunderstandings and revised deals. Read contracts twice.",
    "direct": "Mercury turns direct: communication and deals clear up."
   },
   "venus": {
    "retro": "Venus retrograde begins: values and prices are reassessed; avoid luxury purchases.",
    "direct": "Venus turns direct: confidence in value returns."
   },
   "mars": {
    "retro": "Mars retrograde begins: energy turns inward; avoid aggressive moves.",
    "direct": "Mars turns direct: momentum returns."
   }
  },
  "eclipse": "Eclipses mark sudden turning points; traditional astrologers avoid starting or committing near them."
 },
 "trade": {
  "assetKw": {
   "stocks": [
    "stock",
    "share",
    "equity",
    "etf",
    "index"
   ],
   "crypto": [
    "crypto",
    "bitcoin",
    "btc",
    "ethereum",
    "eth",
    "coin",
    "token"
   ],
   "gold": [
    "gold",
    "silver",
    "coin",
    "metal"
   ],
   "currency": [
    "dollar",
    "euro",
    "currency",
    "forex",
    "usd",
    "exchange rate"
   ],
   "property": [
    "house",
    "home",
    "apartment",
    "flat",
    "property",
    "land",
    "real estate"
   ],
   "vehicle": [
    "car",
    "vehicle",
    "motorbike",
    "motorcycle",
    "truck"
   ],
   "goods": [
    "goods",
    "stock of",
    "merchandise",
    "product",
    "inventory"
   ]
  },
  "asset": {
   "stocks": "Stocks and shares",
   "crypto": "Cryptocurrency",
   "gold": "Gold and precious metals",
   "currency": "Foreign currency",
   "property": "House or property",
   "vehicle": "Car or vehicle",
   "goods": "Goods and merchandise"
  },
  "sig": {
   "buy": "You (the buyer) are {a}; the seller is {b}; the price is shown by {price}, the thing by {thing}, and the end of the deal by {end}.",
   "sell": "You (the seller) are {a}; the buyer is {b}; the price is shown by {price}, the thing by {thing}, and the end of the deal by {end}."
  },
  "sameLord": "One planet ({p}) rules both sides: the deal is in your hands.",
  "deal": "{a} and {b} perfect a {asp} on {date}: the deal can be made.",
  "noDeal": "{a} and {b} do not come together soon: the deal is unlikely to close now.",
  "edgeYou": "Your significator {a} is stronger than the other side's ({b}): you hold the advantage.",
  "edgeThem": "The other side ({b}) is stronger than you ({a}): they hold the advantage; negotiate carefully.",
  "edgeEven": "Both sides ({a} and {b}) are of similar strength.",
  "price": {
   "high": "The lord of the 10th ({p}) is strong and angular: the price is high or firm.",
   "low": "The lord of the 10th ({p}) is weak or cadent: the price is low or negotiable.",
   "fair": "The lord of the 10th ({p}) is moderate: the price is fair."
  },
  "moonWaxing": "The Moon is increasing in light: by tradition prices tend to rise, which favours selling.",
  "moonWaning": "The Moon is decreasing in light: by tradition prices tend to fall, which favours buying.",
  "thing": "The planet of the asset, {p}, is {word}.",
  "thingRetro": "It is retrograde: second thoughts, returns or hidden defects.",
  "end": "The end of the deal (lord of the 4th, {p}) is {word}.",
  "mercRetro": "Mercury, lord of commerce, is retrograde: errors in papers and changes of mind.",
  "verdict": {
   "buy": {
    "go": "Buy: the sky supports buying now.",
    "lean": "Leaning toward buying, with care over price and terms.",
    "wait": "Wait: the signs are mixed; a better moment is listed below.",
    "no": "Do not buy now: the testimonies are against it."
   },
   "sell": {
    "go": "Sell: the sky supports selling now.",
    "lean": "Leaning toward selling, with care over price and terms.",
    "wait": "Wait: the signs are mixed; a better moment is listed below.",
    "no": "Do not sell now: the testimonies are against it."
   }
  }
 },
 "chat": {
  "buyKw": [
   "buy",
   "purchase",
   "invest in",
   "should i get"
  ],
  "sellKw": [
   "sell",
   "cash out",
   "take profit",
   "get rid of"
  ],
  "tradeIntro": "Judged by Lilly's rules on buying and selling for this moment ({asset}):",
  "tradeMore": "The Buy & sell tab lists the best upcoming moments.",
  "ruleIntro": "Judged by the classical rules of horary for this moment (topic: {topic}):",
  "ruleNatal": "In your natal chart, house {h}:",
  "ruleNote": "For a fuller, conversational answer, open this page in Claude."
 }
};
