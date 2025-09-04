import { test, expect } from '@playwright/test';
const TIMEOUT = 5000;

test.describe('Deprecated ElementHandle Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://elenastepuro.github.io/test_env/index.html');
    await page.waitForTimeout(500);
  });

  test('elementHandle() method - get single ElementHandle (deprecated)', async ({ page }) => {
    const inputHandle = await page.locator('.test_class').elementHandle({ timeout: TIMEOUT });
    
    expect(inputHandle).toBeTruthy();
    
    await inputHandle.fill('New text value');
    expect(await inputHandle.inputValue()).toBe('New text value');

  });

  test('elementHandles() method - get all ElementHandles (deprecated)', async ({ page }) => {
    const inputHandles = await page.locator('input[type="text"]').elementHandles();
    console.log('checkboxHandles', inputHandles.length);
    
    for (let i = 0; i < inputHandles.length; i++) {
      await inputHandles[i].evaluate((el, index) => {
        el.style.border = `5px solid red`;
        el.style.margin = '5px';
        el.style.padding = '5px';
        el.value = `New text value: ${el.tagName} ${index}`;
      }, i);
    }
    
    const firstHandle = inputHandles[0];
    const firstId = await firstHandle.getAttribute('id');
    const isVisible = await firstHandle.isVisible();
    const boundingBox = await firstHandle.boundingBox();
    
    console.log(`First text input - ID: ${firstId}, Visible: ${isVisible}`);
    console.log(`Bounding box:`, boundingBox);
    
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/elementHandles-method.png', fullPage: true });
  });

  test('ElementHandle methods demonstration (deprecated)', async ({ page }) => {
    const inputHandle = await page.locator('input[type="text"]').first().elementHandle();
    
    const tagName = await inputHandle.evaluate(el => el.tagName);
    const textContent = await inputHandle.textContent();
    const isDisabled = await inputHandle.isDisabled();
    const className = await inputHandle.getAttribute('class');
    
    console.log(`Input - Tag: ${tagName}, Text: ${textContent}`);
    console.log(`Disabled: ${isDisabled}, Class: ${className}`);
  });

});