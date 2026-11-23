import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || undefined,
  // Sub-folder deploys (GitHub Pages test site) set BASE_PATH=/<repo>/.
  ...(process.env.BASE_PATH ? { base: process.env.BASE_PATH } : {}),
  output: 'static',
  trailingSlash: 'always',
  ...(process.env.CACHE_DIR ? { cacheDir: process.env.CACHE_DIR } : {}),
  outDir: process.env.OUT_DIR ?? './dist',
  integrations: process.env.SITE_URL ? [sitemap()] : [],
});
