/* Akhtarnameh — Turkish strings for the Love, Money, Buy & sell and Chat sections (merged into the Turkish catalog). */
(function (G) {
  const D = G.I18N_DATA = G.I18N_DATA || {};
  const merge = (a, b) => { Object.keys(b).forEach(k => { if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') merge(a[k], b[k]); else a[k] = b[k]; }); return a; };
  merge(D.tr = D.tr || {}, {
    ui: {
      tab: { love: 'Aşk ve uyum', money: 'Para ve servet', trade: 'Alım ve satım', chat: 'Astrologla sohbet' },
      love: {
        title: 'Aşk ve uyum', intro: 'Aşk mizacınız kendi haritanızdan; bir başka kişiyle uyumunuz ise Ptolemaios\'un kuralıyla, Hindistan\'ın Guna Milan yöntemiyle ve Çin sütunlarıyla yorumlanır.',
        you: 'Haritanız:', change: 'değiştir', partner: 'Diğer kişi', submit: 'Aşkı ve uyumu yorumla',
        hint: 'Yalnızca kendi aşk yorumunuzu görmek için diğer kişiyi boş bırakın. Doğum saati bilinmese de karşılaştırmanın büyük kısmı yapılabilir.',
        yourChart: 'Haritanız', partnerName: 'diğer kişi', sampleNote: 'Bu yorum örnek haritaya göre yapıldı. Kişisel bir yorum için Doğum haritası sekmesine kendi doğum bilgilerinizi girin.',
        head: 'Aşk, evlilik ve uyum', compat: 'Genel uyum', synTitle: 'İki harita nasıl buluşuyor', natalTitle: 'Aşk mizacınız',
        partnerNoTime: 'Diğer kişinin doğum saati bilinmiyor: Yükselen\'i, evleri ve Ay\'ın tam derecesi yaklaşıktır.',
        addPartner: 'Uyumunuzu görmek için diğer kişinin doğum bilgilerini ekleyin.'
      },
      money: {
        title: 'Para ve servet', intro: 'Haritanızda paranın nereden geldiği, onu ne kadar elde tutabildiğiniz, mali üslubunuz, şimdiki dönemin zamanlaması ve önümüzdeki piyasa takvimi.',
        range: 'Takvim aralığı', d90: 'Üç ay', submit: 'Parayı ve zamanlamayı yorumla', head: 'Para, servet ve mali zamanlama',
        natalTitle: 'Para haritanız', calTitle: 'Piyasa takvimi: önümüzdeki {n} gün'
      },
      trade: {
        title: 'Alım ve satım', intro: 'Şimdi almalı mı, satmalı mısınız; en iyi an ne zaman? Lilly\'nin alım satım kuralları ile Biruni ve Bonatti\'nin zaman seçimi ilkelerine göre yorumlanır.',
        action: 'İşlem', buy: 'Satın al', sell: 'Sat', asset: 'Varlık', submit: 'Şimdiyi yorumla ve en iyi zamanları bul',
        disclaimer: 'Önemli uyarı: Bu, geleneksel astrolojik bir yorumdur; yatırım tavsiyesi ya da mali danışmanlık değildir. Piyasalar gerçek risk taşır ve paranızı kaybedebilirsiniz; kararınızı kendi araştırmanıza ya da yetkin bir danışmana dayanarak verin.',
        head: { buy: 'Alım: {asset}', sell: 'Satım: {asset}' }, nowTitle: 'Şu an', scaleNo: 'Bekle', scaleYes: 'Harekete geç',
        bestTitle: { buy: 'Almak için en iyi anlar', sell: 'Satmak için en iyi anlar' },
        rules: 'Kurallar: alıcıyı Yükselen, satıcıyı 7. ev gösterir; 10. ev fiyatı, 4. ev anlaşmanın sonunu gösterir. Ay\'ın ışığı azalırken alım, artarken satış yapın (Biruni, Bonatti); boşluktaki Ay\'dan ve retro Merkür\'den kaçının; varlığın gezegeninin güçlü olması ve Ay\'ın bir iyicile yaklaşması tercih edilir.'
      },
      chat: {
        title: 'Astrologla sohbet', intro: 'Her şeyi sorabilirsiniz: aşk, para, alım satım, iş, önümüzdeki yıl. Her soru, sorulduğu anın soru haritası olarak da çıkarılır.',
        useNatal: 'Doğum haritamı kullan', usePartner: 'Diğer kişiyi de kat (Aşk sekmesinden)', where: 'Bulunduğum yer', ph: 'Sorunuzu yazın…',
        clear: 'Sohbeti temizle', note: 'Cevaplar kesinlik değil, geleneksel sembolik yorumdur.', astrologer: 'Astrolog', ruleFrom: 'Astrolog (klasik kurallar)',
        welcome: 'Hoş geldiniz. Haritanızı Ptolemaios, Ebu Maşer, Biruni, Lilly, Parashara ve Çinli ustaların yöntemleriyle okurum. Bana aşkı, parayı, alım satımı, işi ya da önümüzdeki yılı sorun. Kişisel bir yorum için önce **Doğum haritası** sekmesine doğum bilgilerinizi girin.'
      }
    },
    err: { natalFirst: 'Önce Doğum haritası sekmesinde doğum haritanızı çıkarın.' },
    ai: {
      loveTitle: 'Aşk hakkında astroloğa sorun', lovePh: 'ör. Doğru kişiyle ne zaman tanışacağım?',
      loveSugg: ['Aşk için bir sonraki fırsat ne zaman?', 'Bana gerçekten nasıl bir eş uygun?', 'İlişkilerimde hangi örüntü tekrar ediyor?'],
      loveSuggPair: ['Gerçekten uyumlu muyuz?', 'Bizi ne bir arada tutar, ne ayırabilir?', 'Aramızda evlilik iyi bir fikir mi, olacaksa ne zaman?'],
      moneyTitle: 'Para hakkında astroloğa sorun', moneyPh: 'ör. En çok parayı hangi alanda kazanırım?',
      moneySugg: ['Param gerçekte nereden geliyor?', 'Bu yıl yatırım için iyi bir yıl mı?', 'Maaşlı çalışmak mı, kendi işim mi bana daha uygun?'],
      tradeTitle: 'Bu işlem hakkında astroloğa sorun', tradePh: 'ör. Gelecek haftaya kadar beklemeli miyim?',
      tradeSugg: ['Şimdi mi harekete geçmeliyim, yoksa beklemeli miyim?', 'Fiyat yükselir mi, düşer mi?', 'Bu işlemdeki en büyük risk nedir?'],
      chatSugg: ['Bu yıl hayatıma aşk girecek mi?', 'Yatırım için iyi bir zaman mı?', 'Şimdi almalı mıyım, satmalı mıyım?', 'Bu işe alınacak mıyım?', 'Önümüzdeki yıl benim için nasıl geçecek?']
    },
    syn: {
      meter: { attraction: 'Çekim', harmony: 'Uyum', durability: 'Kalıcılık', friction: 'Sürtüşme' },
      scoresTitle: 'Puanlar', scores: 'Çekim {a}, uyum {h}, kalıcılık {d}, sürtüşme {f} (10 üzerinden).',
      overallTitle: 'Uyum %{pct}',
      overall: {
        strong: 'Güçlü bir bağ: çekim, anlayış ve dayanıklılık birbirini destekliyor. Klasik metinler böyle birliktelikleri talihli olanlar arasında sayar.',
        good: 'İyi bir eşleşme: gerçek bir yakınlık var; yalnızca birkaç nokta bilinçli özen istiyor.',
        work: 'Emek isteyen bir bağ: bir buluşma noktası var, ama farklar büyük; ilişki ancak çaba ve olgunlukla gelişir.',
        hard: 'Zorlu bir birleşim: haritalar farklı yönlere çekiyor. Çok şey öğretebilir, ama uyum kendiliğinden gelmez.'
      },
      overallWhy: 'Sinastri: çekim {a}, uyum {h}, kalıcılık {d}, sürtüşme {f}; Guna Milan 36 üzerinden {k}.',
      ptolTitle: 'Ptolemaios\'un ışıklar kuralı (Tetrabiblos IV.5)',
      ptol: {
        lights: 'Birinin Güneş\'i ile diğerinin Ay\'ı aynı ya da uyumlu burçlarda: Ptolemaios\'a göre kalıcı ve ahenkli bir birlikteliğin ilk işareti.',
        exchange: 'Birinin Güneş\'i diğerinin Ay\'ı ile kavuşumda: evliliğin ve derin, karşılıklı bir tanınmanın klasik imzası.',
        moons: 'İki Ay da aynı ya da uyumlu burçlarda: gündelik hayat, ruh hâlleri ve ihtiyaçlar kendiliğinden uyuşur.',
        none: 'Işıklar uyumlu burçlarda değil: Ptolemaios\'un kuralına göre ahenk başka bağlarla, örneğin Venüs, Jüpiter ve ortak bir amaçla kurulmalıdır.'
      },
      contact: '{a} – {b}: {asp}',
      contactText: {
        conj: 'Birindeki "{x}" ile diğerindeki "{y}" kaynaşıyor (orb {orb}°): bu alanda güçlü ve anında kurulan bir bağ.',
        easy: 'Birindeki "{x}" ile diğerindeki "{y}" birbirini destekliyor (orb {orb}°): bu alanda kolaylık ve doğal bir anlayış.',
        hard: 'Birindeki "{x}" ile diğerindeki "{y}" birbirini zorluyor (orb {orb}°): üzerinde çalışılması gereken bir gerilimi de beraberinde getiren bir çekim.'
      },
      saturnNote: 'Satürn temasları uzun ilişkilerin tutkalıdır: bağlar ve istikrar verir; ama ağır ya da kısıtlayıcı da gelebilir.',
      overlayTitle: 'Her birinin gezegenleri diğerinin evlerinde',
      overlay: { b2a: 'Onun haritasındaki {p}, sizin {h}. evinize düşüyor: {meaning}', a2b: 'Sizin haritanızdaki {p}, onun {h}. evine düşüyor: {meaning}' },
      ovh: { 1: 'güçlü ve kişisel biçimde hissedilir; karşı tarafın kendini nasıl gördüğünü biçimlendirir.', 5: 'romantizm, oyun ve zevk.', 7: 'bizzat evlilik evi: ortaklığa doğal bir çekim.', 8: 'yoğunluk, mahremiyet ve ortak kaynaklar.', 12: 'gizli ya da karmik bir şey; açıklaması zor bir bağ.' },
      kootaTitle: 'Guna Milan (Ashtakoota): 36 üzerinden {n}',
      koota: { varna: 'Varna', vashya: 'Vashya', tara: 'Tara', yoni: 'Yoni', maitri: 'Graha Maitri', gana: 'Gana', bhakoot: 'Bhakoot', nadi: 'Nadi' },
      kootaVerdict: { excellent: 'Hint ölçüsüne göre mükemmel (28 ve üzeri).', good: 'İyi (24 ve üzeri).', fair: 'Kabul edilebilir (18 ve üzeri); evlilik için geleneksel alt sınır.', weak: 'Geleneksel alt sınır olan 18\'in altında.' },
      nadiDosha: 'Nadi dosha: iki Ay da aynı nadide; metinler bunu özellikle sağlık ve çocuklar bakımından en ciddi uyumsuzluk sayar; yine de pek çok iptal koşulu vardır.',
      bhakootDosha: 'Bhakoot dosha: Ay burçları 2-12, 5-9 ya da 6-8 ilişkisinde; bu durum maddi düzeni ya da uyumu zorlayabilir.',
      kootaNote: 'Her iki kişinin sidereal Ay\'ından hesaplanmıştır (Vashya ve Yoni basitleştirilmiştir).',
      baziTitle: 'Çin sütunları: gün efendileri ve dallar',
      baziDm: {
        same: 'İki gün efendisi de aynı evreden ({a} ve {b}): akran ve müttefiksiniz, zaman zaman da rakip.',
        aFeedsB: 'Sizin gün efendiniz {a}, onunkini ({b}) besliyor: siz verir ve desteklersiniz; o sizinle serpilir.',
        bFeedsA: 'Onun gün efendisi {b}, sizinkini ({a}) besliyor: sizi destekler ve büyümenize yardım eder.',
        aControlsB: 'Sizin gün efendiniz {a}, onunkini ({b}) denetliyor: klasik Zi Ping\'de bu, erkeğin eş yıldızıdır; denetim tahakküme dönüşmedikçe geleneksel bir eşleşme.',
        bControlsA: 'Onun gün efendisi {b}, sizinkini ({a}) denetliyor: klasik Zi Ping\'de bu, kadının koca yıldızıdır; düzen ve meydan okuma getiren geleneksel bir eşleşme.'
      },
      baziDay: { clash: 'İki gün dalı (eş sarayları) çatışıyor: canlı, ama ortak gündelik hayatta sürtüşmeye yatkın.', harmony: 'İki gün dalı altılı uyum oluşturuyor: eş sarayları arasında gizli, doğal bir uyum.', same: 'Gün dalları aynı: yakınlıkta benzer ihtiyaçlar.', neutral: 'Gün dalları birbirine karşı nötr.' },
      baziYear: { clash: 'Yıl hayvanları ({a} ve {b}) çatışıyor.', harmony: 'Yıl hayvanları ({a} ve {b}) uyumlu bir çift.', trine: 'Yıl hayvanları ({a} ve {b}) aynı müttefikler üçlüsüne ait.', neutral: 'Yıl hayvanları ({a} ve {b}) birbirine karşı nötr.' }
    },
    love: {
      venusTitle: 'Venüs: nasıl seversiniz', venus: 'Venüs {pos} konumunda, {h}. evde, {word} durumda.',
      venusEl: { fire: 'Ateşle seversiniz: açıkça, hızla, hayranlıkla ve peşine düşerek.', earth: 'Duyularla ve sadakatle seversiniz: yavaş, somut ve uzun vadeli.', air: 'Zihinle seversiniz: sohbet, dostluk ve özgürlük, tutku kadar önemlidir.', water: 'Derinden ve duygusal olarak seversiniz: yakınlığa, güvene ve gerçekten anlaşılmaya ihtiyaç duyarsınız.' },
      venusStrong: 'Güçlü bir Venüs aşkta çekicilik ve talih verir; sevgi size kendiliğinden gelir.', venusWeak: 'Zayıf bir Venüs, aşkın daha fazla çaba ve sağduyu istediğini gösterir; hayal kırıklıkları gerçekte neye değer verdiğinizi öğretir.', venusMid: 'Venüs orta durumda: aşk, seçimlere ve zamanlamaya bağlıdır.',
      venusRetro: 'Doğumda Venüs retro: aşk yeniden gözden geçirilir; eski bağlar geri döner ve gönül geç ama bilerek seçer.', venusCombust: 'Venüs yanık: duygular gizli kalır ya da görevin ve egonun gölgesinde kalır; aşk açığa çıkarıldığında büyür.',
      marsTitle: 'Mars: arzu ve peşine düşme', mars: 'Mars {pos} konumunda, {h}. evde.',
      marsEl: { fire: 'Arzu dolaysız ve cesur; açıkça peşine düşersiniz.', earth: 'Arzu istikrarlı ve bedensel; sevginizi eylemle kanıtlarsınız.', air: 'Arzu zihinde başlar; nükte ve sözler sizi heyecanlandırır.', water: 'Arzu duygusal ve yoğun; derin bir bağa ihtiyaç duyarsınız.' },
      partnerTitle: 'Çekildiğiniz eş (7. ev)', desc: 'Alçalan {sign} burcunda; eş bu yaradılışı gösterme eğilimindedir:',
      lord7: '7. evin yöneticisi {p}, {h}. evde ve {word} durumda: eşlerle {topics} yoluyla tanışılır ve evlilik bu konulara bağlıdır.',
      in7: { sun: '7. evde Güneş: itibarlı ve güçlü karakterli bir eş; kendinizi ilişki üzerinden tanımlayabilirsiniz.', moon: '7. evde Ay: ortaklığa güçlü bir ihtiyaç; eş şefkatli ya da değişken.', mercury: '7. evde Merkür: ruhu genç, konuşkan ya da iş ve ticaretle bağlantılı bir eş.', venus: '7. evde Venüs: mutlu ve ahenkli bir evliliğin en iyi işaretlerinden biri.', mars: '7. evde Mars: tutku, ama kavgalar da; iradesi güçlü bir eş.', jupiter: '7. evde Jüpiter: cömert, bilge ya da talihli bir eş; evlilik büyüme getirir.', saturn: '7. evde Satürn: geç ya da ciddi bir bağlılık, çoğu zaman daha yaşlı ya da sorumluluk sahibi bir eşle; kurulduğunda kalıcıdır.' },
      ptolTitle: 'Ptolemaios\'a göre eşin göstergesi',
      ptolM: 'Ptolemaios erkek için eşi Ay\'dan yorumlar: burada {p} {pos} konumunda, {h}. evde, {mode} bir burçta.',
      ptolF: 'Ptolemaios kadın için kocayı Güneş\'ten yorumlar: burada {p} {pos} konumunda, {h}. evde, {mode} bir burçta.',
      ptolMode: { movable: 'Öncü burç: evlilik erken gelebilir ya da birden fazla olabilir.', fixed: 'Sabit burç: tek ve kalıcı bir evlilik gösterilir.', common: 'Değişken burç: birden fazla önemli birliktelik mümkündür.' },
      ptolHit: { ben: '{p} ile yaptığı {asp} açısı iyi ve yardımsever bir eş vaat eder.', benHard: '{p} ile yaptığı {asp} açısı aşırılıkla karışık bir yarar verir.', malEasy: '{p} ile yaptığı {asp} açısı ciddiyet ve istikrar katar.', mal: '{p} ile yaptığı {asp} açısı sürtüşme, gecikme ya da talepkâr bir eş getirir.' },
      easeTitle: 'Evlilikte kolaylık ya da gecikme',
      d: { satVenus: 'Satürn Venüs\'ü zorluyor', sat7: 'Satürn Alçalan\'a temas ediyor', venusRetro: 'Venüs retro', satIn7: 'Satürn 7. evde', lord7cadent: '7. evin yöneticisi gizli bir evde' },
      e: { jupVenus: 'Jüpiter Venüs\'e yardım ediyor', benIn7: '7. evde bir iyicil var', lord7good: '7. evin yöneticisi iyi yerleşmiş', moonVenus: 'Ay ile Venüs uyum içinde' },
      easeList: 'Lehte olanlar: {list}.', delayList: 'Geciktirenler: {list}.',
      easeVerdict: 'Aşk ve evlilik görece kolay gelir.', delayVerdict: 'Bağlılık olgunluktan sonra, daha geç gelme eğilimindedir; o zaman kurulan sağlamdır.', mixedVerdict: 'Kolaylık ve gecikme dengede: zamanlama ve seçimler belirleyicidir.',
      vedTitle: 'Hint görüşü: 7. ev yöneticisi ve navamsa', ved: 'Sidereal 7. ev yöneticisi {lord}, {h}. bhavada ({topics}). Navamsada (evlilik haritası) Venüs {nav} burcunda.',
      navEl: { fire: 'Atılgan, bağımsız bir eş.', earth: 'Pratik, sadık bir eş.', air: 'Sosyal, zeki bir eş.', water: 'Duyarlı, kendini adayan bir eş.' },
      manglik: 'Kuja dosha (Mars yerleşimi) mevcut: gelenek, benzer bir Mars yerleşimine sahip bir eşi ya da evlenmeden önce sabrı öğütler.',
      baziTitle: 'Çin görüşü: eş sarayı', bazi: 'Eş sarayınızda (gün dalı) {g} bulunuyor: {gt}',
      baziInter: 'Eş sarayı şu etkileşimlerde yer alıyor: {list}.', baziCalm: 'Eş sarayı rahatsız edilmemiş: ortaklığa dair istikrarlı bir iç tablo.',
      baziStarM: 'Erkek için eş yıldızı {el} elementidir; haritadaki gücü {n}.', baziStarF: 'Kadın için koca yıldızı {el} elementidir; haritadaki gücü {n}.', baziStarX: 'Eş yıldızını okumak için Doğum haritası ayarlarında bir cinsiyet seçin.',
      w: { prof: 'profeksiyon yılı {h}. evi etkinleştiriyor (yöneticisi {p})', firdar: 'Venüs firdarı sürüyor', firdarSub: 'firdarın Venüs alt dönemi sürüyor', dasha: '{p} mahadashası', antar: '{p} antardashası ({to} tarihine kadar)' },
      timingTitle: 'Aşkın zamanlaması', timingNow: 'Şu anda etkin: {list}. Tanışmak ya da bağlanmak için elverişli bir dönem.', timingQuiet: 'Şu anda aşkın başlıca zaman efendilerinden hiçbiri etkin değil.',
      jup7: 'Büyük iyicil Jüpiter 7. burcunuzdan ({sign}) geçiyor: {when}; geleneksel olarak evlilik için en güçlü pencere.', jupVenus: 'Jüpiter, {when} tarihinden itibaren Venüs\'ünüzün burcuna geri dönüyor: sevgi ve fırsat mevsimi.'
    },
    money: {
      capacityTitle: 'Servet kapasitesi (2. ev)', house2: '2. ev {sign} burcunda; yöneticisi {p}, {h}. evde ve {word} durumda.', source: 'Para şu yollardan gelir: {topics}.',
      src: { 1: 'kendi kişiliğiniz, becerileriniz ve girişkenliğiniz', 2: 'kendi kaynaklarınız ve zaten elinizde olanlar', 3: 'iletişim, yazı, satış, kısa yolculuklar, kardeşler ve komşular', 4: 'toprak, mülk, aile ve miras kalan temeller', 5: 'yaratıcılık, eğlence, spekülasyon ve çocuklar', 6: 'hizmet, maaşlı iş, zanaat ve sağlık alanındaki işler', 7: 'ortaklar, müşteriler, evlilik ve sözleşmeler', 8: 'başkalarının parası: yatırımcılar, krediler, miras ve ortak varlıklar', 9: 'yabancı ülkeler, öğretim, hukuk, yayıncılık ve seyahat', 10: 'kariyer, otorite ve kamusal itibar', 11: 'dostlar, çevre, hamiler ve işin kazancı', 12: 'perde arkasındaki işler, kurumlar, uzak ya da yalıtılmış yerler ve gizli konular' },
      in2: { sun: '2. evde Güneş: mevki, önderlik ve görünürlük yoluyla kazanç; statü için harcama.', moon: '2. evde Ay: dalgalı gelir; halktan, yiyecekten, evlerden ya da değişen her şeyden kazanç.', mercury: '2. evde Merkür: akılla kazanç: ticaret, yazı, öğretim, rakamlar.', venus: '2. evde Venüs: servetin klasik işareti; güzellik, sanat, zevk ya da ortaklık yoluyla kazanç.', mars: '2. evde Mars: cesur kazanç ve cesur harcama; emek, mühendislik ya da riskle gelen para.', jupiter: '2. evde Jüpiter: bolluğun en iyi imzası; para büyür ve geri döner.', saturn: '2. evde Satürn: yavaş kurulan ve özenle korunan servet; başta darlık, sonra sağlamlık.' },
      lotsTitle: 'Talih ve Mal Noktaları', fortune: 'Talih Noktası {pos} konumunda, {h}. evde ({topics}); yöneticisi {p} {word} durumda.', substance: 'Mal Noktası (Ebu Maşer) {pos} konumunda, {h}. evde ({topics}); yöneticisi {p} {word} durumda.',
      jupTitle: 'Servetin göstergesi Jüpiter', jup: 'Jüpiter {pos} konumunda, {h}. evde ({topics}), {word} durumda.', jupStrong: 'Güçlü bir Jüpiter: fırsatlar gelir ve cömertlik katlanarak geri döner.', jupWeak: 'Zayıf bir Jüpiter: büyüme disiplin ister; aşırı genişlemeye ve yanlış kişilere güvenmeye karşı dikkatli olun.', jupMid: 'Jüpiter orta durumda: büyüme emeği ve iyi öğüdü izler.',
      flowsTitle: 'Gelir, kariyer ve başkalarının parası', flows: '11. evin yöneticisi (işten gelen gelir) {p11}: {w11} durumda, {h11}. evde. 10. evin yöneticisi (kariyer) {p10}: {w10} durumda. 8. evin yöneticisi (krediler, yatırımcılar, miras) {p8}: {w8} durumda, {h8}. evde.',
      flows8: 'Başkalarının parası kendi gelirinizden güçlü: ortaklıklar, yatırımcılar, krediler ya da miras büyük rol oynar.', flows11: 'Kendi kazancınız başkalarının parasından güçlü: gelirinizi işiniz ve çevreniz üzerinden kurun.', flowsEven: 'Kendi geliriniz ile başkalarının parası dengede.',
      styleTitle: 'Mali mizacınız', style: 'Paranıza önce {p}, ardından {q} yön veriyor.',
      styleText: { value: 'Satürn üslubu: sabırlı, değer odaklı ve uzun vadeli; gayrimenkul, arazi ve yavaş birikim size uygun.', growth: 'Jüpiter üslubu: büyüme ve genişleme; eğitim, yayıncılık, hukuk, uluslararası girişimler.', aggressive: 'Mars üslubu: hızlı, rekabetçi ve risk alan; kesin sınırlar koyun.', beauty: 'Venüs üslubu: güzellik, tasarım, lüks, konukseverlik ve ortaklıklar.', trader: 'Merkür üslubu: alım satım, ticaret, teknoloji ve bilgi; hızlı kararlar.', cyclical: 'Ay üslubu: döngüsel ve sezgisel; tüketim malları, gıda, konut; döngüleri izleyin.', leader: 'Güneş üslubu: önderlik, kendi girişiminiz ve kamusal itibar.' },
      styleSecond: 'İkincil not: {text}', uranus: 'Uranüs para evlerinize temas ediyor: ani kazançlar ve kayıplar; teknoloji ve sıra dışı olan.', neptune: 'Neptün para evlerinize temas ediyor: sezgi, ama karışıklık da; her şeyi yazılı olarak doğrulayın.',
      baziTitle: 'Çin görüşü: servet yıldızı', bazi: 'Servet elementiniz {el} (gücü {n}); gezegeni {p}.',
      baziCase: { strongStrong: 'Güçlü gün efendisi ve güçlü servet yıldızı: büyük bir serveti taşıyabilirsiniz. Klasik metinler buna zengin harita der.', strongWeak: 'Güçlü gün efendisi, zayıf servet yıldızı: kapasite var ama fırsatlar yaratılmalı; servet elverişli şans sütunlarında gelir.', weakStrong: 'Güçlü bir servet karşısında zayıf gün efendisi: servet görünür ama taşıması ağırdır. Ortaklıklar, destek ve borç konusunda temkin anahtardır.', weakWeak: 'İkisi de mütevazı: ani kazançlardan çok istikrarlı, emekle kazanılmış bir refah; önce kaynaklarınızı kurun.' },
      vedTitle: 'Hint görüşü: servet ve kazanç yöneticileri', ved: '2. ev yöneticisi {l2}, {h2}. bhavada; 11. ev yöneticisi {l11}, {h11}. bhavada.', vedYogas: 'Servetle ilgili yogalar: {list}.', vedNone: 'Belirgin bir klasik servet yogası yok; servet, 2. ve 11. ev yöneticilerinin dashalarını izler.',
      t: { prof: 'profeksiyon yılı {h}. evi etkinleştiriyor', profLord: 'yılın efendisi {p} bir para evini yönetiyor', jup: 'Jüpiter {h}. evinizden geçiyor', sat: 'Satürn {h}. evinizden geçiyor (kemerleri sıkın ve sağlamlaştırın)', dasha: '{p} mahadashası', luck: 'şans sütunu servet elementinizi taşıyor', zr: 'Talih Noktası\'ndan zodyakal salınım bir zirve döneminde' },
      timingTitle: 'Şu anki mali zamanlama', timing: 'Şu anda etkin: {list}.', timingQuiet: 'Şu anda önemli bir mali zaman efendisi etkin değil: büyük hamlelerden çok istikrarlı çalışma ve hazırlık dönemi.'
    },
    cal: {
      newMoon: '{sign} burcunda Yeni Ay', fullMoon: '{sign} burcunda Dolunay',
      newMoonText: 'Bir başlangıç: geleneksel olarak başlamak, ekmek ve uzun vade için almak için iyidir.', fullMoonText: 'Bir doruk: işler olgunluğa ulaşır; geleneksel olarak satmak ve tamamlamak için iyi, başlamak için kötüdür.',
      station: { mercury: { retro: 'Merkür retrosu başlıyor: gecikmeler, yanlış anlamalar ve yeniden gözden geçirilen anlaşmalar. Sözleşmeleri iki kez okuyun.', direct: 'Merkür düz harekete dönüyor: iletişim ve anlaşmalar netleşir.' }, venus: { retro: 'Venüs retrosu başlıyor: değerler ve fiyatlar yeniden tartılır; lüks alımlardan kaçının.', direct: 'Venüs düz harekete dönüyor: değere duyulan güven geri gelir.' }, mars: { retro: 'Mars retrosu başlıyor: enerji içe döner; saldırgan hamlelerden kaçının.', direct: 'Mars düz harekete dönüyor: ivme geri gelir.' } },
      eclipse: 'Tutulmalar ani dönüm noktalarına işaret eder; geleneksel astrologlar tutulmaların yakınında başlamaktan ya da taahhüde girmekten kaçınır.'
    },
    trade: {
      assetKw: {
        stocks: ['hisse senedi', 'hisse ', 'hisse?', 'hisseler', 'hissemi', 'hisse al', 'hisse sat', 'borsa', 'bist', 'endeks', 'yatırım fonu', 'pay senedi', 'nasdaq'],
        crypto: ['kripto', 'bitcoin', 'btc', 'ethereum', 'altcoin', 'coin', 'token', 'dijital para', 'usdt'],
        gold: ['altın ', 'altın?', 'altını', 'altınım', 'altınlar', 'altına yatırım', 'altin ', 'altini', 'gram altın', 'gümüş', 'gumus', 'külçe', 'bilezik', 'değerli metal', 'reşat'],
        currency: ['dolar', 'euro', 'avro', 'döviz', 'doviz', 'sterlin', 'yabancı para', 'para birimi', 'kur farkı', 'forex'],
        property: [' ev ', 'ev al', 'ev sat', 'evimi', 'evi sat', 'daire', 'konut', ' arsa ', 'arsamı', 'arazi', 'tarla', 'mülk', 'gayrimenkul', 'emlak', 'apartman', 'villa', 'tapu'],
        vehicle: ['araba', 'otomobil', 'araç al', 'araç sat', 'aracımı', 'motosiklet', 'motor', 'kamyon', 'minibüs', 'taşıt'],
        goods: ['mallar', 'malları', 'ticari mal', 'ürün', 'stok', 'envanter', 'emtia', 'toptan']
      },
      asset: { stocks: 'Hisse senetleri', crypto: 'Kripto para', gold: 'Altın ve değerli metaller', currency: 'Döviz', property: 'Ev ya da gayrimenkul', vehicle: 'Araba ya da taşıt', goods: 'Mal ve ticari ürün' },
      sig: { buy: 'Alıcı olarak sizin göstergeniz {a}, satıcınınki {b}; fiyatı {price}, alınan şeyi {thing}, anlaşmanın sonunu {end} gösteriyor.', sell: 'Satıcı olarak sizin göstergeniz {a}, alıcınınki {b}; fiyatı {price}, satılan şeyi {thing}, anlaşmanın sonunu {end} gösteriyor.' },
      sameLord: 'İki tarafı da tek bir gezegen ({p}) yönetiyor: anlaşma sizin elinizde.',
      deal: '{a} ile {b}, {date} tarihinde {asp} açısını tamamlıyor: anlaşma yapılabilir.', noDeal: '{a} ile {b} yakın zamanda bir araya gelmiyor: anlaşmanın şimdi kapanması olası değil.',
      edgeYou: 'Sizin göstergeniz {a}, karşı tarafınkinden ({b}) güçlü: avantaj sizde.', edgeThem: 'Karşı tarafın göstergesi ({b}) sizinkinden ({a}) güçlü: avantaj onlarda; dikkatle pazarlık edin.', edgeEven: 'İki tarafın göstergeleri ({a} ve {b}) benzer güçte.',
      price: { high: '10. evin yöneticisi ({p}) güçlü ve köşede: fiyat yüksek ya da katı.', low: '10. evin yöneticisi ({p}) zayıf ya da düşen evde: fiyat düşük ya da pazarlığa açık.', fair: '10. evin yöneticisi ({p}) orta durumda: fiyat makul.' },
      moonWaxing: 'Ay\'ın ışığı artıyor: geleneğe göre fiyatlar yükselme eğilimindedir; bu da satışı destekler.', moonWaning: 'Ay\'ın ışığı azalıyor: geleneğe göre fiyatlar düşme eğilimindedir; bu da alımı destekler.',
      thing: 'Varlığın gezegeni {p}, {word} durumda.', thingRetro: 'Gezegen retro: tereddütler, iadeler ya da gizli kusurlar.',
      end: 'Anlaşmanın sonu (4. evin yöneticisi {p}) {word} durumda.', mercRetro: 'Ticaretin efendisi Merkür retro: evraklarda hatalar ve fikir değişiklikleri.',
      verdict: {
        buy: { go: 'Alım yapın: gök şu anda almayı destekliyor.', lean: 'Alıma yakın; fiyat ve koşullara dikkat ederek.', wait: 'Bekleyin: işaretler karışık; daha iyi bir an aşağıda listeleniyor.', no: 'Şimdi almayın: tanıklıklar aleyhte.' },
        sell: { go: 'Satış yapın: gök şu anda satmayı destekliyor.', lean: 'Satışa yakın; fiyat ve koşullara dikkat ederek.', wait: 'Bekleyin: işaretler karışık; daha iyi bir an aşağıda listeleniyor.', no: 'Şimdi satmayın: tanıklıklar aleyhte.' }
      }
    },
    elr: { waningBuy: 'Ay\'ın ışığı azalıyor (alım için iyi)', waxingBuy: 'Ay\'ın ışığı artıyor (fiyatlar yükselir)', waxingSell: 'Ay\'ın ışığı artıyor (satış için iyi)', waningSell: 'Ay\'ın ışığı azalıyor (fiyatlar düşer)', edgeYou: 'göstergeniz karşı taraftan güçlü', edgeThem: 'karşı taraf daha güçlü' },
    chat: {
      buyKw: ['satın al', 'satin al', ' almalı', ' almali', ' alayım', ' alsam', ' alırsam', ' alalım', ' almak ist', 'alım yap', 'alım için', 'yatırım yapmalı', 'yatırım yapayım', 'yatırım yapsam'],
      sellKw: ['satmalı', 'satmali', 'satayım', 'satsam', 'satarsam', 'satalım', 'satmak', 'satış yap', 'satış için', 'satışa', 'elden çıkar', 'nakde çevir', 'bozdur', 'kâr al', 'kar al', 'kâr realize', 'kar realize'],
      tradeIntro: 'Lilly\'nin alım satım kurallarıyla bu an için yorumlandı ({asset}):', tradeMore: 'Alım ve satım sekmesi önümüzdeki en iyi anları listeler.',
      ruleIntro: 'Soru astrolojisinin klasik kurallarıyla bu an için yorumlandı (konu: {topic}):',
      ruleNatal: 'Doğum haritanızda {h}. ev:',
      ruleNote: 'Daha kapsamlı ve sohbet tarzında bir cevap için bu sayfayı Claude içinde açın.'
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
