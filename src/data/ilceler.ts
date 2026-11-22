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
  draft('Aliağa', 'aliaga'),
  draft('Balçova', 'balcova'),
  draft('Bayındır', 'bayindir'),
  draft('Bayraklı', 'bayrakli'),
  draft('Bergama', 'bergama'),
  draft('Beydağ', 'beydag'),
  {
    name: 'Bornova',
    slug: 'bornova',
    status: 'live',
    intro:
      "Bornova, İzmir'in doğusunda, Yamanlar Dağı'nın eteğinde uzanır. Ege Üniversitesi kampüsü, Forum Bornova ve şehirlerarası otobüs terminali bu ilçededir; çevre yolu ile İstanbul otoyolu da buradan geçer. Mevlana Mahallesi'ndeki adresimizden çıkıp ilçenin her mahallesine gideriz. Aracınız Ankara Caddesi'nde, çevre yolunda ya da Belkahve Tüneli'ne giden hatta kaldıysa konumunuzu gönderin, çekicimiz yola çıksın.",
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
      {
        q: 'Bornova ofisiniz nerede?',
        a: 'Mevlana Mah. 1713 Sk. No:3, Bornova / İzmir. Kemalpaşa adresimiz Çambel Mah. 2005 Sk. No:4.',
      },
    ],
  },
  draft('Buca', 'buca'),
  draft('Çeşme', 'cesme'),
  draft('Çiğli', 'cigli'),
  draft('Dikili', 'dikili'),
  draft('Foça', 'foca'),
  draft('Gaziemir', 'gaziemir'),
  draft('Güzelbahçe', 'guzelbahce'),
  draft('Karabağlar', 'karabaglar'),
  draft('Karaburun', 'karaburun'),
  draft('Karşıyaka', 'karsiyaka'),
  {
    name: 'Kemalpaşa',
    slug: 'kemalpasa',
    status: 'live',
    intro:
      "Kemalpaşa, İzmir'in en geniş ilçelerinden biridir; Nif Dağı ile Manisa tarafındaki Spil dağları arasındaki ovada yer alır. Çambel Mahallesi'ndeki adresimiz ilçenin içinde. Ulucak ve Armutlu mahalleleri, organize sanayi bölgesi, otoyol bağlantısı ve Turgutlu'ya giden il yolu üzerinde arıza ya da kaza olursa arayın. Kasalı çekicimiz sizi bulunduğunuz yerden alır.",
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
      {
        q: 'Kemalpaşa adresiniz nerede?',
        a: 'Çambel Mah. 2005 Sk. No:4, Kemalpaşa / İzmir. Bornova adresimiz Mevlana Mah. 1713 Sk. No:3.',
      },
    ],
  },
  draft('Kınık', 'kinik'),
  draft('Kiraz', 'kiraz'),
  draft('Konak', 'konak'),
  draft('Menderes', 'menderes'),
  draft('Menemen', 'menemen'),
  draft('Narlıdere', 'narlidere'),
  draft('Ödemiş', 'odemis'),
  draft('Seferihisar', 'seferihisar'),
  draft('Selçuk', 'selcuk'),
  draft('Tire', 'tire'),
  draft('Torbalı', 'torbali'),
  draft('Urla', 'urla'),
];
