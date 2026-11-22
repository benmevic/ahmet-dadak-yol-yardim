import { test, expect } from '@playwright/test';

const PRICE_Q = 'Çekici ücreti ne kadar?';

test('home FAQ answers the price question and names motorcycles', async ({ page }) => {
  await page.goto('/');
  const main = page.locator('main');
  await expect(main).toContainText(PRICE_Q);
  await expect(main).toContainText(/uygun fiyat/i);
  await expect(main).toContainText('motosiklet');
});

test('district pages carry the price question in their FAQ', async ({ page }) => {
  await page.goto('/izmir/bornova-cekici/');
  await expect(page.locator('.faq-section')).toContainText(PRICE_Q);
});

test('arıza kurtarma page says motorcycles are carried', async ({ page }) => {
  await page.goto('/hizmetler/ariza-kurtarma/');
  await expect(page.locator('main')).toContainText('Motosikletimi de taşır mısınız?');
});

test('no page claims to be the cheapest', async ({ page }) => {
  for (const path of ['/', '/izmir/bornova-cekici/', '/hizmetler/ariza-kurtarma/']) {
    await page.goto(path);
    await expect(page.locator('body')).not.toContainText(/en ucuz/i);
  }
});
