// Smooth Scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', id);
  });
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

let isMobileLayout = null;

function updateLayoutVars() {
  const nav = document.querySelector('.glass-nav');
  if (!nav) return;
  const navHeight = Math.round(nav.getBoundingClientRect().height);
  document.documentElement.style.setProperty('--nav-h', `${navHeight}px`);
}

function clearCardAnimations() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
  gsap.set('.wrapper .card-wrapper, .wrapper .card', { clearProps: 'all' });
}

// Initialize scroll stacking animation
function init3DScrollAnimation() {
  // Check if GSAP is available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not loaded. Check script order.');
    return;
  }

  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  clearCardAnimations();
  updateLayoutVars();

  const mobileNow = window.matchMedia('(max-width: 767.98px)').matches;
  isMobileLayout = mobileNow;
  const navHeight =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
      10,
    ) || 72;
  const sectionHead = document.querySelector('#product-cards .section-head');
  const sectionHeadHeight = sectionHead
    ? Math.round(sectionHead.getBoundingClientRect().height)
    : 72;
  const pinStartOffset = navHeight + sectionHeadHeight + 24;

  // Select all case-study wrappers and cards only
  const cardsWrappers = gsap.utils.toArray('.wrapper .card-wrapper');
  const cards = cardsWrappers.map(wrapper => wrapper.querySelector('.card'));

  if (cardsWrappers.length === 0) {
    return;
  }

  // Keep a predictable stacking order while cards are pinned/overlapping.
  cardsWrappers.forEach((wrapper, i) => {
    wrapper.style.zIndex = String(10 + i);
    if (cards[i]) cards[i].style.zIndex = String(20 + i);
  });

  if (mobileNow) {
    cardsWrappers.forEach((wrapper, i) => {
      const card = cards[i];
      const mobileScale = i === cards.length - 1 ? 1 : 0.94 + 0.02 * i;

      gsap.to(card, {
        scale: mobileScale,
        y: -8 * i,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top ' + (pinStartOffset + 6 * i),
          end: 'bottom ' + (navHeight + sectionHeadHeight + 360),
          endTrigger: '.wrapper',
          scrub: true,
          pin: wrapper,
          pinSpacing: false,
        },
      });
    });
    return;
  }

  // Create animation for each card
  cardsWrappers.forEach((wrapper, i) => {
    const card = cards[i];
    let scale = 1;

    // Apply scale transforms to all but the last card
    if (i !== cards.length - 1) {
      scale = 0.9 + 0.025 * i;
    }

    // Create the GSAP animation with ScrollTrigger (no rotation)
    gsap.to(card, {
      scale: scale,
      transformOrigin: 'top center',
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top ' + (pinStartOffset + 10 * i),
        end: 'bottom 600',
        endTrigger: '.wrapper',
        scrub: true,
        pin: wrapper,
        pinSpacing: false,
        markers: false,
        id: i + 1,
      },
    });
  });

  // Optional: Add a subtle fade-in animation for cards on load
  gsap.from('.wrapper .card', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out',
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    updateLayoutVars();
    init3DScrollAnimation();
  });
} else {
  // DOM already loaded
  setTimeout(() => {
    updateLayoutVars();
    init3DScrollAnimation();
  }, 100);
}

// Refresh on window resize
window.addEventListener('resize', function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined')
    return;
  updateLayoutVars();

  const mobileNow = window.matchMedia('(max-width: 767.98px)').matches;
  if (isMobileLayout !== mobileNow) {
    setTimeout(init3DScrollAnimation, 120);
    return;
  }
  setTimeout(() => ScrollTrigger.refresh(), 100);
});
