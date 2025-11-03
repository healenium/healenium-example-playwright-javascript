import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 250;

test.describe('Locator API - iFrame Action Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });
  /*
    test('Methods to create FrameLocator - locator.contentFrame()', async ({ page }) => {
      
      const iframe = await page.$('iframe[title="Iframe Example"]');
      const iframeContent = await iframe.contentFrame();
      const inputField = iframeContent.locator('#iframe_input');
      await expect(inputField).toBeVisible();
      await inputField.click({ timeout: TIMEOUT });
  
    });
  */
  test('Methods to create FrameLocator - page.frameLocator() - change frame title', async ({ page }) => {
    test.slow();

    const inputField = page.frameLocator('iframe[title="Iframe Example"]').frameLocator('iframe[title="Nested iframe Example"]').locator('#iframe_2_input');
    await expect(inputField).toBeVisible();
    // await inputField.click({ timeout: TIMEOUT });

    // Click iframe Change locators button 
    const iframeSubmitBtn = page.frameLocator('iframe[title="Iframe Example"]').locator('#iframe_Submit');
    expect(iframeSubmitBtn).not.toBeNull();
    await iframeSubmitBtn.click({ timeout: TIMEOUT });
    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click({ timeout: TIMEOUT });

    // Test healing - same action should work after locator change
    const healedInputField = page.frameLocator('iframe[title="Iframe Example"]').frameLocator('iframe[title="Nested iframe Example"]').locator('#iframe_2_input');
    await expect(healedInputField).toBeVisible();

  });

  /*
    test('iframe select option action', async ({ page }) => {
      test.slow();
      
      // Get the iframe element
      const iframe = page.frameLocator('iframe[title="Iframe Example"]');
      
      // Test select element in iframe before selector change
      const selectElement = iframe.locator('#iframe_select_item');
      await selectElement.selectOption({ label: 'iframe Item 1' }, { timeout: TIMEOUT });
      await expect(selectElement).toHaveValue('11');
  
    });
  */
});
