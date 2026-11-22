export interface FaqItem {
  q: string;
  a: string;
}

export const homeFaq: FaqItem[] = [
  {
    q: "İzmir'de en yakın çekiciyi nasıl çağırırım?",
    a: "0540 123 0335'i arayın ya da konumunuzu WhatsApp'tan gönderin. Oto çekicimiz bulunduğunuz yere gelir, aracınızı istediğiniz yere bırakır.",
  },
  {
    q: 'Hangi bölgelere geliyorsunuz?',
    a: "İzmir'in her ilçesine geliyoruz. Bornova ve Kemalpaşa'dayız, çekicimiz İzmir geneline çıkar.",
  },
  {
    q: 'Gece de çalışıyor musunuz?',
    a: 'Evet, 7/24 çalışıyoruz. Gece gündüz, hafta sonu dahil her an arayabilirsiniz.',
  },
  {
    q: 'Konumumu nasıl gönderirim?',
    a: "WhatsApp'ı açın, 0540 123 0335 numarasına konumunuzu gönderin. Sayfadaki \"Konumu WhatsApp'tan gönder\" düğmesine dokunmanız yeterli.",
  },
  {
    q: 'Alkollü sürücünün aracını eve götürüyor musunuz?',
    a: 'Evet. Alkollü araç kullanmayın, arayın; aracınızı çekiciyle istediğiniz yere bırakırız.',
  },
  {
    q: 'Hangi araçları taşıyorsunuz?',
    a: 'Otomobil, hafif ticari araç, dolmuş/minibüs ve motosiklet taşıyoruz. Fotoğraflarımızda bunların örneklerini görebilirsiniz.',
  },
];
