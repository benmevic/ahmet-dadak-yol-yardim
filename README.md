# Ahmet Dadak Yol Yardım: web sitesi

Ahmet Dadak Yol Yardım için hazırlanmış statik web sitesi. Ahmet Dadak 7/24 çalışan bir çekici ve yol yardım işletmesi. Merkezi Bornova ve Kemalpaşa'da, İzmir'in tamamına hizmet veriyor.

Sitenin tek amacı şu: yolda kalmış, telaşlı, büyük ihtimalle telefondan bakan biri birkaç saniye içinde arasın ya da konumunu WhatsApp'tan göndersin. İkinci hedef de Google'da "Bornova çekici", "İzmir oto çekici" gibi aramalarda çıkmak.

Site tamamen hazır ve testlerden geçiyor. **Henüz yayında değil.** Alan adı alınmadı, bazı bilgileri de müşterinin onaylaması gerekiyor. Yapılacaklar aşağıdaki [Yayına almak](#yayına-almak) ve [Eksikler](#eksikler-ve-müşteriden-beklenenler) bölümlerinde.

## İçindekiler

- [Hızlı başlangıç](#hızlı-başlangıç)
- [Teknoloji](#teknoloji)
- [Komutlar](#komutlar)
- [Proje yapısı](#proje-yapısı)
- [İçerik nasıl değiştirilir](#içerik-nasıl-değiştirilir)
- [Yayına almak](#yayına-almak)
- [Yayından sonra](#yayından-sonra)
- [Eksikler ve müşteriden beklenenler](#eksikler-ve-müşteriden-beklenenler)
- [Uyulması gereken kurallar](#uyulması-gereken-kurallar)
- [Testler](#testler)
- [Git durumu](#git-durumu)

## Hızlı başlangıç

Gerekenler: Node.js 22 veya üstü (site Node 24 ile geliştirildi ve test edildi) ve npm.

```bash
npm install
npm run dev
```

Site http://localhost:4321 adresinde açılır. Dosyaları değiştirdikçe sayfa kendiliğinden yenilenir.

Tarayıcı testlerini çalıştıracaksanız, Playwright'ın tarayıcısını bir kez kurmanız gerekir:

```bash
npx playwright install chromium
```

## Teknoloji

- **[Astro](https://astro.build) 7**, statik çıktı. Sunucu, veritabanı ya da yönetim paneli yok; panel istenmedi. Derleme sonunda `dist/` klasöründe düz HTML, CSS ve görseller çıkar, herhangi bir statik barındırmada çalışır.
- **TypeScript**, strict modda.
- **Arayüz kütüphanesi yok.** Bileşenler `.astro` dosyaları, stiller her bileşenin içinde düz CSS. Renkler ve yazı tipleri `src/styles/tokens.css` dosyasında.
- **JavaScript:** sitede neredeyse hiç yok. Tek parça, telefondaki alt "Ara / WhatsApp" çubuğunun 1 KB'tan küçük bir betiği. Ayrıca bir test bu çubuğun JavaScript kapalıyken de göründüğünü denetliyor.
- **Yazı tipleri:** Barlow ve Barlow Condensed, `@fontsource` paketleriyle sitenin kendi içinden yükleniyor. Google Fonts'a bağlantı yok.
- **Görseller:** Astro'nun görsel işleme hattından geçiyor. AVIF ve WebP üretiliyor, boyutlar ekrana göre seçiliyor.
- **Dış servis yok:** çerez, takip kodu ve harita gömme yok. Bu yüzden çerez onay penceresi de gerekmiyor.
- **Testler:** Vitest (birim) ve Playwright (tarayıcı).

## Komutlar

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Geliştirme sunucusunu açar (port 4321) |
| `npm run build` | Siteyi `dist/` klasörüne derler. Önemli: `SITE_URL` verilmezse site Google'a kapalı derlenir, ayrıntısı [Yayına almak](#yayına-almak) bölümünde |
| `SITE_URL=https://alanadi.com.tr npm run build` | Yayına çıkacak sürümü derler |
| `npm run preview` | Derlenmiş `dist/` klasörünü yerelde sunar |
| `npm test` | Birim testleri (Vitest) |
| `npx vitest run tests/unit/seo.test.ts` | Tek bir birim test dosyası |
| `npm run test:e2e` | Tarayıcı testleri (Playwright). Siteyi iki kez derleyip sunar |
| `npm run test:e2e -- tests/e2e/contact.spec.ts` | Tek bir tarayıcı test dosyası |

Windows PowerShell'de ortam değişkeni şöyle verilir:

```powershell
$env:SITE_URL = "https://alanadi.com.tr"; npm run build
```

## Proje yapısı

```
src/
  data/            Sitenin bütün içeriği burada (aşağıya bakın)
  components/      Sayfa parçaları: başlık, plaka biçimli arama butonu, WhatsApp/Instagram butonları,
                   reflektörlü bant, iş fotoğrafı şeridi, SSS, iletişim bloğu, İzmir haritası…
  layouts/         BaseLayout.astro: <head>, meta etiketleri, canonical, Open Graph, JSON-LD
  lib/             contact.ts (tel/WhatsApp linkleri), seo.ts (JSON-LD, robots), ilce.ts (ilçe yardımcıları)
  pages/           index, hizmetler/, izmir/, iletisim, 404, robots.txt
  assets/          Logo, iş fotoğrafları, İzmir ilçe haritası (SVG)
  styles/          tokens.css (renkler, yazı tipleri), global.css
tests/
  unit/            Vitest
  e2e/             Playwright
scripts/           İzmir haritasını üreten betik, test için statik sunucular
docs/
  ilce-kontrol-listesi.md   Müşterinin ilçe metinlerini onaylayacağı liste
  ilce-kaynaklari.md        İlçe metinlerindeki bilgilerin kaynakları
  superpowers/specs/        Onaylanan tasarım belgesi
  superpowers/plans/        Uygulama planı
kaynak/gorseller/  Müşterinin gönderdiği orijinal fotoğraflar, logo ve afiş (sitede kullanılmaz, yalnızca kaynak)
PRODUCT.md         Ürün bilgileri: kesinleşmiş gerçekler ve açık sorular
CLAUDE.md          Yapay zekâ asistanı için proje notları
```

### Sayfalar

| Adres | İçerik |
|---|---|
| `/` | Ana sayfa |
| `/hizmetler/` | Hizmet listesi |
| `/hizmetler/<hizmet>/` | 6 hizmet sayfası: arıza kurtarma, kaza oto kurtarma, akü takviyesi, lastik desteği, yakıt desteği, alkollü sürücü araç taşıma |
| `/izmir/` | İlçe listesi |
| `/izmir/<ilce>-cekici/` | Yayındaki her ilçe için bir sayfa. Şu an yalnızca Bornova ve Kemalpaşa |
| `/iletisim/` | Telefon, WhatsApp, Instagram, adresler, İzmir hizmet haritası |
| `/404` | Bulunamadı sayfası. Arama butonu bunda da var, Google'a kapalı |

## İçerik nasıl değiştirilir

Sitedeki metin ve bilgilerin hemen hepsi `src/data/` klasöründe. Çoğu değişiklik için sayfa koduna dokunmak gerekmez.

| Dosya | İçinde ne var |
|---|---|
| `business.ts` | İşletme adı, telefon, WhatsApp, Instagram, adresler, çalışma saatleri. **Telefon ya da adres değişirse yalnızca burayı düzeltin**; site, JSON-LD ve ilçe sayfaları buradan okur |
| `services.ts` | 6 hizmetin başlığı, açıklaması, metni, "ne zaman arayın" listesi, SSS'si ve fotoğrafı |
| `ilceler.ts` | 30 ilçenin metni, ana yolları, bilinen yerleri, komşuları ve SSS'si. Her ilçenin bir `status` alanı var: `'live'` ya da `'draft'` |
| `jobs.ts` | İş fotoğrafları ve altlarındaki yazılar |
| `home-faq.ts` | Ana sayfanın sık sorulan soruları |
| `common-faq.ts` | Ana sayfada ve bütün ilçe sayfalarında ortak olan fiyat sorusu |

### Bir ilçeyi yayına almak

1. Müşteri, o ilçenin metnini `docs/ilce-kontrol-listesi.md` listesine göre kontrol eder.
2. Bilgiler doğruysa `src/data/ilceler.ts` dosyasında o ilçenin `status` değerini `'live'` yapın.
3. Gerisi kendiliğinden olur: ilçenin sayfası oluşur, ilçe listesine, ana sayfaya, hizmet sayfalarındaki bağlantılara, haritaya, site haritasına (sitemap) ve JSON-LD'deki `areaServed` alanına eklenir.
4. `npm test` çalıştırın. Testler, ilçe metinlerinin birbirine fazla benzemediğini denetler; Google birbirinin kopyası sayfaları cezalandırır.

Taslak (`draft`) ilçeler sitede hiçbir yerde görünmez.

### Fotoğraf eklemek ya da değiştirmek

1. Orijinal fotoğrafı `kaynak/gorseller/` klasörüne koyun.
2. 2000×1500 piksellik (4:3) bir kopyasını `src/assets/jobs/` klasörüne koyun; mevcut fotoğraflar bu boyutta.
3. `src/data/jobs.ts` dosyasına bir kayıt ekleyin. Fotoğrafın altındaki yazı (`vehicle`, `place`) ve `alt` metni, fotoğrafta **gerçekten görünen** şeyi anlatmalı. Tarih, saat ya da müşteri adı uydurmayın.
4. Bir hizmet sayfasının fotoğrafını değiştirmek için `services.ts` içindeki `jobId` alanını değiştirin.

## Yayına almak

### Bilmeniz gereken: site varsayılan olarak Google'a kapalı derlenir

`SITE_URL` ortam değişkeni verilmeden derlenen sürüm Google'a kapalıdır:

- Her sayfada `noindex` etiketi olur.
- `robots.txt` her şeyi engeller (`Disallow: /`).
- Site haritası (sitemap) üretilmez.
- Canonical adresler ve mutlak bağlantılar yazılmaz.

Bu bilerek böyle yapıldı: alan adı olmadan yanlışlıkla bir yere yüklenen sürüm Google'a girmesin diye.

`SITE_URL` verildiğinde bunların hepsi açılır: canonical adresler, `sitemap-index.xml`, Google'a izin veren ve site haritasını gösteren `robots.txt`, Open Graph görsel adresleri ve JSON-LD'deki `@id` ve `url` alanları.

### Adımlar

1. **Alan adını alın.** Öneri `.com.tr`, `.com` ya da ikisi birden, örneğin `ahmetdadakyolyardim.com`. Kararı müşteriyle verin.
2. **Barındırma seçin.** Site statik olduğu için ücretsiz katmanlar yeter: Cloudflare Pages, Netlify ya da Vercel. Ayarlar şöyle:
   - Derleme komutu: `npm run build`
   - Çıktı klasörü: `dist`
   - Ortam değişkeni: `SITE_URL=https://<alan-adı>` (sonunda `/` olmadan da olur). **Bu değişkeni unutursanız site Google'a kapalı yayınlanır.**
   - Node sürümü: 22 veya üstü
3. **Alan adını bağlayın.** `www` ile `www`'suz adreslerden biri ana adres olsun, diğeri ona 301 ile yönlensin. `SITE_URL` ana adresle aynı olmalı.
4. **Kontrol edin.** Yayındaki sitede şunlara bakın:
   - `https://<alan-adı>/robots.txt` içinde `Allow: /` ve `Sitemap:` satırı var mı?
   - `https://<alan-adı>/sitemap-index.xml` açılıyor mu?
   - Sayfa kaynağında `noindex` yok mu, `<link rel="canonical">` doğru adresi gösteriyor mu?
   - Ana sayfa adresini [Google Zengin Sonuç Testi](https://search.google.com/test/rich-results)'nde deneyin. İşletme ve SSS bilgileri hatasız çıkmalı.
5. **Eski site.** İşletmenin eskiden "Dadak Nakliyat" adıyla bir sitesi vardı. Hâlâ yayındaysa, alan adı kullanılmayacaksa eski sayfaları yeni ana sayfaya 301 ile yönlendirin. Nakliyat içeriği yeni sitede olmayacak.

## Yayından sonra

Görünürlük için en önemli işler bunlar. Site kodunun ötesindeler, ama yapılmazlarsa site aramada çıkmaz.

1. **Google İşletme Profili.** "Çekici" aramasında en üstte çıkan harita kutusu buradan gelir; bu iş için sıralamada en etkili şey budur.
   - Profilin olup olmadığını, varsa hangi adla açıldığını müşteriye sorun. Yoksa açılmasını sağlayın.
   - İşletme adı, telefon ve adresler sitedekiyle **harfi harfine aynı** olmalı: "Ahmet Dadak Yol Yardım", 0540 123 0335 ve iki adres.
   - Profilin bağlantısını JSON-LD'ye ekleyin: `src/lib/seo.ts` içinde `sameAs: [b.instagramUrl]` satırına profil adresini ekleyin. En doğrusu adresi `business.ts`'te bir alana koyup oradan okumak.
   - Müşteri, gerçek müşterilerinden profile yorum istesin. Yorumlar sıralamayı yükseltir.
2. **Google Search Console.** Alan adını doğrulayın ve `sitemap-index.xml` dosyasını gönderin.
3. **Bing Webmaster Tools.** İsteğe bağlı; Search Console'dan tek tıkla aktarılabilir.
4. **Instagram profili.** Profildeki bağlantıya site adresini ekleyin.

## Eksikler ve müşteriden beklenenler

Bunlar sitenin yayına çıkmasını engellemez, ama zamanla tamamlanmalı.

### Müşterinin kontrol etmesi gerekenler

- [ ] **28 ilçenin metni.** Liste: `docs/ilce-kontrol-listesi.md`. Kaynakları zayıf olanlar `docs/ilce-kaynaklari.md` dosyasında "ZAYIF KAYNAK", eksik olanlar "(yol bilgisi eksik)" diye işaretli. Kemalpaşa'nın yol bilgileri de doğrulanmalı.
- [ ] **Lastik ve yakıt desteği.** Lastik yerinde mi değiştiriliyor, yakıt mı getiriliyor, yoksa araç mı çekiliyor? Metinler şu an genel yazılmış; cevaba göre `services.ts` netleşmeli.
- [ ] **Akü takviyesi.** Yerinde takviye yapıldığı yazıyor, bu doğrulanmalı.
- [ ] **"Son taşıdıklarımız" başlığı.** Fotoğraflar gerçekten son işlerden mi? Değilse başlık "Taşıdıklarımızdan" gibi bir şeye çevrilebilir. Başlık `JobStrip.astro` içinde.
- [ ] **Fiyat.** Sitede rakam yok, yalnızca "uygun fiyatla çalışıyoruz, arayın, fiyatı öğrenin" yazıyor. Müşteri fiyatı nasıl söylediğini anlatırsa (örneğin "çıkmadan önce telefonda söylüyoruz") cevap netleştirilebilir. Metin `src/data/common-faq.ts` içinde.

### Müşteriden gelmesi gerekenler

- [ ] **Hizmet fotoğrafları.** Akü, lastik, yakıt ve alkollü sürücü hizmetleri için gerçek fotoğraflar. Şimdilik bu sayfalarda çekici fotoğrafları kullanılıyor.
- [ ] **Hizmet bölgesi.** Şu an "İzmir geneli". Değişirse `ilceler.ts` ve metinler güncellenir.
- [ ] **Çalışma yılı ve müşteri yorumları.** İstenirse eklenir, ama yalnızca gerçek bilgiyle.

### Teknik açıdan kalanlar

- [ ] **Logolu paylaşım görseli.** Site WhatsApp ya da sosyal medyada paylaşılınca görünen 1200×630 görsel, şu an logosuz bir iş fotoğrafı. Logolu sürüm, görsel birleştirmek için bir kütüphane (örneğin `sharp` ile bir derleme betiği) gerektirdiği için yapılmadı. Görsel `src/pages/index.astro` ve `BaseLayout.astro` içinde üretiliyor.
- [ ] **Küçük iyileştirmeler.** Eski tarayıcılar için üretilen yedek JPG'ler biraz büyük. Ana fotoğrafın telefondaki kırpımı daha iyi olabilir. Masaüstünde fotoğraf şeridi klavyeyle gezinirken fazladan bir durak oluşturuyor.
- [ ] **Yayın ayarları.** Barındırma tarafında güvenlik başlıkları (`Content-Security-Policy`, `X-Content-Type-Options` vb.) ve önbellek ayarları eklenebilir.

## Uyulması gereken kurallar

Bunlar müşteriyle konuşulup kesinleşti. Değiştirmeden önce müşteriye sorun.

- **Nakliyat yok.** İşletme eskiden "Dadak Nakliyat"tı; nakliyat hizmeti iptal edildi. Sitede hiçbir yerde nakliyat geçmemeli.
- **Uydurma bilgi yok.** Sahte yorum, yıldız puanı, "1000+ araç taşıdık" gibi sayılar, çalışma yılı ya da fiyat rakamı yazılmaz. Bunlar şu an elimizde yok. Ne olduğu belli olmayan bir bilgi gerekiyorsa kodda açıkça işaretlenir, sitede gerçekmiş gibi gösterilmez.
- **"En ucuz" yazılmaz.** Kanıtlanamayan bir iddia. "Uygun fiyat" kullanılıyor.
- **Taşınan araçlar:** otomobil, hafif ticari, dolmuş/minibüs ve motosiklet.
- **Arama ve WhatsApp her sayfada tek dokunuşla erişilebilir olmalı.** Telefonda ilk ekranda görünürler; sayfa kayınca alttaki çubuk çıkar.
- **Kontrol edilmemiş ilçe yayına alınmaz.** Birbirinin kopyası, yalnızca ilçe adı değişen sayfalar yapılmaz; Google bunları cezalandırır.
- **Tasarım:** müşterinin seçtiği siyah-kırmızı tasarım. Renkler logodan: şarap tonlu siyah zemin, kırmızı, altın (taçtan), gümüş. Kurallar:
  - Üst kısımlar gerçek çekici fotoğraflarıyla yapılır, düz kırmızı panel kullanılmaz (müşteri "cırtlak" buldu).
  - Reflektörlü şerit kullanılmaz (müşteri istemedi).
  - Renkler aynı aileden ve geçişler yumuşak olmalı; sert bölüm çizgisi yok.
  - Hareket ölçülü: başlık açılışta yukarı kayar, kartlar kaydırınca yerine oturur, arama plakasının etrafında altın bir halka yayılır. Hareketi kapatan kullanıcıda hiçbiri oynamaz.
  - Stok fotoğraf ya da uydurma içerik yok; müşteri "yapay zekâ yapmış gibi durmasın" dedi.
  - İlk (açık renkli) tasarımın belgesi `docs/superpowers/specs/` klasöründe; renk ve üst kısım kararları sonradan değişti.
- **Türkçe büyük harf:** sayfanın dili `lang="tr"` olarak ayarlı, bu yüzden CSS'teki `text-transform: uppercase` "i" harfini doğru "İ" yapar. Bu ayarı kaldırmayın.

## Testler

```bash
npm test            # 90 birim testi
npm run test:e2e    # 73 tarayıcı testi
```

**Birim testleri** şunları denetler: veri dosyalarının tutarlılığı (benzersiz sayfa adresleri, başlık uzunlukları, ilçe metinlerinde adres olmaması, ilçe metinlerinin birbirine fazla benzememesi), JSON-LD üreticileri ve test sunucusunun güvenliği.

**Tarayıcı testleri** siteyi iki biçimde derleyip sunar:

- `chromium`: `SITE_URL` olmadan, port 4322. Google'a kapalı sürümü dener.
- `site-url`: `SITE_URL=https://ornek.com.tr` ile `dist-site/` klasörüne derlenir, port 4324. Yayındaki davranışı dener: canonical, sitemap, robots.

Denenen şeyler arasında şunlar var: 375×667 telefon ekranında arama ve WhatsApp butonlarının ilk ekranda görünmesi, alttaki yapışkan çubuk, sayfaların başlık ve açıklamaları, JSON-LD, ilçe ve hizmet sayfaları arasındaki bağlantılar, harita, sayfaların dış servislere istek atmaması ve JavaScript bütçesi.

## Git durumu

- `main`: sitenin tamamı. Çalışmaya buradan devam edin.

Depo şu an yalnızca yerelde; uzak bir depo (GitHub vb.) bağlı değil.

`eski-site/` klasörü (eski Bootstrap site, yalnızca referans) `.gitignore` içinde, depoya girmiyor.
