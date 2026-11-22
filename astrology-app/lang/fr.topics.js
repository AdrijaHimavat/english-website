/* Akhtarnameh — fr plain-reading strings (merged into lang/fr.js). */
(function (G) {
  const D = G.I18N_DATA = G.I18N_DATA || {};
  const merge = (a, b) => { Object.keys(b).forEach(k => { if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') merge(a[k], b[k]); else a[k] = b[k]; }); return a; };
  merge(D.fr = D.fr || {}, {
    plain: {
      title: "Votre lecture du ciel",
      intro: "Voici ce que le ciel de votre naissance dit de vous.",
      introName: "{name}, voici ce que le ciel de votre naissance dit de vous.",
      techTitle: "Détails techniques (pour les astrologues)",
      techHint: "Les calculs derrière la lecture : le thème, les dignités et les techniques de chaque tradition.",
      aiButton: "Obtenir une lecture plus complète",
      aiTitle: "Une lecture plus complète",
      h: {
        nature: "Qui vous êtes",
        identity: "Le caractère de cette entreprise",
        heart: "Votre cœur",
        drive: "Ce qui vous anime",
        gift: "Votre plus beau don",
        edge: "Sa plus grande force",
        love: "L’amour",
        work: "Travail et vocation",
        money: "L’argent",
        now: "Ce chapitre de votre vie",
        advice: "Un mot pour vous"
      },
      moon: [
        "Vos émotions s’enflamment vite et retombent tout aussi vite. Vous avez besoin d’espace pour agir selon ce que vous ressentez, et votre bonheur, c’est une vie en mouvement.",
        "Vous trouvez la paix dans les choses simples et solides : une maison calme, un bon repas, des gens sur qui compter. Et quand vous aimez, vous aimez avec fidélité.",
        "Votre cœur a besoin de parler avant de se poser. La conversation, la curiosité et un peu de variété nourrissent votre vie affective.",
        "Vous ressentez profondément et vous n’oubliez rien. La maison, la famille et ceux que vous protégez sont votre port d’attache.",
        "Vous avez un cœur chaleureux et généreux, qui a besoin d’être vu et apprécié. L’admiration de ceux que vous aimez, voilà ce qui vous comble.",
        "Vous montrez votre amour en prenant soin des choses. L’ordre vous apaise, et vous rendre utile vous aide à vous sentir bien dans votre peau.",
        "Vous êtes en paix quand l’harmonie règne autour de vous. Une belle relation, la justice et la beauté, voilà ce à quoi votre cœur aspire.",
        "Vos sentiments sont profonds et silencieux. Vous accordez votre confiance lentement, mais quand vous donnez votre cœur, vous le donnez tout entier.",
        "Votre cœur est libre et toujours en quête. Les voyages, l’apprentissage et les grands idéaux vous remontent le moral plus que tout.",
        "Vous gardez vos sentiments pour vous et trouvez votre sécurité dans ce que vous construisez. Le respect et les progrès réguliers, voilà ce qui vous réconforte.",
        "Vous vivez vos émotions à travers votre esprit et vos valeurs. Vous avez besoin de liberté jusque dans la proximité, et d’amitiés qui partagent vos idéaux.",
        "Votre cœur est un océan : bon, intuitif et ouvert à la peine des autres. Vous avez besoin de moments de calme pour revenir à vous."
      ],
      sun: [
        "Ce qui vous anime, c’est l’envie de lancer des choses et d’ouvrir la voie. Le courage est votre carburant ; la patience est l’art de le transformer en réussite.",
        "Ce qui vous anime, c’est le désir de bâtir quelque chose de durable. Votre constance fait votre force, tant qu’elle ne se durcit pas en entêtement.",
        "Ce qui vous anime, c’est la curiosité. Vous apprenez, vous créez des liens, vous communiquez, et vous rayonnez quand vous avez de l’espace pour explorer.",
        "Ce qui vous anime, c’est le besoin de protéger et de prendre soin. La famille et le sentiment d’appartenance donnent tout son sens à votre vie.",
        "Ce qui vous anime, c’est le désir de créer et d’être pleinement vous-même. Vous avez une chaleur naturelle qui illumine toute une pièce.",
        "Ce qui vous anime, c’est le désir de bien faire les choses. C’est dans le savoir-faire, l’attention et le service que se révèle votre excellence discrète.",
        "Ce qui vous anime, c’est le désir de créer l’harmonie. Vous voyez les deux côtés de chaque chose, et votre don est de rapprocher les gens ; votre défi, c’est de faire confiance à votre propre jugement.",
        "Ce qui vous anime, c’est le besoin d’aller au fond des choses. Vous avez une volonté rare et la force de vous transformer après chaque épreuve.",
        "Ce qui vous anime, c’est la quête de sens. Il vous faut de grands horizons, des réponses sincères et la liberté de suivre votre propre chemin.",
        "Ce qui vous anime, c’est le désir d’accomplir. Vous gravissez les marches lentement mais sûrement, et ce que vous bâtissez avec les années tient solidement debout.",
        "Ce qui vous anime, ce sont vos idéaux. Vous pensez en avance sur votre temps et vous voulez améliorer la vie du plus grand nombre, pas seulement de quelques-uns.",
        "Ce qui vous anime, ce sont la compassion et l’imagination. Votre vie trouve son sens dans le fait d’aider, de créer et de croire."
      ],
      gift: {
        sun: "Votre don, c’est votre présence et votre capacité à entraîner les autres. Quand vous vous avancez, les gens écoutent ; vous avez tout pour briller et inspirer.",
        moon: "Votre don, c’est votre sensibilité. Vous lisez les personnes et les situations d’instinct, et votre présence fait du bien à ceux qui vous entourent.",
        mercury: "Votre don, c’est votre esprit. Vous comprenez vite, vous expliquez clairement et vous trouvez toujours la solution astucieuse à n’importe quel problème.",
        venus: "Votre don, c’est votre charme et votre sens de la beauté. On se sent bien auprès de vous, et c’est dans l’amour, l’art et la bienveillance que votre vie s’épanouit.",
        mars: "Votre don, c’est votre courage et votre élan. Là où d’autres hésitent, vous agissez, et cette énergie peut soulever des montagnes quand elle a un but clair.",
        jupiter: "Votre don, c’est votre confiance en la vie et votre générosité. La chance a tendance à vous trouver, et ce que vous donnez de bon cœur vous revient au centuple.",
        saturn: "Votre don, c’est votre endurance. Vous savez attendre, travailler et bâtir ce que d’autres abandonnent, et votre réussite dure parce qu’elle est méritée."
      },
      giftTone: {
        ease: "Ce don vous vient tout naturellement.",
        work: "Ce don grandit avec la pratique : plus vous vous en servez, plus il se renforce.",
        hard: "Ce don se forge dans l’épreuve : les chemins difficiles de votre vie sont justement ceux où il prend forme."
      },
      loveStyle: {
        fire: "En amour, vous vivez avec passion et vous allez droit au but. Le coup de foudre vous connaît, vous admirez sans vous cacher et vous voulez quelqu’un qui entretienne la flamme.",
        earth: "En amour, vous êtes fidèle et sincère. Vous montrez vos sentiments par vos attentions et votre présence, et vous aimez pour durer.",
        air: "En amour, vous avez besoin de complicité autant que de passion. Une bonne conversation et votre liberté comptent pour vous autant que la romance.",
        water: "En amour, vous allez en profondeur. Vous avez besoin de proximité, de confiance et de quelqu’un qui vous comprenne vraiment."
      },
      partner: "Votre cœur penche pour une personne {who}.",
      partnerSign: [
        "audacieuse, courageuse et pleine d’énergie",
        "calme, stable et sensuelle",
        "vive, pleine d’esprit et qui a de la conversation",
        "tendre, sensible et attachée à la famille",
        "chaleureuse, fière et généreuse",
        "réfléchie, pratique et attentive",
        "élégante, juste et avec qui tout est simple",
        "intense, profonde et loyale",
        "libre, sincère et aventureuse",
        "sérieuse, ambitieuse et sur qui l’on peut compter",
        "indépendante, originale et capable d’une vraie amitié",
        "douce, rêveuse et pleine de compassion"
      ],
      loveEase: "L’amour vient souvent à vous sans trop de difficultés.",
      loveLate: "La bonne relation peut se faire attendre ; celle que vous construirez avec la maturité sera celle qui dure.",
      loveMixed: "En amour, le bon moment et vos propres choix comptent plus que la chance.",
      work: {
        "1": "Vous donnez le meilleur de vous-même quand votre travail exprime qui vous êtes : votre nom, votre style, votre initiative.",
        "2": "Votre carrière est étroitement liée à l’argent et aux ressources : la finance, le commerce ou tout ce qui crée une valeur concrète.",
        "3": "Vous vous épanouissez dans les métiers de la parole et du mouvement : l’écriture, l’enseignement, la vente, les médias ou tout ce qui relie les gens.",
        "4": "Vous réussissez dans ce qui touche à la maison, à la terre, à la famille ou aux racines : l’immobilier, une entreprise familiale ou un travail mené depuis chez vous.",
        "5": "Votre vocation passe par la créativité, la joie ou les enfants : l’art, le spectacle, le design, l’éducation ou tout ce dans quoi vous pouvez mettre votre cœur.",
        "6": "Vous brillez par votre savoir-faire et votre sens du service : la santé, l’artisanat, les métiers techniques ou un rôle où vous faites mieux fonctionner les choses.",
        "7": "Votre chemin passe par les autres : les clients, un partenariat, le conseil, le droit ou tout travail mené en face à face.",
        "8": "Les métiers profonds et à fort enjeu vous attirent : la finance, la recherche, la psychologie, l’investissement ou la gestion des ressources d’autrui.",
        "9": "Votre vocation regarde loin : l’enseignement, les voyages, l’étranger, le droit, l’édition ou tout ce qui élargit les horizons.",
        "10": "Votre place est dans un rôle visible : diriger, bâtir votre réputation et mener une carrière que l’on reconnaît.",
        "11": "Vous grandissez grâce aux réseaux et aux communautés : les équipes, les organisations, internet ou un travail au service d’un groupe plus large.",
        "12": "C’est dans le calme, en coulisse, que votre travail est le plus beau : la recherche, le soin, le travail spirituel ou tout ce qui demande solitude et profondeur."
      },
      workSaturn: "La réussite vient pas à pas, mais elle vient pour rester.",
      workJupiter: "Les portes ont tendance à s’ouvrir pour vous ; dites oui aux occasions qui vous font grandir.",
      money: "L’argent vous vient le plus souvent par {src}.",
      src: {
        "1": "votre propre talent, vos compétences et votre esprit d’initiative",
        "2": "vos propres ressources et ce que vous avez déjà entre les mains",
        "3": "la parole : l’écriture, la vente, les échanges, les petits voyages, vos frères et sœurs ou vos voisins",
        "4": "la maison, l’immobilier, la famille et ce dont vous avez hérité",
        "5": "la créativité, le divertissement, des risques bien pesés ou les enfants",
        "6": "votre travail quotidien, votre savoir-faire, le service aux autres ou le monde de la santé",
        "7": "vos associés, vos clients, le mariage ou les accords que vous concluez",
        "8": "l’argent des autres : investissements, prêts, héritages ou biens partagés",
        "9": "l’étranger, l’enseignement, le droit, les livres ou les voyages",
        "10": "votre carrière, votre position et votre bonne réputation",
        "11": "vos amis, vos relations, ceux qui vous soutiennent et les fruits de votre travail",
        "12": "un travail discret en coulisse, les institutions, les lieux lointains ou retirés et les affaires confidentielles"
      },
      style: {
        saturn: "Avec l’argent, vous faites preuve de prudence et de patience ; une croissance lente et sûre et des biens durables vous conviennent le mieux.",
        jupiter: "Avec l’argent, vous voyez grand ; la croissance, l’apprentissage et la générosité finissent souvent par vous rapporter.",
        mars: "Avec l’argent, vous avez de l’audace et vous allez vite ; vous pouvez gagner gros, alors fixez-vous des limites claires.",
        venus: "Avec l’argent, la beauté et le confort vous attirent ; les partenariats et tout ce qui plaît aux gens peuvent vous rapporter.",
        mercury: "Avec l’argent, vous avez l’esprit vif et astucieux ; le commerce, les idées et l’information sont vos outils.",
        moon: "Vos finances vont par cycles ; fiez-vous à votre instinct et mettez de côté pendant les bons mois pour les mois plus calmes.",
        sun: "Avec l’argent, vous réussissez mieux quand vous êtes aux commandes ; votre propre entreprise ou un rôle qui porte votre nom vous convient."
      },
      now: "En ce moment, vous vivez une période {season}",
      year: "Cette année, la vie met en lumière {topics}.",
      yearBiz: "Cette année, l’accent est mis sur {topics}.",
      advice: {
        sun: "Croyez en votre valeur, même quand les autres ne la voient pas encore. Votre lumière n’a besoin de la permission de personne.",
        moon: "Prenez soin de vos émotions et de votre corps ; pour vous, le repos n’est pas un luxe. Quand vous vous sentez en sécurité, tout le reste trouve sa place.",
        mercury: "Prenez votre temps avant les grandes décisions, et dites clairement ce que vous pensez. Votre esprit est vif ; laissez-lui le temps d’aller au bout de sa pensée.",
        venus: "Choisissez des personnes qui vous font du bien, pas seulement des personnes agréables. Votre cœur mérite un amour qui vous respecte aussi.",
        mars: "Choisissez vos combats. Votre énergie est précieuse ; quand la colère monte, transformez-la en action plutôt qu’en conflit.",
        jupiter: "Ne promettez pas plus que vous ne pouvez donner, et n’accordez pas votre confiance trop vite. Votre espoir est un cadeau ; laissez la sagesse le guider.",
        saturn: "Accordez-vous un peu de douceur. Vous n’avez pas à tout porter sur vos épaules, et les choses s’arrangeront même si vous lâchez un peu prise."
      },
      asc: [
        "Au premier regard, on perçoit chez vous de l’audace et de la vie. Vous agissez vite, vous dites ce que vous pensez et vous apportez de l’énergie partout où vous passez ; votre bonheur, c’est d’ouvrir la voie.",
        "Au premier regard, vous dégagez du calme et de l’assurance. Vous prenez votre temps, vous avez bon goût et, une fois votre décision prise, vous vous y tenez.",
        "On remarque tout de suite votre vivacité et votre aisance à parler. Votre esprit va vite, vous vous adaptez facilement et vous vous illuminez dès qu’il y a quelque chose de nouveau à apprendre.",
        "On sent chez vous de la douceur et de la bienveillance. Derrière une première impression réservée se cache un cœur tendre qui se souvient de tout et protège ceux qu’il aime.",
        "Vous dégagez de la chaleur et de la confiance. Vous avez une présence naturelle, un cœur généreux, et vous aimez faire partie de quelque chose qui compte vraiment.",
        "On devine chez vous un esprit réfléchi et compétent. Vous remarquez les détails qui échappent aux autres et, sans bruit, vous améliorez les choses.",
        "Vous avez une élégance naturelle et l’on se sent bien avec vous. Vous apportez équilibre, justice et beauté, et c’est dans les relations que vous rayonnez.",
        "Vous dégagez du calme, mais il y a en dessous une grande profondeur. Vous ressentez intensément, vous accordez votre confiance lentement et vous n’oubliez jamais une gentillesse.",
        "Vous dégagez de l’ouverture, de la franchise et de la liberté. Vous aimez apprendre, voyager et voir les choses en grand.",
        "Vous dégagez du sérieux et de la fiabilité : on sent tout de suite qu’on peut compter sur vous. Vous savez ce que vous voulez et vous y allez marche après marche ; avec le temps, la vie a tendance à devenir plus douce pour vous.",
        "On remarque tout de suite votre originalité et votre indépendance. Vous pensez par vous-même, vous tenez aux gens et vous n’avez pas peur de faire les choses autrement.",
        "Vous dégagez de la bonté et de l’imagination. Vous sentez ce que ressentent les autres, et l’art, la musique et la dimension spirituelle de la vie vous parlent au cœur."
      ],
      temp: {
        choleric: "Il y a du feu dans votre nature : de la passion, de l’ambition et des réactions rapides. Apprendre à marquer une pause avant d’agir, voilà votre super-pouvoir.",
        sanguine: "Il y a de la chaleur et de la légèreté dans votre nature : vous aimez la vie, et les gens aiment votre compagnie. Tenir vos promesses rend ce charme encore plus fort.",
        melancholic: "Il y a de la profondeur dans votre nature : vous réfléchissez avant d’agir et vous remarquez ce qui échappe aux autres. Ne laissez pas l’inquiétude vous voler la joie de ce que vous avez construit.",
        phlegmatic: "Il y a du calme dans votre nature : vous apportez la paix et la patience partout où vous allez. Un peu plus d’audace vous mènera plus loin que vous ne l’imaginez."
      },
      season: {
        sun: "de lumière : c’est le moment de vous montrer, de prendre les devants et de défendre clairement ce en quoi vous croyez.",
        moon: "de changements et d’émotions : la maison, la famille et votre vie intérieure demandent de l’attention, et les choses se réorganisent autour de ce dont vous avez vraiment besoin.",
        mercury: "de découvertes et d’échanges : conversations, études, projets et décisions sont en mouvement ; votre esprit est aujourd’hui votre meilleur outil.",
        venus: "d’amour et de plaisir : les relations, la beauté et les réconciliations passent au premier plan ; autorisez-vous à profiter de la vie et à vous laisser aimer.",
        mars: "d’action et de courage : les défis vous poussent à décider et à avancer ; agissez avec audace, mais ne vous précipitez pas dans les conflits.",
        jupiter: "de croissance et de belles occasions : des portes s’ouvrent, des guides apparaissent et l’espoir revient ; simplement, n’en faites pas trop.",
        saturn: "de construction et de maturité : la vie vous demande patience et responsabilité, et ce que vous bâtissez maintenant est fait pour durer.",
        node: "de nouveaux désirs : quelque chose de neuf et d’inconnu vous attire vers l’avant, et cela pourrait prendre plus d’ampleur que prévu.",
        snode: "d’adieux : un ancien chapitre se referme ; laisser partir ce qui est terminé fait de la place pour la suite."
      },
      yearTopic: {
        "1": "qui vous êtes : votre corps, votre image et un nouveau départ",
        "2": "l’argent, vos revenus et ce qui compte vraiment pour vous",
        "3": "l’apprentissage, les conversations, les petits voyages, vos frères et sœurs et vos voisins",
        "4": "la maison, la famille, vos racines et le lieu auquel vous appartenez",
        "5": "l’amour, la joie, la créativité et les enfants",
        "6": "la santé, vos habitudes quotidiennes et votre rythme de travail",
        "7": "la vie à deux, le mariage et les personnes qui vous sont les plus proches",
        "8": "les transformations profondes, l’argent partagé et la nécessité de tourner la page",
        "9": "les voyages, les études, la foi et les grandes questions de la vie",
        "10": "votre carrière, vos ambitions et votre place dans le monde",
        "11": "les amis, la communauté et vos espoirs pour l’avenir",
        "12": "le repos, le travail intérieur, la guérison et l’art de lâcher prise"
      }
    },
    trackShort: {
      note: "Pour améliorer les lectures, ce que vous saisissez est enregistré.",
      stop: "Ne pas enregistrer",
      start: "Enregistrer à nouveau",
      off: "Enregistrement désactivé."
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
