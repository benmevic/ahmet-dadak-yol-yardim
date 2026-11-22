# Ahmet Dadak Yol Yardım: website design

Date: 2026-11-22. Status: draft for approval.

Product facts live in [PRODUCT.md](../../../PRODUCT.md); this document covers what to build and how.

## Intent and why

Ahmet Dadak runs a one-truck, 7/24 tow and roadside assistance business (Fiat Ducato flatbed, plate 35 CDV 546) based in Bornova and Kemalpaşa, serving all of İzmir. The previous website (`eski-site/`) sold a moving business ("Dadak Nakliyat") with a generic Bootstrap template; the owner disliked it and the moving line is now dropped.

The new site exists to turn a stressed driver at the roadside into a phone call or a WhatsApp location message within seconds, and to make the business show up when people in İzmir search "<ilçe> çekici", "oto kurtarma", "yol yardım", "akü takviyesi" and similar.

## Goals

- A visitor on a phone can call (tel:+905401230335) or open WhatsApp to send their location in one tap, from every page, without scrolling.
- Rank in local search for tow and roadside terms across İzmir's 30 districts and for each service.
- Earn trust with real evidence: the owner's own truck and real jobs on İzmir streets.
- Load fast on a mid-range Android phone on mobile data.

## Non-goals

- No admin panel or CMS (user confirmed). Content changes go through the developer.
- No online booking, payment, price calculator, or account system.
- No moving/nakliyat content anywhere.
- No English version (not requested).

## Anti-goals (would be failure even if it works)

- Looks like a template or "AI-made": same-size icon cards, gradient blobs, glassy chrome, stock photos, generic fonts. The user explicitly rejected this.
- Invented trust signals: fake reviews, star ratings, "1000+ araç taşıdık", years in business, prices. None of these exist yet.
- Thin, near-identical district pages that only swap the district name (Google treats these as doorway pages and can demote the whole site).
- Anything that slows the first tap: splash animations, cookie walls covering the call button, heavy hero video.

## Constraints

