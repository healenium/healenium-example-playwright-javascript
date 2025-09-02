import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Locator API - Action Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://elenastepuro.github.io/test_env/index.html');
    await page.waitForTimeout(500);

    // Click Change locators button to initialize the test environment
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();

    await page.waitForTimeout(500);
  });

  // 'evaluate'       can not be healed because under the hood request 'waitForSelector' is internal with timeout 0
  // 'evaluateHandle' can not be healed because under the hood request 'waitForSelector' is internal with timeout 0

  // won't heal multiple elements

});