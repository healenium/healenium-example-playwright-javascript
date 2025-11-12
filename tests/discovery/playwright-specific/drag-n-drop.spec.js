import { test } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Locator API - Action Methods - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
    // await page.goto('file:///D:/EPM-HLM/repo/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('dragAndDrop action', async ({ page }) => {
    test.slow();

    const draggableElement = page.locator('.drag-container').getByText('Green Item');
    const droppableElement = page.locator('#drop1');
    // const droppableElement = page.locator('[data-testid="testid_drop1"]');

    await draggableElement.dragTo(droppableElement, { timeout: TIMEOUT });

  });

  test('dragAndDrop (page) action', async ({ page }) => {
    test.slow();

    // await page.dragAndDrop('.drag-container .draggable-item:has-text("Green Item")', '#drop1', { timeout: TIMEOUT });
    await page.dragAndDrop('.drag-container .draggable-item:has-text("Green Item")', '[data-testid="testid_drop1"]', { timeout: TIMEOUT });
  });

});