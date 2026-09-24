/**
 * @file script.js
 * Kunal Naik — Operations & Finance Professional Portfolio
 * Pure Vanilla JavaScript (ES6+) — Zero External Frameworks.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initScrollProgressBar();
  initMobileMenu();
  initHeroTilt();
  initSkillsFilter();
  initActiveNav();
  initSmoothScroll();
  initScrollReveal();
  initContactForm();
  initQuickCopy();
  initBackToTop();
  initDynamicYear();
});

/**
 * 1. Sticky Navbar styling on scroll
 */
function initStickyNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const checkScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();
}

/**
 * 2. Mobile Navigation Drawer
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-actions .btn');

  if (!toggleBtn || !drawer) return;

  const toggle = (force) => {
    const isOpen = typeof force === 'boolean' ? force : !drawer.classList.contains('open');
    drawer.classList.toggle('open', isOpen);
    toggleBtn.classList.toggle('is-active', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', () => toggle());

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggle(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860 && drawer.classList.contains('open')) {
      toggle(false);
    }
  }, { passive: true });
}

/**
 * 3. Hero 3D Card Perspective Tilt Effect (Subtle, High-Performance)
 */
function initHeroTilt() {
  const tiltCard = document.getElementById('heroTiltCard');
  if (!tiltCard) return;

  // Only enable on desktop pointer devices
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  }
}

/**
 * 4. Skills Category Interactive Filter
 */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.tab-pill-btn, .filter-pill-btn');
  const cards = document.querySelectorAll('#skillsGrid .card, #skillsGrid .skill-card, #skillsGrid .modern-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/**
 * 5. Active Navbar Link Highlighting via IntersectionObserver
 */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-nav .nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));
}

/**
 * 6. Smooth Scrolling with Fixed Navbar Offset
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  const navHeight = 80;

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (navHeight + 10);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
      }
    });
  });
}

/**
 * 7. Modern Scroll Reveal Animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

/**
 * 8. Contact Form Real-Time Validation & Fallback Action
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const subjectInput = document.getElementById('senderSubject');
  const messageInput = document.getElementById('senderMessage');
  const submitBtn = document.getElementById('submitBtn');
  const statusMsg = document.getElementById('formStatusMsg');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (input, testFn) => {
    const errorEl = input.nextElementSibling;
    const isValid = testFn(input.value.trim());

    if (!isValid) {
      input.classList.add('is-invalid');
      if (errorEl && errorEl.classList.contains('form-error-text')) {
        errorEl.classList.add('visible');
      }
    } else {
      input.classList.remove('is-invalid');
      if (errorEl && errorEl.classList.contains('form-error-text')) {
        errorEl.classList.remove('visible');
      }
    }
    return isValid;
  };

  nameInput?.addEventListener('blur', () => validate(nameInput, val => val.length >= 2));
  emailInput?.addEventListener('blur', () => validate(emailInput, val => emailRegex.test(val)));
  messageInput?.addEventListener('blur', () => validate(messageInput, val => val.length >= 10));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validate(nameInput, val => val.length >= 2);
    const isEmailValid = validate(emailInput, val => emailRegex.test(val));
    const isMessageValid = validate(messageInput, val => val.length >= 10);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      if (statusMsg) {
        statusMsg.style.color = 'var(--error)';
        statusMsg.textContent = 'Please correct the highlighted fields.';
      }
      return;
    }

    const prevText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending Message...';

    const formData = new FormData();
    formData.append('access_key', '5e20853f-bd1b-436a-93d1-28bf93b6f0c7');
    formData.append('to', 'naikkunal360@gmail.com');
    formData.append('from_name', nameInput.value.trim());
    formData.append('replyto', emailInput.value.trim());
    formData.append('name', nameInput.value.trim());
    formData.append('email', emailInput.value.trim());
    formData.append('subject', subjectInput?.value?.trim() || 'Portfolio Inquiry for Kunal Naik');
    formData.append('message', messageInput.value.trim());

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        if (statusMsg) {
          statusMsg.style.color = 'var(--success)';
          statusMsg.textContent = 'Message sent successfully!';
        }
        showToast('Your message has been sent directly to Kunal!');
        form.reset();
      } else {
        if (statusMsg) {
          statusMsg.style.color = 'var(--error)';
          statusMsg.textContent = json.message || 'Something went wrong. Please try again.';
        }
      }
    })
    .catch(error => {
      if (statusMsg) {
        statusMsg.style.color = 'var(--error)';
        statusMsg.textContent = 'Something went wrong. Please try again later.';
      }
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = prevText;
      setTimeout(() => {
        if (statusMsg) statusMsg.textContent = '';
      }, 5000);
    });
  });
}

/**
 * 9. One-Click Quick Copy with Toast Notification
 */
function initQuickCopy() {
  const copyBtns = document.querySelectorAll('[data-copy]');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.getAttribute('data-copy');
      if (!val) return;

      navigator.clipboard.writeText(val).then(() => {
        showToast(`Copied to clipboard: ${val}`);
      }).catch(() => {
        showToast(`Contact: ${val}`);
      });
    });
  });
}

/**
 * 10. Floating Back to Top Button
 */
function initBackToTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


/**
 * Scroll Progress Bar
 */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/**
 * 12. Dynamic Copyright Year
 */
function initDynamicYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Global Toast Notification Helper
 */
function showToast(message) {
  const toast = document.getElementById('globalToast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

