/* ================================================
   THRM EduTech — Production-Grade Lenis Smooth Traversal & Interactive Engine
   ================================================ */

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud" style="color:rgba(37,99,235,0.5)">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

document.addEventListener('DOMContentLoaded', () => {

  // ===== LOADED TRIGGER =====
  document.body.classList.add('loaded');

  // ===== PRODUCTION-GRADE LENIS INERTIAL SCROLL ENGINE =====
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      lerp: 0.08, // Buttery inertial dampening for premium feel
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Initial reveal for above-fold hero content only
  const heroSection = document.getElementById('home');
  if (heroSection) {
    heroSection.querySelectorAll('.reveal-left, .reveal-right, .reveal-up').forEach(el => el.classList.add('active'));
  }
  document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 30) {
      el.classList.add('active');
    }
  });

  const scrambleElements = document.querySelectorAll('.scramble-text');
  scrambleElements.forEach((el, index) => {
    const fx = new TextScramble(el);
    setTimeout(() => {
      fx.setText(el.getAttribute('data-text') || el.textContent);
    }, index * 250);

    el.addEventListener('mouseenter', () => {
      fx.setText(el.getAttribute('data-text') || el.textContent);
    });
  });

  // ===== SLEEK TOP PROGRESS BAR =====
  const crazyBar = document.getElementById('crazy-loader-bar');
  let crazyTimer = null;

  function launchCrazyLoader(durationMs = 1200) {
    if (!crazyBar) return;
    if (crazyTimer) clearTimeout(crazyTimer);
    crazyBar.style.transition = 'none';
    crazyBar.style.width = '0%';
    crazyBar.classList.add('loading');
    void crazyBar.offsetWidth; // Force layout
    crazyBar.style.transition = `width ${Math.round(durationMs * 0.8)}ms cubic-bezier(0.16, 1, 0.3, 1)`;
    crazyBar.style.width = '85%';
  }

  function finishCrazyLoader() {
    if (!crazyBar) return;
    crazyBar.style.transition = 'width 0.25s ease-out';
    crazyBar.style.width = '100%';
    crazyTimer = setTimeout(() => {
      crazyBar.classList.remove('loading');
      crazyBar.style.width = '0%';
    }, 280);
  }

  function spawnShockwave(x, y) {
    const wave = document.createElement('div');
    wave.className = 'click-shockwave';
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    document.body.appendChild(wave);

    setTimeout(() => wave.remove(), 600);
  }

  window.addEventListener('click', (e) => {
    spawnShockwave(e.clientX, e.clientY);
  });

  // ===== MOBILE DRAWER CONTROLS =====
  const mobileToggle = document.getElementById('mobileToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-cta');

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('active');
      mobileDrawer.classList.add('open');
    }
    if (drawerBackdrop) {
      drawerBackdrop.classList.add('active');
    }
    document.body.classList.add('drawer-open');
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('active');
      mobileDrawer.classList.remove('open');
    }
    if (drawerBackdrop) {
      drawerBackdrop.classList.remove('active');
    }
    document.body.classList.remove('drawer-open');
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      openDrawer();
    });
  }
  if (drawerClose) {
    drawerClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  }
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // ===== LUXURIOUS SMOOTH NAVIGATION TRAVERSAL =====
  const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function revealSectionContents(targetElement) {
    if (!targetElement) return;
    const items = targetElement.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    items.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('active');
      }, index * 75);
    });
  }

  const allNavLinks = document.querySelectorAll('a[href^="#"], .nav-link, .drawer-link, .btn-nav, .footer-links a, .back-to-top-btn');
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetElement = (href === '#' || href === '#home') ? document.body : document.querySelector(href);
        if (targetElement) {
          e.preventDefault();

          // Calculate travel distance & dynamic cinematic duration
          const currentY = window.pageYOffset || document.documentElement.scrollTop;
          const elementRect = targetElement.getBoundingClientRect();
          const targetY = (targetElement === document.body) ? 0 : Math.max(0, elementRect.top + currentY - 85);
          const distance = Math.abs(targetY - currentY);

          // Dynamic luxury duration: min 0.75s, max 1.35s
          const duration = Math.min(1.35, Math.max(0.75, 0.6 + Math.sqrt(distance) * 0.0075));
          const durationMs = duration * 1000;

          // Instant active pill feedback
          if (href.startsWith('#') && href.length > 1) {
            mainNavLinks.forEach(l => {
              if (l.getAttribute('href') === href) {
                l.classList.add('active');
              } else {
                l.classList.remove('active');
              }
            });
          }

          launchCrazyLoader(durationMs);
          closeDrawer();

          if (lenis) {
            lenis.scrollTo(targetElement === document.body ? 0 : targetElement, {
              offset: -85,
              duration: duration,
              easing: easeInOutCubic,
              onComplete: () => {
                finishCrazyLoader();
                revealSectionContents(targetElement);
                if (targetElement !== document.body) {
                  targetElement.classList.add('section-traversal-highlight');
                  setTimeout(() => targetElement.classList.remove('section-traversal-highlight'), 1400);
                }
              }
            });
          } else {
            window.scrollTo({
              top: targetY,
              behavior: 'smooth'
            });
            setTimeout(() => {
              finishCrazyLoader();
              revealSectionContents(targetElement);
              if (targetElement !== document.body) {
                targetElement.classList.add('section-traversal-highlight');
                setTimeout(() => targetElement.classList.remove('section-traversal-highlight'), 1400);
              }
            }, durationMs);
          }
        }
      }
    });
  });

  // ===== VERMILION CURSOR (DESKTOP ONLY) =====
  const follower = document.getElementById('cursor-follower');
  const dot = document.getElementById('cursor-dot');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let cursorActive = false;

  if (window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorActive = true;
      
      if (dot) {
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
      }
    }, { passive: true });

    function renderCursor() {
      if (cursorActive && follower) {
        followerX += (mouseX - followerX) * 0.18;
        followerY += (mouseY - followerY) * 0.18;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
      }
      requestAnimationFrame(renderCursor);
    }
    renderCursor();
  }

  // Magnetic Buttons Attraction Physics
  const magneticButtons = document.querySelectorAll('.magnetic-btn');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      const distanceX = e.clientX - btnCenterX;
      const distanceY = e.clientY - btnCenterY;
      btn.style.transform = `translate3d(${distanceX * 0.2}px, ${distanceY * 0.2}px, 0)`;
      if (follower) follower.classList.add('hovering');
    }, { passive: true });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      if (follower) follower.classList.remove('hovering');
    });
  });

  // ===== CARD SPECULAR SHEEN & 3D TILT (THROTTLED) =====
  if (window.innerWidth > 768) {
    const tiltCards = document.querySelectorAll('.bento-card, .ref-card, .process-step-card, .step-card, .connect-form-card');
    tiltCards.forEach(card => {
      let tiltRAF = null;
      card.addEventListener('mousemove', (e) => {
        if (tiltRAF) cancelAnimationFrame(tiltRAF);
        tiltRAF = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const width = rect.width;
          const height = rect.height;

          const percentX = (x / width) * 100;
          const percentY = (y / height) * 100;
          card.style.setProperty('--mouse-x', `${percentX}%`);
          card.style.setProperty('--mouse-y', `${percentY}%`);

          const tiltX = (((y / height) - 0.5) * -8).toFixed(2);
          const tiltY = (((x / width) - 0.5) * 8).toFixed(2);
          card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
        });
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        if (tiltRAF) cancelAnimationFrame(tiltRAF);
        card.style.transform = '';
      });
    });
  }

  // ===== STATS COUNTER & ACTIVE NAVBAR OBSERVER (ZERO-LAG SYNC) =====
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsSection = document.querySelector('.hero-stats');
  let startedCounters = false;
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const mainNavLinks = Array.from(document.querySelectorAll('.nav-menu .nav-link'));

  function handleScroll(scrollPos) {
    const currentScroll = scrollPos !== undefined ? scrollPos : (window.pageYOffset || document.documentElement.scrollTop);

    // 1. Stats Counter (runs once when in view)
    if (statsSection && !startedCounters) {
      const rect = statsSection.getBoundingClientRect();
      if (rect.top <= window.innerHeight + 50) {
        startedCounters = true;
        statNumbers.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const increment = Math.max(1, Math.ceil(target / 45));
          const step = () => {
            count += increment;
            if (count < target) {
              counter.innerText = count;
              requestAnimationFrame(step);
            } else {
              counter.innerText = target;
            }
          };
          requestAnimationFrame(step);
        });
      }
    }

    // 2. Active Navbar Item
    let activeId = '';
    for (let i = sections.length - 1; i >= 0; i--) {
      if (currentScroll >= sections[i].offsetTop - 150) {
        activeId = sections[i].getAttribute('id');
        break;
      }
    }
    if (activeId) {
      mainNavLinks.forEach(link => {
        if (link.getAttribute('href') === `#${activeId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  if (lenis) {
    lenis.on('scroll', ({ scroll }) => {
      handleScroll(scroll);
    });
  } else {
    let isScrollThrottled = false;
    window.addEventListener('scroll', () => {
      if (!isScrollThrottled) {
        requestAnimationFrame(() => {
          handleScroll();
          isScrollThrottled = false;
        });
        isScrollThrottled = true;
      }
    }, { passive: true });
  }

  // Initial call
  handleScroll(0);

  // ===== HIGH-EFFICIENCY PARTICLES CANVAS =====
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let ripplesArray = [];
    const numberOfParticles = 30;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    class Ripple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.alpha = 0.5;
      }
      update() {
        this.radius += 2.5;
        this.alpha -= 0.025;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.strokeStyle = '#2563EB';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    window.addEventListener('mousemove', (e) => {
      if (Math.random() < 0.1) {
        ripplesArray.push(new Ripple(e.clientX, e.clientY));
      }
    }, { passive: true });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        const palette = ['#2563EB', '#7C3AED', '#06B6D4', '#22C55E'];
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.alpha = Math.random() * 0.3 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function initParticles() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    initParticles();

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = ripplesArray.length - 1; i >= 0; i--) {
        ripplesArray[i].update();
        ripplesArray[i].draw();
        if (ripplesArray[i].alpha <= 0) {
          ripplesArray.splice(i, 1);
        }
      }

      particlesArray.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // Mobile 3D Flip Card Click Handler
  const flipWrappers = document.querySelectorAll('.track-card-flip-wrap');
  flipWrappers.forEach(wrap => {
    wrap.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        wrap.classList.toggle('flipped');
      }
    });
  });

  // Course Auto-Selection in Contact Form
  const courseEnrollButtons = document.querySelectorAll('.btn-enroll-course');
  const courseDropdown = document.getElementById('course');

  courseEnrollButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedCourseName = btn.getAttribute('data-course');
      if (courseDropdown && selectedCourseName) {
        courseDropdown.value = selectedCourseName;
        courseDropdown.classList.add('field-glow-pulse');
        courseDropdown.focus();

        setTimeout(() => {
          courseDropdown.classList.remove('field-glow-pulse');
        }, 3000);
      }
    });
  });

  // ===== HARDWARE-ACCELERATED ENTRANCE REVEAL OBSERVER =====
  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // Interactive Click Particle Sparks
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, a, .track-card, .ref-card, .founder-card')) {
      createParticleSparkleBurst(e.clientX, e.clientY, 10);
    }
  });

  function createParticleSparkleBurst(x, y, count) {
    const colors = ['#2563EB', '#7C3AED', '#06B6D4', '#EC4899', '#F59E0B', '#10B981'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'sparkle-particle';
      const size = Math.random() * 6 + 3;
      const color = colors[Math.floor(Math.random() * colors.length)];

      p.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        box-shadow: 0 0 8px ${color};
        transform: translate(-50%, -50%);
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      `;

      document.body.appendChild(p);

      const destX = (Math.random() - 0.5) * 120;
      const destY = (Math.random() - 0.5) * 120;

      requestAnimationFrame(() => {
        p.style.transform = `translate(${destX}px, ${destY}px) scale(0)`;
        p.style.opacity = '0';
      });

      setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 550);
    }
  }

});
