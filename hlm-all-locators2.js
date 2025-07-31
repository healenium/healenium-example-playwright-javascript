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
  console.log('(^_^)');

  await expect(page.getByRole('link', { name: 'Get started', exact: true })).toBeVisible();
  // "selector": "internal:role=link[name=\"Get started\"s]"

  await expect(page.getByText('Learn more...')).toBeVisible();
  // "selector": "internal:text=\"Learn more...\"i"

  await expect(page.getByLabel('Your Email')).toBeHidden();
  // "selector": "internal:label=\"Your Email\"i"

  await expect(page.getByPlaceholder('Name')).toBeVisible();
  // "selector": "internal:attr=[placeholder=\"Name\"i]"

  await expect(page.getByAltText('website icon')).toBeVisible();
  // "selector": "internal:attr=[alt=\"website icon\"i]"
  
  await expect(page.getByTitle('Discord')).toBeVisible();
  // "selector": "internal:attr=[title=\"Discord\"i]"

  // If elements had data-testid attributes (they don't in this page)
  // const testElement = page.getByTestId('some-test-id');

  // ---------------------
  console.log('Done');
  await context.close();
  await browser.close();
})();