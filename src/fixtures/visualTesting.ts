import {test as Base, chromium, Page} from "@playwright/test"
import { scrollPageToBottom } from "../reusable/lazyLoading";

type vistualTestingFixture = {
    launchPageForScreenshot: Page,
    lazyInitPage: Page
}
export const test = Base.extend<vistualTestingFixture>({

    launchPageForScreenshot: async( {} , use)=>{

        const browser = await chromium.launch({
           headless: false 
        });

        const context = await browser.newContext({
            isMobile: false
        });

        const page = await context.newPage();
        await use(page);

        await page?.close();
        await context?.close();
        await browser?.close();


    
    },

});