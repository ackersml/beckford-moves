const { chromium } = require('playwright');

const WIX_EDITOR = 'https://editor.wix.com/studio/d84d3a66-637c-4eba-870f-274219debc1d?metaSiteId=e08a7faf-7056-4c2a-8a3c-0228cfd31d6f';
const WIX_PREVIEW = 'https://ackersml.wixstudio.com/personal-training-an';

// All content from live site
const CONTENT = {
  hero: {
    heading: "1 on 1 Personal Training, Life Coaching and Nutrition Guidance",
    sectionTitle: "How It Works"
  },
  services: [
    { title: "Onboarding", desc: "Upon signup you will receive a personal, 1 on 1 video consultation to help me understand your goals, circumstances and preferences." },
    { title: "24/7 Support", desc: "When you begin your training program with me, you get unlimited instant messaging access to address any questions you may have and provide assistance." },
    { title: "Training Program", desc: "I use the information provided to me during our assessment to build a training program to your needs and goals. This removes the guessing from your workout plans." },
    { title: "iOS & Android App", desc: "All your programming is easily accessible via the beckfordfitness app on iOS & Android devices powered by Trainerize. You'll also be able to upload information and chat with me directly." },
    { title: "Meal Plan", desc: "A complete guide to healthy eating, tailored for you. Caloric intake, macronutrient profiles, easy recipes and shopping lists." },
    { title: "Beyond Fitness", desc: "I can help set you up for success through all aspects of a healthy lifestyle, including mindfulness, yoga, reflection and life coaching." }
  ],
  about: {
    sectionTitle: "Get to Know Your Coach",
    heading: "My Story",
    name: "Hi! I'm Sean",
    p1: "I've been a Fitness Trainer for 11 years & I've been fortunate to learn from the best at some of the top fitness gyms in North America throughout my career.",
    p2: "I put everything I have into ensuring my clients improve their bodies and lives. My commitment to continuing education throughout my fitness journey has helped me deliver a great service to my clients through functional movement, nutrition and recovery methods. I'm looking forward to supporting you in your fitness journey.",
    certsHeading: "My current certifications include:",
    certifications: [
      "(NSCA) Certified Strength and Conditioning Specialist – National Strength and Conditioning Association",
      "Registered Massage Therapist (In Training)",
      "Fascial Stretch Therapist (Level 2)",
      "Registered Yoga Teacher (Yoga Alliance Certified)",
      "Precision Nutrition Level 1 & 2 Coach",
      "Certified Pre and Post Natal Coach (CPPC) – Girls' Gone Strong",
      "TRX Coach",
      "FMT Rocktape Level 1 (Kinesology Taping – KT)",
      "Agatsu Speed & Strength Specialist"
    ]
  },
  packages: {
    heading: "Start Your Training Journey Today",
    level1: {
      name: "Level 1",
      title: "1 on 1 Personalized Assessment & Exercise Guide + Nutrition Guide",
      price: "$299/month",
      commitment: "On a 3 month commitment"
    },
    level2: {
      name: "Level 2",
      title: "1 on 1 Personalized Assessment, Exercise, Nutrition & Grocery Guides + 24/7 Support, Scheduling of Workouts",
      price: "$429/month",
      commitment: "On a 3 month commitment"
    },
    level3: {
      name: "Level 3",
      title: "Work Directly With Sean in Person or Online With or Without Equipment",
      price: "$85-120/session",
      commitment: "Single session, 4, 8, 12 session packages available at different rates"
    }
  },
  newsletter: {
    heading: "Sign up to Move with Sean!",
    p1: "You'll be receiving content all on how to move well whether you're in a gym, at home or on the go.",
    p2: "Find out how to balance fitness within your life, and not jump from one random workout program to another.",
    p3: "In the newsletter, you'll also be receiving information on nutrition topics covering blending aesthetics & performance.",
    p4: "Be sure to subscribe for more updates."
  },
  contact: {
    sectionTitle: "SPEAK TO SEAN",
    heading: "Request a Consultation Call"
  },
  instagram: {
    sectionTitle: "@beckford_sean",
    heading: "Fitness & Lifestyle Content",
    buttonText: "Follow on Instagram"
  }
};

