/* ================================================
   THRM EduTech — Smooth Interactions & Navigation Logic
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== MOBILE DRAWER CONTROLS =====
  const mobileToggle = document.getElementById('mobileToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden'; // Lock background scroll when drawer is open
    });
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = ''; // Restore background scroll
    }
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ===== SCROLL REVEAL INTERSECTION OBSERVER =====
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          revealObserver.unobserve(entry.target); // Trigger once smoothly
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ===== STATS COUNTER ANIMATION =====
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateStats() {
    statNumbers.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1600;
      const start = performance.now();

      function update(timestamp) {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(easedProgress * target);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(update);
    });
  }

  const heroSection = document.getElementById('home');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animateStats();
          animated = true;
        }
      });
    }, { threshold: 0.2 });
    observer.observe(heroSection);
  }

  // ===== TOP TRANSITION PROGRESS INDICATOR =====
  const progressBar = document.createElement('div');
  progressBar.id = 'nav-progress-bar';
  progressBar.style.cssText = 'position:fixed; top:0; left:0; height:3px; width:0%; background:var(--grad-purple); z-index:9999; transition:width 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease; opacity:0; pointer-events:none;';
  document.body.appendChild(progressBar);

  // ===== LERP QUINTIC SMOOTH SCROLL FUNCTION =====
  function smoothScrollTo(targetY, duration = 900) {
    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();

    // Trigger navbar loader sweep
    progressBar.style.opacity = '1';
    progressBar.style.width = '50%';

    function step(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // quintic out easing
      const easedProgress = 1 - Math.pow(1 - progress, 5);
      
      window.scrollTo(0, startY + difference * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Scroll completed, sweep loader to end and fade
        progressBar.style.width = '100%';
        setTimeout(() => {
          progressBar.style.opacity = '0';
          setTimeout(() => {
            progressBar.style.width = '0%';
          }, 400);
        }, 150);
      }
    }
    requestAnimationFrame(step);
  }

  // ===== ULTRA-SMOOTH ANCHOR SCROLLING WITH NAVBAR OFFSET =====
  const allAnchors = document.querySelectorAll('a[href^="#"]');

  allAnchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      e.preventDefault();
      closeDrawer();

      // Calculate precise navbar offset
      const navbar = document.getElementById('navbar');
      const navHeight = navbar ? navbar.offsetHeight : 70;
      const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navHeight - 12;

      smoothScrollTo(Math.max(0, targetPosition));
    });
  });

  // ===== SMOOTH SCROLL ON PAGE LOAD WITH HASH =====
  if (window.location.hash) {
    const hash = window.location.hash;
    const targetSection = document.querySelector(hash);
    if (targetSection) {
      // Prevent browser default jump by scrolling to top immediately
      window.scrollTo(0, 0);
      
      // Delay slightly for CSS/DOM to settle, then glide down smoothly
      setTimeout(() => {
        const navbar = document.getElementById('navbar');
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navHeight - 12;
        smoothScrollTo(Math.max(0, targetPosition), 1200);
      }, 300);
    }
  }

  // ===== COURSE ENQUIRY BUTTON PRE-SELECTION =====
  const courseButtons = document.querySelectorAll('.tracks-grid .btn-track-details');
  const courseSelect = document.getElementById('course');

  const courseValueMap = {
    'Social Media & Creative Designs': 'social-media',
    'SEO + Web Development': 'seo-web',
    'Performance Marketing Strategies': 'performance',
    'Ultimate Combo Course': 'combo'
  };

  courseButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cardTitleEl = btn.closest('.track-card')?.querySelector('.track-title');
      if (cardTitleEl && courseSelect) {
        const titleText = cardTitleEl.textContent.trim();
        if (courseValueMap[titleText]) {
          courseSelect.value = courseValueMap[titleText];
        }
      }
    });
  });

  // ===== CONTACT FORM SUBMISSION =====
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const originalText = btn.innerHTML;

      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';
      btn.disabled = true;

      const formData = new FormData(contactForm);
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        if (res.ok) {
          contactForm.style.display = 'none';
          formFeedback.style.display = 'block';
          formFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          btn.innerHTML = '<span>Submission failed. Try again</span>';
          btn.disabled = false;
        }
      } catch (err) {
        btn.innerHTML = '<span>Submission failed. Try again</span>';
        btn.disabled = false;
      }
    });
  }

  // ===== ACTIVE NAVBAR TRACKING ON SCROLL =====
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY;
    const navbar = document.getElementById('navbar');
    const navHeight = navbar ? navbar.offsetHeight : 70;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 30;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ===== CYBERPUNK PARTICLES BACKGROUND ENGINE =====
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = 80;

    function resizeCanvas() {
      // Set canvas size based on parent or window
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = Math.random() > 0.5 ? '#ff6b35' : '#fbbf24'; // Mascot orange or yellow
        this.alpha = Math.random() * 0.2 + 0.05; // Soft stars for light mode readability
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
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = this.color;
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

    function connectNodes() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const alpha = (1 - (distance / 120)) * 0.05; // Soft, delicate lines for light backdrop
            ctx.strokeStyle = `rgba(255, 107, 53, ${alpha})`; 
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => {
        p.update();
        p.draw();
      });
      connectNodes();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ===== INTERACTIVE 3D TILT EFFECT FOR PREMIUM CARDS =====
  const tiltCards = document.querySelectorAll('.bento-card, .track-card, .ref-card, .process-step-card, .step-card, .connect-form-card');
  
  tiltCards.forEach(card => {
    if (window.innerWidth > 768) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = rect.width;
        const height = rect.height;
        
        const percentX = (x / width) - 0.5;
        const percentY = (y / height) - 0.5;
        
        const maxTilt = 8;
        const tiltX = (percentY * maxTilt * -1).toFixed(2);
        const tiltY = (percentX * maxTilt).toFixed(2);
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
        
        const glowColor = card.classList.contains('card-orange') ? 'rgba(255, 107, 53, 0.12)' :
                          card.classList.contains('card-lime') ? 'rgba(15, 118, 110, 0.12)' :
                          card.classList.contains('card-purple') ? 'rgba(245, 158, 11, 0.12)' :
                          card.classList.contains('card-blue') ? 'rgba(2, 132, 199, 0.12)' :
                          card.classList.contains('card-pink') ? 'rgba(225, 29, 72, 0.12)' :
                          'rgba(255, 107, 53, 0.08)';
                          
        card.style.boxShadow = `0 20px 45px rgba(28, 25, 23, 0.06), 0 0 25px ${glowColor}`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    }
  });

  // ===== MOUSE CURSOR GLOW FOR LIGHT TECH GRID =====
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.opacity = '1';
      cursorGlow.style.left = e.clientX + window.scrollX + 'px';
      cursorGlow.style.top = e.clientY + window.scrollY + 'px';
    });
    
    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });
  }

  // ===== SCROLL TO TOP PROGRESS CIRCLE =====
  const progressWrap = document.getElementById('scroll-progress-wrap');
  const progressPath = progressWrap ? progressWrap.querySelector('path') : null;

  if (progressWrap && progressPath) {
    const pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

    function updateProgress() {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pathLength - (scroll * pathLength / height);
      progressPath.style.strokeDashoffset = progress;

      if (scroll > 300) {
        progressWrap.classList.add('visible');
      } else {
        progressWrap.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    progressWrap.addEventListener('click', () => {
      smoothScrollTo(0, 1000);
    });
  }

  // ===== NAVBAR SCROLL STATE CONTROLLER =====
  const navbarEl = document.getElementById('navbar');
  if (navbarEl) {
    function toggleNavbarScroll() {
      if (window.scrollY > 40) {
        navbarEl.classList.add('scrolled');
      } else {
        navbarEl.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', toggleNavbarScroll);
    toggleNavbarScroll(); // check on initial load
  }

});
