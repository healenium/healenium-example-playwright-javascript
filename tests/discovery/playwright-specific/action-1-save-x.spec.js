import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Locator API - Action Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {

    // await page.goto('https://elenastepuro.github.io/test_env/index.html', { waitUntil: 'load' });
    // await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
    await page.goto('file:///D:/EPM-HLM/repo/healenium-test-env/index.html', { waitUntil: 'load' });
    await page.waitForTimeout(1000);

  });

  test('all', async ({ page }) => {
    test.slow();
    let content = await page.content();
    fs.writeFileSync('page-content/page-test-env.html', content, 'utf-8');

    const inputField = page.locator('.test_class');
    await inputField.click();


    const inputField2 = page.locator('input#change_id');
    await inputField2.dblclick();

    await inputField2.blur();

    await inputField.fill('Hello World');
    await expect(inputField).toHaveValue('Hello World');

    await inputField.clear();
    await expect(inputField).toHaveValue('');

    await inputField.type('Typing text slowly');

    await inputField.pressSequentially('Sequential typing');

    await inputField2.fill('Test text');
    await inputField2.press('Enter');

    await inputField2.hover();

    await inputField.focus();
    await expect(inputField).toBeFocused();
    await inputField.blur();
    await expect(inputField).not.toBeFocused();

    await inputField.scrollIntoViewIfNeeded();
    await expect(inputField).toBeVisible();

    await inputField.fill('Text to select');
    await inputField.selectText();
    await expect(inputField).toBeFocused();

    const selectElement = page.locator('#select_item');
    await selectElement.selectOption({ label: 'Item 1' });
    await selectElement.selectOption([{ value: '2' }, { value: '3' }]);

    const filePath = path.join(__dirname, '../../../test-data/test-file.txt');

    const inputFile = page.locator('#file_input');
    await inputFile.setInputFiles(filePath);

    const value = await inputFile.inputValue();
    console.log('Input value:', value);
  });


});