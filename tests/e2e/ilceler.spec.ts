import { test, expect } from '@playwright/test';

test('/izmir/bornova-cekici/ is a complete district page', async ({ page }) => {
  const res = await page.goto('/izmir/bornova-cekici/');
  expect(res?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toContainText('Bornova Çekici');
  await expect(page.locator('main a[href="tel:+905401230335"]').first()).toBeVisible();
  await expect(page.locator('.faq details').first()).toBeVisible();
  const types = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((els) => els.map((e) => JSON.parse(e.textContent ?? '{}')['@type']));
  expect(types).toContain('FAQPage');
});

test('draft district page is not built', async ({ request }) => {
  expect((await request.get('/izmir/aliaga-cekici/')).status()).toBe(404);
});

test('/izmir/ lists only live districts', async ({ page }) => {
  const res = await page.goto('/izmir/');
  expect(res?.status()).toBe(200);
  const hrefs = await page
    .locator('main a[href^="/izmir/"][href$="-cekici/"]')
    .evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  expect(hrefs.sort()).toEqual(['/izmir/bornova-cekici/', '/izmir/kemalpasa-cekici/']);
});

test('neighbour list links only live districts', async ({ page, request }) => {
  await page.goto('/izmir/bornova-cekici/');
  const hrefs = await page
    .locator('.neighbours a')
    .evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  expect(hrefs).toEqual(['/izmir/kemalpasa-cekici/']);
  expect((await request.get(hrefs[0]!)).status()).toBe(200);
});

test('home areaServed equals the live set and home links to live districts', async ({ page }) => {
  await page.goto('/');
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const biz = scripts.map((s) => JSON.parse(s)).find((j) => j['@type'] === 'AutomotiveBusiness');
  expect(biz.areaServed.map((a: { name: string }) => a.name).sort()).toEqual(['Bornova', 'Kemalpaşa']);
  await expect(page.locator('section#ilceler a[href="/izmir/bornova-cekici/"]')).toHaveCount(1);
  await expect(page.locator('section#ilceler a[href="/izmir/kemalpasa-cekici/"]')).toHaveCount(1);
  await expect(page.locator('section#ilceler a[href="/izmir/"]')).toHaveCount(1);
});

test('road section heading makes no frequency claim', async ({ page }) => {
  await page.goto('/izmir/bornova-cekici/');
  await expect(page.getByRole('heading', { name: 'Bölgedeki ana yollar' })).toBeVisible();
  expect(await page.locator('body').innerText()).not.toContain('Sık yardım verdiğimiz');
});
