/**
 * Natal Solidário de Queimadas - PB
 * Script Principal: Interatividade, Neve Natalina, Lightbox, Filtros e Calculadora
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. EFEITO DE NEVE NATALINA EM CANVAS (Alta Performance & Toggle)
  // ==========================================================================
  const canvas = document.getElementById('snow-canvas');
  const toggleSnowBtn = document.getElementById('toggle-snow-btn');
  let ctx = null;
  let animationFrameId = null;
  let isSnowActive = localStorage.getItem('snow_active') !== 'false'; // Padrão: ativado
  let snowflakes = [];

  if (canvas) {
    ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Snowflake {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.radius = Math.random() * 2.5 + 1; // 1 a 3.5px
        this.density = Math.random() * 1 + 0.5;
        this.speedY = Math.random() * 1.2 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.sway = Math.random() * 0.02;
        this.swayAngle = Math.random() * Math.PI * 2;
      }

      update() {
        this.swayAngle += this.sway;
        this.x += Math.sin(this.swayAngle) * 0.5 + this.speedX;
        this.y += this.speedY;

        if (this.y > canvas.height || this.x < -10 || this.x > canvas.width + 10) {
          this.reset();
          this.y = -10;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Inicializa os flocos de neve
    const flakeCount = Math.min(Math.floor(window.innerWidth / 12), 70);
    for (let i = 0; i < flakeCount; i++) {
      const flake = new Snowflake();
      flake.y = Math.random() * canvas.height; // espalha pela tela inicial
      snowflakes.push(flake);
    }

    function animateSnow() {
      if (!isSnowActive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      snowflakes.forEach(flake => {
        flake.update();
        flake.draw();
      });
      animationFrameId = requestAnimationFrame(animateSnow);
    }

    function startSnow() {
      isSnowActive = true;
      canvas.style.display = 'block';
      toggleSnowBtn.classList.remove('inactive');
      toggleSnowBtn.querySelector('.btn-text').textContent = 'Neve: On';
      localStorage.setItem('snow_active', 'true');
      if (!animationFrameId) {
        animateSnow();
      }
    }

    function stopSnow() {
      isSnowActive = false;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = 'none';
      toggleSnowBtn.classList.add('inactive');
      toggleSnowBtn.querySelector('.btn-text').textContent = 'Neve: Off';
      localStorage.setItem('snow_active', 'false');
    }

    if (toggleSnowBtn) {
      toggleSnowBtn.addEventListener('click', () => {
        if (isSnowActive) {
          stopSnow();
        } else {
          startSnow();
        }
      });
    }

    // Início condicional da neve
    if (isSnowActive) {
      startSnow();
    } else {
      stopSnow();
    }
  }

  // ==========================================================================
  // 2. MENU MOBILE RESPONSIVO COM BACKDROP & ANIMAÇÃO
  // ==========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navBackdrop = document.getElementById('nav-backdrop');

  function openMobileNav() {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.add('open');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    if (navBackdrop) navBackdrop.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMobileNav() {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  function toggleMobileNav() {
    if (!mainNav) return;
    if (mainNav.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', toggleMobileNav);

    // Fecha ao clicar no backdrop escurecido
    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMobileNav);
    }

    // Fecha o menu ao clicar em qualquer link de navegação ou botão de doação
    mainNav.querySelectorAll('.nav-link, .nav-mobile-cta a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // Fecha o menu ao clicar fora do nav e do botão toggle
    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('open')) {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
          closeMobileNav();
        }
      }
    });

    // Fecha com tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        closeMobileNav();
      }
    });

    // Fecha caso redimensione para desktop (> 768px)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mainNav.classList.contains('open')) {
        closeMobileNav();
      }
    });
  }

  // ==========================================================================
  // 3. COPIAR CHAVE PIX & FEEDBACK TOAST
  // ==========================================================================
  const copyButtons = document.querySelectorAll('.btn-copy');
  const copyToast = document.getElementById('copy-toast');
  let toastTimer = null;

  function showToast(message) {
    if (!copyToast) return;
    copyToast.textContent = message || '✅ Chave copiada para a área de transferência!';
    copyToast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      copyToast.classList.remove('show');
    }, 3500);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      const inputEl = document.getElementById(targetId);

      if (inputEl) {
        const textToCopy = inputEl.value;

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(textToCopy)
            .then(() => showToast(`✅ Chave copiada: ${textToCopy}`))
            .catch(() => fallbackCopy(inputEl));
        } else {
          fallbackCopy(inputEl);
        }
      }
    });
  });

  function fallbackCopy(inputEl) {
    try {
      inputEl.select();
      inputEl.setSelectionRange(0, 99999);
      document.execCommand('copy');
      showToast(`✅ Chave copiada: ${inputEl.value}`);
    } catch (err) {
      alert(`Copie manualmente: ${inputEl.value}`);
    }
  }

  // ==========================================================================
  // 4. FILTROS DA GALERIA DE FOTOS
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualiza botões
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const categories = (item.getAttribute('data-category') || '').split(' ');
        const year = item.getAttribute('data-year');

        if (filterValue === 'all' || categories.includes(filterValue) || year === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ==========================================================================
  // 5. LIGHTBOX MODAL (Visualização de Imagens em Tela Cheia)
  // ==========================================================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  let currentLightboxIndex = -1;
  let activeGalleryCards = [];

  function getVisibleGalleryCards() {
    return Array.from(document.querySelectorAll('.gallery-item:not(.hidden) .gallery-card'));
  }

  function openLightbox(index) {
    activeGalleryCards = getVisibleGalleryCards();
    if (index < 0 || index >= activeGalleryCards.length) return;

    currentLightboxIndex = index;
    const card = activeGalleryCards[currentLightboxIndex];
    const imgEl = card.querySelector('.gallery-thumb');
    const titleEl = card.querySelector('.gallery-overlay h4');
    const descEl = card.querySelector('.gallery-overlay p');

    if (imgEl && lightboxImg) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt;
    }

    if (lightboxCaption) {
      const title = titleEl ? titleEl.textContent : '';
      const desc = descEl ? descEl.textContent : '';
      lightboxCaption.innerHTML = `<strong>${title}</strong><br><small>${desc}</small>`;
    }

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function nextLightbox() {
    activeGalleryCards = getVisibleGalleryCards();
    if (activeGalleryCards.length === 0) return;
    let nextIndex = (currentLightboxIndex + 1) % activeGalleryCards.length;
    openLightbox(nextIndex);
  }

  function prevLightbox() {
    activeGalleryCards = getVisibleGalleryCards();
    if (activeGalleryCards.length === 0) return;
    let prevIndex = (currentLightboxIndex - 1 + activeGalleryCards.length) % activeGalleryCards.length;
    openLightbox(prevIndex);
  }

  // Eventos de clique nas fotos da galeria
  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      activeGalleryCards = getVisibleGalleryCards();
      const index = activeGalleryCards.indexOf(card);
      if (index !== -1) {
        openLightbox(index);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);

  // Fecha clicando no backdrop
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-backdrop')) {
        closeLightbox();
      }
    });
  }

  // Teclado: Escape fecha, Setas navegam
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });

  // Gestos de toque (Swipe) em dispositivos móveis para navegar fotos
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  if (lightboxModal) {
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleLightboxSwipe();
    }, { passive: true });
  }

  function handleLightboxSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    // Dispara apenas se o gesto for predominantemente horizontal e tiver amplitude suficiente (> 45px)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
      if (deltaX < 0) {
        nextLightbox(); // Deslizar para a esquerda -> próxima foto
      } else {
        prevLightbox(); // Deslizar para a direita -> foto anterior
      }
    }
  }

  // ==========================================================================
  // 6. CALCULADORA DE IMPACTO SOLIDÁRIO INTERATIVA
  // ==========================================================================
  const presetButtons = document.querySelectorAll('.preset-btn');
  const customAmountInput = document.getElementById('custom-donation-amount');
  const impactTitle = document.getElementById('impact-display-title');
  const impactToysCount = document.getElementById('impact-toys-count');
  const impactSweetsCount = document.getElementById('impact-sweets-count');
  const impactMealsCount = document.getElementById('impact-meals-count');

  function updateImpact(amount) {
    const val = Math.max(5, Number(amount) || 0);

    if (impactTitle) {
      impactTitle.textContent = `Com R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, você proporciona:`;
    }

    // Cálculos de impacto baseados na realidade do projeto
    const toys = Math.max(1, Math.floor(val / 25));
    const cottonCandies = Math.max(2, Math.floor(val / 6));
    const foodItems = Math.max(1, Math.floor(val / 12));

    if (impactToysCount) {
      impactToysCount.textContent = `${toys} Brinquedo${toys > 1 ? 's' : ''}`;
    }

    if (impactSweetsCount) {
      impactSweetsCount.textContent = `${cottonCandies} Algodões Doces & Recreação`;
    }

    if (impactMealsCount) {
      if (val >= 90) {
        const cestas = Math.floor(val / 90);
        impactMealsCount.textContent = `${cestas} Cesta${cestas > 1 ? 's' : ''} Básica${cestas > 1 ? 's' : ''} Completa${cestas > 1 ? 's' : ''}`;
      } else {
        impactMealsCount.textContent = `${foodItems} Itens para Cestas Básicas`;
      }
    }
  }

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const amount = btn.getAttribute('data-amount');
      if (customAmountInput) customAmountInput.value = amount;
      updateImpact(amount);
    });
  });

  if (customAmountInput) {
    customAmountInput.addEventListener('input', (e) => {
      const val = e.target.value;
      presetButtons.forEach(btn => {
        if (btn.getAttribute('data-amount') === val) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      updateImpact(val);
    });
  }

  // ==========================================================================
  // 7. SANFONA DE PERGUNTAS FREQUENTES (FAQ Accordion)
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerEl = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Fecha todos os outros itens
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('open');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Abre ou fecha o clicado
      if (!isOpen) {
        item.classList.add('open');
        questionBtn.setAttribute('aria-expanded', 'true');
        answerEl.style.maxHeight = answerEl.scrollHeight + 'px';
      }
    });
  });

  // ==========================================================================
  // 8. FORMULÁRIO DE CONTATO & MANIFESTAÇÃO DE INTERESSE
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  const resetFormBtn = document.getElementById('reset-form-btn');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value,
        date: new Date().toISOString()
      };

      // Simula feedback de envio
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = 'Registrando apoio...';

      setTimeout(() => {
        // Salva localmente para não perder os contatos
        try {
          const leads = JSON.parse(localStorage.getItem('natal_solidario_manifestacoes') || '[]');
          leads.push(formData);
          localStorage.setItem('natal_solidario_manifestacoes', JSON.stringify(leads));
        } catch (err) {
          console.warn('Não foi possível salvar no localStorage:', err);
        }

        contactForm.style.display = 'none';
        contactSuccess.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = 'Enviar Manifestação de Apoio';
      }, 700);
    });

    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', () => {
        contactForm.reset();
        contactForm.style.display = 'flex';
        contactSuccess.style.display = 'none';
      });
    }
  }

  // ==========================================================================
  // 9. SCROLL SPY PARA MENU ATIVO
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

});
