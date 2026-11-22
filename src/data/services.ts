import type { Job } from './jobs';

export interface Service {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  body: string[];
  whenToCall: string[];
  faq: { q: string; a: string }[];
  jobId: Job['id'];
}

export const services: Service[] = [
  {
    slug: 'ariza-kurtarma',
    name: 'Arıza kurtarma',
    metaTitle: 'İzmir Arıza Kurtarma, 7/24 Çekici | Ahmet Dadak',
    metaDescription:
      "Aracınız yolda mı kaldı? İzmir'in her ilçesinde gece gündüz arıza kurtarma. Arayın ya da konumunuzu gönderin, aracınızı istediğiniz yere bırakalım.",
    lead: 'Aracınız çalışmıyorsa ya da yolda durduysa arayın. Çekicimizle gelir, aracı istediğiniz yere bırakırız.',
    body: [
      "Motor durduğunda, araç marş basmadığında ya da bir uyarı lambası sizi yolda bıraktığında yapılacak şey basit: arayın. Konumunuzu söyleyin ya da WhatsApp'tan gönderin, çekicimiz size gelsin.",
      'Aracınızı kendi çekicimizin kasasına alır, güvenle taşırız. Nereye gitmesini istediğiniz size kalmış: evinize, tanıdığınız bir servise ya da başka bir adrese.',
      "İzmir'in her ilçesine hizmet veriyoruz, gece gündüz, hafta sonu dahil.",
    ],
    whenToCall: [
      'Araç marş basmıyor ya da çalışırken durdu.',
      'Yolda bir arıza çıktı, devam etmek güvenli değil.',
      'Araç vites almıyor ya da fren ve direksiyonda sorun var.',
      'Aracınızı servise ya da evinize götürmek istiyorsunuz.',
      'Aracınız dar bir sokakta ya da park yerinde sıkıştı.',
    ],
    faq: [
      {
        q: 'Aracı nereye bırakırsınız?',
        a: 'İstediğiniz yere. Servis, ev, iş yeri ya da başka bir adres; adresi arama sırasında söylemeniz yeterli.',
      },
      {
        q: 'Konumumu nasıl bildiririm?',
        a: "Telefonda adresi anlatabilir ya da WhatsApp'tan canlı konumunuzu gönderebilirsiniz. Konum göndermek en kolay yoldur.",
      },
      {
        q: 'Gece de geliyor musunuz?',
        a: 'Evet, 7/24 çalışıyoruz. Gece yarısı da hafta sonu da arayabilirsiniz.',
      },
    ],
    jobId: 'partner',
  },
  {
    slug: 'kaza-oto-kurtarma',
    name: 'Kaza oto kurtarma',
    metaTitle: 'İzmir Kaza Oto Kurtarma, 7/24 Çekici | Ahmet Dadak',
    metaDescription:
      "Kazadan sonra aracınızı yoldan alıyoruz. İzmir'in her ilçesinde gece gündüz oto kurtarma; arayın ya da konumunuzu gönderin, istediğiniz yere bırakalım.",
    lead: 'Kazadan sonra aracınız yolda kaldıysa arayın. Aracı yoldan alır, istediğiniz yere taşırız.',
    body: [
      'Kaza anı kötü bir andır; araç yolda, siz telaştasınız. Önce kendinizin ve yanınızdakilerin iyi olduğundan emin olun, sonra bizi arayın.',
      'Çekicimizle gelir, aracınızı kasaya alıp taşırız. Hasarlı araç da olsa yerinde bırakmak zorunda değilsiniz; nereye götürmek istediğinizi söylemeniz yeterli.',
      "İzmir'in her ilçesine geliyoruz. Konumunuzu telefonda anlatabilir ya da WhatsApp'tan gönderebilirsiniz.",
    ],
    whenToCall: [
      'Kaza oldu, araç yürümüyor.',
      'Araç yolda ya da yol kenarında kaldı.',
      'Hasarlı aracı servise ya da eve götürmek istiyorsunuz.',
    ],
    faq: [
      {
        q: 'Hasarlı aracı taşıyor musunuz?',
        a: 'Evet. Aracı kendi çekicimizin kasasına alır, istediğiniz adrese bırakırız.',
      },
      {
        q: 'Önce neyi yapmalıyım?',
        a: "Önce kendinizin ve yanınızdakilerin güvende olduğundan emin olun. Sonra bizi arayın ya da konumunuzu WhatsApp'tan gönderin.",
      },
      {
        q: 'Aracı nereye götürürsünüz?',
        a: 'Nereye isterseniz oraya: servis, ev ya da başka bir adres.',
      },
    ],
    jobId: 'maserati',
  },
  {
    slug: 'aku-takviyesi',
    name: 'Akü takviyesi',
    metaTitle: 'İzmir Akü Takviyesi, 7/24 Yol Yardım | Ahmet Dadak',
    metaDescription:
      "Akünüz bittiyse bulunduğunuz yerde takviye yapıyoruz. İzmir'in her ilçesinde gece gündüz; arayın ya da konumunuzu WhatsApp'tan gönderin.",
    lead: 'Aracınız marş basmıyorsa akü bitmiş olabilir. Arayın, bulunduğunuz yerde takviye yapalım.',
    body: [
      'Sabah işe giderken ya da gece geç saatte araç tık demiyorsa en sık sebep aküdür. Aracı çekmeye gerek kalmadan, bulunduğunuz yerde takviye yaparız.',
      'Takviye yetmezse aracınızı çekicimize alıp istediğiniz yere bırakırız; böylece yolda kalmazsınız.',
      "Konumunuzu telefonda anlatın ya da WhatsApp'tan gönderin. İzmir'in her ilçesine geliyoruz.",
    ],
    whenToCall: [
      'Kontağı çevirdiniz, araç tık demiyor.',
      'Farlar ya da ön panel çok sönük yanıyor.',
      'Aracı uzun süre kullanmadınız ve çalışmıyor.',
      'Işığı açık unuttunuz, akü bitti.',
    ],
    faq: [
      {
        q: 'Aracı çekmeniz gerekir mi?',
        a: 'Gerekmez; bulunduğunuz yerde takviye yaparız. Takviye yetmezse aracı çekiciyle istediğiniz yere bırakırız.',
      },
      {
        q: 'Gece de takviyeye geliyor musunuz?',
        a: 'Evet. 7/24 çalışıyoruz, gece gündüz arayabilirsiniz.',
      },
    ],
    jobId: 'sedan-apartman',
  },
  {
    slug: 'lastik-destegi',
    name: 'Lastik desteği',
    metaTitle: 'İzmir Lastik Desteği, 7/24 Yol Yardım | Ahmet Dadak',
    metaDescription:
      "Lastiğiniz patladıysa yolda yanınızdayız. İzmir'in her ilçesinde gece gündüz lastik desteği; arayın ya da konumunuzu WhatsApp'tan gönderin.",
    lead: 'Lastiğiniz patladıysa ya da inmişse arayın. Yolda yanınızda oluruz.',
    body: [
      'Yolda lastik patlaması kötü bir sürprizdir, özellikle gece ya da yağmurda. Arayın, konumunuzu söyleyin; destek için size geliriz.',
      'Aracı güvenle devam ettiremiyorsanız çekicimize alıp istediğiniz yere, örneğin bir lastikçiye ya da evinize bırakırız.',
      "İzmir'in her ilçesine geliyoruz. Gece gündüz, hafta sonu dahil.",
    ],
    whenToCall: [
      'Lastik patladı ya da hızla iniyor.',
      'Lastiği kendiniz değiştiremiyorsunuz.',
      'Yolun kenarında, güvenli olmayan bir yerde kaldınız.',
      'Aracı lastikçiye götürmek istiyorsunuz.',
    ],
    faq: [
      {
        q: 'Patlak lastikle devam edebilir miyim?',
        a: 'Hayır, patlak ya da inmiş lastikle sürmek güvenli değildir. Aracı durdurun ve bizi arayın.',
      },
      {
        q: 'Aracı lastikçiye götürür müsünüz?',
        a: 'Evet. Aracı çekicimize alır, istediğiniz yere, örneğin bir lastikçiye bırakırız.',
      },
    ],
    jobId: 'caddy-viraj',
  },
  {
    slug: 'yakit-destegi',
    name: 'Yakıt desteği',
    metaTitle: 'İzmir Yakıt Desteği, 7/24 Yol Yardım | Ahmet Dadak',
    metaDescription:
      "Yakıtınız bittiyse yola devam etmeniz için destek veriyoruz. İzmir'in her ilçesinde gece gündüz; arayın ya da konumunuzu WhatsApp'tan gönderin.",
    lead: 'Yakıtınız bittiyse arayın. Yola devam etmeniz için size destek veririz.',
    body: [
      'Depo boşaldığında araç yolun ortasında susar. Telaşa gerek yok: arayın, konumunuzu söyleyin, size gelelim.',
      'Gerekirse aracınızı çekicimize alıp istediğiniz yere, örneğin en yakın istasyona ya da evinize bırakırız.',
      "İzmir'in her ilçesine geliyoruz, gece gündüz.",
    ],
    whenToCall: [
      'Yakıt bitti, araç yolda durdu.',
      'Yakın bir istasyona kadar gidemeyeceğinizi düşünüyorsunuz.',
      'Gece ya da tenha bir yerde kaldınız.',
    ],
    faq: [
      {
        q: 'Yakıt bitince ne yapmalıyım?',
        a: 'Güvenli bir yere çekilin, flaşörleri yakın ve bizi arayın ya da konumunuzu WhatsApp\'tan gönderin.',
      },
      {
        q: 'Aracı istasyona götürebilir misiniz?',
        a: 'Evet, aracı çekicimize alıp istediğiniz yere bırakırız.',
      },
    ],
    jobId: 'sedan-sokak',
  },
  {
    slug: 'alkollu-surucu-arac-tasima',
    name: 'Alkollü sürücü araç taşıma',
    metaTitle: 'Alkollü Sürücü Araç Taşıma İzmir | Ahmet Dadak',
    metaDescription:
      "İçki içtiyseniz direksiyona geçmeyin, bizi arayın. İzmir'de gece gündüz aracınızı çekiciyle eve ya da istediğiniz yere götürürüz.",
    lead: 'Alkollü araç kullanmayın, arayın. Aracınızı biz alalım, istediğiniz yere bırakalım.',
    body: [
      'İçki içtiyseniz araca binmeyin. Arayın, bulunduğunuz yeri söyleyin; çekicimizle gelir, aracınızı eve ya da istediğiniz adrese götürürüz.',
      'Siz rahatça eve gidin, araç da güvenle gitsin. Adresi söylemeniz yeterli.',
      "İzmir'in her ilçesine, gece gündüz geliyoruz.",
    ],
    whenToCall: [
      'İçki içtiniz ve aracınız dışarıda kaldı.',
      'Eğlence, düğün ya da yemek dönüşü araca binmemeniz gerekiyor.',
      'Aracınızı eve götürmek istiyorsunuz.',
    ],
    faq: [
      {
        q: 'Aracı nereye bırakırsınız?',
        a: 'Eve ya da istediğiniz adrese. Adresi arama sırasında söylemeniz yeterli.',
      },
      {
        q: 'Geç saatte de çalışıyor musunuz?',
        a: 'Evet. 7/24 çalışıyoruz, gece yarısından sonra da arayabilirsiniz.',
      },
    ],
    jobId: 'dolmus-cadde',
  },
];
