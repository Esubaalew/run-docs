// Custom JavaScript for run-kit documentation

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

// Copy code button enhancement
document.addEventListener('DOMContentLoaded', function() {
  const codeBlocks = document.querySelectorAll('pre > code');
  
  codeBlocks.forEach(block => {
    const button = block.parentElement.querySelector('.md-clipboard');
    if (button) {
      button.addEventListener('click', function() {
        // Visual feedback
        const originalTitle = button.getAttribute('title');
        button.setAttribute('title', 'Copied!');
        
        setTimeout(() => {
          button.setAttribute('title', originalTitle);
        }, 2000);
      });
    }
  });
});

// Enhanced search highlighting
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.md-search__input');
  
  if (searchInput) {
    searchInput.addEventListener('focus', function() {
      this.parentElement.classList.add('md-search--focused');
    });
    
    searchInput.addEventListener('blur', function() {
      setTimeout(() => {
        this.parentElement.classList.remove('md-search--focused');
      }, 200);
    });
  }
});

// Add "Back to top" button for long pages
document.addEventListener('DOMContentLoaded', function() {
  const content = document.querySelector('.md-content');
  
  if (content && content.scrollHeight > 2000) {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: var(--md-primary-fg-color);
      color: white;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s, transform 0.3s;
      z-index: 100;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.transform = 'translateY(0)';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.transform = 'translateY(10px)';
      }
    });
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// Analytics tracking for external links
document.addEventListener('DOMContentLoaded', function() {
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  
  externalLinks.forEach(link => {
    link.addEventListener('click', function() {
      const href = this.getAttribute('href');
      // Track external link click
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