- Stack: Astro, static output, no admin panel (user confirmed).
- Language: Turkish only; correct Turkish casing (İ/ı) everywhere, including uppercase headings (`lang="tr"` so `text-transform: uppercase` renders "YOLDA MI KALDINIZ?" correctly).
- Phone/WhatsApp: 0540 123 0335. Instagram: @dadakyolyardim.
- Service area is "İzmir geneli" for now and may shrink or grow on the owner's request: districts must come from one data file.
- Source images in `kaynak/gorseller/` are 250–500 KB JPEGs; the site ships resized, modern-format copies (Astro's image pipeline), never the originals.
- The logo exists only as a JPEG on black (`kaynak/gorseller/logo-ahmet-dadak-yol-yardim.jpg`); it is used as a round badge. No vector logo exists.

## Approaches considered

1. **Astro multi-page static site (chosen).** Home, one page per service, one page per district generated from data. Strongest for local search, fastest to load, cheap or free to host. Trade-off: the owner cannot edit it himself (he does not need to).
2. **Single-page site.** Fastest to build, but weak for district and service searches, which is the main growth channel. Rejected.
3. **WordPress or another CMS.** Owner could edit, but slower, needs plugin/security upkeep and paid hosting; the owner does not want a panel. Rejected.

## Visual direction (user chose "B", reworked)

Approved mockup: `.superpowers/brainstorm/1322-1795352858/content/b-yonu-v3.html` (desktop and phone side by side). The build matches it.

The idea: a light, trustworthy site built from the tow truck's own world rather than a web template.

- **Ground and ink:** cool light grey ground `#f3f4f2`, white panels, near-black ink `#141518`, secondary text `#4a4d55`, hairlines `#d9dbd8`. Not cream.
- **Accent:** logo red `#c8161d` for emphasis words, link underlines and the chevrons between services.
- **Signature 1, the plate call button:** the primary call action is drawn as a Turkish licence plate: white plate, thick black border, blue `#0f4fa8` "TR" strip on the left with a phone icon, the number `0540 123 0335` in large condensed type, and a small red line "Dokunun, hemen arayın". It is a real `<a href="tel:+905401230335">`.
- **Signature 2, the reflective band:** a red/amber (`#c8161d` / `#f2b705`) diagonal-striped band, like the rear of the truck, used as the one divider between the hero and the jobs strip. Use it sparingly (once or twice per page), never as decoration everywhere.
- **Signature 3, captioned real jobs:** every job photo carries a caption with what is actually visible (vehicle, place), e.g. "Maserati Ghibli · Otoyol, Çeşme yönü", "Park Bornova önü · Peugeot 206". Never invent dates, times or customer names.
- **Type:** Barlow Condensed (600/700, uppercase for headlines and the service line) and Barlow (400–600 for body), self-hosted. Barlow is drawn from road-sign and plate lettering, which grounds the voice. Turkish glyphs must be checked.
- **Services line:** services are a single typographic line separated by red "›" chevrons, not icon cards.
- **Icons:** one consistent stroke icon set (phone, map pin, WhatsApp), inline SVG. No emoji.
- **Banned here:** same-size icon+title+text cards as page structure, eyebrow/kicker labels above headings, gradient text, glass blur, glow shadows, stock photos.

### First viewport

- **Desktop:** white top bar (round logo badge, "AHMET DADAK YOL YARDIM", "İzmir geneli · 7/24 çekici"; nav: Hizmetler, İlçeler, Nasıl çalışıyoruz, Instagram). Below, a two-column hero: left, the headline "Yolda mı kaldınız? **Bulunduğunuz yere** geliyoruz." (red emphasis), one short paragraph, the plate call button and an outlined "Konumu WhatsApp'tan gönder" button, then the services line; right, the Park Bornova sunset photo, full height, with a white caption tab bottom-left. Then the reflective band, then "Son taşıdıklarımız" with five captioned job photos and a link to Instagram.
- **Phone:** compact white top bar with logo badge and name; the sunset photo (about 210px tall) with caption; the reflective band; headline "Yolda mı kaldınız? **Geliyoruz.**"; the full-width plate call button; full-width WhatsApp button; services line; horizontally scrolling job strip. Call and WhatsApp are visible without scrolling on a 375×667 screen.
- **Sticky action bar on phones:** once the hero call button scrolls out of view, a bottom bar with "Ara" and "WhatsApp" appears and stays. (Decided here; not in the mockup.)

## Site map

- `/`: home (first viewport above, then: how it works in three plain steps (arayın / konum atın / istediğiniz yere bırakalım), services overview, districts overview, the "alkollüyseniz arayın" message, FAQ, contact block).
- `/hizmetler/<hizmet>/`: one page per service: arıza kurtarma, kaza sonrası oto kurtarma, akü takviyesi, lastik desteği, yakıt desteği, alkollü sürücü için araç taşıma (aracınızı eve bırakalım). Each has its own copy, relevant photo, FAQ, and the same call/WhatsApp actions.
- `/izmir/<ilce>-cekici/`: one page per district, generated from `src/data/ilceler` (all 30: Aliağa, Balçova, Bayındır, Bayraklı, Bergama, Beydağ, Bornova, Buca, Çeşme, Çiğli, Dikili, Foça, Gaziemir, Güzelbahçe, Karabağlar, Karaburun, Karşıyaka, Kemalpaşa, Kınık, Kiraz, Konak, Menderes, Menemen, Narlıdere, Ödemiş, Seferihisar, Selçuk, Tire, Torbalı, Urla). Each district entry carries unique content (main roads and junctions where breakdowns happen, landmarks, neighbouring districts, a district-specific FAQ) so pages are not name-swaps. Districts without enough unique material can be marked `draft` and left out of the build until written.
- `/izmir/`: districts index.
- `/iletisim/`: phone, WhatsApp, Instagram, service area map.
- 404 page that still offers the call button.

## Local SEO

- Per-page title and meta description in Turkish, written for the actual search phrase (e.g. "Bornova Çekici 7/24 | Ahmet Dadak Yol Yardım").
- JSON-LD: `AutomotiveBusiness` (or `LocalBusiness` with an `areaServed` list of the districts), `telephone`, `sameAs` Instagram, `openingHoursSpecification` 7/24; `Service` on service pages; `FAQPage` where an FAQ is shown; `BreadcrumbList`.
- `sitemap.xml`, `robots.txt`, canonical URLs, Open Graph image (a cropped job photo with the logo).
- No meta keywords list (the old site's 200-word keyword list is useless).
- Image `alt` text describes the actual photo in Turkish.

## Content

- Copy is short, plain Turkish addressed to someone stressed at the roadside ("siz" form).
- Only facts from PRODUCT.md. Placeholders for anything unknown are clearly marked in source, never shipped as fake facts.
- Photos come from `kaynak/gorseller/`; the yellow/black flyer is reference only, not shown on the site.

## Decided by me (open to correction)

- Sticky mobile call/WhatsApp bar after the hero scrolls away.
- WhatsApp button opens `https://wa.me/905401230335` with a prefilled Turkish message asking for location; the visitor then shares location in WhatsApp (the web cannot attach a live location for them).
- No cookie banner: the site sets no cookies and uses no third-party trackers by default.
- Motion is minimal: one subtle reveal on the job strip at most; nothing delays the call button. `prefers-reduced-motion` respected.
- Service area map on `/iletisim/` is a self-hosted static SVG of İzmir's districts with served districts filled; no Google Maps or OpenStreetMap embed (keeps the page fast and cookie-free).
- District content is researched and drafted by the developer from public sources (main roads, junctions, landmarks, neighbouring districts). The owner checks each draft for accuracy. Launch ships the districts that have checked content; the rest stay `draft` and are added as they are checked. `areaServed`, the districts index and internal links include only live districts.

## Left to the builder

- Astro project structure, component split, CSS approach (plain CSS with custom properties is enough).
- Exact image sizes/formats and responsive breakpoints, provided the first viewport above holds at 375, 768, 1280 and 1440 wide.
- Which photo leads each service and district page.
- FAQ wording, within PRODUCT.md facts.

## Owner answers (2026-11-22)

- **Domain and hosting:** the domain is not bought yet. Build with the site origin in one config value (Astro `site`) so canonical URLs, sitemap, JSON-LD and Open Graph switch over when it exists. Until then, no deployment. Redirecting or retiring any old nakliyat site is handled at launch.
- **Addresses:** both may be published (and removed later if the owner asks): Çambel Mah. 2005 Sk. No:4, Kemalpaşa / İzmir and Mevlana Mah. 1713 Sk. No:3, Bornova / İzmir. JSON-LD uses `AutomotiveBusiness` with these as `PostalAddress` (two locations) plus `areaServed` for the live districts. Addresses live in the same data file as phone and Instagram so they can be removed in one place.

## Still open (not blocking the build)

- **Google Business Profile:** unknown whether one exists and under which name. The site's name, address and phone must match it once known; its link joins `sameAs`. If none exists, recommend the owner create one.
- **Service photos:** no photos yet for akü takviyesi, lastik, yakıt or the drunk-driver service. Those pages reuse tow-job photos until the owner supplies real ones; the image slot per service is a single data field so swapping is trivial.
