# Ahmet Dadak Yol Yardım Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the static Astro website for Ahmet Dadak Yol Yardım: home, six service pages, data-driven İzmir district pages, contact and 404, matching the approved "B" mockup.

**Architecture:** Astro static output. All business facts (phone, addresses, services, districts, job photos) live in typed data modules under `src/data/`; pages are generated from them. Small pure helpers in `src/lib/` (contact links, JSON-LD, robots) are unit-tested with Vitest; rendered behaviour (first viewport, Turkish casing, sticky bar, draft gating) is tested with Playwright against `astro preview`.

**Tech Stack:** Astro 7.4, @astrojs/sitemap 3.7, TypeScript, plain CSS with custom properties, @fontsource/barlow 5.3 + @fontsource/barlow-condensed 5.3 (self-hosted), Vitest 5.1, @playwright/test 1.65 (Chromium only). Node 24.

**Spec:** `docs/superpowers/specs/2026-11-22-ahmet-dadak-yol-yardim-design.md` (product facts: `PRODUCT.md`; approved mockup: `.superpowers/brainstorm/1322-1795352858/content/b-yonu-v3.html`).

## Global Constraints

- Turkish only. `<html lang="tr">` on every page, so `text-transform: uppercase` renders İ/ı correctly.
- Phone display `0540 123 0335`, tel href `tel:+905401230335`, WhatsApp `https://wa.me/905401230335`, Instagram `https://www.instagram.com/dadakyolyardim/`.
- Addresses: `Çambel Mah. 2005 Sk. No:4, Kemalpaşa / İzmir` and `Mevlana Mah. 1713 Sk. No:3, Bornova / İzmir`. Defined once in `src/data/business.ts`.
- No moving/nakliyat content. No invented reviews, ratings, counts, prices, years, dates or customer names.
- Colours: ground `#f3f4f2`, panel `#ffffff`, ink `#141518`, muted `#4a4d55`, line `#d9dbd8`, red `#c8161d`, plate blue `#0f4fa8`, amber `#f2b705`.
- Type: Barlow Condensed 600/700 for headlines and the service line (uppercase), Barlow 400/500/600 for body; self-hosted via @fontsource; no Google Fonts requests.
- Banned: same-size icon cards as page structure, eyebrow/kicker labels above headings, gradient text, glass blur, glow shadows, emoji as icons, stock photos.
- No cookies, no third-party scripts or map embeds. Ship ≤ 5 KB of client JS per page (only the sticky-bar observer).
- Images ship through Astro's `<Image>`/`<Picture>` (AVIF/WebP), never the originals from `kaynak/gorseller/`.
- Site origin comes only from env `SITE_URL`. When it is unset the build is non-indexable (robots `Disallow: /`, `<meta name="robots" content="noindex">`).
- Districts with `status: 'draft'` produce no page, no sitemap entry, no index link and no `areaServed` entry.

## Review Focus

1. **Turkish casing:** "Yolda mı kaldınız?" must render as "YOLDA MI KALDINIZ?" and "İzmir" as "İZMİR", never "IZMIR" / "YOLDA Mİ". Test in Task 4.
2. **Narrow phones (320 px):** the plate number must not wrap or cause horizontal scroll. Test in Task 4.
3. **JavaScript off or failing:** call and WhatsApp links still work and the mobile action bar is still reachable. Test in Task 4.
4. **Domain not yet bought:** a build without `SITE_URL` must not be indexable or emit localhost canonicals. Tests in Tasks 3 and 10.
5. **Draft districts leaking:** a draft district must not appear anywhere public. Tests in Task 7.

---

