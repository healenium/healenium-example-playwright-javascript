import { chromium } from 'playwright';
import { expect } from 'playwright/test';

(async () => {
  const browser = await chromium.connect('ws://localhost:8080/playwright-proxy');
  //const browser = await chromium.connect('ws://localhost:5000/');
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('https://healenium.io/');

  // ---------------------

  // By role
  const btn1 = page.locator('role=button[name="Ask XXX support"]')
  await expect(btn1).toBeVisible();
  const btn2 = page.getByRole('button', { name: 'Ask XXX support' });
  await expect(btn2).toBeVisible();
  await btn1.click();
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Close dialog window' }).click();
  await page.waitForTimeout(500);
  await btn2.click();

  // ---------------------
  console.log('Done');
  await context.close();
  await browser.close();
})();