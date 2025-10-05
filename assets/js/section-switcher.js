/* ============================================
   SECTION-BASED DESIGN SWITCHER - COMPLETE
   Thahab Capital Website
   ============================================ */

class SectionDesignSwitcher {
  constructor() {
    this.categories = {
      header: {
        name: 'الرأس والتنقل',
        selectors: [
          '.main-header',
          '.stricky-header',
          '.main-menu',
          '.mobile-nav__wrapper',
          '.search-popup'
        ]
      },
      hero: {
        name: 'البانر الرئيسي',
        selectors: [
          '.main-slider',
          '.page-header'
        ]
      },
      content: {
        name: 'أقسام المحتوى',
        selectors: [
          '.about-one',
          '.about-three',
          '.counter-one',
          '.why-choose-one',
          '.brand-one',
          '.brand-two',
          '.apartment-one',
          '.apartments-two-page',
          '.apartment-details-one',
          '.apartment-details-two',
          '.testimonial-one',
          '.testimonial-two',
          '.cta-one',
          '.cta-three',
          '.news-one',
          '.floor-plan'
        ]
      },
      gallery: {
        name: 'المعرض',
        selectors: [
          '.gallery-one'
        ]
      },
      forms: {
        name: 'النماذج',
        selectors: [
          '.contact-one',
          '.contact-page',
          '.contact-one__form-box',
          '.contact-page__form'
        ]
      },
      footer: {
        name: 'التذييل',
        selectors: [
          '.site-footer',
          '.site-footer__inner'
        ]
      },
      special: {
        name: 'العناصر الخاصة',
        selectors: [
          '.google-map',
          '.custom-cursor'
        ]
      }
    };

    this.variants = ['minimal', 'modern', 'luxury'];
    this.storageKey = 'thahabSectionDesigns';
    this.init();
  }

  init() {
    this.loadSavedDesigns();
    this.createSwitcherUI();
    this.applyDesigns();
    this.bindEvents();
    console.log('✓ Section Switcher Initialized - Targeting', this.countElements(), 'elements');
  }

  // Count how many elements will be affected
  countElements() {
    let count = 0;
    Object.values(this.categories).forEach(category => {
      category.selectors.forEach(selector => {
        count += document.querySelectorAll(selector).length;
      });
    });
    return count;
  }

  loadSavedDesigns() {
    const saved = localStorage.getItem(this.storageKey);
    this.currentDesigns = saved ? JSON.parse(saved) : {
      header: 'minimal',
      hero: 'modern',
      content: 'modern',
      gallery: 'modern',
      forms: 'minimal',
      footer: 'minimal',
      special: 'minimal'
    };
  }

