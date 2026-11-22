import { test, expect } from '@playwright/test';

const PLATE_NAME = /0540 123 0335 numarasını ara/;
const WA_NAME = /Konumu WhatsApp'tan gönder/;

test('call and WhatsApp are above the fold on 375x667', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  const plate = page.getByRole('link', { name: PLATE_NAME }).first();
  const wa = page.getByRole('link', { name: WA_NAME }).first();

  const plateBox = await plate.boundingBox();
  const waBox = await wa.boundingBox();
  expect(plateBox).not.toBeNull();
  expect(waBox).not.toBeNull();
  expect(plateBox!.y + plateBox!.height).toBeLessThanOrEqual(667);
  expect(waBox!.y + waBox!.height).toBeLessThanOrEqual(667);

  await expect(plate).toHaveAttribute('href', 'tel:+905401230335');
  expect(await wa.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/905401230335\?text=/);
});

test('Turkish uppercase', async ({ page }) => {
  await page.goto('/');
  const h1 = await page.locator('h1').innerText();
  expect(h1).toContain('YOLDA MI KALDINIZ?');

  const header = await page.locator('header').first().innerText();
  expect(header).toMatch(/İZMİR|İzmir/);
  expect(header).not.toContain('IZMIR');
});

test('no horizontal scroll at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/');

  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scrollWidth).toBeLessThanOrEqual(320);

  const digits = page.locator('.plate-digits').first();
  const { height, fontSize } = await digits.evaluate((el) => ({
    height: el.getBoundingClientRect().height,
    fontSize: parseFloat(getComputedStyle(el).fontSize),
  }));
  expect(height).toBeLessThan(1.6 * fontSize);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 667 } });

  test('works without JavaScript', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: PLATE_NAME }).first()).toHaveAttribute(
      'href',
      'tel:+905401230335',
    );
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(page.getByRole('link', { name: 'Ara', exact: true })).toBeVisible();
  });
});

test('sticky bar hides while hero CTA is visible, shows after scroll', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  const sticky = page.getByRole('link', { name: 'Ara', exact: true });
  await expect(sticky).toBeHidden();

  await page.evaluate(() => window.scrollTo(0, 1200));
  await expect(sticky).toBeVisible();
});

test('desktop hero composition', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const half = 720;

  const h1 = await page.locator('h1').boundingBox();
  const plate = await page.getByRole('link', { name: PLATE_NAME }).first().boundingBox();
  const hero = await page.locator('.hero').boundingBox();
  const photo = await page.locator('.hero-photo img').boundingBox();

  expect(h1).not.toBeNull();
  expect(plate).not.toBeNull();
  expect(photo).not.toBeNull();
  // The copy sits on the left, dark side of the photo.
  expect(h1!.x + h1!.width).toBeLessThanOrEqual(half);
  expect(plate!.x + plate!.width).toBeLessThanOrEqual(half);
  // The photo fills the whole hero, edge to edge inside its rounded frame.
  expect(photo!.x).toBeLessThanOrEqual(hero!.x + 1);
  expect(photo!.x + photo!.width).toBeGreaterThanOrEqual(hero!.x + hero!.width - 1);
  // The whole hero, with its call plate, fits the first screen.
  expect(hero!.y + hero!.height).toBeLessThanOrEqual(900);
});

for (const path of [
  '/',
  '/hizmetler/ariza-kurtarma/',
  '/hizmetler/',
  '/izmir/',
  '/izmir/bornova-cekici/',
  '/iletisim/',
]) {
  test(`a tel link and a WhatsApp link are on screen at load: ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(path);
    await page.waitForTimeout(300);
    const inView = (selector: string) =>
      page.locator(selector).evaluateAll((els) =>
        els.some((e) => {
          const r = e.getBoundingClientRect();
          const style = getComputedStyle(e);
          return (
            style.visibility !== 'hidden' &&
            r.width > 0 &&
            r.top >= 0 &&
            r.bottom <= window.innerHeight &&
            r.left >= 0 &&
            r.right <= window.innerWidth
          );
        }),
      );
    expect(await inView('a[href^="tel:"]')).toBe(true);
    expect(await inView('a[href^="https://wa.me/"]')).toBe(true);
  });
}
