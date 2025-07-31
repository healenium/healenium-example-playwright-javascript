import { chromium } from 'playwright';
import { expect } from 'playwright/test';
import fs from 'fs';

/*
 "role=link[name=\"Get started\"s]"
  i	insensitive	Case-insensitive attribute/text
  s	sensitive	Case-sensitive attribute/text
*/

(async () => {
  const browser = await chromium.connect('ws://localhost:8080/playwright-proxy');
  //const browser = await chromium.connect('ws://localhost:5000/');
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('https://healenium.io/');

  let content = await page.content();
  fs.writeFileSync('page-content/page.html', content, 'utf-8');

  // ---------------------
  console.log('page.locator(..).toBeVisible(..)');

  const selectors = [
    // By role and text
    'role=link[name="Get started"s]',
    // "selector":"role=link[name=\"Get started\"s]"

    // By CSS class
    'a.tn-atom',
    // "selector":"a.tn-atom"

    // By text
    'text=Ask support',
    // "selector":"text=Ask support"

    // Using the parent div + CSS selector
    '#nav816068316 a.t-btn.t-btn_md',
    // "selector":"#nav816068316 a.t-btn.t-btn_md"

    // Using exact text match at parent div + css
    '#nav816068316 a.t-btn:has-text("Get started")',
    // "selector":"#nav816068316 a.t-btn:has-text(\"Get started\")"

    // Using the parent div + href attribute to selector
    '#nav816068316 a[href="https://github.com/healenium/healenium"]',
    // "selector":"#nav816068316 a.t-btn.t-btn_md[href=\"https://github.com/healenium/healenium\"]"

    // Using the parent div + CSS attributes
    '#nav816068316 a.t-btn.t-btn_md[style*="color:#000000"][style*="border:2px solid #0056d3"]',
    // "selector":"#nav816068316 a.t-btn.t-btn_md[style*=\"color:#000000\"][style*=\"border:2px solid #0056d3\"]"

    // Using XPath for exact match
    '//a[contains(@class, "t-btn") and contains(@class, "t-btn_md") and normalize-space(text())="Get started"]',
    // "selector":"//a[contains(@class, \"t-btn\") and contains(@class, \"t-btn_md\") and normalize-space(text())=\"Get started\"]"
    '//*[@id="nav816068316"]//a[contains(@class, "t-btn") and contains(text(), "Get")]',
    // "selector":"//*[@id=\"nav816068316\"]//a[contains(@class, \"t-btn\") and contains(text(), \"Get\")]"

    // Alternative XPath using contains for partial text match
    '//a[contains(@class, "t-btn") and contains(@class, "t-btn_md") and contains(text(), "Get started")]',
    // "selector":"//a[contains(@class, \"t-btn\") and contains(@class, \"t-btn_md\") and contains(text(), \"Get started\")]"
    '//*[@id="nav816068316"]//a[contains(@class, "t-btn") and contains(text(), "Get")]',
    // "selector":"//*[@id=\"nav816068316\"]//a[contains(@class, \"t-btn\") and contains(text(), \"Get\")]"

    // Using parent div + data attribute
    '#nav816068316 a[data-buttonfieldset="button"]:has-text("Get started")',
    // "selector":"#nav816068316 a[data-buttonfieldset=\"button\"]:has-text(\"Get started\")"

    // Chaining from parent with css
    '#rec639241701 >> a.tn-atom',
    // "selector":"#rec639241701 >> a.tn-atom"
  ];

  for (const selector of selectors) {
    await expect(page.locator(selector)).toBeVisible();
  }

  // Text Locator
  await expect(page.locator('text=Get started')).toHaveCount(3);

  // ---------------------
  console.log('Done');
  await context.close();
  await browser.close();
})();