async function updateWixContent() {
  console.log('🚀 Starting Wix content update...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  try {
    console.log('📄 Navigating to Wix Editor...');
    await page.goto(WIX_EDITOR, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000);
    
    console.log('✅ Editor loaded');
    console.log('Current URL:', page.url());
    
    // Wait for editor to fully load
    console.log('\n⏳ Waiting for editor to initialize...');
    await page.waitForTimeout(5000);
    
    // Check if we need to log in
    const loginIndicator = await page.locator('text=Sign in, text=Log in').first();
    if (await loginIndicator.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log('⚠️  Login may be required. Please log in manually if prompted.');
      console.log('⏳ Waiting 30 seconds for manual login...');
      await page.waitForTimeout(30000);
    }
    
    // Take screenshot of current state
    await page.screenshot({ path: 'wix_editor_initial.png', fullPage: true });
    console.log('📸 Screenshot saved: wix_editor_initial.png');
    
    // Try to find and interact with the preview iframe
    console.log('\n🔍 Looking for editor elements...');
    
    // Get all frames
    const frames = page.frames();
    console.log(`Found ${frames.length} frames`);
    
    // Try to find the preview frame
    let previewFrame = null;
    for (const frame of frames) {
      const url = frame.url();
      if (url.includes('preview') || url.includes('wixstudio')) {
        previewFrame = frame;
        console.log('✅ Found preview frame:', url);
        break;
      }
    }
    
    if (!previewFrame) {
      // Try to find iframe element
      const iframe = await page.locator('iframe').first();
      if (await iframe.isVisible().catch(() => false)) {
        previewFrame = await iframe.contentFrame();
        console.log('✅ Found preview iframe');
      }
    }
    
    if (previewFrame) {
      console.log('\n📝 Attempting to update content in preview frame...');
      
      // Try to find text elements
      const headings = await previewFrame.locator('h1, h2, h3').all();
      console.log(`Found ${headings.length} headings`);
      
      // Try to update business name first
      const businessName = await previewFrame.locator('text="Business Name", text="Bu ine  Name"').first();
      if (await businessName.isVisible({ timeout: 3000 }).catch(() => false)) {
        console.log('📝 Found "Business Name" - attempting to update...');
        await businessName.dblclick({ timeout: 5000 }).catch(() => {
          console.log('⚠️  Could not double-click. Trying alternative method...');
        });
        await page.waitForTimeout(1000);
        await page.keyboard.press('Control+a');
        await page.keyboard.type('Beckford Fitness');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2000);
        console.log('✅ Updated business name');
      }
    } else {
      console.log('⚠️  Could not find preview frame. Editor structure may be different.');
      console.log('💡 You may need to manually interact with the editor.');
    }
    
    // Create a helper script that can be run in browser console
    const helperScript = `
      // Wix Content Update Helper
      window.wixUpdateContent = function() {
        console.log('🔧 Wix Content Update Helper');
        
        // Find all editable text elements
        const findEditableText = () => {
          const elements = [];
          document.querySelectorAll('*').forEach(el => {
            if (el.textContent && el.textContent.trim()) {
              const text = el.textContent.trim();
              if (text.includes('Business Name') || text.includes('Bu ine  Name')) {
                elements.push({ type: 'businessName', element: el, text });
              }
              if (text.includes('Transform Your Life')) {
                elements.push({ type: 'hero', element: el, text });
              }
            }
          });
          return elements;
        };
        
        const editable = findEditableText();
        console.log('Found editable elements:', editable);
        return editable;
      };
      
      // Highlight elements that need updating
      window.highlightElements = function() {
        const elements = window.wixUpdateContent();
        elements.forEach(item => {
          item.element.style.outline = '3px solid red';
          item.element.style.backgroundColor = 'yellow';
        });
        console.log('✅ Highlighted', elements.length, 'elements');
      };
      
      console.log('✅ Helper functions loaded!');
      console.log('Run: highlightElements() to see what needs updating');
      console.log('Run: wixUpdateContent() to find editable elements');
    `;
    
    // Inject helper script
    await page.evaluate(helperScript);
    console.log('\n✅ Helper script injected into page');
    console.log('💡 You can now use browser console commands:');
    console.log('   - highlightElements() - to see what needs updating');
    console.log('   - wixUpdateContent() - to find editable elements');
    
    // Save content to window for easy access
    await page.evaluate((content) => {
      window.WIX_CONTENT = content;
      console.log('✅ Content loaded into window.WIX_CONTENT');
    }, CONTENT);
    
    console.log('\n📋 Content available in browser console as: window.WIX_CONTENT');
    console.log('\n⏳ Keeping browser open for 60 seconds for manual updates...');
    console.log('💡 Tips:');
    console.log('   1. Double-click any text element to edit');
    console.log('   2. Use window.WIX_CONTENT to access all content');
    console.log('   3. Use highlightElements() to find elements to update');
    
    await page.waitForTimeout(60000);
    
    // Take final screenshot
    await page.screenshot({ path: 'wix_editor_final.png', fullPage: true });
    console.log('\n📸 Final screenshot saved: wix_editor_final.png');
    
  } catch (error) {
    console.error('❌ Error:', error);
    await page.screenshot({ path: 'wix_error.png', fullPage: true });
  } finally {
    console.log('\n✅ Script complete. Browser will close in 5 seconds...');
    await page.waitForTimeout(5000);
    await browser.close();
  }
}

updateWixContent().catch(console.error);

