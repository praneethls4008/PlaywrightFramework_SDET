import { test as base, chromium, firefox, webkit, Browser } from '@playwright/test';

const VIEWPORTS = {
  desktop: { width: 1280, height: 720 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
};

export const test = base.extend({
  // Using native testInfo metadata arrays to drive context options
  context: async ({}, use, testInfo) => {
    let selectedViewport = VIEWPORTS.desktop;
    let browserType = 'chromium';
    let isHeadless = true;

    // Use Playwright's native tags array directly
    const tags = testInfo.tags || [];

    // 1. Evaluate Headless state
    if (tags.includes('@headed')) {
      isHeadless = false;
    } else if (tags.includes('@headless')) {
      isHeadless = true;
    } else if (process.env.HEADED === 'true' || process.env.HEADED === '1') {
      isHeadless = false;
    }

    // 2. Evaluate Browser Type
    if (tags.includes('@firefox')) browserType = 'firefox';
    else if (tags.includes('@webkit')) browserType = 'webkit';
    else if (process.env.BROWSER) browserType = process.env.BROWSER.toLowerCase();

    // 3. Evaluate Viewport Dimensions
    if (tags.includes('@mobile')) selectedViewport = VIEWPORTS.mobile;
    else if (tags.includes('@tablet')) selectedViewport = VIEWPORTS.tablet;
    else if (process.env.VIEWPORT && VIEWPORTS[process.env.VIEWPORT]) {
      selectedViewport = VIEWPORTS[process.env.VIEWPORT];
    }

    // 4. Launch clean isolated browser execution threads
    let browserInstance: Browser;
    const launchOptions = { headless: isHeadless };

    if (browserType === 'firefox') {
      browserInstance = await firefox.launch(launchOptions);
    } else if (browserType === 'webkit') {
      browserInstance = await webkit.launch(launchOptions);
    } else {
      browserInstance = await chromium.launch(launchOptions);
    }

    // 5. Create fresh environment context
    const context = await browserInstance.newContext({
      viewport: selectedViewport,
    });

    await use(context);

    // 6. Automated teardown lifecycle orchestration
    await context.close();
    await browserInstance.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
  },
});

export { expect } from '@playwright/test';
