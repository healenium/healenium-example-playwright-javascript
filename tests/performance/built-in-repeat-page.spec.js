import { test, expect } from '@playwright/test';
import fs from 'fs';

const workerId = process.env.TEST_WORKER_INDEX || '0';

const TIMEOUT = 5000;
const TIMEOUT_AFTER = 201;
const ITERATIONS = 20;

test.describe('Page.$ API - Checkbox Information Methods - Tests', () => {
    test.beforeEach(async ({ page, context }) => {
        await context.clearCookies();
        await context.clearPermissions();
        await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
    });


    test('Action methods with repeat using page.$', async ({ page }) => {
        test.slow();
        test.setTimeout(10000_000);

        // Initialize execution time arrays for each action
        const actionExecutionTimes = {
            toBeVisible: [],
            click: [],
            dblclick: [],
            blur: [],
            fill: [],
            clear: [],
            pressSequentially: [],
            press: [],
            hover: [],
            focus: [],
            scrollIntoViewIfNeeded: [],
            selectText: [],
            textContent: [],
            innerText: [],
            innerHTML: [],
            inputValue: [],
            getAttribute: [],
            boundingBox: [],
            isEnabled: [],
            isDisabled: [],
            isEditable: [],
            check: [],
            uncheck: [],
            setCheckedTrue: [],
            setCheckedFalse: [],
            isChecked: []
        };

        // Individual operation functions
        const performToBeVisible = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            const result = await inputField.isVisible({ timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['toBeVisible'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performClick = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.click({ timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['click'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performDblclick = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.dblclick({ timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['dblclick'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performBlur = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.evaluate(el => el.blur());
            const endTime = Date.now();
            actionExecutionTimes['blur'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performFill = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.fill('Hello World', { timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['fill'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performClear = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.fill('', { timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['clear'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performPressSequentially = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.type('Sequential typing', { delay: 100, timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['pressSequentially'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performPress = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.press('Enter', { timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['press'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performHover = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.hover({ timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['hover'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performFocus = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.evaluate(el => el.focus());
            const endTime = Date.now();
            actionExecutionTimes['focus'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performScrollIntoViewIfNeeded = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.scrollIntoViewIfNeeded({ timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['scrollIntoViewIfNeeded'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performSelectText = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.selectText({ timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['selectText'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performTextContent = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.textContent({ timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['textContent'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performInnerText = async () => {
            const startTime = Date.now();
            const linkElement = await page.$('a:has-text("Change: LinkText, PartialLinkText")');
            await linkElement.innerText({ timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['innerText'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performInnerHTML = async () => {
            const startTime = Date.now();
            const linkElement = await page.$('a:has-text("Change: LinkText, PartialLinkText")');
            await linkElement.innerHTML({ timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['innerHTML'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performInputValue = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.inputValue({ timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['inputValue'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performGetAttribute = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.getAttribute('name', { timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['getAttribute'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performBoundingBox = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.boundingBox({ timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['boundingBox'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performIsEnabled = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.isEnabled({ timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['isEnabled'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performIsDisabled = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.evaluate(el => el.disabled);
            const endTime = Date.now();
            actionExecutionTimes['isDisabled'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performIsEditable = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.evaluate(el => !el.readOnly && !el.disabled);
            const endTime = Date.now();
            actionExecutionTimes['isEditable'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performCheck = async () => {
            const startTime = Date.now();
            const checkbox = await page.$('input.input1#form_checked1');
            await checkbox.check({ timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['check'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performUncheck = async () => {
            const startTime = Date.now();
            const checkbox = await page.$('input.input1#form_checked1');
            await checkbox.uncheck({ timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['uncheck'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performSetCheckedTrue = async () => {
            const startTime = Date.now();
            const checkbox = await page.$('input.input1#form_checked1');
            await checkbox.setChecked(true, { timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['setCheckedTrue'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performSetCheckedFalse = async () => {
            const startTime = Date.now();
            const checkbox = await page.$('input.input1#form_checked1');
            await checkbox.setChecked(false, { timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['setCheckedFalse'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        const performIsChecked = async () => {
            const startTime = Date.now();
            const checkbox = await page.$('input.input1#form_checked1');
            await checkbox.isChecked({ timeout: TIMEOUT });
            const endTime = Date.now();
            actionExecutionTimes['isChecked'].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
        };

        // Run the test 'iterations' times
        for (let i = 0; i < ITERATIONS; i++) {
            // Input field operations
            await performToBeVisible();
            await performClick();
            await performDblclick();
            await performBlur();
            await performFill();
            await performClear();
            await performPressSequentially();
            await performPress();
            await performHover();
            await performFocus();
            await performScrollIntoViewIfNeeded();
            await performSelectText();
            await performTextContent();
            await performInnerText();
            await performInnerHTML();
            await performInputValue();
            await performGetAttribute();
            await performBoundingBox();
            await performIsEnabled();
            await performIsDisabled();
            await performIsEditable();

            // Checkbox operations
            await performCheck();
            await performUncheck();
            await performSetCheckedTrue();
            await performSetCheckedFalse();
            await performIsChecked();

            // Reset for next iteration
            await page.waitForTimeout(105);

            // Log progress
            if ((i + 1) % 5 === 0) {
                console.log(`run-${workerId} Completed ${i + 1}/${ITERATIONS} iterations`);
            }
        }

        // Save results to file
        fs.writeFileSync(`performance-reports/run-${workerId}.json`, JSON.stringify(actionExecutionTimes, null, 2), 'utf-8');
        console.log(`run-${workerId} done`);
    });

});

