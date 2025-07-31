import { chromium } from 'playwright';
import { expect } from 'playwright/test';
import fs from 'fs';

(async () => {
  const browser = await chromium.connect('ws://localhost:8080/playwright-proxy');
  //const browser = await chromium.connect('ws://localhost:5000/');
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('https://healenium.io/');

  let content = await page.content();
  fs.writeFileSync('page-content/page.html', content, 'utf-8');

  // ---------------------

  console.log('Modern API vs Deprecated API');

  // Array of locator selectors
  const logoSelectors = [
    '.t228__imglogo',
    '//img[contains(@src, "Healenium_logo_sign_")]',
    'img[src*="Healenium_logo_sign_"]',
    '.t228__leftcontainer >> img',
    '.t228__imgwrapper >> img',
    '#nav816068316 img.t228__imglogo',
    '[class*="imglogo"]',
    'img.t228__imglogo[src^="https://static.tildacdn.biz"]',
    '.t228__leftcontainer img:nth-child(1)',
    'div:has(> a > img.t228__imglogo)',
  ];

  // Modern API examples 
  for (const selector of logoSelectors) {
    let logo = page.locator(selector);
    await expect(logo).toBeVisible();
  }

  // Deprecated API examples
  for (const selector of logoSelectors) {
    let oldWayLogo = await page.$(selector);
    expect(oldWayLogo).toBeTruthy();
    expect(await oldWayLogo.isVisible()).toBeTruthy();
  }

  // ---------------------
  console.log('Done');
  await context.close();
  await browser.close();
})();