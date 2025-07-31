import { chromium } from 'playwright';
import { expect } from 'playwright/test';
import fs from 'fs';

(async () => {
  const browser = await chromium.connect('ws://localhost:8080/playwright-proxy');
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://healenium.io/');

  let content = await page.content();
  fs.writeFileSync('page-content/page.html', content, 'utf-8');
  
  // ---------------------
  console.log('(^_^)');

  // 1. Get started link
  const getStartedLink = await page.$('a:has-text("Get started")');
  expect(getStartedLink).not.toBeNull();
  expect(await getStartedLink.isVisible()).toBeTruthy();

  // 2. Learn more text
  const learnMoreElement = await page.$('text="Learn more..."');
  expect(learnMoreElement).not.toBeNull();
  expect(await learnMoreElement.isVisible()).toBeTruthy();

  // 3. Email field (should be hidden)
  const emailField = await page.$('input[type="email"]');
  expect(emailField).not.toBeNull();
  expect(await emailField.isVisible()).toBeFalsy();

  // 4. Name placeholder
  const nameField = await page.$('[placeholder="Name"]');
  expect(nameField).not.toBeNull();
  expect(await nameField.isVisible()).toBeTruthy();

  // 5. Alt text for image
  const iconImage = await page.$('img[alt="website icon"]');
  expect(iconImage).not.toBeNull();
  expect(await iconImage.isVisible()).toBeTruthy();

  // 6. Title attribute
  const discordElement = await page.$('[title="Discord"]');
  expect(discordElement).not.toBeNull();
  expect(await discordElement.isVisible()).toBeTruthy();

  // ---------------------
  console.log('Done');
  await context.close();
  await browser.close();
})();