const { chromium } = require('playwright');

const WIX_EDITOR = 'https://editor.wix.com/studio/d84d3a66-637c-4eba-870f-274219debc1d?metaSiteId=e08a7faf-7056-4c2a-8a3c-0228cfd31d6f';

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
    level1: { name: "Level 1", title: "1 on 1 Personalized Assessment & Exercise Guide + Nutrition Guide", price: "$299/month", commitment: "On a 3 month commitment" },
    level2: { name: "Level 2", title: "1 on 1 Personalized Assessment, Exercise, Nutrition & Grocery Guides + 24/7 Support, Scheduling of Workouts", price: "$429/month", commitment: "On a 3 month commitment" },
    level3: { name: "Level 3", title: "Work Directly With Sean in Person or Online With or Without Equipment", price: "$85-120/session", commitment: "Single session, 4, 8, 12 session packages available at different rates" }
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

// Console helper script
const CONSOLE_SCRIPT = `
(function() {
  const CONTENT = ${JSON.stringify(CONTENT, null, 2)};
  
  window.findText = function(searchText) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const matches = [];
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent.includes(searchText)) {
        matches.push({ node, parent: node.parentElement, text: node.textContent.trim() });
      }
    }
    return matches;
  };
  
  window.highlight = function(searchText, color = 'yellow') {
    const matches = window.findText(searchText);
    matches.forEach(m => {
      m.parent.style.outline = '3px solid red';
      m.parent.style.backgroundColor = color;
    });
    console.log(\`✅ Highlighted \${matches.length} elements: "\${searchText}"\`);
    return matches;
  };
  
  window.updateBusinessName = () => window.highlight('Business Name');
  window.findHero = () => window.highlight('Transform Your Life');
  window.getContent = () => CONTENT;
  window.WIX_CONTENT = CONTENT;
  
  window.printContent = function() {
    console.log('\\n📋 Available Content:\\n');
    console.log('HERO:', CONTENT.hero.heading);
    console.log('SERVICES:', CONTENT.services.length, 'items');
    console.log('ABOUT:', CONTENT.about.name);
    console.log('PACKAGES: 3 levels');
    console.log('NEWSLETTER:', CONTENT.newsletter.heading);
    console.log('CONTACT:', CONTENT.contact.heading);
  };
  
  console.log('✅ Console helpers loaded!');
  console.log('Commands: updateBusinessName(), findHero(), highlight("text"), getContent(), printContent()');
  console.log('Content: window.WIX_CONTENT');
})();
`;

async function buildWithConsole() {
  console.log('🚀 Opening Wix Editor with Console Helpers...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();
  
  try {
    console.log('📄 Navigating to Wix Editor...');
    await page.goto(WIX_EDITOR, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(5000);
    
    console.log('⏳ Waiting for editor to load...');
    console.log('💡 If login is required, please log in now...');
    await page.waitForTimeout(10000);
    
    // Inject console helpers
    console.log('\n🔧 Injecting console helpers...');
    await page.evaluate(CONSOLE_SCRIPT);
    console.log('✅ Console helpers injected!');
    
    // Try to find and work with preview frame
    console.log('\n🔍 Looking for preview frame...');
    const frames = page.frames();
    let previewFrame = frames.find(f => f.url().includes('preview') || f.url().includes('wixstudio'));
    
    if (!previewFrame) {
      // Try to find iframe
      const iframeHandle = await page.$('iframe').catch(() => null);
      if (iframeHandle) {
        previewFrame = await iframeHandle.contentFrame();
      }
    }
    
    if (previewFrame) {
      console.log('✅ Found preview frame');
      
      // Inject helpers into preview frame
      await previewFrame.evaluate(CONSOLE_SCRIPT);
      console.log('✅ Helpers injected into preview frame');
      
      // Try to find "Business Name" in preview
      const businessNameMatches = await previewFrame.evaluate(() => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        const matches = [];
        let node;
        while (node = walker.nextNode()) {
          if (node.textContent.includes('Business Name') || node.textContent.includes('Bu ine  Name')) {
            matches.push({
              text: node.textContent.trim(),
              tagName: node.parentElement.tagName,
              id: node.parentElement.id,
              className: node.parentElement.className
            });
          }
        }
        return matches;
      });
      
      if (businessNameMatches.length > 0) {
        console.log(`\n✅ Found ${businessNameMatches.length} "Business Name" elements in preview`);
        businessNameMatches.forEach((m, i) => {
          console.log(`  ${i+1}. ${m.tagName}: "${m.text.substring(0, 50)}..."`);
        });
      }
    }
    
    // Take screenshot
    await page.screenshot({ path: 'wix_console_ready.png', fullPage: true });
    console.log('\n📸 Screenshot saved: wix_console_ready.png');
    
    console.log('\n✅ Setup Complete!');
    console.log('\n📋 Console Commands Available:');
    console.log('   updateBusinessName() - Find Business Name');
    console.log('   findHero() - Find hero section');
    console.log('   highlight("text") - Highlight any text');
    console.log('   getContent() - Get all content');
    console.log('   printContent() - Print content structure');
    console.log('   window.WIX_CONTENT - Direct content access');
    console.log('\n💡 Open browser console (F12) and use these commands!');
    console.log('\n⏳ Browser will stay open for manual updates...');
    
    // Keep browser open
    await page.waitForTimeout(300000); // 5 minutes
    
  } catch (error) {
    console.error('❌ Error:', error);
    await page.screenshot({ path: 'wix_error.png', fullPage: true });
  } finally {
    await browser.close();
  }
}

buildWithConsole().catch(console.error);

