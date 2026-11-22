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

test('404 is noindex with no canonical', async ({ page }) => {
  await page.goto('/404.html');
  await expect(page.locator('meta[name=robots][content^=noindex]')).toHaveCount(1);
  await expect(page.locator('link[rel=canonical]')).toHaveCount(0);
});

test('business entity has a stable @id and district pages reference it', async ({ page }) => {
  const read = async (path: string) => {
    await page.goto(path);
    return page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((els) => els.map((e) => JSON.parse(e.textContent ?? '{}')));
  };
  const home = await read('/');
  const business = home.find((d) => d['@type'] === 'AutomotiveBusiness');
  expect(business['@id']).toBe(`${SITE}/#isletme`);
  expect(business.logo).toMatch(/^https:\/\/ornek\.com\.tr\//);

  for (const path of ['/izmir/bornova-cekici/', '/hizmetler/ariza-kurtarma/']) {
    const ld = await read(path);
    expect(ld.some((d) => d['@type'] === 'AutomotiveBusiness'), path).toBe(false);
    const service = ld.find((d) => d['@type'] === 'Service');
    expect(service.provider).toEqual({ '@id': `${SITE}/#isletme` });
  }
});
