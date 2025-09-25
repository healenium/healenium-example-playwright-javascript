import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Locator Filter - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html');
    await page.waitForTimeout(500);
  });

  test('hasText', async ({ page }) => {
    await page.locator('div')
      .filter({ hasText: 'Change locators' })
      .first()
      .click({ timeout: TIMEOUT });
    await page.locator('button')
      .filter({ hasText: /Change/ })
      .first()
      .click({ timeout: TIMEOUT });
  });

  test('hasNotText', async ({ page }) => {
    await page.locator('button')
      .filter({ hasNotText: 'Change locators' })
      .first()
      .click({ timeout: TIMEOUT });
  });

  test('has', async ({ page }) => {
    await page.locator('div')
      .filter({
        has: page.locator('input[placeholder*="Change: Id and TagName"]')
      })
      .first()
      .click();
  });


  test('hasNot', async ({ page }) => {
    await page.locator('div')
      .filter({
        hasNot: page.locator('input[disabled]')
      })
      .first()
      .click({ timeout: TIMEOUT });
  });
});