document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main section');

  // Navigation Logic
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(nav => nav.classList.remove('active'));
      // Add active class to clicked link
      link.classList.add('active');

      const targetId = link.getAttribute('data-target');

      // Hide all sections
      sections.forEach(section => {
        section.classList.remove('active');
      });

      // Show target section
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
        // Small delay to ensure the display:block takes effect before animation
        setTimeout(() => {
            targetSection.style.animation = 'none';
            targetSection.offsetHeight; /* trigger reflow */
            targetSection.style.animation = null; 
        }, 10);
      }
      
      // On mobile, you might want to close the nav menu here
    });
  });

  // Optional: Add some scroll reveal animations for elements inside sections
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Apply to project cards and education items
  document.querySelectorAll('.projects-grid > div, #education > div > div').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
});
