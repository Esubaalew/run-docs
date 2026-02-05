// Custom JavaScript for run-kit documentation

// Copy code button enhancement
document.addEventListener('DOMContentLoaded', function() {
  const codeBlocks = document.querySelectorAll('pre > code');
  
  codeBlocks.forEach(block => {
    const button = block.parentElement.querySelector('.md-clipboard');
    if (button) {
      button.addEventListener('click', function() {
        const originalTitle = button.getAttribute('title');
        button.setAttribute('title', 'Copied!');
        
        setTimeout(() => {
          button.setAttribute('title', originalTitle);
        }, 2000);
      });
    }
  });
});

// Analytics tracking for external links
document.addEventListener('DOMContentLoaded', function() {
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  
  externalLinks.forEach(link => {
    link.addEventListener('click', function() {
      const href = this.getAttribute('href');
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'outbound',
          event_label: href,
          transport_type: 'beacon'
        });
      }
    });
  });
});
