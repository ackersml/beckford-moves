// This script uses Playwright to double-click text elements
// We'll need to execute this in the browser context

// Function to double-click a text element
async function doubleClickText(selector) {
  const element = await page.locator(selector);
  await element.dblclick();
  await page.waitForTimeout(500);
}

// For Business Name
await page.locator('iframe[name="preview-frame"]').contentFrame()
  .getByRole('link', { name: 'Business Name' })
  .dblclick();
