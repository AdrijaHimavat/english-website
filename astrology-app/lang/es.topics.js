/* Akhtarnameh — es plain-reading strings (merged into lang/es.js). */
(function (G) {
  const D = G.I18N_DATA = G.I18N_DATA || {};
  const merge = (a, b) => { Object.keys(b).forEach(k => { if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') merge(a[k], b[k]); else a[k] = b[k]; }); return a; };
  merge(D.es = D.es || {}, {
    plain: {
      title: "Tu lectura",
      intro: "Esto es lo que el cielo de tu nacimiento dice de ti.",
      introName: "{name}, esto es lo que el cielo de tu nacimiento dice de ti.",
      techTitle: "Detalles técnicos (para astrólogos)",
      techHint: "Los cálculos que hay detrás de la lectura: la carta, las dignidades y las técnicas de cada tradición.",
      aiButton: "Escríbeme una lectura más completa",
      aiTitle: "Una lectura más completa",
      h: {
        nature: "Quién eres",
        identity: "El carácter de este negocio",
        heart: "Tu corazón",
        drive: "Lo que te mueve",
        gift: "Tu mayor don",
        edge: "Su mayor fortaleza",
        love: "El amor",
        work: "Trabajo y vocación",
        money: "El dinero",
        now: "Este capítulo de tu vida",
        advice: "Unas palabras para ti"
      },
      moon: [
        "Tus emociones se encienden en un instante y se apagan igual de rápido. Necesitas espacio para actuar según lo que sientes, y eres más feliz cuando la vida está en movimiento.",
        "Encuentras la paz en las cosas sencillas y sólidas: un hogar tranquilo, buena comida, gente con la que puedes contar. Y cuando amas, amas con lealtad.",
        "Tu corazón necesita hablar antes de poder asentarse. La conversación, la curiosidad y un poco de variedad mantienen viva tu vida emocional.",
        "Sientes con hondura y lo recuerdas todo. El hogar, la familia y las personas a las que proteges son tu puerto seguro.",
        "Tienes un corazón cálido y generoso que necesita ser visto y valorado. La admiración de quienes quieres es lo que de verdad te llena.",
        "Demuestras tu cariño cuidando de las cosas y de las personas. El orden te serena, y ser de ayuda para los demás te hace sentirte a gusto en tu propia piel.",
        "Estás en paz cuando hay armonía a tu alrededor. Una buena relación, la justicia y la belleza son lo que tu corazón anhela.",
        "Tus sentimientos son profundos y silenciosos. Te cuesta confiar, pero cuando entregas tu corazón, lo entregas por completo.",
        "Tu corazón es libre y siempre está buscando. Viajar, aprender y perseguir grandes ideales te levanta el ánimo como nada más.",
        "Guardas tus sentimientos para ti y encuentras seguridad en lo que vas construyendo. El respeto y los avances firmes son lo que te reconforta.",
        "Vives tus emociones a través de la mente y de tus valores. Necesitas libertad incluso en la cercanía, y amistades que compartan tus ideales.",
        "Tu corazón es un océano: bondadoso, intuitivo y abierto al dolor ajeno. Necesitas momentos de silencio para volver a ti."
      ],
      sun: [
        "Te mueve el impulso de empezar cosas y abrir camino. El valor es tu combustible; la paciencia es lo que lo convierte en éxito.",
        "Te mueve el deseo de construir algo que perdure. Tu constancia es tu fuerza, siempre que no se endurezca hasta volverse terquedad.",
        "Te mueve la curiosidad. Aprendes, conectas y comunicas, y brillas cuando tienes espacio para explorar.",
        "Te mueve el deseo de proteger y cuidar. La familia y el sentimiento de pertenencia dan sentido a tu vida.",
        "Te mueve el deseo de crear y de ser plenamente tú. Tienes una calidez natural que ilumina cualquier lugar.",
        "Te mueve el deseo de hacer bien las cosas. Tu excelencia discreta se nota en la destreza, en el cuidado y en tu forma de servir a los demás.",
        "Te mueve el deseo de crear armonía. Ves los dos lados de cada cosa, y tu don es unir a las personas; tu reto es confiar en tu propio criterio.",
        "Te mueve la necesidad de ir al fondo de las cosas. Tienes una fuerza de voluntad poco común y la capacidad de renacer después de cada dificultad.",
        "Te mueve la búsqueda de sentido. Necesitas horizontes amplios, respuestas sinceras y libertad para seguir tu propio camino.",
        "Te mueve el deseo de lograr tus metas. Subes despacio pero con paso seguro, y lo que levantas en la madurez se mantiene firme.",
        "Te mueven tus ideales. Piensas por delante de tu tiempo y quieres mejorar la vida de muchas personas, no solo la de unas pocas.",
        "Te mueven la compasión y la imaginación. Tu vida encuentra su sentido en ayudar, crear y creer."
      ],
      gift: {
        sun: "Tu don es tu presencia y tu capacidad de liderar. Cuando das un paso al frente, la gente te escucha; has nacido para que te vean y para inspirar.",
        moon: "Tu don es tu sensibilidad. Lees a las personas y las situaciones por instinto, y a tu lado la gente se siente cuidada.",
        mercury: "Tu don es tu mente. Entiendes rápido, explicas con claridad y siempre encuentras la salida ingeniosa a cualquier problema.",
        venus: "Tu don es tu encanto y tu sentido de la belleza. La gente se siente a gusto a tu lado, y es en el amor, el arte y la bondad donde tu vida florece.",
        mars: "Tu don es tu valor y tu empuje. Donde otros dudan, tú actúas, y esa energía puede mover montañas cuando tiene un objetivo claro.",
        jupiter: "Tu don es tu fe y tu generosidad. La suerte suele encontrarte, y lo que das de corazón vuelve a ti multiplicado.",
        saturn: "Tu don es tu resistencia. Sabes esperar, trabajar y construir lo que otros abandonan, y tu éxito perdura porque te lo has ganado."
      },
      giftTone: {
        ease: "Es un don que te sale de forma natural.",
        work: "Es un don que crece con la práctica: cuanto más lo usas, más fuerte se vuelve.",
        hard: "Es un don que se forja en la dificultad: los caminos difíciles de tu vida son justo donde está tomando forma."
      },
      loveStyle: {
        fire: "En el amor vives con pasión y vas de frente. Te enamoras rápido, admiras sin esconderlo y buscas a alguien que mantenga viva la llama.",
        earth: "En el amor te entregas con lealtad y sin artificios. Demuestras lo que sientes cuidando y estando presente, y cuando amas, es para quedarte.",
        air: "En el amor necesitas complicidad tanto como pasión. La buena conversación y la libertad te importan tanto como el romance.",
        water: "En el amor vas a lo profundo. Necesitas cercanía, confianza y sentir que te comprenden de verdad."
      },
      partner: "Te atrae una persona {who}.",
      partnerSign: [
        "audaz, valiente y llena de energía",
        "serena, estable y sensual",
        "ingeniosa, vivaz y de buena conversación",
        "cariñosa, sensible y muy familiar",
        "cálida, orgullosa y generosa",
        "reflexiva, práctica y atenta",
        "elegante, justa y con quien da gusto estar",
        "intensa, profunda y leal",
        "libre, sincera y aventurera",
        "seria, ambiciosa y en quien se puede confiar",
        "independiente, original y con quien compartir una amistad de verdad",
        "dulce, soñadora y compasiva"
      ],
      loveEase: "El amor suele llegarte sin demasiada lucha.",
      loveLate: "La relación adecuada puede tardar en llegar; la que construyas con más madurez será la que dure.",
      loveMixed: "En el amor, el momento y tus propias decisiones cuentan más que la suerte.",
      work: {
        "1": "Te va mejor cuando tu trabajo es una expresión de quién eres: tu propio nombre, tu propio estilo, tu propia iniciativa.",
        "2": "Tu carrera está muy ligada al dinero y a los recursos: las finanzas, el comercio o cualquier cosa que cree un valor tangible.",
        "3": "Floreces en trabajos de palabras y movimiento: escribir, enseñar, vender, los medios de comunicación o todo lo que una a las personas.",
        "4": "Te va bien en trabajos ligados al hogar, la tierra, la familia o las raíces: los inmuebles, un negocio familiar o trabajar desde tu propio espacio.",
        "5": "Tu vocación tiene que ver con la creatividad, la alegría o los niños: el arte, el entretenimiento, el diseño, la educación o cualquier cosa en la que puedas poner el corazón.",
        "6": "Brillas gracias a tu destreza y a tu forma de servir: la salud, el trabajo artesanal, lo técnico o un puesto en el que haces que las cosas funcionen mejor.",
        "7": "Tu camino pasa por la colaboración: clientes, socios, el asesoramiento, el derecho o cualquier trabajo que se haga cara a cara con los demás.",
        "8": "Te atraen los trabajos profundos y de mucha responsabilidad: las finanzas, la investigación, la psicología, las inversiones o la gestión de los recursos de otras personas.",
        "9": "Tu vocación mira lejos: la enseñanza, los viajes, otros países, el derecho, el mundo editorial o todo lo que abra horizontes.",
        "10": "Lo tuyo es un papel visible: el liderazgo, tu propia reputación y una carrera que la gente reconozca.",
        "11": "Creces a través de redes y comunidades: equipos, organizaciones, internet o un trabajo al servicio de un grupo más grande.",
        "12": "Das lo mejor de ti en silencio y entre bastidores: la investigación, la sanación, el trabajo espiritual o cualquier cosa que pida soledad y profundidad."
      },
      workSaturn: "El éxito llega paso a paso, pero llega para quedarse.",
      workJupiter: "Las puertas suelen abrirse para ti; di que sí a las oportunidades que te ayuden a crecer.",
      money: "El dinero suele llegarte a través de {src}.",
      src: {
        "1": "tu propio talento, tus habilidades y tu iniciativa",
        "2": "tus propios recursos y lo que ya tienes en tus manos",
        "3": "la palabra: escribir, vender, comunicar, los viajes cortos, tus hermanos o tus vecinos",
        "4": "la casa, las propiedades, la familia y lo que te llega de tus raíces",
        "5": "tu creatividad, la diversión, los riesgos bien calculados o los hijos",
        "6": "tu trabajo diario, tu oficio, el servicio a los demás o el mundo de la salud",
        "7": "tus socios, tus clientes, tu pareja o los acuerdos que firmas",
        "8": "los recursos de otras personas: inversiones, préstamos, herencias o bienes compartidos",
        "9": "otros países, la enseñanza, el derecho, los libros o los viajes",
        "10": "tu carrera, tu posición y tu buen nombre",
        "11": "tus amigos, tus contactos, quienes te apoyan y los frutos de tu trabajo",
        "12": "un trabajo discreto entre bastidores, las instituciones, los lugares lejanos o tranquilos y los asuntos que piden reserva"
      },
      style: {
        saturn: "Con el dinero eres prudente y paciente; lo que mejor te va es crecer despacio y sobre seguro, con bienes que duren.",
        jupiter: "Con el dinero piensas en grande; el crecimiento, el aprendizaje y la generosidad suelen devolverte con creces lo que das.",
        mars: "Con el dinero eres audaz y actúas deprisa; puedes ganar mucho, así que ponte límites claros.",
        venus: "Con el dinero te atraen la belleza y la comodidad; las alianzas y todo lo que agrada a la gente pueden darte ganancias.",
        mercury: "Con el dinero tienes agilidad e ingenio; el comercio, las ideas y la información son tus herramientas.",
        moon: "Tus finanzas van por ciclos; confía en tu instinto y ahorra en los meses buenos para los más tranquilos.",
        sun: "Con el dinero te va mejor cuando llevas las riendas; un negocio propio o un puesto que lleve tu nombre es lo que más te conviene."
      },
      now: "Ahora mismo estás en una etapa de {season}",
      year: "Este año, la vida pone el foco en {topics}.",
      yearBiz: "Este año, el foco está en {topics}.",
      advice: {
        sun: "Cree en tu propio valor aunque los demás todavía no lo vean. Tu luz no necesita el permiso de nadie.",
        moon: "Cuida tus emociones y tu cuerpo; para ti, descansar no es un lujo. Cuando te sientes a salvo, todo lo demás encaja.",
        mercury: "Tómate tu tiempo antes de las grandes decisiones y di con claridad lo que piensas. Tu mente es aguda; deja que termine de pensar.",
        venus: "Elige a personas que te hagan bien, no solo a las que resultan agradables. Tu corazón merece un amor que también te respete.",
        mars: "Elige tus batallas. Tu energía es valiosa; cuando suba el enfado, conviértelo en acción y no en conflicto.",
        jupiter: "No prometas más de lo que puedes dar, ni confíes demasiado deprisa. Tu esperanza es un regalo; deja que la sabiduría la guíe.",
        saturn: "Sé amable contigo. No tienes que cargarlo todo sobre tus hombros, y las cosas saldrán bien aunque sueltes un poco."
      },
      asc: [
        "La primera impresión que das es de audacia y vitalidad. Actúas rápido, dices lo que piensas y llenas de energía cualquier lugar; eres más feliz cuando puedes abrir camino.",
        "Transmites calma y aplomo desde el primer momento. Te tomas tu tiempo, tienes buen gusto y, cuando decides algo, lo mantienes.",
        "Quien te conoce ve enseguida tu chispa y tu facilidad de palabra. Tu mente va rápido, te adaptas sin esfuerzo y te iluminas cuando hay algo nuevo que aprender.",
        "Quien te conoce siente tu dulzura y tu forma de cuidar. Detrás de una primera impresión prudente hay un corazón tierno que lo recuerda todo y protege a quienes quiere.",
        "Irradias calidez y confianza. Tienes una presencia natural, un corazón generoso y te encanta formar parte de algo que de verdad importa.",
        "Quien te conoce percibe enseguida tu sensatez y tu capacidad. Te fijas en los detalles que a otros se les escapan y, sin hacer ruido, mejoras las cosas.",
        "Tienes una elegancia natural y es fácil estar a tu lado. Aportas equilibrio, justicia y belleza, y es en las relaciones donde más brillas.",
        "Por fuera transmites calma, pero por dentro hay una gran profundidad. Sientes con intensidad, te cuesta confiar y nunca olvidas a quien te trató bien.",
        "Das una impresión de apertura, sinceridad y libertad. Te encanta aprender, viajar y mirar la vida con perspectiva.",
        "Transmites seriedad y confianza: se nota que se puede contar contigo. Sabes lo que quieres y avanzas hacia ello paso a paso; con los años, la vida suele volverse más fácil para ti.",
        "Quien te conoce ve en ti a alguien original e independiente. Piensas por tu cuenta, te importan las personas y no te da miedo hacer las cosas de otra manera.",
        "Das una impresión de bondad e imaginación. Percibes lo que sienten los demás, y el arte, la música y el lado espiritual de la vida te hablan directamente al alma."
      ],
      temp: {
        choleric: "Hay fuego en tu naturaleza: pasión, ambición y reacciones rápidas. Aprender a hacer una pausa antes de actuar es tu superpoder.",
        sanguine: "Hay calidez y ligereza en tu naturaleza: disfrutas de la vida y la gente disfruta contigo. Cumplir tus promesas hace que ese encanto sea aún más fuerte.",
        melancholic: "Hay profundidad en tu naturaleza: piensas bien las cosas y ves lo que a otros se les escapa. No dejes que la preocupación te robe la alegría de lo que has construido.",
        phlegmatic: "Hay calma en tu naturaleza: llevas paz y paciencia allá donde vas. Un poco más de audacia te llevará más lejos de lo que imaginas."
      },
      season: {
        sun: "luz: es el momento de dejarte ver, de tomar la iniciativa y de defender con claridad aquello en lo que crees.",
        moon: "cambios y emociones: el hogar, la familia y tu mundo interior piden atención, y todo se está reordenando en torno a lo que de verdad necesitas.",
        mercury: "aprendizaje y encuentros: conversaciones, estudios, planes y decisiones se ponen en marcha; tu mente es ahora tu mejor herramienta.",
        venus: "amor y disfrute: las relaciones, la belleza y las reconciliaciones pasan a primer plano; date permiso para disfrutar y para dejarte querer.",
        mars: "acción y valentía: los retos te empujan a decidir y a moverte; actúa con audacia, pero no te lances a las peleas.",
        jupiter: "crecimiento y oportunidades: se abren puertas, aparecen maestros y vuelve la esperanza; solo cuida de no excederte.",
        saturn: "construcción y madurez: la vida te pide paciencia y responsabilidad, y lo que construyas ahora está hecho para durar.",
        node: "nuevos anhelos: algo nuevo y desconocido tira de ti hacia delante, y puede crecer más de lo que habías previsto.",
        snode: "despedidas: un capítulo antiguo se está cerrando; soltar lo que ya terminó deja espacio para lo que viene."
      },
      yearTopic: {
        "1": "ti: tu cuerpo, tu imagen y un nuevo comienzo",
        "2": "el dinero, tus ingresos y lo que de verdad valoras",
        "3": "el aprendizaje, las conversaciones, los viajes cortos, tus hermanos y tus vecinos",
        "4": "el hogar, la familia, tus raíces y el lugar al que perteneces",
        "5": "el amor, la alegría, la creatividad y los hijos",
        "6": "la salud, tus hábitos diarios y tu rutina de trabajo",
        "7": "la vida en pareja, el compromiso y las personas más cercanas a ti",
        "8": "los cambios profundos, el dinero compartido y la necesidad de dejar atrás lo viejo",
        "9": "los viajes, los estudios, la fe y las grandes preguntas de la vida",
        "10": "tu carrera, tus ambiciones y tu lugar en el mundo",
        "11": "los amigos, la comunidad y tus esperanzas para el futuro",
        "12": "el descanso, el trabajo interior, la sanación y el arte de soltar"
      }
    },
    trackShort: {
      note: "Para mejorar las lecturas, se guarda lo que escribes.",
      stop: "No guardar",
      start: "Volver a guardar",
      off: "No se está guardando."
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
