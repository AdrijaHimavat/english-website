/* Akhtarnameh — fr catalog (mirrors the keys of lang/en.js). Placeholders in {braces} are filled by the program. */
(typeof window !== 'undefined' ? window : globalThis).I18N_DATA = (typeof window !== 'undefined' ? window : globalThis).I18N_DATA || {};
(typeof window !== 'undefined' ? window : globalThis).I18N_DATA.fr = {
 "ui": {
  "brand": "Akhtarnameh",
  "tagline": "Thèmes natals, questions horaires, élections et jugements de l’année du monde, établis avec des éphémérides précises et selon les règles des maîtres babyloniens, grecs, perses, arabes, indiens et chinois",
  "language": "Langue",
  "sections": "Sections",
  "tab": {
   "natal": "Thème natal",
   "horary": "Question horaire",
   "elect": "Élections",
   "world": "Mondiale (année du monde)",
   "library": "Bibliothèque et méthode",
   "love": "Amour et compatibilité",
   "money": "Argent et richesse",
   "trade": "Achat et vente",
   "chat": "Parler à l’astrologue"
  },
  "natal": {
   "title": "Thème natal",
   "bizTitle": "Thème d’entreprise",
   "name": "Nom (facultatif)",
   "namePh": "p. ex. Sara, ou le nom d’une société",
   "kind": "Type de thème",
   "person": "Personne",
   "business": "Fondation d’entreprise",
   "calendar": "Calendrier",
   "greg": "Grégorien",
   "jalali": "Hégirien solaire",
   "date": "Date",
   "day": "Jour",
   "month": "Mois",
   "year": "Année",
   "time": "Heure locale",
   "notime": "Je ne connais pas l’heure exacte",
   "sex": "Sexe (pour la Part du Mariage et les piliers de chance chinois)",
   "male": "Homme",
   "female": "Femme",
   "nosex": "Je préfère ne pas répondre",
   "houses": "Système de maisons",
   "submit": "Dresser et juger le thème",
   "hint": "Un exemple est prérempli. Saisissez votre propre date et votre ville."
  },
  "city": "Ville",
  "lat": "Latitude",
  "lon": "Longitude (est +)",
  "tz": "Fuseau horaire (p. ex. Asia/Tehran ou 3.5)",
  "more": "Plus de réglages",
  "manualCity": "Autre lieu (saisir les coordonnées)",
  "coordsName": "lat. {lat}, long. {lon}",
  "horary": {
   "title": "Question horaire",
   "intro": "Dans la tradition de Sahl ibn Bishr et de William Lilly, le thème de l’instant où une question sincère est posée en contient la réponse.",
   "q": "Votre question",
   "topic": "Sujet",
   "city": "Lieu où vous vous trouvez",
   "usenatal": "Montrer aussi mon thème natal à l’astrologue",
   "submit": "Demander",
   "hint": "Le thème est dressé pour cet instant. Ne posez la question qu’une fois : la tradition ne se fie pas à la seconde demande.",
   "auto": "Déduire de la question",
   "autoMissed": "(sujet non détecté : jugé par la maison XI, maison des espérances)",
   "sampleQ": "La nouvelle entreprise que je mène va-t-elle réussir ?",
   "introTitle": "Une question dans l’instant",
   "introMeta": "Appuyez sur « Demander » : le ciel de cet instant précis au-dessus de votre ville est dressé et jugé.",
   "looksAt": "Ce qu’examine l’astrologue",
   "lk": {
    "cons": {
     "t": "Considérations avant le jugement",
     "d": "Un Ascendant trop précoce ou trop tardif, une Lune vide de course, la Lune dans la via combusta, Saturne en maison I ou VII (Sahl ibn Bishr, Lilly)."
    },
    "sig": {
     "t": "Significateurs",
     "d": "Le maître de l’Ascendant et la Lune signifient le consultant ; le maître de la maison de l’affaire (VII pour le mariage, X pour la carrière) signifie la chose demandée."
    },
    "perf": {
     "t": "Perfection",
     "d": "Les deux significateurs achèvent-ils bientôt un aspect ? Sa date exacte est calculée d’après les éphémérides. La réfrénation et la prohibition sont également examinées."
    },
    "light": {
     "t": "Translation et collection de lumière",
     "d": "Une planète plus rapide porte la lumière d’un significateur à l’autre, ou une planète plus lourde recueille les deux."
    },
    "rec": {
     "t": "Réception et condition",
     "d": "Réception mutuelle, combustion, force essentielle et accidentelle, et prochain aspect de la Lune."
    }
   },
   "no": "Non",
   "unclear": "Incertain",
   "yes": "Oui",
   "when": "Quand",
   "whenText": "l’aspect se parfait le {date}.",
   "consTitle": "Considérations avant le jugement",
   "testTitle": "Témoignages",
   "specTitle": "Remarques propres à ce type de question",
   "chart": "Thème horaire"
  },
  "elect": {
   "title": "Élections",
   "intro": "Trouver le meilleur moment pour commencer, selon les règles de Dorothée, de Bonatti et d’al-Tusi : la Lune, le maître de l’Ascendant, les maisons de l’affaire et les heures planétaires.",
   "what": "Pour quoi ?",
   "range": "Période de recherche",
   "d7": "7 prochains jours",
   "d14": "Deux semaines",
   "d30": "Un mois",
   "d60": "Deux mois",
   "daytime": "Seulement entre 07:00 et 22:00",
   "submit": "Trouver les meilleurs moments",
   "working": "Évaluation de {n} moments…",
   "meta": "{n} moments évalués · le meilleur moment de chaque jour, du meilleur au moins bon",
   "best": "Meilleur",
   "window": "Bonne fenêtre : de {from} à {to}",
   "hour": "heure planétaire : {p}",
   "avoid": "Pire moment de la période : {date} — {why}.",
   "rules": "Règles : la Lune ne doit être ni vide de course, ni combuste, ni dans la via combusta ; mieux vaut qu’elle soit croissante et s’applique à un bénéfique ; le maître de l’Ascendant et les maîtres des maisons de l’affaire doivent être forts ; les bénéfiques angulaires et les maléfiques éloignés des maisons I et X ; Mercure non rétrograde pour les contrats, ni Vénus pour le mariage. Les heures planétaires suivent les heures inégales (saisonnières) d’al-Biruni."
  },
  "world": {
   "title": "Astrologie mondiale",
   "intro": "L’ingrès du Soleil en Bélier (l’instant de Norouz), le maître de l’année, les éclipses, les conjonctions Jupiter–Saturne et la chronologie planétaire de l’année, d’après Masha’allah et Abu Ma’shar.",
   "year": "Année grégorienne (équinoxe de printemps de cette année)",
   "city": "Capitale ou ville",
   "submit": "Juger l’année",
   "working": "Calcul de l’ingrès, des éclipses et des conjonctions…",
   "head": "L’année {py} HS ({year}) pour {city}",
   "meta": "Ingrès : {date} · maître de l’année : {p}",
   "chart": "Thème de l’ingrès en Bélier"
  },
  "footer": "Les positions proviennent d’Astronomy Engine (précision d’environ une minute d’arc), dans l’écliptique vraie de la date ; les positions sidérales utilisent l’ayanamsa de Lahiri. L’astrologie est un art traditionnel et symbolique ; elle ne remplace ni un médecin, ni un avocat, ni un conseiller financier.",
  "asc": "Ascendant",
  "mc": "Milieu du Ciel",
  "ascShort": "AS",
  "mcShort": "MC",
  "ruler": "maître",
  "houseN": "Maison {n}",
  "tbl": {
   "planet": "Planète",
   "pos": "Position",
   "house": "Maison",
   "dignity": "Dignité essentielle",
   "score": "Score de Lilly"
  },
  "wheelLegend": "Lignes turquoise : aspects harmonieux ; rouges : aspects durs ; pointillés : aspects séparants. Maisons : {hs}.",
  "hsFallback": "(à cette latitude, le système se rabat sur Regiomontanus)",
  "sample": "Exemple",
  "dayChart": "thème diurne",
  "nightChart": "thème nocturne",
  "notimeNote": "Heure de naissance inconnue : midi a été retenu. Ne vous fiez ni à l’Ascendant, ni aux maisons, ni aux parts, ni au pilier de l’heure, ni à ce qui en dépend ; les signes des planètes (sauf celui de la Lune) sont justes.",
  "contents": "Sommaire",
  "wheel": "Roue du thème",
  "at": " à ",
  "ask": "Demander",
  "love": {
   "title": "Amour et compatibilité",
   "intro": "Votre nature amoureuse d’après votre propre thème, et la compatibilité avec une autre personne jugée selon Ptolémée, le Guna Milan indien et les piliers chinois.",
   "you": "Votre thème :",
   "change": "modifier",
   "partner": "L’autre personne",
   "submit": "Lire l’amour et la compatibilité",
   "hint": "Laissez vide la partie consacrée à l’autre personne pour ne lire que votre propre thème amoureux. Une heure de naissance inconnue permet tout de même l’essentiel de la comparaison.",
   "yourChart": "Votre thème",
   "partnerName": "l’autre personne",
   "sampleNote": "Ceci utilise le thème d’exemple. Saisissez vos propres données de naissance dans l’onglet Thème natal pour une lecture personnelle.",
   "head": "Amour, mariage et compatibilité",
   "compat": "Compatibilité d’ensemble",
   "synTitle": "La rencontre des deux thèmes",
   "natalTitle": "Votre nature amoureuse",
   "partnerNoTime": "L’heure de naissance de l’autre personne est inconnue : son Ascendant, ses maisons et le degré exact de sa Lune sont approximatifs.",
   "addPartner": "Ajoutez les données de naissance de l’autre personne pour voir votre compatibilité."
  },
  "money": {
   "title": "Argent et richesse",
   "intro": "D’où vient l’argent dans votre thème, comment vous le retenez, votre style financier, le moment présent et le calendrier des marchés à venir.",
   "range": "Période du calendrier",
   "d90": "Trois mois",
   "submit": "Lire l’argent et le moment",
   "head": "Argent, richesse et moment financier",
   "natalTitle": "Votre thème de l’argent",
   "calTitle": "Calendrier des marchés : les {n} prochains jours"
  },
  "trade": {
   "title": "Achat et vente",
   "intro": "Faut-il acheter ou vendre maintenant, et quel est le meilleur moment ? Jugé selon les règles de Lilly sur l’achat et la vente, et selon les élections d’al-Biruni et de Bonatti.",
   "action": "Je veux",
   "buy": "Acheter",
   "sell": "Vendre",
   "asset": "Quoi",
   "submit": "Juger maintenant et trouver les meilleurs moments",
   "disclaimer": "Ceci est un jugement astrologique traditionnel, et non un conseil financier. Les marchés comportent des risques réels : décidez d’après vos propres recherches ou avec un conseiller qualifié.",
   "head": {
    "buy": "Achat : {asset}",
    "sell": "Vente : {asset}"
   },
   "nowTitle": "En ce moment",
   "scaleNo": "Attendre",
   "scaleYes": "Agir",
   "bestTitle": {
    "buy": "Meilleurs moments pour acheter",
    "sell": "Meilleurs moments pour vendre"
   },
   "rules": "Règles : l’acheteur est l’Ascendant et le vendeur la maison VII ; la maison X montre le prix et la maison IV l’issue de l’affaire. On achète quand la Lune décroît en lumière et on vend quand elle croît (al-Biruni, Bonatti) ; on évite la Lune vide de course et Mercure rétrograde ; on préfère la planète de l’actif forte et la Lune s’appliquant à un bénéfique."
  },
  "chat": {
   "title": "Parler à l’astrologue",
   "intro": "Demandez ce que vous voulez : l’amour, l’argent, l’achat et la vente, le travail, l’année à venir. Chaque question est aussi dressée en thème horaire pour l’instant où elle est posée.",
   "useNatal": "Utiliser mon thème natal",
   "usePartner": "Inclure l’autre personne (onglet Amour)",
   "where": "Je me trouve à",
   "ph": "Écrivez votre question…",
   "clear": "Effacer la conversation",
   "note": "Les réponses sont un jugement symbolique traditionnel, non une certitude.",
   "astrologer": "Astrologue",
   "ruleFrom": "Astrologue (règles classiques)",
   "welcome": "Bienvenue. Je lis votre thème avec les méthodes de Ptolémée, d’Abu Ma’shar, d’al-Biruni, de Lilly, de Parashara et des maîtres chinois. Interrogez-moi sur l’amour, l’argent, l’achat et la vente, le travail ou l’année à venir. Pour une lecture personnelle, saisissez d’abord vos données de naissance dans l’onglet **Thème natal**."
  }
 },
 "hsys": {
  "placidus": "Placidus",
  "regio": "Regiomontanus (Lilly)",
  "whole": "Signes entiers (hellénistique)",
  "equal": "Maisons égales"
 },
 "tone": {
  "good": "favorable",
  "hard": "difficile",
  "mixed": "mitigé"
 },
 "str": {
  "vstrong": "en très bonne condition",
  "strong": "en bonne condition",
  "mid": "en condition moyenne",
  "weak": "en condition faible",
  "vweak": "en état de grave affliction"
 },
 "err": {
  "title": "Un point est à corriger",
  "coords": "La latitude doit être comprise entre −90 et 90 et la longitude entre −180 et 180.",
  "tz": "Le fuseau horaire « {tz} » n’a pas été reconnu. Utilisez un nom comme Asia/Tehran ou un nombre comme 3.5.",
  "date": "La date est incomplète : saisissez le jour, le mois et l’année.",
  "jyear": "Une année de l’hégire solaire doit être comprise entre 1200 et 1500.",
  "jday": "Les mois de Mehr à Esfand comptent au plus 30 jours.",
  "gyear": "Une année grégorienne doit être comprise entre 1800 et 2200.",
  "future": "Cette date de naissance est dans le futur.",
  "question": "Formulez votre question clairement et complètement.",
  "noSlots": "Aucun moment n’a été trouvé dans cette période.",
  "wyear": "Saisissez une année comprise entre 1850 et 2150.",
  "natalFirst": "Dressez d’abord votre thème natal dans l’onglet Thème natal."
 },
 "ai": {
  "unavailable": "L’astrologue conversationnel fonctionne lorsque cette page est ouverte dans Claude. Tous les jugements ci-dessus sont intégralement calculés selon les règles classiques.",
  "question": "Question",
  "thinking": "L’astrologue étudie le thème…",
  "truncated": "La réponse a été interrompue ; demandez « continuez » pour la suite.",
  "failed": "La réponse n’a pas abouti. Posez de nouveau la question dans un instant.",
  "denied": "L’autorisation d’interroger Claude n’a pas été accordée ; les jugements fondés sur les règles ci-dessus restent valables.",
  "limited": "La limite de questions est atteinte ; réessayez un peu plus tard.",
  "natalTitle": "Interroger l’astrologue sur ce thème",
  "natalPh": "p. ex. Pour quel travail suis-je vraiment fait ?",
  "natalSugg": [
   "Quel est le fil caché de ma vie ?",
   "Pour quel travail suis-je vraiment fait ?",
   "Comment voyez-vous mon mariage et mon conjoint ?",
   "Que signifie la période que je traverse ?",
   "Où les traditions se contredisent-elles dans mon thème ?"
  ],
  "bizSugg": [
   "Où cette entreprise réalise-t-elle le plus de profit ?",
   "Quelle est la faiblesse cachée de cette société ?",
   "Comment s’annonce l’année à venir pour cette entreprise ?"
  ],
  "horaryTitle": "La réponse de l’astrologue",
  "horaryPh": "Question complémentaire (p. ex. que puis-je faire pour améliorer les choses ?)",
  "horarySugg": [
   "Précisez-moi davantage le moment",
   "Quel est l’obstacle ?",
   "Que dois-je faire pour améliorer l’issue ?"
  ],
  "worldTitle": "Interroger l’astrologue sur cette année",
  "worldPh": "p. ex. Comment se portera l’économie cette année ?",
  "worldSugg": [
   "Comment se porteront l’économie et les marchés ?",
   "Comment les gens ordinaires vivront-ils cette année ?",
   "Quelle saison sera la plus tendue ?"
  ],
  "loveTitle": "Interroger l’astrologue sur l’amour",
  "lovePh": "p. ex. Quand rencontrerai-je la bonne personne ?",
  "loveSugg": [
   "Quand s’ouvre ma prochaine fenêtre pour l’amour ?",
   "Quel partenaire me convient vraiment ?",
   "Quel schéma se répète dans mes relations ?"
  ],
  "loveSuggPair": [
   "Sommes-nous vraiment compatibles ?",
   "Qu’est-ce qui nous unira, et qu’est-ce qui pourrait nous séparer ?",
   "Un mariage entre nous est-il une bonne idée, et quand ?"
  ],
  "moneyTitle": "Interroger l’astrologue sur l’argent",
  "moneyPh": "p. ex. Quel domaine me rapportera le plus ?",
  "moneySugg": [
   "D’où vient vraiment mon argent ?",
   "Cette année est-elle bonne pour investir ?",
   "Suis-je fait pour le salariat ou pour ma propre affaire ?"
  ],
  "tradeTitle": "Interroger l’astrologue sur cette affaire",
  "tradePh": "p. ex. Dois-je attendre la semaine prochaine ?",
  "tradeSugg": [
   "Dois-je agir maintenant ou attendre ?",
   "Le prix va-t-il plutôt monter ou baisser ?",
   "Quel est le plus grand risque de cette affaire ?"
  ],
  "chatSugg": [
   "Vais-je trouver l’amour cette année ?",
   "Est-ce un bon moment pour investir ?",
   "Dois-je acheter ou vendre maintenant ?",
   "Vais-je obtenir ce poste ?",
   "Comment s’annonce pour moi l’année à venir ?"
  ]
 },
 "pl": {
  "sun": {
   "name": "Soleil",
   "short": "la volonté et l’honneur",
   "sig": "la force vitale, la volonté, l’honneur, le père, les souverains et les détenteurs de l’autorité, la réputation",
   "good": "la magnanimité, la confiance, la générosité, le rang et le respect",
   "bad": "la vanité, l’arrogance, l’esprit de domination et l’orgueil blessé",
   "mundane": "le souverain et le gouvernement"
  },
  "moon": {
   "name": "Lune",
   "short": "le sentiment et le corps",
   "sig": "le corps, les sentiments, la mère, l’épouse dans un thème masculin, le peuple, le changement et les voyages",
   "good": "la bonté, un instinct sûr, la faculté d’adaptation, la popularité",
   "bad": "l’humeur changeante, l’agitation, la dépendance et l’inquiétude",
   "mundane": "le peuple"
  },
  "mercury": {
   "name": "Mercure",
   "short": "l’esprit et la parole",
   "sig": "l’intellect, la parole, l’écriture, le calcul, le commerce, les contrats, les jeunes gens et la fratrie",
   "good": "un esprit vif, l’éloquence, l’aisance dans l’étude, les chiffres et le négoce",
   "bad": "la ruse, la dispersion, le mensonge et l’inconstance",
   "mundane": "les scribes, les marchands, la presse et les lettres"
  },
  "venus": {
   "name": "Vénus",
   "short": "l’amour et le plaisir",
   "sig": "l’amour, le mariage, la beauté, l’art, la joie, le confort et la parure",
   "good": "le charme, le goût artistique, l’esprit de conciliation, le succès en amour et en amitié",
   "bad": "l’indolence, l’excès dans les plaisirs, la mollesse et les attachements instables",
   "mundane": "les femmes, les fêtes et l’abondance"
  },
  "mars": {
   "name": "Mars",
   "short": "l’élan et le combat",
   "sig": "le courage, la lutte, la guerre, le feu, le fer, la chirurgie, la vitesse et la colère",
   "good": "la bravoure, la compétence pratique, la force d’aller au bout et de défendre ce qui est juste",
   "bad": "l’emportement, l’agressivité, les accidents et les coupures, la précipitation",
   "mundane": "la guerre, les troubles, les incendies et l’armée"
  },
  "jupiter": {
   "name": "Jupiter",
   "short": "la fortune et la croissance",
   "sig": "la bonne fortune, la religion et le savoir, la justice, l’accroissement des richesses, les enfants, les juges et les sages",
   "good": "la générosité, l’optimisme, l’intégrité, la croissance et l’abondance",
   "bad": "l’excès, les promesses creuses, la crédulité et l’hypocrisie",
   "mundane": "la religion, la loi, l’abondance et la paix"
  },
  "saturn": {
   "name": "Saturne",
   "short": "la patience et les limites",
   "sig": "le temps, la patience, la structure, le dur labeur, la vieillesse, la terre, le retard, le chagrin et la sagesse",
   "good": "l’endurance, la profondeur, la discipline, une richesse durable et un honneur durable",
   "bad": "la peur, l’isolement, l’avarice, le retard, la perte et un lourd labeur sans récompense",
   "mundane": "la sécheresse, la famine, les maladies chroniques, les vieillards et les propriétaires terriens"
  },
  "uranus": {
   "name": "Uranus",
   "short": "le changement soudain",
   "sig": "le changement soudain, l’innovation et la rupture (interprétation moderne)"
  },
  "neptune": {
   "name": "Neptune",
   "short": "le rêve et l’ambiguïté",
   "sig": "les rêves, l’ambiguïté, la spiritualité et la tromperie (interprétation moderne)"
  },
  "pluto": {
   "name": "Pluton",
   "short": "le pouvoir caché",
   "sig": "le pouvoir caché, l’effondrement et la régénération (interprétation moderne)"
  },
  "node": {
   "name": "Nœud Nord (Rahu)",
   "short": "la faim et l’accroissement",
   "sig": "l’accroissement : avec les bénéfiques il accroît le bien, avec les maléfiques le mal ; en Inde, la faim du monde et l’obsession"
  },
  "snode": {
   "name": "Nœud Sud (Ketu)",
   "short": "le lâcher-prise et le détachement",
   "sig": "la diminution et la libération ; en Inde, la maîtrise passée, le détachement et la vision spirituelle"
  }
 },
 "signs": {
  "0": {
   "name": "Bélier",
   "asc": "Une nature ignée et pionnière : intrépide, directe, prompte à commencer et parfois impatiente de finir. Un visage vif et un regard ardent ; s’enflamme vite et s’apaise vite.",
   "sun": "Le Soleil en exaltation : le pouvoir d’initier, le courage et le désir de commander. La hâte doit s’allier au jugement.",
   "moon": "Des sentiments rapides et immédiats ; s’attache vite et se blesse vite. A besoin d’indépendance et d’action."
  },
  "1": {
   "name": "Taureau",
   "asc": "Calme, constant et de bon goût ; lent à décider mais fidèle à sa décision. Attaché au confort, à la beauté et aux biens, et difficile à déloger.",
   "sun": "La constance, la patience et le don de bâtir une fortune ; l’entêtement doit se muer en persévérance.",
   "moon": "La Lune en exaltation : le calme émotionnel, la loyauté et un sentiment de sécurité puisé dans les choses tangibles."
  },
  "2": {
   "name": "Gémeaux",
   "asc": "Curieux, bavard et polyvalent ; un esprit agile et souple qui fuit la monotonie. Habile dans l’étude et le commerce, quoique parfois dispersé.",
   "sun": "L’intelligence, la curiosité et l’art de communiquer ; une dualité dans les désirs.",
   "moon": "Un cœur apaisé par la conversation ; pèse les sentiments à l’aune de la raison et change vite."
  },
  "3": {
   "name": "Cancer",
   "asc": "Sensible, dévoué à la famille et protecteur ; une carapace prudente autour d’un intérieur tendre. Une forte mémoire affective et un attachement au foyer et aux racines.",
   "sun": "Le soin d’autrui, la fidélité à la famille et la sensibilité ; le Soleil a besoin ici d’un havre sûr.",
   "moon": "La Lune dans son domicile : un sentiment profond, une sollicitude maternelle et une grande intelligence émotionnelle."
  },
  "4": {
   "name": "Lion",
   "asc": "Magnanime, généreux et désireux d’être vu ; une présence chaleureuse et imposante. Sensible à l’honneur et au respect, et loyal en amitié.",
   "sun": "Le Soleil dans son domicile : la souveraineté, la créativité et un cœur chaleureux ; l’orgueil est le piège.",
   "moon": "A besoin d’admiration et de chaleur affective ; un amour généreux et démonstratif."
  },
  "5": {
   "name": "Vierge",
   "asc": "Précis, appliqué et perspicace ; porté au service, à l’ordre et à la propreté. Un esprit analytique qui s’inquiète parfois trop des détails.",
   "sun": "La précision, l’habileté et le service ; un perfectionnisme qui tourne à la sévérité s’il n’est pas tempéré.",
   "moon": "Apaisée par l’ordre et l’utilité ; exprime ses sentiments par le travail et l’attention."
  },
  "6": {
   "name": "Balance",
   "asc": "Gracieux, juste et épris de beauté ; brille dans la relation et l’association. Évite le conflit et hésite parfois à trancher.",
   "sun": "Le Soleil en chute : le moi se découvre dans le miroir d’autrui ; diplomatie et équité, mais besoin d’un jugement indépendant.",
   "moon": "Un cœur apaisé par la compagnie et l’harmonie ; a besoin d’une relation équilibrée."
  },
  "7": {
   "name": "Scorpion",
   "asc": "Profond, secret et puissant ; un sentiment intense derrière un visage calme. Lent à accorder sa confiance ; n’oublie ni l’amitié ni l’offense.",
   "sun": "Une volonté profonde, l’endurance dans l’épreuve et le pouvoir de transformer.",
   "moon": "La Lune en chute : des émotions intenses et cachées ; a besoin d’une confiance totale avant d’ouvrir son cœur."
  },
  "8": {
   "name": "Sagittaire",
   "asc": "Libre, optimiste et avide de savoir ; attiré par les voyages, la philosophie et l’étude. Franc jusqu’à la brusquerie, et allergique à l’enfermement.",
   "sun": "La quête de sens, l’optimisme et la générosité de cœur ; a besoin de vastes horizons.",
   "moon": "Un cœur libre et aventureux, apaisé par les voyages, l’étude et les idéaux."
  },
  "9": {
   "name": "Capricorne",
   "asc": "Sérieux, ambitieux et endurant ; gravit la montagne pas à pas. Plus lourd dans la jeunesse et plus léger avec l’âge, il connaît le prix du temps.",
   "sun": "L’ambition, le sens des responsabilités et le pouvoir d’organiser ; une réussite tardive mais durable.",
   "moon": "La Lune en exil : des sentiments retenus ; cherche la sécurité dans le travail et l’accomplissement."
  },
  "10": {
   "name": "Verseau",
   "asc": "Indépendant, réfléchi et humaniste ; fidèle à ses principes et sans crainte des voies nouvelles. Ami du groupe qui garde une distance intérieure.",
   "sun": "Le Soleil en exil : l’individualité au service du collectif ; des idées neuves et des principes fermes.",
   "moon": "Des sentiments pesés par la raison et les idéaux ; a besoin de liberté au sein de la relation."
  },
  "11": {
   "name": "Poissons",
   "asc": "Bienveillant, imaginatif et compatissant ; absorbe l’humeur d’autrui et penche vers l’art et la mystique. Des limites floues ; doit se garder de la tromperie et de la dispersion.",
   "sun": "La compassion, l’intuition et l’imagination ; un moi qui trouve son sens dans le service et la foi.",
   "moon": "Un cœur océanique et empathique ; a besoin de solitude et d’un refuge spirituel."
  }
 },
 "el": {
  "fire": "feu",
  "earth": "terre",
  "air": "air",
  "water": "eau"
 },
 "mode": {
  "movable": "cardinal (mobile)",
  "fixed": "fixe",
  "common": "mutable (commun)"
 },
 "kind": {
  "angle": "angulaire",
  "succedent": "succédente",
  "cadent": "cadente"
 },
 "unit": {
  "days": "jours",
  "weeks": "semaines",
  "months": "mois",
  "years": "ans"
 },
 "dir": {
  "fire": "est",
  "earth": "sud",
  "air": "ouest",
  "water": "nord"
 },
 "temp": {
  "choleric": {
   "name": "colérique (chaud et sec)",
   "text": "Ardent, emporté, ambitieux et travailleur ; prompt à agir et enclin à diriger. Doit maîtriser la colère et la précipitation."
  },
  "sanguine": {
   "name": "sanguin (chaud et humide)",
   "text": "Gai, sociable, plein d’espoir et ouvert ; aime la vie et compte de nombreux amis. Ne doit pas prendre ses engagements à la légère."
  },
  "melancholic": {
   "name": "mélancolique (froid et sec)",
   "text": "Profond, précis, prudent et constant ; porté à la réflexion et à l’étude. Doit se garder du pessimisme et du repli sur soi."
  },
  "phlegmatic": {
   "name": "flegmatique (froid et humide)",
   "text": "Calme, patient, bienveillant et conciliant ; rarement agité, il apporte la paix. Doit lutter contre l’indolence et les atermoiements."
  }
 },
 "dig": {
  "domicile": "domicile",
  "exaltation": "exaltation",
  "triplicity": "triplicité",
  "term": "terme (borne)",
  "face": "face (décan)",
  "detriment": "exil",
  "fall": "chute",
  "peregrine": "pérégrin"
 },
 "acc": {
  "house": "en maison {n}",
  "retro": "rétrograde",
  "direct": "de marche directe",
  "swift": "de marche rapide",
  "slow": "de marche lente",
  "cazimi": "cazimi (au cœur du Soleil)",
  "combust": "combuste",
  "beams": "sous les rayons du Soleil",
  "free": "libre des rayons du Soleil",
  "oriental": "en position orientale",
  "occidental": "en position occidentale",
  "waxing": "en augmentation de lumière",
  "waning": "en diminution de lumière",
  "partileConj": "conjonction partile ({p})",
  "partileTrine": "aspect amical partile ({p})",
  "partileOpp": "opposition partile ({p})",
  "partileSquare": "carré partile ({p})",
  "star": "avec l’étoile fixe {p}"
 },
 "asp": {
  "conj": {
   "name": "conjonction"
  },
  "sextile": {
   "name": "sextile"
  },
  "square": {
   "name": "carré"
  },
  "trine": {
   "name": "trigone"
  },
  "opposition": {
   "name": "opposition"
  }
 },
 "houses": {
  "1": {
   "title": "Le soi, le caractère et le corps",
   "topics": "le soi et le corps, le tempérament, le commencement de la vie",
   "mundane": "le peuple du pays et l’état général de la société",
   "business": "l’entreprise elle-même, son esprit et son identité de marque"
  },
  "2": {
   "title": "L’argent et les revenus",
   "topics": "les biens, les revenus, l’épargne et les moyens financiers",
   "mundane": "le trésor public, l’économie, le budget",
   "business": "la trésorerie, les bénéfices et les actifs"
  },
  "3": {
   "title": "La fratrie, les courts voyages, les premiers apprentissages",
   "topics": "les frères et sœurs, la parenté, les courts voyages, les messages et l’instruction élémentaire",
   "mundane": "les communications, les transports, les médias et les voisins",
   "business": "la publicité, les communications, les petits contrats et la distribution"
  },
  "4": {
   "title": "Le père, le foyer et les biens fonciers",
   "topics": "le père, le foyer, la terre et les biens immobiliers, les racines et la fin des choses",
   "mundane": "la terre, l’agriculture, l’immobilier et l’opposition au gouvernement",
   "business": "les locaux, les biens immobiliers et les fondations ; l’issue finale"
  },
  "5": {
   "title": "Les enfants, l’amour et les plaisirs",
   "topics": "les enfants, les plaisirs, les amours, les loisirs et la création",
   "mundane": "les naissances, les divertissements, les ambassadeurs et les messagers",
   "business": "la créativité, les placements spéculatifs et le divertissement"
  },
  "6": {
   "title": "La santé et le travail quotidien",
   "topics": "la maladie, le travail quotidien, les subordonnés, les animaux et la peine",
   "mundane": "la santé publique, les travailleurs et les forces armées",
   "business": "les employés, la routine et les services"
  },
  "7": {
   "title": "Le mariage et l’association",
   "topics": "le mariage, les partenaires, les contrats, les ennemis déclarés et les procès",
   "mundane": "la guerre et la paix, les relations extérieures et les ennemis déclarés",
   "business": "les associés, les clients, les concurrents et les grands contrats"
  },
  "8": {
   "title": "Les crises, l’argent d’autrui et l’héritage",
   "topics": "la mort et l’héritage, l’argent du conjoint, les prêts, les peurs et les crises",
   "mundane": "la mortalité, les dettes et l’argent étranger",
   "business": "les dettes, les capitaux d’autrui, les investisseurs et les impôts"
  },
  "9": {
   "title": "Les longs voyages, le savoir et la foi",
   "topics": "les longs voyages, la religion, la philosophie, les études supérieures, les songes et la prophétie",
   "mundane": "la religion, les tribunaux, les universités et les voyages au long cours",
   "business": "les marchés lointains, l’exportation, le droit et la formation"
  },
  "10": {
   "title": "La carrière, le rang et la réputation",
   "topics": "la carrière et la profession, le rang et la renommée, la mère (chez Lilly), le souverain",
   "mundane": "le souverain, le gouvernement et le prestige de la nation",
   "business": "la réputation, la direction et la position sur le marché"
  },
  "11": {
   "title": "Les amis et les espérances",
   "topics": "les amis, les espoirs et les souhaits, les protecteurs et les revenus du métier",
   "mundane": "le parlement, les amis et les alliés du gouvernement",
   "business": "les revenus de l’activité, les réseaux et les soutiens"
  },
  "12": {
   "title": "Les ennemis cachés et la réclusion",
   "topics": "les ennemis cachés, le chagrin, l’enfermement, la solitude et les affaires secrètes",
   "mundane": "les prisons, les conspirations et les ennemis cachés",
   "business": "les concurrents cachés, les pertes dissimulées et les risques invisibles"
  }
 },
 "lots": {
  "fortune": {
   "name": "Part de Fortune",
   "text": "Le lieu de la chance, du corps, de la santé et des moyens de subsistance."
  },
  "spirit": {
   "name": "Part de l’Esprit",
   "text": "Le lieu de l’intelligence et de la volonté, de la profession et des actions choisies."
  },
  "marriage": {
   "name": "Part du Mariage",
   "text": "L’indicateur de l’union conjugale (d’après Hermès et al-Biruni)."
  },
  "father": {
   "name": "Part du Père",
   "text": "La condition du père et l’héritage paternel."
  },
  "mother": {
   "name": "Part de la Mère",
   "text": "La condition de la mère et le lien avec elle."
  },
  "eros": {
   "name": "Part d’Éros (Paulus)",
   "text": "Le désir et le manque : ce vers quoi le cœur se tend, en amour et au-delà."
  },
  "necessity": {
   "name": "Part de la Nécessité (Paulus)",
   "text": "La contrainte et la lutte : ce que la vie impose, et les inimitiés qui nous façonnent."
  },
  "courage": {
   "name": "Part du Courage (Paulus)",
   "text": "L’audace et la hardiesse, mais aussi la traîtrise : la manière dont on combat."
  },
  "victory": {
   "name": "Part de la Victoire (Paulus)",
   "text": "La foi, le succès et les fruits de l’espérance."
  },
  "nemesis": {
   "name": "Part de Némésis (Paulus)",
   "text": "Ce à quoi l’on ne peut échapper : les dettes cachées du destin, les pertes et leur sens."
  }
 },
 "stars": {
  "algol": {
   "name": "Algol"
  },
  "alcyone": {
   "name": "Alcyone (Pléiades)"
  },
  "aldebaran": {
   "name": "Aldébaran"
  },
  "rigel": {
   "name": "Rigel"
  },
  "bellatrix": {
   "name": "Bellatrix"
  },
  "betelgeuse": {
   "name": "Bételgeuse"
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
   "name": "Régulus"
  },
  "denebola": {
   "name": "Dénébola"
  },
  "vindemiatrix": {
   "name": "Vindemiatrix"
  },
  "spica": {
   "name": "L’Épi (Spica)"
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
   "name": "Antarès"
  },
  "rasalhague": {
   "name": "Rasalhague"
  },
  "facies": {
   "name": "Facies"
  },
  "vega": {
   "name": "Véga"
  },
  "altair": {
   "name": "Altaïr"
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
  "sun": "Période du Soleil : venue à la lumière, rang, rapports avec les puissants et avec le père, quête d’un nom.",
  "venus": "Période de Vénus : amour et amitié, mariage et art, confort et beauté.",
  "mercury": "Période de Mercure : étude, écriture, commerce, courts voyages et savoir-faire.",
  "moon": "Période de la Lune : changements, déménagements, famille et mère, état du corps et du cœur.",
  "saturn": "Période de Saturne : dur labeur et construction, responsabilité, patience et épreuve ; des fruits lents mais durables.",
  "jupiter": "Période de Jupiter : ouverture, croissance, savoir et foi, accroissement de la fortune et des biens.",
  "mars": "Période de Mars : effort et compétition, courage, conflits et précipitation ; risque d’accidents.",
  "node": "Période du Nœud Nord : accroissement et élévation ; des choses nouvelles entrent dans la vie.",
  "snode": "Période du Nœud Sud : diminution et lâcher-prise ; la fin d’un chapitre et la préparation du suivant."
 },
 "nat": {
  "sec": {
   "summary": "Jugement d’ensemble",
   "houses": "Les douze maisons",
   "housesBiz": "Les domaines de l’entreprise",
   "planets": "Les sept planètes",
   "aspects": "Aspects",
   "lots": "Parts",
   "time": "Maîtres du temps et moment présent"
  },
  "sectDay": "Thème diurne (le Soleil au-dessus de l’horizon). Le Soleil, Jupiter et Saturne appartiennent à la secte du thème : Saturne nuit donc moins.",
  "sectNight": "Thème nocturne (le Soleil sous l’horizon). La Lune, Vénus et Mars appartiennent à la secte du thème : Mars nuit donc moins.",
  "asc": "Ascendant à {pos} ({el}, {mode}).",
  "ascBusiness": "L’identité de cette entreprise :",
  "ascRuler": "Maître de l’Ascendant : {planet}, en maison {h} et {word} ; la vie et son chemin s’orientent vers {topics}.",
  "ascRulerBiz": "Maître de l’Ascendant : {planet}, en maison {h} et {word} ; le destin de l’entreprise s’oriente vers {topics}.",
  "temp": "Tempérament dominant : {temp}, avec une note secondaire : {second}.",
  "sunIn": "Soleil en {sign} :",
  "moonIn": "Lune en {sign} ({phase}) :",
  "moonPhase": {
   "new": "nouvelle",
   "waxing": "croissante",
   "gibbous": "presque pleine",
   "full": "pleine",
   "waning": "décroissante",
   "balsamic": "balsamique, avant la lune noire"
  },
  "strongest": "Planète la plus forte selon le barème de Lilly : {planet} (score {score}) ; « {good} » est le plus grand capital du natif. La plus faible : {weak} ; gare à « {bad} ».",
  "elements": "Équilibre des éléments : {list}. L’élément {top} prédomine et l’élément {low} fait défaut.",
  "houseLord": "La pointe tombe en {sign} ; son maître, {lord}, se trouve en maison {h} et est {word}.",
  "houseLink": "Ainsi, les affaires de cette maison se nouent et se décident à travers {topics}.",
  "houseOwn": "Le maître est dans sa propre maison : ce domaine tient debout par lui-même.",
  "houseCadent": "Le maître est dans une maison « tombée » (VI, VIII ou XII) qui ne voit pas l’Ascendant ; ce que promet cette maison s’obtient au prix de plus d’efforts.",
  "houseAngle": "Le maître est angulaire : ce domaine est saillant et visible dans la vie.",
  "houseBen": "{planet}, bénéfique, occupe cette maison et la bénit.",
  "houseBenWeak": "{planet}, bénéfique, occupe cette maison et la bénit, bien que sa propre condition soit faible.",
  "houseMalMild": "{planet}, maléfique, occupe cette maison : une difficulté que la discipline peut maîtriser.",
  "houseMalHard": "{planet}, maléfique, occupe cette maison : retard, tension ou dommage en ce domaine ; la vigilance s’impose.",
  "houseOther": "Se trouve aussi dans cette maison : {planet}, qui y ajoute {x}.",
  "houseFortune": "La Part de Fortune tombe ici ; la chance est liée à ce domaine.",
  "verdict": {
   "good": "Jugement : favorable et secourable.",
   "mixed": "Jugement : mitigé ; tout dépend de l’effort et du moment.",
   "hard": "Jugement : difficile ; il demande patience et stratégie."
  },
  "planetPos": "{planet} à {pos}, maison {h}{retro}.",
  "planetDig": "Dignité essentielle : {ess} ({es}) ; accidentelle : {acc} ; au total, {word} (score de Lilly : {total}).",
  "planetBrings": "Cette planète apporte {sig} ; son champ d’action : {topics}.",
  "planetGood": "Étant forte, elle montre sa bonne face : {good}.",
  "planetBad": "Étant faible, elle rend ce domaine laborieux : {bad}.",
  "planetMixed": "Son bien et sa difficulté se mêlent ; l’issue dépend de l’effort et du temps.",
  "malInSect": "{planet} appartient ici à la secte du thème : ses épreuves sont plus constructives et plus faciles à contenir.",
  "malOutSect": "{planet} est ici contraire à la secte : ses dommages sont plus vifs et doivent être consciemment refrénés.",
  "benInSect": "{planet} appartient à la secte du thème : sa bonté se déploie plus pleinement.",
  "joy": "{planet} est ici dans sa joie : la planète œuvre à son aise dans cette maison.",
  "notable": "À noter : {list}.",
  "retroMark": "rétrograde",
  "aspHead": "{a} {asp} {b} (orbe {orb}°, {dir}).",
  "applying": "appliquant",
  "separating": "séparant",
  "aspEasy": "Entraide entre « {x} » et « {y} ».",
  "aspEasyBen": "Entraide entre « {x} » et « {y} » ; signe de grâce et d’ouverture.",
  "aspEasyMal": "Entraide entre « {x} » et « {y} » ; la difficulté se change en stratégie et en patience.",
  "aspHard": "Il y a une tension entre « {x} » et « {y} ».",
  "aspHardMal": "Il y a une tension entre « {x} » et « {y} » ; épreuve et pression qui, devenues conscientes, se changent en force.",
  "aspHardBen": "Il y a une tension entre « {x} » et « {y} » ; un don acquis à travers l’excès ou le désaccord.",
  "aspConj": "Fusion de « {x} » et de « {y} ».",
  "aspConjMixed": "Fusion de « {x} » et de « {y} » ; un mélange de grâce et de difficulté.",
  "aspConjMal": "Fusion de « {x} » et de « {y} » ; une force intense qu’il faut employer à bon escient.",
  "aspConjBen": "Fusion de « {x} » et de « {y} » ; signe de bénédiction.",
  "modernNote": "(Planète moderne : ne fait pas partie du système classique.)",
  "firdarTitle": "Firdaria en cours (Abu Ma’shar)",
  "firdar": "Du {from} au {to}. {text}",
  "firdarSub": "Sous-période ({planet}) jusqu’au {to} : s’y ajoute la couleur de « {x} ».",
  "firdarLordTitle": "Le maître de la firdaria dans le thème natal",
  "firdarLord": "{planet} : {word} dans le thème natal, en maison {h} ; cette période met donc en lumière {topics}.",
  "profTitle": "Profection annuelle ({n}e année de vie)",
  "profTitleBiz": "Profection annuelle ({n}e année d’activité)",
  "prof": "L’Ascendant est profecté en {sign} (maison {h}) : cette année, l’accent porte sur {topics}. Maître de l’année : {planet}, {word} dans le thème ; ses transits et ses aspects pèsent davantage cette année.",
  "transit": "{planet} se trouve maintenant à {pos} et traverse votre maison {h} ({topics}).",
  "transitMeaning": {
   "saturn": "Ce domaine devient le champ de l’épreuve, de la responsabilité et de la construction lente.",
   "jupiter": "Ce domaine devient le champ de l’ouverture, de la croissance et des occasions."
  },
  "transitHit": "{asp} au point natal {target}",
  "transitActive": "Contacts actifs : {list}.",
  "transitTitle": {
   "saturn": "Transit de Saturne",
   "jupiter": "Transit de Jupiter"
  }
 },
 "qtypes": {
  "love": {
   "name": "Amour, mariage ou retour d’une personne",
   "kw": [
    "mariage",
    "marier",
    "épous",
    "amour",
    "amoureu",
    "relation",
    "couple",
    "mon mari",
    "conjoint",
    "reviendra",
    "revenir",
    "divorce",
    "rupture",
    "fiançailles"
   ]
  },
  "career": {
   "name": "Emploi, embauche, promotion ou poste",
   "kw": [
    "emploi",
    "travail",
    "boulot",
    "poste",
    "carrière",
    "embauch",
    "recrut",
    "promotion",
    "entretien",
    "patron",
    "licenci",
    "métier"
   ]
  },
  "business": {
   "name": "Affaires et réussite d’une entreprise",
   "kw": [
    "entreprise",
    "société",
    "affaire",
    "start-up",
    "startup",
    "commerce",
    "boutique",
    "magasin",
    "projet",
    "client",
    "lancement",
    "associé"
   ]
  },
  "money": {
   "name": "Argent, revenus ou profit",
   "kw": [
    "argent",
    "revenu",
    "profit",
    "bénéfice",
    "salaire",
    "riche",
    "richesse",
    "fortune",
    "investi",
    "gagner",
    "finances",
    "placement"
   ]
  },
  "lost": {
   "name": "Un objet perdu",
   "kw": [
    "perdu",
    "égaré",
    "retrouver",
    "retrouverai",
    "disparu",
    "volé",
    "vol de",
    "cambriol",
    "où est",
    "où sont",
    "introuvable"
   ]
  },
  "travel": {
   "name": "Long voyage, émigration ou visa",
   "kw": [
    "voyage",
    "visa",
    "étranger",
    "émigr",
    "immigr",
    "expatri",
    "titre de séjour",
    "résidence",
    "passeport",
    "partir vivre",
    "naturalisation"
   ]
  },
  "study": {
   "name": "Études, examen ou admission",
   "kw": [
    "examen",
    "concours",
    "université",
    "admission",
    "admis",
    "diplôme",
    "réussir",
    "étude",
    "baccalauréat",
    "école",
    "master",
    "thèse"
   ]
  },
  "home": {
   "name": "Maison, bien immobilier ou terrain",
   "kw": [
    "maison",
    "logement",
    "appartement",
    "propriété",
    "immobilier",
    "terrain",
    "loyer",
    "louer",
    "déménag",
    "achat",
    "acheter un"
   ]
  },
  "children": {
   "name": "Enfants ou grossesse",
   "kw": [
    "enfant",
    "bébé",
    "enceinte",
    "grossesse",
    "fils",
    "fille",
    "naissance",
    "accouch",
    "concevoir",
    "fertilité"
   ]
  },
  "health": {
   "name": "Maladie et guérison",
   "kw": [
    "malade",
    "maladie",
    "santé",
    "guérir",
    "guérison",
    "opération",
    "chirurgie",
    "traitement",
    "médecin",
    "hôpital",
    "rétabli"
   ]
  },
  "lawsuit": {
   "name": "Procès, tribunal ou rival",
   "kw": [
    "tribunal",
    "procès",
    "plainte",
    "avocat",
    "juge",
    "jugement",
    "litige",
    "rival",
    "adversaire",
    "verdict",
    "poursuite"
   ]
  },
  "debt": {
   "name": "Prêt, dette ou héritage",
   "kw": [
    "prêt",
    "emprunt",
    "dette",
    "crédit",
    "héritage",
    "hériter",
    "hypothèque",
    "rembourse",
    "succession"
   ]
  },
  "sibling": {
   "name": "Fratrie, voisin ou nouvelles",
   "kw": [
    "frère",
    "sœur",
    "voisin",
    "des nouvelles",
    "message",
    "lettre",
    "courrier",
    "cousin",
    "réponse"
   ]
  },
  "friends": {
   "name": "Un souhait, un ami ou une espérance",
   "kw": [
    "souhait",
    "vœu",
    "espoir",
    "espère",
    "ami",
    "amie",
    "amitié",
    "rêve",
    "se réaliser",
    "désir"
   ]
  },
  "enemy": {
   "name": "Ennemi caché, secrets ou enfermement",
   "kw": [
    "ennemi",
    "secret",
    "caché",
    "prison",
    "jalousie",
    "jaloux",
    "sortilège",
    "mauvais œil",
    "trahison",
    "complot",
    "nuire"
   ]
  }
 },
 "elect": {
  "business": "Créer une entreprise ou ouvrir une boutique",
  "contract": "Signer un contrat",
  "launch": "Lancer un produit, un site web ou une campagne",
  "marriage": "Mariage ou fiançailles",
  "travel": "Commencer un voyage",
  "property": "Acheter un bien ou déménager",
  "interview": "Entretien d’embauche ou rencontre avec un supérieur"
 },
 "elr": {
  "voc": "Lune vide de course",
  "viaCombusta": "Lune dans la via combusta",
  "moonCombust": "Lune combuste (proche de la lune noire)",
  "waxing": "Lune croissante",
  "moonDebil": "Lune en exil ou en chute",
  "moonDignified": "Lune en domicile ou en exaltation",
  "moonToBen": "Lune s’appliquant à {p}",
  "moonToMal": "Lune s’appliquant par {asp} à {p}",
  "moonToMalSoft": "Lune s’appliquant à {p} (aspect amical)",
  "moonFixed": "Lune en signe fixe (durabilité)",
  "moonMovable": "Lune en signe cardinal (rapidité)",
  "ascRuler": "Maître de l’Ascendant ({p}) {word}",
  "houseRuler": "Maître de la maison {h} ({p}) {word}",
  "benAngle": "{p} sur l’angle de la maison {h}",
  "benHouse": "{p} en maison {h}",
  "malAngle": "{p} sur l’angle de la maison {h}",
  "mal7": "{p} en maison VII",
  "retro": "{p} rétrograde",
  "planet": "{p} (planète de l’affaire) {word}",
  "hour": "heure planétaire : {p}",
  "hourMal": "heure planétaire : {p}",
  "waningBuy": "Lune décroissante (favorable à l’achat)",
  "waxingBuy": "Lune croissante (prix en hausse)",
  "waxingSell": "Lune croissante (favorable à la vente)",
  "waningSell": "Lune décroissante (prix en baisse)",
  "edgeYou": "votre significateur plus fort que l’autre partie",
  "edgeThem": "l’autre partie plus forte"
 },
 "hor": {
  "early": "L’Ascendant est dans les premiers degrés de son signe ({d}°) : il est trop tôt ; l’affaire n’est pas mûre et la question est peut-être prématurée.",
  "late": "L’Ascendant est dans les derniers degrés de son signe ({d}°) : l’affaire est déjà tranchée ou a déjà échappé.",
  "voc": "La Lune est vide de course (elle ne forme aucun aspect avant de quitter son signe). Lilly dit « il ne sortira rien de l’affaire », à moins que les autres témoignages ne soient très forts.",
  "viaCombusta": "La Lune est dans la via combusta (15° Balance à 15° Scorpion) : l’affaire est pleine de désordre et d’instabilité.",
  "saturn1": "Saturne est en maison I : le consultant est anxieux ou abattu, et l’affaire avance lentement.",
  "saturn7": "Saturne est en maison VII : avertissement traditionnel que le jugement de l’astrologue risque d’errer ; lire avec prudence.",
  "sig": "Consultant : {a} (maître de l’Ascendant) et la Lune. Chose demandée : {b} (maître de la maison {h} : {topics}).",
  "sameLord": "Une seule planète ({p}) gouverne les deux maisons : l’affaire est entre les mains du consultant, et le lien est déjà établi.",
  "perf": "Les significateurs ({a} et {b}) parfont leur aspect ({asp}) le {date} (dans {days} jours environ).",
  "refranation": "Mais l’un d’eux stationne et rebrousse chemin avant la perfection (réfrénation) : doute et recul ; l’affaire reste inachevée ou l’une des parties le regrette.",
  "perfNote": {
   "0": "Une conjonction corporelle : le témoignage le plus fort que l’affaire se fera.",
   "60": "Avec facilité et bonne volonté.",
   "90": "Elle se fait, mais avec peine et retard.",
   "120": "Aisément et à la satisfaction de tous.",
   "180": "Elle peut se faire, mais dans la discorde et le regret."
  },
  "afterSign": "La perfection survient après qu’un significateur a changé de signe : l’affaire se fait moyennant un changement de circonstances ou de méthode.",
  "far": "La perfection est lointaine dans le temps.",
  "prohibit": "Prohibition : {c} et {x} se conjoignent avant la perfection, et ce tiers s’interpose entre les significateurs ; une troisième personne ou un facteur extérieur intervient.",
  "prohibitMal": "Prohibition : {c} et {x} se conjoignent avant la perfection ; un maléfique barre la route, obstacle sérieux.",
  "noPerf": "Aucun aspect ne se parfait entre les significateurs ({a} et {b}) au cours de l’année qui vient.",
  "translation": "Translation de lumière : {x} se sépare d’un significateur ({from}) et s’applique à l’autre ({to}) ; un intermédiaire (significateur : {x}) mène l’affaire à son terme.",
  "collection": "Collection de lumière : les deux significateurs s’appliquent à une planète plus lourde, {c} ; une personne d’autorité ou une institution tierce les réunit.",
  "mutualRec": "Réception mutuelle : {a} et {b} se trouvent chacun dans la dignité de l’autre ; les deux parties se désirent, et l’affaire peut se conclure même sans aspect.",
  "recByB": "La chose demandée ({b}) reçoit le consultant : l’autre partie, ou la chose recherchée, lui est favorablement disposée.",
  "recByA": "Le consultant reçoit la chose demandée : il a la maîtrise de l’affaire et la désire.",
  "bIn1": "{b}, significateur de la chose demandée, est à l’Ascendant : ce qui est recherché vient de soi-même au consultant.",
  "aInQ": "{a}, significateur du consultant, est dans la maison de l’affaire : le consultant y est fermement résolu.",
  "moonNext": "Prochain aspect de la Lune : {asp} ({p}), dans {hours} heures environ.",
  "moonToB": "La Lune s’applique au significateur de la chose demandée : témoignage que l’affaire se fera.",
  "moonToBen": "La Lune s’applique à un bénéfique : une bonne fin.",
  "moonToMal": "La Lune s’applique à un maléfique par aspect dur : obstacle ou déception à la fin.",
  "bWeak": "{b} (la chose elle-même) est en état de grave affliction (score {s}) : elle vaut moins qu’espéré, ou elle est endommagée.",
  "bStrong": "{b} (la chose elle-même) est en bonne condition : ce que vous désirez a de la valeur et de la durée.",
  "bCombust": "{b} est combuste (sous la brûlure du Soleil) : l’affaire est cachée, impuissante ou entourée de crainte.",
  "aCombust": "{a} (significateur du consultant) est combuste : le consultant est inquiet, secret ou sous pression.",
  "lostFound": "Le maître de la maison II ou la Lune est angulaire : l’objet perdu sera retrouvé (règle de Lilly).",
  "lostHard": "Ni le maître de la maison II ni la Lune ne sont angulaires : il sera plus difficile à retrouver.",
  "lostDir": "Direction probable : {dir} (signe : {sign}) ; {place}",
  "lostPlace": {
   "fire": "près d’une source de chaleur, d’un feu ou d’un mur.",
   "earth": "près du sol, à même le plancher ou dans un endroit pierreux.",
   "air": "en hauteur, près d’une fenêtre ou sur une étagère.",
   "water": "près de l’eau, dans une cuisine ou dans un endroit humide."
  },
  "lostHidden": "Le significateur de l’objet est sous l’horizon : l’objet est probablement à l’intérieur, recouvert ou enfermé.",
  "healthNote": "Ce jugement est symbolique ; pour toute décision de traitement, consultez un médecin.",
  "profit": "Le profit (maître de la maison II : {p}) est {word} et se trouve en maison {h}.",
  "timing": "Selon la mesure symbolique du temps de Lilly ({n} degrés jusqu’à la perfection ; signe {mode}, maison {kind}) : environ {n} {unit}.",
  "verdict": {
   "yes": "Oui : les témoignages s’accordent pour dire que l’affaire se fera.",
   "likely": "Probablement oui, sous conditions et au prix d’efforts.",
   "unclear": "Incertain : les témoignages s’équilibrent. Mieux vaut attendre et reposer la question plus tard.",
   "unlikely": "Peu probable : les obstacles l’emportent sur les appuis.",
   "no": "Non : le ciel ne soutient pas cette affaire."
  }
 },
 "mun": {
  "ingressTitle": "L’instant de l’ingrès",
  "ingress": "Le Soleil atteint l’équinoxe de printemps (0° Bélier) le {date}. Dans cette ville, l’Ascendant de l’ingrès se trouve à {asc}.",
  "lordTitle": "Le maître de l’année",
  "lord": "Maître de l’année : {p} ({why}). Cette planète occupe la maison {h} ({mundane}) et se trouve {word}.",
  "lordWhyAsc": "maître de l’Ascendant de l’ingrès",
  "lordWhyAlm": "almuten du degré de l’Ascendant",
  "lordTone": {
   "good": "Une année où « {good} » se manifeste davantage dans la société.",
   "mixed": "Le bien et le mal de l’année se mêlent.",
   "hard": "Le maître de l’année est faible : « {bad} », et faiblesse dans le gouvernement et l’ordre public."
  },
  "seasonsTitle": "Les saisons",
  "movable": "L’Ascendant de l’ingrès est cardinal ; selon la règle d’Abu Ma’shar, ce thème ne gouverne que les trois premiers mois, et chaque saison a son propre thème.",
  "quarter": {
   "jun": "Été (ingrès en Cancer)",
   "sep": "Automne (ingrès en Balance)",
   "dec": "Hiver (ingrès en Capricorne)"
  },
  "quarterAsc": "Ascendant en {sign}, maître : {p} ({word})",
  "halfTitle": "La seconde moitié de l’année",
  "common": "L’Ascendant est mutable ; ce thème gouverne six mois, et l’ingrès en Balance ({date}, Ascendant en {sign}) décide de la seconde moitié.",
  "fixedTitle": "Durée",
  "fixed": "L’Ascendant est fixe ; selon la règle d’Abu Ma’shar, ce thème gouverne l’année entière.",
  "moonTitle": "La Lune, significatrice du peuple",
  "moon": "La Lune à {pos}, maison {h}, {word}.",
  "moonNext": "Sa première application se fait par {asp} ({p}) :",
  "moonTone": {
   "good": "le peuple vit l’année avec soulagement et espoir.",
   "hard": "difficultés et pression sur le peuple, surtout par {mundane}.",
   "mixed": "le peuple s’en tire de façon moyenne."
  },
  "sec": {
   "year": "Ingrès de {year} (Norouz {py})",
   "houses": "Maisons saillantes de l’ingrès",
   "ecl": "Éclipses de l’année (Ptolémée, livre II)",
   "conj": "Conjonctions (Abu Ma’shar)",
   "motion": "Chronologie des mouvements planétaires de l’année"
  },
  "houseLord": "maître : {p} ({word}).",
  "houseBen": "{p} s’y trouve : ouverture et abondance.",
  "houseMars": "Mars s’y trouve : tension, conflit ou incendie.",
  "houseSaturn": "Saturne s’y trouve : lenteur, pénurie ou pression durable.",
  "houseOther": "Se trouve ici : {p}.",
  "ecl": {
   "solar": "Éclipse de Soleil",
   "lunar": "Éclipse de Lune"
  },
  "eclKind": {
   "penumbral": "pénombrale",
   "partial": "partielle",
   "total": "totale",
   "annular": "annulaire",
   "hybrid": "hybride"
  },
  "eclText": "Le {date}, à {pos}. Éclipse dans {meaning}",
  "eclMax": "Maximum de l’éclipse à la latitude {lat}° et à la longitude {lng}°.",
  "noEcl": "Aucune éclipse ne tombe dans cette année.",
  "gcLastTitle": "La dernière grande conjonction (Saturne et Jupiter)",
  "gcLast": "Le {date}, à {pos}. {meaning} Selon Abu Ma’shar, la conjonction de Saturne et de Jupiter, tous les vingt ans, fixe le caractère de la période jusqu’à la suivante.",
  "gcNextTitle": "La prochaine grande conjonction",
  "gcNext": "Le {date}, à {pos} (triplicité : {el}).",
  "gcChainTitle": "Chaîne des conjonctions récentes",
  "triple": "triple",
  "gcChain": "Environ tous les deux siècles, les conjonctions passent dans une nouvelle triplicité (une « mutation »), qu’Abu Ma’shar lit comme un grand changement de dynasties et de croyances.",
  "msTitle": "Conjonction de Mars et de Saturne",
  "ms": "Le {date}, à {pos}. Dans la tradition d’Abu Ma’shar, cette conjonction (surtout en Cancer) annonce tension, sédition et épreuves ; son champ est indiqué par le signe {sign} ({el}).",
  "mjTitle": "Conjonction de Mars et de Jupiter",
  "mj": "Le {date}, à {pos} : agitation dans la loi, la religion et le gouvernement ; précipitation dans les grandes décisions.",
  "station": {
   "retro": "{p} devient rétrograde",
   "direct": "{p} reprend sa marche directe"
  },
  "retroNote": {
   "mercury": "Mercure rétrograde : prudence avec les contrats, l’achat de matériel et les lancements.",
   "venus": "Vénus rétrograde : les relations et les valeurs sont réexaminées.",
   "mars": "Mars rétrograde : d’anciens conflits refont surface."
  },
  "ingressP": "{p} entre en {sign}",
  "ingressMeaning": {
   "jupiter": "Ouverture et prospérité dans le domaine du signe {sign} ({el}).",
   "saturn": "Rigueur et reconstruction dans le domaine du signe {sign}."
  }
 },
 "eclipse": {
  "fire": "un signe de feu : ses effets tombent sur l’Orient et sur les puissants ; fièvres, sécheresse, incendies et conflits.",
  "earth": "un signe de terre : effets sur l’agriculture, la terre, l’économie et les biens ; cherté ou pénurie des marchandises.",
  "air": "un signe d’air : effets sur les idées, la loi, le commerce et la communication ; vents violents et épidémies propagées par l’air.",
  "water": "un signe d’eau : effets sur la mer, les inondations, la pêche et la condition du peuple."
 },
 "gconj": {
  "fire": "Triplicité de feu : dans la tradition d’Abu Ma’shar, l’essor des royaumes, des religions et des prophètes ; zèle, guerre et fondations.",
  "earth": "Triplicité de terre (environ de 1842 à 2020) : l’ère de l’industrie, de la richesse matérielle, de la terre et du capital.",
  "air": "Triplicité d’air (depuis la conjonction de décembre 2020 en Verseau) : l’ère des idées, de la technologie, de la communication et des réseaux ; changements dans le droit et la structure sociale.",
  "water": "Triplicité d’eau : l’ère du sentiment, de la foi, des migrations et des transformations cachées."
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
   "synthesis": "La synthèse du maître",
   "hellenistic": "Profondeurs hellénistiques et perso-arabes",
   "patterns": "Figures cachées et géométrie",
   "jyotish": "Jyotish indien (Parashara)",
   "bazi": "Quatre Piliers chinois (Zi Ping)",
   "cycles": "Progressions, retours et calendrier maya"
  },
  "note": {
   "synthesis": "Les anciens maîtres ne jugeaient jamais sur un seul facteur. Ici, chacun des systèmes ci-dessous a été calculé indépendamment ; lorsque les méthodes grecques, perses, indiennes et chinoises désignent la même planète, la même maison ou la même période, le témoignage est fort.",
   "hellenistic": "La secte, la domination, l’assiègement, la lunaison prénatale, l’almuten, la chaîne des dispositeurs et la libération zodiacale : les techniques de Valens, Paulus, Rhétorius, Abu Ma’shar et Ibn Ezra.",
   "patterns": "Les configurations, la forme du thème, la déclinaison, les antiscies, les mi-points et les harmoniques révèlent des liens qui échappent aux aspects ordinaires.",
   "jyotish": "Le zodiaque sidéral (Lahiri), les demeures lunaires, la Vimshottari dasha, le navamsa et les yogas du Brihat Parashara Hora Shastra et de Varahamihira.",
   "bazi": "Les Quatre Piliers du destin en temps solaire local, le maître du jour, les dix dieux et les interactions des branches selon le Yuan Hai Zi Ping.",
   "cycles": "Les progressions secondaires et la lunaison progressée (Rudhyar), les retours planétaires et le compte sacré des jours maya."
  },
  "why": {
   "ascRuler": "maître de l’Ascendant (Ptolémée)",
   "almuten": "almuten du thème (Ibn Ezra)",
   "geniture": "la plus forte selon le barème de dignités de Lilly",
   "final": "dispositeur final : toutes les chaînes de maîtrise y aboutissent",
   "conjAngle": "en conjonction avec un angle ({angle})",
   "angular": "angulaire",
   "stellium": "maître du stellium en {sign}",
   "tApex": "sommet d’un carré en T",
   "yodApex": "sommet d’un Yod (doigt du destin)",
   "mostAspected": "la planète la plus aspectée",
   "oob": "hors limites en déclinaison",
   "lagnaLord": "maître du Lagna sidéral (Parashara)",
   "nakLord": "maître du nakshatra de la Lune",
   "dmPlanet": "planète de l’élément du maître du jour chinois ({element})",
   "baziStrong": "planète de l’élément chinois le plus fort ({element})",
   "syzygyLord": "maître de la lunaison prénatale",
   "hourLord": "maître de l’heure planétaire de la naissance",
   "dayLord": "maître du jour de la naissance"
  },
  "syn": {
   "keyTitle": "L’axe caché",
   "keyTitle2": "Seconde clé",
   "key": "{planet} : {n} désignations par des systèmes indépendants — {reasons}. Lorsque les méthodes grecques, perses, indiennes et chinoises convergent sur une même planète, les maîtres y voyaient la planète de l’œuvre de l’âme : {sig}.",
   "how": {
    "good": "Sa condition est forte : {planet} porte son mandat avec aisance et autorité.",
    "mixed": "Sa condition est moyenne : {planet} porte son mandat à force d’efforts, par étapes.",
    "hard": "Sa condition est difficile : {planet} porte son mandat à travers les crises ; le don est réel mais arrive par l’épreuve, souvent tard."
   },
   "keyNone": "Aucune planète ne domine : le thème est démocratique, sa puissance répartie entre plusieurs centres. De tels êtres se développent dans bien des directions et résistent à toute définition.",
   "arenaTitle": "Arène de la vie : maison {house}",
   "arena": "La maison {house} ({topics}) est le lieu où le thème concentre sa force : {reasons}.",
   "timingTitle": "La convergence du présent",
   "timing": "En cours : {list}. {planet} figure dans {n} de ces {total} systèmes de maîtres du temps ; les traditions s’accordent : c’est la saison où {planet} donne le ton : {season}",
   "timing2": "Seconde voix, {planet} : {season}",
   "timingNone": "Les maîtres du temps actuels ({list}) diffèrent tous : une période de transition, à plusieurs voix, sans thème dominant.",
   "flagsTitle": "Signaux du moment",
   "hiddenTitle": "Pont secret : {a} et {b}",
   "hidden": "{a} et {b} ne forment aucun aspect classique, et pourtant un lien les unit : {via}. Ce qui semble séparé dans la vie est relié en profondeur : « {x} » et « {y} » agissent l’un sur l’autre en secret.",
   "crossTitle": "Où les traditions s’accordent et divergent"
  },
  "arena": {
   "planets": "{n} planète(s) y résident",
   "ascRuler": "le maître de l’Ascendant, {planet}, s’y trouve",
   "fortune": "la Part de Fortune y tombe",
   "spirit": "la Part de l’Esprit y tombe",
   "almuten": "l’almuten du thème s’y trouve",
   "node": "le Nœud Nord s’y trouve",
   "benefic": "le bénéfique de la secte, {planet}, s’y trouve",
   "malefic": "le maléfique contraire à la secte, {planet}, s’y trouve"
  },
  "lords": {
   "profection": "maître de l’année de profection",
   "firdar": "firdaria",
   "firdarSub": "sous-période de firdaria",
   "dasha": "mahadasha Vimshottari",
   "antardasha": "antardasha",
   "zr1": "libération zodiacale depuis l’Esprit (L1)",
   "zr2": "libération zodiacale (L2)",
   "luck": "pilier de chance (Bazi)",
   "sr": "maître de l’Ascendant de la révolution solaire",
   "progMoon": "maître de la Lune progressée"
  },
  "season": {
   "sun": "l’entrée dans la visibilité, l’autorité et l’affirmation de soi ; la reconnaissance, et la question de ce que l’on défend vraiment.",
   "moon": "le changement, le mouvement, la famille et le corps ; les sentiments remontent à la surface et la vie se réorganise autour des besoins.",
   "mercury": "l’étude, l’écriture, la négociation et le commerce ; l’esprit est l’instrument, et les décisions se multiplient.",
   "venus": "l’amour, le plaisir, l’art et la réconciliation ; les relations et les valeurs occupent le devant de la scène.",
   "mars": "l’action, la compétition et le courage ; des conflits qui forcent les décisions, et un risque de précipitation.",
   "jupiter": "l’expansion, les maîtres, la foi et les occasions ; les portes s’ouvrent, et le danger est l’excès.",
   "saturn": "la construction sous pression, la responsabilité et la maturation ; ce qui est faux tombe et ce qui est vrai est fait pour durer.",
   "node": "la faim du nouveau et de l’étranger, l’ambition et l’obsession ; quelque chose grandit au-delà de ce qui était prévu.",
   "snode": "le lâcher-prise, la perte et la maîtrise intérieure ; renoncer à ce qui fut, se tourner vers l’esprit."
  },
  "flag": {
   "zrPeak": "La libération zodiacale vous place dans une période culminante (angulaire à la Part de Fortune) : la carrière et la vie publique passent au premier plan.",
   "lb": "Un « relâchement du lien » est actif : le signal de Valens d’un tournant soudain dans la vocation et l’orientation.",
   "sadeSati": "La Sade Sati est en cours ({phase}) : Saturne traverse le signe sidéral de la Lune ou ses voisins, les sept ans et demi de maturation émotionnelle de la tradition indienne.",
   "return": "{what} le {date} : un tournant structurel de la vie."
  },
  "sadeSati": {
   "rising": "phase montante, Saturne en 12e à partir de la Lune",
   "peak": "apogée, Saturne sur la Lune natale",
   "setting": "phase descendante, Saturne en 2e à partir de la Lune"
  },
  "via": {
   "antiscia": "les antiscies (points miroirs par rapport aux solstices, Firmicus)",
   "contra": "les contre-antiscies (points miroirs par rapport aux équinoxes)",
   "parallel": "un parallèle de déclinaison",
   "contraparallel": "un contre-parallèle de déclinaison",
   "h5": "un aspect de type quintile (5e harmonique)",
   "h7": "un aspect de type septile (7e harmonique)",
   "h9": "un aspect de type novile (9e harmonique)",
   "midpoint": "une image de mi-point (troisième terme : {other})"
  },
  "cross": {
   "sunSame": "Soleil tropical et Soleil sidéral tous deux en {t} : le zodiaque des saisons et celui des étoiles s’accordent, et la nature solaire est sans ambiguïté.",
   "sunDiff": "Soleil tropical en {t}, Soleil sidéral en {s} : la personnalité visible et saisonnière ({t}) repose sur une couche plus profonde ({s}) que la tradition indienne nomme karma, et qui se révèle avec l’âge.",
   "asc": "Ascendant occidental : {asc} ; Lagna sidéral : {lagna}.",
   "ascSame": "Les deux systèmes donnent le même maître ({ar}) : le corps et le chemin parlent d’une seule voix.",
   "ascDiff": "Les maîtres diffèrent ({ar} en Occident, {ll} en Inde) : deux programmes habitent une même personne, et la maturité consiste à intégrer {ar} et {ll}.",
   "tempSame": "Tempérament grec : {temp}. Cinq phases chinoises : phase la plus forte, {wx}. Les deux systèmes diagnostiquent indépendamment le même excès ; tous deux prescrivent {remedy} comme remède : {remedyText}",
   "tempDiff": "Tempérament grec : {temp}. Cinq phases chinoises : phase la plus forte, {wx}. Les systèmes divergent, ce qui est en soi une information : le tempérament de surface et la constitution profonde tirent dans des directions différentes, et ces personnes se sentent souvent mal comprises.",
   "moon": "La Lune se trouve dans le nakshatra indien {nak} et dans la demeure lunaire arabe {man} ; lisez-les ensemble pour saisir le cœur émotionnel."
  },
  "remedy": {
   "water": "le calme, la profondeur, le repos, la réflexion",
   "metal": "la discipline, l’élagage, des limites claires",
   "fire": "la chaleur, la passion, la visibilité",
   "earth": "la structure, la routine, l’ancrage",
   "wood": "la croissance, le mouvement, les nouveaux départs"
  },
  "hel": {
   "sectTitle": "La secte : l’allié et l’adversaire",
   "sect": "Le bénéfique de la secte, {ben}, est en maison {bh} : la source de bien la plus sûre ({bt}). Le maléfique contraire à la secte, {mal}, est en maison {mh} : là se concentrent les épreuves les plus aiguës de la vie ({mt}).",
   "malStrong": "Comme {mal} est en dignité, ses épreuves aboutissent à la maîtrise.",
   "malWeak": "Comme {mal} est en outre en faiblesse, c’est le point le plus sensible du thème ; la conscience le fait passer du destin au choix.",
   "overTitle": "Domination : {a} au-dessus, {b} en dessous",
   "over": "Carré supérieur (10e signe) entre {a}, en haut, et {b}, en bas : {a} impose son programme, et {b} doit s’y plier.",
   "overMalContrary": "{b} subit la pression du maléfique contraire à la secte : la pression des circonstances ou de l’autorité a façonné très tôt « {y} ».",
   "overMal": "{b} se trouve sous un maléfique : discipline et épreuves façonnent « {y} », mais, appartenant à la secte du thème, il est plus éducateur qu’ennemi.",
   "overBen": "{b} se trouve sous un bénéfique : protection et patronage veillent sur « {y} ».",
   "besiegedTitle": {
    "malefic": "Assiègement : {p}",
    "benefic": "Encadrement bénéfique : {p}"
   },
   "besieged": {
    "malefic": "Mars et Saturne assiègent {p} : enserrée, la planète doit agir sous la contrainte ; « {x} » grandit dans l’état de siège.",
    "benefic": "Vénus et Jupiter encadrent {p} : la planète est protégée et soutenue ; « {x} » est sous bonne garde."
   },
   "syzTitle": "La lunaison prénatale",
   "syz": "La {kind} précédant la naissance eut lieu le {date} à {pos} ; son maître, {lord}, occupe la maison {h}. Ptolémée et Bonatti y voient la semence de la vie ; son maître montre ce que l’âme est venue résoudre : {topics}.",
   "almutenTitle": "Almuten du thème",
   "almuten": "Par les points des cinq lieux hylégiaux (Ibn Ezra, al-Qabisi), {p} gouverne le thème avec {pts} points.",
   "almutenSame": "C’est aussi le maître de l’Ascendant : le thème parle d’une seule voix.",
   "almutenDiff": "Cette planète diffère du maître de l’Ascendant ({ar}) : la personne (l’Ascendant) et le maître de l’âme (l’almuten) ont des programmes différents ; « {x} » agit derrière « {y} ».",
   "dispTitle": "La chaîne de maîtrise",
   "dispSole": "Toutes les chaînes de maîtrise aboutissent à une même planète, {p}, dans son propre signe : {p} est le roi de ce thème, l’autorité ultime derrière chaque décision.",
   "dispMany": "Plusieurs planètes se gouvernent elles-mêmes ({list}) : des centres de pouvoir indépendants qui s’obéissent rarement entre eux.",
   "dispLoop": "Il n’y a pas de dispositeur final : l’autorité circule.",
   "mutual": "{a} et {b} sont en réception mutuelle : une boucle fermée de soutien entre {ta} et {tb}.",
   "loop": "Un anneau de maîtrise : {loop}. Le pouvoir circule en cercle ; cette personne tire sa force des liens entre les parts de sa vie plutôt que d’un centre unique.",
   "chains": "Chaînes : {chains}.",
   "zrTitle": "Libération zodiacale depuis l’Esprit (Valens) : le récit de la vocation",
   "zr": "Chapitre en cours (L1) : {s1} (maître : {l1}), du {f1} au {t1}. Sous-chapitre en cours (L2) : {s2} (maître : {l2}), jusqu’au {t2}.",
   "zrPeak": {
    "major": "Ce chapitre est un sommet majeur (10e à partir de la Fortune) : le faîte de la visibilité et de l’accomplissement.",
    "minor": "Ce chapitre est angulaire à la Fortune : une période active et riche en événements."
   },
   "zrPeak2": "Le sous-chapitre est lui-même un sommet : un point culminant au sein du chapitre.",
   "zrNext2": "Prochain sous-chapitre culminant : {s}, à partir du {d}.",
   "zrNext": "Prochain chapitre de sommet majeur : {s}, à partir du {d}.",
   "zrfTitle": "Libération zodiacale depuis la Fortune : le corps et les circonstances",
   "zrf": "Chapitre en cours : {s} (maître : {l}) jusqu’au {to} ; sous-chapitre {s2} jusqu’au {t2}.",
   "lot": "À {pos}, maison {h} ({topics}) ; son maître, {lord}, est {str}.",
   "mansionTitle": "Demeure lunaire (al-Biruni, Picatrix)",
   "mansion": "La Lune est dans la demeure {n}, {name} : {meaning}",
   "hourTitle": "Jour et heure de naissance",
   "hour": "Naissance un {day} (maître du jour : {dr} ; maître de l’heure : {hr}). Al-Biruni note que le maître de l’heure colore la manière d’être du natif : « {x} ».",
   "srTitle": "Révolution solaire (tahwil al-sinin) de cette année",
   "sr": "Le Soleil est revenu à sa place natale le {date}. Ascendant de la révolution : {asc} ; son maître, {lord}, occupe la maison natale {h} ({topics}). Planètes angulaires dans la révolution : {ang}. La Lune de révolution en maison {moonH} colore la tonalité affective de l’année ({moonT})."
  },
  "syz": {
   "new": "nouvelle lune",
   "full": "pleine lune"
  },
  "none": "aucune",
  "pat": {
   "shapeTitle": "Forme du thème : {shape}",
   "handle": "L’anse : {p} ; tout s’écoule par elle, et « {x} » est le débouché de la vie entière.",
   "hemiTitle": "Hémisphères",
   "hemi": "{above} planètes au-dessus de l’horizon et {below} au-dessous ; {east} dans la moitié orientale et {west} dans la moitié occidentale.",
   "hemiAbove": "Une vie vécue sous le regard public, tournée vers l’accomplissement extérieur.",
   "hemiBelow": "Une vie intérieure et privée, qui bâtit ses fondations avant de se montrer.",
   "hemiBalanced": "La vie intérieure et la vie extérieure s’équilibrent.",
   "hemiEast": "L’accent oriental rend la personne autonome : elle façonne ses circonstances.",
   "hemiWest": "L’accent occidental signifie que le destin arrive par autrui : les relations dessinent le chemin.",
   "hemiEW": "Soi et autrui pèsent d’un poids égal.",
   "unaspTitle": "{p} sans aspect",
   "unasp": "{p} ne forme aucun aspect classique : la planète agit en dehors du système, tout ou rien ; « {x} » peut ne se manifester que dans certains contextes, comme un talent soudain ou un angle mort.",
   "oobTitle": "{p} hors limites",
   "oob": "{p} a une déclinaison de {dec}°, au-delà de la limite solaire de {obl}° : la planète sort de la voie habituelle ; « {x} » prend une tournure non conventionnelle, extrême, affranchie des règles.",
   "parTitle": "Parallèles de déclinaison",
   "parallel": "{a} et {b} : parallèle (orbe {orb}°).",
   "contraparallel": "{a} et {b} : contre-parallèle (orbe {orb}°).",
   "parNote": "Les parallèles agissent comme des conjonctions, les contre-parallèles comme des oppositions, dans une dimension que le thème ordinaire ne montre pas.",
   "antTitle": "Antiscies (points miroirs)",
   "antiscia": "{a} et {b} : antiscie (orbe {orb}°).",
   "contra": "{a} et {b} : contre-antiscie (orbe {orb}°).",
   "antNote": "Firmicus et Lilly tiennent les antiscies pour des conjonctions cachées : les affaires liées agissent de concert, à l’abri des regards.",
   "mid": "Image planétaire (Ebertin, école de Hambourg), orbe {orb}° : le mélange de « {x} » et de « {y} » se concentre et s’exprime à travers « {z} »."
  },
  "short": {
   "asc": "le soi et le corps",
   "mc": "le but et la carrière"
  },
  "harm": {
   "5": {
    "name": "Réseau de quintiles (5e harmonique)",
    "text": "Des quintiles, l’aspect de la création selon Kepler, relient {planets} : signature d’un style personnel, d’un savoir-faire et d’une volonté de façonner. Addey voyait dans la cinquième harmonique la manière dont une personne construit et fabrique."
   },
   "7": {
    "name": "Réseau de septiles (7e harmonique)",
    "text": "Des septiles relient {planets} : inspiration, attirances fatales et ce qui emporte une personne au-delà de la raison. La septième harmonique montre ce qui enchante."
   },
   "9": {
    "name": "Réseau de noviles (9e harmonique)",
    "text": "Des noviles relient {planets} : joie, maturité spirituelle et idéal d’union. La neuvième harmonique est le navamsa indien vu par des yeux occidentaux."
   }
  },
  "ved": {
   "siderealTitle": "Le thème sidéral",
   "sidereal": "Avec l’ayanamsa de Lahiri ({ay}°) : Lagna {lagna}, Lune {moon}, Soleil {sun}. Le maître du Lagna, {ll}, occupe le bhava {h}.",
   "nakTitle": "Nakshatra de la Lune",
   "nak": "La Lune est dans {nak}, pada {pada} (maître : {lord}) : {meaning} Le Lagna est dans {lnak}.",
   "dashaTitle": "Vimshottari dasha",
   "dasha": "Mahadasha : {md}, du {f} au {to} ; antardasha : {ad}, jusqu’au {adto}. {md} occupe le bhava {h} ({topics}) et se trouve {dig}. La période apporte {season}",
   "next": "Prochaine mahadasha : {md}, à partir du {d}.",
   "exalted": "en exaltation",
   "debil": "en débilitation",
   "own": "dans son propre signe",
   "neutral": "dans un signe neutre",
   "navTitle": "Navamsa (D9)",
   "varg": "Vargottama (même signe dans le rasi et le navamsa) : {list}. Ces planètes sont doublement fiables ; ce qu’elles promettent est tenu.",
   "noVarg": "Aucune planète n’est vargottama.",
   "nav": "Navamsa de la Lune : {moon} ; de Vénus (le conjoint dans le navamsa) : {venus} ; de Jupiter (dharma et maîtres) : {jup}.",
   "nodesTitle": "L’axe de Rahu et Ketu",
   "nodes": "Rahu dans le bhava {h1} : faim et obsession touchant {t1}. Ketu dans le bhava {h2} : maîtrise passée et détachement touchant {t2}.",
   "sadeTitle": "Sade Sati",
   "manglikTitle": "Kuja dosha (position de Mars)",
   "manglik": "Mars est dans le bhava {h} à partir du Lagna, position que la tradition indienne nomme Kuja (Mangal) dosha : la chaleur martienne dans le domaine de l’union. Les textes traditionnels énumèrent de nombreuses annulations ; lisez-y l’appel à un partenaire de force égale, non une malédiction."
  },
  "bazi": {
   "pillarsTitle": "Les Quatre Piliers",
   "pillars": "Année {y}, mois {m}, jour {d}, heure {h} (temps solaire local). Animal de l’année : {animal}.",
   "dmTitle": "Maître du jour : {dm}",
   "strong": "Le maître du jour est fort ({pct} % du thème le soutient).",
   "weak": "Le maître du jour est faible ({pct} % du thème le soutient).",
   "fav": "Éléments utiles : {fav} ; dans l’ancienne dénomination chinoise des planètes, ce sont {planets}.",
   "elTitle": "Équilibre des cinq phases",
   "el": "Phase la plus forte : {strong} ; la plus faible : {weak}.",
   "godsTitle": "Les dix dieux",
   "spouse": "Le palais du conjoint (branche du jour) contient {g} : le schéma intérieur de l’union intime.",
   "pillar": {
    "year": "Année",
    "month": "Mois",
    "day": "Jour",
    "hour": "Heure"
   },
   "pmean": {
    "year": "l’ascendance, la société et la petite enfance",
    "month": "les parents, la carrière et la jeunesse",
    "day": "le soi et le conjoint",
    "hour": "les enfants, la vieillesse et l’héritage"
   },
   "inter": {
    "clash": {
     "name": "Choc des branches",
     "text": "Le pilier {p1} et le pilier {p2} s’entrechoquent : conflit et mouvement entre {m1} et {m2}."
    },
    "harmony": {
     "name": "Six harmonies",
     "text": "Le pilier {p1} et le pilier {p2} se combinent en {el} : un lien et un soutien secret entre {m1} et {m2}."
    },
    "trine": {
     "name": "Cadre des trois harmonies",
     "text": "Un cadre complet des trois harmonies, élément {el} : une alliance puissante qui renforce l’élément {el} dans tout le thème."
    },
    "halftrine": {
     "name": "Demi-trois harmonies",
     "text": "Un demi-cadre, élément {el} : une alliance partielle qui fait pencher le thème vers l’élément {el}."
    },
    "stemcomb": {
     "name": "Combinaison des troncs",
     "text": "Les troncs du pilier {p1} et du pilier {p2} se combinent (en {el}) : attirance et lien entre {m1} et {m2}."
    }
   },
   "luckTitle": "Pilier de chance décennal en cours",
   "luck": "{p} ({el}), de {from} à {to} ans ; les piliers de chance ont commencé à {start} ans.",
   "luckGood": "Son élément fait partie des éléments utiles : une décennie porteuse.",
   "luckHard": "Son élément ne fait pas partie des éléments utiles : une décennie qui demande davantage d’efforts.",
   "luckNeedSex": "Choisissez un sexe dans « Plus de réglages » pour calculer les piliers de chance ; leur sens en dépend.",
   "bridgeTitle": "Pont entre la Chine et l’Occident",
   "bridge": "En chinois classique, les planètes portent le nom des cinq phases. Votre maître du jour est {dmEl}, la phase associée à {dmP} ; dans le thème occidental, {dmP} est {cond}. Lisez les deux ensemble : le moi chinois et sa planète occidentale racontent une même histoire."
  },
  "prog": {
   "title": "Progressions secondaires",
   "text": "Soleil progressé {sun} ; Lune progressée {moon}, traversant la maison natale {h} : le climat affectif de ces deux ans et demi se concentre sur {topics}. Phase de la lunaison progressée : {phase}, {phaseText}",
   "newMoon": "La dernière nouvelle lune progressée a eu lieu à {age} ans : une graine fut alors semée, qui se déploie encore.",
   "sunChanged": "Le Soleil progressé est passé en {s} : le moi a changé de couleur depuis la naissance."
  },
  "ret": {
   "title": "Retours planétaires",
   "saturn1": "Premier retour de Saturne",
   "saturn2": "Second retour de Saturne",
   "uranusOpp": "Opposition d’Uranus (mi-vie)",
   "jupiterNext": "Prochain retour de Jupiter",
   "nodeNext": "Prochain retour nodal",
   "note": "Les retours sont des tournants structurels : ce qui a été bâti est mis à l’épreuve et le chapitre suivant est choisi."
  },
  "past": "(passé)",
  "maya": {
   "title": "Le Tzolk’in maya",
   "text": "Jour {n} {sign} du compte sacré de 260 jours (corrélation GMT) : {meaning}"
  }
 },
 "phase": {
  "0": {
   "name": "Nouvelle Lune",
   "text": "instinctive, émergente, projetant le moi dans un nouveau cycle."
  },
  "1": {
   "name": "Croissant",
   "text": "lutter pour se libérer du passé et affirmer le neuf."
  },
  "2": {
   "name": "Premier Quartier",
   "text": "crise dans l’action : bâtir, décider, déblayer le terrain."
  },
  "3": {
   "name": "Gibbeuse",
   "text": "perfectionner, analyser, affiner la vision."
  },
  "4": {
   "name": "Pleine Lune",
   "text": "accomplissement et illumination ; les relations révèlent le sens."
  },
  "5": {
   "name": "Disséminante",
   "text": "partager ce qui a été appris, enseigner, diffuser."
  },
  "6": {
   "name": "Dernier Quartier",
   "text": "crise de conscience : réorientation et abandon des formes anciennes."
  },
  "7": {
   "name": "Balsamique",
   "text": "libération, achèvement et semence de l’avenir ; un temps prophétique et intérieur."
  }
 },
 "shape": {
  "bundle": {
   "name": "Faisceau",
   "text": "Toutes les planètes dans un tiers du cercle : une vie concentrée et spécialisée, intensément focalisée sur peu de choses."
  },
  "bowl": {
   "name": "Coupe",
   "text": "Toutes les planètes dans une moitié : une personne porteuse d’une mission, qui ressent la moitié vide comme un espace à remplir."
  },
  "bucket": {
   "name": "Seau",
   "text": "Une coupe avec une seule planète « anse » : toute l’énergie de la vie se déverse par un seul point."
  },
  "locomotive": {
   "name": "Locomotive",
   "text": "Planètes réparties sur deux tiers avec un tiers vide : une énergie motrice et autopropulsée qui ne cesse d’avancer."
  },
  "seesaw": {
   "name": "Balançoire",
   "text": "Deux groupes opposés : une vie passée à peser les contraires, oscillant entre deux pôles jusqu’à leur réconciliation."
  },
  "splash": {
   "name": "Éparpillement",
   "text": "Planètes réparties régulièrement sur le cercle : intérêts vastes et grande faculté d’adaptation ; le danger est la dispersion."
  },
  "splay": {
   "name": "Éventail irrégulier",
   "text": "Groupements irréguliers : un caractère fortement individuel et indépendant, qui résiste à toute classification."
  }
 },
 "config": {
  "grandtrine": {
   "name": "Grand trigone",
   "text": "{planets} en grand trigone (élément : {el}) : un circuit fermé de talent ; des dons qui coulent si aisément qu’ils peuvent rester inemployés faute de défi."
  },
  "tsquare": {
   "name": "Carré en T",
   "text": "{planets} ; au sommet, {apex} ({mode}) : le moteur du thème. La tension chronique se décharge par ce sommet, {apex} (« {x} »). La branche vide, en {empty}, est le lieu de la détente et de la résolution."
  },
  "grandcross": {
   "name": "Grande croix",
   "text": "{planets} forment une grande croix ({mode}) : tirée dans quatre directions à la fois, cette personne développe une résilience extraordinaire."
  },
  "yod": {
   "name": "Yod (doigt du destin)",
   "text": "{planets} : deux planètes en sextile désignent par des quinconces le sommet, {apex}. Une vocation ou un ajustement inévitable, focalisé à travers « {x} »."
  },
  "kite": {
   "name": "Cerf-volant",
   "text": "{planets} forment un cerf-volant : le talent du grand trigone reçoit une direction et une cible ; le sommet qui les donne : {apex}."
  },
  "mystic": {
   "name": "Rectangle mystique",
   "text": "{planets} forment un rectangle mystique : deux oppositions harmonisées par des trigones et des sextiles ; une tension gérée avec sens pratique."
  },
  "stellium": {
   "name": "Stellium",
   "text": "{planets} se rassemblent en {sign} (maison {h}) : la vie investit une part disproportionnée de son énergie dans {topics}."
  }
 },
 "yoga": {
  "gajakesari": {
   "name": "Gaja Kesari yoga",
   "text": "Jupiter dans un kendra à partir de la Lune : l’éléphant et le lion ; sagesse, réputation et bienveillance durable."
  },
  "budhaditya": {
   "name": "Budha-Aditya yoga",
   "text": "Le Soleil et Mercure dans un même signe : intelligence, savoir-faire et réussite par l’intellect."
  },
  "ruchaka": {
   "name": "Ruchaka yoga (Mahapurusha)",
   "text": "{p} fort dans un kendra : courage, commandement et vigueur physique."
  },
  "bhadra": {
   "name": "Bhadra yoga (Mahapurusha)",
   "text": "{p} fort dans un kendra : éloquence, savoir et habileté commerciale."
  },
  "hamsa": {
   "name": "Hamsa yoga (Mahapurusha)",
   "text": "{p} fort dans un kendra : sagesse, vertu et respect des savants."
  },
  "malavya": {
   "name": "Malavya yoga (Mahapurusha)",
   "text": "{p} forte dans un kendra : beauté, raffinement, confort et dons artistiques."
  },
  "sasa": {
   "name": "Sasa yoga (Mahapurusha)",
   "text": "{p} fort dans un kendra : autorité sur les gens, endurance et pouvoir d’organisation."
  },
  "kemadruma": {
   "name": "Kemadruma yoga",
   "text": "Aucune planète en 2e ni en 12e à partir de la Lune : solitude affective et nécessité de compter sur soi."
  },
  "kemadrumaCancelled": {
   "name": "Kemadruma annulé",
   "text": "Kemadruma est présent mais annulé par des planètes en kendra : une solitude précoce qui se change en autonomie."
  },
  "chandramangala": {
   "name": "Chandra-Mangala yoga",
   "text": "La Lune avec Mars : l’élan affectif converti en capacité de gain et en esprit d’entreprise."
  },
  "raja": {
   "name": "Raja yoga",
   "text": "Les maîtres d’un kendra et d’un trikona ({a} et {b}) s’unissent : pouvoir et dharma se rejoignent ; élévation du statut."
  },
  "dhana": {
   "name": "Dhana yoga",
   "text": "Les maîtres de la richesse et de la fortune ({a} et {b}) s’unissent : capacité à accumuler des biens."
  },
  "viparita": {
   "name": "Viparita Raja yoga",
   "text": "Le maître de la maison {h} ({p}) occupe un dusthana : une réussite qui naît de l’adversité et des malheurs d’autrui."
  },
  "neechabhanga": {
   "name": "Neecha Bhanga",
   "text": "{p} est en débilitation, mais celle-ci est annulée : une faiblesse qui devient une force exceptionnelle."
  },
  "parivartana": {
   "name": "Parivartana (échange)",
   "text": "{a} et {b} échangent leurs signes : les deux domaines qu’ils gouvernent sont indissociablement liés."
  },
  "kalasarpa": {
   "name": "Configuration Kala Sarpa",
   "text": "Toutes les planètes se trouvent d’un même côté de l’axe Rahu–Ketu : une vie menée par l’axe nodal, aux intenses revirements de fortune (doctrine tardive, non classique)."
  }
 },
 "wx": {
  "wood": "Bois",
  "fire": "Feu",
  "earth": "Terre",
  "metal": "Métal",
  "water": "Eau"
 },
 "stem": {
  "0": "Bois Yang (Jia 甲)",
  "1": "Bois Yin (Yi 乙)",
  "2": "Feu Yang (Bing 丙)",
  "3": "Feu Yin (Ding 丁)",
  "4": "Terre Yang (Wu 戊)",
  "5": "Terre Yin (Ji 己)",
  "6": "Métal Yang (Geng 庚)",
  "7": "Métal Yin (Xin 辛)",
  "8": "Eau Yang (Ren 壬)",
  "9": "Eau Yin (Gui 癸)"
 },
 "animal": {
  "0": "Rat",
  "1": "Bœuf",
  "2": "Tigre",
  "3": "Lapin",
  "4": "Dragon",
  "5": "Serpent",
  "6": "Cheval",
  "7": "Chèvre",
  "8": "Singe",
  "9": "Coq",
  "10": "Chien",
  "11": "Cochon"
 },
 "dm": {
  "0": "Le Bois Jia est le grand arbre : droit, attaché à ses principes et lent à plier. Il croît régulièrement, a besoin d’espace et de lumière (le feu) pour s’épanouir, d’eau pour se nourrir et de métal pour être façonné.",
  "1": "Le Bois Yi est la liane et la fleur : souple, diplomate, il survit en contournant les obstacles ; une résilience déguisée en douceur.",
  "2": "Le Feu Bing est le Soleil : généreux, rayonnant et ouvert, il veut réchauffer tout le monde ; il peut s’épuiser et déteste être caché.",
  "3": "Le Feu Ding est la bougie et l’étoile : intime, perspicace, une lueur constante qui éclaire les détails ; loyal, mais il vacille au vent.",
  "4": "La Terre Wu est la montagne : stable, fiable et réservée ; lente à se mouvoir, inébranlable une fois établie.",
  "5": "La Terre Ji est le champ fertile : nourricière, accueillante et pratique ; elle cultive les autres et peut trop absorber.",
  "6": "Le Métal Geng est le minerai brut et l’épée : décidé, juste, direct et héroïque ; il a besoin du feu pour être forgé et devenir utile.",
  "7": "Le Métal Xin est le joyau : raffiné, sensible, il apprécie la beauté et la reconnaissance ; il a besoin d’eau pour briller et n’aime pas être rudoyé.",
  "8": "L’Eau Ren est l’océan et le grand fleuve : vaste, intelligente, agitée et stratège ; elle doit être canalisée par la terre.",
  "9": "L’Eau Gui est la pluie, la rosée et la brume : intuitive, imaginative et subtile, elle nourrit sans être vue."
 },
 "god": {
  "friend": {
   "name": "Compagnon (比肩)",
   "text": "les pairs, l’indépendance et l’autonomie ; la rivalité pour des ressources partagées."
  },
  "rob": {
   "name": "Voleur de richesse (劫财)",
   "text": "la rivalité, l’audace et le risque ; l’argent partagé ou perdu ; le charisme social."
  },
  "eating": {
   "name": "Dieu de la nourriture (食神)",
   "text": "le talent exprimé avec aisance : le plaisir, l’art, la table et une créativité douce."
  },
  "hurting": {
   "name": "Officier blessant (伤官)",
   "text": "le brio et la rébellion ; la critique de l’autorité, la performance et le génie non conformiste."
  },
  "iwealth": {
   "name": "Richesse indirecte (偏财)",
   "text": "les aubaines, les transactions et la générosité ; classiquement, le père."
  },
  "dwealth": {
   "name": "Richesse directe (正财)",
   "text": "le revenu régulier, l’assiduité et l’épargne ; classiquement, l’épouse dans un thème masculin."
  },
  "seven": {
   "name": "Sept Tueurs (七杀)",
   "text": "la pression, le danger et la volonté de conquête ; le commandement sous le feu."
  },
  "officer": {
   "name": "Officier direct (正官)",
   "text": "le statut, les règles, la réputation et la responsabilité ; classiquement, le mari dans un thème féminin."
  },
  "iresource": {
   "name": "Ressource indirecte (偏印)",
   "text": "le savoir inhabituel, la métaphysique, l’intuition et la solitude."
  },
  "dresource": {
   "name": "Ressource directe (正印)",
   "text": "la mère, l’éducation, la protection, les diplômes et la bonté."
  }
 },
 "nak": {
  "0": {
   "name": "Ashwini",
   "meaning": "les jumeaux Ashvin, guérisseurs divins : la rapidité, la guérison et les nouveaux départs."
  },
  "1": {
   "name": "Bharani",
   "meaning": "Yama : porter des fardeaux, les passages de la naissance et de la mort, la retenue et l’intensité."
  },
  "2": {
   "name": "Krittika",
   "meaning": "Agni, la flamme tranchante : trancher, purifier, un jugement acéré et un feu nourricier."
  },
  "3": {
   "name": "Rohini",
   "meaning": "Prajapati, le créateur : la croissance, la beauté, la fertilité, l’attirance et le désir."
  },
  "4": {
   "name": "Mrigashira",
   "meaning": "Soma, la tête de cerf : la recherche, la curiosité, la quête inquiète."
  },
  "5": {
   "name": "Ardra",
   "meaning": "Rudra, la tempête : une destruction qui ouvre la voie, une émotion intense, la recherche."
  },
  "6": {
   "name": "Punarvasu",
   "meaning": "Aditi : le retour et le renouveau, la lumière retrouvée après l’obscurité, la générosité."
  },
  "7": {
   "name": "Pushya",
   "meaning": "Brihaspati : la nourriture, la protection et le dharma ; la plus favorable des demeures."
  },
  "8": {
   "name": "Ashlesha",
   "meaning": "les Nagas, le serpent enroulé : une perspicacité hypnotique, l’emprise, le pouvoir caché et la ruse."
  },
  "9": {
   "name": "Magha",
   "meaning": "les ancêtres (Pitris), le trône : la lignée, la royauté, l’honneur et la tradition."
  },
  "10": {
   "name": "Purva Phalguni",
   "meaning": "Bhaga : le plaisir, l’amour, le repos et la créativité."
  },
  "11": {
   "name": "Uttara Phalguni",
   "meaning": "Aryaman : les contrats, le patronage, la loyauté et le mariage."
  },
  "12": {
   "name": "Hasta",
   "meaning": "Savitar, la main : l’habileté, l’artisanat et le pouvoir de concrétiser."
  },
  "13": {
   "name": "Chitra",
   "meaning": "Vishvakarma, le joyau brillant : le dessin, l’éclat et l’architecture."
  },
  "14": {
   "name": "Swati",
   "meaning": "Vayu, la pousse dans le vent : l’indépendance, le commerce et la souplesse."
  },
  "15": {
   "name": "Vishakha",
   "meaning": "Indra et Agni, l’arc de triomphe : une ambition résolue et la victoire après un long effort."
  },
  "16": {
   "name": "Anuradha",
   "meaning": "Mitra, le lotus : l’amitié, la dévotion, la coopération et la réussite loin de chez soi."
  },
  "17": {
   "name": "Jyeshtha",
   "meaning": "Indra, l’aîné : la préséance, la protection, le pouvoir et la jalousie."
  },
  "18": {
   "name": "Mula",
   "meaning": "Nirriti, la racine : aller à la racine des choses, déraciner, le changement radical."
  },
  "19": {
   "name": "Purva Ashadha",
   "meaning": "les Eaux : l’invincibilité, la purification et la persuasion."
  },
  "20": {
   "name": "Uttara Ashadha",
   "meaning": "les Vishvadevas : la victoire finale, la droiture et un succès durable."
  },
  "21": {
   "name": "Shravana",
   "meaning": "Vishnu, l’oreille : l’écoute, l’étude, le lien et la renommée par le savoir."
  },
  "22": {
   "name": "Dhanishta",
   "meaning": "les huit Vasus, le tambour : le rythme, la richesse, la musique et la renommée."
  },
  "23": {
   "name": "Shatabhisha",
   "meaning": "Varuna, les cent médecins : la guérison, le secret et la loi cosmique."
  },
  "24": {
   "name": "Purva Bhadrapada",
   "meaning": "Aja Ekapada : un idéalisme ardent, une intensité ascétique et la transformation."
  },
  "25": {
   "name": "Uttara Bhadrapada",
   "meaning": "Ahir Budhnya, le serpent des profondeurs : la profondeur, la sagesse, la retenue et la stabilité."
  },
  "26": {
   "name": "Revati",
   "meaning": "Pushan, le berger : la nourriture, les voyages sûrs, la compassion et l’achèvement."
  }
 },
 "mansion": {
  "0": {
   "name": "al-Sharatain",
   "meaning": "favorable aux voyages et aux commencements rapides ; défavorable aux associations."
  },
  "1": {
   "name": "al-Butain",
   "meaning": "retrouver les choses cachées et tenir bon ; la constance."
  },
  "2": {
   "name": "al-Thurayya (les Pléiades)",
   "meaning": "la bonne fortune, le commerce et les traversées sûres ; la prospérité."
  },
  "3": {
   "name": "al-Dabaran",
   "meaning": "la discorde et l’obstination ; la ruine des ouvrages."
  },
  "4": {
   "name": "al-Haq’a",
   "meaning": "l’étude, la faveur des princes et les voyages sûrs."
  },
  "5": {
   "name": "al-Han’a",
   "meaning": "l’amour et l’amitié, la chasse et le siège."
  },
  "6": {
   "name": "al-Dhira",
   "meaning": "le gain, le commerce et l’affection entre amis."
  },
  "7": {
   "name": "al-Nathra",
   "meaning": "l’amour, l’amitié, les voyages et la victoire."
  },
  "8": {
   "name": "al-Tarf",
   "meaning": "le dommage et la discorde ; bonne seulement pour la défense."
  },
  "9": {
   "name": "al-Jabha",
   "meaning": "l’amour, la consolidation des édifices et l’aide contre les ennemis."
  },
  "10": {
   "name": "al-Zubra",
   "meaning": "le respect et la crainte révérencielle, les voyages, le commerce et la libération des captifs."
  },
  "11": {
   "name": "al-Sarfa",
   "meaning": "la séparation et le changement ; bonne pour les récoltes et les serviteurs."
  },
  "12": {
   "name": "al-Awwa",
   "meaning": "la bienveillance, le commerce, la moisson et la délivrance."
  },
  "13": {
   "name": "al-Simak",
   "meaning": "l’amour entre époux et la guérison ; défavorable aux voyages en mer."
  },
  "14": {
   "name": "al-Ghafr",
   "meaning": "la découverte de trésors, l’amitié et la dispersion des ennemis."
  },
  "15": {
   "name": "al-Zubana",
   "meaning": "le commerce et la délivrance des liens ; voyages entravés."
  },
  "16": {
   "name": "al-Iklil",
   "meaning": "changer la mauvaise fortune en bonne, l’amour durable et les édifices solides."
  },
  "17": {
   "name": "al-Qalb (le cœur)",
   "meaning": "l’inimitié et les complots, la victoire sur les ennemis et les fondations solides."
  },
  "18": {
   "name": "al-Shawla (le dard)",
   "meaning": "le siège, l’expulsion et la ruine des ennemis ; l’aide à l’accouchement."
  },
  "19": {
   "name": "al-Na’aim",
   "meaning": "l’apprivoisement, le lien et le commerce."
  },
  "20": {
   "name": "al-Balda",
   "meaning": "la moisson, la construction et le gain ; la séparation des époux."
  },
  "21": {
   "name": "Sa’d al-Dhabih",
   "meaning": "l’évasion, la guérison et le départ."
  },
  "22": {
   "name": "Sa’d Bula",
   "meaning": "la guérison, l’harmonie conjugale et la libération des captifs."
  },
  "23": {
   "name": "Sa’d al-Su’ud",
   "meaning": "la chance des chances : le mariage, la bonne fortune et la victoire."
  },
  "24": {
   "name": "Sa’d al-Akhbiya",
   "meaning": "la protection des récoltes, la vengeance et le siège."
  },
  "25": {
   "name": "al-Fargh al-Mukdim",
   "meaning": "l’union et l’amour, la protection des voyageurs."
  },
  "26": {
   "name": "al-Fargh al-Mu’akhar",
   "meaning": "l’accroissement du commerce et des moissons, la guérison."
  },
  "27": {
   "name": "Batn al-Hut",
   "meaning": "l’accroissement du commerce, la découverte des objets perdus, la sécurité en mer et l’harmonie conjugale."
  }
 },
 "tzolkin": {
  "0": {
   "name": "Imix (Crocodile)",
   "meaning": "les eaux primordiales : le soin nourricier, les commencements et la confiance dans la vie."
  },
  "1": {
   "name": "Ik’ (Vent)",
   "meaning": "le souffle et l’esprit : la communication, l’inspiration et le changement."
  },
  "2": {
   "name": "Ak’bal (Nuit)",
   "meaning": "la maison des ténèbres : les rêves, le sanctuaire intérieur et le mystère."
  },
  "3": {
   "name": "K’an (Graine)",
   "meaning": "la graine de maïs : le potentiel, l’abondance et la croissance patiente."
  },
  "4": {
   "name": "Chikchan (Serpent)",
   "meaning": "la force vitale : l’instinct, la passion et la vitalité."
  },
  "5": {
   "name": "Kimi (Mort)",
   "meaning": "la transformation, les ancêtres et la libération."
  },
  "6": {
   "name": "Manik’ (Cerf)",
   "meaning": "la guérison, la générosité et la bonne gestion."
  },
  "7": {
   "name": "Lamat (Étoile)",
   "meaning": "l’harmonie, la fertilité, l’art et l’abondance."
  },
  "8": {
   "name": "Muluk (Eau)",
   "meaning": "l’émotion, la purification et l’offrande."
  },
  "9": {
   "name": "Ok (Chien)",
   "meaning": "la loyauté, l’amour et la guidance ; le cœur."
  },
  "10": {
   "name": "Chuwen (Singe)",
   "meaning": "l’art, le jeu et le tissage du temps."
  },
  "11": {
   "name": "Eb’ (Chemin)",
   "meaning": "le chemin de la vie, le service et la communauté."
  },
  "12": {
   "name": "B’en (Roseau)",
   "meaning": "l’autorité, le foyer et la croissance vers le haut."
  },
  "13": {
   "name": "Ix (Jaguar)",
   "meaning": "la magie, la sagesse de la terre et la vision chamanique."
  },
  "14": {
   "name": "Men (Aigle)",
   "meaning": "la vision, l’aspiration et la liberté."
  },
  "15": {
   "name": "Kib’ (Hibou)",
   "meaning": "la sagesse des ancêtres, le pardon et la voix intérieure."
  },
  "16": {
   "name": "Kab’an (Terre)",
   "meaning": "le mouvement, la synchronicité et la connaissance."
  },
  "17": {
   "name": "Etz’nab’ (Silex)",
   "meaning": "la vérité, trancher l’illusion, la résolution."
  },
  "18": {
   "name": "Kawak (Orage)",
   "meaning": "le renouveau et la catalyse ; la guérison par le bouleversement."
  },
  "19": {
   "name": "Ajaw (Seigneur)",
   "meaning": "le Soleil : la maîtrise, l’illumination et l’achèvement."
  }
 },
 "lib": {
  "title": "Bibliothèque et méthode",
  "meta": "Ce que ce programme emprunte à chaque tradition et à chaque texte.",
  "sourcesTitle": "Textes fondateurs des traditions du monde",
  "methodsTitle": "Ce qui est calculé",
  "validityTitle": "De la validité",
  "validity": "L’astrologie est un héritage ancien et riche de la culture humaine, et ce programme en applique les règles fidèlement et avec précision. Les études scientifiques n’ont toutefois pas confirmé son pouvoir prédictif. Considérez-la comme un miroir pour la réflexion et une porte d’entrée dans cette tradition, non comme un verdict ; pour les décisions médicales, juridiques et financières, consultez un professionnel.",
  "methods": [
   [
    "Le ciel",
    "Le Soleil, la Lune et les sept planètes (plus trois planètes modernes à titre indicatif) d’après les éphémérides d’Astronomy Engine dans l’écliptique vraie de la date ; le nœud lunaire moyen ; l’Ascendant et le Milieu du Ciel d’après le temps sidéral et l’obliquité vraie ; les déclinaisons ; les positions sidérales de Lahiri."
   ],
   [
    "Maisons",
    "Placidus, Regiomontanus (le choix de Lilly pour l’horaire), signes entiers (hellénistique et premiers Persans) et maisons égales."
   ],
   [
    "Dignités essentielles et accidentelles",
    "Domicile, exaltation, triplicité (dorothéenne, selon la secte), termes égyptiens, faces chaldéennes, exil, chute et pérégrination, ainsi que la maison, le mouvement, la vitesse, l’orientalité, la combustion, le cazimi, les aspects partiles et les étoiles royales, le tout noté selon la table de Lilly."
   ],
   [
    "Hellénistique",
    "Secte, bénéfique et maléfique de secte, domination (carré supérieur), assiègement, syzygie prénatale, dix parts dont les sept parts hermétiques de Paulus, libération zodiacale depuis l’Esprit et la Fortune avec sommets et relâchement du lien."
   ],
   [
    "Perso-arabe",
    "Firdaria avec sous-périodes, profections annuelles, révolution solaire (tahwil), almuten du thème, chaîne des dispositeurs et réceptions, les 28 demeures lunaires, jours et heures planétaires."
   ],
   [
    "Figures",
    "Grands trigones, carrés en T, grandes croix, yods, cerfs-volants, rectangles mystiques et stelliums ; formes de thème de Jones ; hémisphères ; planètes sans aspect et hors limites ; parallèles, antiscies et contre-antiscies ; images planétaires d’Ebertin ; harmoniques quintile, septile et novile."
   ],
   [
    "Jyotish",
    "Lagna sidéral, 27 nakshatras avec leurs padas, mahadasha et antardasha Vimshottari, navamsa et vargottama, Gaja Kesari, Budha-Aditya, les cinq Mahapurusha, Raja, Dhana, Viparita, Neecha Bhanga, Parivartana, Kemadruma, Kala Sarpa, Sade Sati et Kuja dosha."
   ],
   [
    "Bazi",
    "Quatre piliers en temps solaire local avec la limite d’année à Lichun et les mois par termes solaires, force du maître du jour avec troncs cachés, éléments utiles, les dix dieux, chocs, harmonies, cadres des trois harmonies, combinaisons des troncs et piliers de chance décennaux."
   ],
   [
    "Synthèse",
    "Planètes clés désignées par plusieurs systèmes indépendants, arènes de la vie, maîtres du temps actuels selon sept systèmes, liens cachés entre planètes sans aspect, et accords et contradictions entre les traditions."
   ],
   [
    "Horaire",
    "Considérations avant le jugement, significateurs, perfection avec la date exacte tirée des éphémérides, réfrénation, prohibition, translation et collection de lumière, réception, prochain aspect de la Lune et mesure symbolique du temps de Lilly."
   ],
   [
    "Élections",
    "Toutes les 20 minutes sur la période choisie, notées selon la Lune, l’Ascendant, les maisons de l’affaire, les bénéfiques et maléfiques sur les angles, les rétrogradations de Mercure et de Vénus, et les heures planétaires."
   ],
   [
    "Mondiale",
    "L’ingrès en Bélier, le maître de l’année, les thèmes des saisons selon la règle d’Abu Ma’shar, les éclipses et leurs signes, les conjonctions Jupiter–Saturne et leurs mutations, les conjonctions Mars–Saturne et Mars–Jupiter, les stations et les ingrès."
   ],
   [
    "Progressions et cycles",
    "Progressions secondaires, phase de la lunaison progressée, retours de Saturne et de Jupiter, opposition d’Uranus, retour nodal et Tzolk’in maya."
   ]
  ]
 },
 "sources": [
  {
   "tradition": "Mésopotamie",
   "books": [
    {
     "name": "Enuma Anu Enlil",
     "era": "v. 1600–1000 av. J.-C., Babylone",
     "use": "La tradition des présages : éclipses et signes lunaires lus pour le roi et le pays ; la racine de l’astrologie mondiale."
    },
    {
     "name": "MUL.APIN",
     "era": "v. 1000 av. J.-C.",
     "use": "Catalogue d’étoiles, chemin de la Lune et premier cadre zodiacal."
    }
   ]
  },
  {
   "tradition": "Monde hellénistique",
   "books": [
    {
     "name": "Dorothée de Sidon, Carmen Astrologicum",
     "era": "Ier siècle apr. J.-C.",
     "use": "Les maîtres de triplicité, les élections et les règles de la Lune aux commencements."
    },
    {
     "name": "Claude Ptolémée, Tétrabible",
     "era": "IIe siècle apr. J.-C., Alexandrie",
     "use": "Natures des planètes et des signes, tempérament, théorie des aspects, éclipses en astrologie mondiale, termes égyptiens, syzygie prénatale."
    },
    {
     "name": "Vettius Valens, Anthologies",
     "era": "IIe siècle apr. J.-C.",
     "use": "La secte, les parts et la libération zodiacale, avec ses sommets et le relâchement du lien."
    },
    {
     "name": "Firmicus Maternus, Mathesis",
     "era": "IVe siècle apr. J.-C.",
     "use": "Les antiscies, la doctrine du maître du thème, la délinéation natale détaillée."
    },
    {
     "name": "Paul d’Alexandrie, Introduction ; Rhétorius",
     "era": "IVe–VIIe siècles apr. J.-C.",
     "use": "Les sept parts hermétiques ; la domination et l’assiègement."
    }
   ]
  },
  {
   "tradition": "Monde perse et arabe",
   "books": [
    {
     "name": "Masha’allah",
     "era": "VIIIe siècle, Bassora",
     "use": "Le jugement horaire et les révolutions des années du monde."
    },
    {
     "name": "Abu Ma’shar al-Balkhi, Le Grand Introductoire ; Le Livre des religions et des dynasties",
     "era": "IXe siècle, Balkh et Bagdad",
     "use": "Les firdaria, les grandes conjonctions et leurs mutations, les révolutions des années du monde."
    },
    {
     "name": "Sahl ibn Bishr, Introduction et Les Cinquante Jugements",
     "era": "IXe siècle, Khorassan",
     "use": "Les considérations avant le jugement et les modes de perfection."
    },
    {
     "name": "al-Qabisi, Introduction à l’astrologie",
     "era": "Xe siècle",
     "use": "L’almuten et la pesée des témoignages."
    },
    {
     "name": "Kushyar Gilani, Mujmal al-Usul",
     "era": "Xe–XIe siècle",
     "use": "Principes du jugement et force des planètes."
    },
    {
     "name": "Abu Rayhan al-Biruni, Kitab al-Tafhim (Livre d’instruction)",
     "era": "1029, en persan et en arabe",
     "use": "Définitions, maisons, les 97 parts, les demeures lunaires et les heures planétaires."
    },
    {
     "name": "Ghayat al-Hakim (Picatrix)",
     "era": "Xe–XIe siècle",
     "use": "Les 28 demeures lunaires et leurs usages."
    },
    {
     "name": "Nasir al-Din al-Tusi, Si Fasl (Trente chapitres)",
     "era": "XIIIe siècle",
     "use": "Science du calendrier et élections, en persan."
    }
   ]
  },
  {
   "tradition": "Tradition hébraïque",
   "books": [
    {
     "name": "Abraham ibn Ezra, Le Commencement de la sagesse ; Le Livre des raisons",
     "era": "XIIe siècle",
     "use": "L’almuten du thème, les dignités et les raisons des règles."
    }
   ]
  },
  {
   "tradition": "Europe latine et Renaissance",
   "books": [
    {
     "name": "Guido Bonatti, Liber Astronomiae",
     "era": "XIIIe siècle",
     "use": "Les élections, l’ordre des firdaria et le jugement pratique."
    },
    {
     "name": "Johannes Kepler, Harmonices Mundi (L’Harmonie du monde)",
     "era": "1619",
     "use": "Les aspects mineurs (quintile, sesqui-carré) et la vision harmonique du ciel."
    },
    {
     "name": "Placidus de Titis, Primum Mobile",
     "era": "années 1650",
     "use": "Le système de maisons de Placidus."
    },
    {
     "name": "William Lilly, Christian Astrology",
     "era": "1647",
     "use": "La table des dignités essentielles et accidentelles, les règles de l’horaire, la mesure du temps et le tempérament."
    },
    {
     "name": "Jean-Baptiste Morin de Villefranche, Astrologia Gallica",
     "era": "1661",
     "use": "Maîtrise et détermination : comment une planète agit à travers les maisons qu’elle gouverne."
    }
   ]
  },
  {
   "tradition": "Inde",
   "books": [
    {
     "name": "Brihat Parashara Hora Shastra",
     "era": "compilation classique",
     "use": "Rasi et navamsa, bhavas, Vimshottari dasha et yogas."
    },
    {
     "name": "Varahamihira, Brihat Jataka et Brihat Samhita",
     "era": "VIe siècle, Ujjain",
     "use": "Yogas natals et présages mondiaux."
    },
    {
     "name": "Kalyanavarma, Saravali ; Mantreswara, Phaladeepika",
     "era": "Xe–XIVe siècles",
     "use": "Yogas, annulations et effets des planètes dans les maisons."
    },
    {
     "name": "Jaimini Sutras",
     "era": "époque classique",
     "use": "Aspects de signes et karakas."
    }
   ]
  },
  {
   "tradition": "Chine",
   "books": [
    {
     "name": "Xu Ziping, Yuan Hai Zi Ping",
     "era": "dynastie Song",
     "use": "Les quatre piliers centrés sur le maître du jour et les dix dieux."
    },
    {
     "name": "San Ming Tong Hui",
     "era": "dynastie Ming",
     "use": "Interactions des branches, force du maître du jour et piliers de chance."
    },
    {
     "name": "Di Tian Sui",
     "era": "dynastie Ming",
     "use": "Équilibre des cinq phases et choix des éléments utiles."
    }
   ]
  },
  {
   "tradition": "Maya",
   "books": [
    {
     "name": "Codex de Dresde",
     "era": "XIe–XIIe siècle",
     "use": "Le Tzolk’in de 260 jours et ses almanachs ; les tables de Vénus."
    }
   ]
  },
  {
   "tradition": "Époque moderne",
   "books": [
    {
     "name": "Reinhold Ebertin, La Combinaison des influences astrales",
     "era": "1940",
     "use": "Mi-points et images planétaires sur le cadran de 90°."
    },
    {
     "name": "Marc Edmund Jones, Guide d’interprétation de l’horoscope",
     "era": "1941",
     "use": "Les formes de thème."
    },
    {
     "name": "Dane Rudhyar, Le Cycle des lunaisons",
     "era": "1967",
     "use": "Les huit phases de lunaison et la lunaison progressée."
    },
    {
     "name": "John Addey, Les Harmoniques en astrologie",
     "era": "1976",
     "use": "La théorie harmonique des aspects (cinquième, septième, neuvième)."
    }
   ]
  }
 ],
 "cities": {
  "Tehran": "Téhéran",
  "Mashhad": "Mechhed",
  "Isfahan": "Ispahan",
  "Shiraz": "Chiraz",
  "Tabriz": "Tabriz",
  "Karaj": "Karadj",
  "Ahvaz": "Ahvaz",
  "Qom": "Qom",
  "Kermanshah": "Kermanchah",
  "Rasht": "Racht",
  "Kerman": "Kerman",
  "Urmia": "Ourmia",
  "Zahedan": "Zahedan",
  "Hamadan": "Hamadan",
  "Yazd": "Yazd",
  "Ardabil": "Ardabil",
  "Bandar Abbas": "Bandar Abbas",
  "Arak": "Arak",
  "Sari": "Sari",
  "Gorgan": "Gorgan",
  "Qazvin": "Qazvin",
  "Zanjan": "Zanjan",
  "Sanandaj": "Sanandadj",
  "Khorramabad": "Khorramabad",
  "Bushehr": "Bouchehr",
  "Birjand": "Birjand",
  "Semnan": "Semnan",
  "Ilam": "Ilam",
  "Yasuj": "Yassoudj",
  "Shahrekord": "Chahr-e Kord",
  "Bojnurd": "Bodjnourd",
  "Kashan": "Kachan",
  "Kish": "Kich",
  "Abadan": "Abadan",
  "Nishapur": "Nichapour",
  "Dezful": "Dezfoul",
  "Kabul": "Kaboul",
  "Herat": "Hérat",
  "Mazar-i-Sharif": "Mazar-e Charif",
  "Balkh": "Balkh",
  "Dushanbe": "Douchanbé",
  "Samarkand": "Samarcande",
  "Bukhara": "Boukhara",
  "Baku": "Bakou",
  "Yerevan": "Erevan",
  "Tbilisi": "Tbilissi",
  "Istanbul": "Istanbul",
  "Ankara": "Ankara",
  "Dubai": "Dubaï",
  "Doha": "Doha",
  "Baghdad": "Bagdad",
  "Najaf": "Nadjaf",
  "Sulaymaniyah": "Souleimaniye",
  "Riyadh": "Riyad",
  "Cairo": "Le Caire",
  "Delhi": "Delhi",
  "Lahore": "Lahore",
  "Beijing": "Pékin",
  "Tokyo": "Tokyo",
  "Kuala Lumpur": "Kuala Lumpur",
  "Moscow": "Moscou",
  "London": "Londres",
  "Manchester": "Manchester",
  "Paris": "Paris",
  "Berlin": "Berlin",
  "Hamburg": "Hambourg",
  "Frankfurt": "Francfort",
  "Cologne": "Cologne",
  "Munich": "Munich",
  "Vienna": "Vienne",
  "Amsterdam": "Amsterdam",
  "Brussels": "Bruxelles",
  "Stockholm": "Stockholm",
  "Gothenburg": "Göteborg",
  "Oslo": "Oslo",
  "Copenhagen": "Copenhague",
  "Helsinki": "Helsinki",
  "Rome": "Rome",
  "Milan": "Milan",
  "Madrid": "Madrid",
  "Barcelona": "Barcelone",
  "Zurich": "Zurich",
  "Geneva": "Genève",
  "Athens": "Athènes",
  "Toronto": "Toronto",
  "Vancouver": "Vancouver",
  "Montreal": "Montréal",
  "New York": "New York",
  "Washington": "Washington",
  "Los Angeles": "Los Angeles",
  "San Francisco": "San Francisco",
  "Houston": "Houston",
  "Chicago": "Chicago",
  "Sydney": "Sydney",
  "Melbourne": "Melbourne",
  "Auckland": "Auckland",
  "Mumbai": "Bombay",
  "Bangalore": "Bangalore",
  "Shanghai": "Shanghai",
  "Hong Kong": "Hong Kong",
  "Taipei": "Taipei",
  "Singapore": "Singapour",
  "Jakarta": "Jakarta",
  "Karachi": "Karachi",
  "Islamabad": "Islamabad",
  "Beirut": "Beyrouth",
  "Damascus": "Damas",
  "Amman": "Amman",
  "Jeddah": "Djeddah",
  "Kuwait City": "Koweït",
  "Muscat": "Mascate",
  "Abu Dhabi": "Abou Dabi",
  "Casablanca": "Casablanca",
  "Tunis": "Tunis",
  "Lagos": "Lagos",
  "Johannesburg": "Johannesbourg",
  "Izmir": "Izmir",
  "Saint Petersburg": "Saint-Pétersbourg",
  "Kyiv": "Kyiv",
  "Warsaw": "Varsovie",
  "Lisbon": "Lisbonne",
  "Dublin": "Dublin",
  "Mexico City": "Mexico",
  "São Paulo": "São Paulo",
  "Rio de Janeiro": "Rio de Janeiro",
  "Buenos Aires": "Buenos Aires",
  "Bogotá": "Bogota",
  "Lima": "Lima",
  "Santiago": "Santiago du Chili",
  "Miami": "Miami"
 },
 "syn": {
  "meter": {
   "attraction": "Attirance",
   "harmony": "Harmonie",
   "durability": "Durée",
   "friction": "Friction"
  },
  "scoresTitle": "Notes",
  "scores": "Attirance {a}, harmonie {h}, durée {d}, friction {f} (sur 10).",
  "overallTitle": "Compatibilité : {pct} %",
  "overall": {
   "strong": "Un lien solide : l’attirance, l’entente et la constance se soutiennent mutuellement. Les textes classiques rangent de telles unions parmi les plus heureuses.",
   "good": "Une bonne entente : une affinité réelle, avec quelques points qui demandent une attention consciente.",
   "work": "Un lien qui demande du travail : il existe un point de rencontre, mais les différences sont importantes et la relation ne grandit qu’avec l’effort et la maturité.",
   "hard": "Une combinaison difficile : les deux thèmes tirent dans des directions différentes. Elle peut beaucoup enseigner, mais l’harmonie ne viendra pas d’elle-même."
  },
  "overallWhy": "Synastrie : attirance {a}, harmonie {h}, durée {d}, friction {f} ; Guna Milan : {k}/36.",
  "ptolTitle": "La règle des luminaires selon Ptolémée (Tétrabible IV, 5)",
  "ptol": {
   "lights": "Le Soleil de l’un et la Lune de l’autre se trouvent dans le même signe ou dans des signes harmonieux : premier signe, selon Ptolémée, d’une union durable et concordante.",
   "exchange": "Le Soleil de l’un est conjoint à la Lune de l’autre : la signature classique du mariage et d’une profonde reconnaissance mutuelle.",
   "moons": "Les deux Lunes sont dans le même signe ou dans des signes harmonieux : la vie quotidienne, les humeurs et les besoins s’accordent naturellement.",
   "none": "Les luminaires ne sont pas en signes harmonieux : selon la règle de Ptolémée, la concorde doit se bâtir par d’autres liens, comme Vénus, Jupiter et un projet commun."
  },
  "contact": "{a} {asp} {b}",
  "contactText": {
   "conj": "Chez l’un, « {x} » fusionne avec « {y} » chez l’autre (orbe {orb}°) : un lien fort et immédiat dans ce domaine.",
   "easy": "Chez l’un, « {x} » soutient « {y} » chez l’autre (orbe {orb}°) : aisance et compréhension naturelle en ce domaine.",
   "hard": "Chez l’un, « {x} » défie « {y} » chez l’autre (orbe {orb}°) : un magnétisme qui apporte aussi une tension à dénouer."
  },
  "saturnNote": "Les contacts de Saturne sont le ciment des longues relations : ils lient et stabilisent, mais peuvent aussi peser ou restreindre.",
  "overlayTitle": "Les planètes de chacun dans les maisons de l’autre",
  "overlay": {
   "b2a": "Une planète de l’autre ({p}) tombe dans votre maison {h} : {meaning}",
   "a2b": "Une de vos planètes ({p}) tombe dans sa maison {h} : {meaning}"
  },
  "ovh": {
   "1": "ressentie fortement et personnellement ; elle façonne la manière dont l’autre se voit.",
   "5": "la romance, le jeu et le plaisir.",
   "7": "la maison même du mariage, d’où une attirance naturelle vers l’union.",
   "8": "l’intensité, l’intimité et les ressources partagées.",
   "12": "quelque chose de caché ou de karmique ; un lien difficile à expliquer."
  },
  "kootaTitle": "Guna Milan (Ashtakoota) : {n} sur 36",
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
   "excellent": "Excellent selon la norme indienne (28 ou plus).",
   "good": "Bon (24 ou plus).",
   "fair": "Acceptable (18 ou plus), le minimum traditionnel pour le mariage.",
   "weak": "En dessous du minimum traditionnel de 18."
  },
  "nadiDosha": "Nadi dosha : les deux Lunes sont dans la même nadi, ce que les textes tiennent pour la discordance la plus grave, surtout pour la santé et les enfants ; il existe de nombreuses annulations.",
  "bhakootDosha": "Bhakoot dosha : les signes lunaires sont en relation 2-12, 5-9 ou 6-8, ce qui peut grever les finances ou l’harmonie.",
  "kootaNote": "Calculé d’après la Lune sidérale de chacun (Vashya et Yoni simplifiés).",
  "baziTitle": "Piliers chinois : maîtres du jour et branches",
  "baziDm": {
   "same": "Les deux maîtres du jour sont de la même phase ({a} et {b}) : des pairs et des alliés, parfois des rivaux.",
   "aFeedsB": "Votre maître du jour, {a}, nourrit le sien, {b} : vous donnez et soutenez ; l’autre s’épanouit grâce à vous.",
   "bFeedsA": "Son maître du jour, {b}, nourrit le vôtre, {a} : l’autre vous soutient et vous aide à grandir.",
   "aControlsB": "Votre maître du jour, {a}, contrôle le sien, {b} : dans le Zi Ping classique, c’est l’étoile de l’épouse pour un homme, un appariement traditionnel, tant que le contrôle ne devient pas domination.",
   "bControlsA": "Son maître du jour, {b}, contrôle le vôtre, {a} : dans le Zi Ping classique, c’est l’étoile du mari pour une femme, un appariement traditionnel qui apporte structure et défi."
  },
  "baziDay": {
   "clash": "Les deux branches du jour (palais du conjoint) s’entrechoquent : une relation vivante, mais sujette aux frictions dans la vie commune.",
   "harmony": "Les deux branches du jour forment une des six harmonies : un accord secret et naturel entre les palais du conjoint.",
   "same": "Les branches du jour sont identiques : des besoins semblables dans l’intimité.",
   "neutral": "Les branches du jour sont neutres l’une envers l’autre."
  },
  "baziYear": {
   "clash": "Les animaux de l’année, {a} et {b}, s’entrechoquent.",
   "harmony": "Les animaux de l’année, {a} et {b}, forment une paire harmonieuse.",
   "trine": "Les animaux de l’année, {a} et {b}, appartiennent au même trigone d’alliés.",
   "neutral": "Les animaux de l’année, {a} et {b}, sont neutres l’un envers l’autre."
  }
 },
 "love": {
  "venusTitle": "Vénus : votre manière d’aimer",
  "venus": "Vénus à {pos}, maison {h}, {word}.",
  "venusEl": {
   "fire": "Vous aimez avec feu : ouvertement, vite, dans l’admiration et la conquête.",
   "earth": "Vous aimez par les sens et par la fidélité : lentement, concrètement, pour la durée.",
   "air": "Vous aimez par l’esprit : la conversation, l’amitié et la liberté comptent autant que la passion.",
   "water": "Vous aimez profondément et avec émotion : il vous faut la proximité, la confiance et le sentiment d’être vraiment compris."
  },
  "venusStrong": "Une Vénus forte donne du charme et de la chance en amour ; l’affection vient à vous.",
  "venusWeak": "Une Vénus faible signifie que l’amour demande plus d’efforts et de discernement ; les déceptions enseignent ce à quoi vous tenez vraiment.",
  "venusMid": "Vénus est moyenne : l’amour dépend des choix et du moment.",
  "venusRetro": "Vénus rétrograde à la naissance : l’amour est réexaminé ; d’anciens liens reviennent, et le cœur choisit tard, mais en connaissance de cause.",
  "venusCombust": "Vénus combuste : les sentiments sont cachés ou éclipsés par le devoir et l’ego ; l’amour grandit lorsqu’il est mis au grand jour.",
  "marsTitle": "Mars : le désir et la conquête",
  "mars": "Mars à {pos}, maison {h}.",
  "marsEl": {
   "fire": "Le désir est direct et audacieux ; vous poursuivez ouvertement.",
   "earth": "Le désir est constant et physique ; vous prouvez votre amour par les actes.",
   "air": "Le désir naît dans l’esprit ; la vivacité et les mots vous éveillent.",
   "water": "Le désir est émotionnel et intense ; il vous faut un lien profond."
  },
  "partnerTitle": "Le partenaire qui vous attire (maison VII)",
  "desc": "Le Descendant est en {sign} ; le partenaire tend à montrer cette nature :",
  "lord7": "Le maître de la maison VII, {p}, se trouve en maison {h} et est {word} : c’est à travers {topics} que l’on rencontre ses partenaires, et le mariage y est étroitement lié.",
  "in7": {
   "sun": "Le Soleil en maison VII : un partenaire de rang et de fort caractère ; vous pouvez vous définir à travers la relation.",
   "moon": "La Lune en maison VII : un fort besoin d’union ; le partenaire est attentionné, ou changeant.",
   "mercury": "Mercure en maison VII : un partenaire jeune d’esprit, communicatif, ou lié au travail et au commerce.",
   "venus": "Vénus en maison VII : l’un des meilleurs signes d’un mariage heureux et harmonieux.",
   "mars": "Mars en maison VII : de la passion, mais aussi des querelles ; un partenaire à forte volonté.",
   "jupiter": "Jupiter en maison VII : un partenaire généreux, sage ou fortuné ; le mariage apporte la croissance.",
   "saturn": "Saturne en maison VII : un engagement tardif ou grave, souvent avec un partenaire plus âgé ou responsable ; durable une fois scellé."
  },
  "ptolTitle": "Le significateur du conjoint selon Ptolémée",
  "ptolM": "Pour un homme, Ptolémée juge l’épouse d’après la Lune. Significatrice : {p}, à {pos}, maison {h}, dans un signe {mode}.",
  "ptolF": "Pour une femme, Ptolémée juge le mari d’après le Soleil. Significateur : {p}, à {pos}, maison {h}, dans un signe {mode}.",
  "ptolMode": {
   "movable": "Un signe cardinal : le mariage peut venir tôt, ou plus d’une fois.",
   "fixed": "Un signe fixe : un seul mariage durable est indiqué.",
   "common": "Un signe mutable : plus d’une union importante est possible."
  },
  "ptolHit": {
   "ben": "L’aspect formé avec {p} ({asp}) promet un conjoint bon et secourable.",
   "benHard": "L’aspect formé avec {p} ({asp}) donne un bienfait mêlé d’excès.",
   "malEasy": "L’aspect formé avec {p} ({asp}) ajoute du sérieux et de la constance.",
   "mal": "L’aspect formé avec {p} ({asp}) apporte friction, retard ou un partenaire exigeant."
  },
  "easeTitle": "Facilité ou retard dans le mariage",
  "d": {
   "satVenus": "Saturne afflige Vénus",
   "sat7": "Saturne touche le Descendant",
   "venusRetro": "Vénus est rétrograde",
   "satIn7": "Saturne occupe la maison VII",
   "lord7cadent": "le maître de la maison VII est dans une maison cachée"
  },
  "e": {
   "jupVenus": "Jupiter aide Vénus",
   "benIn7": "un bénéfique occupe la maison VII",
   "lord7good": "le maître de la maison VII est bien placé",
   "moonVenus": "la Lune et Vénus s’accordent"
  },
  "easeList": "En faveur : {list}.",
  "delayList": "Facteurs de retard : {list}.",
  "easeVerdict": "L’amour et le mariage viennent assez facilement.",
  "delayVerdict": "L’engagement tend à venir plus tard, avec la maturité ; ce qui se bâtit alors est solide.",
  "mixedVerdict": "Facilité et retard s’équilibrent : le moment et les choix décident.",
  "vedTitle": "Le regard indien : le maître de la maison VII et le navamsa",
  "ved": "Maître sidéral de la maison VII : {lord}, dans le bhava {h} ({topics}). Dans le navamsa (le thème du mariage), Vénus est en {nav}.",
  "navEl": {
   "fire": "Un conjoint fougueux et indépendant.",
   "earth": "Un conjoint pratique et fidèle.",
   "air": "Un conjoint sociable et intelligent.",
   "water": "Un conjoint sensible et dévoué."
  },
  "manglik": "La position de Mars (Kuja dosha) est présente : la tradition conseille un partenaire ayant un Mars semblable, ou de la patience avant de se marier.",
  "baziTitle": "Le regard chinois : le palais du conjoint",
  "bazi": "Votre palais du conjoint (branche du jour) contient {g} : {gt}",
  "baziInter": "Le palais du conjoint est impliqué dans : {list}.",
  "baziCalm": "Le palais du conjoint n’est pas perturbé : une image intérieure stable de la vie à deux.",
  "baziStarM": "Pour un homme, l’étoile de l’épouse est l’élément {el} ; sa force dans le thème : {n}.",
  "baziStarF": "Pour une femme, l’étoile du mari est l’élément {el} ; sa force dans le thème : {n}.",
  "baziStarX": "Choisissez un sexe dans les réglages du thème natal pour lire l’étoile du conjoint.",
  "w": {
   "prof": "l’année de profection active la maison {h} (maître : {p})",
   "firdar": "la firdaria de Vénus est en cours",
   "firdarSub": "la sous-période de Vénus de la firdaria est en cours",
   "dasha": "la mahadasha en cours ({p})",
   "antar": "l’antardasha en cours ({p}), jusqu’au {to}"
  },
  "timingTitle": "Le moment de l’amour",
  "timingNow": "Actif en ce moment : {list}. C’est une période favorable pour rencontrer quelqu’un ou s’engager.",
  "timingQuiet": "Aucun des principaux maîtres du temps de l’amour n’est actif en ce moment.",
  "jup7": "Jupiter, le grand bénéfique, traverse votre septième signe ({sign}) : {when} ; traditionnellement, la fenêtre la plus forte pour le mariage.",
  "jupVenus": "Jupiter revient dans le signe de votre Vénus à partir du {when} : une saison de tendresse et d’occasions."
 },
 "money": {
  "capacityTitle": "Capacité de richesse (maison II)",
  "house2": "La maison II est en {sign} ; son maître, {p}, se trouve en maison {h} et est {word}.",
  "source": "L’argent arrive par {topics}.",
  "src": {
   "1": "votre propre personne, vos compétences et votre initiative",
   "2": "vos propres ressources et ce que vous possédez déjà",
   "3": "la communication, l’écriture, la vente, les courts voyages, la fratrie et les voisins",
   "4": "la terre, l’immobilier, la famille et les fondations héritées",
   "5": "la créativité, le divertissement, la spéculation et les enfants",
   "6": "le service, l’emploi salarié, l’artisanat et les métiers de la santé",
   "7": "les associés, les clients, le mariage et les contrats",
   "8": "l’argent d’autrui : investisseurs, prêts, héritage et biens communs",
   "9": "l’étranger, l’enseignement, le droit, l’édition et les voyages",
   "10": "la carrière, l’autorité et la réputation publique",
   "11": "les amis, les réseaux, les protecteurs et les bénéfices du métier",
   "12": "le travail en coulisse, les institutions, les lieux lointains ou isolés et les affaires confidentielles"
  },
  "in2": {
   "sun": "Le Soleil en maison II : on gagne par la position, le commandement et la visibilité ; on dépense pour son rang.",
   "moon": "La Lune en maison II : des revenus fluctuants ; on gagne grâce au public, à l’alimentation, au logement ou à tout ce qui change.",
   "mercury": "Mercure en maison II : on gagne par l’esprit : le commerce, l’écriture, l’enseignement, les chiffres.",
   "venus": "Vénus en maison II : un signe classique de richesse ; on gagne par la beauté, l’art, le plaisir ou l’association.",
   "mars": "Mars en maison II : on gagne avec audace et on dépense avec audace ; l’argent vient par l’effort, l’ingénierie ou le risque.",
   "jupiter": "Jupiter en maison II : la meilleure signature d’abondance ; l’argent croît et revient.",
   "saturn": "Saturne en maison II : une richesse bâtie lentement et gardée avec soin ; la gêne d’abord, la solidité ensuite."
  },
  "lotsTitle": "Parts de Fortune et de Substance",
  "fortune": "La Part de Fortune à {pos}, maison {h} ({topics}) ; son maître, {p}, est {word}.",
  "substance": "La Part de Substance (Abu Ma’shar) à {pos}, maison {h} ({topics}) ; son maître, {p}, est {word}.",
  "jupTitle": "Jupiter, significateur de la richesse",
  "jup": "Jupiter à {pos}, maison {h} ({topics}), {word}.",
  "jupStrong": "Un Jupiter fort : les occasions se présentent, et la générosité revient multipliée.",
  "jupWeak": "Un Jupiter faible : la croissance demande de la discipline ; gare à l’excès d’engagements et à la confiance mal placée.",
  "jupMid": "Jupiter est moyen : la croissance suit l’effort et le bon conseil.",
  "flowsTitle": "Revenus, carrière et argent d’autrui",
  "flows": "Maître de la maison XI (revenus du travail) : {p11}, {w11}, en maison {h11}. Maître de la maison X (carrière) : {p10}, {w10}. Maître de la maison VIII (prêts, investisseurs, héritage) : {p8}, {w8}, en maison {h8}.",
  "flows8": "L’argent d’autrui est plus fort que vos propres revenus : associations, investisseurs, prêts ou héritage jouent un grand rôle.",
  "flows11": "Vos propres gains sont plus forts que l’argent d’autrui : bâtissez vos revenus sur votre travail et votre réseau.",
  "flowsEven": "Revenus propres et argent d’autrui s’équilibrent.",
  "styleTitle": "Votre tempérament financier",
  "style": "Planète qui mène votre argent : {p} ; en second : {q}.",
  "styleText": {
   "value": "Style saturnien : patient, attaché à la valeur et au long terme ; l’immobilier, la terre et la capitalisation lente vous conviennent.",
   "growth": "Style jupitérien : croissance et expansion ; l’éducation, l’édition, le droit, les entreprises internationales.",
   "aggressive": "Style martien : rapide, combatif et preneur de risques ; fixez-vous des limites strictes.",
   "beauty": "Style vénusien : la beauté, le design, le luxe, l’hôtellerie et les associations.",
   "trader": "Style mercurien : le négoce, le commerce, la technologie et l’information ; des décisions rapides.",
   "cyclical": "Style lunaire : cyclique et intuitif ; les biens de consommation, l’alimentation, le logement ; surveillez les cycles.",
   "leader": "Style solaire : le commandement, votre propre entreprise et la réputation publique."
  },
  "styleSecond": "Seconde note. {text}",
  "uranus": "Uranus touche vos maisons d’argent : gains et pertes soudains ; la technologie et l’inhabituel.",
  "neptune": "Neptune touche vos maisons d’argent : de l’intuition, mais aussi de la confusion ; vérifiez tout par écrit.",
  "baziTitle": "Le regard chinois : l’étoile de la richesse",
  "bazi": "Votre élément de richesse est {el} (force {n}) ; sa planète : {p}.",
  "baziCase": {
   "strongStrong": "Un maître du jour fort et une étoile de richesse forte : vous pouvez porter une grande fortune. Les textes classiques parlent d’un thème riche.",
   "strongWeak": "Un maître du jour fort et une étoile de richesse faible : la capacité est là, mais les occasions doivent être créées ; la richesse arrive dans les piliers de chance favorables.",
   "weakStrong": "Un maître du jour faible face à une richesse forte : la richesse est visible mais lourde à tenir. Associations, soutiens et prudence avec les dettes sont essentiels.",
   "weakWeak": "Les deux sont modestes : une prospérité régulière et méritée plutôt que des aubaines ; constituez d’abord vos ressources."
  },
  "vedTitle": "Le regard indien : les maîtres de la richesse et du gain",
  "ved": "Le maître de la maison II, {l2}, est dans le bhava {h2} ; le maître de la maison XI, {l11}, dans le bhava {h11}.",
  "vedYogas": "Yogas liés à la richesse : {list}.",
  "vedNone": "Aucun yoga classique de richesse ne ressort ; la richesse suit les dashas des maîtres des maisons II et XI.",
  "t": {
   "prof": "l’année de profection active la maison {h}",
   "profLord": "le maître de l’année ({p}) gouverne une maison d’argent",
   "jup": "Jupiter transite votre maison {h}",
   "sat": "Saturne transite votre maison {h} (resserrer et consolider)",
   "dasha": "la mahadasha en cours ({p})",
   "luck": "le pilier de chance porte votre élément de richesse",
   "zr": "la libération zodiacale depuis la Fortune est dans une période culminante"
  },
  "timingTitle": "Le moment financier présent",
  "timing": "Actif en ce moment : {list}.",
  "timingQuiet": "Aucun grand maître du temps financier n’est actif en ce moment : une période de travail régulier et de préparation plutôt que de grands mouvements."
 },
 "cal": {
  "newMoon": "Nouvelle Lune en {sign}",
  "fullMoon": "Pleine Lune en {sign}",
  "newMoonText": "Un commencement : traditionnellement bon pour lancer, semer et acheter pour le long terme.",
  "fullMoonText": "Un aboutissement : les choses arrivent à maturité ; traditionnellement bon pour vendre et conclure, mauvais pour commencer.",
  "station": {
   "mercury": {
    "retro": "Mercure devient rétrograde : retards, malentendus et accords révisés. Lisez les contrats deux fois.",
    "direct": "Mercure reprend sa marche directe : la communication et les affaires s’éclaircissent."
   },
   "venus": {
    "retro": "Vénus devient rétrograde : les valeurs et les prix sont réévalués ; évitez les achats de luxe.",
    "direct": "Vénus reprend sa marche directe : la confiance dans la valeur revient."
   },
   "mars": {
    "retro": "Mars devient rétrograde : l’énergie se tourne vers l’intérieur ; évitez les manœuvres agressives.",
    "direct": "Mars reprend sa marche directe : l’élan revient."
   }
  },
  "eclipse": "Les éclipses marquent des tournants soudains ; les astrologues traditionnels évitent de commencer ou de s’engager à leur approche."
 },
 "trade": {
  "assetKw": {
   "stocks": [
    " action",
    "actionnaire",
    "bourse",
    "boursi",
    "titres",
    "etf",
    "indice",
    "cac 40",
    "nasdaq",
    "dividende",
    "sicav",
    "fonds indiciel"
   ],
   "crypto": [
    "crypto",
    "bitcoin",
    "btc",
    "ethereum",
    "ether",
    "altcoin",
    "stablecoin",
    "jeton",
    "blockchain",
    "nft",
    "solana",
    "usdt"
   ],
   "gold": [
    "l'or",
    "l’or",
    "d'or",
    "d’or",
    " or ",
    "lingot",
    "métaux précieux",
    "métal précieux",
    "argent métal",
    "platine",
    "napoléon"
   ],
   "currency": [
    "devise",
    "forex",
    "taux de change",
    "bureau de change",
    "dollar",
    "des euros",
    "mes euros",
    "en euros",
    "cours de l’euro",
    "cours de l'euro",
    "franc suisse",
    "livre sterling",
    "yuan",
    "rouble",
    "roupie"
   ],
   "property": [
    "maison",
    "appartement",
    "appart",
    "immobilier",
    "immeuble",
    "terrain",
    "propriété",
    "logement",
    "studio",
    "villa",
    "local commercial",
    "bien immobilier"
   ],
   "vehicle": [
    "voiture",
    "automobile",
    "véhicule",
    "moto",
    "scooter",
    "camion",
    "camionnette",
    "bagnole"
   ],
   "goods": [
    "marchandise",
    "produits",
    "inventaire",
    "lot de",
    "cargaison",
    "denrées",
    "fournitures"
   ]
  },
  "asset": {
   "stocks": "Actions et titres",
   "crypto": "Cryptomonnaie",
   "gold": "Or et métaux précieux",
   "currency": "Devises étrangères",
   "property": "Maison ou bien immobilier",
   "vehicle": "Voiture ou véhicule",
   "goods": "Biens et marchandises"
  },
  "sig": {
   "buy": "Vous (l’acheteur) : {a} ; le vendeur : {b} ; le prix : {price} ; la chose : {thing} ; l’issue de l’affaire : {end}.",
   "sell": "Vous (le vendeur) : {a} ; l’acheteur : {b} ; le prix : {price} ; la chose : {thing} ; l’issue de l’affaire : {end}."
  },
  "sameLord": "Une seule planète ({p}) gouverne les deux parties : l’affaire est entre vos mains.",
  "deal": "Les significateurs ({a} et {b}) parfont un aspect ({asp}) le {date} : l’affaire peut se conclure.",
  "noDeal": "Les significateurs ({a} et {b}) ne se rejoignent pas prochainement : il est peu probable que l’affaire se conclue maintenant.",
  "edgeYou": "Votre significateur, {a}, est plus fort que celui de l’autre partie ({b}) : l’avantage est de votre côté.",
  "edgeThem": "L’autre partie ({b}) est plus forte que vous ({a}) : l’avantage est de son côté ; négociez avec prudence.",
  "edgeEven": "Les deux parties ({a} et {b}) sont de force semblable.",
  "price": {
   "high": "Le maître de la maison X ({p}) est fort et angulaire : le prix est élevé ou ferme.",
   "low": "Le maître de la maison X ({p}) est faible ou cadent : le prix est bas ou négociable.",
   "fair": "Le maître de la maison X ({p}) est moyen : le prix est juste."
  },
  "moonWaxing": "La Lune croît en lumière : selon la tradition, les prix tendent à monter, ce qui favorise la vente.",
  "moonWaning": "La Lune décroît en lumière : selon la tradition, les prix tendent à baisser, ce qui favorise l’achat.",
  "thing": "La planète de l’actif, {p}, est {word}.",
  "thingRetro": "Elle est rétrograde : hésitations, retours ou défauts cachés.",
  "end": "Le maître de la maison IV, qui montre l’issue de l’affaire ({p}), est {word}.",
  "mercRetro": "Mercure, maître du commerce, est rétrograde : erreurs dans les papiers et revirements.",
  "verdict": {
   "buy": {
    "go": "Acheter : le ciel soutient l’achat dès maintenant.",
    "lean": "Plutôt acheter, en veillant au prix et aux conditions.",
    "wait": "Attendre : les signes sont partagés ; un meilleur moment figure ci-dessous.",
    "no": "Ne pas acheter maintenant : les témoignages s’y opposent."
   },
   "sell": {
    "go": "Vendre : le ciel soutient la vente dès maintenant.",
    "lean": "Plutôt vendre, en veillant au prix et aux conditions.",
    "wait": "Attendre : les signes sont partagés ; un meilleur moment figure ci-dessous.",
    "no": "Ne pas vendre maintenant : les témoignages s’y opposent."
   }
  }
 },
 "chat": {
  "buyKw": [
   "achet",
   "achèt",
   "achat",
   "acquérir",
   "acquiers",
   "acquisition",
   "investir dans",
   "investir en",
   "placer mon argent dans",
   "me procurer"
  ],
  "sellKw": [
   "vendre ",
   "vendre?",
   "vendre ",
   "vendre,",
   "vendre.",
   "dois-je vendre",
   "faut-il vendre",
   "veux vendre",
   "voudrais vendre",
   "vends",
   "vendu",
   "vendant",
   "vendrai",
   "vendons",
   "vendez",
   "revend",
   " vente",
   "céder",
   "cession",
   "liquider",
   "encaisser",
   "prendre mes bénéfices",
   "me débarrasser"
  ],
  "tradeIntro": "Jugé selon les règles de Lilly sur l’achat et la vente, pour cet instant ({asset}) :",
  "tradeMore": "L’onglet Achat et vente indique les meilleurs moments à venir.",
  "ruleIntro": "Jugé selon les règles classiques de l’astrologie horaire, pour cet instant (sujet : {topic}) :",
  "ruleNatal": "Dans votre thème natal, maison {h} :",
  "ruleNote": "Pour une réponse plus complète, sous forme de conversation, ouvrez cette page dans Claude."
 }
};
/* track strings: consent notice and owner dashboard */
Object.assign((typeof window !== 'undefined' ? window : globalThis).I18N_DATA.fr, {"track": {"title": "Enregistrement de vos saisies", "notice": "Avec votre permission, ce que vous saisissez ici est enregistré et le propriétaire de ce site peut le voir : votre nom, vos date, heure et lieu de naissance, les données de l’autre personne si vous les ajoutez, vos questions et conversations avec l’astrologue et leurs réponses, ainsi que les sections que vous utilisez. Vous pouvez changer cela à tout moment grâce au lien en bas de page.", "accept": "Autoriser", "decline": "Ne pas enregistrer", "manage": "Enregistrement de mes données : {state} (modifier)", "on": "activé", "off": "désactivé"}});
