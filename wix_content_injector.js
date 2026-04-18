const { chromium } = require('playwright');
const fs = require('fs');

// Read the injection script
const injectionScript = fs.readFileSync('./inject_content_update.js', 'utf8');

// Extended content updates
const extendedInjection = `
(function() {
  console.log('Starting comprehensive content update...');
  
  function updateTextContent(searchText, newText) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let updated = false;
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent && node.textContent.includes(searchText)) {
        const escapedSearch = searchText.replace(/[.*+?^$\{}()|[\]\\]/g, '\\\\$&');
        node.textContent = node.textContent.replace(new RegExp(escapedSearch, 'g'), newText);
        updated = true;
      }
    }
    
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      if (el.textContent && el.textContent.includes(searchText) && el.children.length === 0) {
        const escapedSearch2 = searchText.replace(/[.*+?^$\{}()|[\]\\]/g, '\\\\$&');
        el.textContent = el.textContent.replace(new RegExp(escapedSearch2, 'g'), newText);
        updated = true;
      }
    });
    
    return updated;
  }
  
  const updates = [
    ['Business Name', 'Beckford Fitness'],
    ['© 2035 by Business Name', '© 2025 by Beckford Fitness'],
    ['Welcome to', 'Welcome to Beckford Fitness'],
    ['Personal Training An', 'Beckford Fitness']
  ];
  
  let totalUpdated = 0;
  updates.forEach(([search, replace]) => {
    if (updateTextContent(search, replace)) {
      totalUpdated++;
      console.log('✓ Updated:', search, '→', replace);
    }
  });
  
  console.log('Total updates:', totalUpdated);
  return { updated: totalUpdated, message: 'Content update completed' };
})();
`;

async function updateWixContent() {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 300 
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  console.log('Navigating to Wix editor...');
  await page.goto('https://editor.wix.com/studio/d84d3a66-637c-4eba-870f-274219debc1d?metaSiteId=e08a7faf-7056-4c2a-8a3c-0228cfd31d6f', {
    waitUntil: 'networkidle',
    timeout: 60000
  });
  
  await page.waitForTimeout(8000); // Wait for editor to fully load
  
  console.log('Finding preview frame...');
  
  // Find all iframes
  const frames = page.frames();
  let previewFrame = null;
  
  for (const frame of frames) {
    const name = frame.name();
    const url = frame.url();
    if (name.includes('preview') || url.includes('preview') || name.includes('site-viewer')) {
      previewFrame = frame;
      console.log('Found preview frame:', name, url);
      break;
    }
  }
  
  // Alternative: find by iframe element
  if (!previewFrame) {
    const iframeSelectors = [
      'iframe[name*="preview"]',
      'iframe[src*="preview"]',
      'iframe[data-testid*="preview"]',
      'iframe'
    ];
    
    for (const selector of iframeSelectors) {
      try {
        const iframe = await page.$(selector);
        if (iframe) {
          previewFrame = await iframe.contentFrame();
          if (previewFrame) {
            console.log('Found preview frame via selector:', selector);
            break;
          }
        }
      } catch (e) {
        // Continue
      }
    }
  }
  
  if (previewFrame) {
    console.log('Injecting content update script into preview frame...');
    
    try {
      const result = await previewFrame.evaluate(extendedInjection);
      console.log('Injection result:', result);
      
      // Wait a bit to see changes
      await page.waitForTimeout(2000);
      
      // Take a screenshot to verify
      await page.screenshot({ path: 'wix_update_verification.png', fullPage: true });
      console.log('Screenshot saved to wix_update_verification.png');
      
    } catch (e) {
      console.error('Error injecting script:', e.message);
    }
  } else {
    console.log('Could not find preview frame. Trying alternative approach...');
    
    // Try to inject into main page
    try {
      const result = await page.evaluate(extendedInjection);
      console.log('Injection result (main page):', result);
    } catch (e) {
      console.error('Error injecting into main page:', e.message);
    }
  }
  
  console.log('\n=== Update Summary ===');
  console.log('Content update script executed.');
  console.log('Note: DOM manipulation may not persist after page refresh.');
  console.log('For permanent updates, use the Wix Studio editor manually.');
  console.log('\nBrowser will remain open for 20 seconds for verification...');
  
  await page.waitForTimeout(20000);
  
  await browser.close();
}

updateWixContent().catch(console.error);

