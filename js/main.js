/**
 * Script Principal - Animações GSAP, Navegação e Interações
 * Léa Nascimento - Regularização Imobiliária, Licenciamento & Incorporação
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scrolled State
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Drawer Navigation
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const drawerCloseBtn = document.querySelector('.mobile-drawer-close');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const mobileDrawerLinks = document.querySelectorAll('.mobile-drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  mobileDrawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Highlight Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 4. GSAP & ScrollTrigger Animations
  if (typeof gsap !== 'undefined') {
    // Registrar Plugin ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Section Animations
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    heroTl
      .from('.hero-content .badge-tag', { opacity: 0, y: -20, delay: 0.2 })
      .from('.hero-title', { opacity: 0, y: 30 }, '-=0.7')
      .from('.hero-description', { opacity: 0, y: 25 }, '-=0.7')
      .from('.hero-cta-group', { opacity: 0, y: 20 }, '-=0.7')
      .from('.hero-trust-bar', { opacity: 0, y: 20 }, '-=0.7')
      .from('.hero-photo-wrapper', { opacity: 0, scale: 0.95, duration: 1.2 }, '-=1')
      .from('.hero-floating-card', { opacity: 0, scale: 0.8, stagger: 0.2 }, '-=0.6');

    // ScrollTrigger Animations para Seções
    if (typeof ScrollTrigger !== 'undefined') {
      // Fade-up geral para cabeçalhos de seções
      gsap.utils.toArray('.section-header').forEach((header) => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
          },
          opacity: 0,
          y: 35,
          duration: 0.8,
          ease: 'power2.out',
        });
      });

      // Cards de Problemas (Stagger)
      gsap.from('.problem-card', {
        scrollTrigger: {
          trigger: '.problems-grid',
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Acordeão de Serviços (Efeito removido para garantir alinhamento e espaçamento perfeitos)

      // Card VIP Incorporação
      gsap.from('.incorporacao-vip-card', {
        scrollTrigger: {
          trigger: '.incorporacao-vip-card',
          start: 'top 75%',
        },
        opacity: 0,
        scale: 0.96,
        y: 40,
        duration: 1,
        ease: 'power3.out',
      });

      // Conscientização Cards
      gsap.from('.awareness-card', {
        scrollTrigger: {
          trigger: '.awareness-grid',
          start: 'top 80%',
        },
        opacity: 0,
        y: 35,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
      });

      // Diferenciais (Efeito removido para garantir alinhamento perfeito)
      // Sobre Mim
      gsap.from('.about-photo-wrapper', {
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 75%',
        },
        opacity: 0,
        x: -40,
        duration: 1,
        ease: 'power2.out',
      });

      gsap.from('.about-content', {
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 75%',
        },
        opacity: 0,
        x: 40,
        duration: 1,
        ease: 'power2.out',
      });

      // Timeline de Atendimento (Efeito removido para garantir alinhamento perfeito)
      // Reviews
      gsap.from('.review-card', {
        scrollTrigger: {
          trigger: '.reviews-grid',
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
      });
    }
  }

  // 5. Contador Animado para "+2.000" Processos
  const statElement = document.querySelector('.count-up');
  if (statElement) {
    let started = false;
    window.addEventListener('scroll', () => {
      const rect = statElement.getBoundingClientRect();
      if (!started && rect.top < window.innerHeight) {
        started = true;
        let count = 0;
        const target = 2000;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            statElement.textContent = '+2.000';
            clearInterval(timer);
          } else {
            statElement.textContent = `+${count.toLocaleString('pt-BR')}`;
          }
        }, 20);
      }
    });
  }
});
