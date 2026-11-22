import type { Business } from '../data/business';

const ALL_DAYS = [
  'https://schema.org/Monday',
  'https://schema.org/Tuesday',
  'https://schema.org/Wednesday',
  'https://schema.org/Thursday',
  'https://schema.org/Friday',
  'https://schema.org/Saturday',
  'https://schema.org/Sunday',
];

export function businessId(siteUrl: URL): string {
  return new URL('/#isletme', siteUrl).toString();
}

export function localBusinessJsonLd(
  b: Business,
  areaServed: string[],
  siteUrl: URL | undefined,
  logoUrl?: string,
  serviceNames: string[] = [],
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    ...(siteUrl ? { '@id': businessId(siteUrl) } : {}),
    name: b.name,
    telephone: b.phoneE164,
    sameAs: [b.instagramUrl],
    ...(siteUrl ? { url: siteUrl.toString() } : {}),
    ...(siteUrl && logoUrl ? { logo: logoUrl, image: logoUrl } : {}),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ALL_DAYS,
        opens: '00:00',
        closes: '23:59',
      },
    ],
    address: b.addresses.map((a) => ({
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.district,
      addressRegion: 'İzmir',
      addressCountry: 'TR',
    })),
    areaServed: areaServed.map((name) => ({ '@type': 'City', name })),
    ...(serviceNames.length > 0
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Çekici ve yol yardım hizmetleri',
            itemListElement: serviceNames.map((name) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name },
            })),
          },
        }
      : {}),
  };
}

export function serviceJsonLd(
  name: string,
  description: string,
  b: Business,
  siteUrl?: URL,
  areaServed: string | object = 'İzmir',
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: siteUrl
      ? { '@id': businessId(siteUrl) }
      : {
          '@type': 'AutomotiveBusiness',
          name: b.name,
          telephone: b.phoneE164,
        },
    areaServed,
  };
}

export function faqJsonLd(items: { q: string; a: string }[]): object | null {
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(
  crumbs: { name: string; path: string }[],
  siteUrl: URL | undefined,
): object | null {
  if (!siteUrl) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: new URL(crumb.path, siteUrl).toString(),
    })),
  };
}

export function robotsTxt(siteUrl: URL | undefined): string {
  if (!siteUrl) {
    return 'User-agent: *\nDisallow: /\n';
  }
  const sitemap = new URL('/sitemap-index.xml', siteUrl).toString();
  return `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
}

export function isIndexable(siteUrl: URL | undefined): boolean {
  return siteUrl !== undefined;
}
