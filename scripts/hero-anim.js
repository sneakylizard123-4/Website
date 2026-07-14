/**
 * Hero animations - gradient orbs, typewriter text, staggered reveals
 * Inspired by Componentry UI library effects
 */

(function() {
  'use strict';

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    animateGradientOrbs();
    animateTypewriter();
    animateStaggeredReveal();
  }

  /**
   * Animate gradient orbs with smooth floating motion
   */
  function animateGradientOrbs() {
    const orbs = document.querySelectorAll('.gradient-orb');
    if (!orbs.length) return;

    orbs.forEach((orb, index) => {
      // Random starting position within bounds
      const startX = 20 + Math.random() * 60;
      const startY = 20 + Math.random() * 60;

      // Random animation parameters
      const duration = 15 + Math.random() * 10 + index * 5;
      const amplitude = 100 + Math.random() * 150;
      const phaseX = Math.random() * Math.PI * 2;
      const phaseY = Math.random() * Math.PI * 2;

      let startTime = null;

      function animate(time) {
        if (!startTime) startTime = time;
        const elapsed = (time - startTime) / 1000;

        // Create smooth figure-8 like motion
        const x = startX + Math.sin(elapsed * (2 * Math.PI / duration) + phaseX) * amplitude / 10;
        const y = startY + Math.sin(elapsed * (4 * Math.PI / duration) + phaseY) * amplitude / 10;

        orb.style.transform = `translate(${x}%, ${y}%)`;

        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    });
  }

  /**
   * Typewriter effect for the subtitle text
   */
  function animateTypewriter() {
    const typewriter = document.querySelector('.typewriter');
    if (!typewriter) return;

    const text = typewriter.dataset.text || typewriter.textContent;
    typewriter.textContent = '';
    typewriter.style.borderRight = '2px solid var(--accent-color)';

    let charIndex = 0;
    let isDeleting = false;
    let deleteTimeout = null;
    let typeTimeout = null;

    function type() {
      if (isDeleting) {
        typewriter.textContent = text.substring(0, charIndex - 1);
        charIndex--;
        typeTimeout = setTimeout(type, 30);
      } else {
        typewriter.textContent = text.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex < text.length) {
          typeTimeout = setTimeout(type, 50 + Math.random() * 50);
        } else {
          // Pause then delete
          deleteTimeout = setTimeout(() => {
            isDeleting = true;
            type();
          }, 3000);
        }
      }
    }

    // Start typing after a delay
    setTimeout(type, 500);
  }

  /**
   * Staggered reveal animation for cards and sections
   */
  function animateStaggeredReveal() {
    const cards = document.querySelectorAll('.project-card, .link-card');
    if (!cards.length) return;

    // Set initial state
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Animate in on load
    requestAnimationFrame(() => {
      setTimeout(() => {
        cards.forEach(card => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      }, 300);
    });

    // Intersection Observer for scroll-triggered animation
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      cards.forEach(card => observer.observe(card));
    }
  }
})();