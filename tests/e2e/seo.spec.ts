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
    let bytes = 0;
    page.on('response', async (res) => {
      if (res.request().resourceType() === 'script') {
        bytes += (await res.body()).length;
      }
    });
    await page.goto('/', { waitUntil: 'networkidle' });
    expect(bytes).toBeLessThan(5 * 1024);
  });
});
