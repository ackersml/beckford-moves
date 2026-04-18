const { chromium } = require('playwright');

const WIX_EDITOR = 'https://editor.wix.com/studio/d84d3a66-637c-4eba-870f-274219debc1d?metaSiteId=e08a7faf-7056-4c2a-8a3c-0228cfd31d6f';

async function directUpdate() {
  console.log('🚀 Direct Wix content update - clicking and typing...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 2000,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();
  
  try {
    console.log('📄 Opening Wix Editor...');
    await page.goto(WIX_EDITOR, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(10000);
    
    console.log('⏳ Waiting for editor to load (60 seconds for login)...');
    await page.waitForTimeout(60000);
    
    // Find preview iframe
    console.log('\n🔍 Finding preview frame...');
    await page.waitForTimeout(5000);
    
    const frames = page.frames();
    let previewFrame = frames.find(f => 
      f.url().includes('preview') || 
      f.url().includes('wixstudio')
    );
    
    if (!previewFrame && frames.length > 1) {
      previewFrame = frames[1];
    }
    
    if (previewFrame) {
      console.log('✅ Found preview frame');
      
      // Wait for content to load
      await previewFrame.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);
      
      // Find "Business Name" and double-click it
      console.log('\n🖱️  Looking for "Business Name" to click...');
      
      const businessNameElement = await previewFrame.locator('text="Business Name", text="Bu ine  Name"').first();
      
      if (await businessNameElement.isVisible({ timeout: 10000 }).catch(() => false)) {
        console.log('✅ Found "Business Name" element');
        
        // Scroll into view
        await businessNameElement.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        
        // Double-click to edit
        console.log('🖱️  Double-clicking to edit...');
        await businessNameElement.dblclick();
        await page.waitForTimeout(2000);
        
        // Select all and type new text
        console.log('⌨️  Typing "Beckford Fitness"...');
        await page.keyboard.press('Meta+a'); // Cmd+A on Mac
        await page.waitForTimeout(500);
        await page.keyboard.type('Beckford Fitness', { delay: 100 });
        await page.waitForTimeout(1000);
        
        // Press Enter to save
        console.log('💾 Saving...');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2000);
        
        console.log('✅ Updated "Business Name" to "Beckford Fitness"');
      } else {
        console.log('⚠️  "Business Name" not found or not visible');
        
        // Try to find any editable text
        const allText = await previewFrame.locator('body').textContent();
        if (allText && allText.includes('Business Name')) {
          console.log('✅ Found "Business Name" in page text, but element not directly clickable');
          console.log('💡 May need to use Wix editor interface to update');
        }
      }
      
      // Take screenshot
      await page.screenshot({ path: 'wix_direct_update_result.png', fullPage: true });
      console.log('\n📸 Screenshot saved: wix_direct_update_result.png');
    }
    
    console.log('\n✅ Update attempt complete!');
    console.log('⏳ Keeping browser open for 30 seconds...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('❌ Error:', error);
    await page.screenshot({ path: 'wix_direct_error.png', fullPage: true });
  } finally {
    await browser.close();
  }
}

directUpdate().catch(console.error);

