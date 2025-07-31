import { chromium } from 'playwright';
import { getNodePath } from './hlm-nodePath.js';
import { expect } from 'playwright/test';

(async () => {
  // const browser = await chromium.launch();
  // const page = await browser.newPage();

  const browser = await chromium.connect('ws://localhost:8080/playwright-proxy');
  //const browser = await chromium.connect('ws://localhost:5000/');
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://elenastepuro.github.io/test_env/index.html');
//  await page.goto('https://healenium.io/');

  // await getNodePath(page, page.locator('text=Ask support'));
  // await getNodePath(page, 'a:has-text("Ask support")');

  //const nodePath = await getNodePath(page, page.locator('text=Get started')); // !!!! multiple elements!!!
//  const nodePath = await getNodePath(page, "#change_id"); 
  // const nodePath = await getNodePath(page, page.locator("#change_id")); 
  // console.log(nodePath);
  
  const element = await page.$('#change_id');
  expect(element).not.toBeNull();

  // // If you want to parse the JSON string:
  // const parsedResult = JSON.parse(nodePath);
  // console.log(parsedResult);

  console.log('Done');
  await browser.close();
})();