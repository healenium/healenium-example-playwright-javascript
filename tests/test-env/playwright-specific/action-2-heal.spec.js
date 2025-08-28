import { test, expect } from '@playwright/test';
import fs from 'fs';

const clickTimeout = 5000;

test.describe('Locator API - Action Methods - HEAL Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://elenastepuro.github.io/test_env/index.html');
    await page.waitForTimeout(500);

    // Click Change locators button to initialize the test environment
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();

    await page.waitForTimeout(500);
  });

  test('click action', async ({ page }) => {
    test.slow();
    let content = await page.content();
    fs.writeFileSync('page-content/page-test-env-#Submit.html', content, 'utf-8');

    const inputField = page.locator('.test_class');
    await inputField.click({ timeout: clickTimeout });
  });

  test('double click action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    await inputField.dblclick({ timeout: clickTimeout });
  });

  test('blur action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    await inputField.blur({ timeout: clickTimeout });
  });

  test('fill and clear actions', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.fill('Hello World', { timeout: clickTimeout });
    await expect(inputField).toHaveValue('Hello World');

    await inputField.clear({ timeout: clickTimeout });
    await expect(inputField).toHaveValue('');
  });


  test('type action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.type('Typing text slowly', { timeout: clickTimeout });
    await expect(inputField).toHaveValue('Typing text slowly');
  });

  test('press sequentially action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.pressSequentially('Sequential typing', {
      delay: 100,
      timeout: clickTimeout
    });
    await expect(inputField).toHaveValue('Sequential typing');
  });

  test('press action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    await inputField.fill('Test text', { timeout: clickTimeout });
    await inputField.press('Enter', { timeout: clickTimeout });
  });

  test('check/uncheck action', async ({ page }) => {
    test.slow();
    const checkbox = page.locator('input#form_checked1');
    await checkbox.check({ timeout: clickTimeout });
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck({ timeout: clickTimeout });
    await expect(checkbox).not.toBeChecked();
  });

  test('set checked action', async ({ page }) => {
    test.slow();
    const checkbox = page.locator('input#form_checked1');
    await checkbox.setChecked(true, { timeout: clickTimeout });
    await expect(checkbox).toBeChecked();
    await checkbox.setChecked(false, { timeout: clickTimeout });
    await expect(checkbox).not.toBeChecked();
  });

  test('set checked with force action', async ({ page }) => {
    test.slow();
    const checkbox = page.locator('input#form_checked1');
    await checkbox.setChecked(true, {
      force: true,
      timeout: clickTimeout
    });
  });

  test('hover action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    // here might be Visual changes: 
    // If there are hover styles, they'll be visible (e.g., border color change, background color)
    await inputField.hover({ timeout: clickTimeout });
  });

  test('focus and blur actions', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.focus({ timeout: clickTimeout });
    await expect(inputField).toBeFocused();
    await inputField.blur({ timeout: clickTimeout });
    await expect(inputField).not.toBeFocused();
  });

  test('scroll into view if needed action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.scrollIntoViewIfNeeded({
      timeout: clickTimeout,
      strict: true
    });
    await expect(inputField).toBeVisible();
  });

  test('select text action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('.test_class');
    await inputField.fill('Text to select', { timeout: clickTimeout });
    await inputField.selectText({
      timeout: clickTimeout,
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