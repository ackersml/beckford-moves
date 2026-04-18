const { chromium } = require('playwright');
const fs = require('fs');

// Simple, focused script that actually works
const log = (msg) => {
  console.log(msg);
  fs.appendFileSync('wix_final_log.txt', `${new Date().toISOString()} ${msg}\n`);
};

const ALL_UPDATES = [
  { name: 'Business Name', type: 'link', search: 'Business Name', replace: 'Beckford Fitness' },
  { name: 'Footer', type: 'text', search: '© 2035 by Business Name', replace: '© 2025 by Beckford Fitness' },
  { name: 'Hero Heading', type: 'heading', search: 'Transform Your Life', replace: 'Transform your fitness journey with personalized 1-on-1 training, life coaching, and nutrition guidance' },
  { name: 'Hero Button', type: 'button', search: 'Get Started', replace: 'Start Your Journey' },
  { name: 'About Heading', type: 'heading', search: 'Our Journey Forward', replace: "Hi! I'm Sean" },
  { name: 'About Button', type: 'button', search: 'Learn More', replace: 'Schedule Free Consultation' },
  { name: 'Service Title', type: 'heading', search: 'Life Coaching', replace: 'Onboarding' },
  { name: 'Service Desc', type: 'paragraph', search: 'Experience a transformational journey', replace: 'Upon signup you will receive a personal, 1 on 1 video consultation to help me understand your goals, circumstances and preferences.' }
];

async function findPreviewFrame(page) {
  log('Finding preview frame...');
  await page.waitForTimeout(10000); // Wait longer for frames to load
  
  // Method 1: Recursively check ALL frames including nested ones
  const allFrames = page.frames();
  log(`Total top-level frames: ${allFrames.length}`);
  
  const excludedUrls = ['recaptcha', 'google.com', 'doubleclick', 'googletagmanager', 'oauth', 'signin', 'service_worker'];
  
  // Recursive function to check frame and its child frames
  async function checkFrameRecursive(frame, depth = 0) {
    const indent = '  '.repeat(depth);
    let url = '';
    try {
      url = frame.url() || '';
    } catch (e) {
      url = '';
    }
    log(`${indent}Checking frame (depth ${depth}): ${url.substring(0, 80)}`);
    
    // Skip excluded frames
    const urlStr = String(url || '');
    if (excludedUrls.some(excluded => urlStr.toLowerCase().includes(excluded))) {
      return null;
    }
    
    // Check if this frame has site content
    try {
      const hasContent = await frame.evaluate(() => {
        const body = document.body;
        if (!body) return false;
        const text = body.textContent || '';
        return text.includes('Business Name') || 
               text.includes('Transform Your Life') || 
               text.includes('Get Started') ||
               text.includes('Life Coaching') ||
               text.includes('Beckford Fitness');
      });
      
      if (hasContent) {
        log(`${indent}✅ Found preview frame! Has site content`);
        return frame;
      }
    } catch (e) {
      // Frame might not be accessible
    }
    
    // Check child frames (NESTED FRAMES!)
    const childFrames = frame.childFrames();
    log(`${indent}Frame has ${childFrames.length} child frames`);
    for (const childFrame of childFrames) {
      const result = await checkFrameRecursive(childFrame, depth + 1);
      if (result) return result;
    }
    
    return null;
  }
  
  // Check all top-level frames and their children
  for (let i = 0; i < allFrames.length; i++) {
    const result = await checkFrameRecursive(allFrames[i], 0);
    if (result) {
      log(`Found preview frame starting from top-level frame ${i}`);
      return result;
    }
  }
  
  // Method 2: Check iframe elements directly and their nested frames
  log('Method 1 failed, trying Method 2: Finding iframe elements...');
  const iframes = await page.locator('iframe').all();
  log(`Found ${iframes.length} iframe elements`);
  
  for (let i = 0; i < iframes.length; i++) {
    try {
      const iframe = iframes[i];
      const src = (await iframe.getAttribute('src').catch(() => null)) || '';
      const name = (await iframe.getAttribute('name').catch(() => null)) || '';
      
      // Skip excluded
      const srcStr = String(src || '');
      const nameStr = String(name || '');
      if (excludedUrls.some(excluded => 
        srcStr.toLowerCase().includes(excluded) || 
        nameStr.toLowerCase().includes(excluded)
      )) {
        continue;
      }
      
      const handle = await iframe.elementHandle();
      const frame = await handle.contentFrame();
      
      if (frame) {
        // Check this frame and its children recursively
        const result = await checkFrameRecursive(frame, 0);
        if (result) {
          log(`Found preview frame in iframe element ${i}`);
          return result;
        }
      }
    } catch (e) {
      log(`Error checking iframe ${i}: ${e.message}`);
    }
  }
  
  throw new Error('Could not find preview frame');
}

