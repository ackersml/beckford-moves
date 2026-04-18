#!/usr/bin/env python3
"""
Scrape Instagram images from @beckford_sean
Note: Account is private, so authentication may be required
"""
import os
import requests
from urllib.parse import urlparse
import json
import time

def sanitize_filename(filename):
    """Sanitize filename"""
    filename = filename.replace('/', '_').replace('\\', '_').replace('?', '_').replace('&', '_')
    return filename[:200]  # Limit length

def download_image(url, output_dir, session=None):
    """Download a single image"""
    try:
        if not url.startswith('http'):
            return None
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://www.instagram.com/',
            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        }
        
        if session:
            response = session.get(url, headers=headers, timeout=15, stream=True)
        else:
            response = requests.get(url, headers=headers, timeout=15, stream=True)
        
        response.raise_for_status()
        
        # Get filename from URL
        parsed = urlparse(url)
        path = parsed.path
        filename = os.path.basename(path.split('?')[0])
        
        if not filename or '.' not in filename:
            # Try to determine from content-type
            content_type = response.headers.get('content-type', '')
            if 'png' in content_type:
                filename = 'image.png'
            elif 'jpeg' in content_type or 'jpg' in content_type:
                filename = 'image.jpg'
            elif 'webp' in content_type:
                filename = 'image.webp'
            else:
                filename = 'image.jpg'
        
        filename = sanitize_filename(filename)
        filepath = os.path.join(output_dir, filename)
        
        # Make unique if exists
        counter = 1
        base, ext = os.path.splitext(filepath)
        while os.path.exists(filepath):
            filepath = f"{base}_{counter}{ext}"
            counter += 1
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        size = os.path.getsize(filepath)
        print(f"✓ Downloaded: {os.path.basename(filepath)} ({size:,} bytes)")
        return filepath
        
    except Exception as e:
        print(f"✗ Error downloading {url[:50]}...: {e}")
        return None

def extract_images_from_page_source(html):
    """Extract image URLs from Instagram page HTML"""
    import re
    images = set()
    
    # Instagram stores image URLs in JSON data
    # Look for graphql data
    graphql_pattern = r'window\._sharedData\s*=\s*({.+?});'
    match = re.search(graphql_pattern, html)
    
    if match:
        try:
            data = json.loads(match.group(1))
            # Navigate through Instagram's data structure
            # This is complex and may vary
            print("Found GraphQL data structure")
        except:
            pass
    
    # Also look for direct image URLs in the HTML
    img_patterns = [
        r'https://[^"\s]+\.(jpg|jpeg|png|webp)',
        r'https://scontent[^"\s]+\.(jpg|jpeg|png|webp)',
        r'https://instagram[^"\s]+\.(jpg|jpeg|png|webp)',
    ]
    
    for pattern in img_patterns:
        matches = re.findall(pattern, html, re.IGNORECASE)
        for match in matches:
            if isinstance(match, tuple):
                url = match[0] if match[0].startswith('http') else f"https://{match[0]}"
            else:
                url = match if match.startswith('http') else f"https://{match}"
            if 'instagram' in url or 'scontent' in url:
                images.add(url)
    
    return images

def main():
    username = 'beckford_sean'
    output_dir = os.path.join(os.path.dirname(__file__), 'instagram_images')
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Attempting to scrape images from @{username}")
    print(f"Output directory: {output_dir}")
    print("-" * 60)
    print("\n⚠️  NOTE: This account appears to be PRIVATE.")
    print("To access posts, you'll need to:")
    print("1. Log in to Instagram in a browser")
    print("2. Follow @beckford_sean")
    print("3. Use browser developer tools to extract image URLs")
    print("\nAlternatively, use Instagram's official API with proper authentication.")
    print("-" * 60)
    
    # Profile picture URL we found
    profile_pic_url = "https://scontent-mia3-3.cdninstagram.com/v/t51.2885-19/449263076_1149460986332542_102288382663372898_n.jpg?stp=dst-jpg_s320x320_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDU0LmMyIn0&_nc_ht=scontent-mia3-3.cdninstagram.com&_nc_cat=110&_nc_oc=Q6cZ2QFsMdILV2lp3vORhF_j4BJQn7nHq3p511Di-ooreLyopkyGtx_FQj-Oxc-nGBwqbb-O7cY1EvzdQ1tO7oYRKqEw&_nc_ohc=ybZ-JELtamcQ7kNvwG3WFa&_nc_gid=ZHt1_HHQOQuMmjWNgCcsZQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfkY7Z-dnLWwEa5Cfu0mjdoIPb3tYpymJsioiGm0rFh6sA&oe=69351161&_nc_sid=8b3546"
    
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.instagram.com/'
    })
    
    # Download profile picture
    print("\nDownloading profile picture...")
    if download_image(profile_pic_url, output_dir, session):
        print("✓ Profile picture downloaded")
    
    print("\n" + "-" * 60)
    print("\nFor accessing private account posts:")
    print("1. Use Instagram Basic Display API (requires app registration)")
    print("2. Use browser extension to manually download while logged in")
    print("3. Use Instagram's official Graph API (requires business account)")
    print("\nProfile picture saved. To get more images, authentication is required.")

if __name__ == '__main__':
    main()






