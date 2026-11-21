/* Akhtarnameh — textos en español de las secciones Amor, Dinero, Compra y venta y Chat (se fusionan con el catálogo español). */
(function (G) {
  const D = G.I18N_DATA = G.I18N_DATA || {};
  const merge = (a, b) => { Object.keys(b).forEach(k => { if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') merge(a[k], b[k]); else a[k] = b[k]; }); return a; };
  merge(D.es = D.es || {}, {
    ui: {
      tab: { love: 'Amor y compatibilidad', money: 'Dinero y riqueza', trade: 'Compra y venta', chat: 'Conversa con el astrólogo' },
      love: {
        title: 'Amor y compatibilidad', intro: 'Tu naturaleza amorosa según tu propia carta, y la compatibilidad con otra persona juzgada según Ptolomeo, el Guna Milan de la India y los pilares chinos.',
        you: 'Tu carta:', change: 'cambiar', partner: 'La otra persona', submit: 'Leer el amor y la compatibilidad',
        hint: 'Deja vacíos los datos de la otra persona para ver solo tu propia lectura amorosa. Aunque no se conozca la hora de nacimiento, la mayor parte de la comparación sigue siendo posible.',
        yourChart: 'Tu carta', partnerName: 'la otra persona', sampleNote: 'Se está usando la carta de ejemplo. Introduce tus propios datos de nacimiento en la pestaña Carta natal para obtener una lectura personal.',
        head: 'Amor, matrimonio y compatibilidad', compat: 'Compatibilidad general', synTitle: 'Cómo se encuentran las dos cartas', natalTitle: 'Tu naturaleza amorosa',
        partnerNoTime: 'No se conoce la hora de nacimiento de la otra persona: su Ascendente, sus casas y el grado exacto de su Luna son aproximados.',
        addPartner: 'Añade los datos de nacimiento de la otra persona para ver vuestra compatibilidad.'
      },
      money: {
        title: 'Dinero y riqueza', intro: 'De dónde viene el dinero en tu carta, cuánto sabes retenerlo, tu estilo financiero, el momento presente y el calendario de mercado que se avecina.',
        range: 'Periodo del calendario', d90: 'Tres meses', submit: 'Leer el dinero y los tiempos', head: 'Dinero, riqueza y tiempos financieros',
        natalTitle: 'Tu carta del dinero', calTitle: 'Calendario de mercado: los próximos {n} días'
      },
      trade: {
        title: 'Compra y venta', intro: '¿Conviene comprar o vender ahora mismo, y cuál es el mejor momento? Se juzga con las reglas de Lilly sobre la compra y la venta y con las elecciones de al-Biruni y Bonatti.',
        action: 'Quiero', buy: 'Comprar', sell: 'Vender', asset: 'Qué', submit: 'Juzgar ahora y buscar los mejores momentos',
        disclaimer: 'Esto es un juicio astrológico tradicional, no asesoramiento financiero. Los mercados conllevan riesgos reales: decide basándote en tu propia investigación o consulta a un asesor cualificado.',
        head: { buy: 'Compra: {asset}', sell: 'Venta: {asset}' }, nowTitle: 'Ahora mismo', scaleNo: 'Esperar', scaleYes: 'Adelante',
        bestTitle: { buy: 'Mejores momentos para comprar', sell: 'Mejores momentos para vender' },
        rules: 'Reglas: el comprador es el Ascendente y el vendedor, la casa 7; la casa 10 muestra el precio, y la 4, el desenlace del trato. Se compra con la Luna menguante y se vende con la Luna creciente (al-Biruni, Bonatti); hay que evitar la Luna vacía de curso y Mercurio retrógrado, y conviene que el planeta del activo esté fuerte y que la Luna aplique a un benéfico.'
      },
      chat: {
        title: 'Conversa con el astrólogo', intro: 'Pregunta lo que quieras: amor, dinero, compras y ventas, trabajo, el año que viene. Cada pregunta se levanta además como carta horaria de su momento.',
        useNatal: 'Usar mi carta natal', usePartner: 'Incluir a la otra persona (de Amor)', where: 'Estoy en', ph: 'Escribe tu pregunta…',
        clear: 'Borrar la conversación', note: 'Las respuestas son un juicio simbólico tradicional, no una certeza.', astrologer: 'Astrólogo', ruleFrom: 'Astrólogo (reglas clásicas)',
        welcome: 'Saludos. Leo tu carta con los métodos de Ptolomeo, Abu Ma\'shar, al-Biruni, Lilly, Parashara y los maestros chinos. Pregúntame por el amor, el dinero, las compras y ventas, el trabajo o el año que viene. Para una lectura personal, introduce antes tus datos de nacimiento en la pestaña **Carta natal**.'
      }
    },
    err: { natalFirst: 'Primero levanta tu carta natal en la pestaña Carta natal.' },
    ai: {
      loveTitle: 'Pregunta al astrólogo sobre el amor', lovePh: 'p. ej., ¿Cuándo conoceré a la persona adecuada?',
      loveSugg: ['¿Cuándo se abre mi próxima ventana para el amor?', '¿Qué clase de pareja me conviene de verdad?', '¿Qué patrón se repite una y otra vez en mis relaciones?'],
      loveSuggPair: ['¿Somos realmente compatibles?', '¿Qué nos mantendrá unidos y qué podría separarnos?', '¿Es buena idea que nos casemos? ¿Y cuándo?'],
      moneyTitle: 'Pregunta al astrólogo sobre el dinero', moneyPh: 'p. ej., ¿En qué campo ganaré más dinero?',
      moneySugg: ['¿De dónde procede realmente mi dinero?', '¿Es este un buen año para invertir?', '¿Me conviene más un sueldo o un negocio propio?'],
      tradeTitle: 'Pregunta al astrólogo sobre esta operación', tradePh: 'p. ej., ¿Debo esperar a la semana que viene?',
      tradeSugg: ['¿Actúo ahora o espero?', '¿Es más probable que el precio suba o que baje?', '¿Cuál es el mayor riesgo de esta operación?'],
      chatSugg: ['¿Encontraré el amor este año?', '¿Es buen momento para invertir?', '¿Debo comprar o vender ahora?', '¿Conseguiré el trabajo?', '¿Cómo será para mí el año que viene?']
    },
    syn: {
      meter: { attraction: 'Atracción', harmony: 'Armonía', durability: 'Durabilidad', friction: 'Fricción' },
      scoresTitle: 'Puntuaciones', scores: 'Atracción {a}, armonía {h}, durabilidad {d}, fricción {f} (sobre 10).',
      overallTitle: 'Compatibilidad: {pct} %',
      overall: {
        strong: 'Un vínculo fuerte: la atracción, el entendimiento y la capacidad de durar se sostienen mutuamente. Los textos clásicos cuentan estas uniones entre las afortunadas.',
        good: 'Una buena pareja: hay una afinidad real, con algunos puntos que piden un cuidado consciente.',
        work: 'Un vínculo que exige trabajo: existe un punto de encuentro, pero las diferencias son notables y la relación solo crece con esfuerzo y madurez.',
        hard: 'Una combinación difícil: las cartas tiran en direcciones distintas. Puede enseñar mucho, pero la armonía no llegará por sí sola.'
      },
      overallWhy: 'Sinastría: atracción {a}, armonía {h}, durabilidad {d}, fricción {f}; Guna Milan {k}/36.',
      ptolTitle: 'La regla de las luminarias de Ptolomeo (Tetrabiblos IV, 5)',
      ptol: {
        lights: 'El Sol de uno y la Luna del otro están en el mismo signo o en signos armónicos: para Ptolomeo, la primera señal de una unión duradera y concorde.',
        exchange: 'El Sol de uno está en conjunción con la Luna del otro: la firma clásica del matrimonio y de un profundo reconocimiento mutuo.',
        moons: 'Las dos Lunas están en el mismo signo o en signos armónicos: la vida diaria, los estados de ánimo y las necesidades encajan con naturalidad.',
        none: 'Las luminarias no están en signos armónicos: según la regla de Ptolomeo, la concordia ha de construirse mediante otros lazos, como Venus, Júpiter y un propósito común.'
      },
      contact: '{a} en {asp} con {b}',
      contactText: {
        conj: '«{x}» de uno se funde con «{y}» del otro (orbe de {orb}°): un vínculo fuerte e inmediato en este terreno.',
        easy: '«{x}» de uno sostiene «{y}» del otro (orbe de {orb}°): aquí hay facilidad y un entendimiento natural.',
        hard: '«{x}» de uno desafía «{y}» del otro (orbe de {orb}°): un magnetismo que también trae tensiones que hay que resolver.'
      },
      saturnNote: 'Los contactos de Saturno son el pegamento de las relaciones largas: atan y estabilizan, aunque también pueden sentirse pesados o restrictivos.',
      overlayTitle: 'Los planetas de cada uno en las casas del otro',
      overlay: { b2a: 'El planeta {p} de la otra persona cae en tu casa {h}: {meaning}', a2b: 'Tu planeta {p} cae en la casa {h} de la otra persona: {meaning}' },
      ovh: { 1: 'se vive de forma intensa y personal; moldea la manera en que el otro se ve a sí mismo.', 5: 'romance, juego y placer.', 7: 'la casa misma del matrimonio: una atracción natural hacia la vida en pareja.', 8: 'intensidad, intimidad y recursos compartidos.', 12: 'algo oculto o kármico; un vínculo difícil de explicar.' },
      kootaTitle: 'Guna Milan (Ashtakoota): {n} de 36',
      koota: { varna: 'Varna', vashya: 'Vashya', tara: 'Tara', yoni: 'Yoni', maitri: 'Graha Maitri', gana: 'Gana', bhakoot: 'Bhakoot', nadi: 'Nadi' },
      kootaVerdict: { excellent: 'Excelente según el criterio indio (28 o más).', good: 'Bueno (24 o más).', fair: 'Aceptable (18 o más), el mínimo tradicional para el matrimonio.', weak: 'Por debajo del mínimo tradicional de 18.' },
      nadiDosha: 'Nadi dosha: las dos Lunas están en el mismo nadi, lo que los textos consideran el desajuste más grave, sobre todo para la salud y los hijos; existen muchas cancelaciones.',
      bhakootDosha: 'Bhakoot dosha: los signos lunares guardan una relación 2-12, 5-9 o 6-8, lo que puede tensar la economía o la armonía.',
      kootaNote: 'Calculado a partir de la Luna sideral de cada persona (Vashya y Yoni simplificados).',
      baziTitle: 'Pilares chinos: maestros del día y ramas',
      baziDm: {
        same: 'Los dos maestros del día pertenecen a la misma fase ({a} y {b}): iguales y aliados, a veces rivales.',
        aFeedsB: 'Tu maestro del día, {a}, nutre el de la otra persona ({b}): tú das y sostienes; la otra persona florece gracias a ti.',
        bFeedsA: 'El maestro del día de la otra persona, {b}, nutre el tuyo ({a}): te sostiene y te ayuda a crecer.',
        aControlsB: 'Tu maestro del día, {a}, controla el de la otra persona ({b}): en el Zi Ping clásico es la estrella de la esposa para el hombre, una pareja tradicional, siempre que el control no se convierta en dominio.',
        bControlsA: 'El maestro del día de la otra persona, {b}, controla el tuyo ({a}): en el Zi Ping clásico es la estrella del marido para la mujer, una pareja tradicional que aporta estructura y desafío.'
      },
      baziDay: { clash: 'Las dos ramas del día (los palacios del cónyuge) chocan: una relación viva, pero propensa a la fricción en la convivencia diaria.', harmony: 'Las dos ramas del día forman una de las seis armonías: un encaje secreto y natural entre los palacios del cónyuge.', same: 'Las ramas del día son iguales: necesidades parecidas en la intimidad.', neutral: 'Las ramas del día son neutras entre sí.' },
      baziYear: { clash: 'Los animales del año, {a} y {b}, chocan.', harmony: 'Los animales del año, {a} y {b}, forman una pareja armónica.', trine: 'Los animales del año, {a} y {b}, pertenecen al mismo trígono de aliados.', neutral: 'Los animales del año, {a} y {b}, son neutros entre sí.' }
    },
    love: {
      venusTitle: 'Venus: cómo amas', venus: 'Venus en {pos}, casa {h}; está {word}.',
      venusEl: { fire: 'Amas con fuego: abiertamente, deprisa, con admiración y con ganas de conquistar.', earth: 'Amas a través de los sentidos y de la lealtad: despacio, de forma tangible y a largo plazo.', air: 'Amas a través de la mente: la conversación, la amistad y la libertad importan tanto como la pasión.', water: 'Amas con hondura y emoción: necesitas cercanía, confianza y sentirte comprendido de verdad.' },
      venusStrong: 'Una Venus fuerte da encanto y buena fortuna en el amor; el afecto viene a ti.', venusWeak: 'Una Venus débil indica que el amor exige más esfuerzo y discernimiento; las decepciones enseñan lo que de verdad valoras.', venusMid: 'Venus tiene una fuerza mediana: el amor depende de las decisiones y del momento.',
      venusRetro: 'Venus retrógrada al nacer: el amor se revisa; los viejos lazos regresan, y el corazón elige tarde, pero con conocimiento de causa.', venusCombust: 'Venus combusta: los sentimientos quedan ocultos o eclipsados por el deber y el ego; el amor crece cuando sale a la luz.',
      marsTitle: 'Marte: deseo y conquista', mars: 'Marte en {pos}, casa {h}.',
      marsEl: { fire: 'El deseo es directo y audaz; persigues lo que quieres a cara descubierta.', earth: 'El deseo es constante y físico; demuestras el amor con hechos.', air: 'El deseo nace en la mente; el ingenio y las palabras te encienden.', water: 'El deseo es emocional e intenso; necesitas una conexión profunda.' },
      partnerTitle: 'La pareja que te atrae (casa 7)', desc: 'El Descendente está en {sign}; la pareja tiende a mostrar esta naturaleza:',
      lord7: 'El regente de la casa 7, el planeta {p}, ocupa la casa {h} y está {word}: la pareja suele llegar a través de los asuntos de esa casa ({topics}), y el matrimonio queda ligado a ellos.',
      in7: { sun: 'El Sol en la casa 7: una pareja de posición y de carácter fuerte; puede que te definas a través de la relación.', moon: 'La Luna en la casa 7: una gran necesidad de pareja; la otra persona es protectora, o bien cambiante.', mercury: 'Mercurio en la casa 7: una pareja de espíritu joven, comunicativa o vinculada al trabajo y al comercio.', venus: 'Venus en la casa 7: una de las mejores señales de un matrimonio feliz y armonioso.', mars: 'Marte en la casa 7: pasión y también discusiones; una pareja de voluntad firme.', jupiter: 'Júpiter en la casa 7: una pareja generosa, sabia o afortunada; el matrimonio trae crecimiento.', saturn: 'Saturno en la casa 7: un compromiso tardío o serio, a menudo con una pareja mayor o responsable; una vez sellado, es duradero.' },
      ptolTitle: 'El significador del cónyuge según Ptolomeo',
      ptolM: 'Para un hombre, Ptolomeo juzga a la esposa por la Luna; aquí: {p} en {pos}, casa {h}, en un signo {mode}.',
      ptolF: 'Para una mujer, Ptolomeo juzga al marido por el Sol; aquí: {p} en {pos}, casa {h}, en un signo {mode}.',
      ptolMode: { movable: 'Signo cardinal: el matrimonio puede llegar pronto, o más de una vez.', fixed: 'Signo fijo: se indica un único matrimonio duradero.', common: 'Signo mutable: es posible más de una unión significativa.' },
      ptolHit: { ben: 'Su {asp} con {p} promete un cónyuge bueno y servicial.', benHard: 'Su {asp} con {p} da beneficio mezclado con exceso.', malEasy: 'Su {asp} con {p} añade seriedad y estabilidad.', mal: 'Su {asp} con {p} trae fricción, demora o una pareja exigente.' },
      easeTitle: 'Facilidad o demora en el matrimonio',
      d: { satVenus: 'Saturno aflige a Venus', sat7: 'Saturno toca el Descendente', venusRetro: 'Venus está retrógrada', satIn7: 'Saturno ocupa la casa 7', lord7cadent: 'el regente de la casa 7 está en una casa oculta' },
      e: { jupVenus: 'Júpiter ayuda a Venus', benIn7: 'un benéfico ocupa la casa 7', lord7good: 'el regente de la casa 7 está bien situado', moonVenus: 'la Luna y Venus están en concordia' },
      easeList: 'A favor: {list}.', delayList: 'Factores de demora: {list}.',
      easeVerdict: 'El amor y el matrimonio llegan con relativa facilidad.', delayVerdict: 'El compromiso suele llegar más tarde, con la madurez; lo que se construye entonces es sólido.', mixedVerdict: 'La facilidad y la demora están equilibradas: deciden el momento y las elecciones.',
      vedTitle: 'Visión india: el regente de la casa 7 y el navamsa', ved: 'El regente sideral de la casa 7, el planeta {lord}, ocupa el bhava {h} ({topics}). Venus en el navamsa (la carta del matrimonio) está en {nav}.',
      navEl: { fire: 'Un cónyuge animoso e independiente.', earth: 'Un cónyuge práctico y leal.', air: 'Un cónyuge sociable e inteligente.', water: 'Un cónyuge sensible y entregado.' },
      manglik: 'Hay Kuja dosha (por la posición de Marte): la tradición aconseja una pareja con un Marte similar, o paciencia antes de casarse.',
      baziTitle: 'Visión china: el palacio del cónyuge', bazi: 'Tu palacio del cónyuge (la rama del día) alberga la estrella «{g}»: {gt}',
      baziInter: 'El palacio del cónyuge participa en: {list}.', baziCalm: 'El palacio del cónyuge está tranquilo: una imagen interior estable de la vida en pareja.',
      baziStarM: 'Para un hombre, la estrella de la esposa es el elemento {el}; su fuerza en la carta es de {n}.', baziStarF: 'Para una mujer, la estrella del marido es el elemento {el}; su fuerza en la carta es de {n}.', baziStarX: 'Elige un sexo en los ajustes de la Carta natal para leer la estrella del cónyuge.',
      w: { prof: 'el año de profección activa la casa {h} (regente: el planeta {p})', firdar: 'está en curso la firdaria de Venus', firdarSub: 'está en curso el subperiodo de Venus dentro de la firdaria', dasha: 'la mahadasha del planeta {p}', antar: 'la antardasha del planeta {p} (hasta el {to})' },
      timingTitle: 'Los tiempos del amor', timingNow: 'Activo ahora: {list}. Es un periodo favorable para conocer a alguien o para comprometerse.', timingQuiet: 'Ahora mismo no está activo ningún señor del tiempo principal del amor.',
      jup7: 'Júpiter, el gran benéfico, transita tu séptimo signo ({sign}): {when}; según la tradición, la ventana más fuerte para el matrimonio.', jupVenus: 'Júpiter vuelve al signo de tu Venus a partir del {when}: una temporada de afecto y oportunidades.'
    },
    money: {
      capacityTitle: 'Capacidad de riqueza (casa 2)', house2: 'La casa 2 está en {sign}; su regente, el planeta {p}, ocupa la casa {h} y está {word}.', source: 'El dinero te llega sobre todo por {topics}.',
      src: { 1: 'tu propia persona, tus capacidades y tu iniciativa', 2: 'tus propios recursos y lo que ya posees', 3: 'la comunicación, la escritura, la venta, los viajes cortos, los hermanos y los vecinos', 4: 'la tierra, los inmuebles, la familia y los cimientos heredados', 5: 'la creatividad, el entretenimiento, la especulación y los hijos', 6: 'el servicio, el empleo, el oficio y el trabajo en el ámbito de la salud', 7: 'los socios, los clientes, el matrimonio y los contratos', 8: 'el dinero ajeno: inversores, préstamos, herencias y bienes compartidos', 9: 'el extranjero, la enseñanza, el derecho, la edición y los viajes', 10: 'la carrera, la autoridad y la reputación pública', 11: 'los amigos, las redes de contactos, los mecenas y los beneficios del trabajo', 12: 'el trabajo entre bastidores, las instituciones, los lugares lejanos o apartados y los asuntos confidenciales' },
      in2: { sun: 'El Sol en la casa 2: se gana dinero gracias a la posición, el liderazgo y la visibilidad; se gasta en estatus.', moon: 'La Luna en la casa 2: ingresos fluctuantes; se gana con el público, la alimentación, la vivienda o todo lo que cambia.', mercury: 'Mercurio en la casa 2: se gana con la mente: el comercio, la escritura, la enseñanza, los números.', venus: 'Venus en la casa 2: una señal clásica de riqueza; se gana con la belleza, el arte, el placer o las asociaciones.', mars: 'Marte en la casa 2: se gana con audacia y se gasta con audacia; dinero por medio del esfuerzo, la ingeniería o el riesgo.', jupiter: 'Júpiter en la casa 2: la mejor firma de abundancia; el dinero crece y vuelve.', saturn: 'Saturno en la casa 2: una riqueza construida despacio y guardada con cuidado; escasez al principio y solidez después.' },
      lotsTitle: 'Las Partes de la Fortuna y de la Sustancia', fortune: 'La Parte de la Fortuna está en {pos}, casa {h} ({topics}); su regente, el planeta {p}, está {word}.', substance: 'La Parte de la Sustancia (Abu Ma\'shar) está en {pos}, casa {h} ({topics}); su regente, el planeta {p}, está {word}.',
      jupTitle: 'Júpiter, significador de la riqueza', jup: 'Júpiter en {pos}, casa {h} ({topics}); está {word}.', jupStrong: 'Un Júpiter fuerte: las oportunidades llegan, y la generosidad vuelve multiplicada.', jupWeak: 'Un Júpiter débil: el crecimiento exige disciplina; cuidado con abarcar demasiado y con confiar en quien no debes.', jupMid: 'Júpiter tiene una fuerza mediana: el crecimiento llega con esfuerzo y buen consejo.',
      flowsTitle: 'Ingresos, carrera y dinero ajeno', flows: 'Regente de la casa 11 (los ingresos del trabajo), el planeta {p11}: {w11}, en la casa {h11}. Regente de la casa 10 (la carrera), el planeta {p10}: {w10}. Regente de la casa 8 (préstamos, inversores, herencias), el planeta {p8}: {w8}, en la casa {h8}.',
      flows8: 'El dinero ajeno pesa más que tus propios ingresos: las asociaciones, los inversores, los préstamos o las herencias desempeñan un gran papel.', flows11: 'Tus propios ingresos pesan más que el dinero ajeno: construye tu economía con tu trabajo y tu red de contactos.', flowsEven: 'Los ingresos propios y el dinero ajeno están equilibrados.',
      styleTitle: 'Tu temperamento financiero', style: 'Tu dinero lo guía el planeta {p}, secundado por el planeta {q}.',
      styleText: { value: 'Estilo de Saturno: paciente, centrado en el valor y a largo plazo; te convienen los inmuebles, la tierra y el interés compuesto que crece despacio.', growth: 'Estilo de Júpiter: crecimiento y expansión; la educación, la edición, el derecho, los proyectos internacionales.', aggressive: 'Estilo de Marte: rápido, competitivo y amigo del riesgo; fija límites estrictos.', beauty: 'Estilo de Venus: la belleza, el diseño, el lujo, la hostelería y las asociaciones.', trader: 'Estilo de Mercurio: el trading, el comercio, la tecnología y la información; decisiones rápidas.', cyclical: 'Estilo de la Luna: cíclico e intuitivo; bienes de consumo, alimentación, vivienda; atento a los ciclos.', leader: 'Estilo del Sol: el liderazgo, la empresa propia y la reputación pública.' },
      styleSecond: 'Nota secundaria: {text}', uranus: 'Urano toca tus casas del dinero: ganancias y pérdidas repentinas; la tecnología y lo insólito.', neptune: 'Neptuno toca tus casas del dinero: intuición, pero también confusión; compruébalo todo por escrito.',
      baziTitle: 'Visión china: la estrella de la riqueza', bazi: 'Tu elemento de la riqueza es {el} (fuerza {n}); su planeta es {p}.',
      baziCase: { strongStrong: 'Un maestro del día fuerte con una estrella de la riqueza fuerte: puedes sostener una gran riqueza. Los textos clásicos lo llaman una carta rica.', strongWeak: 'Un maestro del día fuerte con una estrella de la riqueza débil: la capacidad está ahí, pero las oportunidades hay que crearlas; la riqueza llega en los pilares de la suerte favorables.', weakStrong: 'Un maestro del día débil frente a una riqueza fuerte: la riqueza se ve, pero pesa al sostenerla. Las asociaciones, el apoyo y la prudencia con las deudas son clave.', weakWeak: 'Ambos son modestos: una prosperidad constante y ganada a pulso, más que golpes de suerte; primero hay que reunir recursos.' },
      vedTitle: 'Visión india: los regentes de la riqueza y de las ganancias', ved: 'El regente de la casa 2, el planeta {l2}, ocupa el bhava {h2}; el regente de la casa 11, el planeta {l11}, ocupa el bhava {h11}.', vedYogas: 'Yogas relacionados con la riqueza: {list}.', vedNone: 'No destaca ningún yoga clásico de riqueza; la riqueza sigue las dashas de los regentes de las casas 2 y 11.',
      t: { prof: 'el año de profección activa la casa {h}', profLord: 'el señor del año, el planeta {p}, rige una casa del dinero', jup: 'Júpiter transita tu casa {h}', sat: 'Saturno transita tu casa {h} (toca ajustar y consolidar)', dasha: 'la mahadasha del planeta {p}', luck: 'el pilar de la suerte lleva tu elemento de la riqueza', zr: 'la liberación zodiacal desde la Fortuna atraviesa un periodo de cumbre' },
      timingTitle: 'Los tiempos financieros ahora', timing: 'Activo ahora: {list}.', timingQuiet: 'Ahora no está activo ningún señor del tiempo financiero importante: es un periodo para el trabajo constante y la preparación, más que para los grandes movimientos.'
    },
    cal: {
      newMoon: 'Luna nueva en {sign}', fullMoon: 'Luna llena en {sign}',
      newMoonText: 'Un comienzo: según la tradición, es bueno para empezar, sembrar y comprar a largo plazo.', fullMoonText: 'Una culminación: los asuntos llegan a su punto álgido; según la tradición, es bueno para vender y concluir, y malo para empezar.',
      station: { mercury: { retro: 'Comienza Mercurio retrógrado: retrasos, malentendidos y tratos revisados. Lee los contratos dos veces.', direct: 'Mercurio retoma el movimiento directo: la comunicación y los tratos se aclaran.' }, venus: { retro: 'Comienza Venus retrógrada: se revalúan los valores y los precios; evita las compras de lujo.', direct: 'Venus retoma el movimiento directo: vuelve la confianza en el valor de las cosas.' }, mars: { retro: 'Comienza Marte retrógrado: la energía se vuelve hacia dentro; evita los movimientos agresivos.', direct: 'Marte retoma el movimiento directo: vuelve el impulso.' } },
      eclipse: 'Los eclipses marcan puntos de inflexión repentinos; los astrólogos tradicionales evitan empezar o comprometerse cerca de ellos.'
    },
    trade: {
      assetKw: {
        stocks: ['acciones', 'acción de', 'bolsa', 'etf', 'índice', 'indice', 'fondo indexado', 'fondos de inversión', 'participaciones'],
        crypto: ['cripto', 'bitcoin', 'btc', 'ethereum', 'eth', 'token', 'moneda digital', 'monedas digitales'],
        gold: ['oro', 'plata', 'metales preciosos', 'metal precioso', 'lingote'],
        currency: ['dólar', 'dolar', 'euro', 'divisa', 'moneda extranjera', 'forex', 'usd', 'tipo de cambio'],
        property: ['una casa', 'mi casa', 'casa nueva', 'piso', 'departamento', 'apartamento', 'vivienda', 'inmueble', 'terreno', 'propiedad', 'finca', 'bienes raíces'],
        vehicle: ['coche', 'carro', 'un auto', 'mi auto', 'el auto', 'automóvil', 'automovil', 'vehículo', 'vehiculo', 'una moto', 'mi moto', 'motocicleta', 'camión', 'camioneta'],
        goods: ['mercancía', 'mercancia', 'mercadería', 'mercaderia', 'productos', 'inventario', 'existencias', 'stock de']
      },
      asset: { stocks: 'Acciones y participaciones', crypto: 'Criptomonedas', gold: 'Oro y metales preciosos', currency: 'Divisas', property: 'Casa o inmueble', vehicle: 'Coche o vehículo', goods: 'Bienes y mercancías' },
      sig: { buy: 'Significadores. Tú, como comprador: {a}; el vendedor: {b}; el precio: {price}; la cosa: {thing}; el desenlace del trato: {end}.', sell: 'Significadores. Tú, como vendedor: {a}; el comprador: {b}; el precio: {price}; la cosa: {thing}; el desenlace del trato: {end}.' },
      sameLord: 'Un mismo planeta ({p}) rige ambas partes: el trato está en tus manos.',
      deal: 'Los planetas {a} y {b} perfeccionan su aspecto ({asp}) el {date}: el trato puede cerrarse.', noDeal: 'Los planetas {a} y {b} no se reúnen pronto: es improbable que el trato se cierre ahora.',
      edgeYou: 'Tu significador, {a}, es más fuerte que el de la otra parte ({b}): la ventaja es tuya.', edgeThem: 'La otra parte ({b}) es más fuerte que tú ({a}): la ventaja es suya; negocia con cuidado.', edgeEven: 'Ambas partes ({a} y {b}) tienen una fuerza parecida.',
      price: { high: 'El regente de la casa 10 ({p}) es fuerte y angular: el precio es alto o firme.', low: 'El regente de la casa 10 ({p}) es débil o cadente: el precio es bajo o negociable.', fair: 'El regente de la casa 10 ({p}) tiene una fuerza mediana: el precio es justo.' },
      moonWaxing: 'La Luna está creciente: según la tradición, los precios tienden a subir, lo que favorece la venta.', moonWaning: 'La Luna está menguante: según la tradición, los precios tienden a bajar, lo que favorece la compra.',
      thing: 'El planeta del activo, {p}, está {word}.', thingRetro: 'Está retrógrado: dudas, devoluciones o defectos ocultos.',
      end: 'El desenlace del trato (el regente de la casa 4, {p}) está {word}.', mercRetro: 'Mercurio, señor del comercio, está retrógrado: errores en los papeles y cambios de opinión.',
      verdict: {
        buy: { go: 'Compra: el cielo respalda la compra ahora.', lean: 'La balanza se inclina hacia la compra, con cuidado en el precio y las condiciones.', wait: 'Espera: las señales son mixtas; más abajo se indica un momento mejor.', no: 'No compres ahora: los testimonios están en contra.' },
        sell: { go: 'Vende: el cielo respalda la venta ahora.', lean: 'La balanza se inclina hacia la venta, con cuidado en el precio y las condiciones.', wait: 'Espera: las señales son mixtas; más abajo se indica un momento mejor.', no: 'No vendas ahora: los testimonios están en contra.' }
      }
    },
    elr: { waningBuy: 'Luna menguante (buena para comprar)', waxingBuy: 'Luna creciente (precios al alza)', waxingSell: 'Luna creciente (buena para vender)', waningSell: 'Luna menguante (precios a la baja)', edgeYou: 'tu significador, más fuerte que el de la otra parte', edgeThem: 'la otra parte, más fuerte' },
    chat: {
      buyKw: ['comprar', 'compra', 'compro ', 'compré', 'compre ', 'adquirir', 'adquiero', 'invertir en', 'invierto en'],
      sellKw: ['vender', 'vendo', 'vendí', 'venderé', 'vendemos', 'vendiendo', 'vendiera', 'liquidar', 'recoger beneficios', 'tomar ganancias', 'realizar ganancias', 'sacar ganancias'],
      tradeIntro: 'Juzgado según las reglas de Lilly sobre la compra y la venta para este momento ({asset}):', tradeMore: 'La pestaña Compra y venta indica los mejores momentos próximos.',
      ruleIntro: 'Juzgado según las reglas clásicas de la astrología horaria para este momento (tema: {topic}):',
      ruleNatal: 'En tu carta natal, casa {h}:',
      ruleNote: 'Para una respuesta más completa y conversada, abre esta página en Claude.'
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
