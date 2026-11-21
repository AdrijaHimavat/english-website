# اخترنامه (Akhtarnameh)

A Persian (RTL) classical-astrology web app. Planet positions come from an accurate ephemeris; judgments follow the rules of the classical texts (Ptolemy, Dorotheus, Valens, Masha'allah, Abu Ma'shar, Sahl ibn Bishr, al-Biruni, Bonatti, Lilly).

## Sections

- **زایچهٔ تولد / Natal** — personal or business-founding chart; Solar Hijri or Gregorian dates; Placidus, Regiomontanus, whole-sign or equal houses; essential and accidental dignities scored with Lilly's table; temperament; sect; five lots; judgment of all 12 houses; aspects; firdaria, annual profection and current Saturn and Jupiter transits.
- **پرسش ساعتی / Horary** — casts the chart for the moment of the question; checks the considerations before judgment; finds the significators and the real date of perfection from the ephemeris; checks refranation, prohibition, translation and collection of light, reception and the Moon's next aspect; gives Lilly's symbolic timing.
- **زمان‌گزینی / Elections** — scores every 20 minutes over 7–60 days for opening a business, contracts, launches, marriage, travel, property or interviews, including planetary hours.
- **احکام عالم / Mundane** — the Aries ingress (Nowruz) chart, lord of the year, quarter charts, eclipses, Jupiter–Saturn great conjunctions and triplicity shifts, Mars–Saturn conjunctions, and a timeline of stations and sign ingresses.
- **AI astrologer** — when the page is opened as a Claude artifact, free-form follow-up questions are answered by Claude using the computed chart data (the `sample` capability). Everywhere else the rule-based judgments still work.

## Run

Open `index.html` in a browser; no server or build needed. `app.html` is the same page without the document wrapper (the artifact source). After editing `app.html`, regenerate `index.html` with `node astrology-app/build.mjs`.

## Test

```sh
node --test astrology-app/test/
```

Positions use [Astronomy Engine](https://github.com/cosinekitty/astronomy) (MIT), vendored in `vendor/`.
