import {test, expect} from "@playwright/test"
test('7. Soft Assertion Example', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Test won't stop even if this fails
  await expect.soft(page.locator('h1')).toHaveText('Wrong Title'); 
  
  await page.getByRole('button').click(); // This still executes
});
