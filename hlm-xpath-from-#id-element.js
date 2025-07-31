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
  fs.writeFileSync('page-content/page_#nav816068316.html', content, 'utf-8');

  const getStartedLink = page.locator('#nav816068316');

  await expect(getStartedLink).toContainText('Get started');
  
  const xpath = await getStartedLink.evaluate(el => {
    // Simple function to get XPath for an element
    function getXPath(element) {
      if (element.id !== '') return 'id("' + element.id + '")';
      if (element === document.body) return element.tagName;
  
      let ix = 0;
      const siblings = element.parentNode.childNodes;
      for (let i = 0; i < siblings.length; i++) {
        const sibling = siblings[i];
        if (sibling === element)
          return getXPath(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
          ix++;
      }
      return '';
    }
    return getXPath(el);
  });
  console.log(xpath);

  // ---------------------
  await context.close();
  await browser.close();
})();