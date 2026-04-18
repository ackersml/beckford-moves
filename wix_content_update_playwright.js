const { chromium } = require('playwright');

const WIX_EDITOR_URL = 'https://editor.wix.com/studio/d84d3a66-637c-4eba-870f-274219debc1d?metaSiteId=e08a7faf-7056-4c2a-8a3c-0228cfd31d6f';
const WIX_PREVIEW_URL = 'https://ackersml.wixstudio.com/personal-training-an';

async function updateWixContent() {
  console.log('Starting Wix content update...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000 // Slow down for visibility
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  try {
    console.log('Navigating to Wix preview site...');
    await page.goto(WIX_PREVIEW_URL, { waitUntil: 'networkidle' });
    
    console.log('Page loaded. Current URL:', page.url());
    console.log('Page title:', await page.title());
    
    // Wait a bit for page to fully render
    await page.waitForTimeout(3000);
    
    // Take a screenshot to see current state
    await page.screenshot({ path: 'wix_current_state.png', fullPage: true });
    console.log('Screenshot saved to wix_current_state.png');
    
    // Try to find and log key elements
    const headings = await page.$$eval('h1, h2, h3', elements => 
      elements.map(el => ({ tag: el.tagName, text: el.textContent.trim().substring(0, 100) }))
    );
    
    console.log('\nFound headings on page:');
    headings.forEach((h, i) => {
      console.log(`${i + 1}. ${h.tag}: ${h.text}`);
    });
    
    // Check for text content that needs updating
    const bodyText = await page.textContent('body');
    console.log('\nPage contains "Transform Your Life":', bodyText.includes('Transform Your Life'));
    console.log('Page contains "Beckford Fitness":', bodyText.includes('Beckford Fitness'));
    console.log('Page contains "Personal Training":', bodyText.includes('Personal Training'));
    
    console.log('\n✅ Preview site inspection complete.');
    console.log('\nTo update content, you need to:');
    console.log('1. Open the Wix Editor:', WIX_EDITOR_URL);
    console.log('2. Use the content from LANDING_PAGE_TEXT.md');
    console.log('3. Double-click text elements to edit them');
    
    // Keep browser open for inspection
    console.log('\nBrowser will stay open for 30 seconds for inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

updateWixContent().catch(console.error);

