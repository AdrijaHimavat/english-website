# Akhtarnameh (اخترنامه)

An astrology web app in 16 languages (Persian, English, Arabic, Turkish, Spanish, French, German, Russian, Chinese, Hindi, Portuguese, Urdu, Japanese, Korean, Italian, Indonesian). Planet positions come from an accurate ephemeris; judgments follow the rules of the classical traditions of the world, and a synthesis step looks for what independent traditions agree on.

## Traditions and techniques

| Tradition | Techniques |
|---|---|
| Mesopotamian / Hellenistic (Ptolemy, Dorotheus, Valens, Paulus, Firmicus) | sect, essential and accidental dignity, temperament, overcoming, besiegement, prenatal syzygy, ten lots incl. the Hermetic lots, zodiacal releasing (peaks, loosing of the bond), antiscia |
| Persian / Arabic (Masha'allah, Abu Ma'shar, Sahl, al-Biruni, al-Qabisi) | firdaria, profections, solar return, almuten, dispositor chains, 28 lunar mansions, planetary hours, horary, elections, Aries ingress, great conjunctions |
| Hebrew / Latin / Renaissance (Ibn Ezra, Bonatti, Lilly, Morin, Kepler) | almuten figuris, Lilly's dignity table and horary rules, Regiomontanus and Placidus houses, minor aspects |
| India (Parashara, Varahamihira) | sidereal Lagna (Lahiri), nakshatras and padas, Vimshottari dasha, navamsa and vargottama, 16 yogas, Sade Sati, Kuja dosha |
| China (Zi Ping) | four pillars in local solar time, day master strength, useful elements, ten gods, clashes and harmonies, luck pillars |
| Modern (Ebertin, Addey, Jones, Rudhyar) | configurations, chart shapes, declination and out-of-bounds, midpoint pictures, 5th/7th/9th harmonics, progressions and lunation phase, returns |
| Maya | Tzolk'in day sign |

The **synthesis** names the planets singled out by several systems at once, the life arenas where the chart concentrates, the planet that the current time lords of seven timing systems agree on, hidden links between planets with no classical aspect, and where the traditions agree or contradict each other. When the page runs inside Claude, a conversational astrologer answers free questions from all of this data in the selected language.

## Sections

- **Natal chart** with the cross-tradition deep reading.
- **Love & compatibility**: love nature (Venus, Mars, 7th house, Ptolemy's spouse significator, navamsa, Bazi spouse palace, timing) and synastry between two people: Ptolemy's rule of the luminaries, inter-aspects, house overlays, Guna Milan (Ashtakoota, 36 points) and Bazi day-master and branch relations, combined into one percentage with attraction, harmony, durability and friction scores.
- **Money & wealth**: 2nd house, Lots of Fortune and Substance, Jupiter, income versus other people's money, financial temperament, the Bazi wealth star, Indian wealth yogas, current financial timing and a market calendar (lunations, retrogrades, eclipses).
- **Buy & sell**: a judgment for this moment by Lilly's rules (buyer, seller, price, end of the deal) and the best upcoming moments to buy or sell stocks, crypto, gold, currency, property, vehicles or goods. Not financial advice.
- **Chat**: free questions; each one is also cast as a horary chart. Inside Claude the astrologer answers from all the data; elsewhere a rule-based horary or deal judgment answers.
- **Horary, Elections, Mundane (world year)** and **Library**.

## Run

Open `index.html` in a browser; no server or build is needed. `app.html` is the same page without the document wrapper (the artifact source); after editing it, regenerate `index.html` with `node astrology-app/build.mjs`.

## Translations

`lang/en.js` is the master catalog; every other `lang/<code>.js` mirrors its keys. Check a catalog with:

```sh
node astrology-app/test/check-lang.cjs fa --full
```

It compares keys, placeholders and array lengths with English and renders thousands of real sentences in that language, reporting any missing key or unfilled placeholder.

## Test

```sh
node --test astrology-app/test/engine.test.cjs
node astrology-app/test/render-all.cjs en
```

Positions use [Astronomy Engine](https://github.com/cosinekitty/astronomy) (MIT), vendored in `vendor/`.
