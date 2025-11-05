import { test, expect } from '@playwright/test';

test.describe('Locator API - Action Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
    // await page.goto('file:///D:/EPM-HLM/repo/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  // test('drag to action', async ({ page }) => {
  //   test.slow();
  //   const inputField = page.locator('.test_class');
  //   const wrapDiv = page.locator('.shadow-input1');
  //   await inputField.dragTo(wrapDiv, { timeout: clickTimeout });
  // });

});