import { test, expect } from '@playwright/test';
import fs from 'fs';

const workerId = process.env.TEST_WORKER_INDEX || '0';

const TIMEOUT = 5000;
const TIMEOUT_AFTER = 201;
const ITERATIONS = 20;

test.describe('Locator API - Checkbox Information Methods - Tests', () => {
    test.beforeEach(async ({ page, context  }) => {
        await context.clearCookies();
        await context.clearPermissions();
        await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
    });

    test('Action methods with repeat', async ({ page }) => {
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

        // Helper function to time async operations
        const timeOperation = async (page, operationName, operation) => {
            const startTime = Date.now();
            const result = await operation();
            const endTime = Date.now();
            actionExecutionTimes[operationName].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
            return result;
        };

        const inputField = page.locator('.test_class');
        const checkbox = page.locator('input.input1#form_checked1');
        const linkElement = page.locator('a:has-text("Change: LinkText, PartialLinkText")');

        // Run the test 'iterations' times
        for (let i = 0; i < ITERATIONS; i++) {

            // Input field operations
            await timeOperation(page, 'toBeVisible', () => expect(inputField).toBeVisible());
            await timeOperation(page, 'click', () => inputField.click({ timeout: TIMEOUT }));
            await timeOperation(page, 'dblclick', () => inputField.dblclick({ timeout: TIMEOUT }));
            await timeOperation(page, 'blur', () => inputField.blur({ timeout: TIMEOUT }));
            await timeOperation(page, 'fill', () => inputField.fill('Hello World', { timeout: TIMEOUT }));
            await timeOperation(page, 'clear', () => inputField.clear({ timeout: TIMEOUT }));
            await timeOperation(page, 'pressSequentially', () => inputField.pressSequentially('Sequential typing', {
                delay: 100,
                timeout: TIMEOUT
            }));
            await timeOperation(page, 'press', () => inputField.press('Enter', { timeout: TIMEOUT }));
            await timeOperation(page, 'hover', () => inputField.hover({ timeout: TIMEOUT }));
            await timeOperation(page, 'focus', () => inputField.focus({ timeout: TIMEOUT }));
            await timeOperation(page, 'scrollIntoViewIfNeeded', () => inputField.scrollIntoViewIfNeeded({
                timeout: TIMEOUT,
                strict: true
            }));
            await timeOperation(page, 'selectText', () => inputField.selectText({
                timeout: TIMEOUT,
                strict: true
            }));
            await timeOperation(page, 'textContent', () => inputField.textContent({ timeout: TIMEOUT }));
            await timeOperation(page, 'innerText', () => linkElement.innerText({ timeout: TIMEOUT }));
            await timeOperation(page, 'innerHTML', () => linkElement.innerHTML({ timeout: TIMEOUT }));
            await timeOperation(page, 'inputValue', () => inputField.inputValue({ timeout: TIMEOUT }));
            await timeOperation(page, 'getAttribute', () => inputField.getAttribute('name', { timeout: TIMEOUT }));
            await timeOperation(page, 'boundingBox', () => inputField.boundingBox({ timeout: TIMEOUT }));
            await timeOperation(page, 'isEnabled', () => inputField.isEnabled({ timeout: TIMEOUT }));
            await timeOperation(page, 'isDisabled', () => inputField.isDisabled({ timeout: TIMEOUT }));
            await timeOperation(page, 'isEditable', () => inputField.isEditable({ timeout: TIMEOUT }));

            // Checkbox operations
            await timeOperation(page, 'check', () => checkbox.check({ timeout: TIMEOUT }));
            await timeOperation(page, 'uncheck', () => checkbox.uncheck({ timeout: TIMEOUT }));
            await timeOperation(page, 'setCheckedTrue', () => checkbox.setChecked(true, { timeout: TIMEOUT }));
            await timeOperation(page, 'setCheckedFalse', () => checkbox.setChecked(false, {
                force: true,
                timeout: TIMEOUT
            }));
            await timeOperation(page, 'isChecked', () => checkbox.isChecked({ timeout: TIMEOUT }));

            // Reset for next iteration
            await page.waitForTimeout(205);

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
