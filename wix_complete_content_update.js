const { chromium } = require('playwright');

// All content to update
const UPDATES = [
  {
    type: 'text',
    search: 'Business Name',
    replace: 'Beckford Fitness',
    description: 'Business Name in header'
  },
  {
    type: 'text',
    search: '© 2035 by Business Name',
    replace: '© 2025 by Beckford Fitness',
    description: 'Footer copyright'
  },
  {
    type: 'heading',
    search: 'Transform Your Life',
    replace: 'Transform your fitness journey with personalized 1-on-1 training, life coaching, and nutrition guidance',
    description: 'Hero heading'
  },
  {
    type: 'paragraph',
    search: 'Experience personalized fitness and wellness coaching',
    replace: 'Sean Beckford brings 11 years of experience and 9 professional certifications to create custom programs that deliver real results.\n\nTrain virtually from anywhere or in-person in Downtown Toronto. Access your programming, video demonstrations, and 24/7 support through the beckfordfitness app. Flexible packages from $299/month or individual sessions available.\n\nOur holistic approach combines functional movement, evidence-based nutrition, and recovery methods to help you achieve lasting transformation.',
    description: 'Hero subheading'
  },
  {
    type: 'heading',
    search: 'Our Journey Forward',
    replace: "Hi! I'm Sean",
    description: 'About section heading'
  },
  {
    type: 'paragraph',
    search: 'Beckford Fitness, led by seasoned trainer Sean Beckford',
    replace: `I've been a Fitness Trainer for 11 years and I've been fortunate to learn from the best at some of the top fitness gyms in North America throughout my career. My journey in fitness began with a passion for helping people transform not just their bodies, but their entire approach to health and wellness.

I put everything I have into ensuring my clients improve their bodies and lives. My commitment to continuing education throughout my fitness journey has helped me deliver a great service to my clients through functional movement, nutrition and recovery methods. I believe that true transformation happens when we address the whole person—mind, body, and spirit. That's why my approach goes beyond traditional personal training to include life coaching, nutrition guidance, and holistic wellness practices.

What sets my practice apart is the personalized attention I give to each client. Every program is tailored specifically to your goals, circumstances, and preferences. Whether you're training for a specific event, recovering from an injury, or simply looking to improve your overall quality of life, I work with you to create a sustainable path forward.

My training philosophy centers on functional movement, proper form, and evidence-based methods. I combine strength training, mobility work, and recovery techniques to help you move better, feel stronger, and live more fully. Through my iOS and Android app, powered by Trainerize, you'll have access to your programming, video demonstrations, and direct communication with me 24/7.

I'm looking forward to supporting you in your fitness journey. Whether you're just starting out or you're an experienced athlete looking to break through plateaus, I'm here to guide you every step of the way. Together, we'll build strength, improve mobility, and create lasting habits for long-term health and wellness.`,
    description: 'About section content'
  }
];

async function updateContent() {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 800 
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
  
  await page.waitForTimeout(8000);
  
  const previewFrame = page.frameLocator('iframe[name*="preview"]').first();
  
  let successCount = 0;
  let failCount = 0;
  
  for (const update of UPDATES) {
    try {
      console.log(`\nUpdating: ${update.description}...`);
      
      // Try to find the element
      let element;
      
      if (update.type === 'text' || update.type === 'paragraph') {
        element = previewFrame.getByText(update.search, { exact: false }).first();
      } else if (update.type === 'heading') {
        element = previewFrame.getByRole('heading', { name: update.search, exact: false }).first();
      } else {
        element = previewFrame.getByText(update.search, { exact: false }).first();
      }
      
      // Double-click to enter edit mode
      await element.dblclick({ timeout: 5000 });
      await page.waitForTimeout(1000);
      
      // Select all and replace
      await page.keyboard.press('Control+a');
      await page.waitForTimeout(200);
      
      // Type new content
      await page.keyboard.type(update.replace, { delay: 30 });
      await page.waitForTimeout(500);
      
      // Press Enter to save
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      
      console.log(`✓ Successfully updated: ${update.description}`);
      successCount++;
      
    } catch (error) {
      console.log(`✗ Failed to update ${update.description}: ${error.message}`);
      failCount++;
    }
  }
  
  console.log('\n=== Update Summary ===');
  console.log(`Successful updates: ${successCount}`);
  console.log(`Failed updates: ${failCount}`);
  console.log(`Total attempted: ${UPDATES.length}`);
  
  if (failCount > 0) {
    console.log('\nNote: Some updates may require manual editing in the Wix Studio editor.');
    console.log('See WIX_COMPLETE_CONTENT_UPDATE.md for all content ready to copy-paste.');
  }
  
  console.log('\nBrowser will remain open for 15 seconds for verification...');
  await page.waitForTimeout(15000);
  
  await browser.close();
}

updateContent().catch(console.error);



