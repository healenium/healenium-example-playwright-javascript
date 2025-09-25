import { test, expect } from '@playwright/test';
import fs from 'fs';

const TIMEOUT = 3000;
const ITERATIONS = 3;

test.describe('Page.$ API - Checkbox Information Methods - Tests', () => {
    test.beforeEach(async ({ page }) => {
        // await page.goto('https://elenastepuro.github.io/test_env/index.html');
        await page.goto('https://healenium.github.io/healenium-test-env/index.html');
        // await page.goto('file:///D:/EPM-HLM/repo/healenium-test-env/index.html');
        await page.waitForTimeout(100);
    });

    test('Action methods with repeat using page.$', async ({ page }, testInfo) => {
        //test.slow();
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
            const result = await inputField.isVisible();
            const endTime = Date.now();
            actionExecutionTimes['toBeVisible'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performClick = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.click();
            const endTime = Date.now();
            actionExecutionTimes['click'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performDblclick = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.dblclick();
            const endTime = Date.now();
            actionExecutionTimes['dblclick'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performBlur = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.evaluate(el => el.blur());
            const endTime = Date.now();
            actionExecutionTimes['blur'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performFill = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.fill('Hello World');
            const endTime = Date.now();
            actionExecutionTimes['fill'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performClear = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.fill('');
            const endTime = Date.now();
            actionExecutionTimes['clear'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performPressSequentially = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.type('Sequential typing', { delay: 100 });
            const endTime = Date.now();
            actionExecutionTimes['pressSequentially'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performPress = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.press('Enter');
            const endTime = Date.now();
            actionExecutionTimes['press'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performHover = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.hover();
            const endTime = Date.now();
            actionExecutionTimes['hover'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performFocus = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.evaluate(el => el.focus());
            const endTime = Date.now();
            actionExecutionTimes['focus'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performScrollIntoViewIfNeeded = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.scrollIntoViewIfNeeded();
            const endTime = Date.now();
            actionExecutionTimes['scrollIntoViewIfNeeded'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performSelectText = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.evaluate(el => { el.select(); });
            const endTime = Date.now();
            actionExecutionTimes['selectText'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performTextContent = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.textContent();
            const endTime = Date.now();
            actionExecutionTimes['textContent'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performInnerText = async () => {
            const startTime = Date.now();
            const linkElement = await page.$('a:has-text("Change: LinkText, PartialLinkText")');
            await linkElement.innerText();
            const endTime = Date.now();
            actionExecutionTimes['innerText'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performInnerHTML = async () => {
            const startTime = Date.now();
            const linkElement = await page.$('a:has-text("Change: LinkText, PartialLinkText")');
            await linkElement.innerHTML();
            const endTime = Date.now();
            actionExecutionTimes['innerHTML'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performInputValue = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.inputValue();
            const endTime = Date.now();
            actionExecutionTimes['inputValue'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performGetAttribute = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.getAttribute('name');
            const endTime = Date.now();
            actionExecutionTimes['getAttribute'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performBoundingBox = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.boundingBox();
            const endTime = Date.now();
            actionExecutionTimes['boundingBox'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performIsEnabled = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.isEnabled();
            const endTime = Date.now();
            actionExecutionTimes['isEnabled'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performIsDisabled = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.evaluate(el => el.disabled);
            const endTime = Date.now();
            actionExecutionTimes['isDisabled'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performIsEditable = async () => {
            const startTime = Date.now();
            const inputField = await page.$('.test_class');
            await inputField.evaluate(el => !el.readOnly && !el.disabled);
            const endTime = Date.now();
            actionExecutionTimes['isEditable'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performCheck = async () => {
            const startTime = Date.now();
            const checkbox = await page.$('input.input1#form_checked1');
            await checkbox.check();
            const endTime = Date.now();
            actionExecutionTimes['check'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performUncheck = async () => {
            const startTime = Date.now();
            const checkbox = await page.$('input.input1#form_checked1');
            await checkbox.uncheck();
            const endTime = Date.now();
            actionExecutionTimes['uncheck'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performSetCheckedTrue = async () => {
            const startTime = Date.now();
            const checkbox = await page.$('input.input1#form_checked1');
            await checkbox.setChecked(true);
            const endTime = Date.now();
            actionExecutionTimes['setCheckedTrue'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performSetCheckedFalse = async () => {
            const startTime = Date.now();
            const checkbox = await page.$('input.input1#form_checked1');
            await checkbox.setChecked(false);
            const endTime = Date.now();
            actionExecutionTimes['setCheckedFalse'].push(endTime - startTime);
            await page.waitForTimeout(101);
        };

        const performIsChecked = async () => {
            const startTime = Date.now();
            const checkbox = await page.$('input.input1#form_checked1');
            await checkbox.isChecked();
            const endTime = Date.now();
            actionExecutionTimes['isChecked'].push(endTime - startTime);
            await page.waitForTimeout(101);
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
        console.log(`actionName \tAvg ms \tMin ms\t Max ms`);
        for (const [actionName, stats] of Object.entries(actionStats)) {
            console.log(`${actionName} tt ${stats.average} tt ${stats.min} tt ${stats.max}`);
        }

        // Save results to file
        const report = await buildPerformanceReport(testInfo, actionStats, actionExecutionTimes);

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = testInfo.outputPath(`performance-report-page-dollar-${timestamp}.json`);
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
npx playwright test tests/performance/built-in-repeat-page-dollar.spec.js

# Run with specific timeout (for longer tests)
npx playwright test tests/performance/built-in-repeat-page-dollar.spec.js --timeout=9000000

# Run in headed mode to see the browser
npx playwright test tests/performance/built-in-repeat-page-dollar.spec.js --headed
*/
