import {test, expect} from "@playwright/test"

test('2. Locators', async({page})=>{
    await page.goto("https://www.discover.com/credit-cards/?ICMPGN=ACQ_HNAV_ALL_HDR_CREDIT_CARDS");

    // prefer getByRole/getByTestId
    /*

             getByRole (accessibilty, screenreaders, seo)
                ||
                \/
             getByID (id)
                ||
                \/
            getByText, getByLabel (text, form label)
                ||
                \/
            getByPlaceholder, getByAltText (placeholder, image alt text)
                ||
                \/
            locator (css,xpath)

            


    */
    //getByRole => accessibillity | screenreaders | aria labels
    const byRoleEle = page.getByRole('button', {name:'apply', disabled: false}).first();

    //getByText => by text
    const byTextEle = page.getByText('apply now').first();
    await byTextEle.click();
    expect(page.url(), 'apply now redirect url is incorrect').toContain('https://www.discovercard.com/application/website/apply');

    // form control by label
    page.getByLabel('apply now');

    page.getByPlaceholder('apply now');

    page.getByTitle('apply now');

    //images
    page.getByAltText('apply now');

    //id
    page.getByTestId('apply now');

    //css xpath
    page.locator('.my-class');
    page.locator('//div[@class="my-class"]');

});