### Task 1: Project scaffold, tokens and fonts

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts`, `.gitignore`, `src/styles/tokens.css`, `src/styles/global.css`, `src/pages/index.astro` (placeholder), `tests/e2e/smoke.spec.ts`
- Modify: `.claude/launch.json` (add `site` entry: `npm run dev`, port 4321)

**Interfaces:**
- Produces: npm scripts `dev`, `build`, `preview`, `test` (vitest run), `test:e2e` (playwright test); CSS custom properties `--ground --panel --ink --muted --line --red --blue --amber --font-display --font-body`.

- [ ] **Step 1:** `git init`; `.gitignore` contains `node_modules/`, `dist/`, `.astro/`, `test-results/`, `playwright-report/`, `.superpowers/`, `.impeccable/review/`.
- [ ] **Step 2:** Scaffold Astro 7.4 minimal (TypeScript strict), add @astrojs/sitemap, @fontsource/barlow, @fontsource/barlow-condensed, vitest, @playwright/test; install Chromium for Playwright.
- [ ] **Step 3:** `astro.config.mjs`: `site: process.env.SITE_URL ?? undefined`, `output: 'static'`, `trailingSlash: 'always'`, sitemap integration (filter added in Task 10).
- [ ] **Step 4:** `tokens.css` with the Global Constraints colours and font stacks; `global.css` imports the four @fontsource weights (`barlow/400,500,600`, `barlow-condensed/600,700`), sets body ground/ink, `::selection` (red bg, white text), focus-visible ring (3px `--blue`, 2px offset), link underline offset 3px.
- [ ] **Step 5: Write the failing smoke test** `tests/e2e/smoke.spec.ts`: `test('home responds in Turkish')` → `page.goto('/')`, expect `html[lang="tr"]` to exist.
- [ ] **Step 6:** `playwright.config.ts`: Chromium only, `webServer: { command: 'npm run build && npm run preview -- --port 4322', port: 4322 }`, `baseURL: 'http://localhost:4322'`. Run `npm run test:e2e` → FAIL (placeholder lacks `lang`).
- [ ] **Step 7:** Placeholder `index.astro` with `<html lang="tr">`. Run `npm run test:e2e` → PASS. Run `npm run build` → succeeds.
- [ ] **Step 8: Commit** `chore: scaffold Astro site with tokens and self-hosted Barlow`.

### Task 2: Business data and contact helpers

**Files:**
- Create: `src/data/business.ts`, `src/lib/contact.ts`, `tests/unit/contact.test.ts`

**Interfaces:**
- Produces:
  - `business: Business` where `Business = { name: 'Ahmet Dadak Yol Yardım'; phoneDisplay: string; phoneE164: '+905401230335'; instagramHandle: 'dadakyolyardim'; instagramUrl: string; addresses: Address[]; hours: '7/24' }`, `Address = { district: 'Kemalpaşa' | 'Bornova'; street: string; city: 'İzmir'; postalLine: string }`.
  - `telHref(e164: string): string`
  - `whatsappHref(e164: string, message?: string): string`
  - `DEFAULT_WA_MESSAGE = 'Merhaba, yolda kaldım. Konumumu gönderiyorum.'`

- [ ] **Step 1: Write failing tests** in `tests/unit/contact.test.ts`:
  - `telHref('+905401230335')` === `'tel:+905401230335'`
  - `whatsappHref('+905401230335')` === `'https://wa.me/905401230335'`
  - `whatsappHref('+905401230335', DEFAULT_WA_MESSAGE)` === `'https://wa.me/905401230335?text=' + encodeURIComponent(DEFAULT_WA_MESSAGE)` and the decoded `text` param contains `'kaldım'` (Turkish characters survive).
  - `business.addresses` has length 2 and `business.phoneDisplay === '0540 123 0335'`.
- [ ] **Step 2:** Run `npx vitest run tests/unit/contact.test.ts` → FAIL (modules missing).
- [ ] **Step 3:** Implement `business.ts` with the Global Constraints values and the two helpers in `contact.ts` (strip leading `+` for wa.me).
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5: Commit** `feat: business data and contact link helpers`.

### Task 3: SEO helpers (JSON-LD, robots, meta)

**Files:**
- Create: `src/lib/seo.ts`, `src/pages/robots.txt.ts`, `tests/unit/seo.test.ts`

**Interfaces:**
- Consumes: `business` (Task 2).
- Produces:
  - `localBusinessJsonLd(b: Business, areaServed: string[], siteUrl: URL | undefined): object`: `@type: 'AutomotiveBusiness'`, `name`, `telephone: '+905401230335'`, `sameAs: [instagramUrl]`, `openingHoursSpecification` covering all 7 days `00:00`–`23:59`, `address` = array of two `PostalAddress` (`addressLocality` district, `addressRegion: 'İzmir'`, `addressCountry: 'TR'`), `areaServed` = `{ '@type': 'City', name }` per entry, `url` only when `siteUrl` is defined.
  - `serviceJsonLd(name: string, description: string, b: Business): object` (`@type: 'Service'`, `provider` = business name and telephone, `areaServed: 'İzmir'`).
  - `faqJsonLd(items: { q: string; a: string }[]): object | null` (null on empty list).
  - `breadcrumbJsonLd(crumbs: { name: string; path: string }[], siteUrl: URL | undefined): object | null` (null when `siteUrl` undefined).
  - `robotsTxt(siteUrl: URL | undefined): string`.
  - `isIndexable(siteUrl: URL | undefined): boolean`.

- [ ] **Step 1: Write failing tests** in `tests/unit/seo.test.ts`:
  - `localBusinessJsonLd(business, ['Bornova','Kemalpaşa'], undefined)` has `@type === 'AutomotiveBusiness'`, `areaServed.length === 2`, `address.length === 2`, and no `url` key.
  - With `new URL('https://ornek.com.tr')` it has `url === 'https://ornek.com.tr/'`.
  - `openingHoursSpecification[0].dayOfWeek` has length 7.
  - `faqJsonLd([])` is `null`; with one item, `mainEntity[0].acceptedAnswer.text` equals the answer.
  - `robotsTxt(undefined)` contains `Disallow: /` and no `Sitemap:`; `robotsTxt(new URL('https://ornek.com.tr'))` contains `Allow: /` and `Sitemap: https://ornek.com.tr/sitemap-index.xml`.
  - `isIndexable(undefined) === false`.
