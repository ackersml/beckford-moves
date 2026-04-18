# Wix Global CSS Implementation Guide

## How to Add Global CSS to Your Wix Site

There are **two main methods** depending on which Wix editor you're using:

---

## Method 1: Wix Studio (Recommended)

### Steps:
1. **Open Wix Studio Editor**
   - Log into your Wix account
   - Open your site in the Wix Studio Editor

2. **Access Code Panel**
   - Click the **Code** icon (`{}`) on the left sidebar
   - If this is your first time, click **"Start Coding"** to enable developer mode

3. **Open Global CSS File**
   - In the Code panel, click **"Page Code"**
   - Under the **CSS** section, click **"+ Add global.css"** (or select existing `global.css`)

4. **Paste Your CSS**
   - Copy the entire contents of `WIX_GLOBAL_CSS_THEME.css`
   - Paste into the `global.css` file
   - Click **Save**

5. **Preview & Publish**
   - Preview your site to see changes
   - Publish when ready

---

## Method 2: Wix Editor (Classic) - Site Settings

### Steps:
1. **Access Site Settings**
   - In the Wix Editor, click **Settings** (gear icon) in the top bar
   - Select **"Custom Code"** from the left menu

2. **Add Custom Code**
   - Scroll to **"Head Code"** section
   - Click **"+ Add Code"**
   - Select **"Code"** (not HTML)

3. **Add CSS with Style Tags**
   - In the code box, paste:
   ```html
   <style>
   /* Paste entire WIX_GLOBAL_CSS_THEME.css content here */
   </style>
   ```
   - Or use the **"CSS"** option if available

4. **Save & Publish**
   - Click **Save**
   - Publish your site

---

## Method 3: Velo (Advanced - For Full Control)

If you need more advanced customization:

1. **Enable Velo**
   - Go to **Settings** > **Advanced** > **Enable Velo**
   - Click **"Start Coding"**

2. **Add Global CSS**
   - In the Velo sidebar, expand **"Public"**
   - Right-click and select **"Add"** > **"CSS File"**
   - Name it `global.css`
   - Paste your CSS code

3. **Link in Master Page**
   - Open your master page code
   - Add: `import './global.css';`

---

## Important Notes

### CSS Selectors in Wix
Wix uses specific class names and data attributes. The CSS file includes selectors that target:
- Wix's default classes (like `.wixui-button`)
- Data attributes (like `[data-testid="container"]`)
- Generic class patterns (like `[class*="card"]`)

### Testing Your CSS
1. **Preview Mode**: Always preview before publishing
2. **Browser DevTools**: Use F12 to inspect elements and test selectors
3. **Mobile View**: Check responsive design on mobile devices

### Customization Tips

**To Change Colors:**
- Edit the CSS variables in the `:root` section at the top
- Example: Change `--primary-color: #1a4d7a;` to your preferred color

**To Change Fonts:**
- Update `--font-primary` and `--font-secondary` variables
- Make sure fonts are loaded (via Google Fonts or Wix Fonts)

**To Adjust Spacing:**
- Modify spacing variables: `--spacing-sm`, `--spacing-md`, etc.

### Troubleshooting

**CSS Not Applying?**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check if CSS is saved and published
- Verify selectors match Wix's actual class names using DevTools

**Conflicts with Wix Styles?**
- Use `!important` sparingly (only if necessary)
- Be more specific with selectors
- Check Wix's default styles in DevTools

**Mobile Issues?**
- Check the `@media` queries in the CSS
- Test on actual devices, not just browser responsive mode

---

## Next Steps

1. **Apply the CSS** using one of the methods above
2. **Preview your site** to see the changes
3. **Customize colors/fonts** in the CSS variables section
4. **Test on mobile** devices
5. **Fine-tune** specific elements as needed

---

## Additional Resources

- [Wix Studio CSS Documentation](https://support.wix.com/en/article/studio-editor-about-css-editing)
- [Wix Velo Documentation](https://www.wix.com/velo)
- [Wix Custom Code Guide](https://support.wix.com/en/article/adding-custom-code-to-your-site)






