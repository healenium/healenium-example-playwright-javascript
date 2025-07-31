import { chromium } from 'playwright';
import { expect } from 'playwright/test';
import fs from 'fs';

(async () => {
  // const browser = await chromium.launch({
  //   headless: false
  // });

  // const browserServer = await chromium.launchServer({ headless: false });
  // console.log(`Browser server started at: ${browserServer.wsEndpoint()}`);
  // const browser = await chromium.connect({ wsEndpoint: browserServer.wsEndpoint() });

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

  //const askSupportButton = page.getByRole('button', { name: 'Ask support' });
  const askSupportButton = page.getByRole('button', { name: 'Ask XXX support' });
  await expect(askSupportButton).toBeVisible();
  //await expect(askSupportButton).toBeVisible({ timeout: 15000 });
  await askSupportButton.click();
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Close dialog window' }).click();
  await page.waitForTimeout(500);
  
  // Use class selector for container 
  const container = page.locator('.t853__containerXXX');
  // await expect(page.locator('.t853__container')).toBeVisible();
  await expect(container).toBeVisible();

  // ---------------------
  await context.close();
  await browser.close();
})();