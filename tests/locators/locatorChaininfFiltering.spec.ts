import {test, expect} from "@playwright/test"
test('3. Locators Chaining and filtering', async({page})=>{
    await page.goto("https://www.discover.com/credit-cards/?ICMPGN=ACQ_HNAV_ALL_HDR_CREDIT_CARDS");

    const container1 = page.locator('.dfsCardWrapper').filter({has: page.locator('.dfscontainer')});
    expect(await container1.isVisible()).toBe(true);

    const container2 = page.locator('.dfscontainer').filter({hasText: 'Student Cash Back Credit Card'}).first();
    expect(await container2.isVisible()).toBe(true);

    const container3 = page.locator('.dfscontainer').filter({hasNotText: 'Student Cash Back Credit Card'}).first();
    expect(await container3.isVisible()).toBe(true);

    const container4 = container1.locator('.dfscontainer').first();
    expect(await container4.textContent()).toContain('Unlimited Cashback Match');

});