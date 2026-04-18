const { chromium } = require('playwright');
const fs = require('fs');

const LIVE_SITE = 'https://beckfordfitness.com/';
const WIX_EDITOR = 'https://editor.wix.com/studio/d84d3a66-637c-4eba-870f-274219debc1d?metaSiteId=e08a7faf-7056-4c2a-8a3c-0228cfd31d6f';
const WIX_PREVIEW = 'https://ackersml.wixstudio.com/personal-training-an';

async function extractContent() {
  console.log('📄 Extracting content from:', LIVE_SITE);
  
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  
  try {
    await page.goto(LIVE_SITE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    // Close cookie dialog if present
    try {
      await page.click('button:has-text("Accept"), button:has-text("Close")', { timeout: 2000 });
    } catch (e) {}
    
    // Extract all content
    const content = await page.evaluate(() => {
      const extractText = (selector) => {
        const elements = document.querySelectorAll(selector);
        return Array.from(elements).map(el => el.textContent.trim()).filter(t => t);
      };
      
      const extractImages = () => {
        const images = document.querySelectorAll('img');
        return Array.from(images).map(img => ({
          src: img.src,
          alt: img.alt,
          width: img.naturalWidth,
          height: img.naturalHeight
        })).filter(img => img.src && !img.src.includes('data:image'));
      };
      
      return {
        title: document.title,
        hero: {
          heading: document.querySelector('h1')?.textContent.trim() || '',
          subheading: document.querySelector('h1')?.nextElementSibling?.textContent.trim() || '',
          description: Array.from(document.querySelectorAll('p')).find(p => 
            p.textContent.includes('Transform') || p.textContent.includes('Sean Beckford')
          )?.textContent.trim() || ''
        },
        services: extractText('h2, h3').filter(h => 
          h.includes('Onboarding') || h.includes('Support') || h.includes('Training') || 
          h.includes('App') || h.includes('Meal') || h.includes('Beyond')
        ),
        about: {
          heading: document.querySelector('h1:has-text("My Story"), h2:has-text("My Story")')?.textContent.trim() || '',
          name: document.querySelector('h3, h4')?.textContent.includes('Sean') ? 
            document.querySelector('h3, h4').textContent.trim() : '',
          paragraphs: extractText('p').filter(p => 
            p.includes('Fitness Trainer') || p.includes('11 years') || p.includes('clients')
          ),
          certifications: extractText('li').filter(li => 
            li.includes('NSCA') || li.includes('Certified') || li.includes('Therapist') || 
            li.includes('Yoga') || li.includes('Nutrition') || li.includes('TRX')
          )
        },
        packages: {
          level1: {
            title: document.querySelector('h3, h4')?.textContent.includes('Level 1') ? 
              document.querySelector('h3, h4').textContent.trim() : '',
            price: extractText('*').find(t => t.includes('$299')) || '',
            features: extractText('li').filter(li => 
              li.includes('virtual training') || li.includes('assessment') || 
              li.includes('program') || li.includes('ebooks')
            )
          }
        },
        newsletter: {
          heading: extractText('h2, h3').find(h => h.includes('Move with') || h.includes('Newsletter')) || '',
          paragraphs: extractText('p').filter(p => 
            p.includes('move well') || p.includes('gym') || p.includes('fitness within your life')
          )
        },
        contact: {
          heading: extractText('h1, h2').find(h => h.includes('SPEAK') || h.includes('Consultation')) || '',
          subheading: extractText('h1, h2, h3').find(h => h.includes('Request') || h.includes('Consultation')) || ''
        },
        images: extractImages(),
        allHeadings: extractText('h1, h2, h3, h4, h5, h6'),
        allParagraphs: extractText('p'),
        navigation: extractText('nav a, header a').filter(a => a && a.length < 50)
      };
    });
    
    // Save extracted content
    fs.writeFileSync('extracted_content.json', JSON.stringify(content, null, 2));
    console.log('✅ Content extracted and saved to extracted_content.json');
    
    // Create markdown summary
    const markdown = `# Content Extracted from ${LIVE_SITE}

## Hero Section
**Heading:** ${content.hero.heading}
**Description:** ${content.hero.description.substring(0, 200)}...

## Services
${content.services.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## About Section
**Name:** ${content.about.name}
**Paragraphs:** ${content.about.paragraphs.length} found
**Certifications:** ${content.about.certifications.length} found

## Packages
**Level 1 Price:** ${content.packages.level1.price}

## Newsletter
**Heading:** ${content.newsletter.heading}

## Contact
**Heading:** ${content.contact.heading}

## Images Found
${content.images.length} images extracted

## Navigation
${content.navigation.join(', ')}

---
Full content saved to: extracted_content.json
`;
    
    fs.writeFileSync('extracted_content_summary.md', markdown);
    console.log('✅ Summary saved to extracted_content_summary.md');
    
    // Take full page screenshot
    await page.screenshot({ path: 'beckfordfitness_live_site.png', fullPage: true });
    console.log('📸 Screenshot saved to beckfordfitness_live_site.png');
    
    console.log('\n📋 Next Steps:');
    console.log('1. Review extracted_content.json');
    console.log('2. Open Wix Editor:', WIX_EDITOR);
    console.log('3. Copy content from extracted_content.json to Wix');
    
    await page.waitForTimeout(5000);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

extractContent().catch(console.error);

