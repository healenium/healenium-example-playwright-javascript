import { test } from '@playwright/test';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 350;

test.describe('Use URL in PK tests', () => {
  test.beforeEach(async ({ page }) => {
    // 'https://elenastepuro.github.io/test_env/index.html'
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('healenium.github.io - Click', async ({ page }) => {
    test.slow();
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });

    const inputField = page.locator('.test_class');
    await inputField.click({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    await healedInputField.click({ timeout: TIMEOUT });
  });

  test('healenium.github.io - Double Click', async ({ page }) => {
    test.slow();
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });

    const inputField = page.locator('input#change_id');
    await inputField.dblclick({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_id');
    await healedInputField.dblclick({ timeout: TIMEOUT });
  });

  test('healenium.github.io - press Enter', async ({ page }) => {
    test.slow();
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });

    // Test elements before selector change
    const testClassElement = await page.$('input.test_class');
    await testClassElement.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);
    
    // Test elements after selector change (should be healed)
    const healedTestClassElement = await page.$('input.test_class');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedTestClassElement.press('Enter');
  });

  test('elenastepuro.github.io - Click', async ({ page }) => {
    test.slow();
    await page.goto('https://elenastepuro.github.io/test_env/index.html', { waitUntil: 'load' });

    const inputField = page.locator('.test_class');
    await inputField.click({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    await healedInputField.click({ timeout: TIMEOUT });
  });

  test('elenastepuro.github.io - Double Click', async ({ page }) => {
    test.slow();
    await page.goto('https://elenastepuro.github.io/test_env/index.html', { waitUntil: 'load' });

    const inputField = page.locator('input#change_id');
    await inputField.dblclick({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_id');
    await healedInputField.dblclick({ timeout: TIMEOUT });
  });  

  test('elenastepuro.github.io - press Enter', async ({ page }) => {
    test.slow();
    await page.goto('https://elenastepuro.github.io/test_env/index.html', { waitUntil: 'load' });

    // Test elements before selector change
    const testClassElement = await page.$('input.test_class');
    await testClassElement.press('Enter');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);
    
    // Test elements after selector change (should be healed)
    const healedTestClassElement = await page.$('input.test_class');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedTestClassElement.press('Enter');
  });  
});
