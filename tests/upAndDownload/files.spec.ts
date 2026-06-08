import {test, expect} from "@playwright/test"

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