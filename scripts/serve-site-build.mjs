// Builds the site with a SITE_URL into dist-site/ and serves it on 127.0.0.1:4324.
// Used by the second Playwright project; keeps the default build untouched.
// A tiny static server is used because `astro preview` allows only one instance.
// CACHE_DIR gives this build its own Astro/image cache so it cannot race the
// default build that Playwright runs at the same time.
import { spawnSync } from 'node:child_process';
import { createStaticServer } from './static-server.mjs';

const env = {
  ...process.env,
  SITE_URL: 'https://ornek.com.tr',
  OUT_DIR: './dist-site',
  CACHE_DIR: './node_modules/.astro-site',
};

const build = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], {
  env,
  stdio: 'inherit',
});
if (build.status !== 0) process.exit(build.status ?? 1);

createStaticServer('dist-site').listen(4324, '127.0.0.1');
