// Force edit text in Wix Studio by bypassing blocking layer
// Execute this in browser console or via Playwright evaluate

(async () => {
  const frame = document.querySelector('iframe[name="preview-frame"]');
  if (!frame) return;
  
  const frameDoc = frame.contentDocument || frame.contentWindow.document;
  const businessNameLink = frameDoc.querySelector('a:has-text("Business Name")') || 
                          Array.from(frameDoc.querySelectorAll('a')).find(a => a.textContent.includes('Business Name'));
  
  if (businessNameLink) {
    // Remove blocking layer if exists
    const blockingLayer = document.getElementById('BLOCKING_LAYER');
    if (blockingLayer) blockingLayer.style.display = 'none';
    
    // Dispatch double-click event
    const dblClickEvent = new MouseEvent('dblclick', {
      bubbles: true,
      cancelable: true,
      view: window,
      detail: 2
    });
    businessNameLink.dispatchEvent(dblClickEvent);
    
    // Wait for editor to appear
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find rich text editor
    const editorIframe = document.querySelector('iframe[name*="Rich Text Editor"]');
    if (editorIframe) {
      const editorDoc = editorIframe.contentDocument || editorIframe.contentWindow.document;
      const editable = editorDoc.querySelector('[contenteditable="true"]');
      if (editable) {
        editable.textContent = 'Beckford Fitness';
        editable.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  }
})();
