import { test, expect } from '@playwright/test';

const WA_GREEN = 'rgb(37, 211, 102)';
const INSTA = 'https://www.instagram.com/dadakyolyardim/';

test('hero WhatsApp button wears WhatsApp green and its logo', async ({ page }) => {
  await page.goto('/');
  const wa = page.locator('main .wa-button').first();
  await expect(wa).toHaveCSS('background-color', WA_GREEN);
  await expect(wa.locator('svg[data-brand="whatsapp"]')).toHaveCount(1);
});

test('contact block has an Instagram button with the Instagram logo', async ({ page }) => {
  await page.goto('/');
  const insta = page.locator('#iletisim a.insta-button');
  await expect(insta).toHaveAttribute('href', INSTA);
  await expect(insta).toContainText('@dadakyolyardim');
  await expect(insta.locator('svg[data-brand="instagram"]')).toHaveCount(1);
  const bg = await insta.evaluate((el) => getComputedStyle(el).backgroundImage);
  expect(bg).toContain('gradient');
});

test('job strip Instagram link carries the Instagram logo', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section.jobs a.jobs-insta svg[data-brand="instagram"]')).toHaveCount(1);
});

test('footer WhatsApp and Instagram links show their logos', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer.site-footer');
  await expect(footer.locator('a[href^="https://wa.me/"] svg[data-brand="whatsapp"]')).toHaveCount(1);
  await expect(footer.locator(`a[href="${INSTA}"] svg[data-brand="instagram"]`)).toHaveCount(1);
});

test.describe('phone', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('header shows an Instagram button on phones', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('header.site-header a.header-insta');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('href', INSTA);
    await expect(btn).toHaveAccessibleName(/Instagram/);
    const box = await btn.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(40);
    expect(box!.height).toBeGreaterThanOrEqual(40);
  });

  test('sticky bar WhatsApp button is WhatsApp green', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.sticky-wa')).toHaveCSS('background-color', WA_GREEN);
  });
});

test.describe('desktop', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('header Instagram nav link carries the Instagram logo', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header.site-header a.header-insta')).toBeHidden();
    await expect(page.locator(`.site-nav a[href="${INSTA}"] svg[data-brand="instagram"]`)).toHaveCount(1);
  });
});
