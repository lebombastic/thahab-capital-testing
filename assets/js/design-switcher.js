/**
 * Design Switcher System
 * Thahab Capital Website - Live Design Variant Preview
 * Minimal Elegant | Modern Bold | Luxury Premium
 */

(function() {
    'use strict';

    // Design Variants Configuration
    const DESIGN_VARIANTS = {
        variant1: {
            id: 'variant1',
            name: 'Minimal Elegant',
            description: 'Clean, spacious, subtle animations',
            className: 'design-variant-1'
        },
        variant2: {
            id: 'variant2',
            name: 'Modern Bold',
            description: 'Vibrant, dynamic, smooth transitions',
            className: 'design-variant-2'
        },
        variant3: {
            id: 'variant3',
            name: 'Luxury Premium',
            description: 'Rich, sophisticated, elegant effects',
            className: 'design-variant-3'
        }
    };

    const STORAGE_KEY = 'thahabDesignVariant';
    const DEFAULT_VARIANT = 'variant1';

    class DesignSwitcher {
        constructor() {
            this.currentVariant = this.loadVariant();
            this.init();
        }

        init() {
            this.createSwitcherUI();
            this.applyVariant(this.currentVariant);
            this.attachEventListeners();
            console.log('🎨 Design Switcher initialized:', this.currentVariant);
        }

        createSwitcherUI() {
            // Create switcher container
            const switcher = document.createElement('div');
            switcher.className = 'design-switcher';
            switcher.innerHTML = `
                <button class="design-switcher__toggle" aria-label="Toggle Design Switcher">
                    <i class="fas fa-palette"></i>
                </button>
                <div class="design-switcher__panel">
                    <h3 class="design-switcher__title">اختر التصميم</h3>
                    <div class="design-switcher__options">
                        ${Object.values(DESIGN_VARIANTS).map(variant => `
                            <div class="design-switcher__option ${this.currentVariant === variant.id ? 'active' : ''}"
                                 data-variant="${variant.id}">
                                <p class="design-switcher__option-name">${variant.name}</p>
                                <p class="design-switcher__option-desc">${variant.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            // Add to body
            document.body.appendChild(switcher);

            // Store references
            this.toggleButton = switcher.querySelector('.design-switcher__toggle');
            this.panel = switcher.querySelector('.design-switcher__panel');
            this.options = switcher.querySelectorAll('.design-switcher__option');
        }

        attachEventListeners() {
            // Toggle panel
            this.toggleButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.togglePanel();
            });

            // Close panel when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.design-switcher')) {
                    this.closePanel();
                }
            });

            // Variant selection
            this.options.forEach(option => {
                option.addEventListener('click', (e) => {
                    const variantId = e.currentTarget.getAttribute('data-variant');
                    this.switchVariant(variantId);
                });
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closePanel();
                }
            });
        }

        togglePanel() {
            this.panel.classList.toggle('active');
        }

        closePanel() {
            this.panel.classList.remove('active');
        }

        switchVariant(variantId) {
            if (this.currentVariant === variantId) return;

            console.log('🎨 Switching to variant:', variantId);

            // Remove old variant class
            const oldVariant = DESIGN_VARIANTS[this.currentVariant];
            if (oldVariant) {
                document.body.classList.remove(oldVariant.className);
            }

            // Apply new variant
            this.currentVariant = variantId;
            this.applyVariant(variantId);
            this.saveVariant(variantId);

            // Update UI
            this.updateActiveOption();

            // Close panel with smooth animation
            setTimeout(() => this.closePanel(), 300);

            // Show notification
            this.showNotification(DESIGN_VARIANTS[variantId].name);
        }

        applyVariant(variantId) {
            const variant = DESIGN_VARIANTS[variantId];
            if (!variant) {
                console.warn('Variant not found:', variantId);
                return;
            }

            // Remove all variant classes
            Object.values(DESIGN_VARIANTS).forEach(v => {
                document.body.classList.remove(v.className);
            });

            // Add new variant class
            document.body.classList.add(variant.className);

            // Apply with smooth transition
            document.body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 500);
        }

        updateActiveOption() {
            this.options.forEach(option => {
                const variantId = option.getAttribute('data-variant');
                if (variantId === this.currentVariant) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            });
        }

        loadVariant() {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved && DESIGN_VARIANTS[saved]) {
                    return saved;
                }
            } catch (e) {
                console.warn('LocalStorage not available:', e);
            }
            return DEFAULT_VARIANT;
        }

        saveVariant(variantId) {
            try {
                localStorage.setItem(STORAGE_KEY, variantId);
            } catch (e) {
                console.warn('Could not save variant:', e);
            }
        }

        showNotification(variantName) {
            // Create notification element
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 30px;
                left: 50%;
                transform: translateX(-50%) translateY(-100px);
                background: linear-gradient(135deg, #d4af37 0%, #f4e4b3 100%);
                color: #fff;
                padding: 16px 32px;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
                font-family: 'Tajawal', sans-serif;
                font-weight: 600;
                z-index: 999999;
                transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            `;
            notification.textContent = `تم تطبيق: ${variantName}`;

            document.body.appendChild(notification);

            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(-50%) translateY(0)';
            }, 10);

            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(-50%) translateY(-100px)';
                setTimeout(() => notification.remove(), 400);
            }, 3000);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new DesignSwitcher();
        });
    } else {
        new DesignSwitcher();
    }

    // Expose to global scope for debugging
    window.DesignSwitcher = DesignSwitcher;

})();
