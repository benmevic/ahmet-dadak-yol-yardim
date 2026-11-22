import { test, expect } from '@playwright/test';

const SLUGS = [
  'ariza-kurtarma',
  'kaza-oto-kurtarma',
  'aku-takviyesi',
  'lastik-destegi',
  'yakit-destegi',
  'alkollu-surucu-arac-tasima',
];

const jsonLdTypes = async (page: import('@playwright/test').Page) =>
  page.locator('script[type="application/ld+json"]').evaluateAll((els) =>
    els.map((e) => JSON.parse(e.textContent ?? '{}')['@type']),
  );

for (const slug of SLUGS) {
  test(`/hizmetler/${slug}/ is a complete service page`, async ({ page }) => {
    const res = await page.goto(`/hizmetler/${slug}/`);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main a[href="tel:+905401230335"]').first()).toBeVisible();
    const types = await jsonLdTypes(page);
    expect(types).toContain('Service');
    expect(types).toContain('FAQPage');
    expect(types).not.toContain('BreadcrumbList');
    await expect(page.locator('main figure img')).toHaveCount(1);
    await expect(page.locator('.faq details').first()).toBeVisible();
  });
}

test('/hizmetler/ lists all six services', async ({ page }) => {
  const res = await page.goto('/hizmetler/');
  expect(res?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  for (const slug of SLUGS) {
    await expect(page.locator(`main a[href="/hizmetler/${slug}/"]`)).toHaveCount(1);
  }
});

test('home services link to existing pages', async ({ page, request }) => {
  await page.goto('/');
  const hrefs = await page
    .locator('#hizmetler a[href^="/hizmetler/"]')
    .evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  expect(hrefs).toHaveLength(6);
  for (const h of hrefs) expect((await request.get(h!)).status()).toBe(200);
});
