import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Simple Locator API Tests', () => {
  test.beforeEach(async ({ page }) => {
    // await page.goto('https://elenastepuro.github.io/test_env/index.html');
    await page.goto('https://healenium.github.io/healenium-test-env/index.html');
  });

  test('Update locator for element with css id', async ({ page }) => {

    const idElement = page.locator('#change_id');
    await expect(idElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(300);

    // Find element by CSS ID after selector change (should be healed)
    const changeIdElement = page.locator('#change_id');
    await expect(changeIdElement).toBeVisible();
  });

  test('Update locator for element with css Enabled', async ({ page }) => {

    const enabledElement = page.locator('textarea:enabled');
    await expect(enabledElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(300);

    // Find enabled element by CSS pseudo-selector after selector change (should be healed)
    const changedEnabledElement = page.locator('textarea:enabled');
    await expect(changedEnabledElement).toBeVisible();
  });

  test('XPath Not Contains', async ({ page }) => {

    const notContainsElement = page.locator('xpath=//input[not(contains(@class, "input1")) and contains(@class, "test_class")]');
    await expect(notContainsElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(300);
    
    // Find element by XPath not contains after selector change (should be healed)
    const changedNotContainsElement = page.locator('xpath=//input[not(contains(@class, "input1")) and contains(@class, "test_class")]');
    await expect(changedNotContainsElement).toBeVisible();
  });
});
