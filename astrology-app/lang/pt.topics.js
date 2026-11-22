/* Akhtarnameh — pt plain-reading strings (merged into lang/pt.js). */
(function (G) {
  const D = G.I18N_DATA = G.I18N_DATA || {};
  const merge = (a, b) => { Object.keys(b).forEach(k => { if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') merge(a[k], b[k]); else a[k] = b[k]; }); return a; };
  merge(D.pt = D.pt || {}, {
    plain: {
      title: "Sua leitura",
      intro: "Isto é o que o céu do seu nascimento diz sobre você.",
      introName: "{name}, isto é o que o céu do seu nascimento diz sobre você.",
      techTitle: "Detalhes técnicos (para astrólogos)",
      techHint: "Os cálculos por trás da leitura: o mapa, as dignidades e as técnicas de cada tradição.",
      aiButton: "Escreva uma leitura mais completa para mim",
      aiTitle: "Uma leitura mais completa",
      h: {
        nature: "Quem você é",
        identity: "O caráter deste negócio",
        heart: "Seu coração",
        drive: "O que move você",
        gift: "Seu maior dom",
        edge: "Sua maior força",
        love: "Amor",
        work: "Trabalho e vocação",
        money: "Dinheiro",
        now: "Este capítulo da sua vida",
        advice: "Uma palavra para você"
      },
      moon: [
        "Seus sentimentos pegam fogo rápido e esfriam na mesma velocidade. Você precisa de espaço para agir de acordo com o que sente, e é mais feliz quando a vida está em movimento.",
        "Você encontra paz nas coisas simples e sólidas: uma casa tranquila, uma boa comida, pessoas com quem pode contar. E quando ama, ama com lealdade.",
        "Seu coração precisa conversar antes de sossegar. Conversa, curiosidade e um pouco de variedade mantêm a sua vida emocional acesa.",
        "Você sente fundo e se lembra de tudo. A casa, a família e as pessoas que você protege são o seu porto seguro.",
        "Você tem um coração caloroso e generoso, que quer ser visto e valorizado. A admiração de quem você ama é o que enche o seu coração.",
        "Você demonstra amor cuidando das coisas. A ordem acalma você, e ser útil aos outros faz você se sentir bem na própria pele.",
        "Você fica em paz quando há harmonia ao seu redor. Uma boa relação, justiça e beleza são o que o seu coração deseja.",
        "Seus sentimentos são profundos e silenciosos. Você demora a confiar, mas, quando entrega o coração, entrega por inteiro.",
        "Seu coração é livre e está sempre em busca. Viagens, aprendizado e grandes ideais levantam o seu ânimo como nada mais.",
        "Você guarda os sentimentos para si e encontra segurança naquilo que constrói. Respeito e progresso constante são o que traz conforto ao seu coração.",
        "Você sente as coisas pela mente e pelos seus valores. Precisa de liberdade mesmo na intimidade, e de amizades que compartilhem os seus ideais.",
        "Seu coração é um oceano: bondoso, intuitivo e aberto à dor dos outros. Você precisa de momentos de silêncio para voltar a si."
      ],
      sun: [
        "O que move você é a vontade de começar coisas e abrir caminhos. A coragem é o seu combustível; a paciência é o que transforma essa coragem em sucesso.",
        "O que move você é o desejo de construir algo duradouro. A constância é a sua força, desde que não endureça e vire teimosia.",
        "O que move você é a curiosidade. Você aprende, conecta e comunica, e brilha quando tem espaço para explorar.",
        "O que move você é o desejo de proteger e cuidar. A família e o sentimento de pertencer dão sentido à sua vida.",
        "O que move você é o desejo de criar e de ser você por inteiro. Você tem um calor natural que ilumina qualquer ambiente.",
        "O que move você é o desejo de fazer as coisas bem feitas. É na habilidade, no cuidado e no serviço que a sua excelência silenciosa aparece.",
        "O que move você é o desejo de criar harmonia. Você enxerga os dois lados, e o seu dom é aproximar as pessoas; o seu desafio é confiar no próprio julgamento.",
        "O que move você é a necessidade de ir fundo. Você tem uma força de vontade rara e a capacidade de se transformar depois de cada dificuldade.",
        "O que move você é a busca de sentido. Você precisa de horizontes amplos, respostas sinceras e liberdade para seguir o seu próprio caminho.",
        "O que move você é o desejo de realizar. Você sobe devagar e com firmeza, e o que constrói com o passar dos anos fica de pé.",
        "O que move você são os seus ideais. Você pensa à frente do seu tempo e quer melhorar a vida de muita gente, não só de poucos.",
        "A compaixão e a imaginação guiam você. A sua vida ganha sentido quando você ajuda, cria e acredita."
      ],
      gift: {
        sun: "Seu dom é a presença e a liderança. Quando você dá um passo à frente, as pessoas escutam; você nasceu para brilhar e inspirar.",
        moon: "Seu dom é a sensibilidade. Você lê pessoas e situações por instinto, e as pessoas se sentem acolhidas ao seu lado.",
        mercury: "Seu dom é a sua mente. Você entende rápido, explica com clareza e encontra a saída inteligente para qualquer problema.",
        venus: "Seu dom é o encanto e o senso de beleza. As pessoas se sentem à vontade perto de você, e é no amor, na arte e na gentileza que a sua vida se abre.",
        mars: "Seu dom é a coragem e a garra. Onde outros hesitam, você age, e essa energia pode mover montanhas quando tem um objetivo claro.",
        jupiter: "Seu dom é a fé e a generosidade. A sorte costuma encontrar você, e o que você dá de coração volta multiplicado.",
        saturn: "Seu dom é a perseverança. Você sabe esperar, trabalhar e construir aquilo que os outros abandonam, e o seu sucesso dura porque foi conquistado."
      },
      giftTone: {
        ease: "Esse dom é natural em você.",
        work: "Esse dom cresce com a prática: quanto mais você o usa, mais forte ele fica.",
        hard: "Esse dom nasce da dificuldade: os caminhos duros da sua vida são justamente onde ele está sendo forjado."
      },
      loveStyle: {
        fire: "No amor, você é pura paixão e vai direto ao ponto. Você se apaixona rápido, admira sem disfarçar e quer alguém que mantenha a chama acesa.",
        earth: "No amor, você é leal e não faz jogos. Mostra o que sente cuidando e estando presente, e o seu amor é feito para durar.",
        air: "No amor, você precisa de amizade tanto quanto de paixão. Uma boa conversa e liberdade importam para você tanto quanto o romance.",
        water: "No amor, você mergulha fundo. Precisa de intimidade, de confiança e de alguém que entenda você de verdade."
      },
      partner: "O que atrai você é uma pessoa {who}.",
      partnerSign: [
        "ousada, corajosa e cheia de energia",
        "calma, estável e sensual",
        "espirituosa, animada e boa de papo",
        "carinhosa, sensível e ligada à família",
        "calorosa, orgulhosa e generosa",
        "ponderada, prática e atenciosa",
        "elegante, justa e de convivência leve",
        "intensa, profunda e leal",
        "livre, sincera e aventureira",
        "séria, ambiciosa e confiável",
        "independente, original e com quem você possa ter uma amizade de verdade",
        "doce, sonhadora e compassiva"
      ],
      loveEase: "O amor costuma chegar até você sem muita luta.",
      loveLate: "O relacionamento certo pode demorar; o que você construir depois de amadurecer é o que vai durar.",
      loveMixed: "No amor, o momento certo e as suas próprias escolhas contam mais do que a sorte.",
      work: {
        "1": "Você se sai melhor quando o seu trabalho é uma expressão de quem você é: o seu próprio nome, o seu próprio estilo, a sua própria iniciativa.",
        "2": "Sua carreira está muito ligada ao dinheiro e aos recursos: finanças, comércio ou qualquer coisa que gere valor concreto.",
        "3": "Você floresce em trabalhos com palavras e movimento: escrever, ensinar, vender, comunicação ou qualquer coisa que aproxime pessoas.",
        "4": "Você vai bem em trabalhos ligados à casa, à terra, à família ou às raízes: imóveis, um negócio de família ou trabalhar do seu próprio canto.",
        "5": "Sua vocação envolve criatividade, alegria ou crianças: arte, entretenimento, design, educação ou qualquer coisa em que você possa colocar o coração.",
        "6": "Você brilha pela habilidade e pelo serviço: saúde, trabalho artesanal, trabalho técnico ou uma função em que você faz as coisas funcionarem melhor.",
        "7": "Seu caminho passa pelas parcerias: clientes, uma sociedade, aconselhamento, direito ou qualquer coisa feita cara a cara com outras pessoas.",
        "8": "Trabalhos profundos e de grande responsabilidade chamam a sua atenção: finanças, pesquisa, psicologia, investimentos ou a gestão dos recursos de outras pessoas.",
        "9": "Sua vocação olha longe: ensino, viagens, outros países, direito, publicações ou qualquer coisa que amplie horizontes.",
        "10": "Você nasceu para um papel visível: liderança, a sua própria reputação e uma carreira que as pessoas reconheçam.",
        "11": "Você cresce por meio de redes e comunidades: equipes, organizações, a internet ou um trabalho que sirva a um grupo maior.",
        "12": "Você faz o seu melhor trabalho em silêncio, nos bastidores: pesquisa, cura, trabalho espiritual ou qualquer coisa que peça solidão e profundidade."
      },
      workSaturn: "O sucesso vem passo a passo, mas vem para ficar.",
      workJupiter: "As portas costumam se abrir para você; diga sim às oportunidades que ajudam você a crescer.",
      money: "O dinheiro costuma chegar até você {src}.",
      src: {
        "1": "pelo seu próprio talento, pelas suas habilidades e pela sua iniciativa",
        "2": "pelos seus próprios recursos e por aquilo que você já tem nas mãos",
        "3": "pela palavra: escrevendo, vendendo, se comunicando, em viagens curtas ou por meio de irmãos e vizinhos",
        "4": "pela casa, por imóveis, pela família e por aquilo que vem das suas raízes",
        "5": "pela criatividade, pelo entretenimento, por riscos bem calculados ou pelos filhos",
        "6": "pelo trabalho do dia a dia, pelo seu ofício, pelo serviço aos outros ou pela área da saúde",
        "7": "por meio de sócios, clientes, do casamento ou dos acordos que você fecha",
        "8": "pelo dinheiro de outras pessoas: investimentos, empréstimos, heranças ou bens compartilhados",
        "9": "por outros países, pelo ensino, pelo direito, pelos livros ou pelas viagens",
        "10": "pela sua carreira, pela sua posição e pelo seu bom nome",
        "11": "pelos amigos, pelos contatos, por quem apoia você e pelos frutos do seu trabalho",
        "12": "por um trabalho discreto nos bastidores, por instituições, por lugares distantes ou tranquilos e por assuntos que pedem sigilo"
      },
      style: {
        saturn: "Com dinheiro, você é prudente e paciente; o que mais combina com você é crescer devagar, com segurança, e ter bens que durem.",
        jupiter: "Com dinheiro, você pensa grande; crescimento, aprendizado e generosidade costumam trazer bons retornos para você.",
        mars: "Com dinheiro, você é audaz e age rápido; pode ganhar muito, então estabeleça limites claros para si.",
        venus: "Com dinheiro, a beleza e o conforto falam alto para você; parcerias e tudo o que agrada às pessoas podem trazer lucro.",
        mercury: "Com dinheiro, você tem agilidade e esperteza; comércio, ideias e informação são as suas ferramentas.",
        moon: "Suas finanças andam em ciclos; confie no seu instinto e guarde nos meses bons para os meses mais calmos.",
        sun: "Com dinheiro, você se sai melhor quando está no comando; um negócio próprio ou uma função que leve o seu nome combina com você."
      },
      now: "Neste momento, você está vivendo uma fase de {season}",
      year: "Este ano, a vida coloca em destaque {topics}.",
      yearBiz: "Este ano, os holofotes se voltam para {topics}.",
      advice: {
        sun: "Acredite no seu valor mesmo quando os outros ainda não o enxergam. A sua luz não precisa da permissão de ninguém.",
        moon: "Cuide dos seus sentimentos e do seu corpo; para você, descanso não é luxo. Quando você se sente em segurança, todo o resto se encaixa.",
        mercury: "Vá com calma antes das grandes decisões e diga com clareza o que pensa. A sua mente é afiada; dê a ela tempo para concluir o raciocínio.",
        venus: "Escolha pessoas que fazem bem a você, e não apenas as que são agradáveis. O seu coração merece um amor que também respeite você.",
        mars: "Escolha as suas batalhas. A sua energia é preciosa; quando a raiva subir, transforme-a em ação, e não em conflito.",
        jupiter: "Não prometa mais do que pode cumprir e não confie rápido demais. A sua esperança é um presente; deixe que a sabedoria a guie.",
        saturn: "Seja gentil consigo. Você não precisa carregar o mundo nas costas, e as coisas vão dar certo mesmo que você solte um pouco as rédeas."
      },
      asc: [
        "À primeira vista, você transmite ousadia e vida. Age rápido, diz o que pensa e enche qualquer ambiente de energia; você é mais feliz quando pode abrir caminho.",
        "À primeira vista, você transmite calma e firmeza. Não tem pressa, tem bom gosto e, quando decide algo, sustenta a decisão.",
        "Logo de cara, as pessoas percebem a sua vivacidade e o seu jeito comunicativo. Sua mente é rápida, você se adapta com facilidade e se ilumina quando há algo novo para aprender.",
        "As pessoas percebem em você delicadeza e cuidado. Por trás de uma primeira impressão reservada, existe um coração macio que se lembra de tudo e protege quem ama.",
        "Você transmite calor e confiança. Tem uma presença natural, um coração generoso e adora fazer parte de algo que realmente importa.",
        "As pessoas percebem em você sensatez e competência. Você nota os detalhes que os outros deixam passar e, sem alarde, faz as coisas ficarem melhores.",
        "Você tem uma elegância natural, e é fácil estar ao seu lado. Traz equilíbrio, justiça e beleza, e é nos relacionamentos que você brilha.",
        "Por fora você transmite calma, mas por dentro há uma grande profundidade. Você sente com intensidade, demora a confiar e nunca esquece quem foi bom com você.",
        "Você transmite abertura, sinceridade e liberdade. Adora aprender, viajar e olhar a vida de um ponto de vista mais amplo.",
        "Você transmite seriedade e confiança: logo se vê que dá para contar com você. Sabe o que quer e sobe passo a passo até chegar lá; com o tempo, a vida costuma ficar mais leve para você.",
        "As pessoas percebem em você originalidade e independência. Você pensa com a própria cabeça, se importa com os outros e não tem medo de fazer as coisas de um jeito diferente.",
        "Você transmite bondade e imaginação. Sente o que os outros sentem, e a arte, a música e o lado espiritual da vida falam direto à sua alma."
      ],
      temp: {
        choleric: "Há fogo na sua natureza: paixão, ambição e reações rápidas. Aprender a fazer uma pausa antes de agir é o seu superpoder.",
        sanguine: "Há calor e leveza na sua natureza: você aproveita a vida, e as pessoas adoram estar com você. Cumprir o que promete deixa esse charme ainda mais forte.",
        melancholic: "Há profundidade na sua natureza: você pensa bem nas coisas e percebe o que os outros não veem. Não deixe a preocupação roubar a alegria daquilo que você construiu.",
        phlegmatic: "Há calma na sua natureza: você leva paz e paciência por onde passa. Um pouco mais de ousadia vai levar você mais longe do que imagina."
      },
      season: {
        sun: "brilho: chegou a hora de se mostrar, de liderar e de defender com clareza aquilo em que você acredita.",
        moon: "mudanças e emoções: a casa, a família e o seu mundo interior pedem atenção, e as coisas estão se reorganizando em torno do que você realmente precisa.",
        mercury: "aprendizado e conexões: conversas, estudos, planos e decisões estão em movimento; a sua mente é a sua melhor ferramenta agora.",
        venus: "amor e prazer: relacionamentos, beleza e reconciliações ganham o centro do palco; permita-se aproveitar e se deixe querer.",
        mars: "ação e coragem: os desafios empurram você a decidir e a se mexer; aja com ousadia, mas não compre brigas por impulso.",
        jupiter: "crescimento e oportunidades: portas se abrem, mestres aparecem e a esperança volta; só não exagere.",
        saturn: "construção e amadurecimento: a vida pede paciência e responsabilidade, e o que você construir agora é feito para durar.",
        node: "novos desejos: algo novo e desconhecido está puxando você para a frente, e pode crescer mais do que você planejou.",
        snode: "despedidas: um capítulo antigo está se fechando; soltar o que já terminou abre espaço para o que vem por aí."
      },
      yearTopic: {
        "1": "quem você é: seu corpo, sua imagem e um novo começo",
        "2": "o dinheiro, a sua renda e aquilo que você realmente valoriza",
        "3": "o aprendizado, as conversas, as viagens curtas, seus irmãos e seus vizinhos",
        "4": "a casa, a família, as suas raízes e o lugar a que você pertence",
        "5": "o amor, a alegria, a criatividade e os filhos",
        "6": "a saúde, os hábitos do dia a dia e a sua rotina de trabalho",
        "7": "as parcerias, o casamento e as pessoas mais próximas de você",
        "8": "as mudanças profundas, o dinheiro compartilhado e o desapego do que ficou para trás",
        "9": "as viagens, os estudos, a fé e as grandes perguntas da vida",
        "10": "a carreira, a ambição e o seu lugar no mundo",
        "11": "os amigos, a comunidade e as suas esperanças para o futuro",
        "12": "o descanso, o trabalho interior, a cura e a arte de deixar ir"
      }
    },
    trackShort: {
      note: "Para melhorar as leituras, o que você digita fica salvo.",
      stop: "Não salvar",
      start: "Salvar de novo",
      off: "Nada está sendo salvo."
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
