import { chromium } from 'playwright';
import { expect } from 'playwright/test';

(async () => {
  const browser = await chromium.connect('ws://localhost:8080/playwright-proxy');
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://healenium.io/');

  // toBeAttached
  // console.log('toBeAttached');
  // await expect(page.locator('input[type="email"]')).toBeAttached();

  // toBeChecked
  console.log('toBeChecked');
  await page.evaluate(() => {
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = 'demo-checkbox';
    cb.checked = true;
    document.body.appendChild(cb);
  });
  await expect(page.locator('#demo-checkbox')).toBeChecked();

  // toBeDisabled
  console.log('toBeDisabled');
  await page.evaluate(() => {
    const btn = document.createElement('button');
    btn.disabled = true;
    btn.id = 'disabled-btn';
    document.body.appendChild(btn);
  });
  await expect(page.locator('#disabled-btn')).toBeDisabled();

  // toBeEditable
  console.log('toBeEditable');
  await expect(page.locator('input[type="email"]')).toBeEditable();

  // toBeEmpty
  console.log('toBeEmpty');
  await page.evaluate(() => {
    const div = document.createElement('div');
    div.id = 'empty-div';
    document.body.appendChild(div);
  });
  await expect(page.locator('#empty-div')).toBeEmpty();

  // toBeEnabled
  console.log('toBeEnabled');
  await expect(page.locator('input[type="email"]')).toBeEnabled();

  // toBeFocused
  console.log('toBeFocused');
  await page.locator('input[type="email"]').focus();
  await expect(page.locator('input[type="email"]')).toBeFocused();

  // toBeHidden
  console.log('toBeHidden');
  await page.evaluate(() => {
    const div = document.createElement('div');
    div.id = 'hidden-div';
    div.style.display = 'none';
    document.body.appendChild(div);
  });
  await expect(page.locator('#hidden-div')).toBeHidden();

  // toBeInViewport
  console.log('toBeInViewport');
  await expect(page.locator('input[type="email"]')).toBeInViewport();

  // toBeVisible
  console.log('toBeVisible');
  await expect(page.locator('input[type="email"]')).toBeVisible();

  // toContainText
  console.log('toContainText');
  await expect(page.locator('label[for="input_1495810354468"]')).toContainText('Your Email');

  // toContainClass
  console.log('toContainClass');
  await page.evaluate(() => {
    const div = document.createElement('div');
    div.className = 'foo bar';
    div.id = 'class-div';
    document.body.appendChild(div);
  });
  await expect(page.locator('#class-div')).toContainClass('foo');

  // toHaveAccessibleDescription
  console.log('toHaveAccessibleDescription');
  await page.evaluate(() => {
    const input = document.createElement('input');
    input.setAttribute('aria-describedby', 'desc');
    input.id = 'desc-input';
    document.body.appendChild(input);
    const desc = document.createElement('div');
    desc.id = 'desc';
    desc.textContent = 'Description here';
    document.body.appendChild(desc);
  });
  await expect(page.locator('#desc-input')).toHaveAccessibleDescription('Description here');

  // toHaveAccessibleErrorMessage
  console.log('toHaveAccessibleErrorMessage');
  await page.evaluate(() => {
    const input = document.createElement('input');
    input.setAttribute('aria-errormessage', 'err');
    input.id = 'err-input';
    document.body.appendChild(input);
    const err = document.createElement('div');
    err.id = 'err';
    err.textContent = 'Error here';
    document.body.appendChild(err);
  });
  await expect(page.locator('#err-input')).toHaveAccessibleErrorMessage('Error here');

  // toHaveAccessibleName
  console.log('toHaveAccessibleName');
  await expect(page.locator('label[for="input_1495810354468"]')).toHaveAccessibleName('Your Email');

  // toHaveAttribute
  console.log('toHaveAttribute');
  await expect(page.locator('input[type="email"]')).toHaveAttribute('type', 'email');

  // toHaveClass
  console.log('toHaveClass');
  await expect(page.locator('label[for="input_1495810354468"]')).toHaveClass(/t-input-title/);

  // toHaveCount
  console.log('toHaveCount');
  await expect(page.locator('input')).toHaveCount(1);

  // toHaveCSS
  console.log('toHaveCSS');
  await expect(page.locator('input[type="email"]')).toHaveCSS('color', 'rgb(0, 0, 0)');

  // toHaveId
  console.log('toHaveId');
  await expect(page.locator('input[type="email"]')).toHaveId('input_1495810354468');

  // toHaveJSProperty
  console.log('toHaveJSProperty');
  await expect(page.locator('input[type="email"]')).toHaveJSProperty('type', 'email');

  // toHaveRole
  console.log('toHaveRole');
  await page.evaluate(() => {
    const btn = document.createElement('button');
    btn.setAttribute('role', 'button');
    btn.id = 'role-btn';
    document.body.appendChild(btn);
  });
  await expect(page.locator('#role-btn')).toHaveRole('button');

  // toHaveText
  console.log('toHaveText');
  await expect(page.locator('label[for="input_1495810354468"]')).toHaveText('Your Email');

  // toHaveTitle
  console.log('toHaveTitle');
  await expect(page).toHaveTitle(/.*/);

  // toHaveURL
  console.log('toHaveURL');
  await expect(page).toHaveURL(/page%20-%20Copy\.html/);

  // toHaveValue
  console.log('toHaveValue');
  await expect(page.locator('input[type="email"]')).toHaveValue('');

  // toHaveValues
  console.log('toHaveValues');
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
  await expect(page.locator('#multi-select')).toHaveValues(['a', 'c']);

  // toHaveScreenshot
  console.log('toHaveScreenshot');
  await expect(page.locator('input[type="email"]')).toHaveScreenshot();

  // toMatchAriaSnapshot
  console.log('toMatchAriaSnapshot');
  await expect(page.locator('input[type="email"]')).toMatchAriaSnapshot();

  // toMatchSnapshot
  console.log('toMatchSnapshot');
  await expect(page.locator('input[type="email"]')).toMatchSnapshot();

  // toPass
  console.log('toPass');
  await expect(page.locator('input[type="email"]')).toPass(async (input) => {
    return input.value === '';
  });

  console.log('Done');
  await context.close();
  await browser.close();
})(); 