const { chromium } = require('playwright');

// Comprehensive content updates
const CONTENT_UPDATES = {
  businessName: {
    search: 'Business Name',
    replace: 'Beckford Fitness',
    selector: 'link'
  },
  footer: {
    search: '© 2035 by Business Name',
    replace: '© 2025 by Beckford Fitness',
    selector: 'paragraph'
  },
  heroHeading: {
    search: 'Transform Your Life',
    replace: 'Transform your fitness journey with personalized 1-on-1 training, life coaching, and nutrition guidance',
    selector: 'heading'
  },
  heroText: {
    search: 'Experience personalized fitness and wellness coaching',
    replace: 'Sean Beckford brings 11 years of experience and 9 professional certifications to create custom programs that deliver real results.\n\nTrain virtually from anywhere or in-person in Downtown Toronto. Access your programming, video demonstrations, and 24/7 support through the beckfordfitness app. Flexible packages from $299/month or individual sessions available.\n\nOur holistic approach combines functional movement, evidence-based nutrition, and recovery methods to help you achieve lasting transformation.',
    selector: 'paragraph'
  },
  aboutHeading: {
    search: 'Our Journey Forward',
    replace: "Hi! I'm Sean",
    selector: 'heading'
  },
  aboutText: {
    search: 'Beckford Fitness, led by seasoned trainer',
    replace: `I've been a Fitness Trainer for 11 years and I've been fortunate to learn from the best at some of the top fitness gyms in North America throughout my career. My journey in fitness began with a passion for helping people transform not just their bodies, but their entire approach to health and wellness.

I put everything I have into ensuring my clients improve their bodies and lives. My commitment to continuing education throughout my fitness journey has helped me deliver a great service to my clients through functional movement, nutrition and recovery methods. I believe that true transformation happens when we address the whole person—mind, body, and spirit. That's why my approach goes beyond traditional personal training to include life coaching, nutrition guidance, and holistic wellness practices.

What sets my practice apart is the personalized attention I give to each client. Every program is tailored specifically to your goals, circumstances, and preferences. Whether you're training for a specific event, recovering from an injury, or simply looking to improve your overall quality of life, I work with you to create a sustainable path forward.

My training philosophy centers on functional movement, proper form, and evidence-based methods. I combine strength training, mobility work, and recovery techniques to help you move better, feel stronger, and live more fully. Through my iOS and Android app, powered by Trainerize, you'll have access to your programming, video demonstrations, and direct communication with me 24/7.

I'm looking forward to supporting you in your fitness journey. Whether you're just starting out or you're an experienced athlete looking to break through plateaus, I'm here to guide you every step of the way. Together, we'll build strength, improve mobility, and create lasting habits for long-term health and wellness.`,
    selector: 'paragraph'
  },
  buttonGetStarted: {
    search: 'Get Started',
    replace: 'Start Your Journey',
    selector: 'button'
  },
  buttonLearnMore: {
    search: 'Learn More',
    replace: 'Schedule Free Consultation',
    selector: 'button'
  }
};

async function updateWixContent() {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 600 
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  console.log('🚀 Starting Wix content update automation...\n');
  
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
    
    // Update each content item
    for (const [key, update] of Object.entries(CONTENT_UPDATES)) {
      try {
        console.log(`📝 Updating: ${key}...`);
        
        let element;
        const searchText = update.search;
        
        // Find element based on selector type
        if (update.selector === 'link') {
          element = previewFrame.getByRole('link', { name: searchText, exact: false }).first();
        } else if (update.selector === 'heading') {
          element = previewFrame.getByRole('heading', { name: searchText, exact: false }).first();
        } else if (update.selector === 'button') {
          element = previewFrame.getByRole('button', { name: searchText, exact: false }).first();
        } else {
          // Try paragraph or generic text
          element = previewFrame.getByText(searchText, { exact: false }).first();
        }
        
        // Wait for element to be visible
        await element.waitFor({ state: 'visible', timeout: 5000 });
        
        // Double-click to enter edit mode
        await element.dblclick();
        await page.waitForTimeout(1200);
        
        // Select all existing text
        await page.keyboard.press('Control+a');
        await page.waitForTimeout(300);
        
        // Clear and type new content
        await page.keyboard.press('Backspace');
        await page.waitForTimeout(200);
        
        // Type new content with delay for reliability
        const textToType = update.replace;
        await page.keyboard.type(textToType, { delay: 40 });
        await page.waitForTimeout(500);
        
        // Save by pressing Enter
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1000);
        
        console.log(`   ✓ Successfully updated: ${key}`);
        results.success.push(key);
        
      } catch (error) {
        console.log(`   ✗ Failed: ${key} - ${error.message}`);
        results.failed.push({ key, error: error.message });
      }
    }
    
    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 UPDATE SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Successful: ${results.success.length}`);
    console.log(`❌ Failed: ${results.failed.length}`);
    console.log(`📈 Success Rate: ${((results.success.length / Object.keys(CONTENT_UPDATES).length) * 100).toFixed(1)}%`);
    
    if (results.success.length > 0) {
      console.log('\n✅ Successfully Updated:');
      results.success.forEach(key => console.log(`   - ${key}`));
    }
    
    if (results.failed.length > 0) {
      console.log('\n❌ Failed Updates:');
      results.failed.forEach(({ key, error }) => {
        console.log(`   - ${key}: ${error}`);
      });
      console.log('\n💡 Tip: Failed updates can be completed manually using WIX_COMPLETE_CONTENT_UPDATE.md');
    }
    
    console.log('\n⏳ Browser will remain open for 20 seconds for verification...');
    await page.waitForTimeout(20000);
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    await browser.close();
  }
}

updateWixContent().catch(console.error);



