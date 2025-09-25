import { test, expect } from '@playwright/test';
import fs from 'fs';

const TIMEOUT = 5000;

test.describe('Locator API - CheckBox Action Methods - HEAL Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html');
    await page.waitForTimeout(500);

    // Click Change locators button to initialize the test environment
    const submitBtn = page.locator('#Submit_checkbox');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();

    await page.waitForTimeout(500);
  });

  test('check action', async ({ page }) => {
    test.slow();

    let content = await page.content();
    fs.writeFileSync('page-content/page-test-env-#Submit_checkbox.html', content, 'utf-8');

    const checkbox = page.locator('input.input1#form_checked1');
    await checkbox.check({ timeout: TIMEOUT });
    await expect(checkbox).toBeChecked();
  });

  test('uncheck action', async ({ page }) => {
    test.slow();
    const checkbox2 = page.locator('input.input1#form_checked2');
    await checkbox2.uncheck({ timeout: TIMEOUT });
    await expect(checkbox2).not.toBeChecked();
  });

  test('set checked True action', async ({ page }) => {
    test.slow();
    const checkbox = page.locator('input.input1#form_checked1');
    await checkbox.setChecked(true, { timeout: TIMEOUT });
    await expect(checkbox).toBeChecked();
  });

  test('set checked False action', async ({ page }) => {
    test.slow();
    const checkbox2 = page.locator('input.input1#form_checked2');
    await checkbox2.setChecked(false, { timeout: TIMEOUT });
    await expect(checkbox2).not.toBeChecked();
  });

  test('set checked with force action', async ({ page }) => {
    test.slow();
    const checkbox = page.locator('input.input1#form_checked1');
    await checkbox.setChecked(true, {
      force: true,
      timeout: TIMEOUT
    });
    await expect(checkbox).toBeChecked();
  });

});