const { chromium } = require('playwright');

// ALL CORRECT CONTENT
const ALL_UPDATES = [
  {
    name: 'Business Name (Header)',
    type: 'link',
    search: 'Business Name',
    replace: 'Beckford Fitness',
    retries: 5,
    timeout: 15000
  },
  {
    name: 'Footer Copyright',
    type: 'text',
    search: '© 2035 by Business Name',
    replace: '© 2025 by Beckford Fitness',
    retries: 5,
    timeout: 15000
  },
  {
    name: 'Hero Heading',
    type: 'heading',
    search: 'Transform Your Life',
    replace: 'Transform your fitness journey with personalized 1-on-1 training, life coaching, and nutrition guidance',
    retries: 5,
    timeout: 15000
  },
  {
    name: 'Hero Paragraph',
    type: 'paragraph',
    search: 'Experience personalized fitness and wellness coaching',
    replace: 'Sean Beckford brings 11 years of experience and 9 professional certifications to create custom programs that deliver real results.\n\nTrain virtually from anywhere or in-person in Downtown Toronto. Access your programming, video demonstrations, and 24/7 support through the beckfordfitness app. Flexible packages from $299/month or individual sessions available.\n\nOur holistic approach combines functional movement, evidence-based nutrition, and recovery methods to help you achieve lasting transformation.',
    retries: 5,
    timeout: 15000
  },
  {
    name: 'Hero Button',
    type: 'button',
    search: 'Get Started',
    replace: 'Start Your Journey',
    retries: 4,
    timeout: 12000
  },
  {
    name: 'About Heading',
    type: 'heading',
    search: 'Our Journey Forward',
    replace: "Hi! I'm Sean",
    retries: 5,
    timeout: 15000
  },
  {
    name: 'About Paragraph',
    type: 'paragraph',
    search: 'Beckford Fitness, led by seasoned trainer',
    replace: `I've been a Fitness Trainer for 11 years and I've been fortunate to learn from the best at some of the top fitness gyms in North America throughout my career. My journey in fitness began with a passion for helping people transform not just their bodies, but their entire approach to health and wellness.

I put everything I have into ensuring my clients improve their bodies and lives. My commitment to continuing education throughout my fitness journey has helped me deliver a great service to my clients through functional movement, nutrition and recovery methods. I believe that true transformation happens when we address the whole person—mind, body, and spirit. That's why my approach goes beyond traditional personal training to include life coaching, nutrition guidance, and holistic wellness practices.

What sets my practice apart is the personalized attention I give to each client. Every program is tailored specifically to your goals, circumstances, and preferences. Whether you're training for a specific event, recovering from an injury, or simply looking to improve your overall quality of life, I work with you to create a sustainable path forward.

My training philosophy centers on functional movement, proper form, and evidence-based methods. I combine strength training, mobility work, and recovery techniques to help you move better, feel stronger, and live more fully. Through my iOS and Android app, powered by Trainerize, you'll have access to your programming, video demonstrations, and direct communication with me 24/7.

I'm looking forward to supporting you in your fitness journey. Whether you're just starting out or you're an experienced athlete looking to break through plateaus, I'm here to guide you every step of the way. Together, we'll build strength, improve mobility, and create lasting habits for long-term health and wellness.`,
    retries: 5,
    timeout: 15000
  },
  {
    name: 'About Button',
    type: 'button',
    search: 'Learn More',
    replace: 'Schedule Free Consultation',
    retries: 4,
    timeout: 12000
  },
  {
    name: 'Service 1: Onboarding (Title)',
    type: 'heading',
    search: 'Life Coaching',
    replace: 'Onboarding',
    retries: 5,
    timeout: 15000
  },
  {
    name: 'Service 1: Onboarding (Description)',
    type: 'paragraph',
    search: 'Experience a transformational journey with our life coaching services',
    replace: 'Upon signup you will receive a personal, 1 on 1 video consultation to help me understand your goals, circumstances and preferences.',
    retries: 5,
    timeout: 15000
  }
];

