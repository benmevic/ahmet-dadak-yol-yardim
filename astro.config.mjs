import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL ?? undefined,
  output: 'static',
  trailingSlash: 'always',
  outDir: process.env.OUT_DIR ?? './dist',
  integrations: [sitemap()],
});
