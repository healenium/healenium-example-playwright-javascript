import { test, expect } from '@playwright/test';
import fs from 'fs';

const clickTimeout = 5000;

test.describe('CSS Locator Tests', () => {
/*
  test('Update locator for element with css attribute', async ({ page }) => {
    // Navigate to the callback test page
    await page.goto('https://mdn.github.io/web-components-examples/life-cycle-callbacks/');

    let content = await page.content();
    fs.writeFileSync('page-content/page-test-env-callback.html', content, 'utf-8');

    // Click add square button and verify square element
    const addSquareBtn = page.locator('//button[contains(@class, "add")]');
    await expect(addSquareBtn).toBeVisible();
    await addSquareBtn.click({ timeout: clickTimeout });

    content = await page.content();
    fs.writeFileSync('page-content/page-test-env-callback-1.html', content, 'utf-8');

    // Verify square element exists
    const squareElement = page.locator('custom-square[color="red"]');
    await expect(squareElement).toBeVisible();

    // Test healing multiple times
    for (let i = 0; i <= 1; i++) {
      console.log(`Healing test iteration ${i + 1}`);
      
      // Click update square button
      const updateSquareBtn = page.locator('//button[contains(@class, "update")]');
      await expect(updateSquareBtn).toBeVisible();
      await updateSquareBtn.click({ timeout: clickTimeout });

      content = await page.content();
      fs.writeFileSync(`page-content/page-test-env-callback-${i + 2}.html`, content, 'utf-8');

      // Verify square element still exists (should be healed)
      const healedSquareElement = page.locator('custom-square[color="red"]');
      await expect(healedSquareElement).toBeVisible();
    }
  });

  test('Update locator for element with css id with special character', async ({ page }) => {
    // Navigate to the test environment page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    // Find element by CSS ID with special character before selector change
    const changeNameElement = page.locator('input#change\\:name');
    await expect(changeNameElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: clickTimeout });

    // Find element by CSS ID with special character after selector change (should be healed)
    const healedChangeNameElement = page.locator('input#change\\:name');
    await expect(healedChangeNameElement).toBeVisible();
  });

  test('Update locator for element with css Element', async ({ page }) => {
    // Navigate to the test environment page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    // Find element by CSS tag before selector change
    const testTagElement = page.locator('test_tag');
    await expect(testTagElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: clickTimeout });

    // Find element by CSS tag after selector change (should be healed)
    const healedTestTagElement = page.locator('test_tag');
    await expect(healedTestTagElement).toBeVisible();
  });

  test('Update locator for element with css Disabled', async ({ page }) => {
    // Navigate to the test environment page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    // Find disabled element by CSS pseudo-selector before selector change
    const disabledElement = page.locator('input:disabled');
    await expect(disabledElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: clickTimeout });

    // Find disabled element by CSS pseudo-selector after selector change (should be healed)
    const healedDisabledElement = page.locator('input:disabled');
    await expect(healedDisabledElement).toBeVisible();
  });

  test('Update locator for element with css Enabled', async ({ page }) => {
    // Navigate to the test environment page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    // Find enabled element by CSS pseudo-selector before selector change
    const enabledElement = page.locator('textarea:enabled');
    await expect(enabledElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: clickTimeout });

    // Find enabled element by CSS pseudo-selector after selector change (should be healed)
    const healedEnabledElement = page.locator('textarea:enabled');
    await expect(healedEnabledElement).toBeVisible();
  });

  test('Update locator for element with css ClassName', async ({ page }) => {
    // Navigate to the test environment page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    // Find element by CSS class before selector change
    const testClassElement = page.locator('.test_class');
    await expect(testClassElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: clickTimeout });

    // Find element by CSS class after selector change (should be healed)
    const healedTestClassElement = page.locator('.test_class');
    await expect(healedTestClassElement).toBeVisible();
  });
  */
});