/* Akhtarnameh — deutsche Texte für die Bereiche Liebe, Geld, Kaufen & Verkaufen und Chat (werden in den deutschen Katalog eingefügt). */
(function (G) {
  const D = G.I18N_DATA = G.I18N_DATA || {};
  const merge = (a, b) => { Object.keys(b).forEach(k => { if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') merge(a[k], b[k]); else a[k] = b[k]; }); return a; };
  merge(D.de = D.de || {}, {
    ui: {
      tab: { love: 'Liebe & Partnerschaft', money: 'Geld & Vermögen', trade: 'Kaufen & Verkaufen', chat: 'Gespräch mit dem Astrologen' },
      love: {
        title: 'Liebe und Partnerschaft', intro: 'Ihr Wesen in der Liebe aus Ihrem eigenen Horoskop und die Verträglichkeit mit einem anderen Menschen, beurteilt nach Ptolemäus, dem indischen Guna Milan und den chinesischen Säulen.',
        you: 'Ihr Horoskop:', change: 'ändern', partner: 'Die andere Person', submit: 'Liebe und Verträglichkeit deuten',
        hint: 'Lassen Sie die Angaben zur anderen Person leer, wenn Sie nur Ihre eigene Liebesdeutung sehen möchten. Auch ohne bekannte Geburtszeit ist der größte Teil des Vergleichs möglich.',
        yourChart: 'Ihr Horoskop', partnerName: 'die andere Person', sampleNote: 'Hier wird das Beispielhoroskop verwendet. Geben Sie Ihre eigenen Geburtsdaten im Reiter „Geburtshoroskop“ ein, um eine persönliche Deutung zu erhalten.',
        head: 'Liebe, Ehe und Verträglichkeit', compat: 'Gesamtverträglichkeit', synTitle: 'Wie die beiden Horoskope einander begegnen', natalTitle: 'Ihr Wesen in der Liebe',
        partnerNoTime: 'Die Geburtszeit der anderen Person ist unbekannt: Aszendent, Häuser und der genaue Mondgrad dieser Person sind nur Näherungswerte.',
        addPartner: 'Fügen Sie die Geburtsdaten der anderen Person hinzu, um Ihre Verträglichkeit zu sehen.'
      },
      money: {
        title: 'Geld und Vermögen', intro: 'Woher das Geld in Ihrem Horoskop kommt, wie gut Sie es halten, Ihr finanzieller Stil, die Zeitqualität der Gegenwart und der kommende Marktkalender.',
        range: 'Kalenderzeitraum', d90: 'Drei Monate', submit: 'Geld und Zeitqualität deuten', head: 'Geld, Vermögen und finanzielle Zeitqualität',
        natalTitle: 'Ihr Geldhoroskop', calTitle: 'Marktkalender: die nächsten {n} Tage'
      },
      trade: {
        title: 'Kaufen und Verkaufen', intro: 'Sollten Sie jetzt kaufen oder verkaufen, und wann ist der beste Zeitpunkt? Beurteilt nach Lillys Regeln für Kauf und Verkauf und nach den Elektionen von al-Biruni und Bonatti.',
        action: 'Ich möchte', buy: 'Kaufen', sell: 'Verkaufen', asset: 'Was', submit: 'Jetzt beurteilen und die besten Zeitpunkte finden',
        disclaimer: 'Dies ist eine traditionelle astrologische Deutung, keine Finanzberatung. Märkte bergen echte Risiken; treffen Sie Ihre Entscheidungen auf Grundlage eigener Recherche oder mit einer qualifizierten Beratung.',
        head: { buy: 'Kauf: {asset}', sell: 'Verkauf: {asset}' }, nowTitle: 'Im Augenblick', scaleNo: 'Abwarten', scaleYes: 'Handeln',
        bestTitle: { buy: 'Die besten Zeitpunkte zum Kaufen', sell: 'Die besten Zeitpunkte zum Verkaufen' },
        rules: 'Regeln: Der Käufer ist der Aszendent, der Verkäufer das 7. Haus; das 10. Haus zeigt den Preis, das 4. den Ausgang des Geschäfts. Gekauft wird bei abnehmendem, verkauft bei zunehmendem Mond (al-Biruni, Bonatti); einen leerläufigen Mond und einen rückläufigen Merkur meidet man; der Planet des Vermögenswerts sollte stark sein und der Mond applikativ zu einem Wohltäter.'
      },
      chat: {
        title: 'Gespräch mit dem Astrologen', intro: 'Fragen Sie, was Sie möchten: Liebe, Geld, Kauf und Verkauf, Beruf, das kommende Jahr. Jede Frage wird zusätzlich als Stundenhoroskop ihres Augenblicks gestellt.',
        useNatal: 'Mein Geburtshoroskop verwenden', usePartner: 'Die andere Person einbeziehen (aus „Liebe“)', where: 'Ich bin in', ph: 'Schreiben Sie Ihre Frage …',
        clear: 'Gespräch löschen', note: 'Die Antworten sind traditionelle symbolische Deutungen, keine Gewissheiten.', astrologer: 'Astrologe', ruleFrom: 'Astrologe (klassische Regeln)',
        welcome: 'Seien Sie gegrüßt. Ich deute Ihr Horoskop mit den Methoden von Ptolemäus, Abu Ma\'schar, al-Biruni, Lilly, Parashara und den chinesischen Meistern. Fragen Sie mich nach Liebe, Geld, Kauf und Verkauf, Beruf oder dem kommenden Jahr. Für eine persönliche Deutung geben Sie bitte zuerst Ihre Geburtsdaten im Reiter **Geburtshoroskop** ein.'
      }
    },
    err: { natalFirst: 'Erstellen Sie zuerst Ihr Geburtshoroskop im Reiter „Geburtshoroskop“.' },
    ai: {
      loveTitle: 'Den Astrologen zur Liebe fragen', lovePh: 'z. B. Wann begegne ich dem richtigen Menschen?',
      loveSugg: ['Wann öffnet sich mein nächstes Zeitfenster für die Liebe?', 'Welcher Partner passt wirklich zu mir?', 'Welches Muster wiederholt sich in meinen Beziehungen?'],
      loveSuggPair: ['Passen wir wirklich zusammen?', 'Was hält uns zusammen, und was könnte uns auseinanderbringen?', 'Ist eine Heirat zwischen uns eine gute Idee, und wann?'],
      moneyTitle: 'Den Astrologen zum Geld fragen', moneyPh: 'z. B. In welchem Bereich verdiene ich am meisten?',
      moneySugg: ['Woher kommt mein Geld wirklich?', 'Ist dies ein gutes Jahr zum Investieren?', 'Liegt mir ein festes Gehalt oder ein eigenes Geschäft mehr?'],
      tradeTitle: 'Den Astrologen zu diesem Geschäft fragen', tradePh: 'z. B. Sollte ich bis nächste Woche warten?',
      tradeSugg: ['Soll ich jetzt handeln oder warten?', 'Wird der Preis eher steigen oder fallen?', 'Was ist das größte Risiko bei diesem Geschäft?'],
      chatSugg: ['Finde ich in diesem Jahr die Liebe?', 'Ist jetzt eine gute Zeit zum Investieren?', 'Soll ich jetzt kaufen oder verkaufen?', 'Bekomme ich die Stelle?', 'Wie wird das kommende Jahr für mich?']
    },
    syn: {
      meter: { attraction: 'Anziehung', harmony: 'Harmonie', durability: 'Beständigkeit', friction: 'Reibung' },
      scoresTitle: 'Bewertung', scores: 'Anziehung {a}, Harmonie {h}, Beständigkeit {d}, Reibung {f} (von 10).',
      overallTitle: 'Verträglichkeit {pct} %',
      overall: {
        strong: 'Eine starke Verbindung: Anziehung, Verständnis und Beständigkeit stützen einander. Die klassischen Texte zählen solche Verbindungen zu den glücklichen.',
        good: 'Eine gute Verbindung: echte Wesensverwandtschaft, mit einigen Punkten, die bewusste Pflege verlangen.',
        work: 'Eine Verbindung, die Arbeit verlangt: Es gibt einen Berührungspunkt, doch die Unterschiede sind erheblich, und die Beziehung wächst nur mit Mühe und Reife.',
        hard: 'Eine schwierige Verbindung: Die Horoskope ziehen in verschiedene Richtungen. Sie kann viel lehren, doch Harmonie stellt sich nicht von selbst ein.'
      },
      overallWhy: 'Synastrie: Anziehung {a}, Harmonie {h}, Beständigkeit {d}, Reibung {f}; Guna Milan {k}/36.',
      ptolTitle: 'Die Regel der Lichter nach Ptolemäus (Tetrabiblos IV,5)',
      ptol: {
        lights: 'Die Sonne des einen und der Mond des anderen stehen im selben oder in harmonischen Zeichen: nach Ptolemäus das erste Kennzeichen einer dauerhaften, einträchtigen Verbindung.',
        exchange: 'Die Sonne des einen steht in Konjunktion mit dem Mond des anderen: die klassische Signatur der Ehe und eines tiefen gegenseitigen Erkennens.',
        moons: 'Beide Monde stehen im selben oder in harmonischen Zeichen: Alltag, Stimmungen und Bedürfnisse passen ganz natürlich zusammen.',
        none: 'Die Lichter stehen nicht in harmonischen Zeichen: Nach der Regel des Ptolemäus muss die Eintracht über andere Bande aufgebaut werden, etwa über Venus, Jupiter und ein gemeinsames Ziel.'
      },
      contact: '{a} {asp} {b}',
      contactText: {
        conj: '„{x}“ des einen verschmilzt mit „{y}“ des anderen (Orbis {orb}°): eine starke, unmittelbare Verbindung in diesem Bereich.',
        easy: '„{x}“ des einen unterstützt „{y}“ des anderen (Orbis {orb}°): hier herrschen Leichtigkeit und natürliches Verständnis.',
        hard: '„{x}“ des einen fordert „{y}“ des anderen heraus (Orbis {orb}°): eine Anziehungskraft, die auch Spannungen mit sich bringt, die bearbeitet werden wollen.'
      },
      saturnNote: 'Saturnkontakte sind der Kitt langer Beziehungen: Sie binden und festigen, können sich aber auch schwer oder einengend anfühlen.',
      overlayTitle: 'Die Planeten des einen in den Häusern des anderen',
      overlay: { b2a: 'Der Planet {p} der anderen Person fällt in Ihr {h}. Haus: {meaning}', a2b: 'Ihr Planet {p} fällt in das {h}. Haus der anderen Person: {meaning}' },
      ovh: { 1: 'stark und persönlich spürbar; er prägt, wie der andere sich selbst sieht.', 5: 'Romantik, Spiel und Vergnügen.', 7: 'das Haus der Ehe selbst: ein natürlicher Zug zur Partnerschaft.', 8: 'Intensität, Intimität und gemeinsame Mittel.', 12: 'etwas Verborgenes oder Karmisches; eine Verbindung, die schwer zu erklären ist.' },
      kootaTitle: 'Guna Milan (Ashtakoota): {n} von 36',
      koota: { varna: 'Varna', vashya: 'Vashya', tara: 'Tara', yoni: 'Yoni', maitri: 'Graha Maitri', gana: 'Gana', bhakoot: 'Bhakoot', nadi: 'Nadi' },
      kootaVerdict: { excellent: 'Nach indischem Maßstab ausgezeichnet (28 oder mehr).', good: 'Gut (24 oder mehr).', fair: 'Annehmbar (18 oder mehr), das traditionelle Minimum für eine Ehe.', weak: 'Unter dem traditionellen Minimum von 18.' },
      nadiDosha: 'Nadi-Dosha: Beide Monde stehen in derselben Nadi, was die Texte als schwerwiegendste Unvereinbarkeit ansehen, vor allem für Gesundheit und Kinder; es gibt jedoch viele Aufhebungen.',
      bhakootDosha: 'Bhakoot-Dosha: Die Mondzeichen stehen im Verhältnis 2-12, 5-9 oder 6-8, was Finanzen oder Harmonie belasten kann.',
      kootaNote: 'Berechnet aus dem siderischen Mond jeder Person (Vashya und Yoni vereinfacht).',
      baziTitle: 'Chinesische Säulen: Tagesmeister und Zweige',
      baziDm: {
        same: 'Beide Tagesmeister gehören derselben Wandlungsphase an ({a} und {b}): Ebenbürtige und Verbündete, mitunter Rivalen.',
        aFeedsB: 'Ihr Tagesmeister {a} nährt den der anderen Person ({b}): Sie geben und stützen; die andere Person blüht durch Sie auf.',
        bFeedsA: 'Der Tagesmeister der anderen Person, {b}, nährt den Ihren ({a}): Sie werden gestützt und können wachsen.',
        aControlsB: 'Ihr Tagesmeister {a} kontrolliert den der anderen Person ({b}): Im klassischen Zi Ping ist dies beim Mann der Stern der Ehefrau, eine traditionelle Paarung, solange Kontrolle nicht zu Beherrschung wird.',
        bControlsA: 'Der Tagesmeister der anderen Person, {b}, kontrolliert den Ihren ({a}): Im klassischen Zi Ping ist dies bei der Frau der Stern des Ehemanns, eine traditionelle Paarung, die Struktur und Herausforderung bringt.'
      },
      baziDay: { clash: 'Die beiden Tageszweige (die Paläste des Ehepartners) stoßen zusammen: lebendig, aber anfällig für Reibung im gemeinsamen Alltag.', harmony: 'Die beiden Tageszweige bilden eine Sechs-Harmonie: ein heimliches, natürliches Zusammenpassen der Paläste des Ehepartners.', same: 'Die Tageszweige sind gleich: ähnliche Bedürfnisse in der Intimität.', neutral: 'Die Tageszweige verhalten sich neutral zueinander.' },
      baziYear: { clash: 'Die Jahrestiere {a} und {b} stoßen zusammen.', harmony: 'Die Jahrestiere {a} und {b} bilden ein harmonisches Paar.', trine: 'Die Jahrestiere {a} und {b} gehören zum selben Trigon der Verbündeten.', neutral: 'Die Jahrestiere {a} und {b} verhalten sich neutral zueinander.' }
    },
    love: {
      venusTitle: 'Venus: wie Sie lieben', venus: 'Venus auf {pos}, im {h}. Haus; sie ist {word}.',
      venusEl: { fire: 'Sie lieben mit Feuer: offen, schnell, mit Bewunderung und Werben.', earth: 'Sie lieben über die Sinne und über Treue: langsam, greifbar, auf lange Sicht.', air: 'Sie lieben über den Geist: Gespräch, Freundschaft und Freiheit zählen ebenso viel wie Leidenschaft.', water: 'Sie lieben tief und gefühlvoll: Sie brauchen Nähe, Vertrauen und das Gefühl, wirklich verstanden zu werden.' },
      venusStrong: 'Eine starke Venus schenkt Anmut und Glück in der Liebe; Zuneigung kommt zu Ihnen.', venusWeak: 'Eine schwache Venus bedeutet, dass die Liebe mehr Mühe und Urteilskraft verlangt; Enttäuschungen lehren, was Ihnen wirklich wichtig ist.', venusMid: 'Venus ist mittelmäßig gestellt: Die Liebe hängt von Entscheidungen und vom richtigen Zeitpunkt ab.',
      venusRetro: 'Venus bei der Geburt rückläufig: Die Liebe wird neu geprüft; alte Bindungen kehren zurück, und das Herz wählt spät, aber wissend.', venusCombust: 'Venus verbrannt: Gefühle bleiben verborgen oder werden von Pflicht und Ego überschattet; die Liebe wächst, wenn sie offen gezeigt wird.',
      marsTitle: 'Mars: Begehren und Werben', mars: 'Mars auf {pos}, im {h}. Haus.',
      marsEl: { fire: 'Das Begehren ist direkt und kühn; Sie werben offen.', earth: 'Das Begehren ist beständig und körperlich; Sie beweisen Liebe durch Taten.', air: 'Das Begehren beginnt im Kopf; Witz und Worte reizen Sie.', water: 'Das Begehren ist gefühlvoll und intensiv; Sie brauchen eine tiefe Verbindung.' },
      partnerTitle: 'Der Partner, der Sie anzieht (7. Haus)', desc: 'Der Deszendent steht im Zeichen {sign}; der Partner zeigt meist dieses Wesen:',
      lord7: 'Der Herrscher des 7. Hauses, {p}, steht im {h}. Haus und ist {word}: Partner begegnen Ihnen über die Themen dieses Hauses ({topics}), und die Ehe bleibt mit ihnen verbunden.',
      in7: { sun: 'Die Sonne im 7. Haus: ein Partner von Rang und starkem Charakter; vielleicht definieren Sie sich über die Beziehung.', moon: 'Der Mond im 7. Haus: ein starkes Bedürfnis nach Partnerschaft; der Partner ist fürsorglich oder wechselhaft.', mercury: 'Merkur im 7. Haus: ein Partner, der jung im Geist, mitteilsam oder mit Arbeit und Handel verbunden ist.', venus: 'Venus im 7. Haus: eines der besten Zeichen für eine glückliche, harmonische Ehe.', mars: 'Mars im 7. Haus: Leidenschaft, aber auch Streit; ein willensstarker Partner.', jupiter: 'Jupiter im 7. Haus: ein großzügiger, weiser oder vom Glück begünstigter Partner; die Ehe bringt Wachstum.', saturn: 'Saturn im 7. Haus: eine späte oder ernste Bindung, oft an einen älteren oder verantwortungsvollen Partner; einmal eingegangen, ist sie dauerhaft.' },
      ptolTitle: 'Der Signifikator des Ehepartners nach Ptolemäus',
      ptolM: 'Beim Mann beurteilt Ptolemäus die Ehefrau nach dem Mond; hier: {p} auf {pos}, im {h}. Haus, Zeichenqualität {mode}.',
      ptolF: 'Bei der Frau beurteilt Ptolemäus den Ehemann nach der Sonne; hier: {p} auf {pos}, im {h}. Haus, Zeichenqualität {mode}.',
      ptolMode: { movable: 'Ein kardinales Zeichen: Die Ehe kann früh kommen oder mehr als einmal.', fixed: 'Ein fixes Zeichen: Angezeigt ist eine einzige, dauerhafte Ehe.', common: 'Ein veränderliches Zeichen: Mehr als eine bedeutsame Verbindung ist möglich.' },
      ptolHit: { ben: 'Ein Aspekt zu {p} ({asp}) verspricht einen guten und hilfreichen Ehepartner.', benHard: 'Ein Aspekt zu {p} ({asp}) bringt Nutzen, vermischt mit Übermaß.', malEasy: 'Ein Aspekt zu {p} ({asp}) fügt Ernst und Beständigkeit hinzu.', mal: 'Ein Aspekt zu {p} ({asp}) bringt Reibung, Verzögerung oder einen fordernden Partner.' },
      easeTitle: 'Leichtigkeit oder Verzögerung in der Ehe',
      d: { satVenus: 'Saturn verletzt Venus', sat7: 'Saturn berührt den Deszendenten', venusRetro: 'Venus ist rückläufig', satIn7: 'Saturn steht im 7. Haus', lord7cadent: 'der Herrscher des 7. Hauses steht in einem verborgenen Haus' },
      e: { jupVenus: 'Jupiter unterstützt Venus', benIn7: 'ein Wohltäter steht im 7. Haus', lord7good: 'der Herrscher des 7. Hauses ist gut gestellt', moonVenus: 'Mond und Venus stehen im Einklang' },
      easeList: 'Dafür spricht: {list}.', delayList: 'Verzögernde Faktoren: {list}.',
      easeVerdict: 'Liebe und Ehe kommen verhältnismäßig leicht.', delayVerdict: 'Die feste Bindung kommt eher später, mit der Reife; was dann gebaut wird, ist solide.', mixedVerdict: 'Leichtigkeit und Verzögerung halten sich die Waage: Zeitpunkt und Entscheidungen geben den Ausschlag.',
      vedTitle: 'Indische Sicht: der Herrscher des 7. Hauses und das Navamsa', ved: 'Der siderische Herrscher des 7. Hauses, {lord}, steht im Bhava {h} ({topics}). Venus steht im Navamsa (dem Horoskop der Ehe) im Zeichen {nav}.',
      navEl: { fire: 'Ein temperamentvoller, unabhängiger Ehepartner.', earth: 'Ein praktischer, treuer Ehepartner.', air: 'Ein geselliger, kluger Ehepartner.', water: 'Ein feinfühliger, hingebungsvoller Ehepartner.' },
      manglik: 'Kuja-Dosha (durch die Stellung des Mars) liegt vor: Die Tradition rät zu einem Partner mit ähnlicher Marsstellung oder zu Geduld vor der Heirat.',
      baziTitle: 'Chinesische Sicht: der Palast des Ehepartners', bazi: 'Ihr Palast des Ehepartners (Tageszweig) trägt den Stern „{g}“: {gt}',
      baziInter: 'Der Palast des Ehepartners ist beteiligt an: {list}.', baziCalm: 'Der Palast des Ehepartners ist ungestört: ein stabiles inneres Bild von Partnerschaft.',
      baziStarM: 'Beim Mann ist der Stern der Ehefrau das Element {el}; seine Stärke im Horoskop beträgt {n}.', baziStarF: 'Bei der Frau ist der Stern des Ehemanns das Element {el}; seine Stärke im Horoskop beträgt {n}.', baziStarX: 'Wählen Sie in den Einstellungen des Geburtshoroskops ein Geschlecht, um den Stern des Ehepartners zu deuten.',
      w: { prof: 'das Profektionsjahr aktiviert das {h}. Haus (Herrscher: {p})', firdar: 'die Venus-Firdarie läuft', firdarSub: 'die Venus-Unterperiode der Firdarie läuft', dasha: 'die {p}-Mahadasha', antar: 'die {p}-Antardasha (bis zum {to})' },
      timingTitle: 'Zeitqualität der Liebe', timingNow: 'Jetzt aktiv: {list}. Dies ist eine günstige Zeit, um jemanden kennenzulernen oder sich zu binden.', timingQuiet: 'Derzeit ist kein wichtiger Zeitherrscher der Liebe aktiv.',
      jup7: 'Jupiter, der große Wohltäter, durchläuft Ihr siebtes Zeichen ({sign}): {when}; traditionell das stärkste Zeitfenster für eine Heirat.', jupVenus: 'Jupiter kehrt ab dem {when} in das Zeichen Ihrer Venus zurück: eine Zeit der Zuneigung und der Gelegenheiten.'
    },
    money: {
      capacityTitle: 'Fähigkeit zum Wohlstand (2. Haus)', house2: 'Das 2. Haus steht im Zeichen {sign}; sein Herrscher {p} steht im {h}. Haus und ist {word}.', source: 'Geld kommt vor allem über {topics}.',
      src: { 1: 'die eigene Person, die eigenen Fähigkeiten und Eigeninitiative', 2: 'eigene Mittel und das, was Sie bereits besitzen', 3: 'Kommunikation, Schreiben, Verkaufen, kurze Reisen, Geschwister und Nachbarn', 4: 'Grund und Boden, Immobilien, Familie und ererbte Grundlagen', 5: 'Kreativität, Unterhaltung, Spekulation und Kinder', 6: 'Dienstleistung, Anstellung, Handwerk und Arbeit im Gesundheitsbereich', 7: 'Partner, Kunden, Ehe und Verträge', 8: 'fremdes Geld: Investoren, Kredite, Erbschaften und gemeinsames Vermögen', 9: 'das Ausland, Lehre, Recht, Verlagswesen und Reisen', 10: 'Beruf, Autorität und öffentliches Ansehen', 11: 'Freunde, Netzwerke, Förderer und die Gewinne aus Arbeit', 12: 'Arbeit hinter den Kulissen, Institutionen, ferne oder abgelegene Orte und vertrauliche Angelegenheiten' },
      in2: { sun: 'Die Sonne im 2. Haus: Verdienst durch Stellung, Führung und Sichtbarkeit; Ausgaben für Status.', moon: 'Der Mond im 2. Haus: schwankendes Einkommen; Verdienst durch die Öffentlichkeit, Lebensmittel, Wohnungen oder alles, was sich wandelt.', mercury: 'Merkur im 2. Haus: Verdienst durch den Verstand: Handel, Schreiben, Lehren, Zahlen.', venus: 'Venus im 2. Haus: ein klassisches Zeichen für Wohlstand; Verdienst durch Schönheit, Kunst, Genuss oder Partnerschaft.', mars: 'Mars im 2. Haus: kühn verdient und kühn ausgegeben; Geld durch Einsatz, Technik oder Risiko.', jupiter: 'Jupiter im 2. Haus: die beste Signatur für Fülle; Geld wächst und kehrt zurück.', saturn: 'Saturn im 2. Haus: langsam aufgebauter und sorgsam bewahrter Wohlstand; anfangs Knappheit, später Beständigkeit.' },
      lotsTitle: 'Glückspunkt und Substanzpunkt', fortune: 'Der Glückspunkt steht auf {pos}, im {h}. Haus ({topics}); sein Herrscher {p} ist {word}.', substance: 'Der Substanzpunkt (Abu Ma\'schar) steht auf {pos}, im {h}. Haus ({topics}); sein Herrscher {p} ist {word}.',
      jupTitle: 'Jupiter, der Signifikator des Wohlstands', jup: 'Jupiter auf {pos}, im {h}. Haus ({topics}); er ist {word}.', jupStrong: 'Ein starker Jupiter: Gelegenheiten kommen, und Großzügigkeit kehrt vielfach zurück.', jupWeak: 'Ein schwacher Jupiter: Wachstum verlangt Disziplin; hüten Sie sich davor, sich zu übernehmen und den falschen Leuten zu vertrauen.', jupMid: 'Jupiter ist mittelmäßig gestellt: Wachstum folgt auf Einsatz und guten Rat.',
      flowsTitle: 'Einkommen, Beruf und fremdes Geld', flows: 'Herrscher des 11. Hauses (Einkommen aus Arbeit): {p11}, {w11}, im {h11}. Haus. Herrscher des 10. Hauses (Beruf): {p10}, {w10}. Herrscher des 8. Hauses (Kredite, Investoren, Erbschaft): {p8}, {w8}, im {h8}. Haus.',
      flows8: 'Fremdes Geld wiegt stärker als Ihr eigenes Einkommen: Partnerschaften, Investoren, Kredite oder Erbschaften spielen eine große Rolle.', flows11: 'Ihr eigenes Einkommen wiegt stärker als fremdes Geld: Bauen Sie Ihr Einkommen über Ihre Arbeit und Ihr Netzwerk auf.', flowsEven: 'Eigenes Einkommen und fremdes Geld halten sich die Waage.',
      styleTitle: 'Ihr finanzielles Temperament', style: 'Führender Planet in Geldfragen: {p}; an zweiter Stelle: {q}.',
      styleText: { value: 'Saturn-Stil: geduldig, wertorientiert und langfristig; Immobilien, Grundbesitz und langsamer Zinseszins liegen Ihnen.', growth: 'Jupiter-Stil: Wachstum und Expansion; Bildung, Verlagswesen, Recht, internationale Vorhaben.', aggressive: 'Mars-Stil: schnell, wettbewerbsorientiert und risikofreudig; setzen Sie sich strikte Grenzen.', beauty: 'Venus-Stil: Schönheit, Design, Luxus, Gastgewerbe und Partnerschaften.', trader: 'Merkur-Stil: Handel, Kommerz, Technologie und Information; schnelle Entscheidungen.', cyclical: 'Mond-Stil: zyklisch und intuitiv; Konsumgüter, Lebensmittel, Wohnen; achten Sie auf die Zyklen.', leader: 'Sonnen-Stil: Führung, ein eigenes Unternehmen und öffentliches Ansehen.' },
      styleSecond: 'Nebenton: {text}', uranus: 'Uranus berührt Ihre Geldhäuser: plötzliche Gewinne und Verluste; Technik und Ungewöhnliches.', neptune: 'Neptun berührt Ihre Geldhäuser: Intuition, aber auch Verwirrung; lassen Sie sich alles schriftlich bestätigen.',
      baziTitle: 'Chinesische Sicht: der Stern des Reichtums', bazi: 'Ihr Reichtumselement ist {el} (Stärke {n}); sein Planet ist {p}.',
      baziCase: { strongStrong: 'Ein starker Tagesmeister mit einem starken Reichtumsstern: Sie können großen Reichtum tragen. Die klassischen Texte nennen dies ein reiches Horoskop.', strongWeak: 'Ein starker Tagesmeister mit einem schwachen Reichtumsstern: Die Fähigkeit ist vorhanden, doch Gelegenheiten müssen geschaffen werden; Reichtum kommt in günstigen Glückssäulen.', weakStrong: 'Ein schwacher Tagesmeister gegenüber starkem Reichtum: Der Reichtum ist sichtbar, aber schwer zu halten. Partnerschaften, Unterstützung und Vorsicht bei Schulden sind entscheidend.', weakWeak: 'Beide bescheiden: stetiger, erarbeiteter Wohlstand statt unverhoffter Gewinne; bauen Sie zuerst Mittel auf.' },
      vedTitle: 'Indische Sicht: die Herrscher von Wohlstand und Gewinn', ved: 'Der Herrscher des 2. Hauses, {l2}, steht im Bhava {h2}; der Herrscher des 11. Hauses, {l11}, im Bhava {h11}.', vedYogas: 'Yogas des Wohlstands: {list}.', vedNone: 'Kein klassisches Wohlstands-Yoga sticht hervor; der Wohlstand folgt den Dashas der Herrscher des 2. und des 11. Hauses.',
      t: { prof: 'das Profektionsjahr aktiviert das {h}. Haus', profLord: 'der Jahresherrscher {p} beherrscht ein Geldhaus', jup: 'Jupiter durchläuft Ihr {h}. Haus', sat: 'Saturn durchläuft Ihr {h}. Haus (straffen und festigen)', dasha: 'die {p}-Mahadasha', luck: 'die laufende Glückssäule trägt Ihr Reichtumselement', zr: 'das zodiakale Lösen vom Glückspunkt befindet sich in einer Gipfelphase' },
      timingTitle: 'Finanzielle Zeitqualität jetzt', timing: 'Jetzt aktiv: {list}.', timingQuiet: 'Derzeit ist kein bedeutender finanzieller Zeitherrscher aktiv: eine Zeit für stetige Arbeit und Vorbereitung statt für große Schritte.'
    },
    cal: {
      newMoon: 'Neumond im Zeichen {sign}', fullMoon: 'Vollmond im Zeichen {sign}',
      newMoonText: 'Ein Anfang: traditionell gut zum Beginnen, Säen und für langfristige Käufe.', fullMoonText: 'Ein Höhepunkt: Die Dinge spitzen sich zu; traditionell gut zum Verkaufen und Abschließen, ungünstig für Neuanfänge.',
      station: { mercury: { retro: 'Merkur wird rückläufig: Verzögerungen, Missverständnisse und nachverhandelte Geschäfte. Lesen Sie Verträge zweimal.', direct: 'Merkur wird direktläufig: Kommunikation und Geschäfte klären sich.' }, venus: { retro: 'Venus wird rückläufig: Werte und Preise werden neu bewertet; meiden Sie Luxuskäufe.', direct: 'Venus wird direktläufig: Das Vertrauen in den Wert der Dinge kehrt zurück.' }, mars: { retro: 'Mars wird rückläufig: Die Energie wendet sich nach innen; vermeiden Sie aggressive Schritte.', direct: 'Mars wird direktläufig: Der Schwung kehrt zurück.' } },
      eclipse: 'Finsternisse markieren plötzliche Wendepunkte; traditionelle Astrologen vermeiden es, in ihrer Nähe etwas zu beginnen oder sich zu binden.'
    },
    trade: {
      assetKw: {
        stocks: ['aktie', 'börse', 'boerse', 'etf', 'index', 'wertpapier', 'fonds', 'anteile'],
        crypto: ['krypto', 'bitcoin', 'btc', 'ethereum', 'eth', 'coin', 'token'],
        gold: ['gold', 'silber', 'edelmetall', 'platin', 'barren'],
        currency: ['dollar', 'euro', 'währung', 'waehrung', 'devisen', 'forex', 'usd', 'wechselkurs', 'franken'],
        property: ['haus', 'wohnung', 'immobilie', 'grundstück', 'grundstueck', 'eigentumswohnung', 'eigenheim'],
        vehicle: ['auto', 'fahrzeug', 'pkw', 'motorrad', 'lkw', 'lastwagen', 'wohnmobil'],
        goods: ['waren', 'handelsware', 'produkte', 'lagerbestand', 'warenbestand', 'inventar']
      },
      asset: { stocks: 'Aktien und Anteile', crypto: 'Kryptowährungen', gold: 'Gold und Edelmetalle', currency: 'Fremdwährungen', property: 'Haus oder Immobilie', vehicle: 'Auto oder Fahrzeug', goods: 'Waren und Handelsgüter' },
      sig: { buy: 'Signifikatoren. Sie als Käufer: {a}; der Verkäufer: {b}; der Preis: {price}; die Sache selbst: {thing}; der Ausgang des Geschäfts: {end}.', sell: 'Signifikatoren. Sie als Verkäufer: {a}; der Käufer: {b}; der Preis: {price}; die Sache selbst: {thing}; der Ausgang des Geschäfts: {end}.' },
      sameLord: 'Ein und derselbe Planet ({p}) herrscht über beide Seiten: Das Geschäft liegt in Ihrer Hand.',
      deal: '{a} und {b} bilden am {date} einen exakten Aspekt ({asp}): Das Geschäft kann zustande kommen.', noDeal: '{a} und {b} kommen nicht bald zusammen: Ein Abschluss ist derzeit unwahrscheinlich.',
      edgeYou: 'Ihr Signifikator {a} ist stärker als der der Gegenseite ({b}): Sie sind im Vorteil.', edgeThem: 'Die Gegenseite ({b}) ist stärker als Sie ({a}): Sie ist im Vorteil; verhandeln Sie umsichtig.', edgeEven: 'Beide Seiten ({a} und {b}) sind ähnlich stark.',
      price: { high: 'Der Herrscher des 10. Hauses ({p}) ist stark und steht in einem Eckhaus: Der Preis ist hoch oder fest.', low: 'Der Herrscher des 10. Hauses ({p}) ist schwach oder steht in einem fallenden Haus: Der Preis ist niedrig oder verhandelbar.', fair: 'Der Herrscher des 10. Hauses ({p}) ist mittelmäßig gestellt: Der Preis ist angemessen.' },
      moonWaxing: 'Der Mond ist zunehmend: Der Tradition nach steigen die Preise eher, was den Verkauf begünstigt.', moonWaning: 'Der Mond ist abnehmend: Der Tradition nach fallen die Preise eher, was den Kauf begünstigt.',
      thing: 'Der Planet des Vermögenswerts, {p}, ist {word}.', thingRetro: 'Er ist rückläufig: Bedenken, Rückgaben oder verborgene Mängel.',
      end: 'Der Ausgang des Geschäfts (Herrscher des 4. Hauses, {p}) ist {word}.', mercRetro: 'Merkur, der Herr des Handels, ist rückläufig: Fehler in den Papieren und Sinneswandel.',
      verdict: {
        buy: { go: 'Kaufen: Der Himmel unterstützt jetzt einen Kauf.', lean: 'Eher kaufen, mit Sorgfalt bei Preis und Bedingungen.', wait: 'Abwarten: Die Zeichen sind gemischt; einen besseren Zeitpunkt finden Sie unten.', no: 'Jetzt nicht kaufen: Die Zeugnisse sprechen dagegen.' },
        sell: { go: 'Verkaufen: Der Himmel unterstützt jetzt einen Verkauf.', lean: 'Eher verkaufen, mit Sorgfalt bei Preis und Bedingungen.', wait: 'Abwarten: Die Zeichen sind gemischt; einen besseren Zeitpunkt finden Sie unten.', no: 'Jetzt nicht verkaufen: Die Zeugnisse sprechen dagegen.' }
      }
    },
    elr: { waningBuy: 'Mond abnehmend (gut zum Kaufen)', waxingBuy: 'Mond zunehmend (Preise steigen)', waxingSell: 'Mond zunehmend (gut zum Verkaufen)', waningSell: 'Mond abnehmend (Preise fallen)', edgeYou: 'Ihr Signifikator stärker als die Gegenseite', edgeThem: 'die Gegenseite stärker' },
    chat: {
      buyKw: ['kauf', 'anschaff', 'erwerben', 'investieren in', 'einsteigen bei'],
      sellKw: ['verkauf', 'veräußer', 'abstoßen', 'gewinne mitnehmen', 'gewinn mitnehmen', 'gewinne realisieren', 'aussteigen aus', 'zu geld machen'],
      tradeIntro: 'Beurteilt nach Lillys Regeln für Kauf und Verkauf für diesen Augenblick ({asset}):', tradeMore: 'Der Reiter „Kaufen & Verkaufen“ nennt die besten kommenden Zeitpunkte.',
      ruleIntro: 'Beurteilt nach den klassischen Regeln der Stundenastrologie für diesen Augenblick (Thema: {topic}):',
      ruleNatal: 'In Ihrem Geburtshoroskop, {h}. Haus:',
      ruleNote: 'Für eine ausführlichere Antwort im Gespräch öffnen Sie diese Seite in Claude.'
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
