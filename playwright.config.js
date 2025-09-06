// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. (undefined)*/
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    // Standard line reporter for test progress
    ['line'],

    // HTML reporter for detailed reports
    ['html', { outputFolder: 'playwright-report' }],

  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Connect to Playwright server */
    connectOptions: {
      // wsEndpoint: process.env.PLAYWRIGHT_SERVER_URL || 'ws://localhost:5000',
      wsEndpoint: process.env.PLAYWRIGHT_SERVER_URL || 'ws://localhost:8080/playwright-proxy',
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Override connectOptions for this project
        connectOptions: {
          // wsEndpoint: process.env.PLAYWRIGHT_SERVER_URL || 'ws://localhost:5000',
          wsEndpoint: process.env.PLAYWRIGHT_SERVER_URL || 'ws://localhost:8080/playwright-proxy',
        },
      },
    },
  ],
});