- [ ] **Step 2:** Run `npx vitest run tests/unit/seo.test.ts` → FAIL.
- [ ] **Step 3:** Implement `seo.ts`; `robots.txt.ts` is a `GET` endpoint returning `robotsTxt(import.meta.env.SITE ? new URL(import.meta.env.SITE) : undefined)`.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5: Commit** `feat: JSON-LD and robots helpers`.

### Task 4: Layout, core components and the home first viewport

Match the approved mockup's desktop and phone views. Read the mockup file before starting.

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/components/SiteHeader.astro`, `src/components/PlateCall.astro`, `src/components/WhatsAppButton.astro`, `src/components/ServiceLine.astro`, `src/components/ReflectiveBand.astro`, `src/components/StickyActions.astro`, `src/components/SiteFooter.astro`, `src/components/icons/{Phone,MapPin,WhatsApp}.astro`, `src/assets/logo.jpg` (copy of `kaynak/gorseller/logo-ahmet-dadak-yol-yardim.jpg`), `src/assets/jobs/park-bornova.jpg` (copy of `cekici-gun-batimi-park-bornova.jpg`), `tests/e2e/home-fold.spec.ts`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `business`, `telHref`, `whatsappHref`, `DEFAULT_WA_MESSAGE`, `localBusinessJsonLd`, `isIndexable`.
- Produces:
  - `BaseLayout` props `{ title: string; description: string; path: string; jsonLd?: object[]; ogImage?: ImageMetadata }`; renders `lang="tr"`, canonical only when indexable, `noindex` meta when not, the JSON-LD scripts, header, footer, `StickyActions`.
  - `PlateCall` props `{ size?: 'lg' | 'md' }`: an `<a href={telHref(...)}>` drawn as the plate (black 3px border, 8px radius, blue `TR` strip with Phone icon, number in Barlow Condensed 700, red subline "Dokunun, hemen arayın"), accessible name "0540 123 0335 numarasını ara".
  - `WhatsAppButton` props `{ block?: boolean }`: outlined 2px ink button, MapPin icon, label "Konumu WhatsApp'tan gönder", `href={whatsappHref(phone, DEFAULT_WA_MESSAGE)}`, `target="_blank" rel="noopener"`.
  - `ServiceLine` props `{ items: { label: string; href?: string }[] }`: one uppercase Barlow Condensed line, red `›` separators drawn in CSS.
  - `ReflectiveBand`: 14px band, `repeating-linear-gradient(-45deg, var(--red) 0 14px, var(--amber) 14px 28px)`, `aria-hidden`.
  - `StickyActions`: fixed bottom bar under 768px with "Ara" and "WhatsApp", visible by default; a ≤ 1 KB inline script hides it while any element marked `data-primary-cta` is on screen (IntersectionObserver). Without JS it stays visible.

- [ ] **Step 1: Write failing tests** in `tests/e2e/home-fold.spec.ts`:
  - `test('call and WhatsApp are above the fold on 375x667')`: viewport 375×667; `getByRole('link', { name: /0540 123 0335 numarasını ara/ })` and the WhatsApp link have bounding box bottom ≤ 667; tel href equals `tel:+905401230335`; WhatsApp href starts with `https://wa.me/905401230335?text=`.
  - `test('Turkish uppercase')`: `h1` innerText contains `YOLDA MI KALDINIZ?`; header text contains `İZMİR` or `İzmir` and never `IZMIR`.
  - `test('no horizontal scroll at 320px')`: viewport 320×640; `document.documentElement.scrollWidth <= 320`; the plate number element has a single line (height < 1.6 × its font-size).
  - `test('works without JavaScript')`: new context with `javaScriptEnabled: false`, viewport 375×667; tel link present; after scrolling to bottom the sticky "Ara" link is visible.
  - `test('sticky bar hides while hero CTA is visible, shows after scroll')`: viewport 375×667 with JS; sticky bar hidden at top; after `window.scrollTo(0, 1200)` visible.
  - `test('desktop hero composition')`: viewport 1440×900; h1 and plate are in the left half; the hero photo is in the right half; the reflective band is visible within the first 900px.
