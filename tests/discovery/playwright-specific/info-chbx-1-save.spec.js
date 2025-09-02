import { test, expect } from '@playwright/test';

const TIMEOUT = 3000;

test.describe('Locator API - Checkbox Information Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://elenastepuro.github.io/test_env/index.html');
    await page.waitForTimeout(1000);
  });

  test('isChecked', async ({ page }) => {
    test.slow();
    const checkbox = page.locator('input.input1#form_checked1');

    await checkbox.check({ timeout: TIMEOUT });
    const isCheckboxChecked = await checkbox.isChecked({ timeout: TIMEOUT });
    expect(isCheckboxChecked).toBe(true);

  });

});