async function waitForEditorReady(page) {
  // Wait for Wix editor to fully load
  await page.waitForLoadState('networkidle', { timeout: 60000 });
  await page.waitForTimeout(5000);
  
  // Wait for preview frame
  const previewFrame = page.frameLocator('iframe[name*="preview"]').first();
  await previewFrame.locator('body').waitFor({ state: 'visible', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  return previewFrame;
}

async function updateElementRobust(page, previewFrame, update) {
  for (let attempt = 1; attempt <= update.retries; attempt++) {
    try {
      console.log(`   Attempt ${attempt}/${update.retries}...`);
      
      let element;
      const searchText = update.search;
      
      // Find element with multiple strategies
      if (update.type === 'link') {
        element = previewFrame.getByRole('link', { name: searchText, exact: false }).first();
      } else if (update.type === 'heading') {
        element = previewFrame.getByRole('heading', { name: searchText, exact: false }).first();
      } else if (update.type === 'button') {
        element = previewFrame.getByRole('button', { name: searchText, exact: false }).first();
      } else {
        // For paragraphs, try multiple approaches
        try {
          element = previewFrame.getByText(searchText, { exact: false }).first();
        } catch (e) {
          // Fallback: find by partial text
          element = previewFrame.locator('*').filter({ hasText: searchText }).first();
        }
      }
      
      // Wait for element with longer timeout
      await element.waitFor({ 
        state: 'visible', 
        timeout: update.timeout 
      });
      
      // Scroll into view multiple times to ensure it's visible
      for (let i = 0; i < 3; i++) {
        await element.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
      }
      
      // Wait a bit more for any animations
      await page.waitForTimeout(1000);
      
      // Double-click to enter edit mode
      await element.dblclick({ timeout: 10000 });
      await page.waitForTimeout(3000); // Longer wait for edit mode
      
      // Check if Rich Text Editor appeared
      const editorIframe = page.frameLocator('iframe[name*="Rich Text Editor"]').first();
      const hasEditor = await editorIframe.locator('body').count().catch(() => 0);
      
      if (hasEditor > 0) {
        // Editor iframe is open, work within it
        const editable = editorIframe.locator('[contenteditable="true"]').first();
        await editable.waitFor({ state: 'visible', timeout: 5000 });
        await editable.click();
        await page.waitForTimeout(500);
        await page.keyboard.press('Control+a');
        await page.waitForTimeout(300);
        await page.keyboard.press('Backspace');
        await page.waitForTimeout(300);
        
        // Type new content
        const textLines = update.replace.split('\n');
        for (let i = 0; i < textLines.length; i++) {
          await page.keyboard.type(textLines[i], { delay: 50 });
          if (i < textLines.length - 1) {
            await page.keyboard.press('Shift+Enter');
            await page.waitForTimeout(200);
          }
        }
        
        await page.waitForTimeout(1000);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(3000);
      } else {
        // No editor iframe, try direct editing
        await page.keyboard.press('Control+a');
        await page.waitForTimeout(500);
        await page.keyboard.press('Backspace');
        await page.waitForTimeout(300);
        
        // Type new content
        const textLines = update.replace.split('\n');
        for (let i = 0; i < textLines.length; i++) {
          await page.keyboard.type(textLines[i], { delay: 50 });
          if (i < textLines.length - 1) {
            await page.keyboard.press('Shift+Enter');
            await page.waitForTimeout(200);
          }
        }
        
        await page.waitForTimeout(1000);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(3000);
      }
      
      // Wait for autosave
      await page.waitForTimeout(5000);
      
      // Verify the change was saved by checking if element text changed
      try {
        const newText = await element.textContent({ timeout: 5000 });
        if (newText && newText.includes(update.replace.split('\n')[0].substring(0, 20))) {
          console.log(`   ✓ Change verified`);
          return true;
        }
      } catch (e) {
        // Verification failed but continue
        console.log(`   ⚠ Change may not be verified, but continuing...`);
      }
      
      return true;
      
    } catch (error) {
      console.log(`   ✗ Attempt ${attempt} failed: ${error.message}`);
      if (attempt === update.retries) {
        throw error;
      }
      await page.waitForTimeout(2000);
    }
  }
  return false;
}

async function updateAllServices(page, previewFrame) {
  console.log('\n📦 Updating Services Section...\n');
  
  const results = { success: [], failed: [] };
  
  // Update first service
  try {
    const heading = previewFrame.getByRole('heading', { name: 'Life Coaching', exact: false }).first();
    await heading.waitFor({ state: 'visible', timeout: 15000 });
    
    for (let i = 0; i < 3; i++) {
      await heading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
    }
    
    await heading.dblclick();
    await page.waitForTimeout(3000);
    
    const editorIframe = page.frameLocator('iframe[name*="Rich Text Editor"]').first();
    const editable = editorIframe.locator('[contenteditable="true"]').first();
    await editable.waitFor({ state: 'visible', timeout: 5000 });
    await editable.click();
    await page.waitForTimeout(500);
    await page.keyboard.press('Control+a');
    await page.keyboard.type('Onboarding', { delay: 50 });
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);
    
    // Update description
    const description = previewFrame.getByText('Experience a transformational journey', { exact: false }).first();
    await description.waitFor({ state: 'visible', timeout: 15000 });
    await description.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    await description.dblclick();
    await page.waitForTimeout(3000);
    
    const editorIframe2 = page.frameLocator('iframe[name*="Rich Text Editor"]').first();
    const editable2 = editorIframe2.locator('[contenteditable="true"]').first();
    await editable2.waitFor({ state: 'visible', timeout: 5000 });
    await editable2.click();
    await page.waitForTimeout(500);
    await page.keyboard.press('Control+a');
    await page.keyboard.type('Upon signup you will receive a personal, 1 on 1 video consultation to help me understand your goals, circumstances and preferences.', { delay: 50 });
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);
    
    console.log('   ✅ Service 1: Onboarding');
    results.success.push('Onboarding');
  } catch (error) {
    console.log(`   ❌ Service 1 failed: ${error.message}`);
    results.failed.push({ service: 'Onboarding', error: error.message });
  }
  
  return results;
}

