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
