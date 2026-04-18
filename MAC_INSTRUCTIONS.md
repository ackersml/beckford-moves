# Mac Instructions: Wix Console Builder

## Opening Browser Console on Mac

### Chrome/Edge
- **Full Developer Tools:** `Cmd + Option + I`
- **Console Only:** `Cmd + Option + J` (recommended)

### Safari
- **Enable Developer Menu First:**
  1. Safari → Preferences → Advanced
  2. Check "Show Develop menu in menu bar"
- **Then:** `Cmd + Option + C` (Console)

### Firefox
- **Console:** `Cmd + Option + K`

## Quick Start

1. **Run the script:**
   ```bash
   node wix_console_builder.js
   ```

2. **Browser opens** → Log in to Wix if needed

3. **Open Console:** Press `Cmd + Option + J`

4. **Use commands:**
   ```javascript
   // Find elements
   highlight("Business Name")
   updateBusinessName()
   findHero()
   
   // Get content
   getContent()
   printContent()
   window.WIX_CONTENT
   ```

## Workflow

1. Open console: `Cmd + Option + J`
2. Run: `highlight("Business Name")`
3. Double-click highlighted (yellow) elements
4. Copy: `window.WIX_CONTENT.hero.heading`
5. Paste into editor
6. Repeat for all sections

## All Content Available

```javascript
window.WIX_CONTENT.hero.heading
window.WIX_CONTENT.services[0].title
window.WIX_CONTENT.about.name
window.WIX_CONTENT.packages.level1.price
window.WIX_CONTENT.newsletter.heading
window.WIX_CONTENT.contact.heading
```

---

**That's it!** Use `Cmd + Option + J` to open console on Mac.