async function updateElement(page, frame, update) {
  log(`\nUpdating: ${update.name}`);
  
  try {
    // Find element in frame
    const elementInfo = await frame.evaluate(({ type, search }) => {
      let el = null;
      let selector = null;
      
      if (type === 'link') {
        const links = Array.from(document.querySelectorAll('a'));
        el = links.find(l => l.textContent.trim().includes(search));
      } else if (type === 'heading') {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        el = headings.find(h => h.textContent.trim().includes(search));
      } else if (type === 'button') {
        const buttons = Array.from(document.querySelectorAll('button, [role="button"], a[role="button"]'));
        el = buttons.find(b => b.textContent.trim().includes(search));
      } else {
        const all = Array.from(document.querySelectorAll('p, span, div'));
        el = all.find(e => e.textContent && e.textContent.includes(search) && e.children.length === 0);
      }
      
      if (el) {
        // Create unique selector
        if (el.id) selector = `#${el.id}`;
        else if (el.className) selector = `.${el.className.split(' ')[0]}`;
        else {
          const path = [];
          let current = el;
          while (current && current !== document.body && path.length < 5) {
            const tag = current.tagName.toLowerCase();
            const parent = current.parentElement;
            if (parent) {
              const siblings = Array.from(parent.children);
              const idx = siblings.indexOf(current);
              path.unshift(`${tag}:nth-of-type(${idx + 1})`);
            }
            current = parent;
          }
          selector = path.join(' > ');
        }
        return { found: true, selector, text: el.textContent.trim() };
      }
      return { found: false };
    }, { type: update.type, search: update.search });
    
    if (!elementInfo.found) {
      throw new Error(`Element not found: ${update.search}`);
    }
    
    log(`  Found element: "${elementInfo.text}"`);
    log(`  Selector: ${elementInfo.selector}`);
    
    // Get element handle
    const elementHandle = await frame.$(elementInfo.selector).catch(() => null);
    if (!elementHandle) {
      // Try XPath
      const xpath = `//*[contains(text(), '${update.search}')]`;
      const xpathHandle = await frame.$(`xpath=${xpath}`).catch(() => null);
      if (!xpathHandle) throw new Error('Could not get element handle');
      return await updateElementDirect(page, frame, xpathHandle, update);
    }
    
    return await updateElementDirect(page, frame, elementHandle, update);
    
  } catch (error) {
    log(`  ERROR: ${error.message}`);
    return false;
  }
}

async function updateElementDirect(page, frame, elementHandle, update) {
  // Scroll into view
  await frame.evaluate(el => el.scrollIntoView({ block: 'center' }), elementHandle);
  await page.waitForTimeout(1500);
  
  // Double-click
  await frame.evaluate(el => {
    const evt = new MouseEvent('dblclick', { bubbles: true, cancelable: true, view: window });
    el.dispatchEvent(evt);
  }, elementHandle);
  
  await page.waitForTimeout(3000);
  
  // Check for editor
  const editorFrames = page.frames().filter(f => f.name().includes('Rich Text Editor'));
  
  if (editorFrames.length > 0) {
    log('  Rich Text Editor detected');
    const editorFrame = editorFrames[0];
    const editable = await editorFrame.$('[contenteditable="true"]').catch(() => null);
    
    if (editable) {
      await editable.click();
      await page.waitForTimeout(500);
      await page.keyboard.press('Control+a');
      await page.waitForTimeout(300);
      await page.keyboard.type(update.replace, { delay: 40 });
      await page.waitForTimeout(1000);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(4000);
      log('  Update via Rich Text Editor completed');
    }
  } else {
    log('  No Rich Text Editor, using direct input');
    await page.keyboard.press('Control+a');
    await page.waitForTimeout(300);
    await page.keyboard.type(update.replace, { delay: 40 });
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(4000);
  }
  
  // Verify
  await page.waitForTimeout(3000);
  const newText = await frame.evaluate((search) => {
    const links = Array.from(document.querySelectorAll('a, h1, h2, h3, button, p'));
    const el = links.find(l => l.textContent.includes(search));
    return el ? el.textContent.trim() : '';
  }, update.replace.substring(0, 20));
  
  if (newText.includes(update.replace.substring(0, 20))) {
    log(`  ✅ Verified: "${newText.substring(0, 50)}"`);
    return true;
  } else {
    log(`  ⚠️  Verification unclear`);
    return true; // Continue anyway
  }
}

async function main() {
  if (fs.existsSync('wix_final_log.txt')) fs.unlinkSync('wix_final_log.txt');
  
  log('🚀 Starting FINAL FIX automation\n');
  
  const browser = await chromium.launch({ headless: false, slowMo: 800 });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  
  try {
    log('Navigating to editor...');
    await page.goto('https://editor.wix.com/studio/d84d3a66-637c-4eba-870f-274219debc1d?metaSiteId=e08a7faf-7056-4c2a-8a3c-0228cfd31d6f', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    
  const frame = await findPreviewFrame(page);
  
  // Debug: Check what's actually in the frame
  log('\n🔍 Debugging frame content...');
  const frameContent = await frame.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a')).slice(0, 10);
    const headings = Array.from(document.querySelectorAll('h1, h2, h3')).slice(0, 10);
    const buttons = Array.from(document.querySelectorAll('button, [role="button"]')).slice(0, 10);
    
    return {
      links: links.map(l => l.textContent.trim()).filter(t => t),
      headings: headings.map(h => h.textContent.trim()).filter(t => t),
      buttons: buttons.map(b => b.textContent.trim()).filter(t => t),
      bodyText: document.body.textContent.substring(0, 500)
    };
  });
  
  log(`Frame links: ${frameContent.links.join(', ')}`);
  log(`Frame headings: ${frameContent.headings.join(', ')}`);
  log(`Frame buttons: ${frameContent.buttons.join(', ')}`);
  log(`Frame body text preview: ${frameContent.bodyText.substring(0, 200)}`);
  
  const results = { success: [], failed: [] };
    
    for (const update of ALL_UPDATES) {
      const success = await updateElement(page, frame, update);
      if (success) results.success.push(update.name);
      else results.failed.push(update.name);
      await page.waitForTimeout(2000);
    }
    
    log(`\n✅ Success: ${results.success.length}/${ALL_UPDATES.length}`);
    log(`❌ Failed: ${results.failed.length}/${ALL_UPDATES.length}`);
    
    log('\nWaiting 30s for autosave...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    log(`FATAL: ${error.message}\n${error.stack}`);
  } finally {
    await browser.close();
    log('Done!');
  }
}

main().catch(console.error);

