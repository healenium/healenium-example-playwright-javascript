import { test, expect } from '@playwright/test';
import fs from 'fs';

const TIMEOUT = 5000;

test.describe('Locator API - Action Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {

    await page.goto('https://elenastepuro.github.io/test_env/index.html');
    await page.waitForTimeout(1000);

  });

  test('click action', async ({ page }) => {
    test.slow();
    let content = await page.content();
    fs.writeFileSync('page-content/page-test-env.html', content, 'utf-8');

    const inputField = page.locator('.test_class');
    await inputField.click({ timeout: TIMEOUT });
  });

  test('double click action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    await inputField.dblclick({ timeout: TIMEOUT });
  });

  test('blur action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    await inputField.blur({ timeout: TIMEOUT });
  });

  test('fill and clear actions', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.fill('Hello World', { timeout: TIMEOUT });
    await expect(inputField).toHaveValue('Hello World');

    await inputField.clear({ timeout: TIMEOUT });
    await expect(inputField).toHaveValue('');
  });

  test('type action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.type('Typing text slowly', { timeout: TIMEOUT });
    await expect(inputField).toHaveValue('Typing text slowly');
  });

  test('press sequentially action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.pressSequentially('Sequential typing', {
      delay: 100,
      timeout: TIMEOUT
    });
    await expect(inputField).toHaveValue('Sequential typing');
  });

  test('press action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    await inputField.fill('Test text', { timeout: TIMEOUT });
    await inputField.press('Enter', { timeout: TIMEOUT });
  });

  test('hover action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    // here might be Visual changes: 
    // If there are hover styles, they'll be visible (e.g., border color change, background color)
    await inputField.hover({ timeout: TIMEOUT });
  });

  test('focus and blur actions', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.focus({ timeout: TIMEOUT });
    await expect(inputField).toBeFocused();
    await inputField.blur({ timeout: TIMEOUT });
    await expect(inputField).not.toBeFocused();
  });

  test('scroll into view if needed action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.scrollIntoViewIfNeeded({
      timeout: TIMEOUT,
      strict: true
    });
    await expect(inputField).toBeVisible();
  });

  test('select text action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.fill('Text to select', { timeout: TIMEOUT });
    await inputField.selectText({
      timeout: TIMEOUT,
      strict: true
    });
    await expect(inputField).toBeFocused();
  });

  // won't test for a while because there are 'target' and 'source' instead of 'selector'
  // test('drag to action', async ({ page }) => {
  //   test.slow();
  //   // visually nothing noticeable will happen because the input isn't configured to be draggable
  //   // actually we should  test on elements that are designed to be draggable
  //   const inputField = page.locator('.test_class');
  //   const wrapDiv = page.locator('.shadow-input1');
  //   await inputField.dragTo(wrapDiv, { timeout: clickTimeout });
  // });

});