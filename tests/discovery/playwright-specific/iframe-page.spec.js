import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 250;

test.describe('Locator API - iframe - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('iframe - change frame title - healing', async ({ page }) => {
    test.slow();

    const iframeElement = await page.$('iframe[title="Iframe Example"]');
    const iframe = await iframeElement.contentFrame();
    expect(iframe).not.toBeNull();

    // Click Change locators button 
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedIframeElement = await page.$('iframe[title="Iframe Example"]');
    const healedIframe = await healedIframeElement.contentFrame();
    expect(healedIframe).not.toBeNull();
  });

  test('iframe - change input field - healing', async ({ page }) => {
    test.slow();

    const iframeElement = await page.$('iframe[title="Iframe Example"]');
    const iframe = await iframeElement.contentFrame();
    expect(iframe).not.toBeNull();
    const inputField = await iframe.$('#iframe_input');
    expect(inputField).not.toBeNull();
    await inputField.click({ timeout: TIMEOUT });

    // Click iframe Change locators button 
    const iframeSubmitBtn = await iframe.$('#iframe_Submit');
    expect(iframeSubmitBtn).not.toBeNull();
    await iframeSubmitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedInputField = await iframe.$('#iframe_input');
    expect(healedInputField).not.toBeNull();
    await healedInputField.click({ timeout: TIMEOUT });
  });

  test('iframe - change nested frame - healing', async ({ page }) => {
    test.slow();

    const iframeElement = await page.$('iframe[title="Iframe Example"]');
    const iframe = await iframeElement.contentFrame();
    expect(iframe).not.toBeNull();
    const nestedFrameElement = await iframe.$('iframe[title="Nested iframe Example"]');
    const nestedFrame = await nestedFrameElement.contentFrame();
    expect(nestedFrame).not.toBeNull();
    const inputField = await nestedFrame.$('#iframe_2_input');
    expect(inputField).not.toBeNull();
    await inputField.click({ timeout: TIMEOUT });

    // Click iframe Change locators button 
    const iframeSubmitBtn = await iframe.$('#iframe_Submit');
    expect(iframeSubmitBtn).not.toBeNull();
    await iframeSubmitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing nested frame after locator change
    const healedNestedFrameElement = await iframe.$('iframe[title="Iframe Example"]');
    const healedNestedFrame = await healedNestedFrameElement.contentFrame();
    expect(healedNestedFrame).not.toBeNull();

    // Test healing nested frame element after locator change
    const healedInputField = await healedNestedFrame.$('#iframe_2_input');
    expect(healedInputField).not.toBeNull();
    await healedInputField.click({ timeout: TIMEOUT });
  });

  test('iframe - change frame title & input field - healing', async ({ page }) => {
    test.slow();

    const iframeElement = await page.$('iframe[title="Iframe Example"]');
    const iframe = await iframeElement.contentFrame();
    expect(iframe).not.toBeNull();
    const inputField = await iframe.$('#iframe_input');
    expect(inputField).not.toBeNull();
    await inputField.click({ timeout: TIMEOUT });

    // Click iframe Change locators button 
    const iframeSubmitBtn = await iframe.$('#iframe_Submit');
    expect(iframeSubmitBtn).not.toBeNull();
    await iframeSubmitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);
    // Click Change locators button 
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Test healing - same action should work after locator change
    const healedIframeElement = await page.$('iframe[title="Iframe Example"]');
    const healedIframe = await healedIframeElement.contentFrame();
    expect(healedIframe).not.toBeNull();
    const healedInputField = await healedIframe.$('#iframe_input');
    expect(healedInputField).not.toBeNull();
    await healedInputField.click({ timeout: TIMEOUT });
  });

  test('iframe - change frame title - NO healing', async ({ page }) => {
    const iframeElement = await page.$('iframe[title="Iframe Example"]');
    const iframe = await iframeElement.contentFrame();
    expect(iframe).not.toBeNull();

    // Click Change locators button 
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);
    
    // Check element after locator change
    const newIframeElement = await page.$('iframe[title="New frame title"]');
    const newIframe = await newIframeElement.contentFrame();
    expect(newIframe).not.toBeNull();
  });

  test('iframe - change input field - NO healing', async ({ page }) => {
    const iframeElement = await page.$('iframe[title="Iframe Example"]');
    const iframe = await iframeElement.contentFrame();
    expect(iframe).not.toBeNull();
    const inputField = await iframe.$('#iframe_input');
    expect(inputField).not.toBeNull();
    await inputField.click({ timeout: TIMEOUT });

    // Click iframe Change locators button 
    const iframeSubmitBtn = await iframe.$('#iframe_Submit');
    expect(iframeSubmitBtn).not.toBeNull();
    await iframeSubmitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Check element after locator change
    const newInputField = await iframe.$('#iframe_input_changed');
    expect(newInputField).not.toBeNull();
    await newInputField.click({ timeout: TIMEOUT });
  });

  test('iframe - change nested frame - NO healing', async ({ page }) => {
    const iframeElement = await page.$('iframe[title="Iframe Example"]');
    const iframe = await iframeElement.contentFrame();
    expect(iframe).not.toBeNull();
    const nestedFrameElement = await iframe.$('iframe[title="Nested iframe Example"]');
    const nestedFrame = await nestedFrameElement.contentFrame();
    expect(nestedFrame).not.toBeNull();
    const inputField = await nestedFrame.$('#iframe_2_input');
    expect(inputField).not.toBeNull();
    await inputField.click({ timeout: TIMEOUT });

    // Click iframe Change locators button 
    const iframeSubmitBtn = await iframe.$('#iframe_Submit');
    expect(iframeSubmitBtn).not.toBeNull();
    await iframeSubmitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Check nested frame after locator change
    const newNestedFrameElement = await iframe.$('iframe[title="New title for nested frame"]');
    const newNestedFrame = await newNestedFrameElement.contentFrame();
    expect(newNestedFrame).not.toBeNull();

    // Check nested frame element after locator change
    const newInputField = await newNestedFrame.$('#newId_iframe2');
    expect(newInputField).not.toBeNull();
    await newInputField.click({ timeout: TIMEOUT });
  });

  test('iframe - change frame title & input field - NO healing', async ({ page }) => {
    const iframeElement = await page.$('iframe[title="Iframe Example"]');
    const iframe = await iframeElement.contentFrame();
    expect(iframe).not.toBeNull();
    const inputField = await iframe.$('#iframe_input');
    expect(inputField).not.toBeNull();
    await inputField.click({ timeout: TIMEOUT });

    // Click iframe Change locators button 
    const iframeSubmitBtn = await iframe.$('#iframe_Submit');
    expect(iframeSubmitBtn).not.toBeNull();
    await iframeSubmitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);
    // Click Change locators button 
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Check elements after locator change
    const newIframeElement = await page.$('iframe[title="New frame title"]');
    const newIframe = await newIframeElement.contentFrame();
    expect(newIframe).not.toBeNull();
    const newInputField = await newIframe.$('#iframe_input_changed');
    expect(newInputField).not.toBeNull();
    await newInputField.click({ timeout: TIMEOUT });
  });

});
