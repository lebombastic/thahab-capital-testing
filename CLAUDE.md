# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Thahab Capital Real Estate Development Website** - A multi-page Arabic/RTL website for a Saudi Arabian real estate development company specializing in luxury residential communities.

The website showcases:
- Real estate projects (Aura, Mansouriya, Asela, Ajwaa Park)
- Company services (development, project management, engineering design, investment)
- Company information and leadership
- Contact forms and social media integration

## Technology Stack

- **Frontend**: Static HTML5 website with RTL (right-to-left) support
- **CSS Framework**: Bootstrap 5 (RTL version)
- **JavaScript Libraries**:
  - jQuery 3.6.0
  - Swiper.js (image sliders)
  - Owl Carousel (carousels)
  - WOW.js (scroll animations)
  - Various vendor libraries (see assets/vendors/)
- **Fonts**:
  - Google Fonts: Tajawal (main Arabic font), Manrope, Teko
  - Custom icon fonts (alipes-icons, reey-font)
- **Language**: Primary Arabic (RTL), with Google Translate integration

## File Structure

```
thahab.sa/
├── index.html              # Homepage
├── about-us.html          # About page
├── projects.html          # Projects listing
├── develop.html           # Development page (variant 1)
├── develop2.html          # Development page (variant 2)
├── develop3.html          # Development page (variant 3)
├── develop4.html          # Development page (variant 4)
├── management.html        # Management page (variant 1)
├── management3.html       # Management page (variant 3)
├── management4.html       # Management page (variant 4)
├── Auora.html            # Aura project details
├── contact.html          # Contact page (variant 1)
├── contactus.html        # Contact page (variant 2)
└── assets/
    ├── css/              # Custom stylesheets (RTL versions)
    ├── js/               # JavaScript files
    ├── images/           # Images and resources
    └── vendors/          # Third-party libraries
```

## Key Features & Architecture

### RTL (Right-to-Left) Support
- All pages use `dir="rtl"` and `lang="ar"` attributes
- Custom RTL stylesheets:
  - `alipes-rtl.css` - Main RTL styles
  - `alipes-responsive-rtl.css` - Responsive RTL styles
  - `alipes-custom-rtl.css` - Custom RTL modifications

### Main Sections (index.html)
1. **Header/Navigation** - Logo, main menu with links to sections
2. **Hero Slider** - Swiper.js carousel with project images
3. **About Section** - Services overview with checkmarks
4. **Counter Section** - Mission, Vision, Story cards
5. **Why Choose** - Feature points with video integration
6. **Projects Gallery** - 4 main projects showcase
7. **Image Gallery** - Owl Carousel of project photos
8. **Testimonials** - CEO and Chairman statements
9. **Contact Form** - Integration with `assets/inc/sendemail.php`
10. **Google Maps** - Embedded location
11. **Footer** - Contact info, newsletter, social links

### Contact Information
- **Phone**: +966 0112250555
- **Email**: info@thahab.sa
- **Riyadh Office**: Exit 2, Hittin District, Robin Plaza Building
- **Jeddah Office**: Sari Street, Business Tower
- **Social Media**: Twitter/X, Facebook, TikTok, Instagram

### External Links
- Aura project website: https://aura.thahab.sa/
- Video: Pixabay video integration
- Google Translate API for language switching

## Development Commands

This is a static HTML website with no build process. To work on this project:

### Local Development
```bash
# Serve the website locally (use any static server)
python -m http.server 8000
# OR
npx serve .
# OR
php -S localhost:8000
```

### File Editing
- **HTML pages**: Edit directly in root directory
- **Styles**: Modify files in `assets/css/`
- **Scripts**: Edit files in `assets/js/`
- **Images**: Add/update in `assets/images/`

### Testing
- Test all pages for RTL layout consistency
- Verify form submissions work with `assets/inc/sendemail.php`
- Check responsive behavior on mobile devices
- Test all slider/carousel functionality
- Verify social media links are functional

## Important Notes

1. **Multiple Page Variants**: There are multiple versions of some pages (develop.html, develop2.html, etc.). Check with stakeholders which are active/deprecated.

2. **Arabic Content**: All text content is in Arabic. When making changes:
   - Ensure RTL directionality is maintained
   - Use Tajawal font family for new Arabic text
   - Test text alignment (right-aligned for Arabic)

3. **Form Handler**: Contact form posts to `assets/inc/sendemail.php` - ensure this backend script exists and is properly configured for the server environment.

4. **Assets Path**: All asset paths use relative URLs starting with `assets/` - maintain this convention.

5. **Template Base**: Website appears to be built on "Alipes" HTML template - respect existing naming conventions and structure.

6. **Google Translate**: Integrated via `//translate.google.com/translate_a/element.js` with custom language switcher in toolbar.

## Common Tasks

### Adding a New Project
1. Add project image to `assets/images/resources/`
2. Update `index.html` apartment-one section with new project card
3. Optionally create dedicated project detail page (like Auora.html)
4. Update `projects.html` if it exists

### Modifying Contact Information
- Update footer section in all HTML files
- Update mobile navigation contact list
- Update Google Maps iframe embed code

### Updating Social Media Links
- Footer: `.site-footer__social` section
- Mobile nav: `.mobile-nav__social` section
- Header (if uncommented): `.main-header__top` section
