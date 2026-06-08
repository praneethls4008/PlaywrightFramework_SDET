import {expect, chromium, ChromiumBrowser, BrowserContext, Page} from "@playwright/test"
import {test} from '../../src/fixtures/firstFixture'

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