  saveDesigns() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.currentDesigns));
    console.log('✓ Designs saved to localStorage');
  }

  applyDesigns() {
    // Apply data attributes to body for global tracking
    Object.entries(this.currentDesigns).forEach(([category, variant]) => {
      document.body.setAttribute(`data-${category}-variant`, variant);
    });

    // Apply to actual sections
    this.applyToSections();
  }

  applyToSections() {
    let appliedCount = 0;

    Object.entries(this.categories).forEach(([categoryName, categoryData]) => {
      const variant = this.currentDesigns[categoryName];

      categoryData.selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
          // Remove all variant classes
          this.variants.forEach(v => {
            el.classList.remove(`variant-${v}`);
            el.removeAttribute(`data-variant-${v}`);
          });

          // Add new variant class
          el.classList.add(`variant-${variant}`);
          el.setAttribute('data-variant', variant);
          el.setAttribute(`data-${categoryName}-variant`, variant);

          appliedCount++;
        });
      });
    });

    console.log(`✓ Applied variants to ${appliedCount} elements`);
  }

  createSwitcherUI() {
    const switcherHTML = `
      <div class="section-switcher" id="sectionSwitcher">
        <button class="section-switcher__toggle" id="switcherToggle" aria-label="تبديل التصميم">
          <i class="fas fa-palette"></i>
          <span class="section-switcher__badge">${this.countElements()}</span>
        </button>

        <div class="section-switcher__panel" id="switcherPanel">
          <div class="section-switcher__header">
            <h3>تخصيص التصميم</h3>
            <button class="section-switcher__close" id="switcherClose">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="section-switcher__content">
            ${Object.keys(this.categories).map(cat => this.createCategoryControl(cat)).join('')}
          </div>

          <div class="section-switcher__footer">
            <button class="section-switcher__reset" id="switcherReset">
              إعادة تعيين
            </button>
            <button class="section-switcher__apply" id="switcherApply">
              حفظ التغييرات
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', switcherHTML);
  }

  createCategoryControl(categoryName) {
    const category = this.categories[categoryName];
    const variantLabels = {
      minimal: 'بسيط',
      modern: 'عصري',
      luxury: 'فاخر'
    };

    // Count elements in this category
    let elementCount = 0;
    category.selectors.forEach(selector => {
      elementCount += document.querySelectorAll(selector).length;
    });

    // Skip if no elements found
    if (elementCount === 0) return '';

    return `
      <div class="section-switcher__category">
        <label class="section-switcher__label">
          ${category.name}
          <span class="section-switcher__count">(${elementCount})</span>
        </label>
        <div class="section-switcher__variants">
          ${this.variants.map(variant => `
            <button
              class="section-switcher__variant ${this.currentDesigns[categoryName] === variant ? 'active' : ''}"
              data-category="${categoryName}"
              data-variant="${variant}"
              title="${variantLabels[variant]}"
            >
              <span class="variant-preview variant-preview--${variant}"></span>
              <span class="variant-label">${variantLabels[variant]}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Toggle panel
    const toggleBtn = document.getElementById('switcherToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        document.getElementById('switcherPanel').classList.toggle('active');
      });
    }

    // Close panel
    const closeBtn = document.getElementById('switcherClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.getElementById('switcherPanel').classList.remove('active');
      });
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
      const switcher = document.getElementById('sectionSwitcher');
      const panel = document.getElementById('switcherPanel');
      if (switcher && panel && !switcher.contains(e.target) && panel.classList.contains('active')) {
        panel.classList.remove('active');
      }
    });

    // Variant selection
    document.querySelectorAll('.section-switcher__variant').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const button = e.currentTarget;
        const category = button.dataset.category;
        const variant = button.dataset.variant;

        // Update selection
        this.currentDesigns[category] = variant;

        // Update UI
        document.querySelectorAll(`[data-category="${category}"]`).forEach(b => {
          b.classList.remove('active');
        });
        button.classList.add('active');

        // Apply immediately for live preview
        this.applyDesigns();

        console.log(`✓ Changed ${category} to ${variant}`);
      });
    });

    // Reset all
    const resetBtn = document.getElementById('switcherReset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('هل تريد إعادة تعيين جميع التصاميم إلى الإعدادات الافتراضية؟')) {
          this.currentDesigns = {
            header: 'minimal',
            hero: 'modern',
            content: 'modern',
            gallery: 'modern',
            forms: 'minimal',
            footer: 'minimal',
            special: 'minimal'
          };
          this.saveDesigns();
          this.showNotification('تمت إعادة التعيين بنجاح ✓');
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
      });
    }

    // Save and close
    const applyBtn = document.getElementById('switcherApply');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        this.saveDesigns();
        document.getElementById('switcherPanel').classList.remove('active');
        this.showNotification('تم حفظ التغييرات بنجاح ✓');
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // ESC to close panel
      if (e.key === 'Escape') {
        document.getElementById('switcherPanel')?.classList.remove('active');
      }
      // Ctrl+D to toggle panel
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        document.getElementById('switcherPanel')?.classList.toggle('active');
      }
    });
  }

  showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.section-switcher__notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'section-switcher__notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SectionDesignSwitcher();
  });
} else {
  new SectionDesignSwitcher();
}
