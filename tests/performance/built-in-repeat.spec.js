import { test, expect } from '@playwright/test';
import fs from 'fs';

const TIMEOUT = 3000;
const TIMEOUT_AFTER = 501;
const ITERATIONS = 40;

test.describe('Locator API - Checkbox Information Methods - Tests', () => {
    test.beforeEach(async ({ page }) => {
        // await page.goto('https://elenastepuro.github.io/test_env/index.html');
        await page.goto('https://healenium.github.io/healenium-test-env/index.html');
        // await page.goto('file:///D:/EPM-HLM/repo/healenium-test-env/index.html');
        await page.waitForTimeout(100);
    });

    test('Action methods with repeat', async ({ page }, testInfo) => {
        //test.slow();
        test.setTimeout(10000_000);
        const inputField = page.locator('.test_class');
        const checkbox = page.locator('input.input1#form_checked1');
        const linkElement = page.locator('a:has-text("Change: LinkText, PartialLinkText")');

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
        const timeOperation = async (operationName, operation) => {
            const startTime = Date.now();
            const result = await operation();
            const endTime = Date.now();
            actionExecutionTimes[operationName].push(endTime - startTime);
            await page.waitForTimeout(TIMEOUT_AFTER);
            return result;
        };

        // Run the test 'iterations' times
        for (let i = 0; i < ITERATIONS; i++) {
            // Input field operations
            await timeOperation('toBeVisible', () => expect(inputField).toBeVisible());
            await timeOperation('click', () => inputField.click({ timeout: TIMEOUT }));
            await timeOperation('dblclick', () => inputField.dblclick({ timeout: TIMEOUT }));
            await timeOperation('blur', () => inputField.blur({ timeout: TIMEOUT }));
            await timeOperation('fill', () => inputField.fill('Hello World', { timeout: TIMEOUT }));
            await timeOperation('clear', () => inputField.clear({ timeout: TIMEOUT }));
            await timeOperation('pressSequentially', () => inputField.pressSequentially('Sequential typing', {
                delay: 100,
                timeout: TIMEOUT
            }));
            await timeOperation('press', () => inputField.press('Enter', { timeout: TIMEOUT }));
            await timeOperation('hover', () => inputField.hover({ timeout: TIMEOUT }));
            await timeOperation('focus', () => inputField.focus({ timeout: TIMEOUT }));
            await timeOperation('scrollIntoViewIfNeeded', () => inputField.scrollIntoViewIfNeeded({
                timeout: TIMEOUT,
                strict: true
            }));
            await timeOperation('selectText', () => inputField.selectText({
                timeout: TIMEOUT,
                strict: true
            }));
            await timeOperation('textContent', () => inputField.textContent({ timeout: TIMEOUT }));
            await timeOperation('innerText', () => linkElement.innerText({ timeout: TIMEOUT }));
            await timeOperation('innerHTML', () => linkElement.innerHTML({ timeout: TIMEOUT }));
            await timeOperation('inputValue', () => inputField.inputValue({ timeout: TIMEOUT }));
            await timeOperation('getAttribute', () => inputField.getAttribute('name', { timeout: TIMEOUT }));
            await timeOperation('boundingBox', () => inputField.boundingBox({ timeout: TIMEOUT }));
            await timeOperation('isEnabled', () => inputField.isEnabled({ timeout: TIMEOUT }));
            await timeOperation('isDisabled', () => inputField.isDisabled({ timeout: TIMEOUT }));
            await timeOperation('isEditable', () => inputField.isEditable({ timeout: TIMEOUT }));

            // Checkbox operations
            await timeOperation('check', () => checkbox.check({ timeout: TIMEOUT }));
            await timeOperation('uncheck', () => checkbox.uncheck({ timeout: TIMEOUT }));
            await timeOperation('setCheckedTrue', () => checkbox.setChecked(true, { timeout: TIMEOUT }));
            await timeOperation('setCheckedFalse', () => checkbox.setChecked(false, {
                force: true,
                timeout: TIMEOUT
            }));
            await timeOperation('isChecked', () => checkbox.isChecked({ timeout: TIMEOUT }));

            // Reset for next iteration
            await page.waitForTimeout(105);

            // Log progress
            if ((i + 1) % 5 === 0) {
                console.log(`Completed ${i + 1}/${ITERATIONS} iterations`);
            }
        }

        // Calculate statistics for each action
        const actionStats = {};
        for (const [actionName, times] of Object.entries(actionExecutionTimes)) {
            const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
            const minTime = Math.min(...times);
            const maxTime = Math.max(...times);

            actionStats[actionName] = {
                average: avgTime.toFixed(2),
                min: minTime,
                max: maxTime,
                total: times.reduce((a, b) => a + b, 0),
                allTimes: times
            };
        }

        // Display results
        console.log('\n=== PERFORMANCE RESULTS BY ACTION ===');
        console.log(`Iterations: ${ITERATIONS}`);
        console.log(`actionName tt Avg ms tt Min ms tt Max ms`);
        for (const [actionName, stats] of Object.entries(actionStats)) {
            console.log(`${actionName} tt ${stats.average} tt ${stats.min} tt ${stats.max}`);
        }

        // Save results to file
        const report = await buildPerformanceReport(testInfo, actionStats, actionExecutionTimes);

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = testInfo.outputPath(`performance-report-${timestamp}.json`);
        fs.writeFileSync(filename, JSON.stringify(report, null, 2));
        console.log(`\nPerformance report saved to: ${filename}`);

        // attach to report
        attachTestResults(testInfo, actionStats, actionExecutionTimes);
    });


    async function buildPerformanceReport(testInfo, actionStats, actionExecutionTimes) {

        return {
            testName: testInfo.title,
            timestamp: new Date().toISOString(),
            iterations: ITERATIONS,
            actionStatistics: actionStats,
            detailedExecutionTimes: actionExecutionTimes
        };

    }

    async function attachTestResults(testInfo, actionStats, actionExecutionTimes) {
        await testInfo.attach('performance-stats', {
            body: JSON.stringify({
                iterations: ITERATIONS,
                actionStatistics: actionStats,
                detailedExecutionTimes: actionExecutionTimes
            }, null, 2),
            contentType: 'application/json'
        });
    }
});

/*
# Run the test
npx playwright test tests/performance/built-in-repeat.spec.js

# Run with specific timeout (for longer tests)
npx playwright test tests/performance/built-in-repeat.spec.js --timeout=9000000

# Run in headed mode to see the browser
npx playwright test tests/performance/built-in-repeat.spec.js --headed
*/