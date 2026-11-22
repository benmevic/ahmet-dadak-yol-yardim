import { describe, expect, it } from 'vitest';
import { business } from '../../src/data/business';
import {
  breadcrumbJsonLd,
  faqJsonLd,
  isIndexable,
  localBusinessJsonLd,
  robotsTxt,
  serviceJsonLd,
} from '../../src/lib/seo';

// Minimal shape used to read JSON-LD objects without casting everywhere.
type Ld = Record<string, any>;

describe('localBusinessJsonLd', () => {
  it('is an AutomotiveBusiness with no url when siteUrl is undefined', () => {
    const ld = localBusinessJsonLd(business, ['Bornova', 'Kemalpaşa'], undefined) as Ld;
    expect(ld['@type']).toBe('AutomotiveBusiness');
    expect(ld.areaServed.length).toBe(2);
    expect(ld.address.length).toBe(2);
    expect(ld).not.toHaveProperty('url');
  });

  it('includes the root url when siteUrl is given', () => {
    const ld = localBusinessJsonLd(
      business,
      ['Bornova', 'Kemalpaşa'],
      new URL('https://ornek.com.tr'),
    ) as Ld;
    expect(ld.url).toBe('https://ornek.com.tr/');
  });

  it('has a stable @id, logo and image only when siteUrl is given', () => {
    const site = new URL('https://ornek.com.tr');
    const ld = localBusinessJsonLd(business, ['Bornova'], site, 'https://ornek.com.tr/_astro/logo.png') as Ld;
    expect(ld['@id']).toBe('https://ornek.com.tr/#isletme');
    expect(ld.logo).toBe('https://ornek.com.tr/_astro/logo.png');
    expect(ld.image).toBe('https://ornek.com.tr/_astro/logo.png');
    const bare = localBusinessJsonLd(business, ['Bornova'], undefined, 'https://x/y.png') as Ld;
    expect(bare).not.toHaveProperty('@id');
    expect(bare).not.toHaveProperty('logo');
    expect(bare).not.toHaveProperty('image');
  });

  it('lists the given services in an OfferCatalog, and omits it when none are given', () => {
    const ld = localBusinessJsonLd(business, ['Bornova'], undefined, undefined, ['Arıza kurtarma', 'Akü takviyesi']) as Ld;
    expect(ld.hasOfferCatalog['@type']).toBe('OfferCatalog');
    expect(ld.hasOfferCatalog.itemListElement).toEqual([
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Arıza kurtarma' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Akü takviyesi' } },
    ]);
    expect(localBusinessJsonLd(business, ['Bornova'], undefined)).not.toHaveProperty('hasOfferCatalog');
  });

  it('covers all 7 days in openingHoursSpecification', () => {
    const ld = localBusinessJsonLd(business, ['Bornova'], undefined) as Ld;
    expect(ld.openingHoursSpecification[0].dayOfWeek).toHaveLength(7);
    expect(ld.openingHoursSpecification[0].opens).toBe('00:00');
    expect(ld.openingHoursSpecification[0].closes).toBe('23:59');
  });

  it('uses the E.164 telephone and the instagram sameAs link', () => {
    const ld = localBusinessJsonLd(business, ['Bornova'], undefined) as Ld;
    expect(ld.telephone).toBe('+905401230335');
    expect(ld.sameAs).toEqual([business.instagramUrl]);
  });

  it('describes each address as a PostalAddress in İzmir, TR', () => {
    const ld = localBusinessJsonLd(business, ['Bornova'], undefined) as Ld;
    expect(ld.address[0]['@type']).toBe('PostalAddress');
    expect(ld.address[0].addressRegion).toBe('İzmir');
    expect(ld.address[0].addressCountry).toBe('TR');
    expect(ld.address[0].addressLocality).toBe(business.addresses[0].district);
  });

  it('maps each area to a City entry', () => {
    const ld = localBusinessJsonLd(business, ['Bornova', 'Kemalpaşa'], undefined) as Ld;
    expect(ld.areaServed[0]).toEqual({ '@type': 'City', name: 'Bornova' });
  });
});

describe('serviceJsonLd', () => {
  it('builds a Service provided by the business in İzmir', () => {
    const ld = serviceJsonLd('Yol yardım', 'Çekici hizmeti', business) as Ld;
    expect(ld['@type']).toBe('Service');
    expect(ld.name).toBe('Yol yardım');
    expect(ld.description).toBe('Çekici hizmeti');
    expect(ld.provider.name).toBe(business.name);
    expect(ld.provider.telephone).toBe('+905401230335');
    expect(ld.areaServed).toBe('İzmir');
  });

  it('references the business by @id when siteUrl is given', () => {
    const ld = serviceJsonLd('Yol yardım', 'Çekici hizmeti', business, new URL('https://ornek.com.tr')) as Ld;
    expect(ld.provider).toEqual({ '@id': 'https://ornek.com.tr/#isletme' });
  });

  it('accepts a custom areaServed', () => {
    const ld = serviceJsonLd('Bornova çekici', 'd', business, undefined, { '@type': 'City', name: 'Bornova' }) as Ld;
    expect(ld.areaServed).toEqual({ '@type': 'City', name: 'Bornova' });
  });
});

describe('faqJsonLd', () => {
  it('returns null for an empty list', () => {
    expect(faqJsonLd([])).toBeNull();
  });

  it('maps a single item to a Question with an accepted answer', () => {
    const ld = faqJsonLd([{ q: 'Kaç saat açıksınız?', a: '7/24 hizmet veriyoruz.' }]) as Ld;
    expect(ld['@type']).toBe('FAQPage');
    expect(ld.mainEntity[0].acceptedAnswer.text).toBe('7/24 hizmet veriyoruz.');
    expect(ld.mainEntity[0].name).toBe('Kaç saat açıksınız?');
  });
});

describe('breadcrumbJsonLd', () => {
  it('returns null when siteUrl is undefined', () => {
    expect(breadcrumbJsonLd([{ name: 'Ana sayfa', path: '/' }], undefined)).toBeNull();
  });

  it('builds absolute item urls from siteUrl and path', () => {
    const ld = breadcrumbJsonLd(
      [
        { name: 'Ana sayfa', path: '/' },
        { name: 'Hizmetler', path: '/hizmetler/' },
      ],
      new URL('https://ornek.com.tr'),
    ) as Ld;
    expect(ld['@type']).toBe('BreadcrumbList');
    expect(ld.itemListElement[1].position).toBe(2);
    expect(ld.itemListElement[1].item).toBe('https://ornek.com.tr/hizmetler/');
  });
});

describe('robotsTxt', () => {
  it('disallows everything and omits Sitemap when siteUrl is undefined', () => {
    const txt = robotsTxt(undefined);
    expect(txt).toContain('Disallow: /');
    expect(txt).not.toContain('Sitemap:');
  });

  it('allows everything and lists the sitemap index when siteUrl is given', () => {
    const txt = robotsTxt(new URL('https://ornek.com.tr'));
    expect(txt).toContain('Allow: /');
    expect(txt).toContain('Sitemap: https://ornek.com.tr/sitemap-index.xml');
  });
});

describe('isIndexable', () => {
  it('is false without a siteUrl', () => {
    expect(isIndexable(undefined)).toBe(false);
  });

  it('is true with a siteUrl', () => {
    expect(isIndexable(new URL('https://ornek.com.tr'))).toBe(true);
  });
});
