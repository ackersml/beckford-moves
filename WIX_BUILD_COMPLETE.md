# Wix Content Build - Complete Setup

## ✅ What's Been Created

### 1. Content Extraction
- ✅ All content extracted from https://beckfordfitness.com/
- ✅ Content documented in markdown files
- ✅ JSON structure created for programmatic access

### 2. Playwright Scripts
- ✅ `wix_automated_content_builder.js` - Automated content builder
- ✅ `wix_interactive_builder.js` - Interactive builder with console helpers
- ✅ `copy_content_to_wix_playwright.js` - Image extraction and content preparation

### 3. Chrome DevTools Scripts
- ✅ `wix_content_injection_script.js` - Browser console helper (copied to clipboard)
- ✅ `chrome_devtools_wix_helper.js` - Element finder and highlighter

### 4. Documentation
- ✅ `BECKFORDFITNESS_CONTENT_FROM_LIVE_SITE.md` - Complete content
- ✅ `WIX_COPY_INSTRUCTIONS.md` - Step-by-step guide
- ✅ `READY_TO_COPY_TO_WIX.md` - Quick reference

## 🚀 How to Use

### Option 1: Interactive Builder (Recommended)

1. **Run the interactive builder:**
   ```bash
   node wix_interactive_builder.js
   ```

2. **Browser will open with:**
   - Wix editor loaded
   - Console helpers injected
   - All content available as `window.WIX_CONTENT`

3. **Open browser console:**
   - **Mac:** `Cmd + Option + J` (Chrome) or `Cmd + Option + I`
   - **Windows/Linux:** `F12` or `Ctrl + Shift + J`

4. **Use console commands:**
   ```javascript
   // Find elements to update
   updateBusinessName()
   findHero()
   highlight("Business Name")
   
   // Get content
   getContent()
   printContent()
   
   // Access content directly
   window.WIX_CONTENT.hero.heading
   window.WIX_CONTENT.services[0].title
   ```

4. **Update elements:**
   - Double-click highlighted elements
   - Copy content from `window.WIX_CONTENT`
   - Paste into editor

### Option 2: Manual with Chrome DevTools

1. **Open Wix Editor:**
   https://editor.wix.com/studio/d84d3a66-637c-4eba-870f-274219debc1d

2. **Open Browser Console** (F12 or Cmd+Option+I)

3. **Paste the helper script:**
   - Script is in: `wix_content_injection_script.js`
   - Or use the one copied to clipboard

4. **Use helper functions:**
   ```javascript
   updateBusinessName()  // Find and highlight Business Name
   findText("Transform") // Find any text
   highlight("text")     // Highlight matching elements
   getContent()          // Get all content
   ```

### Option 3: Automated Builder

1. **Run automated builder:**
   ```bash
   node wix_automated_content_builder.js
   ```

2. **Script will:**
   - Open Wix editor
   - Inject helper functions
   - Highlight elements that need updating
   - Keep browser open for manual updates

## 📋 Content Structure

All content is available in `window.WIX_CONTENT`:

```javascript
{
  hero: {
    heading: "1 on 1 Personal Training, Life Coaching and Nutrition Guidance",
    sectionTitle: "How It Works"
  },
  services: [6 items],
  about: {
    name: "Hi! I'm Sean",
    p1: "...",
    p2: "...",
    certifications: [9 items]
  },
  packages: {
    level1: { name, title, price, commitment },
    level2: { name, title, price, commitment },
    level3: { name, title, price, commitment }
  },
  newsletter: { heading, p1, p2, p3, p4 },
  contact: { sectionTitle, heading },
  instagram: { sectionTitle, heading, buttonText }
}
```

## 🎯 Quick Update Checklist

### Hero Section
- [ ] Heading: `window.WIX_CONTENT.hero.heading`
- [ ] Section Title: `window.WIX_CONTENT.hero.sectionTitle`

### Services (6 items)
- [ ] Loop through: `window.WIX_CONTENT.services`
- [ ] Update each: `title` and `desc`

### About Section
- [ ] Name: `window.WIX_CONTENT.about.name`
- [ ] Paragraphs: `window.WIX_CONTENT.about.p1`, `p2`
- [ ] Certifications: `window.WIX_CONTENT.about.certifications`

### Packages (3 levels)
- [ ] Level 1: `window.WIX_CONTENT.packages.level1`
- [ ] Level 2: `window.WIX_CONTENT.packages.level2`
- [ ] Level 3: `window.WIX_CONTENT.packages.level3`

### Newsletter
- [ ] Heading: `window.WIX_CONTENT.newsletter.heading`
- [ ] Paragraphs: `window.WIX_CONTENT.newsletter.p1-p4`

### Contact
- [ ] Section Title: `window.WIX_CONTENT.contact.sectionTitle`
- [ ] Heading: `window.WIX_CONTENT.contact.heading`

### Instagram
- [ ] Section Title: `window.WIX_CONTENT.instagram.sectionTitle`
- [ ] Heading: `window.WIX_CONTENT.instagram.heading`

## 💡 Tips

1. **Use highlight() function** to find elements:
   ```javascript
   highlight("Business Name")  // Highlights matching elements
   ```

2. **Double-click highlighted elements** to edit them

3. **Copy content from window.WIX_CONTENT**:
   ```javascript
   window.WIX_CONTENT.hero.heading  // Copy this text
   ```

4. **Use printContent()** to see all available content

5. **Save frequently** in Wix editor (autosave is on)

## 🔧 Troubleshooting

### If editor doesn't load:
- Check if you're logged in to Wix
- Try opening editor URL directly
- Clear browser cache

### If helpers don't work:
- Make sure you're in the browser console (F12)
- Check if script was pasted correctly
- Try refreshing the page and pasting again

### If elements aren't found:
- Wix editor uses iframes - helpers work in preview frame
- Try using `findText()` with partial matches
- Use browser inspector to find element classes

## 📝 Next Steps

1. ✅ Content extracted and ready
2. ✅ Scripts created and ready
3. ⏳ Run interactive builder
4. ⏳ Use console helpers to find elements
5. ⏳ Update content in Wix editor
6. ⏳ Upload images
7. ⏳ Publish site

---

**All tools are ready!** Run `node wix_interactive_builder.js` to get started.

