import { test, expect } from '@playwright/test';

const TIMEOUT = 3000;

test.describe('Locator API - Checkbox Information Methods - HEAL Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });

    // Click Change locators button to initialize the test environment
    const submitBtn = page.locator('#Submit_checkbox');
    await submitBtn.click();

    await page.waitForTimeout(500);
  });

  test('isChecked', async ({ page }) => {
    test.slow();
    const checkbox = page.locator('input.input1#form_checked1');
    
    await checkbox.check({ timeout: TIMEOUT });
    const isCheckboxChecked = await checkbox.isChecked({ timeout: TIMEOUT });
    expect(isCheckboxChecked).toBe(true);

  });

});