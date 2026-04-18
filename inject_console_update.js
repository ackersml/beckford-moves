// This script will be injected into the browser console to update content
// Using Chrome DevTools MCP browser console

const CONTENT = {
  businessName: "Beckford Fitness",
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
  }
};

// Find and highlight elements
function findAndHighlight(searchText) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  const matches = [];
  let node;
  while (node = walker.nextNode()) {
    if (node.textContent.includes(searchText)) {
      const parent = node.parentElement;
      parent.style.outline = '3px solid red';
      parent.style.backgroundColor = 'yellow';
      matches.push({ node, parent, text: node.textContent.trim() });
    }
  }
  console.log(`✅ Found ${matches.length} matches for "${searchText}"`);
  return matches;
}

// Make content available
window.WIX_CONTENT = CONTENT;
window.findAndHighlight = findAndHighlight;

console.log('✅ Content loaded! Use findAndHighlight("Business Name") to find elements');
console.log('Content available at: window.WIX_CONTENT');

