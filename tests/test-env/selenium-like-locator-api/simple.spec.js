
import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Simple Locator API Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('Update locator for element with css id', async ({ page }) => {
    test.slow();
    const idElement = page.locator('input#newValue');
    await expect(idElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });

    // Find element by CSS ID after selector change (should be healed)
    const changeIdElement = page.locator('input#newValue');
    await expect(changeIdElement).toBeVisible();
  });

  test('Update locator for element with css Enabled', async ({ page }) => {
    test.slow();
    const enabledElement = page.locator('textarea#change_enabled');
    await expect(enabledElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });

    // Find enabled element by CSS pseudo-selector after selector change (should be healed)
    const changedEnabledElement = page.locator('textarea#change_enabled');
    await expect(changedEnabledElement).toBeVisible();
  });

  test('XPath Not Contains', async ({ page }) => {
    test.slow();    
    const notContainsElement = page.locator('input#change_className');
    await expect(notContainsElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });

    // Find element by XPath not contains after selector change (should be healed)
    const changedNotContainsElement = page.locator('input#change_className');
    await expect(changedNotContainsElement).toBeVisible();
  });
});
