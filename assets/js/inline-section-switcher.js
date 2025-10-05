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
      { id: 'minimal', name: 'بسيط', desc: 'تصميم نظيف وواسع' },
      { id: 'modern', name: 'عصري', desc: 'جريء وديناميكي' },
      { id: 'luxury', name: 'فاخر', desc: 'أنيق وفخم' }
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

  getSectionId(element, selector) {
    const allElements = document.querySelectorAll(selector);
    const index = Array.from(allElements).indexOf(element);
    return `${selector.replace(/\./g, '')}-${index}`;
  }

  getCurrentVariant(sectionId, category) {
    if (this.designs[sectionId]) {
      return this.designs[sectionId];
    }
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
              </svg>
            </button>

            <div class="inline-switcher__menu">
              <div class="inline-switcher__label">${config.name}</div>
              <div class="inline-switcher__divider"></div>
              ${this.variants.map(variant => `
                <button class="inline-switcher__option ${currentVariant === variant.id ? 'active' : ''}"
                        data-variant="${variant.id}">
                  <span class="inline-switcher__indicator inline-switcher__indicator--${variant.id}"></span>
                  <span class="inline-switcher__option-text">
                    <strong>${variant.name}</strong>
                    <small>${variant.desc}</small>
                  </span>
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
    document.querySelectorAll('.inline-switcher__toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const switcher = toggle.closest('.inline-switcher');
        const wasActive = switcher.classList.contains('active');

        document.querySelectorAll('.inline-switcher').forEach(s => {
          s.classList.remove('active');
        });

        if (!wasActive) {
          switcher.classList.add('active');
        }
      });
    });

    document.querySelectorAll('.inline-switcher__option').forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const switcher = option.closest('.inline-switcher');
        const sectionId = switcher.dataset.sectionId;
        const category = switcher.dataset.category;
        const variant = option.dataset.variant;

        this.designs[sectionId] = variant;
        this.saveDesigns();

        switcher.querySelectorAll('.inline-switcher__option').forEach(opt => {
          opt.classList.remove('active');
        });
        option.classList.add('active');

        this.applyVariantToSection(switcher, variant, category);
        switcher.classList.remove('active');

        console.log(`✓ Changed ${sectionId} to ${variant}`);
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.inline-switcher')) {
        document.querySelectorAll('.inline-switcher').forEach(s => {
          s.classList.remove('active');
        });
      }
    });

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

    this.variants.forEach(v => {
      section.classList.remove(`variant-${v.id}`);
      section.removeAttribute(`data-variant-${v.id}`);
    });

    section.classList.add(`variant-${variant}`);
    section.setAttribute('data-variant', variant);
    section.setAttribute(`data-${category}-variant`, variant);
    document.body.setAttribute(`data-${category}-variant`, variant);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new InlineSectionSwitcher();
  });
} else {
  new InlineSectionSwitcher();
}
