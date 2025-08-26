import { test, expect } from '@playwright/test';

const clickTimeout = 5000;

test.describe('Parent-Child Locator Tests', () => {

  test('Select and verify several inputs CSS FirstChild', async ({ page }) => {
    // Navigate to the test environment page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    // Find element by CSS first-child pseudo-selector before selector change
    const firstChildElement = await page.$('test_tag:first-child');
    expect(firstChildElement).not.toBeNull();
    expect(await firstChildElement.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click({ timeout: clickTimeout });

    // Find element by CSS first-child pseudo-selector after selector change (should be healed)
    const healedFirstChildElement = await page.$('test_tag:first-child');
    expect(healedFirstChildElement).not.toBeNull();
    expect(await healedFirstChildElement.isVisible()).toBe(true);
  });

  test('Select and verify several inputs CSS LastChild', async ({ page }) => {
    // Navigate to the test environment page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    // Find element by CSS last-child pseudo-selector before selector change
    const lastChildElement = await page.$('child_tag:last-child');
    expect(lastChildElement).not.toBeNull();
    expect(await lastChildElement.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    expect(submitBtn).not.toBeNull();
    await submitBtn.click({ timeout: clickTimeout });

    // Find element by CSS last-child pseudo-selector after selector change (should be healed)
    const healedLastChildElement = await page.$('child_tag:last-child');
    expect(healedLastChildElement).not.toBeNull();
    expect(await healedLastChildElement.isVisible()).toBe(true);
  });
});