- [ ] **Step 2:** Run `npx playwright test tests/e2e/home-fold.spec.ts` → FAIL.
- [ ] **Step 3:** Build the components and the home hero per the spec's "First viewport" section and the mockup: copy exactly "Yolda mı kaldınız? **Bulunduğunuz yere** geliyoruz." (desktop) / "Yolda mı kaldınız? **Geliyoruz.**" (phone; same `h1`, the middle phrase hidden under 768px), paragraph "İzmir'in her ilçesinde gece gündüz çekici ve yol yardım. Arayın ya da konumunuzu WhatsApp'tan gönderin; aracınızı istediğiniz yere bırakalım.", service line "Arıza › Kaza › Akü takviyesi › Lastik › Yakıt › Alkollüyseniz arayın", hero photo via `<Picture>` with `loading="eager"` and `fetchpriority="high"`, caption tab "Park Bornova önü. Peugeot 206 çekiciye alındı." Add `data-primary-cta` to the hero plate. Nav: Hizmetler → `/hizmetler/`, İlçeler → `/izmir/`, Nasıl çalışıyoruz → `/#nasil`, Instagram → `business.instagramUrl`.
- [ ] **Step 4:** Run → PASS. Also run `npm run build` → no errors.
- [ ] **Step 5:** Visual check in the browser pane at 375, 768, 1280, 1440 against the mockup; fix differences in one batch.
- [ ] **Step 6: Commit** `feat: layout, plate call button and home first viewport`.

### Task 5: Job photos and the rest of the home page

