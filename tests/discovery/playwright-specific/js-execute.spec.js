import { test, expect } from '@playwright/test';

test.describe('Locator API - Action Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {

    await page.goto('https://elenastepuro.github.io/test_env/index.html');
    await page.waitForTimeout(1000);

  });

  test('evaluate action', async ({ page }) => {
    test.slow();

    await page.locator('.test_class').evaluate((el) => {
      el.style.border = '3px solid red';
    });

    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/evaluate-1-save.png', fullPage: true });
  });

  test('evaluateHandle action', async ({ page }) => {
    test.slow();

    // evaluateHandle returns an ElementHandle that can be used for further actions
    const elementHandle = await page.locator('.test_class').evaluateHandle((el) => {
      el.style.border = '3px solid blue';
      el.style.backgroundColor = 'lightyellow';
      return el; // Return the element for further manipulation
    });

    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/evaluateHandle-1-save.png', fullPage: true });

    // Demonstrate that we can use the returned ElementHandle
    await elementHandle.fill('New text value');

    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/evaluateHandle-2-save.png', fullPage: true });
  });  

  test('evaluateAll action', async ({ page }) => {
    test.slow();

    // evaluateAll works on all matching elements (returns an array of results)
    const results = await page.locator('input[type="text"]').evaluateAll((elements) => {
      // elements is an array of all matched DOM elements
      return elements.map((el, index) => {
        el.style.border = `3px solid green`;
        el.style.padding = '10px';
        el.value = `New text value: ${el.tagName} ${index}`;
        return {
          tagName: el.tagName,
          index: index
        };
      });
    });

    // Log the results returned from evaluateAll
    console.log('evaluateAll results:', results);

    expect(Array.isArray(results)).toBeTruthy();
    
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/evaluateAll-1.png', fullPage: true });
  }); 

  // 'evaluate'       can not be healed because under the hood request 'waitForSelector' is internal with timeout 0
  // 'evaluateHandle' can not be healed because under the hood request 'waitForSelector' is internal with timeout 0
  // 'evaluateAll'    won't heal multiple elements

});