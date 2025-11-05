import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Locator API - Utility Methods - HEAL Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });

    // Click Change locators button to initialize the test environment
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();

    await page.waitForTimeout(500);
  });

  // describe affects selector's value!
  test('describe action for form elements', async ({ page }) => {
    test.slow();
  // describe affects only selector's value
  const changeIdInput = page.locator('input#change_id')
      .describe('Primary input field that changes ID and TagName');

    const changeClassInput = page.locator('.test_class')
      .describe('Input field that changes ClassName');

    // Use the described locators
    await changeIdInput.click({ timeout: TIMEOUT });
    await changeClassInput.fill('Test description', { timeout: TIMEOUT });

    await expect(changeIdInput).toBeVisible();
    await expect(changeClassInput).toHaveValue('Test description');
  });

  test('highlight element', async ({ page }) => {
    // Highlight won't be healed
    const testClassInput = page.locator('.test_class');
    await testClassInput.highlight({ timeout: TIMEOUT });
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/highlight-2-heal.png', fullPage: true });
  });

  test('ariaSnapshot action', async ({ page }) => {
    test.slow();
    // Get ARIA snapshot of individual input
    const changeIdInput = page.locator('input#change_id');
    const inputAriaSnapshot = await changeIdInput.ariaSnapshot({ timeout: TIMEOUT });
    const stringifiedInputAriaSnapshot = JSON.stringify(inputAriaSnapshot, null, 2);
    console.log('Input ARIA Snapshot:', stringifiedInputAriaSnapshot);

    // Verify snapshot contain expected properties
    expect(inputAriaSnapshot).toBeDefined();
    expect(stringifiedInputAriaSnapshot).toContain('textbox');
  });

  test('dispatch event action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    const childTag = page.locator('child_tag#change_element_last_child');
    const testTag = page.locator('test_tag#change_element');
    const changeNameInput = page.locator('input[name="change_name"]');

    await inputField.dispatchEvent('keydown', { key: 'A' }, { timeout: TIMEOUT });
    await childTag.dispatchEvent('customEvent', { detail: 'custom data' }, { timeout: TIMEOUT });
    await testTag.dispatchEvent('click', {}, { timeout: TIMEOUT });
    await changeNameInput.dispatchEvent('input', { data: 'test' }, { timeout: TIMEOUT });
  });

  test('waitFor action', async ({ page }) => {
    test.slow();
    const testClassInput = page.locator('.test_class');

    await testClassInput.waitFor({ state: 'visible', timeout: TIMEOUT });

    await testClassInput.fill('WaitFor test', { timeout: TIMEOUT });
    await expect(testClassInput).toHaveValue('WaitFor test', { timeout: TIMEOUT });

    // Wait for element to be attached (more general than visible)
    await testClassInput.waitFor({ state: 'attached', timeout: TIMEOUT });
  });

  test('waitFor with strict mode and custom timeout', async ({ page }) => {
    test.slow();
    const testClassInput = page.locator('.test_class');

    // Wait with strict mode (will fail if multiple elements match)
    await testClassInput.waitFor({
      state: 'visible',
      timeout: TIMEOUT,
      strict: true
    });

    // Verify strict mode works (should only find one element)
    await expect(testClassInput).toBeVisible({ timeout: TIMEOUT });
  });

});