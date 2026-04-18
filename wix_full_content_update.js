const { chromium } = require('playwright');

// All content updates organized by section
const ALL_UPDATES = [
  // Business Name
  {
    name: 'Business Name (Header)',
    type: 'link',
    search: 'Business Name',
    replace: 'Beckford Fitness',
    retries: 3
  },
  // Footer
  {
    name: 'Footer Copyright',
    type: 'text',
    search: '© 2035 by Business Name',
    replace: '© 2025 by Beckford Fitness',
    retries: 3
  },
  // Hero Section
  {
    name: 'Hero Heading',
    type: 'heading',
    search: 'Transform Your Life',
    replace: 'Transform your fitness journey with personalized 1-on-1 training, life coaching, and nutrition guidance',
    retries: 3
  },
  {
    name: 'Hero Paragraph',
    type: 'paragraph',
    search: 'Experience personalized fitness and wellness coaching',
    replace: 'Sean Beckford brings 11 years of experience and 9 professional certifications to create custom programs that deliver real results.\n\nTrain virtually from anywhere or in-person in Downtown Toronto. Access your programming, video demonstrations, and 24/7 support through the beckfordfitness app. Flexible packages from $299/month or individual sessions available.\n\nOur holistic approach combines functional movement, evidence-based nutrition, and recovery methods to help you achieve lasting transformation.',
    retries: 3
  },
  {
    name: 'Hero Button - Get Started',
    type: 'button',
    search: 'Get Started',
    replace: 'Start Your Journey',
    retries: 2
  },
  // About Section
  {
    name: 'About Heading',
    type: 'heading',
    search: 'Our Journey Forward',
    replace: "Hi! I'm Sean",
    retries: 3
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
    retries: 3
  },
  {
    name: 'About Button - Learn More',
    type: 'button',
    search: 'Learn More',
    replace: 'Schedule Free Consultation',
    retries: 2
  },
  // Services Section
  {
    name: 'Service - Life Coaching Heading',
    type: 'heading',
    search: 'Life Coaching',
    replace: 'Onboarding',
    retries: 2
  },
  {
    name: 'Service - Life Coaching Description',
    type: 'paragraph',
    search: 'Experience a transformational journey with our life coaching services',
    replace: 'Upon signup you will receive a personal, 1 on 1 video consultation to help me understand your goals, circumstances and preferences.',
    retries: 2
  }
];

async function updateElement(page, previewFrame, update) {
  for (let attempt = 1; attempt <= update.retries; attempt++) {
    try {
      console.log(`   Attempt ${attempt}/${update.retries}...`);
      
      let element;
      
      // Find element based on type
      if (update.type === 'link') {
        element = previewFrame.getByRole('link', { name: update.search, exact: false }).first();
      } else if (update.type === 'heading') {
        element = previewFrame.getByRole('heading', { name: update.search, exact: false }).first();
      } else if (update.type === 'button') {
        element = previewFrame.getByRole('button', { name: update.search, exact: false }).first();
      } else {
        element = previewFrame.getByText(update.search, { exact: false }).first();
      }
      
      // Wait for element
      await element.waitFor({ state: 'visible', timeout: 5000 });
      
      // Scroll element into view
      await element.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Double-click to enter edit mode
      await element.dblclick();
      await page.waitForTimeout(1500);
      
      // Select all
      await page.keyboard.press('Control+a');
      await page.waitForTimeout(300);
      
      // Clear
      await page.keyboard.press('Backspace');
      await page.waitForTimeout(200);
      
      // Type new content
      const textLines = update.replace.split('\n');
      for (let i = 0; i < textLines.length; i++) {
        await page.keyboard.type(textLines[i], { delay: 30 });
        if (i < textLines.length - 1) {
          await page.keyboard.press('Shift+Enter');
          await page.waitForTimeout(100);
        }
      }
      
      await page.waitForTimeout(500);
      
      // Save
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1500);
      
      return true;
      
    } catch (error) {
      if (attempt === update.retries) {
        throw error;
      }
      console.log(`   Retrying after error: ${error.message}`);
      await page.waitForTimeout(1000);
    }
  }
  return false;
}

async function updateAllContent() {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500 
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  console.log('🚀 Starting comprehensive Wix content update...\n');
  
  try {
    await page.goto('https://editor.wix.com/studio/d84d3a66-637c-4eba-870f-274219debc1d?metaSiteId=e08a7faf-7056-4c2a-8a3c-0228cfd31d6f', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    await page.waitForTimeout(8000);
    
    const previewFrame = page.frameLocator('iframe[name*="preview"]').first();
    
    const results = {
      success: [],
      failed: []
    };
    
    // Update each item
    for (const update of ALL_UPDATES) {
      try {
        console.log(`📝 Updating: ${update.name}...`);
        
        const success = await updateElement(page, previewFrame, update);
        
        if (success) {
          console.log(`   ✅ Success: ${update.name}`);
          results.success.push(update.name);
        } else {
          throw new Error('Update failed after retries');
        }
        
      } catch (error) {
        console.log(`   ❌ Failed: ${update.name} - ${error.message}`);
        results.failed.push({ name: update.name, error: error.message });
      }
      
      // Small delay between updates
      await page.waitForTimeout(1000);
    }
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 FINAL UPDATE SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successful Updates: ${results.success.length}/${ALL_UPDATES.length}`);
    console.log(`❌ Failed Updates: ${results.failed.length}/${ALL_UPDATES.length}`);
    console.log(`📈 Success Rate: ${((results.success.length / ALL_UPDATES.length) * 100).toFixed(1)}%`);
    
    if (results.success.length > 0) {
      console.log('\n✅ Successfully Updated:');
      results.success.forEach(name => console.log(`   ✓ ${name}`));
    }
    
    if (results.failed.length > 0) {
      console.log('\n❌ Failed Updates (can be completed manually):');
      results.failed.forEach(({ name, error }) => {
        console.log(`   ✗ ${name}`);
        console.log(`     Error: ${error}`);
      });
      console.log('\n💡 Tip: See WIX_COMPLETE_CONTENT_UPDATE.md for manual update instructions');
    }
    
    console.log('\n⏳ Browser will remain open for 30 seconds for verification...');
    console.log('   You can check the updates in the Wix Studio editor.');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    await browser.close();
  }
}

updateAllContent().catch(console.error);



