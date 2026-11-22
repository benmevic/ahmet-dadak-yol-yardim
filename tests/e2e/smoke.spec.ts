import { test, expect } from '@playwright/test';

test('home responds in Turkish', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html[lang="tr"]')).toHaveCount(1);
});
