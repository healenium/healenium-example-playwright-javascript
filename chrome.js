import { chromium } from 'playwright';
import { expect } from 'playwright/test';

const RemoteChrome = async () => {
    // const browser = await chromium.launch({
    //   headless: false
    // });
//    const browser = await chromium.connect('ws://localhost:5000/');
    const browser = await chromium.connect('ws://localhost:8080/playwright-proxy');
    const page = await browser.newPage();

    await page.goto('https://www.amazon.com')
    await expect(page).toHaveURL(/amazon/)
    return await page.title()
};

const op = await RemoteChrome()
console.log(op)