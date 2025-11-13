import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Locator API - Action Methods - HEAL Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
    // await page.goto('file:///D:/EPM-HLM/repo/healenium-test-env/index.html', { waitUntil: 'load' });

    // Click Change locators button to initialize the test environment
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();

    await page.waitForTimeout(500);
  });

  test('click action', async ({ page }) => {
    test.slow();
    let content = await page.content();
    fs.writeFileSync('page-content/page-test-env.html', content, 'utf-8');

    const inputField = page.locator('.test_class');
    await inputField.click();
  });

  test('double click action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    await inputField.dblclick();
  });

  test('blur action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    await inputField.blur();
  });

  test('fill and clear actions', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.fill('Hello World');
    await expect(inputField).toHaveValue('Hello World');

    await inputField.clear();
    await expect(inputField).toHaveValue('');
  });

  test('type action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.type('Typing text slowly');
    await expect(inputField).toHaveValue('Typing text slowly');
  });

  test('press sequentially action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.pressSequentially('Sequential typing');
    await expect(inputField).toHaveValue('Sequential typing');
  });

  test('press action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    await inputField.fill('Test text');
    await inputField.press('Enter');
  });

  test('hover action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    // here might be Visual changes: 
    // If there are hover styles, they'll be visible (e.g., border color change, background color)
    await inputField.hover();
  });

  test('focus and blur actions', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.focus();
    await expect(inputField).toBeFocused();
    await inputField.blur();
    await expect(inputField).not.toBeFocused();
  });

  test('scroll into view if needed action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.scrollIntoViewIfNeeded();
    await expect(inputField).toBeVisible();
  });

  test('select text action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.fill('Text to select');
    await inputField.selectText();
    await expect(inputField).toBeFocused();
  });

  test('select Option action', async ({ page }) => {
    test.slow();
    const selectElement = page.locator('#select_item');
    await selectElement.selectOption({ label: 'Item 1' });
    await selectElement.selectOption([{ value: '2' }, { value: '3' }]);
  });

  test('set Input Files action', async ({ page }) => {
    test.slow();
    const filePath = path.join(__dirname, '../../../test-data/test-file.txt');

    const inputFile = page.locator('#file_input');
    await inputFile.setInputFiles(filePath);

    const value = await inputFile.inputValue();
    console.log('Input value:', value);
  });

});