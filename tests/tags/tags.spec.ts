import {test, expect} from "@playwright/test"

test.describe('11 Tags', {tag: '@Test11'}, () => {
    
    test('11.1 Single Tag', {tag: '@Test11.1'}, async({}, testInfo)=>{
        console.log('Single Tag test Tags running: '+ testInfo.tags);
    });

    test('11.2 Multiple Tags', {tag: ['@Test11', '@Test11.2']}, async({}, testInfo)=>{
        console.log('Multi Tag test Tags running: '+ testInfo.tags);
    });

});