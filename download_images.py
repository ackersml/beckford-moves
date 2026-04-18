#!/usr/bin/env python3
"""
Download images extracted from beckfordfitness.com
"""
import os
import requests
from urllib.parse import urlparse

# Image URLs extracted from the website
image_urls = [
    "https://beckfordfitness.com/wp-content/uploads/2020/05/BF-Logo-Black-130x130.png",
    "https://beckfordfitness.com/wp-content/uploads/2022/12/IMG_1461-1-768x1024.jpeg",
    "https://beckfordfitness.com/wp-content/uploads/sb-instagram-feed-images/551823294_827877546333490_7871412054573750767_nfull.webp",
    "https://beckfordfitness.com/wp-content/uploads/sb-instagram-feed-images/550817016_4275966279348856_5968913664506866919_nfull.webp",
    "https://beckfordfitness.com/wp-content/uploads/sb-instagram-feed-images/549049402_1484409522793244_4827967998982376665_nfull.webp",
    "https://beckfordfitness.com/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg",
    "https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg",
    "https://beckfordfitness.com/wp-content/uploads/2020/04/IMG-1370-e1588446680310-1024x762.jpg",
]

def sanitize_filename(filename):
    """Sanitize filename"""
    filename = filename.replace('/', '_').replace('\\', '_')
    return filename

def download_image(url, output_dir):
    """Download a single image"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            'Referer': 'https://beckfordfitness.com/'
        }
        
        response = requests.get(url, headers=headers, timeout=15, stream=True)
        response.raise_for_status()
        
        # Get filename from URL
        parsed = urlparse(url)
        filename = os.path.basename(parsed.path)
        if not filename or '.' not in filename:
            # Try to determine from content-type
            content_type = response.headers.get('content-type', '')
            if 'png' in content_type:
                filename = 'image.png'
            elif 'jpeg' in content_type or 'jpg' in content_type:
                filename = 'image.jpg'
            elif 'webp' in content_type:
                filename = 'image.webp'
            elif 'svg' in content_type:
                filename = 'image.svg'
            else:
                filename = 'image'
        
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
        print(f"✗ Error downloading {url}: {e}")
        return None

def main():
    output_dir = os.path.join(os.path.dirname(__file__), 'beckfordfitness_images')
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Downloading {len(image_urls)} images to: {output_dir}")
    print("-" * 60)
    
    downloaded = 0
    for url in image_urls:
        if download_image(url, output_dir):
            downloaded += 1
    
    print("-" * 60)
    print(f"\nSuccessfully downloaded {downloaded}/{len(image_urls)} images")
    print(f"Images saved to: {output_dir}")

if __name__ == '__main__':
    main()






