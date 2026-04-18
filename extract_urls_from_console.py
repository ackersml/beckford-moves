#!/usr/bin/env python3
"""
Extract Instagram URLs from console output text
Paste the console output into a file or directly here
"""
import re
import json
import os

def extract_instagram_urls(text):
    """Extract Instagram CDN URLs from text"""
    # Pattern to match Instagram CDN URLs
    pattern = r'https://scontent[^\s\)]+'
    urls = re.findall(pattern, text)
    
    # Clean and deduplicate
    clean_urls = []
    seen = set()
    for url in urls:
        # Remove trailing characters that might have been captured
        url = url.rstrip('.,;)\'"')
        if url not in seen and ('scontent' in url or 'cdninstagram' in url):
            clean_urls.append(url)
            seen.add(url)
    
    return clean_urls

def main():
    print("Instagram URL Extractor")
    print("=" * 60)
    print("\nOption 1: Paste console output here (press Ctrl+D when done)")
    print("Option 2: Save console output to a file and provide path")
    print("\nEnter console output (or file path):")
    
    try:
        lines = []
        while True:
            try:
                line = input()
                lines.append(line)
            except EOFError:
                break
    except KeyboardInterrupt:
        print("\nCancelled.")
        return
    
    if not lines:
        print("No input provided.")
        return
    
    text = '\n'.join(lines)
    
    # Check if it's a file path
    if os.path.exists(text.strip()):
        with open(text.strip(), 'r') as f:
            text = f.read()
    
    urls = extract_instagram_urls(text)
    
    if not urls:
        print("\nNo Instagram URLs found in the text.")
        return
    
    print(f"\n✓ Found {len(urls)} unique URLs")
    
    # Save to JSON
    output_file = 'instagram_images_beckford_sean.json'
    data = {
        'username': 'beckford_sean',
        'extractedAt': __import__('datetime').datetime.now().isoformat(),
        'images': urls,
        'total': len(urls)
    }
    
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"✓ Saved to {output_file}")
    print(f"\nFirst 5 URLs:")
    for i, url in enumerate(urls[:5], 1):
        print(f"  {i}. {url[:80]}...")
    
    print(f"\nNow run: python3 download_instagram_images.py")

if __name__ == '__main__':
    main()






