import { test, expect } from '@playwright/test';

test('/iletisim/ carries every way to reach the business', async ({ page }) => {
  const res = await page.goto('/iletisim/');
  expect(res?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('İletişim');
  await expect(page.locator('main a[href="tel:+905401230335"]').first()).toBeVisible();
  await expect(page.locator('main a[href^="https://wa.me/905401230335"]').first()).toBeVisible();
  await expect(page.locator('main a[href="https://www.instagram.com/dadakyolyardim/"]').first()).toBeVisible();
  await expect(page.locator('main')).toContainText('Çambel Mah. 2005 Sk. No:4, Kemalpaşa / İzmir');
  await expect(page.locator('main')).toContainText('Mevlana Mah. 1713 Sk. No:3, Bornova / İzmir');
});

test('Instagram label is separated from the handle', async ({ page }) => {
  await page.goto('/iletisim/');
  await expect(page.locator('.contact-insta').first()).toHaveText(/Instagram: @dadakyolyardim/);
});

test('İzmir map has 30 districts and highlights the live ones', async ({ page }) => {
  await page.goto('/iletisim/');
  const map = page.locator('svg[data-izmir-map]');
  await expect(map.locator('path[data-ilce]')).toHaveCount(30);
  await expect(map.locator('path[data-ilce][data-live]')).toHaveCount(2);
  await expect(map.locator('path[data-ilce="bornova"] > title')).toHaveCount(1);
  await expect(page.getByText('© OpenStreetMap katkıda bulunanlar')).toBeVisible();
});

test('contact page makes no third-party requests', async ({ page }) => {
  const external: string[] = [];
  page.on('request', (r) => {
    const u = new URL(r.url());
    if (!['localhost', '127.0.0.1'].includes(u.hostname) && u.protocol.startsWith('http')) external.push(r.url());
  });
  await page.goto('/iletisim/', { waitUntil: 'networkidle' });
  expect(external).toEqual([]);
});

test('unknown paths show the 404 page with a call link', async ({ page }) => {
  const res = await page.goto('/olmayan-sayfa/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toContainText('Bu sayfa yok');
  await expect(page.locator('main a[href="tel:+905401230335"]').first()).toBeVisible();
  await expect(page.locator('main a[href="/"]').first()).toBeVisible();
});
