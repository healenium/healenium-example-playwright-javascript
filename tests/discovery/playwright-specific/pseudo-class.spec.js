import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Locator Pseudo-class - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html');
    await page.waitForTimeout(500);
  });

  test('all', async ({ page }) => {
    await page.locator('input:visible').first().click({ timeout: TIMEOUT });
    //button:visible >> nth=0
    await page.locator(':has-text( "Generate alert") >> nth=0').click({ timeout: TIMEOUT });
    //:has-text("Generate alert") >> nth=0
    await page.locator('div:has(input[type="checkbox"])').first().click({ timeout: TIMEOUT });
    //div:has(input[type="checkbox"]) >> nth=0
    await page.locator(':is(input, textarea)').first().click({ timeout: TIMEOUT });
    //:is(input, textarea) >> nth=0
    await page.locator('input:nth-match(input, 1)').click({ timeout: TIMEOUT });
    //input:nth-match(input, 1)

    // need to create a horizontal(?) layout to test this
    // await page.locator('.shadow-input1:left-of(#change_id)').click({ timeout: TIMEOUT });
    // await page.locator('.shadow-input1:right-of(#change_className)').click({ timeout: TIMEOUT });

    await page.locator('input:above(#change_id)').click({ timeout: TIMEOUT });
    //button:above(#change_id)
    await page.locator('input:below(#submit_alert)').first().click({ timeout: TIMEOUT });
    //input:below(#submit_alert) >> nth=0
    await page.locator('input:near(#change_id)').first().click({ timeout: TIMEOUT });
    //input:near(#change_id) >> nth=0
    await page.locator('input:not([disabled])').first().click({ timeout: TIMEOUT });
    //input:not([disabled]) >> nth=0
    await page.locator('input').nth(2).click({ timeout: TIMEOUT });
    //input >> nth=2
    await page.locator('input:checked').first().click({ timeout: TIMEOUT });
    //input:checked >> nth=0
    await page.locator('xpath=//button[@id="submit_alert"]').click({ timeout: TIMEOUT });
    //xpath=//button[@id="submit_alert"]
    await page.locator('#main_form >> input').first().click({ timeout: TIMEOUT });
    //#main_form >> input >> nth=0
    await page.locator('text=Generate alert').click({ timeout: TIMEOUT });
    //text=Generate alert
    await page.locator('css=.test_class').click({ timeout: TIMEOUT });
    //css=.test_class
    await page.locator('id=change_className').click({ timeout: TIMEOUT });
    //id=change_className
    await page.locator('data-testid=change_testId').click({ timeout: TIMEOUT });
    //data-testid=change_testId
    await page.locator('role=link').first().hover({ timeout: TIMEOUT });
    //role=link >> nth=0
  });

});