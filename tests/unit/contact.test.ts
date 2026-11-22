import { describe, expect, it } from 'vitest';
import { business } from '../../src/data/business';
import { DEFAULT_WA_MESSAGE, telHref, whatsappHref } from '../../src/lib/contact';

describe('telHref', () => {
  it('builds a tel: link from an E.164 number', () => {
    expect(telHref('+905401230335')).toBe('tel:+905401230335');
  });
});

describe('whatsappHref', () => {
  it('builds a wa.me link without the leading plus', () => {
    expect(whatsappHref('+905401230335')).toBe('https://wa.me/905401230335');
  });

  it('url-encodes the prefilled message', () => {
    const href = whatsappHref('+905401230335', DEFAULT_WA_MESSAGE);
    expect(href).toBe(
      'https://wa.me/905401230335?text=' + encodeURIComponent(DEFAULT_WA_MESSAGE),
    );
    const text = new URL(href).searchParams.get('text');
    expect(text).toBe(DEFAULT_WA_MESSAGE);
    expect(text).toContain('kaldım');
  });
});

describe('business data', () => {
  it('lists two addresses', () => {
    expect(business.addresses).toHaveLength(2);
  });

  it('uses the display phone format', () => {
    expect(business.phoneDisplay).toBe('0540 123 0335');
  });
});
