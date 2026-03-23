
import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Locator API - getBy - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('getByRole - img - alt', async ({ page }) => {
    test.slow();
    await expect(page.locator('img#logo_img')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.locator('img#logo_img')).toBeVisible({ TIMEOUT });
  });

  test('getByRole - textbox - aria label', async ({ page }) => {
    test.slow();
    await expect(page.locator('input#change_below_element')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.locator('input#change_below_element')).toBeVisible({ TIMEOUT });
  });

  test('getByRole - textbox - aria labelledby', async ({ page }) => {
    test.slow();
    await expect(page.locator('input#change_className')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');  
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.locator('input#change_className')).toBeVisible({ TIMEOUT });

  });

  test('getByText', async ({ page }) => {
    test.slow();
    await expect(page.locator('div.draggable-item.green-item')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change    
    await expect(page.locator('div.draggable-item.green-item')).toBeVisible({ TIMEOUT });
  });

  test('getByLabel', async ({ page }) => {
    test.slow();
    await expect(page.locator('input#newValue')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');  
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.locator('input#newValue')).toBeVisible({ TIMEOUT });

  });

  test('getByPlaceholder', async ({ page }) => {
    test.slow();
    await expect(page.locator('input#validate_testId')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');  
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.locator('input#validate_testId')).toBeVisible({ TIMEOUT });
  });

  test('getByAltText', async ({ page }) => {
    test.slow();
    await expect(page.locator('img#logo_img')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');  
    await submitBtn.click();  

    // Test healing - same action should work after locator change
    await expect(page.locator('img#logo_img')).toBeVisible({ TIMEOUT });
  });

  test('getByTitle', async ({ page }) => {
    test.slow();
    await expect(page.locator('input#validate_testId')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.locator('input#validate_testId')).toBeVisible({ TIMEOUT });
  });

  test('getByTestId', async ({ page }) => {
    test.slow();
    await expect(page.locator('input#validate_testId')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.locator('input#validate_testId')).toBeVisible({ TIMEOUT });
  });

});
