import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/browserFixture'
import { scrollPageToBottom } from '../../src/reusable/preparePageForSS';

//https://www.discover.com/credit-cards/?ICMPGN=PUB_HNAV_CARDS_ALL
//https://www.discover.com/credit-cards/cash-back/it-card/?ICMPGN=SUBNAV_CCP_IT

// Standalone test using an options configuration object
test('Full Page visual test', {
    tag: ['@FullPageVisualTest', '@VisualTest']
}, async ({ page }) => {
    
    
    await page.goto('https://www.discover.com/credit-cards/?ICMPGN=PUB_HNAV_CARDS_ALL',
        {
            waitUntil: 'load'
        }
    );
    
    await scrollPageToBottom(page);


    await expect(page).toHaveScreenshot('FullPage.png',
        {
        animations: 'disabled',
        fullPage: true
    });
});


// Standalone test using an options configuration object
test('Header visual test', {
    tag: ['@HeaderVisaualTest', '@VisualTest']
}, async ({ page }) => {
    

    
    await page.goto('https://www.discover.com/credit-cards/?ICMPGN=PUB_HNAV_CARDS_ALL');
    
    // await scrollPageToBottom(page);

    const headerComponent = page.locator('//header/parent::div');
    await expect(headerComponent).toHaveScreenshot('HeaderComponent.png',
        {
        animations: 'disabled',
    });
});
