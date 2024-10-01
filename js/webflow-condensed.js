// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const smoothScroll = () => {
      const links = document.querySelectorAll('a[href^="#"]');
      links.forEach(link => {
        link.addEventListener('click', function(event) {
          event.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    };
  
    // Mobile menu toggle
    const mobileMenuToggle = () => {
      const menuButton = document.querySelector('.menu-button');
      const navMenu = document.querySelector('.nav-menu');
      if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
          navMenu.classList.toggle('open');
        });
      }
    };
  
    // Form submission handler
    const formHandler = () => {
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        form.addEventListener('submit', function(event) {
          event.preventDefault();
          // Add your form submission logic here
          alert('Form submitted!');
        });
      });
    };
  
    // Initialize all functions
    smoothScroll();
    mobileMenuToggle();
    formHandler();
  });
  