import { test, expect } from '@playwright/test';

test.describe('Locator API - CheckBox Action Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
    // await page.goto('file:///D:/EPM-HLM/repo/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('getByRole', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Change: LinkText, PartialLinkText', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Generate alert' })).toBeVisible();
    await expect(page.getByRole('checkbox', { checked: true }).first()).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Field with hover' })).toBeVisible();
//    await expect(page.getByRole('textbox', { name: 'Field with data-testid' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'Healenium Logo' })).toBeVisible();
    // await expect(page.getByRole('textbox', { name: 'change_tag_aria_label' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Field labeled by' })).toBeVisible();
   });

  test('getByText', async ({ page }) => {
    await expect(page.getByText('All fields locators will be changed after click on button')).toBeVisible();
    await expect(page.locator('#drag1').getByText('Green Item')).toBeVisible();
    // await expect(page.locator('#drag2').getByText('Red Item')).toBeVisible();
    // await expect(page.locator('#drop1').getByText('Drop Zone')).toBeVisible();
  });

  test('getByLabel', async ({ page }) => {
    await expect(page.getByLabel('Field with hover')).toBeVisible();
    // await expect(page.getByLabel('Field with data-testid')).toBeVisible();
  });

  test('getByPlaceholder', async ({ page }) => {
    // await expect(page.getByPlaceholder('Change: Id and TagName')).toBeVisible();
    // await expect(page.getByPlaceholder('Change: ClassName')).toBeVisible();
    await expect(page.getByPlaceholder('Change: TestId')).toBeVisible();
  });

  test('getByAltText', async ({ page }) => {
    await expect(page.getByAltText('Healenium Logo')).toBeVisible();
  });

  test('getByTitle', async ({ page }) => {
    await expect(page.getByTitle('Healenium logo icon')).toBeVisible();
    // await expect(page.getByTitle('Validate change id and tag name')).toBeVisible();
    // await expect(page.getByTitle('Validate change class name')).toBeVisible();
    // await expect(page.getByTitle('Validate change test id')).toBeVisible();
    // await expect(page.getByTitle('Validate change tag')).toBeVisible();
    // await expect(page.getByTitle('Validate textarea to disabled')).toBeVisible();
  });

  test('getByTestId', async ({ page }) => {
    await expect(page.getByTestId('change_testId')).toBeVisible();
  });

});
