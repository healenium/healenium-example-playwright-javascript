import { test, expect } from '@playwright/test';
import { gotoTestEnv, MDN_CALLBACK_URL } from '../../helpers/goto';

const TIMEOUT = 5000;

test.describe('CSS 1 Locator Tests', () => {

  test('Update locator for element with css attribute', async ({ page }) => {
    // Navigate to the callback test page
    test.slow();
    await gotoTestEnv(page, MDN_CALLBACK_URL);

    // Click add square button and verify square element
    const addSquareBtn = page.locator('//button[contains(@class, "add")]');
    await expect(addSquareBtn).toBeVisible();
    await addSquareBtn.click({ timeout: TIMEOUT });

    // Verify square element exists
    const squareElement = page.locator('custom-square[color="red"]');
    await expect(squareElement).toBeVisible();

    // Test healing multiple times
    for (let i = 0; i <= 1; i++) {
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