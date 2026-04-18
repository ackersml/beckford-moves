// Chrome DevTools Console Script for Wix Site Updates
// Run this in the browser console on the Wix preview site

(function() {
  console.log('🔧 Wix Content Update Helper');
  console.log('==========================\n');
  
  // Find all text elements that need updating
  const findElements = () => {
    const elements = {
      businessName: [],
      headings: [],
      buttons: [],
      textContent: []
    };
    
    // Find "Business Name" text
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let node;
    while (node = walker.nextNode()) {
      const text = node.textContent.trim();
      if (text.includes('Business Name') || text.includes('Bu ine  Name')) {
        elements.businessName.push({
          text: text,
          parent: node.parentElement,
          tagName: node.parentElement.tagName,
          className: node.parentElement.className
        });
      }
    }
    
    // Find all headings
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
      elements.headings.push({
        tag: h.tagName,
        text: h.textContent.trim().substring(0, 100),
        element: h
      });
    });
    
    // Find all buttons
    document.querySelectorAll('button, a[role="button"], .button').forEach(b => {
      elements.buttons.push({
        text: b.textContent.trim(),
        href: b.href || null,
        element: b
      });
    });
    
    return elements;
  };
  
  // Display findings
  const elements = findElements();
  
  console.log('📋 Found Elements to Update:\n');
  
  if (elements.businessName.length > 0) {
    console.log('❌ Business Name needs update:');
    elements.businessName.forEach((item, i) => {
      console.log(`  ${i + 1}. ${item.tagName}: "${item.text}"`);
      console.log(`     Class: ${item.className}`);
    });
    console.log('');
  }
  
  console.log('📝 Headings found:');
  elements.headings.slice(0, 10).forEach((h, i) => {
    console.log(`  ${i + 1}. ${h.tag}: "${h.text}"`);
  });
  console.log('');
  
  console.log('🔘 Buttons found:');
  elements.buttons.slice(0, 10).forEach((b, i) => {
    console.log(`  ${i + 1}. "${b.text}"`);
  });
  console.log('');
  
  // Helper function to highlight elements
  window.highlightBusinessName = () => {
    elements.businessName.forEach(item => {
      item.parent.style.outline = '3px solid red';
      item.parent.style.backgroundColor = 'yellow';
    });
    console.log('✅ Highlighted Business Name elements');
  };
  
  // Helper function to get content for updates
  window.getUpdateContent = () => {
    return {
      hero: {
        heading: "1 on 1 Personal Training, Life Coaching and Nutrition Guidance",
        subheading: "Transform your fitness journey with personalized 1-on-1 training, life coaching, and nutrition guidance. Sean Beckford brings 11 years of experience and 9 professional certifications to create custom programs that deliver real results.",
        description: "Train virtually from anywhere or in-person in Downtown Toronto. Access your programming, video demonstrations, and 24/7 support through the beckfordfitness app. Flexible packages from $299/month or individual sessions available.\n\nOur holistic approach combines functional movement, evidence-based nutrition, and recovery methods to help you achieve lasting transformation."
      },
      businessName: "Beckford Fitness",
      services: [
        "Onboarding: Upon signup you will receive a personal, 1 on 1 video consultation to help me understand your goals, circumstances and preferences.",
        "24/7 Support: When you begin your training program with me, you get unlimited instant messaging access to address any questions you may have and provide assistance.",
        "Training Program: I use the information provided to me during our assessment to build a training program to your needs and goals. This removes the guessing from your workout plans.",
        "iOS & Android App: All your programming is easily accessible via the beckfordfitness app on iOS & Android devices powered by Trainerize. You'll also be able to upload information and chat with me directly.",
        "Meal Plan: A complete guide to healthy eating, tailored for you. Caloric intake, macronutrient profiles, easy recipes and shopping lists.",
        "Beyond Fitness: I can help set you up for success through all aspects of a healthy lifestyle, including mindfulness, yoga, reflection and life coaching."
      ]
    };
  };
  
  console.log('💡 Helper Functions Available:');
  console.log('  - highlightBusinessName() - Highlights elements that need "Business Name" update');
  console.log('  - getUpdateContent() - Returns all content ready to copy-paste');
  console.log('');
  console.log('📖 Usage:');
  console.log('  1. Run: highlightBusinessName()');
  console.log('  2. Run: const content = getUpdateContent()');
  console.log('  3. Copy content from the returned object');
  
})();

