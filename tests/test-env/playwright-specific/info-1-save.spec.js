import { test, expect } from '@playwright/test';

const TIMEOUT = 3000;

test.describe('Locator API - Information Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://elenastepuro.github.io/test_env/index.html');
    await page.waitForTimeout(1000);
  });

  test('textContent method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    const textContent = await inputField.textContent({ timeout: TIMEOUT });
    console.log('Input textContent:', textContent);
  });

  test('innerText method', async ({ page }) => {
    test.slow();
    const linkElement = page.locator('a:has-text("Change: LinkText, PartialLinkText")');
    const innerText = await linkElement.innerText({ timeout: TIMEOUT });
    console.log('Link innerText:', innerText);
  });

  test('innerHTML method', async ({ page }) => {
    test.slow();
    const linkElement = page.locator('a:has-text("Change: LinkText, PartialLinkText")');
    const innerHTML = await linkElement.innerHTML({ timeout: TIMEOUT });
    console.log('Child tag innerHTML:', innerHTML);
  });

  test('inputValue method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.fill('Test value', { timeout: TIMEOUT });
    const inputValue = await inputField.inputValue({ timeout: TIMEOUT });
    expect(inputValue).toBe('Test value');
  });

  test('getAttribute method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    const attribute = await inputField.getAttribute('name', { timeout: TIMEOUT });
    expect(attribute).toBe("Field2");
  });

  test('boundingBox method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    const boundingBox = await inputField.boundingBox({ timeout: TIMEOUT });
    console.log('Input bounding box:', boundingBox);
  });

  test('isEnabled method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    const isEnabled = await inputField.isEnabled({ timeout: TIMEOUT });
    expect(isEnabled).toBe(true);
  });

  test('isDisabled method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    const isDisabled = await inputField.isDisabled({ timeout: TIMEOUT });
    expect(isDisabled).toBe(false);
  });

  test('isEditable method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    const isInputEditable = await inputField.isEditable({ timeout: TIMEOUT });
    expect(isInputEditable).toBe(true);
  });

  /*
      Can not save 'isVisible' and 'isHidden' due to success/fail ambiguity
      // IS VISIBLE
      const isInputVisible = await inputField.isVisible({ timeout });
      // {"id":24,"guid":"frame@270394fb70b41528f6132d58fd4cb769","method":"isVisible","params":{"selector":".test_class","strict":true},"metadata":{}}
      // {"id":24,"result":{"value":true}}  - success
      // {"id":24,"result":{"value":false}} - there is no element with such 'selector'

      // IS HIDDEN
      const isInputHidden = await inputField.isHidden({ timeout });
      // {"id":26,"guid":"frame@270394fb70b41528f6132d58fd4cb769","method":"isHidden","params":{"selector":".test_class","strict":true},"metadata":{}}
      // {"id":26,"result":{"value":false}} - success
      // {"id":26,"result":{"value":true}}  - there is no element with such 'selector'
  */
});