// Playwright script to update Wix content
// This would need to be run in the browser context

// Update Business Name
const updateBusinessName = async (page) => {
  const frame = await page.frameLocator('iframe[name="preview-frame"]').first();
  const businessNameLink = frame.getByRole('link', { name: 'Business Name' });
  
  // Double-click to enter edit mode
  await businessNameLink.dblclick();
  await page.waitForTimeout(500);
  
  // Select all and type
  await page.keyboard.press('Control+a');
  await page.keyboard.type('Beckford Fitness');
  await page.keyboard.press('Enter');
};

console.log("Script prepared");
