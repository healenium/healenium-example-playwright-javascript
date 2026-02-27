import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Multiple Elements (healing)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('toHaveText array', async ({ page }) => {
    test.slow();
    const list = page.locator('.drag-container .draggable-item');
    await expect(list).toHaveText(['Green Item', 'Red Item'], { timeout: TIMEOUT });
    await expect(list).toHaveCount(2);

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('.drag-container .draggable-item');
    await expect(healed).toHaveText(['Changed: get by text', 'Red Item'], { timeout: TIMEOUT });
    await expect(healed).toHaveCount(2);
  });

});
