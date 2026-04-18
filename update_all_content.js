const { chromium } = require('playwright');

// All content to update
const CONTENT = {
  businessName: 'Beckford Fitness',
  hero: {
    heading: 'Transform your fitness journey with personalized 1-on-1 training, life coaching, and nutrition guidance',
    subheading: 'Sean Beckford brings 11 years of experience and 9 professional certifications to create custom programs that deliver real results.\n\nTrain virtually from anywhere or in-person in Downtown Toronto. Access your programming, video demonstrations, and 24/7 support through the beckfordfitness app. Flexible packages from $299/month or individual sessions available.\n\nOur holistic approach combines functional movement, evidence-based nutrition, and recovery methods to help you achieve lasting transformation.',
    button1: 'Start Your Journey',
    button2: 'Schedule Free Consultation'
  },
  about: {
    heading: "Hi! I'm Sean",
    content: `I've been a Fitness Trainer for 11 years and I've been fortunate to learn from the best at some of the top fitness gyms in North America throughout my career. My journey in fitness began with a passion for helping people transform not just their bodies, but their entire approach to health and wellness.

I put everything I have into ensuring my clients improve their bodies and lives. My commitment to continuing education throughout my fitness journey has helped me deliver a great service to my clients through functional movement, nutrition and recovery methods. I believe that true transformation happens when we address the whole person—mind, body, and spirit. That's why my approach goes beyond traditional personal training to include life coaching, nutrition guidance, and holistic wellness practices.

What sets my practice apart is the personalized attention I give to each client. Every program is tailored specifically to your goals, circumstances, and preferences. Whether you're training for a specific event, recovering from an injury, or simply looking to improve your overall quality of life, I work with you to create a sustainable path forward.

My training philosophy centers on functional movement, proper form, and evidence-based methods. I combine strength training, mobility work, and recovery techniques to help you move better, feel stronger, and live more fully. Through my iOS and Android app, powered by Trainerize, you'll have access to your programming, video demonstrations, and direct communication with me 24/7.

I'm looking forward to supporting you in your fitness journey. Whether you're just starting out or you're an experienced athlete looking to break through plateaus, I'm here to guide you every step of the way. Together, we'll build strength, improve mobility, and create lasting habits for long-term health and wellness.`
  },
  services: [
    {
      title: 'Onboarding',
      description: 'Upon signup you will receive a personal, 1 on 1 video consultation to help me understand your goals, circumstances and preferences.'
    },
    {
      title: '24/7 Support',
      description: 'When you begin your training program with me, you get unlimited instant messaging access to address any questions you may have and provide assistance.'
    },
    {
      title: 'Training Program',
      description: 'I use the information provided to me during our assessment to build a training program to your needs and goals. This removes the guessing from your workout plans.'
    },
    {
      title: 'iOS & Android App',
      description: 'All your programming is easily accessible via the beckfordfitness app on iOS & Android devices powered by Trainerize. You\'ll also be able to upload information and chat with me directly.'
    },
    {
      title: 'Meal Plan',
      description: 'A complete guide to healthy eating, tailored for you. Caloric intake, macronutrient profiles, easy recipes and shopping lists.'
    },
    {
      title: 'Beyond Fitness',
      description: 'I can help set you up for success through all aspects of a healthy lifestyle, including mindfulness, yoga, reflection and life coaching.'
    },
    {
      title: 'Fascial Stretch Therapy',
      description: 'Specialized stretch therapy service designed to improve flexibility, reduce pain, and enhance recovery.'
    }
  ],
  packages: [
    {
      name: 'Level 1',
      price: '$299/month',
      commitment: '3 month commitment',
      title: '1 on 1 Personalized Assessment & Exercise Guide + Nutrition Guide',
      features: [
        '1 virtual training session per month (1 hour)',
        'Virtual Movement Screening and Personalized Assessment with Sean',
        'Personalized program based on assessment',
        'Nutrition/Strength Training & Programming ebooks',
        'Detailed video demonstration of exercises for all programmed workouts',
        'Track your progress through the beckfordfitness app',
        'Unlimited email support'
      ]
    },
    {
      name: 'Level 2',
      price: '$429/month',
      commitment: '3 month commitment',
      title: '1 on 1 Personalized Assessment, Exercise, Nutrition & Grocery Guides + 24/7 Support, Scheduling of Workouts',
      features: [
        '2 virtual training sessions per month (1 hour per session)',
        'Virtual Movement Screening and Personalized Assessment with Sean',
        'Personalized program based on assessment',
        'Nutrition & Strength Training Programming ebooks',
        'Detailed video demonstration of exercises for all programmed workouts',
        'Track your progress through the beckfordfitness app and communicate with Sean directly',
        'Customized worksheets designed ensure your success with coaching support',
        'Unlimited email support'
      ]
    },
    {
      name: 'Level 3',
      price: '$85-120/session',
      commitment: 'Single session, 4, 8, 12 session packages available at different rates',
      title: 'Work Directly With Sean in Person or Online With or Without Equipment',
      features: [
        'Get coached by Sean directly virtually on FaceTime, Zoom, or Skype. (1 hour) or in person if you live in Downtown Toronto',
        'All online programming features are included with package purchases of 1-on-1 Virtual Personal Training',
        'Track your progress through the beckfordfitness app and communicate with Sean directly anytime through the app',
        'Be held accountable directly by Sean on a weekly Virtual Personal Training schedule through a personalized program that ensures proper form and technique throughout your workout'
      ]
    }
  ]
};

