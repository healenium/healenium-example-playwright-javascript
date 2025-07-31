import { firefox } from 'playwright';
import { expect } from 'playwright/test';

const RemoteFirefox = async () => {
//    const browser = await firefox.connect('ws://localhost:5000/');
    const browser = await firefox.connect('ws://localhost:8080/playwright-proxy');
    const page = await browser.newPage();
    await page.goto('https://example.com');
    await expect(page).toHaveURL(/example/)
    return await page.title()
};

const op = await RemoteFirefox()
console.log(op)