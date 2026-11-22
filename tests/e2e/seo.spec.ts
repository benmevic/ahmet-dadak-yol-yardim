import { test, expect } from '@playwright/test';

test.describe('build without SITE_URL', () => {
  test('robots.txt blocks everything', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(await res.text()).toContain('Disallow: /');
  });

  test('home is noindex with no canonical', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('meta[name=robots][content^=noindex]')).toHaveCount(1);
    await expect(page.locator('link[rel=canonical]')).toHaveCount(0);
  });

  test('home has an og:image even without a page image', async ({ page }) => {
    await page.goto('/iletisim/');
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  });

  test('home ships under 5 KB of JavaScript', async ({ page }) => {
    let external = 0;
    page.on('response', async (res) => {
      if (res.request().resourceType() === 'script') {
        external += (await res.body()).length;
      }
    });
    await page.goto('/', { waitUntil: 'networkidle' });
    const inline = await page
      .locator('script:not([src]):not([type="application/ld+json"])')
      .evaluateAll((els) => els.reduce((n, e) => n + new TextEncoder().encode(e.textContent ?? '').length, 0));
    expect(external + inline).toBeGreaterThan(0);
    expect(external + inline).toBeLessThan(5 * 1024);
  });

  test('home and footer link to /iletisim/', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer a[href="/iletisim/"]')).toHaveCount(1);
    await expect(page.locator('header a[href="/iletisim/"]')).toHaveCount(1);
  });

  test('404 is noindex with no canonical', async ({ page }) => {
    await page.goto('/404.html');
    await expect(page.locator('meta[name=robots][content^=noindex]')).toHaveCount(1);
    await expect(page.locator('link[rel=canonical]')).toHaveCount(0);
  });

  test('hero service line links to the service pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero-services a[href="/hizmetler/alkollu-surucu-arac-tasima/"]')).toHaveCount(1);
    await expect(page.locator('.hero-services a')).toHaveCount(6);
  });

  test('district page appends the address FAQ from business data', async ({ page }) => {
    await page.goto('/izmir/bornova-cekici/');
    await expect(page.locator('.faq')).toContainText('Mevlana Mah. 1713 Sk. No:3, Bornova / İzmir');
    await expect(page.locator('.faq')).toContainText('Çambel Mah. 2005 Sk. No:4, Kemalpaşa / İzmir');
  });

  test('map links are hidden from assistive tech', async ({ page }) => {
    await page.goto('/iletisim/');
    const links = page.locator('svg[data-izmir-map] a');
    expect(await links.count()).toBeGreaterThan(0);
    await expect(links.first()).toHaveAttribute('aria-hidden', 'true');
    await expect(links.first()).toHaveAttribute('tabindex', '-1');
  });
});
