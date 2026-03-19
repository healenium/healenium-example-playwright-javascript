
import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Locator API - Chained Locators (healing) - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('simple chain - form then getByPlaceholder', async ({ page }) => {
    test.slow();

    const input = page.locator('input#validate_testId');
    await input.fill('chained', { timeout: TIMEOUT });
    //await expect(input).toHaveValue('chained');

    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    const healedInput = page.locator('input#validate_testId');
    await healedInput.fill('chained healed', { timeout: TIMEOUT });
    await expect(healedInput).toHaveValue('chained healed');
  });


  test('simple chain - form then getByRole textbox', async ({ page }) => {
    test.slow();

    const input = page.locator('input#change_className');
    await input.fill('role and label', { timeout: TIMEOUT });
    await expect(input).toHaveValue('role and label');

    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    const healedInput = page.locator('input#change_className');
    await healedInput.fill('role and label after heal', { timeout: TIMEOUT });
    await expect(healedInput).toHaveValue('role and label after heal');
  });

  test('chain with and - getByPlaceholder and getByTitle', async ({ page }) => {
    test.slow();

    const input = page.locator('input#validate_testId');
    await input.fill('and chain', { timeout: TIMEOUT });
    await expect(input).toHaveValue('and chain');

    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    const healedInput = page.locator('input#validate_testId');
    await healedInput.fill('and chain healed', { timeout: TIMEOUT });
    await expect(healedInput).toHaveValue('and chain healed');
  });

  test('chain with filter - drag container then hasText', async ({ page }) => {
    test.slow();

    const greenItem = page.locator('div.drag-container');
    await expect(greenItem).toBeVisible({ timeout: TIMEOUT });
    await expect(greenItem).toHaveCount(1);

    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    const healedGreenItem = page.locator('div.drag-container');
    await expect(healedGreenItem).toBeVisible({ timeout: TIMEOUT });
    await expect(healedGreenItem).toHaveCount(1);
  });

  test('chain with or - getByTestId or getByPlaceholder', async ({ page }) => {
    test.slow();

    const input = page.locator('input#validate_testId');
    await input.fill('or chain', { timeout: TIMEOUT });
    await expect(input).toHaveValue('or chain');

    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    const healedInput = page.locator('input#validate_testId');
    await healedInput.fill('or chain healed', { timeout: TIMEOUT });
    await expect(healedInput).toHaveValue('or chain healed');
  });

  test('chain with or - getByTitle or getByTestId', async ({ page }) => {
    test.slow();

    const input = page.locator('input#validate_testId');
    await expect(input).toBeVisible({ timeout: TIMEOUT });
    await input.fill('or title testid', { timeout: TIMEOUT });

    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    const healedInput = page.locator('input#validate_testId');
    await expect(healedInput).toHaveValue('or title testid', { timeout: TIMEOUT });
  });

  test('chain with first - child_tag then first', async ({ page }) => {
    test.slow();
    const element = page.locator('input#change_element');
    await expect(element).toBeVisible();

    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    const healedElement = page.locator('input#change_element');
    await expect(healedElement).toBeVisible();
  });

  test('chain with last - child_tag then last', async ({ page }) => {
    test.slow();
    const element = page.locator('input#change_element_last_child');
    await expect(element).toBeVisible();

    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    const healedElement = page.locator('input#change_element_last_child');
    await expect(healedElement).toBeVisible();
  });
  
});
