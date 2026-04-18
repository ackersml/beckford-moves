const { chromium } = require('playwright');

const WIX_EDITOR = 'https://editor.wix.com/studio/d84d3a66-637c-4eba-870f-274219debc1d?metaSiteId=e08a7faf-7056-4c2a-8a3c-0228cfd31d6f';

const CONTENT = {
  businessName: "Beckford Fitness",
  hero: {
    heading: "1 on 1 Personal Training, Life Coaching and Nutrition Guidance",
    sectionTitle: "How It Works"
  }
};

async function autoUpdateWithConsole() {
  console.log('🚀 Auto-updating Wix content using console commands...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();
  
  try {
    console.log('📄 Opening Wix Editor...');
    await page.goto(WIX_EDITOR, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(8000);
    
    console.log('⏳ Waiting for editor to fully load...');
    console.log('💡 Please log in if prompted, then wait...');
    await page.waitForTimeout(15000);
    
    // Find all frames
    const frames = page.frames();
    console.log(`Found ${frames.length} frames`);
    
    // Try to find preview frame
    let previewFrame = frames.find(f => 
      f.url().includes('preview') || 
      f.url().includes('wixstudio') || 
      f.url().includes('editor')
    );
    
    if (!previewFrame && frames.length > 1) {
      previewFrame = frames[1]; // Usually the second frame is the preview
    }
    
    if (previewFrame) {
      console.log('✅ Found preview frame:', previewFrame.url().substring(0, 50));
      
      // Use console commands (evaluate) to find and update elements
      console.log('\n🔍 Searching for "Business Name" using console...');
      
      const businessNameResults = await previewFrame.evaluate(() => {
        // This is like running console commands
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );
        
        const matches = [];
        let node;
        while (node = walker.nextNode()) {
          const text = node.textContent.trim();
          if (text.includes('Business Name') || text.includes('Bu ine  Name')) {
            const parent = node.parentElement;
            matches.push({
              text: text,
              tagName: parent.tagName,
              id: parent.id,
              className: parent.className,
              element: parent
            });
          }
        }
        
        // Highlight matches
        matches.forEach(m => {
          m.element.style.outline = '3px solid red';
          m.element.style.backgroundColor = 'yellow';
        });
        
        return matches.map(m => ({
          text: m.text,
          tagName: m.tagName,
          id: m.id,
          className: m.className
        }));
      });
      
      if (businessNameResults.length > 0) {
        console.log(`✅ Found ${businessNameResults.length} "Business Name" elements:`);
        businessNameResults.forEach((m, i) => {
          console.log(`  ${i+1}. ${m.tagName}: "${m.text.substring(0, 60)}..."`);
        });
        
        console.log('\n💡 Elements highlighted in yellow with red outline');
        console.log('   Double-click them in the browser to edit');
        console.log('   Replace with: "Beckford Fitness"');
      } else {
        console.log('⚠️  No "Business Name" found. Site may already be updated or structure is different.');
      }
      
      // Find hero section
      console.log('\n🔍 Searching for hero section...');
      const heroResults = await previewFrame.evaluate(() => {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
        return headings.map(h => ({
          tag: h.tagName,
          text: h.textContent.trim().substring(0, 100),
          id: h.id,
          className: h.className
        }));
      });
      
      if (heroResults.length > 0) {
        console.log(`✅ Found ${heroResults.length} headings:`);
        heroResults.slice(0, 5).forEach((h, i) => {
          console.log(`  ${i+1}. ${h.tag}: "${h.text}..."`);
        });
      }
      
    } else {
      console.log('⚠️  Could not find preview frame');
      console.log('💡 You may need to manually navigate to the editor');
    }
    
    // Inject console helpers for manual use
    const consoleScript = `
      window.WIX_CONTENT = ${JSON.stringify(CONTENT)};
      window.highlight = function(text) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        const matches = [];
        let node;
        while (node = walker.nextNode()) {
          if (node.textContent.includes(text)) {
            node.parentElement.style.outline = '3px solid red';
            node.parentElement.style.backgroundColor = 'yellow';
            matches.push(node.parentElement);
          }
        }
        console.log(\`✅ Highlighted \${matches.length} elements: "\${text}"\`);
        return matches;
      };
      console.log('✅ Console helpers loaded! Use: highlight("text")');
    `;
    
    // Inject into main page
    await page.evaluate(consoleScript);
    
    // Try to inject into preview frame
    if (previewFrame) {
      await previewFrame.evaluate(consoleScript).catch(() => {});
    }
    
    console.log('\n✅ Console helpers injected!');
    console.log('\n📋 Available in console:');
    console.log('   highlight("Business Name")');
    console.log('   highlight("Transform Your Life")');
    console.log('   window.WIX_CONTENT');
    
    await page.screenshot({ path: 'wix_console_ready.png', fullPage: true });
    console.log('\n📸 Screenshot saved: wix_console_ready.png');
    console.log('\n⏳ Browser will stay open. Use console commands to continue...');
    
    await page.waitForTimeout(300000); // 5 minutes
    
  } catch (error) {
    console.error('❌ Error:', error);
    await page.screenshot({ path: 'wix_error.png', fullPage: true });
  } finally {
    await browser.close();
  }
}

autoUpdateWithConsole().catch(console.error);

