import { test } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Locator API - CheckBox Action Methods - Tests', () => {

  test('interact with iframe using frame.$eval', async ({ page }) => {
    await page.goto('https://example.com/with-iframe');
    
    // Get the iframe
    const iframe = page.frame({ url: /embedded-form/ });
    
    if (iframe) {
      // Fill form inside iframe
      await iframe.$eval('#iframe-username', input => {
        input.value = 'iframe_user';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });
      
      // Get text from iframe
      const iframeTitle = await iframe.$eval('h1', element => element.textContent);
      console.log('Iframe title:', iframeTitle);
    }
  });
  
});