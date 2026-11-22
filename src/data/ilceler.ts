export interface Ilce {
  name: string;
  slug: string;
  status: 'live' | 'draft';
  intro: string;
  roads: string[];
  landmarks: string[];
  neighbours: string[];
  faq: { q: string; a: string }[];
}

const draft = (name: string, slug: string): Ilce => ({
  name,
  slug,
  status: 'draft',
  intro: '',
  roads: [],
  landmarks: [],
  neighbours: [],
  faq: [],
});

export const ilceler: Ilce[] = [
  {
    name: "Aliağa",
    slug: "aliaga",
    status: 'draft',
    intro: "Aliağa, İzmir'in kuzeyinde, Ege kıyısında bir sanayi ilçesidir. Petkim, TÜPRAŞ ve SOCAR STAR rafinerisi gibi büyük tesisler burada; Nemrut Körfezi'nde gemi söküm alanı da var. Menemen–Çandarlı Otoyolu ilçenin içinden geçer. Otoyolda, liman yollarında ya da sanayi tesislerinin çevresinde aracınız yolda kaldıysa konumunuzu gönderin, kasalı çekici size gelsin.",
    roads: [
      "Menemen–Çandarlı Otoyolu (O-33)",
      "D.550 bağlantıları (O-33 çıkışları)",
    ],
    landmarks: [
      "Petkim, TÜPRAŞ ve SOCAR STAR rafinerisi",
      "Aliağa Kuş Cenneti",
      "Kyme antik kenti",
      "Nemrut Körfezi",
    ],
    neighbours: ["Bergama", "Foça", "Menemen"],
    faq: [
      { q: "Aliağa otoyolunda aracım durdu, ne yapmalıyım?", a: "Mümkünse aracı emniyet şeridine çekin, dörtlüleri yakın ve bariyerin arkasına geçin. Sonra arayın ya da konumunuzu WhatsApp ile gönderin." },
      { q: "Sanayi bölgesinden aracımı servise taşır mısınız?", a: "Evet. Aracı kasaya alıp söylediğiniz servise, eve ya da başka bir adrese bırakırız." },
    ],
  },
  {
    name: "Balçova",
    slug: "balcova",
    status: 'draft',
    intro: "Balçova, Narlıdere ile Konak arasında kalan küçük bir kıyı ilçesi. Termal tesisleri, teleferiği ve İzmir Marina burada. Ata Caddesi ile Mithatpaşa Caddesi alışveriş sokakları; İzmir–Çeşme Otoyolu ise çevre yoluna Balçova'da bağlanır. Dar sokakta park halindeki aracınız çalışmıyorsa ya da bağlantı yolunda bozulduysa bize yazın, aracı yüklenip istediğiniz yere götürürüz.",
    roads: [
      "İzmir–Çeşme Otoyolu (O-32) başlangıcı",
      "İzmir Çevre Yolu (O-30) bağlantısı",
      "Ata Caddesi",
      "Mithatpaşa Caddesi",
    ],
    landmarks: [
      "Balçova Termal Tesisleri",
      "Balçova Teleferiği",
      "İzmir Marina",
      "Cengiz Saran Barajı",
    ],
    neighbours: ["Konak", "Karabağlar", "Narlıdere"],
    faq: [
      { q: "Teleferik çevresindeki yokuşta aracım çalışmıyor, gelir misiniz?", a: "Konumunuzu WhatsApp ile gönderin, bulunduğunuz yere gelip aracı kasaya alırız." },
      { q: "Otoyol çıkışında akü bitti, akü takviyesi yapar mısınız?", a: "Evet, akü takviyesi hizmetimiz var. Araç yine de çalışmazsa kasaya alıp servise götürürüz." },
    ],
  },
  {
    name: "Bayındır",
    slug: "bayindir",
    status: 'draft',
    intro: "Bayındır, Kemalpaşa, Torbalı, Tire ve Ödemiş arasında, tarıma dayalı bir ovada yer alır. Çiçek Festivali ve Zeytinova Barajı ilçenin bilinen yerleri; ilk Osmanlı darphanesinin de burada kurulduğu anlatılır. Köyler arası yollar uzun geçer. Bayındır–Ödemiş yolunda ya da köy yollarında kaldıysanız arayın, konumunuza kasalı çekici yollayalım.",
    roads: [
      "Bayındır–Ödemiş yolu",
    ],
    landmarks: [
      "Bayındır Kalesi",
      "Zeytinova Barajı",
      "Falaka Çayı",
      "Çiçek Festivali",
    ],
    neighbours: ["Kemalpaşa", "Torbalı", "Tire", "Ödemiş"],
    faq: [
      { q: "Bayındır–Ödemiş yolunda lastiğim patladı, ne yapayım?", a: "Aracı yolun dışına çekin, dörtlüleri yakın. Lastiği değiştiremiyorsanız konumunuzu gönderin; lastik desteği için ya da aracı kasaya alıp lastikçiye götürmek için geliriz." },
      { q: "Köy yolunda benzinim bitti, yakıt getirir misiniz?", a: "Yakıt desteği veriyoruz. Konumunuzu WhatsApp ile gönderin." },
    ],
  },
  {
    name: "Bayraklı",
    slug: "bayrakli",
    status: 'draft',
    intro: "Bayraklı, körfezin kuzeyinde Karşıyaka ile Konak arasında uzanan, gökdelenleriyle tanınan bir ilçe. Folkart Towers, Şehir Hastanesi ve Westpark Outlet burada. Altınyol ile çevre yolu ilçeyi boydan boya geçer ve çevre yolu Bayraklı tünellerinden geçer. Tünelde, Anadolu Caddesi'nde ya da bir sitenin otoparkında kalırsanız yeri söyleyin, aracı yükleyip götürelim.",
    roads: [
      "Altınyol (D.550)",
      "İzmir Çevre Yolu (O-30) ve Bayraklı Tünelleri",
      "Anadolu Caddesi",
    ],
    landmarks: [
      "Folkart Towers",
      "İzmir Bayraklı Şehir Hastanesi",
      "Westpark Outlet",
      "Tepekule Höyüğü",
    ],
    neighbours: ["Karşıyaka", "Bornova", "Konak"],
    faq: [
      { q: "Bayraklı tünelinde aracım durursa ne yapmalıyım?", a: "Dörtlüleri yakın, aracı mümkünse tünelin kenarına alın ve güvenli bir yere geçin. Tünelin hangi yönünde olduğunuzu söyleyerek bizi arayın." },
      { q: "Şehir Hastanesi önünde aracım çalışmıyor, çekici gelir mi?", a: "Evet. Konumunuzu gönderin, aracı kasaya alıp servise ya da eve bırakırız." },
    ],
  },
  {
    name: "Bergama",
    slug: "bergama",
    status: 'draft',
    intro: "Bergama, Pergamon Akropolü, Asklepion ve Kızıl Avlu ile İzmir'in en eski yerleşimlerinden biri. İlçe kuzeyde Balıkesir, doğuda Manisa sınırına dayanır. İvrindi'ye giden karayolu ile Dikili yolu ilçenin ana bağlantıları. Gezi sırasında ya da yolda aracınız bozulursa bize konum atın.",
    roads: [
      "Bergama–Dikili karayolu",
      "Bergama–İvrindi karayolu",
    ],
    landmarks: [
      "Pergamon Akropolü",
      "Asklepion",
      "Kızıl Avlu",
      "Bergama Müzesi",
      "Allianoi",
    ],
    neighbours: ["Aliağa", "Kınık", "Dikili"],
    faq: [
      { q: "Pergamon ya da Asklepion ziyaretinde aracım çalışmazsa ne olur?", a: "Konumunuzu gönderin, aracı kasaya alıp istediğiniz yere götürürüz." },
      { q: "Allianoi yolunda kırsalda kaldım, gelebilir misiniz?", a: "Evet. Konumunuzu WhatsApp ile gönderin ya da yakındaki köyün adını yazın." },
    ],
  },
  {
    name: "Beydağ",
    slug: "beydag",
    status: 'draft',
    intro: "Beydağ, Ödemiş ile Kiraz arasında, Küçük Menderes havzasında yer alan küçük ve dağlık bir ilçe. Küçük Menderes üzerindeki Beydağ Barajı gölü ilçenin en tanınmış yeri. İzmir'den ve Ödemiş'ten ilçeye otobüs hatları var. Beydağ'a giden yolda araç bozulursa ya da yakıt biterse arayın, köylere de gideriz.",
    roads: [
      "Ödemiş–Beydağ yolu",
      "Beydağ–Kiraz yolu",
    ],
    landmarks: [
      "Beydağ Barajı",
      "Küçük Menderes vadisi",
    ],
    neighbours: ["Ödemiş", "Kiraz"],
    faq: [
      { q: "Beydağ Barajı çevresinde telefon çekmeyen yerde aracım bozuldu, ne yapmalıyım?", a: "Aracı yolun kenarına alıp dörtlüleri yakın. Telefon çekiyorsa konumunuzu gönderin; çekmiyorsa biraz yüksekçe bir yere çıkın ya da geçen bir araçtan yardım isteyin." },
      { q: "Dağ yolunda yakıt bitti, getirir misiniz?", a: "Yakıt desteği veriyoruz. Konumunuzu iletin, telefonda konuşalım." },
    ],
  },
  {
    name: 'Bornova',
    slug: 'bornova',
    status: 'live',
    intro:
      "Bornova, İzmir'in doğusunda, Yamanlar Dağı'nın eteğinde uzanır. Ege Üniversitesi kampüsü, Forum Bornova ve şehirlerarası otobüs terminali bu ilçededir; çevre yolu ile İstanbul otoyolu da buradan geçer. İlçenin her mahallesine gideriz. Aracınız Ankara Caddesi'nde, çevre yolunda ya da Belkahve Tüneli'ne giden hatta kaldıysa konumunuzu gönderin, çekicimiz yola çıksın.",
    roads: [
      'İzmir Çevre Yolu (O-30)',
      'İstanbul otoyolu (O-5) ve Belkahve Tüneli',
      'Karasuluk bağlantısı ve D.300 (Ankara yolu)',
      'Ankara Caddesi',
      'Kamil Tunca Bulvarı',
    ],
    landmarks: [
      'Ege Üniversitesi kampüsü',
      'Forum Bornova',
      'İzmir Şehirlerarası Otobüs Terminali (İZOTAŞ)',
      'Belkahve Geçidi',
    ],
    neighbours: ['Kemalpaşa', 'Buca', 'Konak', 'Bayraklı', 'Karşıyaka', 'Menemen'],
    faq: [
      {
        q: 'Bornova çevre yolunda aracım bozulursa ne yapmalıyım?',
        a: 'Aracı yol dışına ya da emniyet şeridine çekin, dörtlüleri yakın, üçgen reflektörü koyun ve araçtan inip bariyerin arkasına geçin. Sonra bizi arayın ya da konumunuzu WhatsApp ile gönderin.',
      },
      {
        q: 'Bornova içinde aracımı nereye bırakabilirsiniz?',
        a: "İstediğiniz yere: evinize, bir servise ya da başka bir adrese. Bornova içinde de İzmir'in diğer ilçelerinde de aracı kasaya alıp söylediğiniz adrese bırakırız.",
      },
    ],
  },
  {
    name: "Buca",
    slug: "buca",
    status: 'draft',
    intro: "Buca, Konak'ın güneyinde, İzmir'in kalabalık ilçelerinden biri. Dokuz Eylül Üniversitesi Tınaztepe Kampüsü, Şirinyer ve Kaynaklar burada. İzmir–Aydın Otoyolu çevre yolundan Buca'daki Işıkkent bağlantısında ayrılır. Dar mahalle sokaklarında park eden araçlar kolay sıkışır; çalışmayan aracınızı sokaktan çıkarıp servise taşırız.",
    roads: [
      "İzmir Çevre Yolu (O-30)",
      "İzmir–Aydın Otoyolu (O-31) Işıkkent bağlantısı",
    ],
    landmarks: [
      "Dokuz Eylül Üniversitesi Tınaztepe Kampüsü",
      "Şirinyer ve Şirinyer Hipodromu",
      "Kaynaklar",
      "Buca Göleti",
    ],
    neighbours: ["Konak", "Bornova", "Kemalpaşa", "Torbalı", "Menderes", "Gaziemir", "Karabağlar"],
    faq: [
      { q: "Işıkkent bağlantısında otoyola girerken aracım durdu, ne yapayım?", a: "Aracı mümkünse bağlantı yolunun kenarına çekin, dörtlüleri yakın ve bariyerin arkasına geçin. Sonra konumunuzu WhatsApp ile gönderin." },
      { q: "Dar sokakta araç sıkıştı, kasaya alabilir misiniz?", a: "Sokağa bakarız. Konumunuzu ve sokağın fotoğrafını gönderin, kasanın girip giremeyeceğini birlikte görelim." },
    ],
  },
  {
    name: "Çeşme",
    slug: "cesme",
    status: 'draft',
    intro: "Çeşme, Karaburun Yarımadası'nın batı ucunda, Sakız Adası'na bakan bir tatil ilçesi. Çeşme Kalesi, Ilıca, Alaçatı ve Altınkum ilçedeki bilinen yerler. İzmir–Çeşme Otoyolu ve D.300 ilçeye ulaşır; Çeşme Limanı da ilçede. Limana giderken ya da plaj yolunda aracınız kalırsa arayın, kasalı çekici yola çıksın.",
    roads: [
      "İzmir–Çeşme Otoyolu (O-32)",
      "D.300 Çeşme–İzmir yolu",
      "Alaçatı bağlantısı",
    ],
    landmarks: [
      "Çeşme Kalesi ve Müzesi",
      "Çeşme Limanı",
      "Ilıca",
      "Alaçatı",
      "Altınkum",
    ],
    neighbours: ["Urla"],
    faq: [
      { q: "Gemiye yetişecektim, aracım Çeşme yolunda bozuldu. Ne yapmalıyım?", a: "Önce güvenli yere geçin, sonra bizi arayın. Aracı kasaya alıp servise ya da söylediğiniz adrese götürürüz." },
      { q: "Alaçatı ve Ilıca tarafına gelir misiniz?", a: "Evet, İzmir geneline hizmet veriyoruz. Konumunuzu gönderin." },
    ],
  },
  {
    name: "Çiğli",
    slug: "cigli",
    status: 'draft',
    intro: "Çiğli, körfezin kuzey kıyısında, Karşıyaka ile Menemen arasında kalır. Atatürk Organize Sanayi Bölgesi, Balatçık ve Gediz Deltası ilçenin sınırları içinde. İzmir–Çanakkale karayolu yüksek kesimle kıyı ovasını ayırır, çevre yolu da ilçeden geçer. Sanayi sitelerinde ya da çevre yolu çıkışlarında araç kalırsa ararsanız, aracı kasaya alıp teslim ederiz.",
    roads: [
      "İzmir Çevre Yolu (O-30)",
      "İzmir–Çanakkale karayolu",
    ],
    landmarks: [
      "Atatürk Organize Sanayi Bölgesi",
      "Balatçık",
      "Çiğli Tren İstasyonu",
      "İzmir Kuş Cenneti",
      "Çamaltı Tuzlası",
    ],
    neighbours: ["Menemen", "Karşıyaka"],
    faq: [
      { q: "OSB içinde ticari aracım arızalandı, taşıyabilir misiniz?", a: "Aracın cinsini ve nerede olduğunu yazın, kasaya uygun olup olmadığına birlikte bakarız." },
      { q: "Gediz Deltası kıyısında yumuşak zeminde aracım saplandı, ne yapayım?", a: "Gaza basıp tekerleği daha çok gömmeyin. Dörtlüleri yakıp konumunuzu gönderin; araca bakarak ne yapabileceğimizi söyleriz." },
    ],
  },
  {
    name: "Dikili",
    slug: "dikili",
    status: 'draft',
    intro: "Dikili, İzmir'in kuzeybatı ucunda, Balıkesir sınırında bir sahil ilçesi. Çandarlı Kalesi, Bademli ve Nebiler'in kaplıcaları ve Dikili Limanı bilinen yerleri. Bergama'dan gelen karayolu ilçeye iner. Tatil dönüşü, kaplıca yolunda ya da Çandarlı tarafında aracınız kalırsa ararsanız, aracı kasaya alıp götürürüz.",
    roads: [
      "Bergama–Dikili karayolu",
    ],
    landmarks: [
      "Çandarlı Kalesi",
      "Dikili Limanı",
      "Bademli Deniz Ilıcası",
      "Nebiler Şelalesi",
      "Atatürk Botanik Bahçesi",
    ],
    neighbours: ["Bergama"],
    faq: [
      { q: "Dikili'de tatilde aracım bozuldu, otele kadar çekilir mi?", a: "Evet. Aracı kasaya alıp otele, servise ya da eve bırakabiliriz. Nereye gideceğini siz söylersiniz." },
      { q: "Nebiler ya da Bademli yolunda kaldım, gelir misiniz?", a: "Konumunuzu WhatsApp ile gönderin; yakındaki köy ya da tesisin adını da yazarsanız yeri daha çabuk buluruz." },
    ],
  },
  {
    name: "Foça",
    slug: "foca",
    status: 'draft',
    intro: "Foça, Siren Kayalıkları, tarihi liman dokusu ve Akdeniz foklarıyla bilinen sakin bir yarımada ilçesi. Eski Foça ile Yenifoça arasında sahil boyunca yerleşimler uzanır. Menemen–Çandarlı Otoyolu'ndan ayrılan il yolu Foça'ya iner. Çarşıdaki dar sokaklarda ya da Yenifoça yolunda araç çalışmazsa bize haber verin, aracı kasaya alıp götürelim.",
    roads: [
      "Foça il yolu (P.35-79)",
      "Menemen–Çandarlı Otoyolu (O-33) bağlantısı",
    ],
    landmarks: [
      "Siren Kayalıkları",
      "Eski Foça",
      "Yenifoça",
      "Küçükdeniz Koyu'ndaki ortaçağ kalesi",
      "Şeytan Hamamı",
    ],
    neighbours: ["Aliağa", "Menemen"],
    faq: [
      { q: "Foça'nın dar sokaklarında araç kapandı, çıkarabilir misiniz?", a: "Sokağı ve aracın yerini yazın ya da fotoğraf atın. Kasa ulaşabiliyorsa aracı yükleriz." },
      { q: "Yenifoça yolunda lastik patladı, ne yapmalıyım?", a: "Aracı yolun kenarına çekip dörtlüleri yakın. Lastik desteği ya da aracı lastikçiye götürmek için arayın." },
    ],
  },
  {
    name: "Gaziemir",
    slug: "gaziemir",
    status: 'draft',
    intro: "Gaziemir, Adnan Menderes Havalimanı'nın ve Ege Serbest Bölgesi'nin bulunduğu ilçedir. Fuar İzmir, Optimum Outlet ve Akçay Caddesi'ndeki mobilya ve tekstil atölyeleri burada. Çevre yolu ilçeden geçer; Sarnıç çevresinde sanayi tesisleri toplanır. Havalimanı yolunda, fuar sırasında ya da sanayi alanında aracınız yolda kaldıysa konum gönderin.",
    roads: [
      "İzmir Çevre Yolu (O-30)",
      "Akçay Caddesi",
    ],
    landmarks: [
      "Adnan Menderes Havalimanı",
      "Ege Serbest Bölgesi",
      "Fuar İzmir",
      "Optimum Outlet",
      "Seydiköy Tümülüsü",
    ],
    neighbours: ["Karabağlar", "Buca", "Menderes"],
    faq: [
      { q: "Uçağa yetişecektim, havalimanı yolunda aracım durdu. Ne yapmalıyım?", a: "Aracı güvenli yere alıp bizi arayın. Aracı kasaya alıp servise ya da eve bırakırız; siz taksiyle yola devam edebilirsiniz." },
      { q: "Fuar alanı çevresinde park halindeki aracım çalışmıyor, gelir misiniz?", a: "Evet. Konumunuzu gönderin, aracı kasaya alıp istediğiniz adrese bırakırız." },
    ],
  },
  {
    name: "Güzelbahçe",
    slug: "guzelbahce",
    status: 'draft',
    intro: "Güzelbahçe, körfezin güney kıyısında, Narlıdere ile Urla arasında uzanan bir sahil ilçesi. Yelki, Maltepe, Yalı ve Çamlı mahalleleri kıyıda; İnkaya Mağarası ve vapur iskelesi ilçenin bilinen yerleri. İzmir–Çeşme Otoyolu bu ilçeden geçer ve Seferihisar il yolu buradan ayrılır. Sahil yolunda ya da mahalle içinde aracınız kalırsa ararsanız, kasalı çekici yola çıkar.",
    roads: [
      "İzmir–Çeşme Otoyolu (O-32)",
      "Seferihisar il yolu (P.35-39)",
    ],
    landmarks: [
      "İnkaya Mağarası",
      "Güzelbahçe Vapur İskelesi",
      "Kilizman Şehitlik Anıtı",
      "Yelki",
      "Maltepe",
    ],
    neighbours: ["Narlıdere", "Karabağlar", "Urla", "Seferihisar"],
    faq: [
      { q: "Seferihisar yoluna ayrılırken aracım arıza yaptı, ne yapayım?", a: "Aracı yol kenarına alın, dörtlüleri yakın. Hangi kavşağa yakın olduğunuzu söyleyin ya da konumunuzu gönderin." },
      { q: "Yelki'de yazlıkta akü bitti, takviye yapar mısınız?", a: "Evet, akü takviyesi yapıyoruz. Olmazsa aracı kasaya alıp servise götürürüz." },
    ],
  },
  {
    name: "Karabağlar",
    slug: "karabaglar",
    status: 'draft',
    intro: "Karabağlar, Konak'ın güneyinde, Buca ve Gaziemir arasında yoğun yerleşimli bir ilçe. İzmir Atatürk Eğitim ve Araştırma Hastanesi ile Demokrasi Üniversitesi burada; Bozyaka'nın eski bağları 1970'lere kadar korunmuş. Çevre yolu ilçenin içinden geçer. Hastane çevresinde, mahalle sokaklarında ya da çevre yolu çıkışlarında aracınız bozulursa konumunuzu gönderin.",
    roads: [
      "İzmir Çevre Yolu (O-30)",
    ],
    landmarks: [
      "İzmir Atatürk Eğitim ve Araştırma Hastanesi",
      "İzmir Demokrasi Üniversitesi",
      "Bozyaka bağları",
    ],
    neighbours: ["Konak", "Buca", "Gaziemir", "Menderes", "Güzelbahçe", "Seferihisar", "Balçova", "Narlıdere"],
    faq: [
      { q: "Hastane önünde aracım çalışmıyor, çabuk gelir misiniz?", a: "Konumunuzu WhatsApp ile gönderin. Hasta ya da çocukla bekliyorsanız yazın; aracı kasaya alıp istediğiniz yere götürürüz." },
      { q: "Eğimli sokakta park ettiğim araç kayıyor, ne yapmalıyım?", a: "Tekerlekleri kaldırım tarafına çevirin, vitese takın ve el frenini çekin. Araç çalışmıyorsa bizi arayın." },
    ],
  },
  {
    name: "Karaburun",
    slug: "karaburun",
    status: 'draft',
    intro: "Karaburun, İzmir'in en batısındaki yarımadada, Urla'nın kuzeyinde yer alır. Mordoğan ve Küçükbahçe beldeleri, Bodrum Koyu ve Büyük Ada'daki fener ilçeyi tanıtır. İzmir'den gelen D.505 yolu yarımadaya girer; İYTE'den Mordoğan'a giden yol da yenilenmiş. Mordoğan yolunda ya da kıyı köylerinde araç kalırsa ararsanız, aracı kasaya alırız.",
    roads: [
      "Karaburun yolu (D.505)",
      "İYTE–Mordoğan yolu",
    ],
    landmarks: [
      "Mordoğan",
      "Küçükbahçe",
      "Bodrum Koyu",
      "Büyük Ada ve feneri",
      "Saip İskelesi",
    ],
    neighbours: ["Urla"],
    faq: [
      { q: "Karaburun'un uzak köylerinde aracım bozuldu, gelir misiniz?", a: "Köyün adını ve konumunuzu gönderin. Yarımadada mesafe uzun olduğu için nerede olduğunuzu net yazmanız yeter." },
      { q: "Mordoğan yolunda virajda araç patinaj yaptı, ne yapmalıyım?", a: "Aracı yolun dışına, görünür bir yere çekip dörtlüleri yakın. Ardından konumu ve araç durumunu bize yazın." },
    ],
  },
  {
    name: "Karşıyaka",
    slug: "karsiyaka",
    status: 'draft',
    intro: "Karşıyaka, körfezin kuzey kıyısında, vapurlarıyla bilinen bir ilçe. Karşıyaka Vapur İskelesi, Bostanlı, Mavişehir ve Yamanlar Dağı ilçeye ait. Çevre yolu Karşıyaka Tüneli'nden geçer; Opera İzmir de bu ilçede. Tünelde ya da mahalle sokaklarında aracınız kalırsa, nerede durduğunuzu bize yazın, kasaya alıp teslim edelim.",
    roads: [
      "İzmir Çevre Yolu (O-30)",
      "Karşıyaka Tüneli",
    ],
    landmarks: [
      "Karşıyaka Vapur İskelesi",
      "Bostanlı",
      "Opera İzmir",
      "Latife Hanım Köşkü Anı Evi",
      "Yamanlar Dağı",
    ],
    neighbours: ["Bayraklı", "Bornova", "Menemen", "Çiğli"],
    faq: [
      { q: "Karşıyaka tünelinde aracım durdu, ne yapmalıyım?", a: "Dörtlüleri yakın, mümkünse aracı tünelin kenarına alın. Araçta beklemek yerine güvenli yere geçip bizi arayın." },
      { q: "Bostanlı'da dar sokakta kilitlendim, kasa girebilir mi?", a: "Sokağın genişliğine göre bakarız. Sokağın fotoğrafını ve konumunuzu gönderin." },
    ],
  },
  {
    name: 'Kemalpaşa',
    slug: 'kemalpasa',
    status: 'live',
    intro:
      "Kemalpaşa, Nif Dağı ile Manisa tarafındaki Spil dağları arasındaki ovada yer alır. Ulucak ve Armutlu mahalleleri, organize sanayi bölgesi, otoyol bağlantısı ve Turgutlu'ya giden il yolu üzerinde arıza ya da kaza olursa arayın. Kasalı çekicimiz sizi bulunduğunuz yerden alır.",
    roads: [
      'İstanbul otoyolu (O-5) Kemalpaşa bağlantısı',
      'Necdet Bukey Caddesi (İstiklal ve Ulucak yönü)',
      'Ulucak-Kemalpaşa Caddesi',
      'Kemalpaşa-Turgutlu il yolu (35-25)',
    ],
    landmarks: [
      'Kemalpaşa Organize Sanayi Bölgesi',
      'Nif Dağı ve Karabel Geçidi',
      'Kemalpaşa Tren İstasyonu',
      'Nymphaion (Vatatzes sarayı kalıntıları)',
    ],
    neighbours: ['Bornova', 'Buca', 'Torbalı', 'Bayındır'],
    faq: [
      {
        q: 'Kemalpaşa otoyol bağlantısında aracım durdu, ne yapayım?',
        a: 'Aracı mümkünse emniyet şeridine alın, dörtlüleri yakın ve bariyerin arkasına geçin. Konumunuzu WhatsApp ile gönderin ya da arayın; hangi bağlantıda olduğunuzu söylemeniz yeter.',
      },
      {
        q: 'Sanayi bölgesindeki bir aracı alır mısınız?',
        a: 'Evet. Kemalpaşa içinde de çevresinde de arızalı ya da kazalı aracı kasaya alıp istediğiniz yere bırakırız.',
      },
    ],
  },
  {
    name: "Kınık",
    slug: "kinik",
    status: 'draft',
    intro: "Kınık, İzmir'in kuzeydoğusunda, Yunt ve Madra dağları arasındaki bir ova ilçesidir. Bakırçay, Mamurt Kalesi ve Kybele Tapınağı kalıntıları ilçenin tarihi ve doğal yerleri. Bergama ve Manisa'nın Soma ilçesiyle komşudur. Köyler arasındaki yolda ya da yaylada aracınız kalırsa ararsanız, çekicimiz gelir.",
    roads: [
      "Kınık devlet yolu",
    ],
    landmarks: [
      "Mamurt Kalesi ve Kybele Tapınağı",
      "Asar Kalesi",
      "Yunt Dağları",
      "Bakırçay",
    ],
    neighbours: ["Bergama"],
    faq: [
      { q: "Kınık'ta köy yolunda arıza yaptım, hangi bilgiyi vermeliyim?", a: "Köyün adını, konumunuzu ve aracın durumunu yazın. Telefon çekmezse yakındaki bir köyden arayın." },
      { q: "Yunt Dağları'nda yayladan dönerken araç kapandı, ne yapmalıyım?", a: "Aracı eğimli yolda sabitleyin, dörtlüleri yakın ve konumunuzu gönderin." },
    ],
  },
  {
    name: "Kiraz",
    slug: "kiraz",
    status: 'draft',
    intro: "Kiraz, Bozdağ'dan Salihli'ye ve Nazilli'ye uzanan geçişte yer alan küçük bir ilçe. Hisar Kalesi, İsa Bey Ulu Camii, Suludere köyü ve Küçük Menderes şelalesi ilçenin yerleri. Köylerin çoğu Bozdağ'ın yamaçlarında ya da eteklerinde. Dağ yolunda ya da pazar yeri çevresinde aracınız kalırsa arayın, aracı kasaya alırız.",
    roads: [
      "Ödemiş–Kiraz yolu",
      "Bozdağ geçişi",
    ],
    landmarks: [
      "Kiraz Kalesi (Hisar Kalesi)",
      "İsa Bey Ulu Camii",
      "Küçük Menderes Şelalesi",
      "Suludere Köyü",
    ],
    neighbours: ["Ödemiş", "Beydağ"],
    faq: [
      { q: "Kiraz'dan Ödemiş'e inerken fren boşaldı, ne yapmalıyım?", a: "Düşük vitese alın ve motor freniyle yavaşlayın. Güvenli bir yerde durabilirseniz dörtlüleri yakıp bizi arayın." },
      { q: "Suludere'de köy yolunda kaldım, gelir misiniz?", a: "Evet. Köyün adını ve konumunuzu gönderin." },
    ],
  },
  {
    name: "Konak",
    slug: "konak",
    status: 'draft',
    intro: "Konak, İzmir'in tarihi merkezi; Konak Meydanı, Saat Kulesi, Kemeraltı Çarşısı, Kadifekale ve Agora burada. Kültürpark ile Alsancak ve Basmane de ilçenin içinde. Kıyı boyunca sahil yolu uzanır; çarşıda sokaklar dardır. Çarşıda ya da sahilde aracınız çalışmazsa bize yazın, kasalı çekici sizi bulsun.",
    roads: [
      "Konak sahil yolu",
      "Mustafa Kemal Sahil Bulvarı",
    ],
    landmarks: [
      "Konak Meydanı ve Saat Kulesi",
      "Kemeraltı Çarşısı",
      "Kadifekale",
      "İzmir Agorası",
      "Kültürpark",
      "Tarihî Asansör",
    ],
    neighbours: ["Bayraklı", "Bornova", "Buca", "Karabağlar", "Balçova"],
    faq: [
      { q: "Kemeraltı'nda dar sokakta araç çalışmıyor, çıkarabilir misiniz?", a: "Sokağın girişini ve genişliğini yazın. Kasayla ulaşabiliyorsak yükleriz; ulaşamıyorsak en yakın uygun noktadan alırız." },
      { q: "Kültürpark çevresinde otoparkta aracım kaldı, gelir misiniz?", a: "Evet. Otoparkın adını söylemeniz yeter. Aracı kasaya alıp istediğiniz adrese bırakırız." },
    ],
  },
  {
    name: "Menderes",
    slug: "menderes",
    status: 'draft',
    intro: "Menderes, eski adıyla Cumaovası, güneyde Ege kıyısına açılan geniş bir ilçe. Gümüldür, Özdere ve Ahmetbeyli plajları ile Klaros, Notion ve Kolophon antik kentleri burada. İzmir–Aydın Otoyolu ilçeden geçer; havalimanı çıkışı da ilçe sınırında. Tahtalı Barajı yolunda, otoyolda ya da yazlık sitelerde aracınız kalırsa ararsanız, kasalı çekici yola çıkar.",
    roads: [
      "İzmir–Aydın Otoyolu (O-31) Havalimanı çıkışı",
      "D.550 Menderes bağlantısı",
    ],
    landmarks: [
      "Gümüldür plajı",
      "Özdere",
      "Klaros antik kenti",
      "Tahtalı Barajı",
      "Ahmetbeyli",
    ],
    neighbours: ["Seferihisar", "Gaziemir", "Karabağlar", "Buca", "Torbalı", "Selçuk"],
    faq: [
      { q: "Havalimanı çıkışında otoyolda aracım durdu, ne yapmalıyım?", a: "Aracı mümkünse emniyet şeridine çekin, dörtlüleri yakın ve bariyerin arkasına geçin. Çıkışın adını ya da konumunuzu gönderin." },
      { q: "Özdere'de yazlıkta aracım çalışmıyor, gelir misiniz?", a: "Evet. Konumunuzu gönderin, aracı kasaya alıp servise ya da evinize götürürüz." },
    ],
  },
  {
    name: "Menemen",
    slug: "menemen",
    status: 'draft',
    intro: "Menemen, körfezin kuzeyinde, Gediz Deltası'nın kıyısında yer alır. Çevre yolu burada Menemen–Çandarlı Otoyolu'na bağlanır; Manisa ve Turgutlu yönüne D.250 ayrılır. Asarlık, Emiralem ve Maltepe ilçenin semtleri; 1930'daki Menemen Olayı da bu ilçede yaşandı. Otoyol bağlantılarında ya da ovadaki yollarda aracınız kalırsa ararsanız, nerede durduğunuzu söylemeniz yeter.",
    roads: [
      "İzmir Çevre Yolu (O-30) Menemen bağlantısı",
      "Menemen–Çandarlı Otoyolu (O-33)",
      "D.250 Manisa yönü",
    ],
    landmarks: [
      "Gediz Deltası",
      "Asarlık",
      "Emiralem",
      "Maltepe",
    ],
    neighbours: ["Aliağa", "Foça", "Çiğli", "Karşıyaka", "Bornova"],
    faq: [
      { q: "Çevre yolu ile otoyolun bağlandığı yerde aracım durdu, ne yapmalıyım?", a: "Aracı bağlantı yolunun kenarına alın, dörtlüleri yakın. Hangi çıkışta olduğunuzu ya da konumunuzu gönderin." },
      { q: "Tarla yolunda aracım çamura saplandı, çıkarır mısınız?", a: "Konumunuzu ve aracın durumunu gönderin; zemine bakıp çıkarma konusunu konuşalım." },
    ],
  },
  {
    name: "Narlıdere",
    slug: "narlidere",
    status: 'draft',
    intro: "Narlıdere, körfezin güney kıyısında, Balçova ile Güzelbahçe arasında bir ilçe. Narlıdere Kışlası, Atatürk Kültür Merkezi, Dokuz Eylül Üniversitesi Tıp Fakültesi Hastanesi ve Narlıdere Şehitliği buradadır. İzmir–Çeşme Otoyolu ilçeden geçer. Hastane çevresinde, sahil mahallelerinde ya da otoyol çıkışında aracınız bozulursa konumunuzu gönderin, aracı kasaya alalım.",
    roads: [
      "İzmir–Çeşme Otoyolu (O-32)",
      "D.300 Narlıdere bağlantısı",
    ],
    landmarks: [
      "Narlıdere Kışlası",
      "Atatürk Kültür Merkezi",
      "DEÜ Tıp Fakültesi Hastanesi",
      "Narlıdere Şehitliği",
      "Limanreis",
    ],
    neighbours: ["Balçova", "Karabağlar", "Güzelbahçe"],
    faq: [
      { q: "Hastane girişinde aracım yolu kapattı, çabuk çıkarır mısınız?", a: "Konumunuzu hemen gönderin, yolu kapattığınızı yazın. Aracı kasaya alıp başka yere bırakırız." },
      { q: "Limanreis sahil yolunda yakıt bitti, getirir misiniz?", a: "Yakıt desteğimiz var. Konumunuzu WhatsApp ile gönderin." },
    ],
  },
  {
    name: "Ödemiş",
    slug: "odemis",
    status: 'draft',
    intro: "Ödemiş, Küçük Menderes Ovası'nın ortasında yer alan geniş bir ilçe. Bozdağ Kayak Merkezi, Birgi ve Gölcük Gölü ilçeyi tanıtır. İzmir'den gelenler Aydın Otoyolu'nun Torbalı–Ödemiş çıkışından Bayındır–Ödemiş yoluna girer; Salihli yönünden gelenler Bozdağ'dan iner. Dağ yolunda ya da ova yolunda aracınız kalırsa ararsanız, nereden geldiğinizi söyleyin.",
    roads: [
      "Aydın Otoyolu Torbalı–Ödemiş çıkışı",
      "Bayındır–Ödemiş yolu",
      "Bozdağ–Ödemiş yolu",
    ],
    landmarks: [
      "Bozdağ Kayak Merkezi",
      "Birgi",
      "Gölcük Gölü",
      "Küçük Menderes Nehri",
      "Ödemiş Müzesi",
    ],
    neighbours: ["Kiraz", "Beydağ", "Bayındır", "Tire"],
    faq: [
      { q: "Bozdağ'dan inerken aracımın freni ısındı, ne yapmalıyım?", a: "Düşük viteste inin, fren pedalına sürekli basmayın. Güvenli bir yerde durup frenin soğumasını bekleyin; gerekirse bizi arayın." },
      { q: "Kışın Bozdağ yolunda karda kaldım, gelir misiniz?", a: "Konumunuzu gönderin ve yolun açık olup olmadığını yazın. Yol durumuna göre uygun noktaya kadar geliriz." },
    ],
  },
  {
    name: "Seferihisar",
    slug: "seferihisar",
    status: 'draft',
    intro: "Seferihisar, Türkiye'nin ilk Cittaslow yani sakin şehir unvanını alan ilçedir. Sığacık limanı ve kalesi, Teos antik kenti, Akarca, Ürkmez ve Doğanbey ilçenin yerleri. Güzelbahçe'den ayrılan il yolu ilçeye iner. Sahil yollarında ya da Sığacık çevresinde aracınız bozulursa bize yazın, aracı kasaya alıp götürelim.",
    roads: [
      "Güzelbahçe–Seferihisar il yolu (P.35-39)",
      "İzmir–Çeşme Otoyolu (O-32) Güzelbahçe çıkışı",
    ],
    landmarks: [
      "Sığacık Kalesi ve Marina",
      "Teos antik kenti",
      "Ürkmez",
      "Doğanbey",
      "Akarca",
    ],
    neighbours: ["Urla", "Güzelbahçe", "Karabağlar", "Menderes"],
    faq: [
      { q: "Sığacık'ta aracım marina yakınında kapandı, ne yapayım?", a: "Konumunuzu gönderin. Aracı kasaya alıp servise ya da kaldığınız yere götürürüz." },
      { q: "Ürkmez yolunda lastik patladı, gelir misiniz?", a: "Konumunuzu gönderin; lastik desteği verir ya da aracı kasaya alıp lastikçiye götürürüz." },
    ],
  },
  {
    name: "Selçuk",
    slug: "selcuk",
    status: 'draft',
    intro: "Selçuk, Efes Antik Kenti, Artemis Tapınağı, Meryem Ana Evi, İsa Bey Camii ve Şirince köyüyle İzmir'in en çok turist gören ilçelerinden biri. İzmir–Aydın Otoyolu Belevi çıkışında Selçuk'a iner. Efes yolunda ya da Şirince'ye çıkarken aracınız kalırsa ararsanız, kasalı çekici yola çıkar.",
    roads: [
      "İzmir–Aydın Otoyolu (O-31) Belevi çıkışı",
      "D.550 Selçuk bağlantısı",
    ],
    landmarks: [
      "Efes Antik Kenti",
      "Artemis Tapınağı",
      "Meryem Ana Evi",
      "İsa Bey Camii",
      "Selçuk Kalesi",
      "Şirince",
    ],
    neighbours: ["Menderes", "Torbalı", "Tire"],
    faq: [
      { q: "Efes ziyaretinde araç park yerinde çalışmadı, ne yapayım?", a: "Konumunuzu gönderin, aracı kasaya alıp istediğiniz yere götürürüz." },
      { q: "Şirince yolunda eğimde araç geri kaçtı, ne yapmalıyım?", a: "Fren yapın, el frenini çekin ve tekerlekleri kaldırım tarafına çevirin. Sonra bizi arayın." },
    ],
  },
  {
    name: "Tire",
    slug: "tire",
    status: 'draft',
    intro: "Tire, Küçük Menderes Nehri'nin kenarında, Ödemiş, Bayındır, Torbalı ve Selçuk ile komşu bir ilçe. Tire Kent Müzesi ve Halkapınar köyündeki II. Teos mezarı bilinen yerleri. İzmir–Aydın Otoyolu'nun Belevi çıkışından Tire yoluna geçilir. Köy yollarında ya da şehir içinde aracınız kalırsa ararsanız, kasalı çekici size gelsin.",
    roads: [
      "İzmir–Aydın Otoyolu (O-31) Belevi çıkışı ve Tire yolu",
      "İzmir–Aydın karayolu",
    ],
    landmarks: [
      "Tire Kent Müzesi",
      "Küçük Menderes Nehri",
      "II. Teos mezarı (Halkapınar)",
    ],
    neighbours: ["Ödemiş", "Bayındır", "Torbalı", "Selçuk"],
    faq: [
      { q: "Belevi çıkışından sonra Tire yolunda araç durdu, ne yapmalıyım?", a: "Aracı yol kenarına alıp dörtlüleri yakın. Konumunuzu gönderin, bulunduğunuz yerden alırız." },
      { q: "Halkapınar köyü yolunda kaldım, gelir misiniz?", a: "Köyün adını ve konumunuzu gönderin; kasalı çekici yola çıksın." },
    ],
  },
  {
    name: "Torbalı",
    slug: "torbali",
    status: 'draft',
    intro: "Torbalı, Kemalpaşa ile Selçuk arasında, İzmir–Aydın Otoyolu'nun bir bağlantısını barındıran ilçe. Metropolis antik kenti ve Torbalı Tren İstasyonu buradadır. Karabel Geçidi Kemalpaşa üzerinden Ankara yoluna bağlanır. Otoyolda, Ayrancılar ya da Yazıbaşı çevresinde aracınız kalırsa konum gönderin.",
    roads: [
      "İzmir–Aydın Otoyolu (O-31) Torbalı bağlantısı",
      "D.550 Torbalı yolu",
      "Karabel Geçidi",
    ],
    landmarks: [
      "Metropolis antik kenti",
      "Torbalı Tren İstasyonu",
      "Ayrancılar",
      "Yazıbaşı",
    ],
    neighbours: ["Buca", "Kemalpaşa", "Bayındır", "Tire", "Selçuk", "Menderes"],
    faq: [
      { q: "Torbalı çıkışında otoyoldan inerken aracım durdu, ne yapmalıyım?", a: "Aracı bağlantı yolunun dışına çekin, dörtlüleri yakın ve bariyerin arkasına geçin. Çıkışın adını ya da konumunuzu gönderin." },
      { q: "Metropolis yakınındaki yolda lastik patladı, gelir misiniz?", a: "Evet. Konumunuzu gönderin, lastik desteği verir ya da aracı kasaya alıp lastikçiye götürürüz." },
    ],
  },
  {
    name: "Urla",
    slug: "urla",
    status: 'draft',
    intro: "Urla, İzmir'in batısında, Çeşme Yarımadası'nın başında yer alan bağ ve deniz ilçesi. Klazomenai antik kenti, Limantepe Höyüğü, İYTE kampüsü ve Bademler tiyatrosu burada. İzmir–Çeşme Otoyolu ilçeden geçer; Karaburun yolu da Urla'dan ayrılır. Otoyolda ya da bağ evlerine giden yollarda aracınız kalırsa ararsanız, nerede durduğunuzu söylemeniz yeter.",
    roads: [
      "İzmir–Çeşme Otoyolu (O-32) Urla bağlantısı",
      "Karaburun yolu (D.505)",
      "D.300",
    ],
    landmarks: [
      "Klazomenai antik kenti",
      "Limantepe Höyüğü",
      "İzmir Yüksek Teknoloji Enstitüsü",
      "Bademler tiyatrosu",
      "Sanat Sokağı",
    ],
    neighbours: ["Güzelbahçe", "Seferihisar", "Çeşme", "Karaburun"],
    faq: [
      { q: "Karaburun yoluna ayrılan kavşakta aracım durdu, ne yapmalıyım?", a: "Aracı kavşağın dışına, güvenli bir yere alın ve dörtlüleri yakın. Konumunuzu gönderin; hangi yöne gittiğinizi de yazın." },
      { q: "Bağ evine giden toprak yolda araç saplandı, çıkarır mısınız?", a: "Aracı zorlamayın. Konumunuzu ve yolun durumunu yazın, ne yapabileceğimize bakalım." },
    ],
  },
];
