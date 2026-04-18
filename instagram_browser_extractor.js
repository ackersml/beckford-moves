// Instagram Image Extractor - Run this in browser console while logged into Instagram
// Navigate to https://www.instagram.com/beckford_sean/ first, then paste this in console

(function() {
    console.log('Starting Instagram image extraction...');
    
    const images = new Set();
    const videos = new Set();
    
    // Function to extract images from current view
    function extractImages() {
        // Find all image elements
        const imgElements = document.querySelectorAll('img');
        imgElements.forEach(img => {
            const src = img.src || img.getAttribute('srcset') || img.getAttribute('data-src');
            if (src && src.includes('instagram') && !src.includes('data:')) {
                // Get full resolution URL (remove size parameters)
                const fullUrl = src.split('?')[0] || src.replace(/\/s\d+x\d+\//, '/').replace(/w\d+/, 'w1080');
                if (fullUrl.includes('.jpg') || fullUrl.includes('.jpeg') || fullUrl.includes('.webp') || fullUrl.includes('.png')) {
                    images.add(fullUrl);
                }
            }
        });
        
        // Find video elements
        const videoElements = document.querySelectorAll('video');
        videoElements.forEach(video => {
            const src = video.src || video.getAttribute('src');
            if (src && src.includes('instagram')) {
                videos.add(src);
            }
        });
        
        // Look for background images in style attributes
        const elementsWithBg = document.querySelectorAll('[style*="background-image"]');
        elementsWithBg.forEach(el => {
            const style = el.getAttribute('style');
            const match = style.match(/url\(["']?([^"')]+)["']?\)/);
            if (match && match[1].includes('instagram')) {
                images.add(match[1]);
            }
        });
    }
    
    // Scroll to load more posts
    function scrollAndExtract() {
        let lastHeight = document.body.scrollHeight;
        let scrollCount = 0;
        const maxScrolls = 20; // Limit to prevent infinite scrolling
        
        const scrollInterval = setInterval(() => {
            extractImages();
            window.scrollTo(0, document.body.scrollHeight);
            
            scrollCount++;
            if (scrollCount >= maxScrolls) {
                clearInterval(scrollInterval);
                finalize();
            }
            
            setTimeout(() => {
                const newHeight = document.body.scrollHeight;
                if (newHeight === lastHeight) {
                    clearInterval(scrollInterval);
                    finalize();
                }
                lastHeight = newHeight;
            }, 2000);
        }, 3000);
    }
    
    function finalize() {
        extractImages(); // Final extraction
        
        const imageArray = Array.from(images);
        const videoArray = Array.from(videos);
        
        console.log(`\n✓ Found ${imageArray.length} images and ${videoArray.length} videos\n`);
        
        // Create downloadable JSON
        const data = {
            username: 'beckford_sean',
            extractedAt: new Date().toISOString(),
            images: imageArray,
            videos: videoArray,
            total: imageArray.length + videoArray.length
        };
        
        // Download as JSON
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'instagram_images_beckford_sean.json';
        a.click();
        
        // Also log to console for easy copying
        console.log('=== IMAGE URLS ===');
        imageArray.forEach((url, index) => {
            console.log(`${index + 1}. ${url}`);
        });
        
        console.log('\n=== VIDEO URLS ===');
        videoArray.forEach((url, index) => {
            console.log(`${index + 1}. ${url}`);
        });
        
        console.log('\n✓ Data saved to instagram_images_beckford_sean.json');
        console.log('Copy the URLs above or use the JSON file to download images.');
        
        return data;
    }
    
    // Start extraction
    extractImages();
    scrollAndExtract();
    
    return {
        images: images,
        videos: videos,
        extract: extractImages,
        getResults: () => ({
            images: Array.from(images),
            videos: Array.from(videos)
        })
    };
})();






