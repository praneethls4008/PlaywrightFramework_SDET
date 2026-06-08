import {test} from "@playwright/test"

test('1. browser commands', async({page})=>{
    await page.goto("https://www.discover.com/credit-cards/?ICMPGN=ACQ_HNAV_ALL_HDR_CREDIT_CARDS");
    const btn = await page.getByRole('button', {name:'apply'}).first();
    await btn.click({delay: 100});
    page.close();
})
