/* Akhtarnameh — chaînes françaises des sections Amour, Argent, Achat et vente, et Conversation (fusionnées dans le catalogue français). */
(function (G) {
  const D = G.I18N_DATA = G.I18N_DATA || {};
  const merge = (a, b) => { Object.keys(b).forEach(k => { if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') merge(a[k], b[k]); else a[k] = b[k]; }); return a; };
  merge(D.fr = D.fr || {}, {
    ui: {
      tab: { love: 'Amour et compatibilité', money: 'Argent et richesse', trade: 'Achat et vente', chat: 'Parler à l’astrologue' },
      love: {
        title: 'Amour et compatibilité', intro: 'Votre nature amoureuse d’après votre propre thème, et la compatibilité avec une autre personne jugée selon Ptolémée, le Guna Milan indien et les piliers chinois.',
        you: 'Votre thème :', change: 'modifier', partner: 'L’autre personne', submit: 'Lire l’amour et la compatibilité',
        hint: 'Laissez vide la partie consacrée à l’autre personne pour ne lire que votre propre thème amoureux. Une heure de naissance inconnue permet tout de même l’essentiel de la comparaison.',
        yourChart: 'Votre thème', partnerName: 'l’autre personne', sampleNote: 'Ceci utilise le thème d’exemple. Saisissez vos propres données de naissance dans l’onglet Thème natal pour une lecture personnelle.',
        head: 'Amour, mariage et compatibilité', compat: 'Compatibilité d’ensemble', synTitle: 'La rencontre des deux thèmes', natalTitle: 'Votre nature amoureuse',
        partnerNoTime: 'L’heure de naissance de l’autre personne est inconnue : son Ascendant, ses maisons et le degré exact de sa Lune sont approximatifs.',
        addPartner: 'Ajoutez les données de naissance de l’autre personne pour voir votre compatibilité.'
      },
      money: {
        title: 'Argent et richesse', intro: 'D’où vient l’argent dans votre thème, comment vous le retenez, votre style financier, le moment présent et le calendrier des marchés à venir.',
        range: 'Période du calendrier', d90: 'Trois mois', submit: 'Lire l’argent et le moment', head: 'Argent, richesse et moment financier',
        natalTitle: 'Votre thème de l’argent', calTitle: 'Calendrier des marchés : les {n} prochains jours'
      },
      trade: {
        title: 'Achat et vente', intro: 'Faut-il acheter ou vendre maintenant, et quel est le meilleur moment ? Jugé selon les règles de Lilly sur l’achat et la vente, et selon les élections d’al-Biruni et de Bonatti.',
        action: 'Je veux', buy: 'Acheter', sell: 'Vendre', asset: 'Quoi', submit: 'Juger maintenant et trouver les meilleurs moments',
        disclaimer: 'Ceci est un jugement astrologique traditionnel, et non un conseil financier. Les marchés comportent des risques réels : décidez d’après vos propres recherches ou avec un conseiller qualifié.',
        head: { buy: 'Achat : {asset}', sell: 'Vente : {asset}' }, nowTitle: 'En ce moment', scaleNo: 'Attendre', scaleYes: 'Agir',
        bestTitle: { buy: 'Meilleurs moments pour acheter', sell: 'Meilleurs moments pour vendre' },
        rules: 'Règles : l’acheteur est l’Ascendant et le vendeur la maison VII ; la maison X montre le prix et la maison IV l’issue de l’affaire. On achète quand la Lune décroît en lumière et on vend quand elle croît (al-Biruni, Bonatti) ; on évite la Lune vide de course et Mercure rétrograde ; on préfère la planète de l’actif forte et la Lune s’appliquant à un bénéfique.'
      },
      chat: {
        title: 'Parler à l’astrologue', intro: 'Demandez ce que vous voulez : l’amour, l’argent, l’achat et la vente, le travail, l’année à venir. Chaque question est aussi dressée en thème horaire pour l’instant où elle est posée.',
        useNatal: 'Utiliser mon thème natal', usePartner: 'Inclure l’autre personne (onglet Amour)', where: 'Je me trouve à', ph: 'Écrivez votre question…',
        clear: 'Effacer la conversation', note: 'Les réponses sont un jugement symbolique traditionnel, non une certitude.', astrologer: 'Astrologue', ruleFrom: 'Astrologue (règles classiques)',
        welcome: 'Bienvenue. Je lis votre thème avec les méthodes de Ptolémée, d’Abu Ma’shar, d’al-Biruni, de Lilly, de Parashara et des maîtres chinois. Interrogez-moi sur l’amour, l’argent, l’achat et la vente, le travail ou l’année à venir. Pour une lecture personnelle, saisissez d’abord vos données de naissance dans l’onglet **Thème natal**.'
      }
    },
    err: { natalFirst: 'Dressez d’abord votre thème natal dans l’onglet Thème natal.' },
    ai: {
      loveTitle: 'Interroger l’astrologue sur l’amour', lovePh: 'p. ex. Quand rencontrerai-je la bonne personne ?',
      loveSugg: ['Quand s’ouvre ma prochaine fenêtre pour l’amour ?', 'Quel partenaire me convient vraiment ?', 'Quel schéma se répète dans mes relations ?'],
      loveSuggPair: ['Sommes-nous vraiment compatibles ?', 'Qu’est-ce qui nous unira, et qu’est-ce qui pourrait nous séparer ?', 'Un mariage entre nous est-il une bonne idée, et quand ?'],
      moneyTitle: 'Interroger l’astrologue sur l’argent', moneyPh: 'p. ex. Quel domaine me rapportera le plus ?',
      moneySugg: ['D’où vient vraiment mon argent ?', 'Cette année est-elle bonne pour investir ?', 'Suis-je fait pour le salariat ou pour ma propre affaire ?'],
      tradeTitle: 'Interroger l’astrologue sur cette affaire', tradePh: 'p. ex. Dois-je attendre la semaine prochaine ?',
      tradeSugg: ['Dois-je agir maintenant ou attendre ?', 'Le prix va-t-il plutôt monter ou baisser ?', 'Quel est le plus grand risque de cette affaire ?'],
      chatSugg: ['Vais-je trouver l’amour cette année ?', 'Est-ce un bon moment pour investir ?', 'Dois-je acheter ou vendre maintenant ?', 'Vais-je obtenir ce poste ?', 'Comment s’annonce pour moi l’année à venir ?']
    },
    syn: {
      meter: { attraction: 'Attirance', harmony: 'Harmonie', durability: 'Durée', friction: 'Friction' },
      scoresTitle: 'Notes', scores: 'Attirance {a}, harmonie {h}, durée {d}, friction {f} (sur 10).',
      overallTitle: 'Compatibilité : {pct} %',
      overall: {
        strong: 'Un lien solide : l’attirance, l’entente et la constance se soutiennent mutuellement. Les textes classiques rangent de telles unions parmi les plus heureuses.',
        good: 'Une bonne entente : une affinité réelle, avec quelques points qui demandent une attention consciente.',
        work: 'Un lien qui demande du travail : il existe un point de rencontre, mais les différences sont importantes et la relation ne grandit qu’avec l’effort et la maturité.',
        hard: 'Une combinaison difficile : les deux thèmes tirent dans des directions différentes. Elle peut beaucoup enseigner, mais l’harmonie ne viendra pas d’elle-même.'
      },
      overallWhy: 'Synastrie : attirance {a}, harmonie {h}, durée {d}, friction {f} ; Guna Milan : {k}/36.',
      ptolTitle: 'La règle des luminaires selon Ptolémée (Tétrabible IV, 5)',
      ptol: {
        lights: 'Le Soleil de l’un et la Lune de l’autre se trouvent dans le même signe ou dans des signes harmonieux : premier signe, selon Ptolémée, d’une union durable et concordante.',
        exchange: 'Le Soleil de l’un est conjoint à la Lune de l’autre : la signature classique du mariage et d’une profonde reconnaissance mutuelle.',
        moons: 'Les deux Lunes sont dans le même signe ou dans des signes harmonieux : la vie quotidienne, les humeurs et les besoins s’accordent naturellement.',
        none: 'Les luminaires ne sont pas en signes harmonieux : selon la règle de Ptolémée, la concorde doit se bâtir par d’autres liens, comme Vénus, Jupiter et un projet commun.'
      },
      contact: '{a} {asp} {b}',
      contactText: {
        conj: 'Chez l’un, « {x} » fusionne avec « {y} » chez l’autre (orbe {orb}°) : un lien fort et immédiat dans ce domaine.',
        easy: 'Chez l’un, « {x} » soutient « {y} » chez l’autre (orbe {orb}°) : aisance et compréhension naturelle en ce domaine.',
        hard: 'Chez l’un, « {x} » défie « {y} » chez l’autre (orbe {orb}°) : un magnétisme qui apporte aussi une tension à dénouer.'
      },
      saturnNote: 'Les contacts de Saturne sont le ciment des longues relations : ils lient et stabilisent, mais peuvent aussi peser ou restreindre.',
      overlayTitle: 'Les planètes de chacun dans les maisons de l’autre',
      overlay: { b2a: 'Une planète de l’autre ({p}) tombe dans votre maison {h} : {meaning}', a2b: 'Une de vos planètes ({p}) tombe dans sa maison {h} : {meaning}' },
      ovh: { 1: 'ressentie fortement et personnellement ; elle façonne la manière dont l’autre se voit.', 5: 'la romance, le jeu et le plaisir.', 7: 'la maison même du mariage : une attirance naturelle vers l’union.', 8: 'l’intensité, l’intimité et les ressources partagées.', 12: 'quelque chose de caché ou de karmique ; un lien difficile à expliquer.' },
      kootaTitle: 'Guna Milan (Ashtakoota) : {n} sur 36',
      koota: { varna: 'Varna', vashya: 'Vashya', tara: 'Tara', yoni: 'Yoni', maitri: 'Graha Maitri', gana: 'Gana', bhakoot: 'Bhakoot', nadi: 'Nadi' },
      kootaVerdict: { excellent: 'Excellent selon la norme indienne (28 ou plus).', good: 'Bon (24 ou plus).', fair: 'Acceptable (18 ou plus), le minimum traditionnel pour le mariage.', weak: 'En dessous du minimum traditionnel de 18.' },
      nadiDosha: 'Nadi dosha : les deux Lunes sont dans la même nadi, ce que les textes tiennent pour la discordance la plus grave, surtout pour la santé et les enfants ; il existe de nombreuses annulations.',
      bhakootDosha: 'Bhakoot dosha : les signes lunaires sont en relation 2-12, 5-9 ou 6-8, ce qui peut grever les finances ou l’harmonie.',
      kootaNote: 'Calculé d’après la Lune sidérale de chacun (Vashya et Yoni simplifiés).',
      baziTitle: 'Piliers chinois : maîtres du jour et branches',
      baziDm: {
        same: 'Les deux maîtres du jour sont de la même phase ({a} et {b}) : des pairs et des alliés, parfois des rivaux.',
        aFeedsB: 'Votre maître du jour, {a}, nourrit le sien ({b}) : vous donnez et soutenez ; l’autre s’épanouit grâce à vous.',
        bFeedsA: 'Son maître du jour, {b}, nourrit le vôtre ({a}) : l’autre vous soutient et vous aide à grandir.',
        aControlsB: 'Votre maître du jour, {a}, contrôle le sien ({b}) : dans le Zi Ping classique, c’est l’étoile de l’épouse pour un homme, un appariement traditionnel, tant que le contrôle ne devient pas domination.',
        bControlsA: 'Son maître du jour, {b}, contrôle le vôtre ({a}) : dans le Zi Ping classique, c’est l’étoile du mari pour une femme, un appariement traditionnel qui apporte structure et défi.'
      },
      baziDay: { clash: 'Les deux branches du jour (palais du conjoint) s’entrechoquent : une relation vivante, mais sujette aux frictions dans la vie commune.', harmony: 'Les deux branches du jour forment une des six harmonies : un accord secret et naturel entre les palais du conjoint.', same: 'Les branches du jour sont identiques : des besoins semblables dans l’intimité.', neutral: 'Les branches du jour sont neutres l’une envers l’autre.' },
      baziYear: { clash: 'Les animaux de l’année, {a} et {b}, s’entrechoquent.', harmony: 'Les animaux de l’année, {a} et {b}, forment une paire harmonieuse.', trine: 'Les animaux de l’année, {a} et {b}, appartiennent au même trigone d’alliés.', neutral: 'Les animaux de l’année, {a} et {b}, sont neutres l’un envers l’autre.' }
    },
    love: {
      venusTitle: 'Vénus : votre manière d’aimer', venus: 'Vénus à {pos}, maison {h}, {word}.',
      venusEl: { fire: 'Vous aimez avec feu : ouvertement, vite, dans l’admiration et la conquête.', earth: 'Vous aimez par les sens et par la fidélité : lentement, concrètement, pour la durée.', air: 'Vous aimez par l’esprit : la conversation, l’amitié et la liberté comptent autant que la passion.', water: 'Vous aimez profondément et avec émotion : il vous faut la proximité, la confiance et le sentiment d’être vraiment compris.' },
      venusStrong: 'Une Vénus forte donne du charme et de la chance en amour ; l’affection vient à vous.', venusWeak: 'Une Vénus faible signifie que l’amour demande plus d’efforts et de discernement ; les déceptions enseignent ce à quoi vous tenez vraiment.', venusMid: 'Vénus est moyenne : l’amour dépend des choix et du moment.',
      venusRetro: 'Vénus rétrograde à la naissance : l’amour est réexaminé ; d’anciens liens reviennent, et le cœur choisit tard, mais en connaissance de cause.', venusCombust: 'Vénus combuste : les sentiments sont cachés ou éclipsés par le devoir et l’ego ; l’amour grandit lorsqu’il est mis au grand jour.',
      marsTitle: 'Mars : le désir et la conquête', mars: 'Mars à {pos}, maison {h}.',
      marsEl: { fire: 'Le désir est direct et audacieux ; vous poursuivez ouvertement.', earth: 'Le désir est constant et physique ; vous prouvez votre amour par les actes.', air: 'Le désir naît dans l’esprit ; la vivacité et les mots vous éveillent.', water: 'Le désir est émotionnel et intense ; il vous faut un lien profond.' },
      partnerTitle: 'Le partenaire qui vous attire (maison VII)', desc: 'Le Descendant est en {sign} ; le partenaire tend à montrer cette nature :',
      lord7: 'Le maître de la maison VII, {p}, se trouve en maison {h} et est {word} : c’est à travers {topics} que l’on rencontre ses partenaires, et le mariage y est étroitement lié.',
      in7: { sun: 'Le Soleil en maison VII : un partenaire de rang et de fort caractère ; vous pouvez vous définir à travers la relation.', moon: 'La Lune en maison VII : un fort besoin d’union ; le partenaire est attentionné, ou changeant.', mercury: 'Mercure en maison VII : un partenaire jeune d’esprit, communicatif, ou lié au travail et au commerce.', venus: 'Vénus en maison VII : l’un des meilleurs signes d’un mariage heureux et harmonieux.', mars: 'Mars en maison VII : de la passion, mais aussi des querelles ; un partenaire à forte volonté.', jupiter: 'Jupiter en maison VII : un partenaire généreux, sage ou fortuné ; le mariage apporte la croissance.', saturn: 'Saturne en maison VII : un engagement tardif ou grave, souvent avec un partenaire plus âgé ou responsable ; durable une fois scellé.' },
      ptolTitle: 'Le significateur du conjoint selon Ptolémée',
      ptolM: 'Pour un homme, Ptolémée juge l’épouse d’après la Lune. Significatrice : {p}, à {pos}, maison {h}, dans un signe {mode}.',
      ptolF: 'Pour une femme, Ptolémée juge le mari d’après le Soleil. Significateur : {p}, à {pos}, maison {h}, dans un signe {mode}.',
      ptolMode: { movable: 'Un signe cardinal : le mariage peut venir tôt, ou plus d’une fois.', fixed: 'Un signe fixe : un seul mariage durable est indiqué.', common: 'Un signe mutable : plus d’une union importante est possible.' },
      ptolHit: { ben: 'L’aspect formé avec {p} ({asp}) promet un conjoint bon et secourable.', benHard: 'L’aspect formé avec {p} ({asp}) donne un bienfait mêlé d’excès.', malEasy: 'L’aspect formé avec {p} ({asp}) ajoute du sérieux et de la constance.', mal: 'L’aspect formé avec {p} ({asp}) apporte friction, retard ou un partenaire exigeant.' },
      easeTitle: 'Facilité ou retard dans le mariage',
      d: { satVenus: 'Saturne afflige Vénus', sat7: 'Saturne touche le Descendant', venusRetro: 'Vénus est rétrograde', satIn7: 'Saturne occupe la maison VII', lord7cadent: 'le maître de la maison VII est dans une maison cachée' },
      e: { jupVenus: 'Jupiter aide Vénus', benIn7: 'un bénéfique occupe la maison VII', lord7good: 'le maître de la maison VII est bien placé', moonVenus: 'la Lune et Vénus s’accordent' },
      easeList: 'En faveur : {list}.', delayList: 'Facteurs de retard : {list}.',
      easeVerdict: 'L’amour et le mariage viennent assez facilement.', delayVerdict: 'L’engagement tend à venir plus tard, avec la maturité ; ce qui se bâtit alors est solide.', mixedVerdict: 'Facilité et retard s’équilibrent : le moment et les choix décident.',
      vedTitle: 'Le regard indien : le maître de la maison VII et le navamsa', ved: 'Maître sidéral de la maison VII : {lord}, dans le bhava {h} ({topics}). Dans le navamsa (le thème du mariage), Vénus est en {nav}.',
      navEl: { fire: 'Un conjoint fougueux et indépendant.', earth: 'Un conjoint pratique et fidèle.', air: 'Un conjoint sociable et intelligent.', water: 'Un conjoint sensible et dévoué.' },
      manglik: 'La position de Mars (Kuja dosha) est présente : la tradition conseille un partenaire ayant un Mars semblable, ou de la patience avant de se marier.',
      baziTitle: 'Le regard chinois : le palais du conjoint', bazi: 'Votre palais du conjoint (branche du jour) contient {g} : {gt}',
      baziInter: 'Le palais du conjoint est impliqué dans : {list}.', baziCalm: 'Le palais du conjoint n’est pas perturbé : une image intérieure stable de la vie à deux.',
      baziStarM: 'Pour un homme, l’étoile de l’épouse est l’élément {el} ; sa force dans le thème : {n}.', baziStarF: 'Pour une femme, l’étoile du mari est l’élément {el} ; sa force dans le thème : {n}.', baziStarX: 'Choisissez un sexe dans les réglages du thème natal pour lire l’étoile du conjoint.',
      w: { prof: 'l’année de profection active la maison {h} (maître : {p})', firdar: 'la firdaria de Vénus est en cours', firdarSub: 'la sous-période de Vénus de la firdaria est en cours', dasha: 'la mahadasha en cours ({p})', antar: 'l’antardasha en cours ({p}), jusqu’au {to}' },
      timingTitle: 'Le moment de l’amour', timingNow: 'Actif en ce moment : {list}. C’est une période favorable pour rencontrer quelqu’un ou s’engager.', timingQuiet: 'Aucun des principaux maîtres du temps de l’amour n’est actif en ce moment.',
      jup7: 'Jupiter, le grand bénéfique, traverse votre septième signe ({sign}) : {when} ; traditionnellement, la fenêtre la plus forte pour le mariage.', jupVenus: 'Jupiter revient dans le signe de votre Vénus à partir du {when} : une saison de tendresse et d’occasions.'
    },
    money: {
      capacityTitle: 'Capacité de richesse (maison II)', house2: 'La maison II est en {sign} ; son maître, {p}, se trouve en maison {h} et est {word}.', source: 'L’argent arrive par {topics}.',
      src: { 1: 'votre propre personne, vos compétences et votre initiative', 2: 'vos propres ressources et ce que vous possédez déjà', 3: 'la communication, l’écriture, la vente, les courts voyages, la fratrie et les voisins', 4: 'la terre, l’immobilier, la famille et les fondations héritées', 5: 'la créativité, le divertissement, la spéculation et les enfants', 6: 'le service, l’emploi salarié, l’artisanat et les métiers de la santé', 7: 'les associés, les clients, le mariage et les contrats', 8: 'l’argent d’autrui : investisseurs, prêts, héritage et biens communs', 9: 'l’étranger, l’enseignement, le droit, l’édition et les voyages', 10: 'la carrière, l’autorité et la réputation publique', 11: 'les amis, les réseaux, les protecteurs et les bénéfices du métier', 12: 'le travail en coulisse, les institutions, les lieux lointains ou isolés et les affaires confidentielles' },
      in2: { sun: 'Le Soleil en maison II : on gagne par la position, le commandement et la visibilité ; on dépense pour son rang.', moon: 'La Lune en maison II : des revenus fluctuants ; on gagne grâce au public, à l’alimentation, au logement ou à tout ce qui change.', mercury: 'Mercure en maison II : on gagne par l’esprit : le commerce, l’écriture, l’enseignement, les chiffres.', venus: 'Vénus en maison II : un signe classique de richesse ; on gagne par la beauté, l’art, le plaisir ou l’association.', mars: 'Mars en maison II : on gagne avec audace et on dépense avec audace ; l’argent vient par l’effort, l’ingénierie ou le risque.', jupiter: 'Jupiter en maison II : la meilleure signature d’abondance ; l’argent croît et revient.', saturn: 'Saturne en maison II : une richesse bâtie lentement et gardée avec soin ; la gêne d’abord, la solidité ensuite.' },
      lotsTitle: 'Parts de Fortune et de Substance', fortune: 'La Part de Fortune à {pos}, maison {h} ({topics}) ; son maître, {p}, est {word}.', substance: 'La Part de Substance (Abu Ma’shar) à {pos}, maison {h} ({topics}) ; son maître, {p}, est {word}.',
      jupTitle: 'Jupiter, significateur de la richesse', jup: 'Jupiter à {pos}, maison {h} ({topics}), {word}.', jupStrong: 'Un Jupiter fort : les occasions se présentent, et la générosité revient multipliée.', jupWeak: 'Un Jupiter faible : la croissance demande de la discipline ; gare à l’excès d’engagements et à la confiance mal placée.', jupMid: 'Jupiter est moyen : la croissance suit l’effort et le bon conseil.',
      flowsTitle: 'Revenus, carrière et argent d’autrui', flows: 'Maître de la maison XI (revenus du travail) : {p11}, {w11}, en maison {h11}. Maître de la maison X (carrière) : {p10}, {w10}. Maître de la maison VIII (prêts, investisseurs, héritage) : {p8}, {w8}, en maison {h8}.',
      flows8: 'L’argent d’autrui est plus fort que vos propres revenus : associations, investisseurs, prêts ou héritage jouent un grand rôle.', flows11: 'Vos propres gains sont plus forts que l’argent d’autrui : bâtissez vos revenus sur votre travail et votre réseau.', flowsEven: 'Revenus propres et argent d’autrui s’équilibrent.',
      styleTitle: 'Votre tempérament financier', style: 'Planète qui mène votre argent : {p} ; en second : {q}.',
      styleText: { value: 'Style saturnien : patient, attaché à la valeur et au long terme ; l’immobilier, la terre et la capitalisation lente vous conviennent.', growth: 'Style jupitérien : croissance et expansion ; l’éducation, l’édition, le droit, les entreprises internationales.', aggressive: 'Style martien : rapide, combatif et preneur de risques ; fixez-vous des limites strictes.', beauty: 'Style vénusien : la beauté, le design, le luxe, l’hôtellerie et les associations.', trader: 'Style mercurien : le négoce, le commerce, la technologie et l’information ; des décisions rapides.', cyclical: 'Style lunaire : cyclique et intuitif ; les biens de consommation, l’alimentation, le logement ; surveillez les cycles.', leader: 'Style solaire : le commandement, votre propre entreprise et la réputation publique.' },
      styleSecond: 'Seconde note. {text}', uranus: 'Uranus touche vos maisons d’argent : gains et pertes soudains ; la technologie et l’inhabituel.', neptune: 'Neptune touche vos maisons d’argent : de l’intuition, mais aussi de la confusion ; vérifiez tout par écrit.',
      baziTitle: 'Le regard chinois : l’étoile de la richesse', bazi: 'Votre élément de richesse est {el} (force {n}) ; sa planète : {p}.',
      baziCase: { strongStrong: 'Un maître du jour fort et une étoile de richesse forte : vous pouvez porter une grande fortune. Les textes classiques parlent d’un thème riche.', strongWeak: 'Un maître du jour fort et une étoile de richesse faible : la capacité est là, mais les occasions doivent être créées ; la richesse arrive dans les piliers de chance favorables.', weakStrong: 'Un maître du jour faible face à une richesse forte : la richesse est visible mais lourde à tenir. Associations, soutiens et prudence avec les dettes sont essentiels.', weakWeak: 'Les deux sont modestes : une prospérité régulière et méritée plutôt que des aubaines ; constituez d’abord vos ressources.' },
      vedTitle: 'Le regard indien : les maîtres de la richesse et du gain', ved: 'Le maître de la maison II, {l2}, est dans le bhava {h2} ; le maître de la maison XI, {l11}, dans le bhava {h11}.', vedYogas: 'Yogas liés à la richesse : {list}.', vedNone: 'Aucun yoga classique de richesse ne ressort ; la richesse suit les dashas des maîtres des maisons II et XI.',
      t: { prof: 'l’année de profection active la maison {h}', profLord: 'le maître de l’année ({p}) gouverne une maison d’argent', jup: 'Jupiter transite votre maison {h}', sat: 'Saturne transite votre maison {h} (resserrer et consolider)', dasha: 'la mahadasha en cours ({p})', luck: 'le pilier de chance porte votre élément de richesse', zr: 'la libération zodiacale depuis la Fortune est dans une période culminante' },
      timingTitle: 'Le moment financier présent', timing: 'Actif en ce moment : {list}.', timingQuiet: 'Aucun grand maître du temps financier n’est actif en ce moment : une période de travail régulier et de préparation plutôt que de grands mouvements.'
    },
    cal: {
      newMoon: 'Nouvelle Lune en {sign}', fullMoon: 'Pleine Lune en {sign}',
      newMoonText: 'Un commencement : traditionnellement bon pour lancer, semer et acheter pour le long terme.', fullMoonText: 'Un aboutissement : les choses arrivent à maturité ; traditionnellement bon pour vendre et conclure, mauvais pour commencer.',
      station: { mercury: { retro: 'Mercure devient rétrograde : retards, malentendus et accords révisés. Lisez les contrats deux fois.', direct: 'Mercure reprend sa marche directe : la communication et les affaires s’éclaircissent.' }, venus: { retro: 'Vénus devient rétrograde : les valeurs et les prix sont réévalués ; évitez les achats de luxe.', direct: 'Vénus reprend sa marche directe : la confiance dans la valeur revient.' }, mars: { retro: 'Mars devient rétrograde : l’énergie se tourne vers l’intérieur ; évitez les manœuvres agressives.', direct: 'Mars reprend sa marche directe : l’élan revient.' } },
      eclipse: 'Les éclipses marquent des tournants soudains ; les astrologues traditionnels évitent de commencer ou de s’engager à leur approche.'
    },
    trade: {
      assetKw: {
        stocks: [' action', 'actionnaire', 'bourse', 'boursi', 'titres', 'etf', 'indice', 'cac 40', 'nasdaq', 'dividende', 'sicav', 'fonds indiciel'],
        crypto: ['crypto', 'bitcoin', 'btc', 'ethereum', 'ether', 'altcoin', 'stablecoin', 'jeton', 'blockchain', 'nft', 'solana', 'usdt'],
        gold: ["l'or", 'l’or', "d'or", 'd’or', ' or ', 'lingot', 'métaux précieux', 'métal précieux', 'argent métal', 'platine', 'napoléon'],
        currency: ['devise', 'forex', 'taux de change', 'bureau de change', 'dollar', 'des euros', 'mes euros', 'en euros', 'cours de l’euro', "cours de l'euro", 'franc suisse', 'livre sterling', 'yuan', 'rouble', 'roupie'],
        property: ['maison', 'appartement', 'appart', 'immobilier', 'immeuble', 'terrain', 'propriété', 'logement', 'studio', 'villa', 'local commercial', 'bien immobilier'],
        vehicle: ['voiture', 'automobile', 'véhicule', 'moto', 'scooter', 'camion', 'camionnette', 'bagnole'],
        goods: ['marchandise', 'produits', 'inventaire', 'lot de', 'cargaison', 'denrées', 'fournitures']
      },
      asset: { stocks: 'Actions et titres', crypto: 'Cryptomonnaie', gold: 'Or et métaux précieux', currency: 'Devises étrangères', property: 'Maison ou bien immobilier', vehicle: 'Voiture ou véhicule', goods: 'Biens et marchandises' },
      sig: { buy: 'Vous (l’acheteur) : {a} ; le vendeur : {b} ; le prix : {price} ; la chose : {thing} ; l’issue de l’affaire : {end}.', sell: 'Vous (le vendeur) : {a} ; l’acheteur : {b} ; le prix : {price} ; la chose : {thing} ; l’issue de l’affaire : {end}.' },
      sameLord: 'Une seule planète ({p}) gouverne les deux parties : l’affaire est entre vos mains.',
      deal: '{a} et {b} parfont un aspect ({asp}) le {date} : l’affaire peut se conclure.', noDeal: '{a} et {b} ne se rejoignent pas prochainement : il est peu probable que l’affaire se conclue maintenant.',
      edgeYou: 'Votre significateur, {a}, est plus fort que celui de l’autre partie ({b}) : l’avantage est de votre côté.', edgeThem: 'L’autre partie ({b}) est plus forte que vous ({a}) : l’avantage est de son côté ; négociez avec prudence.', edgeEven: 'Les deux parties ({a} et {b}) sont de force semblable.',
      price: { high: 'Le maître de la maison X ({p}) est fort et angulaire : le prix est élevé ou ferme.', low: 'Le maître de la maison X ({p}) est faible ou cadent : le prix est bas ou négociable.', fair: 'Le maître de la maison X ({p}) est moyen : le prix est juste.' },
      moonWaxing: 'La Lune croît en lumière : selon la tradition, les prix tendent à monter, ce qui favorise la vente.', moonWaning: 'La Lune décroît en lumière : selon la tradition, les prix tendent à baisser, ce qui favorise l’achat.',
      thing: 'La planète de l’actif, {p}, est {word}.', thingRetro: 'Elle est rétrograde : hésitations, retours ou défauts cachés.',
      end: 'Le maître de la maison IV, qui montre l’issue de l’affaire ({p}), est {word}.', mercRetro: 'Mercure, maître du commerce, est rétrograde : erreurs dans les papiers et revirements.',
      verdict: {
        buy: { go: 'Acheter : le ciel soutient l’achat dès maintenant.', lean: 'Plutôt acheter, en veillant au prix et aux conditions.', wait: 'Attendre : les signes sont partagés ; un meilleur moment figure ci-dessous.', no: 'Ne pas acheter maintenant : les témoignages s’y opposent.' },
        sell: { go: 'Vendre : le ciel soutient la vente dès maintenant.', lean: 'Plutôt vendre, en veillant au prix et aux conditions.', wait: 'Attendre : les signes sont partagés ; un meilleur moment figure ci-dessous.', no: 'Ne pas vendre maintenant : les témoignages s’y opposent.' }
      }
    },
    elr: { waningBuy: 'Lune décroissante (favorable à l’achat)', waxingBuy: 'Lune croissante (prix en hausse)', waxingSell: 'Lune croissante (favorable à la vente)', waningSell: 'Lune décroissante (prix en baisse)', edgeYou: 'votre significateur plus fort que l’autre partie', edgeThem: 'l’autre partie plus forte' },
    chat: {
      buyKw: ['achet', 'achèt', 'achat', 'acquérir', 'acquiers', 'acquisition', 'investir dans', 'investir en', 'placer mon argent dans', 'me procurer'],
      sellKw: ['vendre ', 'vendre?', 'vendre ', 'vendre,', 'vendre.', 'dois-je vendre', 'faut-il vendre', 'veux vendre', 'voudrais vendre', 'vends', 'vendu', 'vendant', 'vendrai', 'vendons', 'vendez', 'revend', ' vente', 'céder', 'cession', 'liquider', 'encaisser', 'prendre mes bénéfices', 'me débarrasser'],
      tradeIntro: 'Jugé selon les règles de Lilly sur l’achat et la vente, pour cet instant ({asset}) :', tradeMore: 'L’onglet Achat et vente indique les meilleurs moments à venir.',
      ruleIntro: 'Jugé selon les règles classiques de l’astrologie horaire, pour cet instant (sujet : {topic}) :',
      ruleNatal: 'Dans votre thème natal, maison {h} :',
      ruleNote: 'Pour une réponse plus complète, sous forme de conversation, ouvrez cette page dans Claude.'
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
