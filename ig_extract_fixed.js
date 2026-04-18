// Fixed Instagram Image Extractor - No syntax errors
// Paste this in console while on https://www.instagram.com/beckford_sean/

(function() {
    console.log('Starting extraction...');
    
    const images = new Set();
    
    function extract() {
        document.querySelectorAll('img').forEach(function(img) {
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
        console.log('Found ' + images.size + ' unique images so far...');
    }
    
    function scrollDown() {
        window.scrollTo(0, document.body.scrollHeight);
    }
    
    let scrolls = 0;
    const maxScrolls = 15;
    
    const interval = setInterval(function() {
        extract();
        scrollDown();
        scrolls++;
        
        if (scrolls >= maxScrolls) {
            clearInterval(interval);
            finish();
        }
    }, 2000);
    
    function finish() {
        extract();
        
        const imageArray = Array.from(images);
        console.log('\n✓ Extraction complete! Found ' + imageArray.length + ' images\n');
        
        const data = {
            username: 'beckford_sean',
            extractedAt: new Date().toISOString(),
            images: imageArray,
            total: imageArray.length
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'instagram_images_beckford_sean.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        console.log('✓ JSON file downloaded!');
        console.log('\nImage URLs:');
        imageArray.forEach(function(url, i) {
            console.log((i + 1) + '. ' + url);
        });
        
        return data;
    }
    
    extract();
})();






