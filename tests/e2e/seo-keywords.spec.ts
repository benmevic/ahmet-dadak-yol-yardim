import { test, expect } from '@playwright/test';

const SERVICE_SLUGS = [
  'ariza-kurtarma',
  'kaza-oto-kurtarma',
  'aku-takviyesi',
  'lastik-destegi',
  'yakit-destegi',
  'alkollu-surucu-arac-tasima',
];

test('home title targets "İzmir oto çekici"', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/^İzmir Oto Çekici ve Yol Yardım 7\/24/);
  expect((await page.title()).length).toBeLessThanOrEqual(60);
});

test('home FAQ answers how to call the nearest tow truck', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main')).toContainText("İzmir'de en yakın çekiciyi nasıl çağırırım?");
});

test('district page title and description name oto çekici and oto kurtarma', async ({ page }) => {
  await page.goto('/izmir/bornova-cekici/');
  await expect(page).toHaveTitle('Bornova Çekici 7/24, Oto Kurtarma | Ahmet Dadak');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /^Bornova oto çekici ve yol yardım/);
});

test('district page links to every service page', async ({ page }) => {
  await page.goto('/izmir/kemalpasa-cekici/');
  const section = page.locator('section.district-services');
  for (const slug of SERVICE_SLUGS) {
    await expect(section.locator(`a[href="/hizmetler/${slug}/"]`)).toHaveCount(1);
  }
});

test('service page H1 names İzmir and the page links to live districts', async ({ page }) => {
  await page.goto('/hizmetler/aku-takviyesi/');
  await expect(page.locator('h1')).toContainText('İzmir');
  const areas = page.locator('section.service-areas');
  await expect(areas.locator('a[href="/izmir/bornova-cekici/"]')).toHaveCount(1);
  await expect(areas.locator('a[href="/izmir/kemalpasa-cekici/"]')).toHaveCount(1);
  await expect(areas.locator('a[href="/izmir/"]')).toHaveCount(1);
});

test('index pages carry the search phrase in their H1', async ({ page }) => {
  await page.goto('/hizmetler/');
  await expect(page.locator('h1')).toContainText('çekici', { ignoreCase: true });
  await page.goto('/izmir/');
  await expect(page.locator('h1')).toContainText('çekici', { ignoreCase: true });
});
