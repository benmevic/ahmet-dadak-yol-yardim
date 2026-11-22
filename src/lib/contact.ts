export const DEFAULT_WA_MESSAGE = 'Merhaba, yolda kaldım. Konumumu gönderiyorum.';

export function telHref(e164: string): string {
  return `tel:${e164}`;
}

export function whatsappHref(e164: string, message?: string): string {
  const digits = e164.replace(/^\+/, '');
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
