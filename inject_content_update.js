// JavaScript to inject into Wix preview frame
(function() {
  console.log('Starting content update injection...');
  
  // Function to update text content
  function updateTextContent(searchText, newText) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let updated = false;
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent && node.textContent.includes(searchText)) {
        node.textContent = node.textContent.replace(new RegExp(searchText, 'g'), newText);
        updated = true;
      }
    }
    
    // Also update elements directly
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      if (el.textContent && el.textContent.includes(searchText) && el.children.length === 0) {
        el.textContent = el.textContent.replace(new RegExp(searchText, 'g'), newText);
        updated = true;
      }
    });
    
    return updated;
  }
  
  // Update business name
  if (updateTextContent('Business Name', 'Beckford Fitness')) {
    console.log('✓ Updated Business Name to Beckford Fitness');
  }
  
  // Update other common placeholders
  updateTextContent('© 2035 by Business Name', '© 2025 by Beckford Fitness');
  
  console.log('Content update injection complete');
  return 'Content update completed';
})();
