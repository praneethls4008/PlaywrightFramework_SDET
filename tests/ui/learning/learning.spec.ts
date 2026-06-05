import {expect, chromium, ChromiumBrowser, BrowserContext, Page} from "@playwright/test"
import {test} from '../../../src/fixtures/firstFixture'

test('1. browser commands', async({page})=>{
    await page.goto("https://www.discover.com/credit-cards/?ICMPGN=ACQ_HNAV_ALL_HDR_CREDIT_CARDS");
    const btn = await page.getByRole('button', {name:'apply'}).first();
    await btn.click({delay: 100});
    page.close();
})


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



test('4. Handling Date in make my trip', async()=>{
     const browser = await chromium.launch();

    // 2. Create a realistic user context to mask automation signatures
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
        locale: 'en-US',
    });

    const page = await context.newPage();

    // 3. Add extra HTTP headers to match standard desktop requests
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9',
        'Upgrade-Insecure-Requests': '1',
    });

    // 4. Navigate to the website using 'commit' instead of full 'load'
    // This allows the page to load even if tracking scripts trigger minor protocol blocks
    await page.goto("https://www.makemytrip.com/", { waitUntil: 'commit' });
    
    const popUpLoginBanner = page.locator(`//section[@data-cy='CommonModal_2']`);

    if(await popUpLoginBanner.isVisible()){
        const popUpCloseBtn = page.locator('//span[@data-cy="closeModal"]');
        await popUpCloseBtn.click();
        expect(await popUpLoginBanner.isVisible(), 'Login pop up should is still not closed!').toBe(false);
    }

    const departureInput = page.getByTestId('departure');
    await departureInput.click();

    const datePicker = page.locator('.DayPicker-Months .DayPicker-Month');

    
    expect(await datePicker.getByRole('heading').first().textContent()).toContain('june');

    await datePicker.locator('.dateInnerCell').click();

    await page.getByRole('button', {name:'search'}).click();

    expect(page.url()).toContain('https://www.makemytrip.com/flight/search');

});


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

test('6. FIle upload', async({page})=>{
    const filePath = 'resources/images/zayn-malikk-1517989457.jpg';
    const inputLocator = '#file-input';
    await page.goto('https://qaplayground.dev/apps/upload/');
    await page.setInputFiles(inputLocator, filePath);
    await page.waitForTimeout(1000);
});

test('6. File download', async({page})=>{
    const filePath = '/home/praneethreddy/Pictures/zayn-malikk-1517989457.jpg';
    const dwnlLocator = page.getByRole('link', {name: 'download'});

    

    await page.goto('https://qaplayground.dev/apps/download/');

    const downloadPromise = page.waitForEvent('download');

    await dwnlLocator.click();

    const download = await downloadPromise;

    await download.saveAs('./downloads/' + download.suggestedFilename());
});


test('7. Soft Assertion Example', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Test won't stop even if this fails
  await expect.soft(page.locator('h1')).toHaveText('Wrong Title'); 
  
  await page.getByRole('button').click(); // This still executes
});


test('8. API testing', async ({ page, request}) => {

    const response = await request.get('/endpoint');

    expect(response.status()).toBe(200);
    const body = await response.json();

  await page.goto('https://example.com');
  
  // Test won't stop even if this fails
  await expect.soft(page.locator('h1')).toHaveText('Wrong Title'); 
  
  await page.getByRole('button').click(); // This still executes
});


test.describe('9. Describe', () => {

    let browser: ChromiumBrowser;
    let context: BrowserContext;

    test.beforeAll('9  before all', async()=>{
        browser = await chromium.launch();
    });

    test.beforeEach('9  before each', async({page})=>{
        context = await browser.newContext();
    });


    test.afterEach('9  after each', async({page})=>{
        await context.close();
    });

    test.afterAll('9  after all', async()=>{
        await browser?.close();
    });


    test('9 test', async()=>{
        const page = await context.newPage();
        await page.goto('https://qaplayground.dev/apps/popup/');
        
        const popUpTabPromise = context.waitForEvent('page');

        await page.getByRole('link', {name: 'open'}).click();

        const newTab:Page = await popUpTabPromise;
        await newTab.waitForLoadState();
        expect(newTab).not.toBeNull();

        const screenSize = await page.evaluate(() => ({
            width: window.screen.availWidth,
            height: window.screen.availHeight
        }));
        await newTab.setViewportSize(screenSize);

        await newTab.getByRole('button', {name: 'submit'}).click();


        

    });



});


test('10.1 Custom Fixture @Userfixtures', async({userInfo})=>{
    
    console.log(
        `Username: ${userInfo.username}\n`+
        `Age: ${userInfo.age}\n`+
        `IsAdmin: ${userInfo.isAdmin}\n`
    );

});


test('10.2 Custom Fixture @Userfixtures', async({credentials})=>{
    
    console.log(
        `Username: ${credentials.username}\n`+
        `Password: ${credentials.password}\n`
    );

});

test.describe('11 Tags', {tag: '@Test11'}, () => {
    
    test('11.1 Single Tag', {tag: '@Test11.1'}, async({}, testInfo)=>{
        console.log('Single Tag test Tags running: '+ testInfo.tags);
    });

    test('11.2 Multiple Tags', {tag: ['@Test11', '@Test11.2']}, async({}, testInfo)=>{
        console.log('Multi Tag test Tags running: '+ testInfo.tags);
    });

});









