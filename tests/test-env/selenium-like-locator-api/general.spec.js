import { test, expect } from '@playwright/test';

const clickTimeout = 5000;

test.describe('General Locator API Tests', () => {

  test('Button click with FindBy annotation', async ({ page }) => {
    // Navigate to the test page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    page.on('dialog', dialog => dialog.accept());

    const submitAlertBtn = page.locator('#submit_alert');
    expect(await submitAlertBtn.count()).toBeGreaterThan(0);

    await submitAlertBtn.click({ timeout: clickTimeout });
    
    // Click element by change ID (before selector change)
    const changeIdElement = page.locator('#change_id');
    expect(await changeIdElement.count()).toBeGreaterThan(0);
    await changeIdElement.press('Enter');

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    expect(await submitBtn.count()).toBeGreaterThan(0);
    await submitBtn.click({ timeout: clickTimeout });

    // // Click element by change ID (after selector change - should be healed)
    // const healedChangeIdElement = page.locator('#change_id');
    // expect(await healedChangeIdElement.count()).toBeGreaterThan(0);
    // await healedChangeIdElement.press('Enter');
  });

  test.skip('Input fields click with FindBy annotation', async ({ page }) => {
    // Navigate to the test page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    // Test elements before selector change
    const testClassElement = page.locator('input.test_class');
    expect(await testClassElement.count()).toBeGreaterThan(0);
    await testClassElement.press('Enter');

    const testTagElement = page.locator('test_tag#change_element');
    expect(await testTagElement.count()).toBeGreaterThan(0);
    const classAttr = await testTagElement.getAttribute('class');
    console.log('classAttr', classAttr);
    expect(classAttr).toBe('shadow-input1');
    await testTagElement.isVisible();

    const changeNameElement = page.locator('input[name="change_name"]');
    expect(await changeNameElement.count()).toBeGreaterThan(0);
    await changeNameElement.press('Enter');

    const linkElement = page.locator('a:has-text("Change: LinkText, PartialLinkText")');
    expect(await linkElement.count()).toBeGreaterThan(0);
    await linkElement.isVisible();
    const linkClassAttr = await linkElement.getAttribute('class');
    console.log('link classAttr', linkClassAttr);
    expect(linkClassAttr).toBe('input1');

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    expect(await submitBtn.count()).toBeGreaterThan(0);
    await submitBtn.click({ timeout: clickTimeout });

    // Test elements after selector change (should be healed)
    const healedTestClassElement = page.locator('input.test_class');
    expect(await healedTestClassElement.count()).toBeGreaterThan(0);
    await healedTestClassElement.press('Enter');

    const healedTestTagElement = page.locator('test_tag#change_element');
    expect(await healedTestTagElement.count()).toBeGreaterThan(0);
    const healedClassAttr = await healedTestTagElement.getAttribute('class');
    console.log('healedClassAttr', healedClassAttr);
    expect(healedClassAttr).toBe(classAttr);
    await healedTestTagElement.isVisible();

    const healedChangeNameElement = page.locator('input[name="change_name"]');
    expect(await healedChangeNameElement.count()).toBeGreaterThan(0);
    await healedChangeNameElement.press('Enter');

    const healedLinkElement = page.locator('a:has-text("Change: LinkText, PartialLinkText")');
    expect(await healedLinkElement.count()).toBeGreaterThan(0);
    await healedLinkElement.isVisible();
    const healedLinkClassAttr = await healedLinkElement.getAttribute('class');
    console.log('healed link classAttr', healedLinkClassAttr);
    expect(healedLinkClassAttr).toBe(linkClassAttr);
  });

  test.skip('Checkbox verify with FindBy annotation', async ({ page }) => {
    // Navigate to the test page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    // Find checkboxes before selector change
    const checkbox1 = page.locator('input.input1#form_checked1');
    expect(await checkbox1.count()).toBeGreaterThan(0);
    const checkbox2 = page.locator('input.input1#form_checked2');
    expect(await checkbox2.count()).toBeGreaterThan(0);
    const checkbox3 = page.locator('input.input1#form_checked3');
    expect(await checkbox3.count()).toBeGreaterThan(0);

    // Click Submit checkbox button
    const submitCheckboxBtn = page.locator('#Submit_checkbox');
    expect(await submitCheckboxBtn.count()).toBeGreaterThan(0);
    await submitCheckboxBtn.click({ timeout: clickTimeout });

    // Find checkboxes after selector change (should be healed)
    const healedCheckbox1 = page.locator('input.input1#form_checked1');
    expect(await healedCheckbox1.count()).toBeGreaterThan(0);
    const healedCheckbox2 = page.locator('input.input1#form_checked2');
    expect(await healedCheckbox2.count()).toBeGreaterThan(0);
    const healedCheckbox3 = page.locator('input.input1#form_checked3');
    expect(await healedCheckbox3.count()).toBeGreaterThan(0);
  });

  test.skip('Input field enable to disable with FindBy annotation', async ({ page }) => {
    // Navigate to the test page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    // Find element before selector change (should be enabled)
    const enabledElement = page.locator('#change_enabled');
    expect(await enabledElement.count()).toBeGreaterThan(0);
    expect(await enabledElement.isEnabled()).toBe(true);

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    expect(await submitBtn.count()).toBeGreaterThan(0);
    await submitBtn.click({ timeout: clickTimeout });

    // Find element after selector change (should be healed and now disabled)
    const disabledElement = page.locator('#change_enabled');
    expect(await disabledElement.count()).toBeGreaterThan(0);
    expect(await disabledElement.isDisabled()).toBe(true);
  });

  test.skip('Checkbox checked to unchecked with FindBy annotation', async ({ page }) => {
    // Navigate to the test page
    await page.goto('https://elenastepuro.github.io/test_env/index.html');

    // Find checkbox before selector change (should be checked)
    const checkedElement = page.locator('#change_checked');
    expect(await checkedElement.count()).toBeGreaterThan(0);
    expect(await checkedElement.isChecked()).toBe(true);

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    expect(await submitBtn.count()).toBeGreaterThan(0);
    await submitBtn.click({ timeout: clickTimeout });

    // Find checkbox after selector change (should be healed and now unchecked)
    const uncheckedElement = page.locator('#change_checked');
    expect(await uncheckedElement.count()).toBeGreaterThan(0);
    expect(await uncheckedElement.isChecked()).toBe(false);
  });
});
