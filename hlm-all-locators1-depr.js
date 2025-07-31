import { chromium } from 'playwright';
import { expect } from 'playwright/test';
import fs from 'fs';

/*
page.$(selector) returns the first matching element in the DOM (document order).

expect(locator).toBeVisible() checks that All matching elements are visible (if multiple exist)

The element is:
- Not hidden with display: none or visibility: hidden
- Has non-zero size
- Not obscured by other elements
- Not detached from DOM

*/

(async () => {
  const browser = await chromium.connect('ws://localhost:8080/playwright-proxy');
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://healenium.io/');

  let content = await page.content();
  fs.writeFileSync('page-content/page.html', content, 'utf-8');

  // ---------------------
  console.log('page.$(..) and page.$$(..)');

  const selectors = [
    // Using role and text !!!
    // 'role=link[name="Get started"s]',
    'a[role="button"]:has-text("Ask support")',
    // "selector":"a[role=\"button\"]:has-text(\"Ask support\")"

    // By CSS class
    'a.tn-atom',
    //"selector":"a.tn-atom"
    
    // By text !!!
    //'text=Ask support',
    'a:has-text("Ask support")',
    '//a[text()="Ask support"]',

    // Using the parent div + CSS selector
    '#nav816068316 a.t-btn.t-btn_md',
    '#rec639241701 a.tn-atom',

    // Using exact text match at parent div + css !!! see 'Using XPath for exact match'
    //'#nav816068316 a.t-btn:has-text("Get started")',

    // Using the parent div + href attribute to selector
    '#nav816068316 a[href="https://github.com/healenium/healenium"]',

    // Using href attribute -- see at the top !!!
    'a[href="https://github.com/healenium/healenium"]',

    // Using the parent div + CSS attributes
    '#nav816068316 a.t-btn.t-btn_md[style*="color:#000000"][style*="border:2px solid #0056d3"]',

    // Using XPath for exact match
    '//a[contains(@class, "t-btn") and contains(@class, "t-btn_md") and normalize-space(text())="Get started"]',
    '//*[@id="nav816068316"]//a[contains(@class, "t-btn") and normalize-space()="Get started"]',

    // Alternative XPath using contains for partial text match
    '//a[contains(@class, "t-btn") and contains(@class, "t-btn_md") and contains(text(), "Get started")]',
    '//*[@id="nav816068316"]//a[contains(@class, "t-btn") and contains(text(), "Get")]',

    // Using parent div + data attribute
    '#nav816068316 a[data-buttonfieldset="button"]:has-text("Get started")',

    // Chaining from parent with css the same as 
    // 'Using the parent div + CSS selector'
    // '#rec639241701 a.tn-atom'
  ];

  for (const selector of selectors) {
    //console.log('selector', selector);
    const element = await page.$(selector);
    expect(element).not.toBeNull();
    expect(await element.isVisible()).toBeTruthy();
  }

  // Text Locator alternative - count all "Get started" links
  const elements = await page.$$('a:has-text("Get started")');
  expect(elements.length).toBeGreaterThan(0);

  // ---------------------
  console.log('Done');
  await context.close();
  await browser.close();
})();