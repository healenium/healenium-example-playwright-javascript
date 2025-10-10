import { test, expect } from '@playwright/test';

const TIMEOUT = 12000;

test.describe('Locator API - CheckBox Action Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    // await page.goto('https://elenastepuro.github.io/test_env/index.html', { waitUntil: 'load' });
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
    // await page.goto('file:///D:/EPM-HLM/repo/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('wait_new_element', async ({ page }) => {
    // click on button id=#Wait_Submit will create input id="ait_new_element" after 8 seconds delay
    await page.locator('#Wait_Submit').click();
    await expect(page.locator('#wait_new_element')).toBeVisible({ timeout: TIMEOUT });
  });

  test('change_wait', async ({ page }) => {
    // input with id="change_wait" will be created in 8 seconds after page load
    await expect(page.locator('#change_wait')).toBeVisible({ timeout: TIMEOUT });

    // click on button id=#Submit will change input id="change_wait" to id="newWaitId"
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click();

    // Find input after id change (should be healed)
    await expect(page.locator('#change_wait')).toBeVisible({ timeout: TIMEOUT });
  });

});
