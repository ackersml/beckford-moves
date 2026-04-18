const { chromium } = require('playwright');
const fs = require('fs');

const WIX_PREVIEW_URL = 'https://ackersml.wixstudio.com/personal-training-an';

// Content to update from LANDING_PAGE_TEXT.md
const CONTENT_UPDATES = {
  hero: {
    heading: "1 on 1 Personal Training, Life Coaching and Nutrition Guidance",
    subheading: "Transform your fitness journey with personalized 1-on-1 training, life coaching, and nutrition guidance. Sean Beckford brings 11 years of experience and 9 professional certifications to create custom programs that deliver real results.",
    description: "Train virtually from anywhere or in-person in Downtown Toronto. Access your programming, video demonstrations, and 24/7 support through the beckfordfitness app. Flexible packages from $299/month or individual sessions available.\n\nOur holistic approach combines functional movement, evidence-based nutrition, and recovery methods to help you achieve lasting transformation."
  },
  businessName: "Beckford Fitness",
  services: [
    {
      title: "Onboarding",
      description: "Upon signup you will receive a personal, 1 on 1 video consultation to help me understand your goals, circumstances and preferences."
    },
    {
      title: "24/7 Support",
      description: "When you begin your training program with me, you get unlimited instant messaging access to address any questions you may have and provide assistance."
    },
    {
      title: "Training Program",
      description: "I use the information provided to me during our assessment to build a training program to your needs and goals. This removes the guessing from your workout plans."
    },
    {
      title: "iOS & Android App",
      description: "All your programming is easily accessible via the beckfordfitness app on iOS & Android devices powered by Trainerize. You'll also be able to upload information and chat with me directly."
    },
    {
      title: "Meal Plan",
      description: "A complete guide to healthy eating, tailored for you. Caloric intake, macronutrient profiles, easy recipes and shopping lists."
    },
    {
      title: "Beyond Fitness",
      description: "I can help set you up for success through all aspects of a healthy lifestyle, including mindfulness, yoga, reflection and life coaching."
    }
  ]
};

async function inspectWixSite() {
  console.log('🔍 Inspecting Wix site...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  try {
    console.log('📄 Navigating to:', WIX_PREVIEW_URL);
    await page.goto(WIX_PREVIEW_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    console.log('✅ Page loaded\n');
    
    // Extract all text content
    const pageContent = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
        tag: h.tagName,
        text: h.textContent.trim(),
        id: h.id,
        className: h.className
      }));
      
      const buttons = Array.from(document.querySelectorAll('button, a[role="button"]')).map(b => ({
        text: b.textContent.trim(),
        href: b.href || null
      }));
      
      const allText = document.body.innerText;
      
      return { headings, buttons, allText };
    });
    
    console.log('📊 Found Headings:');
    pageContent.headings.forEach((h, i) => {
      if (h.text) {
        console.log(`  ${i + 1}. ${h.tag}: "${h.text.substring(0, 80)}${h.text.length > 80 ? '...' : ''}"`);
      }
    });
    
    console.log('\n🔘 Found Buttons/Links:');
    pageContent.buttons.slice(0, 10).forEach((b, i) => {
      if (b.text) {
        console.log(`  ${i + 1}. "${b.text}" ${b.href ? `(${b.href})` : ''}`);
      }
    });
    
    // Check what needs updating
    console.log('\n📝 Content Update Checklist:');
    console.log(`  [${pageContent.allText.includes('Business Name') ? '❌' : '✅'}] Business Name needs update`);
    console.log(`  [${pageContent.allText.includes('Beckford Fitness') ? '✅' : '❌'}] Beckford Fitness name present`);
    console.log(`  [${pageContent.allText.includes('Sean Beckford') ? '✅' : '❌'}] Sean Beckford mentioned`);
    console.log(`  [${pageContent.allText.includes('11 years') ? '✅' : '❌'}] Experience mentioned`);
    console.log(`  [${pageContent.allText.includes('$299') ? '✅' : '❌'}] Pricing mentioned`);
    
    // Save inspection report
    const report = {
      url: WIX_PREVIEW_URL,
      inspectedAt: new Date().toISOString(),
      headings: pageContent.headings,
      buttons: pageContent.buttons,
      needsUpdate: {
        businessName: pageContent.allText.includes('Business Name'),
        heroSection: !pageContent.allText.includes('Sean Beckford'),
        services: !pageContent.allText.includes('Onboarding'),
        packages: !pageContent.allText.includes('$299')
      }
    };
    
    fs.writeFileSync('wix_inspection_report.json', JSON.stringify(report, null, 2));
    console.log('\n💾 Inspection report saved to: wix_inspection_report.json');
    
    // Take screenshot
    await page.screenshot({ path: 'wix_current_state.png', fullPage: true });
    console.log('📸 Screenshot saved to: wix_current_state.png');
    
    console.log('\n✅ Inspection complete!');
    console.log('\n📋 Next Steps:');
    console.log('1. Open Wix Editor: https://editor.wix.com/studio/d84d3a66-637c-4eba-870f-274219debc1d');
    console.log('2. Use the content from LANDING_PAGE_TEXT.md');
    console.log('3. Update elements by double-clicking text');
    console.log('4. See wix_inspection_report.json for details');
    
    // Keep browser open
    console.log('\n⏳ Browser will stay open for 60 seconds for manual inspection...');
    await page.waitForTimeout(60000);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

inspectWixSite().catch(console.error);

