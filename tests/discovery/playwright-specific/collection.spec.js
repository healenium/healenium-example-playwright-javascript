import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Element Collection Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://elenastepuro.github.io/test_env/index.html');
    await page.waitForTimeout(500);
  });

  test('all() method', async ({ page }) => {
    const allTextInputs = await page.locator('input[type="text"]').all();

    console.log(`Found ${allTextInputs.length} text inputs`);
    expect(allTextInputs.length).toBeGreaterThan(0);

    for (let i = 0; i < allTextInputs.length; i++) {
      await allTextInputs[i].evaluate((el, index) => {
        el.style.border = `3px solid orange`;
        el.style.margin = '5px';
        el.style.padding = '5px';
        el.value = `New text value: ${el.tagName} ${index}`;
      }, i);
    }

    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/all-method.png', fullPage: true });
  });

  test('first() method', async ({ page }) => {
    const firstCheckbox = page.locator('input[type="checkbox"]').first({ timeout: TIMEOUT });

    firstCheckbox.highlight();

    const id = await firstCheckbox.getAttribute('id');
    console.log(`First checkbox ID: ${id}`);

    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/first-method.png', fullPage: true });
  });

  test('last() method - get last matching element', async ({ page }) => {
    const firstCheckbox = page.locator('input[type="checkbox"]').last();

    firstCheckbox.highlight();

    const id = await firstCheckbox.getAttribute('id');
    console.log(`Last checkbox ID: ${id}`);

    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/last-method.png', fullPage: true });
  });

  test('nth() method - get specific element by index', async ({ page }) => {
    const textInput = page.locator('input[type="text"]').nth(1);

    await textInput.highlight();

    const id = await textInput.getAttribute('id');
    console.log(`Last checkbox ID: ${id}`);

    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/nth-method.png', fullPage: true });
  });

});