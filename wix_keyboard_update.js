// Use Playwright to type directly with keyboard
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  
  await page.goto('https://editor.wix.com/studio/d84d3a66-637c-4eba-870f-274219debc1d?metaSiteId=e08a7faf-7056-4c2a-8a3c-0228cfd31d6f', {
    waitUntil: 'networkidle',
    timeout: 60000
  });
  
  await page.waitForTimeout(5000);
  
  // Find and double-click Business Name
  const previewFrame = await page.frameLocator('iframe[name*="preview"]').first();
  const businessNameLink = previewFrame.getByRole('link', { name: 'Business Name' });
  
  await businessNameLink.dblclick();
  await page.waitForTimeout(1000);
  
  // Select all and type
  await page.keyboard.press('Control+a');
  await page.waitForTimeout(200);
  await page.keyboard.type('Beckford Fitness', { delay: 50 });
  await page.waitForTimeout(500);
  await page.keyboard.press('Enter');
  
  console.log('✓ Updated Business Name');
  console.log('Browser will remain open for 10 seconds...');
  await page.waitForTimeout(10000);
  
  await browser.close();
})();
