import { chromium } from 'playwright';
import { expect } from 'playwright/test';
import fs from 'fs';

(async () => {
  //const browser = await chromium.connect('ws://localhost:8080/playwright-proxy');
  const browser = await chromium.connect('ws://localhost:5000/');
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('https://healenium.io/');

  let content = await page.content();
  fs.writeFileSync('page_content/page.html', content, 'utf-8');

  await expect(page.locator('#nav816068316')).toContainText('Get started');
  await expect(page.getByRole('link', { name: 'Discord' })).toBeVisible();

  const askSupportButton = page.getByRole('button', { name: 'Ask support' });
  await expect(askSupportButton).toBeVisible();
  await expect(page.locator('#rec639241701')).toContainText('Ask support');


  await askSupportButton.click();
  await page.waitForTimeout(500);
  await expect(page.getByRole('textbox', { name: 'Your Email' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Your Name' })).toBeVisible();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(100);
  await expect(page.locator('#error_1495810354468')).toBeVisible();
  await expect(page.locator('#error_1495810359387')).toBeVisible();
  await expect(page.locator('#form639241698 div').filter({ hasText: 'Your Email Required field Your Name Required field Message Required field' }).getByLabel('Form fill-in errors')).toBeVisible();
  await expect(page.getByLabel('Ask a question about Healenium').getByRole('link')).toContainText('Please fill out all required fields');
  await expect(page.getByRole('textbox', { name: 'Your Email' })).toBeEmpty();

  content = await page.content();
  fs.writeFileSync('page_content/page_support.html', content, 'utf-8');

  await page.getByRole('button', { name: 'Close dialog window' }).click();
  await page.waitForTimeout(500);
  
  await expect(page.getByRole('link', { name: 'Get started now' })).toBeVisible();

  // ---------------------
  await context.close();
  await browser.close();
})();