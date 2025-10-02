import { test, expect } from '@playwright/test';

const TIMEOUT = 9000;
const WAIT_TIMEOUT = 8000;

test.describe('Locator API - CheckBox Action Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    // await page.goto('https://elenastepuro.github.io/test_env/index.html', { waitUntil: 'load' });
    // await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
    await page.goto('file:///D:/EPM-HLM/repo/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('wait new element', async ({ page }) => {
    await page.locator('#Wait_Submit').click(TIMEOUT);
    await page.waitForTimeout(WAIT_TIMEOUT);
    await expect(page.locator('#wait_new_element')).toBeVisible();
  });

});