**Files:**
- Create: `src/data/jobs.ts`, `src/assets/jobs/*.jpg` (copies of the remaining `kaynak/gorseller/cekici-*.jpg`), `src/components/JobStrip.astro`, `src/components/HowItWorks.astro`, `src/components/Faq.astro`, `src/components/ContactBlock.astro`, `src/data/home-faq.ts`, `tests/unit/jobs.test.ts`, `tests/e2e/home-sections.spec.ts`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces:
  - `jobs: Job[]`, `Job = { id: string; image: ImageMetadata; vehicle: string; place: string; alt: string }`. Entries (vehicle / place, only what the photo shows): `maserati` Maserati Ghibli / Otoyol, Çeşme yönü; `dolmus-yagmur` Karşıyaka–Bornova dolmuşu / Yağmurlu bir akşam; `partner` Peugeot Partner / Köprü altı; `dolmus-cadde` Dolmuş / Şehir merkezi; `sedan-sokak` Sedan / Mahalle arası, dar sokak; `sedan-apartman` Beyaz sedan / Apartman önü; `caddy-viraj` Kırmızı hafif ticari / Virajlı yol; `park-bornova` Peugeot 206 / Park Bornova önü.
  - `JobStrip` props `{ limit?: number; heading?: string }`: grid of 5 on desktop, horizontal scroll-snap strip on phones, caption = bold vehicle + muted place, Instagram link "Tümü Instagram'da: @dadakyolyardim".
  - `Faq` props `{ items: { q: string; a: string }[] }`: native `<details>`; caller adds `faqJsonLd`.
  - `homeFaq: { q: string; a: string }[]`: 5 items answerable from PRODUCT.md only (Which areas? İzmir geneli. Hours? 7/24. How do I share location? WhatsApp. Do you take drunk drivers' cars home? Yes. Which vehicles? Otomobil, hafif ticari, dolmuş/minibüs, as seen in photos). No prices.

- [ ] **Step 1: Write failing tests:** `tests/unit/jobs.test.ts`: every job has non-empty `vehicle`, `place`, `alt`; ids unique; no field matches `/\d{1,2}[./]\d{1,2}[./]\d{2,4}|yıldız|puan|müşteri/i` (no dates, ratings, customer names). `tests/e2e/home-sections.spec.ts`: home has sections with ids `nasil`, `hizmetler`, `ilceler`, `sss`, `iletisim`; exactly one `script[type="application/ld+json"]` contains `"FAQPage"`; the page contains no text matching `/nakliyat|evden eve|ofis taşıma/i`.
- [ ] **Step 2:** Run both → FAIL.
- [ ] **Step 3:** Implement data and components; home order after the band: JobStrip, HowItWorks (three steps: "Arayın", "Konumunuzu gönderin", "Aracınızı istediğiniz yere bırakalım"; set as a numbered sequence because order matters; JobStrip gets the page's only reveal, a short fade-up from already-visible content, disabled under `prefers-reduced-motion`), services overview (ServiceLine items linking to service pages, plus one sentence each, as a two-column text list, not cards), districts overview (links to live districts + "Tüm ilçeler"), the "Alkollü araç kullanmayın, arayın" message as a full-width ink panel with PlateCall, Faq, ContactBlock (phone, WhatsApp, Instagram, both addresses).
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5: Commit** `feat: job strip and home sections`.

### Task 6: Service pages

**Files:**
- Create: `src/data/services.ts`, `src/pages/hizmetler/[slug].astro`, `src/pages/hizmetler/index.astro`, `tests/unit/services.test.ts`, `tests/e2e/services.spec.ts`

**Interfaces:**
- Consumes: `jobs`, `serviceJsonLd`, `faqJsonLd`, `breadcrumbJsonLd`, `PlateCall`, `WhatsAppButton`, `Faq`, `JobStrip`.
- Produces: `services: Service[]`, `Service = { slug: string; name: string; metaTitle: string; metaDescription: string; lead: string; body: string[]; whenToCall: string[]; faq: { q: string; a: string }[]; jobId: Job['id'] }`. Slugs: `ariza-kurtarma`, `kaza-oto-kurtarma`, `aku-takviyesi`, `lastik-destegi`, `yakit-destegi`, `alkollu-surucu-arac-tasima`.

- [ ] **Step 1: Write failing tests:** unit: 6 services, unique slugs/metaTitles, every `metaTitle` ≤ 60 chars and contains `İzmir`, every `metaDescription` 120–160 chars, ≥ 2 FAQ each, `jobId` exists in `jobs`, no text matches `/₺|TL\b|\d+\s*dk/` (no prices or promised minutes). e2e: each `/hizmetler/<slug>/` returns 200, has one `h1`, a tel link, a `Service` JSON-LD and a `BreadcrumbList` only when `SITE_URL` is set.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Write the six services' Turkish copy (short, "siz" form, facts from PRODUCT.md only) and the page template: h1 = service name, lead, PlateCall + WhatsAppButton, body paragraphs, "Ne zaman arayın" list, photo from `jobId` with caption, Faq, JobStrip limit 3. Index lists services as a text list.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5: Commit** `feat: service pages`.

### Task 7: District data model, pages and draft gating

**Files:**
- Create: `src/data/ilceler.ts`, `src/lib/ilce.ts`, `src/pages/izmir/index.astro`, `src/pages/izmir/[slug].astro`, `tests/unit/ilceler.test.ts`, `tests/e2e/ilceler.spec.ts`

**Interfaces:**
- Produces:
  - `Ilce = { name: string; slug: string; status: 'live' | 'draft'; intro: string; roads: string[]; landmarks: string[]; neighbours: string[]; faq: { q: string; a: string }[] }`.
  - `ilceler: Ilce[]` containing all 30 districts from the spec, all `status: 'draft'` except Bornova and Kemalpaşa, which are written fully in this task and set `live` pending the owner's check.
  - `slugifyTr(name: string): string` in `src/lib/ilce.ts` (`'Çiğli'` → `'cigli'`, `'Karşıyaka'` → `'karsiyaka'`, `'Ödemiş'` → `'odemis'`, `'Güzelbahçe'` → `'guzelbahce'`, `'İzmir'` → `'izmir'`).
  - `liveIlceler(): Ilce[]`; page path `/izmir/${slug}-cekici/`.

- [ ] **Step 1: Write failing tests:** unit: `slugifyTr` cases above; 30 districts, unique slugs; every live district has `intro` ≥ 250 chars, ≥ 2 roads, ≥ 2 landmarks, ≥ 2 neighbours, ≥ 2 FAQ; **doorway check**: for every pair of live districts, their `intro` with each district's name removed has a word-level Jaccard similarity < 0.5. e2e: `/izmir/bornova-cekici/` returns 200; `/izmir/aliaga-cekici/` (draft) returns 404; `/izmir/` lists only live districts; home JSON-LD `areaServed` names equal the live set.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement data, helpers, `getStaticPaths` from `liveIlceler()`, district template (h1 "`<İlçe>` Çekici · 7/24 Yol Yardım", intro, PlateCall + WhatsAppButton, "Sık yardım verdiğimiz yollar" list from `roads`, landmarks, neighbour links to live neighbours only, Faq, JobStrip limit 3). Bornova and Kemalpaşa copy researched from public sources; record sources in `docs/ilce-kaynaklari.md` for the owner's check.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5: Commit** `feat: district pages with draft gating`.

### Task 8: District content drafts for the other 28 districts

**Files:**
- Modify: `src/data/ilceler.ts`, `docs/ilce-kaynaklari.md`
- Create: `docs/ilce-kontrol-listesi.md` (one checkbox per district for the owner)

**Interfaces:**
- Consumes: `Ilce`, unit tests from Task 7.

- [ ] **Step 1:** Add a unit test `drafts are complete` asserting every district (draft or live) now meets the live content minimums and the doorway check across all 30.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Research and write the 28 remaining districts (keep `status: 'draft'`); list sources per district in `docs/ilce-kaynaklari.md`.
- [ ] **Step 4:** Run → PASS. Draft districts still produce no pages (Task 7 e2e still passes).
- [ ] **Step 5: Commit** `content: district drafts awaiting owner check`.

### Task 9: Contact page, İzmir map and 404

**Files:**
- Create: `scripts/build-izmir-map.mjs`, `src/assets/izmir-ilceler.svg`, `src/components/IzmirMap.astro`, `src/pages/iletisim.astro`, `src/pages/404.astro`, `tests/e2e/contact.spec.ts`

**Interfaces:**
- Consumes: `business`, `liveIlceler`, `slugifyTr`.
- Produces: `IzmirMap` props `{ highlight: string[] }` (district slugs): inline SVG, each district a `<path data-ilce="<slug>">`, highlighted ones filled `--red` at 0.85, others `--line`, district labels for highlighted ones, `<title>` per path.

- [ ] **Step 1:** Source İzmir district boundaries as GeoJSON from an openly licensed dataset (ask the user before downloading; record source and licence in `scripts/build-izmir-map.mjs` header). Convert once to a simplified SVG (< 60 KB) with `mapshaper` via npx; commit the SVG, not the GeoJSON.
- [ ] **Step 2: Write failing tests** `tests/e2e/contact.spec.ts`: `/iletisim/` has tel link, WhatsApp link, Instagram link, both addresses as text; the SVG has 30 `path[data-ilce]` and the highlighted count equals the live district count; no request leaves `localhost` during page load; `/olmayan-sayfa/` shows the 404 page with a tel link.
- [ ] **Step 3:** Run → FAIL.
- [ ] **Step 4:** Implement `IzmirMap`, the contact page (h1 "İletişim", PlateCall, WhatsAppButton, Instagram, addresses, map) and 404 ("Bu sayfa yok, ama yardım bir arama uzağınızda." + PlateCall + link home).
- [ ] **Step 5:** Run → PASS.
- [ ] **Step 6: Commit** `feat: contact page, İzmir map and 404`.

### Task 10: Sitemap, Open Graph, performance and final review

**Files:**
- Modify: `astro.config.mjs`, `src/layouts/BaseLayout.astro`
- Create: `src/assets/og.jpg` (1200×630 crop of the Park Bornova photo with the logo badge), `tests/e2e/seo.spec.ts`

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1: Write failing tests** `tests/e2e/seo.spec.ts`: build without `SITE_URL`: `/robots.txt` contains `Disallow: /`, home has `meta[name=robots][content=noindex]`, no `link[rel=canonical]`. Then a second Playwright project that builds with `SITE_URL=https://ornek.com.tr`: canonical on home is `https://ornek.com.tr/`, `/sitemap-index.xml` exists, sitemap contains `/izmir/bornova-cekici/` and does not contain `aliaga`, every page has a unique `<title>` and `og:image`. Total transferred JS on home < 5 KB.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Wire sitemap (only built pages exist, so drafts are excluded automatically), OG tags in BaseLayout, second Playwright project/webServer for the `SITE_URL` build on port 4323.
- [ ] **Step 4:** Run full suite `npm test && npm run test:e2e` → PASS.
- [ ] **Step 5:** Run `impeccable detect --json src/` and fix mechanical findings; screenshot home, one service, one district, contact at 375 and 1440 and compare with the mockup; fix in one batch.
- [ ] **Step 6:** Run `/code-review` and `/security-review` on the branch; fix findings.
- [ ] **Step 7:** Update `CLAUDE.md` with the real commands (`npm run dev`, `npm test`, `npx vitest run <file>`, `npm run test:e2e -- <file>`, `SITE_URL=… npm run build`) and the data-file map.
- [ ] **Step 8: Commit** `feat: sitemap, Open Graph and final polish`.
