// Instagram Direct Downloader - Downloads images directly in browser
// Paste this in console while on https://www.instagram.com/beckford_sean/

(function() {
    console.log('Starting direct download...');
    
    const images = new Set();
    const downloaded = [];
    
    // Extract images
    function extract() {
        document.querySelectorAll('img').forEach(img => {
            let src = img.src || img.getAttribute('srcset');
            if (src && (src.includes('scontent') || src.includes('cdninstagram'))) {
                if (src.includes(',')) {
                    const parts = src.split(',');
                    src = parts[parts.length - 1].trim().split(' ')[0];
                }
                if (src.includes('scontent') || src.includes('cdninstagram')) {
                    images.add(src);
                }
            }
        });
    }
    
    // Scroll to load more
    function scrollDown() {
        window.scrollTo(0, document.body.scrollHeight);
    }
    
    // Download image using fetch (has access to cookies)
    async function downloadImage(url, index) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            
            // Determine extension
            const contentType = response.headers.get('content-type') || '';
            let ext = '.jpg';
            if (contentType.includes('webp')) ext = '.webp';
            else if (contentType.includes('png')) ext = '.png';
            else if (contentType.includes('jpeg')) ext = '.jpg';
            
            // Download
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `instagram_${String(index).padStart(4, '0')}${ext}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
            
            console.log(`✓ [${index}] Downloaded image`);
            return true;
        } catch (error) {
            console.log(`✗ [${index}] Error: ${error.message}`);
            return false;
        }
    }
    
    // Main process
    async function process() {
        // Scroll and extract
        for (let i = 0; i < 15; i++) {
            extract();
            scrollDown();
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        extract(); // Final extraction
        
        const imageArray = Array.from(images);
        console.log(`\n✓ Found ${imageArray.length} images. Starting downloads...\n`);
        
        // Download each image with delay
        for (let i = 0; i < imageArray.length; i++) {
            await downloadImage(imageArray[i], i + 1);
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
        }
        
        console.log(`\n✓ Download complete! ${imageArray.length} images processed.`);
        console.log('Check your Downloads folder.');
    }
    
    process();
})();






