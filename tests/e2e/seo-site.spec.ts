import { test, expect } from '@playwright/test';

const SITE = 'https://ornek.com.tr';

test('home is indexable with canonical', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `${SITE}/`);
  await expect(page.locator('meta[name=robots]')).toHaveCount(0);
});

test('robots.txt points at the sitemap', async ({ request }) => {
  const text = await (await request.get('/robots.txt')).text();
  expect(text).not.toContain('Disallow: /\n');
  expect(text).toContain('sitemap-index.xml');
});

test('sitemap lists live districts only and every page has unique title and og:image', async ({
  request,
}) => {
  const index = await request.get('/sitemap-index.xml');
  expect(index.ok()).toBe(true);
  const sm = await (await request.get('/sitemap-0.xml')).text();
  expect(sm).toContain('/izmir/bornova-cekici/');
  expect(sm).not.toContain('aliaga');

  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(urls.length).toBeGreaterThan(8);
  const titles = new Set<string>();
  for (const url of urls) {
    const html = await (await request.get(new URL(url).pathname)).text();
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
    expect(title, url).toBeTruthy();
    expect(titles.has(title!), `duplicate title ${title}`).toBe(false);
    titles.add(title!);
    expect(html, url).toMatch(/<meta property="og:image" content="https:\/\/ornek\.com\.tr\/[^"]+"/);
  }
});
