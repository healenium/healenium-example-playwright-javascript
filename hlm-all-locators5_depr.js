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
  console.log('(~_~)');

  // -------- Deprecated Methods ----------
  // Old way - not recommended
  const oldWayLogo = await page.$('.t228__imglogo');
  expect(oldWayLogo).toBeTruthy(); // Checks the element was found
  // Get attribute
  const src = await oldWayLogo.getAttribute('src');
  expect(src).toContain('Healenium_logo');
  // Get property
  const className = await oldWayLogo.getProperty('className');
  expect(className.toString()).toContain('t228__imglogo');

  // Old way to get multiple elements
  const oldWayCards = await page.$$('.t858__inner-col');

  expect(oldWayCards.length).toBe(6); // Verify exact count
  expect(oldWayCards.length).toBeGreaterThan(0); // At least one exists
  for (const card of oldWayCards) {
    expect(await card.isVisible()).toBeTruthy();
  }

  const expectedTitles = [
    "Adopts test to UI changes",
    "Improves E2E tests stability",
    "Updates test code base",
    "Supports advanced features",
    "Visualize controls state",
    "Test on mobile"
  ];

  for (let i = 0; i < oldWayCards.length; i++) {
    const title = await oldWayCards[i].$eval('.t-card__title', el => el.textContent.trim());
    expect(title).toContain(expectedTitles[i]);
  }

  // Verify all cards have white background
  for (const card of oldWayCards) {
    const bgColor = await card.evaluate(el => window.getComputedStyle(el).backgroundColor);
    expect(bgColor).toBe('rgb(255, 255, 255)');
  }

  // Check each card has reasonable dimensions
  for (const card of oldWayCards) {
    const box = await card.boundingBox();
    expect(box.width).toBeGreaterThan(200);
    expect(box.height).toBeGreaterThan(100);
  }

  // Verify all cards have the expected class
  for (const card of oldWayCards) {
    const className = await card.getAttribute('class');
    expect(className).toContain('t858__inner-col');
  }

  // Click on elements within each card (if applicable)
  // for (const card of oldWayCards) {
  //   const button = await card.$('button');
  //   if (button) {
  //     await button.click();
  //     // Add assertions for what happens after click
  //   }
  // }

  //Find cards containing specific text
  const mobileTestingCard = oldWayCards.find(async card => {
    const text = await card.textContent();
    return text.includes('mobile');
  });
  expect(mobileTestingCard).toBeTruthy();

  // ---------------------
  console.log('Done');
  await context.close();
  await browser.close();
})();