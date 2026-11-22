/* Akhtarnameh — it plain-reading strings (merged into lang/it.js). */
(function (G) {
  const D = G.I18N_DATA = G.I18N_DATA || {};
  const merge = (a, b) => { Object.keys(b).forEach(k => { if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') merge(a[k], b[k]); else a[k] = b[k]; }); return a; };
  merge(D.it = D.it || {}, {
    plain: {
      title: "La tua lettura",
      intro: "Ecco che cosa dice di te il cielo della tua nascita.",
      introName: "{name}, ecco che cosa dice di te il cielo della tua nascita.",
      techTitle: "Dettagli tecnici (per astrologi)",
      techHint: "I calcoli dietro la lettura: il tema natale, le dignità e le tecniche di ogni tradizione.",
      aiButton: "Scrivimi una lettura più completa",
      aiTitle: "Una lettura più completa",
      h: {
        nature: "Chi sei",
        identity: "Il carattere di questa attività",
        heart: "Il tuo cuore",
        drive: "Che cosa ti muove",
        gift: "Il tuo dono più grande",
        edge: "La sua forza più grande",
        love: "L'amore",
        work: "Lavoro e vocazione",
        money: "Il denaro",
        now: "Questo capitolo della tua vita",
        advice: "Una parola per te"
      },
      moon: [
        "Le tue emozioni prendono fuoco in un attimo e si spengono altrettanto in fretta. Hai bisogno di spazio per seguire ciò che senti, e sei felice quando la vita è in movimento.",
        "Trovi pace nelle cose semplici e solide: una casa tranquilla, del buon cibo, persone su cui puoi contare. E quando ami, ami con fedeltà.",
        "Il tuo cuore ha bisogno di parlare prima di trovare quiete. Le conversazioni, la curiosità e un po' di varietà tengono viva la tua vita emotiva.",
        "Senti in profondità e ricordi tutto. La casa, la famiglia e le persone che proteggi sono il tuo porto sicuro.",
        "Hai un cuore caldo e generoso che desidera essere visto e apprezzato. L'ammirazione di chi ami è ciò che ti riempie davvero.",
        "Dimostri il tuo amore prendendoti cura delle cose. L'ordine ti calma, ed essere utile agli altri ti fa sentire bene nella tua pelle.",
        "Sei in pace quando intorno a te c'è armonia. Una bella relazione, la giustizia e la bellezza sono ciò a cui il tuo cuore aspira.",
        "I tuoi sentimenti sono profondi e silenziosi. Ti fidi lentamente, ma quando doni il tuo cuore, lo doni per intero.",
        "Il tuo cuore è libero e sempre in cerca. I viaggi, lo studio e i grandi ideali ti sollevano l'umore più di ogni altra cosa.",
        "Tieni per te i tuoi sentimenti e trovi sicurezza in ciò che costruisci. Il rispetto e i progressi costanti sono ciò che ti conforta.",
        "Vivi le emozioni attraverso la mente e i tuoi valori. Hai bisogno di libertà anche nella vicinanza, e di amicizie che condividano i tuoi ideali.",
        "Il tuo cuore è un oceano: gentile, intuitivo e aperto al dolore degli altri. Hai bisogno di momenti di quiete per tornare a te."
      ],
      sun: [
        "Ti muove il desiderio di cominciare e di aprire la strada. Il coraggio è il tuo carburante; la pazienza è l'arte che lo trasforma in successo.",
        "Ti muove il desiderio di costruire qualcosa che duri. La costanza è la tua forza, purché non si irrigidisca in testardaggine.",
        "Ti muove la curiosità. Impari, crei legami e comunichi, e brilli quando hai spazio per esplorare.",
        "Ti muove il desiderio di proteggere e di prenderti cura. La famiglia e il senso di appartenenza danno significato alla tua vita.",
        "Ti muove il desiderio di creare e di essere pienamente te. Hai un calore naturale che illumina qualsiasi stanza.",
        "Ti muove il desiderio di fare le cose bene. È nell'abilità, nella cura e nel servizio che si vede la tua eccellenza discreta.",
        "Ti muove il desiderio di creare armonia. Vedi entrambi i lati delle cose, e il tuo dono è avvicinare le persone; la tua sfida è fidarti del tuo giudizio.",
        "Ti muove il bisogno di andare in profondità. Hai una forza di volontà rara e la capacità di trasformarti dopo ogni difficoltà.",
        "Ti muove la ricerca di senso. Hai bisogno di grandi orizzonti, di risposte sincere e della libertà di seguire la tua strada.",
        "Ti muove il desiderio di realizzarti. Sali piano ma con passo sicuro, e ciò che costruisci negli anni della maturità resta saldo.",
        "Ti muovono i tuoi ideali. Pensi in anticipo sui tempi e vuoi rendere migliore la vita di molte persone, non solo di poche.",
        "Ti muovono la compassione e l'immaginazione. La tua vita trova senso nell'aiutare, nel creare e nel credere."
      ],
      gift: {
        sun: "Il tuo dono è la presenza, la capacità di guidare. Quando fai un passo avanti, le persone ti ascoltano; sei qui per farti vedere e per ispirare.",
        moon: "Il tuo dono è la sensibilità. Capisci persone e situazioni d'istinto, e accanto a te la gente si sente accolta.",
        mercury: "Il tuo dono è la mente. Capisci in fretta, spieghi con chiarezza e trovi sempre la via intelligente per uscire da qualsiasi problema.",
        venus: "Il tuo dono è il fascino, il senso del bello. Accanto a te le persone si sentono a proprio agio, ed è nell'amore, nell'arte e nella gentilezza che la tua vita si apre.",
        mars: "Il tuo dono è il coraggio, la grinta. Dove gli altri esitano, tu agisci, e quell'energia può spostare le montagne quando ha una meta chiara.",
        jupiter: "Il tuo dono è la fiducia nella vita e la generosità. La fortuna tende a trovarti, e ciò che dai a cuore aperto ti torna indietro moltiplicato.",
        saturn: "Il tuo dono è la resistenza. Sai aspettare, lavorare e costruire ciò che gli altri abbandonano, e il tuo successo dura perché te lo sei guadagnato."
      },
      giftTone: {
        ease: "È un dono che ti viene naturale.",
        work: "È un dono che cresce con la pratica: più lo usi, più diventa forte.",
        hard: "È un dono che si forgia nelle difficoltà: le strade più dure della tua vita sono proprio il luogo in cui sta prendendo forma."
      },
      loveStyle: {
        fire: "In amore vivi con passione e vai dritto al punto. Ti innamori in fretta, ammiri senza nasconderlo e cerchi qualcuno che tenga acceso il fuoco.",
        earth: "In amore porti lealtà e verità. Mostri ciò che provi con la cura e la presenza, e il tuo amore è fatto per durare.",
        air: "In amore hai bisogno di un'amicizia quanto di una passione. Una bella conversazione e la libertà contano per te quanto il romanticismo.",
        water: "In amore vai in profondità. Hai bisogno di vicinanza, di fiducia e di qualcuno che ti capisca davvero."
      },
      partner: "Ti attira una persona {who}.",
      partnerSign: [
        "audace, coraggiosa e piena di energia",
        "calma, solida e sensuale",
        "brillante, vivace e mai a corto di parole",
        "premurosa, sensibile e legata alla famiglia",
        "calorosa, fiera e generosa",
        "riflessiva, concreta e attenta",
        "elegante, giusta e con cui è facile stare bene",
        "intensa, profonda e leale",
        "libera, sincera e avventurosa",
        "seria, ambiziosa e affidabile",
        "indipendente, originale e con cui condividere una vera amicizia",
        "dolce, sognatrice e compassionevole"
      ],
      loveEase: "L'amore tende ad arrivare senza troppe lotte.",
      loveLate: "La relazione giusta potrebbe farsi attendere; quella che costruirai con la maturità sarà quella che dura.",
      loveMixed: "In amore, il momento giusto e le tue scelte contano più della fortuna.",
      work: {
        "1": "Dai il meglio quando il lavoro è un'espressione di chi sei: il tuo nome, il tuo stile, la tua iniziativa.",
        "2": "La tua carriera è strettamente legata al denaro e alle risorse: la finanza, il commercio o tutto ciò che crea un valore concreto.",
        "3": "Fiorisci nei lavori fatti di parole e di movimento: scrivere, insegnare, vendere, i media o tutto ciò che mette in contatto le persone.",
        "4": "Ti trovi bene nei lavori legati alla casa, alla terra, alla famiglia o alle radici: gli immobili, un'azienda di famiglia o lavorare dal tuo angolo di mondo.",
        "5": "La tua vocazione ha a che fare con la creatività, la gioia o i bambini: l'arte, lo spettacolo, il design, l'educazione o qualunque cosa in cui puoi mettere il cuore.",
        "6": "Brilli grazie alla tua abilità e alla voglia di servire: la salute, l'artigianato, il lavoro tecnico o un ruolo in cui fai funzionare meglio le cose.",
        "7": "La tua strada passa attraverso le collaborazioni: i clienti, un socio, la consulenza, il diritto o qualunque lavoro che si fa faccia a faccia con gli altri.",
        "8": "Ti attirano i lavori profondi e con molto in gioco: la finanza, la ricerca, la psicologia, gli investimenti o la gestione delle risorse altrui.",
        "9": "La tua vocazione guarda lontano: l'insegnamento, i viaggi, i paesi stranieri, il diritto, l'editoria o tutto ciò che allarga gli orizzonti.",
        "10": "Il tuo posto è in un ruolo visibile: la guida degli altri, la tua reputazione e una carriera che le persone riconoscono.",
        "11": "Cresci attraverso reti e comunità: i gruppi di lavoro, le organizzazioni, internet o un lavoro al servizio di un gruppo più grande.",
        "12": "Dai il meglio di te in silenzio, dietro le quinte: la ricerca, la cura, il lavoro spirituale o tutto ciò che richiede solitudine e profondità."
      },
      workSaturn: "Il successo arriva passo dopo passo, ma arriva per restare.",
      workJupiter: "Le porte tendono ad aprirsi per te; di' di sì alle occasioni che ti aiutano a crescere.",
      money: "Il denaro tende ad arrivarti attraverso {src}.",
      src: {
        "1": "il tuo talento, le tue capacità e la tua iniziativa",
        "2": "le tue risorse e ciò che hai già tra le mani",
        "3": "la parola: la scrittura, la vendita, la comunicazione, i piccoli viaggi, i fratelli o i vicini",
        "4": "la casa, gli immobili, la famiglia e ciò che ti viene dalle tue radici",
        "5": "la creatività, il divertimento, i rischi ben calcolati o i figli",
        "6": "il lavoro quotidiano, il tuo mestiere, il servizio agli altri o il mondo della salute",
        "7": "i soci, i clienti, il matrimonio o gli accordi che stringi",
        "8": "le risorse degli altri: investimenti, prestiti, eredità o beni in comune",
        "9": "i paesi lontani, l'insegnamento, il diritto, i libri o i viaggi",
        "10": "la tua carriera, la tua posizione e il tuo buon nome",
        "11": "gli amici, i contatti, chi ti sostiene e i frutti del tuo lavoro",
        "12": "un lavoro discreto dietro le quinte, le istituzioni, i luoghi lontani o appartati e le questioni riservate"
      },
      style: {
        saturn: "Con il denaro sei prudente e paziente; ti si addicono una crescita lenta e sicura e beni che durano nel tempo.",
        jupiter: "Con il denaro pensi in grande; la crescita, lo studio e la generosità tendono a ripagarti.",
        mars: "Con il denaro sei audace e veloce; puoi vincere molto, quindi fissati dei limiti chiari.",
        venus: "Con il denaro ti attirano la bellezza e il comfort; le collaborazioni e tutto ciò che piace alla gente possono portarti guadagni.",
        mercury: "Con il denaro sei agile e brillante; il commercio, le idee e le informazioni sono i tuoi strumenti.",
        moon: "Le tue finanze vanno a cicli; fidati del tuo istinto e metti da parte nei mesi buoni per quelli più tranquilli.",
        sun: "Con il denaro rendi al meglio quando sei tu a guidare; un'attività tutta tua o un ruolo che porta il tuo nome fanno per te."
      },
      now: "In questo momento stai vivendo una stagione di {season}",
      year: "Quest'anno la vita mette in primo piano {topics}.",
      yearBiz: "Quest'anno, al centro dell'attenzione: {topics}.",
      advice: {
        sun: "Credi nel tuo valore anche quando gli altri non lo vedono ancora. La tua luce non ha bisogno del permesso di nessuno.",
        moon: "Prenditi cura delle tue emozioni e del tuo corpo; per te il riposo non è un lusso. Quando ti senti al sicuro, tutto il resto va al suo posto.",
        mercury: "Rallenta prima delle grandi decisioni e di' con chiarezza ciò che pensi. La tua mente è acuta; lasciale il tempo di arrivare in fondo al ragionamento.",
        venus: "Scegli persone che ti fanno bene, non solo persone piacevoli. Il tuo cuore merita un amore che sappia anche rispettarti.",
        mars: "Scegli le tue battaglie. La tua energia è preziosa; quando sale la rabbia, trasformala in azione invece che in conflitto.",
        jupiter: "Non promettere più di quanto puoi dare e non fidarti troppo in fretta. La tua speranza è un dono; lascia che sia la saggezza a guidarla.",
        saturn: "Sii gentile con te. Non devi portare tutto sulle tue spalle, e le cose andranno bene anche se allenti un po' la presa."
      },
      asc: [
        "A prima vista trasmetti audacia e vitalità. Agisci in fretta, dici quello che pensi e porti energia in ogni stanza; sei felice quando puoi aprire la strada.",
        "A prima vista trasmetti calma e solidità. Ti prendi il tuo tempo, hai buon gusto e, quando decidi qualcosa, non torni indietro.",
        "Chi ti incontra nota subito la tua vivacità e la tua parlantina. La tua mente corre veloce, ti adatti con facilità e ti illumini quando c'è qualcosa di nuovo da imparare.",
        "Chi ti incontra sente la tua dolcezza e la tua premura. Dietro una prima impressione riservata c'è un cuore tenero che ricorda tutto e protegge le persone che ama.",
        "Trasmetti calore e sicurezza. Hai una presenza naturale, un cuore generoso e ami far parte di qualcosa che conta davvero.",
        "Chi ti incontra percepisce subito il tuo buon senso e la tua competenza. Noti i dettagli che agli altri sfuggono e, senza fare rumore, migliori le cose.",
        "Hai un'eleganza naturale e stare con te è facile. Porti equilibrio, giustizia e bellezza, ed è nelle relazioni che risplendi.",
        "Fuori trasmetti calma, ma sotto c'è una grande profondità. Senti con intensità, ti fidi lentamente e non dimentichi mai chi è stato buono con te.",
        "Trasmetti apertura, sincerità e libertà. Ami imparare, viaggiare e guardare le cose da lontano, nel loro insieme.",
        "Trasmetti serietà e affidabilità: si capisce subito che su di te si può contare. Sai cosa vuoi e ci arrivi passo dopo passo; con il tempo, la vita tende a diventare più facile per te.",
        "Chi ti incontra nota subito la tua originalità e la tua indipendenza. Pensi con la tua testa, tieni alle persone e non hai paura di fare le cose in modo diverso.",
        "Trasmetti gentilezza e immaginazione. Senti ciò che provano gli altri, e l'arte, la musica e il lato spirituale della vita ti parlano dritto all'anima."
      ],
      temp: {
        choleric: "C'è del fuoco nella tua natura: passione, ambizione e reazioni rapide. Imparare a fermarti un attimo prima di agire è il tuo superpotere.",
        sanguine: "Ci sono calore e leggerezza nella tua natura: ti godi la vita e la gente ama la tua compagnia. Mantenere le promesse rende questo fascino ancora più forte.",
        melancholic: "C'è profondità nella tua natura: rifletti sulle cose e noti ciò che agli altri sfugge. Non lasciare che le preoccupazioni ti rubino la gioia di ciò che hai costruito.",
        phlegmatic: "C'è calma nella tua natura: porti pace e pazienza ovunque vai. Un po' più di audacia ti porterà più lontano di quanto immagini."
      },
      season: {
        sun: "luce: è il momento di farti vedere, di prendere l'iniziativa e di difendere con chiarezza ciò in cui credi.",
        moon: "cambiamenti ed emozioni: la casa, la famiglia e il tuo mondo interiore chiedono attenzione, e tutto si sta riorganizzando attorno a ciò di cui hai davvero bisogno.",
        mercury: "scoperte e incontri: conversazioni, studi, progetti e decisioni sono in movimento; ora la tua mente è il tuo strumento migliore.",
        venus: "amore e piacere: le relazioni, la bellezza e le riconciliazioni sono al centro della scena; concediti di goderti la vita e di lasciarti amare.",
        mars: "azione e coraggio: le sfide ti spingono a decidere e a muoverti; agisci con audacia, ma non buttarti nei litigi.",
        jupiter: "crescita e opportunità: si aprono porte, compaiono maestri e torna la speranza; solo, non esagerare.",
        saturn: "costruzione e maturità: la vita ti chiede pazienza e responsabilità, e ciò che costruisci ora è fatto per durare.",
        node: "nuovi desideri: qualcosa di nuovo e sconosciuto ti attira in avanti, e potrebbe diventare più grande di quanto avevi previsto.",
        snode: "addii: un vecchio capitolo si sta chiudendo; lasciar andare ciò che è finito fa spazio a ciò che verrà."
      },
      yearTopic: {
        "1": "chi sei: il tuo corpo, la tua immagine e un nuovo inizio",
        "2": "il denaro, le tue entrate e ciò a cui tieni davvero",
        "3": "l'apprendimento, le conversazioni, i piccoli viaggi, i fratelli e i vicini",
        "4": "la casa, la famiglia, le tue radici e il luogo a cui appartieni",
        "5": "l'amore, la gioia, la creatività e i figli",
        "6": "la salute, le abitudini quotidiane e la tua routine di lavoro",
        "7": "la vita di coppia, il matrimonio e le persone a te più vicine",
        "8": "i cambiamenti profondi, il denaro condiviso e il coraggio di chiudere con il passato",
        "9": "i viaggi, lo studio, la fede e le grandi domande della vita",
        "10": "la carriera, le ambizioni e il tuo posto nel mondo",
        "11": "gli amici, la comunità e le tue speranze per il futuro",
        "12": "il riposo, il lavoro interiore, la guarigione e l'arte di lasciar andare"
      }
    },
    trackShort: {
      note: "Per migliorare le letture, ciò che inserisci viene salvato.",
      stop: "Non salvare",
      start: "Salva di nuovo",
      off: "Salvataggio disattivato."
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
