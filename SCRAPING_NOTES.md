# Image Scraping Notes for beckfordfitness.com

## Issue
The website https://beckfordfitness.com/ has bot protection (Cloudflare or similar) that blocks automated access, returning 403 Forbidden errors.

## Findings
- Website uses Instagram embeds for images (@beckford_sean)
- Images are likely hosted on CDN or external services
- No direct image URLs found in accessible HTML

## Alternative Approaches

### Option 1: Manual Browser Extraction
1. Open https://beckfordfitness.com/ in a browser
2. Open Developer Tools (F12)
3. Go to Network tab
4. Filter by "Img" or "Media"
5. Reload the page
6. Right-click images in the Network tab → Save As

### Option 2: Browser Extension
Use a browser extension like:
- Image Downloader (Chrome/Firefox)
- Download All Images
- Bulk Image Downloader

### Option 3: Instagram Scraping
Since the site uses Instagram embeds, you could:
- Access Instagram profile: @beckford_sean
- Use Instagram's API or a tool to download images from the profile

### Option 4: Sitemap/robots.txt
Try accessing:
- https://beckfordfitness.com/sitemap.xml
- https://beckfordfitness.com/robots.txt
These might list image locations

## Scripts Created
1. `scrape_images.py` - Main scraping script (blocked by site protection)
2. `scrape_images_manual.py` - Attempts common image paths (may work for unprotected assets)

## Next Steps
If you have access to the website's backend or can whitelist your IP, that would allow automated scraping. Otherwise, manual extraction via browser is the most reliable method.






