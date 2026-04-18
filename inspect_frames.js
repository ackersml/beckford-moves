// Quick script to inspect all frames and find the one with "Business Name"
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('https://editor.wix.com/studio/d84d3a66-637c-4eba-870f-274219debc1d?metaSiteId=e08a7faf-7056-4c2a-8a3c-0228cfd31d6f', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  
  await page.waitForTimeout(10000);
  
  const allFrames = page.frames();
  console.log(`\nTotal frames: ${allFrames.length}\n`);
  
  for (let i = 0; i < allFrames.length; i++) {
    const frame = allFrames[i];
    const url = frame.url();
    
    try {
      const hasBusinessName = await frame.evaluate(() => {
        return document.body?.textContent?.includes('Business Name') || false;
      });
      
      const hasTransform = await frame.evaluate(() => {
        return document.body?.textContent?.includes('Transform Your Life') || false;
      });
      
      if (hasBusinessName || hasTransform) {
        console.log(`✅ FRAME ${i} HAS CONTENT!`);
        console.log(`   URL: ${url.substring(0, 100)}`);
        console.log(`   Has Business Name: ${hasBusinessName}`);
        console.log(`   Has Transform: ${hasTransform}`);
        
        const content = await frame.evaluate(() => {
          const links = Array.from(document.querySelectorAll('a')).slice(0, 5).map(l => l.textContent.trim());
          const headings = Array.from(document.querySelectorAll('h1, h2')).slice(0, 5).map(h => h.textContent.trim());
          return { links, headings };
        });
        
        console.log(`   Links: ${content.links.join(', ')}`);
        console.log(`   Headings: ${content.headings.join(', ')}`);
        console.log('');
      }
    } catch (e) {
      // Frame not accessible
    }
  }
  
  await page.waitForTimeout(5000);
  await browser.close();
})();
