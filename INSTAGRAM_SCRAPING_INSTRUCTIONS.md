# Instagram Image Scraping Instructions

## ⚠️ Important Note
The Instagram account @beckford_sean is **PRIVATE**, so you need to be logged in and following the account to access posts.

## Method: Browser Console Extraction

### Step 1: Log into Instagram
1. Open your browser and go to https://www.instagram.com/
2. Log in with your Instagram account
3. Make sure you're following @beckford_sean (or have access to view their posts)

### Step 2: Navigate to the Profile
1. Go to https://www.instagram.com/beckford_sean/
2. Wait for the page to fully load

### Step 3: Open Browser Console
- **Chrome/Edge**: Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
- **Firefox**: Press `F12` or `Cmd+Option+K` (Mac) / `Ctrl+Shift+K` (Windows)
- **Safari**: Enable Developer menu first, then `Cmd+Option+C`

### Step 4: Run the Extractor Script
1. Click on the "Console" tab in the developer tools
2. Open the file `instagram_browser_extractor.js` from this folder
3. Copy the entire contents
4. Paste it into the browser console
5. Press Enter

### Step 5: Wait for Extraction
- The script will automatically scroll through the profile to load posts
- It will extract image and video URLs
- A JSON file will automatically download when complete
- The console will show progress and final URLs

### Step 6: Download Images
1. Once the JSON file is downloaded, run:
```bash
cd "/Users/michelleackers/Desktop/Sean Beckford"
source venv/bin/activate
python3 download_instagram_images.py
```

2. Images will be saved to `instagram_images/` folder

---

## Alternative: Manual Method

If the script doesn't work, you can manually extract URLs:

1. While on the Instagram profile page, open Developer Tools (F12)
2. Go to the "Network" tab
3. Filter by "Img" or "Media"
4. Scroll through the profile to load posts
5. Right-click on images in the Network tab → Copy → Copy URL
6. Save URLs to a text file
7. Use the download script with those URLs

---

## Files Created

- `instagram_browser_extractor.js` - Browser console script
- `download_instagram_images.py` - Python downloader script
- `scrape_instagram.py` - Basic scraper (limited by private account)

---

## Troubleshooting

**Script doesn't work:**
- Make sure you're logged into Instagram
- Make sure you're following @beckford_sean
- Try refreshing the page and running the script again
- Check browser console for error messages

**Images won't download:**
- Instagram URLs expire quickly - download soon after extraction
- Some images may require authentication headers
- Try using the browser's "Save Image As" feature for individual images

**Account is private:**
- You must follow the account to see posts
- Or ask Sean to make the account public temporarily
- Or use Instagram's official API with proper authentication

---

## Instagram API Alternative

For production use, consider:
- Instagram Basic Display API
- Instagram Graph API (requires business account)
- Third-party services like Apify, Bright Data, etc.






