// Playwright script to double-click and edit text in Wix Studio
// This will be executed in the browser context

const frame = await page.frameLocator('iframe[name="preview-frame"]').first();

// Function to double-click and edit text
async function editText(selector, newText) {
  const element = frame.locator(selector);
  
  // Double-click using JavaScript event
  await element.evaluate((el) => {
    const event = new MouseEvent('dblclick', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    el.dispatchEvent(event);
  });
  
  await page.waitForTimeout(1000);
  
  // Find the rich text editor iframe or contenteditable element
  const editor = page.frameLocator('iframe[name="Rich Text Editor, editor1"]').first();
  
  // Try to find contenteditable element
  const editable = editor.locator('[contenteditable="true"]').first();
  
  if (await editable.count() > 0) {
    await editable.fill(newText);
    await page.keyboard.press('Enter');
  } else {
    // Fallback: use keyboard after double-click
    await page.keyboard.press('Control+a');
    await page.keyboard.type(newText);
    await page.keyboard.press('Enter');
  }
}

// Update Business Name
await editText('a:has-text("Business Name")', 'Beckford Fitness');
