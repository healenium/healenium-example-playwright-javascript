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
  console.log('Advanced Locators (Deprecated API)');

  // Using first element selector
  const firstBtn = await page.$('a.t-btn.t-btn_md');
  expect(firstBtn).not.toBeNull();
  expect(await firstBtn.isVisible()).toBeTruthy();

  // Using index element selector
  const btns = await page.$$('a.t-btn.t-btn_md');
  expect(btns.length).toBeGreaterThan(0);
  expect(await btns[0].isVisible()).toBeTruthy();

  // Using parent div + css + text filtering
  const navBtns = await page.$$('#nav816068316 a.t-btn.t-btn_md');
  const getStartedBtn = navBtns.find(async btn => {
    const text = await btn.textContent();
    return text.includes('Get started');
  });
  expect(getStartedBtn).not.toBeUndefined();
  expect(await getStartedBtn.isVisible()).toBeTruthy();

  // Using main frame
  const mainFrame = page.mainFrame();
  const frameBtns = await mainFrame.$$('#nav816068316 a.t-btn.t-btn_md');
  const frameGetStartedBtn = frameBtns.find(async btn => {
    const text = await btn.textContent();
    return text.includes('Get started');
  });
  expect(frameGetStartedBtn).not.toBeUndefined();
  expect(await frameGetStartedBtn.isVisible()).toBeTruthy();

  // Contacts section
  const contactsSection = await page.$('#rec639241715');
  const contactsText = await contactsSection.textContent();
  expect(contactsText).toContain('Contacts');
  expect(await contactsSection.isVisible()).toBeTruthy();

  // YouTube iframe button (requires frame handling)
  // const youtubeFrame = await page.$('#youtube-iframe-639241701-1634159005179');
  // const youtubeFrameContent = await youtubeFrame.contentFrame();
  // const playButton = await youtubeFrameContent.$('button.ytp-large-play-button');
  // expect(playButton).not.toBeNull();
  // expect(await playButton.isVisible()).toBeTruthy();

  // YouTube social icon
  const socialWrapper = await page.$('.t-sociallinks__wrapper');
  const youtubeIcon = await socialWrapper.$('.t-sociallinks__item_youtube');
  expect(youtubeIcon).not.toBeNull();
  expect(await youtubeIcon.isVisible()).toBeTruthy();

  // Get only inputs without hidden text
  const allInputs = await page.$$('input');
  const filteredInputs = [];
  for (const input of allInputs) {
    const value = await input.getAttribute('value') || '';
    const text = await input.textContent();

    if ((text === '' || value === '') &&
      !text.includes('hidden') &&
      !value.includes('hidden')) {
      filteredInputs.push(input);
    }
  }
  expect(filteredInputs.length).toBe(10);


  // Last "Get started" text
  const allGetStarted = await page.$$('text=Get started');
  expect(allGetStarted.length).toBeGreaterThan(0);
  const lastGetStarted = allGetStarted[allGetStarted.length - 1];
  expect(await lastGetStarted.isVisible()).toBeTruthy();

  // Last inner-col
  const innerCols = await page.$$('.t858__inner-col');
  expect(innerCols.length).toBeGreaterThan(0);
  const lastInnerCol = innerCols[innerCols.length - 1];
  expect(await lastInnerCol.isVisible()).toBeTruthy();

  // Hidden animation element
  const animationElements = await page.$$('[data-animationappear="off"]');
  expect(animationElements.length).toBeGreaterThan(0);
  expect(await animationElements[0].isVisible()).toBeFalsy();

  // Elements with ID starting with 'rec'
  const recElements = await page.$$('[id^="rec"]');
  expect(recElements.length).toBe(20);

  // Elements with ID containing 'rec'
  const allRecElements = await page.$$('[id*="rec"]');
  expect(allRecElements.length).toBe(21);

  // Submit buttons with specific attributes
  const submitBtns = await page.$$('button[type="submit"][style*="background-color:#0056d3"]');
  expect(submitBtns.length).toBe(2);

  // ---------------------
  console.log('Done');
  await context.close();
  await browser.close();
})();