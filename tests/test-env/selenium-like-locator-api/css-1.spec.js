import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 250;

test.describe('CSS 1 Locator Tests', () => {

  test('Update locator for element with css attribute', async ({ page }) => {
    // Navigate to the callback test page
    test.slow();
    await page.goto('https://mdn.github.io/web-components-examples/life-cycle-callbacks/', { waitUntil: 'load' });

    // Click add square button and verify square element
    const addSquareBtn = page.locator('//button[contains(@class, "add")]');
    await expect(addSquareBtn).toBeVisible();
    await addSquareBtn.click({ timeout: TIMEOUT });

    // Verify square element exists
    const squareElement = page.locator('custom-square[color="red"]');
    await expect(squareElement).toBeVisible();

    // Test healing multiple times
    for (let i = 0; i <= 1; i++) {
      console.log(`Healing test iteration ${i + 1}`);
      
      // Click update square button
      const updateSquareBtn = page.locator('//button[contains(@class, "update")]');
      await expect(updateSquareBtn).toBeVisible();
      await updateSquareBtn.click({ timeout: TIMEOUT });

      // Verify square element still exists (should be healed)
      const healedSquareElement = page.locator('custom-square[color="red"]');
      await expect(healedSquareElement).toBeVisible();
    }
  });

});