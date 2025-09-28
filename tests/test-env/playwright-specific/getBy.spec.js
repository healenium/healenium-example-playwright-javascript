import { test, expect } from '@playwright/test';
import fs from 'fs';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 250;

test.describe('Locator API - CheckBox Action Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    // await page.goto('https://elenastepuro.github.io/test_env/index.html', { waitUntil: 'load' });
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
    //await page.goto('file:///D:/EPM-HLM/repo/healenium-test-env/index.html', { waitUntil: 'load' });
  });
/*
  test('x', async ({ page }) => {
    test.slow();
    // Link with exact text
    await expect(page.getByRole('link', { name: 'Change: LinkText, PartialLinkText', exact: true })).toBeVisible();
    // "selector": "internal:role=link[name=\"Change: LinkText, PartialLinkText\"s]"

    // Text content
    await expect(page.getByText('All fields locators will be changed after click on button')).toBeVisible();
    // "selector": "internal:text=\"All fields locators will be changed after click on button\"i"

    // Input by placeholder
    await expect(page.getByPlaceholder('Change: Id and TagName')).toBeVisible();
    // "selector": "internal:attr=[placeholder=\"Change: Id and TagName\"i]"

    await expect(page.getByPlaceholder('Change: ClassName')).toBeVisible();
    // "selector": "internal:attr=[placeholder=\"Change: ClassName\"i]"

    await expect(page.getByPlaceholder('Change: TestId')).toBeVisible();
    // "selector": "internal:attr=[placeholder=\"Change: TestId\"i]"

    // Input by label/name (using getByRole for form inputs)
    await expect(page.getByRole('textbox', { name: 'Field1' })).toBeVisible();
    // "selector": "internal:role=textbox[name=\"Field1\"i]"

    await expect(page.getByRole('textbox', { name: 'Field2' })).toBeVisible();
    // "selector": "internal:role=textbox[name=\"Field2\"i]"

    // Button by text
    await expect(page.getByRole('button', { name: 'Generate alert' })).toBeVisible();
    // "selector": "internal:role=button[name=\"Generate alert\"i]"

    await expect(page.getByRole('button', { name: 'Change locators' }).first()).toBeVisible();
    // "selector": "internal:role=button[name=\"Change locators\"i] >> nth=0"

    // Checkbox by state
    await expect(page.getByRole('checkbox', { checked: true }).first()).toBeVisible();
    // "selector": "internal:role=checkbox[checked=true] >> nth=0"

    // File input
    await expect(page.getByLabel('file_upload')).toBeVisible();
    // "selector": "internal:label=\"file_upload\"i"

    // Select dropdown
    await expect(page.getByRole('combobox', { name: 'item' })).toBeVisible();
    // "selector": "internal:role=combobox[name=\"item\"i]"

    // Test ID locator (using data-testid attribute)
    const testIdElement = page.getByTestId('change_testId');
    await expect(testIdElement).toBeVisible();
    // "selector": "internal:attr=[data-testid=\"change_testId\"i]"

    // Iframe
    const iframe = page.frameLocator('iframe[title="Iframe Example"]');
    expect(iframe).not.toBeNull();

    // Drag and drop elements
    await expect(page.locator('#drag1').getByText('Green Item')).toBeVisible();
    await expect(page.locator('#drag2').getByText('Red Item')).toBeVisible();
    await expect(page.locator('#drop1').getByText('Drop Zone')).toBeVisible();

    // Specific ID locators
    await expect(page.locator('#change_id')).toBeVisible();
    await expect(page.locator('#change_className')).toBeVisible();
    await expect(page.locator('#change_enabled')).toBeVisible();
    await expect(page.locator('#change_disabled')).toBeVisible();

    // Form title
    await expect(page.getByRole('heading', { name: 'Healenium Test Fields' })).toBeVisible();
    // "selector": "internal:role=heading[name=\"Healenium Test Fields\"i]"

    // Form subtitle
    await expect(page.getByText('All fields locators will be changed after click on button')).toBeVisible();
    // "selector": "internal:text=\"All fields locators will be changed after click on button\"i"
  });
*/

});
