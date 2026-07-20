/**
 * Visual effects: gradient canvas, spotlight, card tracking, scroll reveals, typewriter.
 */
(function () {
  'use strict';

  /* ── Gradient Canvas Background ──────────────────────────────── */
  function initGradientCanvas() {
    const canvas = document.getElementById('gradient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, animId;
    const isDark = () => document.documentElement.dataset.theme === 'dark';

    const orbs = [
      { x: 0.2, y: 0.3, r: 0.35, speed: 0.0003, phase: 0, color: [79, 70, 229] },
      { x: 0.7, y: 0.6, r: 0.3, speed: 0.0004, phase: 2, color: [78, 205, 196] },
      { x: 0.5, y: 0.8, r: 0.25, speed: 0.00035, phase: 4, color: [167, 139, 250] },
    ];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      const alpha = isDark() ? 0.18 : 0.12;

      for (const orb of orbs) {
        const cx = w * (orb.x + Math.sin(t * orb.speed + orb.phase) * 0.08);
        const cy = h * (orb.y + Math.cos(t * orb.speed * 0.7 + orb.phase) * 0.06);
        const radius = Math.min(w, h) * orb.r;
        const [r, g, b] = orb.color;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw(0);

    /* ── Subtle grid overlay ─────────────────────────────────── */
    const grid = document.createElement('div');
    grid.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none;background-image:linear-gradient(var(--border-color) 1px,transparent 1px),linear-gradient(90deg,var(--border-color) 1px,transparent 1px);background-size:60px 60px;opacity:0.08;';
    document.body.appendChild(grid);
  }

  /* ── Mouse-Follow Spotlight ──────────────────────────────────── */
  function initSpotlight() {
    const el = document.getElementById('hero-spotlight');
    if (!el) return;

    el.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(600px circle at var(--mx,50%) var(--my,50%),color-mix(in srgb,var(--accent-color) 6%,transparent),transparent 60%);opacity:0;transition:opacity 0.8s ease;';

    let mx = 0, my = 0, active = false;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      el.style.setProperty('--mx', mx + 'px');
      el.style.setProperty('--my', my + 'px');
      if (!active) {
        active = true;
        el.classList.add('active');
      }
    });
  }

  /* ── Card Mouse-Tracking Radial Gradient ─────────────────────── */
  function initCardTracking() {
    document.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll('.project-card, .link-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      });
    });
  }

  /* ── Scroll-Triggered Reveals with Stagger ───────────────────── */
  function initScrollReveals() {
    const sections = document.querySelectorAll('.content-section');
    if (!sections.length) return;

    if (!('IntersectionObserver' in window)) {
      sections.forEach((s) => s.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );

    sections.forEach((s) => observer.observe(s));
  }

  /* ── Typewriter Effect ───────────────────────────────────────── */
  function initTypewriter() {
    const target = document.getElementById('typewriter-target');
    if (!target) return;

    const phrases = [
      'Embedded systems engineer.',
      'PCB designer.',
      'Firmware developer.',
      'Cybersecurity enthusiast.',
      'I build things.',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        target.textContent = current.substring(0, charIndex);
      } else {
        charIndex++;
        target.textContent = current.substring(0, charIndex);
      }

      let delay = isDeleting ? 25 : 55 + Math.random() * 40;

      if (!isDeleting && charIndex === current.length) {
        delay = 2500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }

      setTimeout(type, delay);
    }

    setTimeout(type, 1200);
  }

  /* ── Tilt Effect on Cards (subtle 3D) ────────────────────────── */
  function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-4px) perspective(600px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ── Init ────────────────────────────────────────────────────── */
  function init() {
    initGradientCanvas();
    initSpotlight();
    initCardTracking();
    initScrollReveals();
    initTypewriter();
    initTiltEffect();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
