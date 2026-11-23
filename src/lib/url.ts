// Prefixes a site-root path ("/izmir/") with the deploy base, so the site
// also works from a sub-folder (GitHub Pages test site: /<repo>/). External
// and relative links are returned unchanged. With no base set this is a no-op.
export function withBase(path: string): string {
  if (!path.startsWith('/')) return path;
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');
  return base + path;
}
