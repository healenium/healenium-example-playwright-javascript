import { chromium } from 'playwright';
import { expect } from 'playwright/test';
import fs from 'fs';

  /*
   internal:text="Contacts" — Finds elements whose full text content (including nested) is exactly "Contacts".
   internal:has-text="Get started" — Finds elements that have "Get started" in any text node inside them 
   (a substring match anywhere in the descendants).
  */
   
(async () => {
  const browser = await chromium.connect('ws://localhost:8080/playwright-proxy');
  // const browser = await chromium.connect('ws://localhost:5000/');
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('https://healenium.io/');

  let content = await page.content();
  fs.writeFileSync('page-content/page.html', content, 'utf-8');

  // ---------------------
  console.log('Advanced Locators');

  // Using nth element selector at CSS selector
  await expect(page.locator('a.t-btn.t-btn_md').first()).toBeVisible();
  // "selector": "a.t-btn.t-btn_md >> nth=0"

  // Using index element selector at CSS selector
  await expect(page.locator('a.t-btn.t-btn_md').nth(0)).toBeVisible();
  // "selector": "a.t-btn.t-btn_md >> nth=0"

  // Using parent div + css + filter() to narrow down
  await expect(page.locator('#nav816068316 a.t-btn.t-btn_md')
    .filter({ hasText: 'Get started' })).toBeVisible();
  // "selector": "#nav816068316 a.t-btn.t-btn_md >> internal:has-text=\"Get started\"i"  

  // Using FrameLocator inside main frame
  const mainFrame = page.mainFrame();
  await expect(mainFrame.locator('#nav816068316 a.t-btn.t-btn_md')
    .filter({ hasText: 'Get started' })).toBeVisible();
  // actially frame guid is in the any request
  // "guid": "frame@c17bc1e227124e95b67b1a75fec5eb10",
  // "selector": "#nav816068316 a.t-btn.t-btn_md >> internal:has-text=\"Get started\"i"  

  await expect(page.locator('#rec639241715').getByText('Contacts')).toBeVisible();
  // "selector":"#rec639241715 >> internal:text=\"Contacts\"i"

  await expect(page.frameLocator('#youtube-iframe-639241701-1634159005179')
    .locator('button.ytp-large-play-button')).toBeVisible();
  //"selector": "#youtube-iframe-639241701-1634159005179 >> internal:control=enter-frame >> button.ytp-large-play-button"

  // Either name or url must be specified.
  // const frame = page.frame('frame-name');

  // Chaining Locators
  // Get the YouTube social icon by chaining selectors
  const youtubeIcon = page.locator('.t-sociallinks__wrapper').locator('.t-sociallinks__item_youtube');
  await expect(youtubeIcon).toBeVisible();
  // "selector":".t-sociallinks__wrapper >> .t-sociallinks__item_youtube"

  // Filtering Locators
  // Get only inputs without hidden text
  const visibleInputs = page.locator('input').filter({ hasText: '' }).filter({ hasNotText: 'hidden' });
  await expect(visibleInputs).toHaveCount(10);
  // "selector":"input >> internal:has-not-text=\"hidden\"i"

  // Text Locator
  await expect(page.locator('text=Get started').last()).toBeVisible();
  // "selector":"text=Get started >> nth=-1"

  // Class Name // div class="t858__inner-col"
  await expect(page.locator('.t858__inner-col').last()).toBeVisible();
  // "selector":".t858__inner-col >> nth=-1"

  // Attribute Value
  // Find element with specific data attribute
  await expect(page.locator('[data-animationappear="off"]').first()).toBeHidden();
  // "selector":"[data-animationappear=\"off\"] >> nth=0"

  // Partial Attribute Value
  // Find elements where ID starts with 'rec'
  await expect(page.locator('[id^="rec"]')).toHaveCount(20);
  // "selector":"[id^=\"rec\"]"

  // Attribute Contains
  // Find elements where ID contains 'rec'
  await expect(page.locator('[id*="rec"]')).toHaveCount(21);
  //"selector":"[id*=\"rec\"]"

  // Multiple Attributes
  // Find submit button with specific attributes
  await expect(page.locator('button[type="submit"][style*="background-color:#0056d3"]')).toHaveCount(2);
  //"selector":"button[type=\"submit\"][style*=\"background-color:#0056d3\"]"

  // ---------------------
  console.log('Done');
  await context.close();
  await browser.close();
})();