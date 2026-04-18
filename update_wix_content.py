#!/usr/bin/env python3
"""
Python Playwright script to update Wix Studio content
Bypasses blocking layers and uses native double-click
"""

import asyncio
from playwright.async_api import async_playwright
import time

# Content to update
CONTENT_UPDATES = {
    "Business Name": "Beckford Fitness",
    "Transforming Lives Through Fitness": "Transform your fitness journey with personalized 1-on-1 training, life coaching, and nutrition guidance",
    "At Beckford Fitness, our mission is to empower individuals to achieve their fitness and wellness goals through personalized coaching, guidance, and support tailored to each person's unique journey.": "Sean Beckford brings 11 years of experience and 9 professional certifications to create custom programs that deliver real results. Train virtually from anywhere or in-person in Downtown Toronto.",
}

async def update_wix_content():
    async with async_playwright() as p:
        # Connect to existing browser or launch new one
        # Try to connect to existing browser first (if browser MCP is running)
        try:
            browser = await p.chromium.connect_over_cdp("http://localhost:9222")
            print("Connected to existing browser")
        except:
            browser = await p.chromium.launch(headless=False, slow_mo=500)
            print("Launched new browser")
        
        # Get existing page or create new one
        pages = browser.pages
        if pages:
            page = pages[0]
        else:
            page = await browser.new_page()
        
        # Navigate to Wix editor if not already there
        current_url = page.url
        if "editor.wix.com" not in current_url:
            print("Navigating to Wix editor...")
            await page.goto("https://editor.wix.com/studio/d84d3a66-637c-4eba-870f-274219debc1d?metaSiteId=e08a7faf-7056-4c2a-8a3c-0228cfd31d6f")
            await page.wait_for_timeout(3000)
        
        # Wait for page to load
        await page.wait_for_load_state("networkidle")
        
        # Remove blocking layer if it exists
        await page.evaluate("""
            const blockingLayer = document.getElementById('BLOCKING_LAYER');
            if (blockingLayer) {
                blockingLayer.style.display = 'none';
                blockingLayer.style.pointerEvents = 'none';
            }
        """)
        
        # Get the preview frame
        preview_frame = None
        for frame in page.frames:
            if "preview-frame" in frame.name or "preview" in frame.url.lower():
                preview_frame = frame
                break
        
        if not preview_frame:
            # Try to find iframe
            frame_element = await page.query_selector('iframe[name="preview-frame"]')
            if frame_element:
                preview_frame = await frame_element.content_frame()
        
        if not preview_frame:
            print("Could not find preview frame")
            return
        
        print("Found preview frame, starting content updates...")
        
        # Update Business Name
        try:
            business_name = preview_frame.get_by_role("link", name="Business Name")
            if await business_name.count() > 0:
                # Remove blocking layer again before clicking
                await page.evaluate("""
                    const blockingLayer = document.getElementById('BLOCKING_LAYER');
                    if (blockingLayer) {
                        blockingLayer.remove();
                    }
                """)
                
                # Double-click using Playwright's native method
                await business_name.dblclick()
                await page.wait_for_timeout(1000)
                
                # Try to find and update the rich text editor
                editor_iframe = await page.query_selector('iframe[name*="Rich Text Editor"]')
                if editor_iframe:
                    editor_frame = await editor_iframe.content_frame()
                    if editor_frame:
                        editable = editor_frame.locator('[contenteditable="true"]').first
                        if await editable.count() > 0:
                            await editable.fill("Beckford Fitness")
                            await page.keyboard.press("Enter")
                            print("✓ Updated Business Name")
                        else:
                            # Fallback: use keyboard after double-click
                            await page.keyboard.press("Control+a")
                            await page.type("Beckford Fitness")
                            await page.keyboard.press("Enter")
                            print("✓ Updated Business Name (keyboard method)")
                else:
                    # Fallback: select all and type
                    await page.keyboard.press("Control+a")
                    await page.type("Beckford Fitness")
                    await page.keyboard.press("Enter")
                    print("✓ Updated Business Name (fallback method)")
        except Exception as e:
            print(f"Error updating Business Name: {e}")
        
        # Wait a bit before next update
        await page.wait_for_timeout(2000)
        
        print("Content update process completed")
        print("Note: Some updates may require manual verification in the Wix editor")

if __name__ == "__main__":
    asyncio.run(update_wix_content())



