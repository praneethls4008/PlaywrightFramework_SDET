import {chromium, test} from "@playwright/test"
test('5. mobile testing', async()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext({isMobile: true});
    const page = await context.newPage();

    
    await page.goto('https://google.com');
    await page.getByRole('searchbox').fill('ice cream');
    await page.getByRole('searchbox').click()


    await page.close();
    await context.close();
    await browser.close();


});