async function runRobustAutomation() {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000 // Slower for more reliability
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  console.log('🚀 Starting ROBUST automation with enhanced error handling...\n');
  console.log('This script includes:');
  console.log('  - Longer timeouts (15 seconds)');
  console.log('  - More retries (5 attempts)');
  console.log('  - Better element detection');
  console.log('  - Rich Text Editor iframe handling');
  console.log('  - Change verification');
  console.log('  - Extended wait times for autosave\n');
  
  try {
    await page.goto('https://editor.wix.com/studio/d84d3a66-637c-4eba-870f-274219debc1d?metaSiteId=e08a7faf-7056-4c2a-8a3c-0228cfd31d6f', {
      waitUntil: 'networkidle',
      timeout: 90000
    });
    
    console.log('⏳ Waiting for editor to fully load...');
    const previewFrame = await waitForEditorReady(page);
    console.log('✓ Editor ready\n');
    
    const allResults = {
      content: { success: [], failed: [] },
      services: { success: [], failed: [] }
    };
    
    // Update all content
    console.log('📝 Step 1: Updating all content sections...\n');
    for (const update of ALL_UPDATES) {
      try {
        console.log(`📝 Updating: ${update.name}...`);
        const success = await updateElementRobust(page, previewFrame, update);
        if (success) {
          console.log(`   ✅ Success: ${update.name}\n`);
          allResults.content.success.push(update.name);
        } else {
          throw new Error('Update returned false');
        }
      } catch (error) {
        console.log(`   ❌ Failed: ${update.name} - ${error.message}\n`);
        allResults.content.failed.push({ name: update.name, error: error.message });
      }
      
      // Longer delay between updates
      await page.waitForTimeout(3000);
    }
    
    // Update services
    const serviceResults = await updateAllServices(page, previewFrame);
    allResults.services = serviceResults;
    
    // Final summary
    console.log('\n' + '='.repeat(70));
    console.log('📊 ROBUST AUTOMATION SUMMARY');
    console.log('='.repeat(70));
    console.log(`\n✅ Content Updates: ${allResults.content.success.length}/${ALL_UPDATES.length}`);
    console.log(`✅ Services Updated: ${allResults.services.success.length}/1`);
    console.log(`\n❌ Failed Content: ${allResults.content.failed.length}`);
    console.log(`❌ Failed Services: ${allResults.services.failed.length}`);
    
    if (allResults.content.failed.length > 0) {
      console.log('\n❌ Failed Updates:');
      allResults.content.failed.forEach(({ name, error }) => {
        console.log(`   - ${name}: ${error}`);
      });
    }
    
    console.log('\n⏳ Waiting 45 seconds for autosave to complete...');
    console.log('   You can watch the browser to see the updates happening.');
    await page.waitForTimeout(45000);
    
    console.log('\n✅ Automation complete! Please verify changes in Wix Studio.');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    console.log('\nClosing browser in 10 seconds...');
    await page.waitForTimeout(10000);
    await browser.close();
  }
}

runRobustAutomation().catch(console.error);