async function updateContent() {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500 
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  // Navigate to Wix editor
  console.log('Navigating to Wix editor...');
  await page.goto('https://editor.wix.com/studio/d84d3a66-637c-4eba-870f-274219debc1d?metaSiteId=e08a7faf-7056-4c2a-8a3c-0228cfd31d6f', {
    waitUntil: 'networkidle'
  });
  
  await page.waitForTimeout(5000); // Wait for editor to fully load
  
  // Remove blocking layers
  console.log('Removing blocking layers...');
  await page.evaluate(() => {
    // Remove blocking layer
    const blockingLayer = document.getElementById('BLOCKING_LAYER');
    if (blockingLayer) {
      blockingLayer.remove();
    }
    
    // Remove overlays
    const overlays = document.querySelectorAll('[class*="overlay"], [class*="blocking"], [id*="BLOCKING"]');
    overlays.forEach(el => {
      el.style.display = 'none';
      el.style.pointerEvents = 'none';
      el.remove();
    });
    
    // Enable pointer events
    document.body.style.pointerEvents = 'auto';
  });
  
  await page.waitForTimeout(2000);
  
  // Strategy 1: Direct DOM manipulation via JavaScript injection
  console.log('Attempting direct DOM updates...');
  
  // Find preview frame
  const frames = page.frames();
  let previewFrame = null;
  
  for (const frame of frames) {
    if (frame.name().includes('preview') || frame.url().includes('preview')) {
      previewFrame = frame;
      break;
    }
  }
  
  // If no preview frame found, try to get it from iframe element
  if (!previewFrame) {
    const iframeHandle = await page.$('iframe[name*="preview"], iframe[src*="preview"]');
    if (iframeHandle) {
      previewFrame = await iframeHandle.contentFrame();
    }
  }
  
  if (previewFrame) {
    console.log('Found preview frame, attempting content updates...');
    
    // Update business name
    try {
      await previewFrame.evaluate((businessName) => {
        // Find all text nodes containing "Business Name"
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );
        
        let node;
        while (node = walker.nextNode()) {
          if (node.textContent.includes('Business Name')) {
            node.textContent = node.textContent.replace(/Business Name/g, businessName);
          }
        }
        
        // Also update any elements with text content
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
          if (el.textContent && el.textContent.includes('Business Name')) {
            el.textContent = el.textContent.replace(/Business Name/g, businessName);
          }
        });
      }, CONTENT.businessName);
      console.log('✓ Updated business name via DOM manipulation');
    } catch (e) {
      console.log('✗ Could not update business name:', e.message);
    }
  }
  
  // Strategy 2: Try to interact with elements directly
  console.log('Attempting interactive updates...');
  
  try {
    // Try to find and click business name in header
    const businessNameSelectors = [
      'a:has-text("Business Name")',
      '[data-testid*="logo"]',
      '[class*="logo"]',
      'a[href="/"]'
    ];
    
    for (const selector of businessNameSelectors) {
      try {
        const element = await previewFrame?.$(selector) || await page.$(selector);
        if (element) {
          // Try double-click via JavaScript
          await element.evaluate((el) => {
            const event = new MouseEvent('dblclick', {
              bubbles: true,
              cancelable: true,
              view: window
            });
            el.dispatchEvent(event);
          });
          
          await page.waitForTimeout(1000);
          
          // Try to type
          await page.keyboard.press('Control+a');
          await page.keyboard.type(CONTENT.businessName);
          await page.keyboard.press('Enter');
          
          console.log(`✓ Updated business name via ${selector}`);
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }
  } catch (e) {
    console.log('✗ Interactive update failed:', e.message);
  }
  
  // Strategy 3: Use keyboard navigation and search
  console.log('Attempting keyboard navigation...');
  
  try {
    // Press Ctrl+F to search
    await page.keyboard.press('Control+f');
    await page.waitForTimeout(500);
    
    // Type "Business Name" to find it
    await page.keyboard.type('Business Name');
    await page.waitForTimeout(1000);
    
    // Press Escape to close search
    await page.keyboard.press('Escape');
    
    // Try to navigate to found element
    // This is a fallback - actual implementation would need more specific logic
  } catch (e) {
    console.log('✗ Keyboard navigation failed:', e.message);
  }
  
  console.log('\n=== Content Update Summary ===');
  console.log('Note: Wix Studio editor requires manual interaction for reliable text editing.');
  console.log('The script attempted multiple strategies:');
  console.log('1. Direct DOM manipulation');
  console.log('2. Interactive element clicking');
  console.log('3. Keyboard navigation');
  console.log('\nFor complete updates, please use the prepared content in:');
  console.log('- WIX_COMPLETE_CONTENT_UPDATE.md');
  console.log('\nBrowser will remain open for manual verification.');
  
  // Keep browser open for 30 seconds for verification
  await page.waitForTimeout(30000);
  
  await browser.close();
}

updateContent().catch(console.error);

