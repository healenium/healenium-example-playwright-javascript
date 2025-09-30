import { test, expect } from '@playwright/test';
import fs from 'fs';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 250;

test.describe('CSS 1 Locator Tests', () => {

  test('Update locator for element with css attribute', async ({ page }) => {
    // Navigate to the callback test page
    await page.goto('https://mdn.github.io/web-components-examples/life-cycle-callbacks/', { waitUntil: 'domcontentloaded' });

    let content = await page.content();
    fs.writeFileSync('page-content/page-test-env-callback.html', content, 'utf-8');

    // Click add square button and verify square element
    const addSquareBtn = await page.$('//button[contains(@class, "add")]');
    expect(addSquareBtn).not.toBeNull();
    await addSquareBtn.click({ timeout: TIMEOUT });

    content = await page.content();
    fs.writeFileSync('page-content/page-test-env-callback-1.html', content, 'utf-8');

    // Verify square element exists
    const squareElement = await page.$('custom-square[color="red"]');
    expect(squareElement).not.toBeNull();
    expect(await squareElement.isVisible()).toBe(true);

    // Test healing multiple times
    for (let i = 0; i <= 1; i++) {
      console.log(`Healing test iteration ${i + 1}`);
      
      // Click update square button
      const updateSquareBtn = await page.$('//button[contains(@class, "update")]');
      expect(updateSquareBtn).not.toBeNull();
      await updateSquareBtn.click({ timeout: TIMEOUT });
      await page.waitForTimeout(WAIT_TIMEOUT);
      
      content = await page.content();
      fs.writeFileSync(`page-content/page-test-env-callback-${i + 2}.html`, content, 'utf-8');

      // Verify square element still exists (should be healed)
      const healedSquareElement = await page.$('custom-square[color="red"]');
      expect(healedSquareElement).not.toBeNull();
      expect(await healedSquareElement.isVisible()).toBe(true);
    }
  });
});
