import { chromium } from 'playwright';
import { expect } from 'playwright/test';

(async () => {

  const browser = await chromium.connect('ws://localhost:8080/playwright-proxy');
  //const browser = await chromium.connect('ws://localhost:5000/');
  const context = await browser.newContext();

  // const context = await browser.newContext({
  //   recordVideo: {
  //     dir: 'videos/',
  //     size: { width: 640, height: 480 },
  //   }
  // });

  const page = await context.newPage();
  await page.goto('https://healenium.io/');

  const askSupportButton = page.getByRole('button', { name: 'Ask support' });
  await expect(askSupportButton).toBeVisible();
  //await expect(askSupportButton).toBeVisible({ timeout: 15000 });
  await askSupportButton.click();
  await page.waitForTimeout(100);
  await page.screenshot({ path: 'screenshots/ask_support.png' });
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(100);
  await page.screenshot({ path: 'screenshots/ask_support_error.png', fullPage: true });
  // ---------------------
  await context.close();
  await browser.close();
})();