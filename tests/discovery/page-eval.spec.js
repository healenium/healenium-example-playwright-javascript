import { test } from '@playwright/test';

// won't heal script

test.describe('Locator API - CheckBox Action Methods - Tests', () => {

  test('fill form using page.$eval', async ({ page }) => {
    await page.goto('https://example.com/form');

    // Fill input field
    await page.$eval('#username', input => {
      input.value = 'testuser';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    // Check checkbox
    await page.$eval('#agree-terms', checkbox => {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    });

    // Select dropdown option
    await page.$eval('#country', select => {
      select.value = 'US';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });
  
});