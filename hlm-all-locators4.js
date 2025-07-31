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
  fs.writeFileSync('page-content/page.html', content, 'utf-8');

  // ---------------------
  console.log('Locator other matchers');

  // 1. toBeAttached
  await expect(page.getByPlaceholder('mail@example_X.com')).toBeAttached();

  // 2. toBeChecked
  // Checkbox example (dynamically added for demonstration)
  await page.evaluate(() => {
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = 'demo-checkbox';
    cb.checked = true;
    document.body.appendChild(cb);
  });
  await expect(page.locator('#demo-checkbox_X')).toBeChecked();

  // 3. toBeDisabled
  // Disabled button example (dynamically added)
  await page.evaluate(() => {
    const btn = document.createElement('button');
    btn.disabled = true;
    btn.id = 'disabled-btn';
    document.body.appendChild(btn);
  });
  await expect(page.locator('#disabled-btn_X')).toBeDisabled();

  // 4. toBeEditable
  await expect(page.locator('[placeholder="mail@example_X.com"]')).toBeEditable();

  // 5. toBeEmpty
  // Empty div example (dynamically added)
  await page.evaluate(() => {
    const div = document.createElement('div');
    div.id = 'empty-div';
    document.body.appendChild(div);
  });
  await expect(page.locator('#empty-div_X')).toBeEmpty();

  // 6. toBeEnabled
  await expect(page.locator('[placeholder="mail@example_X.com"]')).toBeEnabled();

  // 7. toBeFocused
  await page.locator('input[type="email"]#input_1493283059688_X').focus();
  await expect(page.locator('input[type="email"]#input_1493283059688_X')).toBeFocused();

  // 8. toBeHidden
  // Hidden div example (dynamically added)
  await page.evaluate(() => {
    const div = document.createElement('div');
    div.id = 'hidden-div';
    div.style.display = 'none';
    document.body.appendChild(div);
  });
  await expect(page.locator('#hidden-div_X')).toBeHidden();

  // 9. toBeInViewport
  await expect(page.locator('input[type="email"]#input_1493283059688_X')).toBeInViewport();
 
  // 10. toBeVisible
  await expect(page.locator('input[type="email"]#input_1493283059688_X')).toBeVisible();

  // <label for="input_1495810354468" id="field-title_1495810354468" class="t-input-title t-descr t-descr_md">Your Email</label>
  // <input type="email" autocomplete="email" name="Email" id="input_1495810354468" value="" placeholder="required">
  // 11. toContainText
  await expect(page.locator('label[for="input_1495810354468_X"]')).toContainText('Your Email');

  // 12. toContainClass
  await expect(page.locator('label[for="input_1495810354468_X"]')).toContainClass('t-input-title');

  // 13. toHaveAccessibleDescription
  await page.getByRole('button', { name: 'Ask support' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(100);
  
  await expect(page.locator('textarea[name="Message"]#input_1597070620968_X')).toHaveAccessibleDescription('Required field');
  
  await page.getByRole('button', { name: 'Close dialog window' }).click();
  await page.waitForTimeout(500);  

 
  // 14. toHaveAccessibleErrorMessage
  // No element with aria-errormessage present in the page
  // await expect(page.locator('[aria-errormessage]')).toHaveAccessibleErrorMessage('...'); // Not applicable

  // 15. toHaveAccessibleName
  // await expect(page.locator('label[for="input_1495810354468"]')).toHaveAccessibleName('Your Email');

  // 16. toHaveAttribute
  await expect(page.locator('input[type="email"]#input_1493283059688_X')).toHaveAttribute('type', 'email');

  // 17. toHaveClass
  await expect(page.locator('label[for="input_1495810354468_X"]')).toHaveClass(/t-input-title/);

  // 18. toHaveCount
  await expect(page.locator('input[type="email_X"]')).toHaveCount(2);

  // 19. toHaveCSS
  await expect(page.locator('#input_1495810354468_x')).toHaveCSS('color', 'rgb(0, 0, 0)');

  // 20. toHaveId
  await expect(page.locator('input[type="email"]#input_1493283059688_X')).toHaveId('input_1493283059688');

  // 21. toHaveJSProperty
  await expect(page.locator('input[type="email"]#input_1493283059688_X')).toHaveJSProperty('type', 'email');

  // 22. toHaveRole
  await expect(page.locator('role=link[name="Get started_X"s]')).toHaveRole('link'); 

  // 23. toHaveText
  await expect(page.locator('label[for="input_1495810354468_X"]')).toHaveText('Your Email');

  // 24. toHaveTitle
  await expect(page).toHaveTitle(/Healenium/);

  // 25. toHaveURL
  await expect(page).toHaveURL('https://healenium.io/');

  // 26. toHaveValue
  await expect(page.locator('#input_1495810354468_X')).toHaveValue('');

  // 27. toHaveValues
  // Multi-select example (dynamically added)
  await page.evaluate(() => {
    const select = document.createElement('select');
    select.multiple = true;
    select.id = 'multi-select';
    ['a', 'b', 'c'].forEach(val => {
      const opt = document.createElement('option');
      opt.value = val;
      opt.selected = val !== 'b';
      select.appendChild(opt);
    });
    document.body.appendChild(select);
  });
  await expect(page.locator('#multi-select_X')).toHaveValues(['a', 'c']);

  // // The following require Playwright snapshot infrastructure
  // // 28. toHaveScreenshot
  // await expect(page.locator('input[type="email"]#input_1493283059688')).toHaveScreenshot();

  // // 29. toMatchAriaSnapshot
  // await expect(page.locator('#input_1495810354468')).toMatchAriaSnapshot();

  // // 30. toMatchSnapshot
  // //await expect(page.locator('input[type="email"]').first()).toMatchSnapshot();

  // 31. toPass
  await expect(async () => {
    await expect(page.locator('role=link[name="Get started"s]')).toBeVisible();
  }).toPass();
  
  // ---------------------
  console.log('Done');
  await context.close();
  await browser.close();
})();