/* ============================================
   INLINE SECTION SWITCHER - PER-SECTION CONTROLS
   Thahab Capital Website
   ============================================ */

class InlineSectionSwitcher {
  constructor() {
    // Section configuration with categories
    this.sectionConfig = {
      '.main-header': { category: 'header', name: 'الرأس' },
      '.main-slider': { category: 'hero', name: 'البانر الرئيسي' },
      '.page-header': { category: 'hero', name: 'رأس الصفحة' },
      '.about-one': { category: 'content', name: 'من نحن' },
      '.about-three': { category: 'content', name: 'من نحن' },
      '.counter-one': { category: 'content', name: 'الإحصائيات' },
      '.why-choose-one': { category: 'content', name: 'لماذا نحن' },
      '.apartment-one': { category: 'content', name: 'المشاريع' },
      '.apartments-two-page': { category: 'content', name: 'المشاريع' },
      '.apartment-details-one': { category: 'content', name: 'تفاصيل المشروع' },
      '.apartment-details-two': { category: 'content', name: 'تفاصيل المشروع' },
      '.testimonial-one': { category: 'content', name: 'التوصيات' },
      '.testimonial-two': { category: 'content', name: 'التوصيات' },
      '.cta-one': { category: 'content', name: 'دعوة للعمل' },
      '.floor-plan': { category: 'content', name: 'المخططات' },
      '.gallery-one': { category: 'gallery', name: 'المعرض' },
      '.contact-one': { category: 'forms', name: 'نموذج التواصل' },
      '.contact-page': { category: 'forms', name: 'صفحة التواصل' },
      '.site-footer': { category: 'footer', name: 'التذييل' }
    };

    this.variants = [
      { id: 'minimal', name: 'بسيط' },
      { id: 'modern', name: 'عصري' },
      { id: 'luxury', name: 'فاخر' }
    ];

    this.storageKey = 'thahabInlineSectionDesigns';
    this.init();
  }

  init() {
    this.loadSavedDesigns();
    this.injectSwitchers();
    this.applyAllDesigns();
    console.log('✓ Inline Section Switchers Initialized');
  }

  loadSavedDesigns() {
    const saved = localStorage.getItem(this.storageKey);
    this.designs = saved ? JSON.parse(saved) : {};
  }

  saveDesigns() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.designs));
  }

  // Get unique ID for a section element
  getSectionId(element, selector) {
    // Use selector + index if multiple exist
    const allElements = document.querySelectorAll(selector);
    const index = Array.from(allElements).indexOf(element);
    return `${selector.replace(/\./g, '')}-${index}`;
  }

  // Get current variant for a section
  getCurrentVariant(sectionId, category) {
    if (this.designs[sectionId]) {
      return this.designs[sectionId];
    }
    // Default variants per category
    const defaults = {
      header: 'minimal',
      hero: 'modern',
      content: 'modern',
      gallery: 'modern',
      forms: 'minimal',
      footer: 'minimal'
    };
    return defaults[category] || 'modern';
  }

  // Inject switcher into a section
  injectSwitchers() {
    let count = 0;

    Object.entries(this.sectionConfig).forEach(([selector, config]) => {
      const elements = document.querySelectorAll(selector);

      elements.forEach((element, index) => {
        const sectionId = this.getSectionId(element, selector);
        const currentVariant = this.getCurrentVariant(sectionId, config.category);

        const switcherHTML = `
          <div class="inline-switcher" data-section-id="${sectionId}" data-category="${config.category}">
            <button class="inline-switcher__toggle"
                    data-tooltip="${config.name}"
                    aria-label="تغيير تصميم ${config.name}">
              <i class="fas fa-palette"></i>
            </button>

            <div class="inline-switcher__menu">
              <div class="inline-switcher__label">${config.name}</div>
              <div class="inline-switcher__divider"></div>
              ${this.variants.map(variant => `
                <button class="inline-switcher__option ${currentVariant === variant.id ? 'active' : ''}"
                        data-variant="${variant.id}">
                  <span class="inline-switcher__indicator inline-switcher__indicator--${variant.id}"></span>
                  <span>${variant.name}</span>
                </button>
              `).join('')}
            </div>
          </div>
        `;

        element.insertAdjacentHTML('afterbegin', switcherHTML);
        count++;
      });
    });

    console.log(`✓ Injected ${count} inline switchers`);
    this.bindEvents();
  }

  bindEvents() {
    // Toggle switcher menu
    document.querySelectorAll('.inline-switcher__toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const switcher = toggle.closest('.inline-switcher');
        const wasActive = switcher.classList.contains('active');

        // Close all other switchers
        document.querySelectorAll('.inline-switcher').forEach(s => {
          s.classList.remove('active');
        });

        // Toggle current
        if (!wasActive) {
          switcher.classList.add('active');
        }
      });
    });

    // Variant selection
    document.querySelectorAll('.inline-switcher__option').forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const switcher = option.closest('.inline-switcher');
        const sectionId = switcher.dataset.sectionId;
        const category = switcher.dataset.category;
        const variant = option.dataset.variant;

        // Update design
        this.designs[sectionId] = variant;
        this.saveDesigns();

        // Update UI - mark option as active
        switcher.querySelectorAll('.inline-switcher__option').forEach(opt => {
          opt.classList.remove('active');
        });
        option.classList.add('active');

        // Apply variant to section
        this.applyVariantToSection(switcher, variant, category);

        // Close menu
        switcher.classList.remove('active');

        console.log(`✓ Changed ${sectionId} to ${variant}`);
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.inline-switcher')) {
        document.querySelectorAll('.inline-switcher').forEach(s => {
          s.classList.remove('active');
        });
      }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.inline-switcher').forEach(s => {
          s.classList.remove('active');
        });
      }
    });
  }

  applyAllDesigns() {
    document.querySelectorAll('.inline-switcher').forEach(switcher => {
      const sectionId = switcher.dataset.sectionId;
      const category = switcher.dataset.category;
      const variant = this.getCurrentVariant(sectionId, category);
      this.applyVariantToSection(switcher, variant, category);
    });
  }

  applyVariantToSection(switcher, variant, category) {
    const section = switcher.closest('section, header, footer');
    if (!section) return;

    // Remove all variant classes
    this.variants.forEach(v => {
      section.classList.remove(`variant-${v.id}`);
      section.removeAttribute(`data-variant-${v.id}`);
    });

    // Add new variant class
    section.classList.add(`variant-${variant}`);
    section.setAttribute('data-variant', variant);
    section.setAttribute(`data-${category}-variant`, variant);

    // Also update body attribute for global styles
    document.body.setAttribute(`data-${category}-variant`, variant);
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new InlineSectionSwitcher();
  });
} else {
  new InlineSectionSwitcher();
}
