
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
    await expect(page.getByRole('textbox', { name: 'change_tag_aria_label' })).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByRole('textbox', { name: 'change_tag_aria_label' })).toBeVisible({ TIMEOUT });
  });

  test('getByRole - textbox - aria labelledby', async ({ page }) => {
    test.slow();
    await expect(page.getByRole('textbox', { name: 'Field labeled by' })).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');  
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByRole('textbox', { name: 'Field labeled by' })).toBeVisible({ TIMEOUT });

  });

  test('getByText', async ({ page }) => {
    test.slow();
    await expect(page.getByText('Green Item')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change    
    await expect(page.getByText('Green Item')).toBeVisible({ TIMEOUT });
  });

  test('getByLabel', async ({ page }) => {
    test.slow();
    await expect(page.getByLabel('Field with hover')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');  
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByLabel('Field with hover')).toBeVisible({ TIMEOUT });

  });

  test('getByPlaceholder', async ({ page }) => {
    test.slow();
    await expect(page.getByPlaceholder('Change: TestId')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');  
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByPlaceholder('Change: TestId')).toBeVisible({ TIMEOUT });
  });

  test('getByAltText', async ({ page }) => {
    test.slow();
    await expect(page.getByAltText('Healenium Logo')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');  
    await submitBtn.click();  

    // Test healing - same action should work after locator change
    await expect(page.getByAltText('Healenium Logo')).toBeVisible({ TIMEOUT });
  });

  test('getByTitle', async ({ page }) => {
    test.slow();
    await expect(page.getByTitle('Validate change test id')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByTitle('Validate change test id')).toBeVisible({ TIMEOUT });
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
