import { test, expect } from '@playwright/test';

test('home has all section anchors', async ({ page }) => {
  await page.goto('/');
  for (const id of ['nasil', 'hizmetler', 'ilceler', 'sss', 'iletisim']) {
    await expect(page.locator(`section#${id}`)).toHaveCount(1);
  }
});

test('exactly one JSON-LD script carries FAQPage', async ({ page }) => {
  await page.goto('/');
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(scripts.filter((s) => s.includes('"FAQPage"')).length).toBe(1);
});

test('no moving-business wording on the page', async ({ page }) => {
  await page.goto('/');
  const text = await page.locator('body').innerText();
  expect(text).not.toMatch(/nakliyat|evden eve|ofis taşıma/i);
});

test('job strip lists real jobs and links to Instagram', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Son taşıdıklarımız/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /@dadakyolyardim/ }).first()).toBeVisible();
});

test('how it works is an ordered list of three steps', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#nasil ol > li')).toHaveCount(3);
});

test('services section links to the six service pages', async ({ page }) => {
  await page.goto('/');
  const hrefs = await page.locator('section#hizmetler a').evaluateAll((as) =>
    as.map((a) => a.getAttribute('href')),
  );
  expect(hrefs).toEqual([
    '/hizmetler/ariza-kurtarma/',
    '/hizmetler/kaza-oto-kurtarma/',
    '/hizmetler/aku-takviyesi/',
    '/hizmetler/lastik-destegi/',
    '/hizmetler/yakit-destegi/',
    '/hizmetler/alkollu-surucu-arac-tasima/',
  ]);
});

test('districts section links to /izmir/', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#ilceler a[href="/izmir/"]')).toHaveCount(1);
});

test('header nav anchor lands on the how-it-works section', async ({ page }) => {
  await page.goto('/');
  const link = page.locator('header').getByRole('link', { name: 'Nasıl çalışıyoruz' });
  await expect(link).toHaveAttribute('href', '/#nasil');
  await expect(page.locator('section#nasil ol > li')).toHaveCount(3);
});

test('strip Instagram link points to the business profile', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section.jobs a[href*="instagram.com"]')).toHaveAttribute(
    'href',
    'https://www.instagram.com/dadakyolyardim/',
  );
});

test('phone job strip is keyboard focusable and named', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const strip = page.locator('section.jobs ul.jobs-row');
  await expect(strip).toHaveAttribute('tabindex', '0');
  await expect(strip).toHaveAttribute('aria-label', /yana kaydırın/);
  const scrolls = await strip.evaluate((el) => el.scrollWidth > el.clientWidth);
  expect(scrolls).toBe(true);
  await strip.focus();
  const outline = await strip.evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe('none');
});
