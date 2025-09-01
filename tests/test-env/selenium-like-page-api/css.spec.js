import { test, expect } from '@playwright/test';
import fs from 'fs';

const TIMEOUT = 5000;

test.describe('CSS Locator Tests', () => {

  test('Update locator for element with css attribute', async ({ page }) => {
    // Navigate to the callback test page
    await page.goto('https://mdn.github.io/web-components-examples/life-cycle-callbacks/');

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

      content = await page.content();
      fs.writeFileSync(`page-content/page-test-env-callback-${i + 2}.html`, content, 'utf-8');

      // Verify square element still exists (should be healed)
      const healedSquareElement = await page.$('custom-square[color="red"]');
      expect(healedSquareElement).not.toBeNull();
      expect(await healedSquareElement.isVisible()).toBe(true);
    }
  });

  test('Update locator for element with css id with special character', async ({ page }) => {
    // Navigate to the test environment page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    // Find element by CSS ID with special character before selector change
    const changeNameElement = await page.$('input#change\\:name');
    expect(changeNameElement).not.toBeNull();
    expect(await changeNameElement.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click({ timeout: TIMEOUT });

    // Find element by CSS ID with special character after selector change (should be healed)
    const healedChangeNameElement = await page.$('input#change\\:name');
    expect(healedChangeNameElement).not.toBeNull();
    expect(await healedChangeNameElement.isVisible()).toBe(true);
  });

  test('Update locator for element with css Element', async ({ page }) => {
    // Navigate to the test environment page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    // Find element by CSS tag before selector change
    const testTagElement = await page.$('test_tag');
    expect(testTagElement).not.toBeNull();
    expect(await testTagElement.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click({ timeout: TIMEOUT });

    // Find element by CSS tag after selector change (should be healed)
    const healedTestTagElement = await page.$('test_tag');
    expect(healedTestTagElement).not.toBeNull();
    expect(await healedTestTagElement.isVisible()).toBe(true);
  });

  test('Update locator for element with css Disabled', async ({ page }) => {
    // Navigate to the test environment page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    // Find disabled element by CSS pseudo-selector before selector change
    const disabledElement = await page.$('input:disabled');
    expect(disabledElement).not.toBeNull();
    expect(await disabledElement.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click({ timeout: TIMEOUT });

    // Find disabled element by CSS pseudo-selector after selector change (should be healed)
    const healedDisabledElement = await page.$('input:disabled');
    expect(healedDisabledElement).not.toBeNull();
    expect(await healedDisabledElement.isVisible()).toBe(true);
  });

  test('Update locator for element with css Enabled', async ({ page }) => {
    // Navigate to the test environment page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    // Find enabled element by CSS pseudo-selector before selector change
    const enabledElement = await page.$('textarea:enabled');
    expect(enabledElement).not.toBeNull();
    expect(await enabledElement.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click({ timeout: TIMEOUT });

    // Find enabled element by CSS pseudo-selector after selector change (should be healed)
    const healedEnabledElement = await page.$('textarea:enabled');
    expect(healedEnabledElement).not.toBeNull();
    expect(await healedEnabledElement.isVisible()).toBe(true);
  });

  test('Update locator for element with css ClassName', async ({ page }) => {
    // Navigate to the test environment page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    // Find element by CSS class before selector change
    const testClassElement = await page.$('.test_class');
    expect(testClassElement).not.toBeNull();
    expect(await testClassElement.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click({ timeout: TIMEOUT });

    // Find element by CSS class after selector change (should be healed)
    const healedTestClassElement = await page.$('.test_class');
    expect(healedTestClassElement).not.toBeNull();
    expect(await healedTestClassElement.isVisible()).toBe(true);
  });
});
