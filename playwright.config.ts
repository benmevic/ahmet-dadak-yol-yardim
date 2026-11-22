import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  projects: [
    {
      name: 'chromium',
      testIgnore: /seo-site\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4322' },
    },
    {
      name: 'site-url',
      testMatch: /seo-site\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4324' },
    },
  ],
  webServer: [
    {
      command: 'npm run build && npm run preview -- --port 4322',
      port: 4322,
      reuseExistingServer: false,
      timeout: 180000,
    },
    {
      command:
        'node scripts/serve-site-build.mjs',
      port: 4324,
      reuseExistingServer: false,
      timeout: 180000,
    },
  ],
});
