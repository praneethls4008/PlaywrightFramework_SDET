import { Page } from '@playwright/test';

/**
 * Scrolls the page to the bottom in 200px increments.
 * @param page The Playwright Page instance
 */
export async function scrollPageToBottom(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 200; // Your 200px scroll increment
      
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        // Stop scrolling when the bottom of the page is reached
        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 300); // 300ms pause between scrolls to let lazy content load
    });
  });
}
