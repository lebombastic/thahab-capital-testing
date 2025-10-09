// Enhanced Theme Switcher Interactions
jQuery(document).ready(function($) {
  
  // Add icons to theme switcher options (works with the nice-select plugin)
  function enhanceThemeSwitchers() {
    setTimeout(function() {
      // Add icons to the nice-select dropdown items
      $('.nice-select .option[data-value="theme-1"]').prepend('<span class="theme-icon">🏠</span>');
      $('.nice-select .option[data-value="theme-2"]').prepend('<span class="theme-icon">✨</span>');
      $('.nice-select .option[data-value="theme-3"]').prepend('<span class="theme-icon">🔲</span>');
      $('.nice-select .option[data-value="theme-4"]').prepend('<span class="theme-icon">💫</span>');
      
      // Add hover tooltip to main theme switcher
      $('.theme-switcher').append('<span class="theme-switcher-tooltip">Choose site theme</span>');
      
      // Add helper text to section theme switchers
      $('.section-theme-switcher').each(function() {
        $(this).append('<span class="section-theme-switcher-helper">Change section style</span>');
      });
    }, 500); // Slight delay to ensure nice-select has initialized
  }
  
  // Check if we should show the theme tooltips
  var hasSeenTooltip = localStorage.getItem('hasSeenThemeTooltip');
  if (!hasSeenTooltip) {
    // Show tooltip on first visit
    setTimeout(function() {
      $('.theme-switcher').addClass('show-tooltip');
      setTimeout(function() {
        $('.theme-switcher').removeClass('show-tooltip');
        localStorage.setItem('hasSeenThemeTooltip', 'true');
      }, 5000);
    }, 2000);
  }
  
  // Add pulse animation to section theme switchers on page load
  $('.section-theme-switcher').each(function(index) {
    var $this = $(this);
    setTimeout(function() {
      $this.addClass('pulse');
      setTimeout(function() {
        $this.removeClass('pulse');
      }, 1000);
    }, 1000 + (index * 300)); // Staggered animation
  });
  
  // Apply theme with fade transition
  $(document).on('change', '.section-theme-select, .theme-select', function() {
    var $section = $(this).closest('section, header, footer, .counter-one, .gallery-one, .testimonial-one, .contact-one, .google-map');
    
    if ($section && $section.length) {
      $section.addClass('theme-transitioning');
    }
  });
  
  // Initialize the enhanced theme switchers
  enhanceThemeSwitchers();
  
  // Re-apply enhancements when nice-select is initialized/refreshed
  $(document).on('DOMNodeInserted', '.nice-select', function() {
    enhanceThemeSwitchers();
  });
  
});