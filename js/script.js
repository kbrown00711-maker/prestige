/**
 * Prestige Advisory Ltd - Professional Website JavaScript
 * Enhanced interactivity for modern, responsive design
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initNavigation();
  initScrollEffects();
  initOfficeSelection();
  initMobileNavigation();
  initContactForm();
  initAnimations();
  initOfficeInteraction(); // Add office interaction
});

/**
 * Navigation and smooth scrolling functionality
 */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  // Handle navigation clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calculate offset for fixed header
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        // Smooth scroll to section
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update active navigation
        updateActiveNavigation(targetId);

        // Close mobile nav if open
        closeMobileNav();
      }
    });
  });

  // Update active navigation based on scroll position
  window.addEventListener('scroll', updateActiveNavigationOnScroll);
}

/**
 * Update active navigation link
 */
function updateActiveNavigation(targetId) {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === targetId) {
      link.classList.add('active');
    }
  });
}

/**
 * Update active navigation based on scroll position
 */
function updateActiveNavigationOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const headerHeight = document.getElementById('header').offsetHeight;
  const scrollPosition = window.scrollY + headerHeight + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = '#' + section.id;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      updateActiveNavigation(sectionId);
    }
  });
}

/**
 * Header scroll effects
 */
function initScrollEffects() {
  const header = document.getElementById('header');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scroll');
    } else {
      header.classList.remove('scroll');
    }
  });
}

/**
 * Enhanced office selection functionality
 */
function initOfficeSelection() {
  const officeCards = document.querySelectorAll('.office-card');

  officeCards.forEach(card => {
    card.addEventListener('click', function() {
      selectOffice(this);
    });

    // Keyboard navigation
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectOffice(this);
      }

      // Arrow key navigation
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        navigateOffices(e.key === 'ArrowDown' ? 'next' : 'prev', officeCards, card);
      }
    });

    // Make focusable
    card.setAttribute('tabindex', '0');
  });
}

/**
 * Select office and update UI
 */
function selectOffice(selectedCard) {
  // Remove active state from all cards
  document.querySelectorAll('.office-card').forEach(card => {
    card.classList.remove('active');
  });

  // Add active state to selected card
  selectedCard.classList.add('active');

  // Update form with selected office
  updateContactForm(selectedCard.dataset.location);
}

/**
 * Navigate between office cards with arrow keys
 */
function navigateOffices(direction, officeCards, currentCard) {
  const currentIndex = Array.from(officeCards).indexOf(currentCard);
  let nextIndex;

  if (direction === 'next') {
    nextIndex = currentIndex < officeCards.length - 1 ? currentIndex + 1 : 0;
  } else {
    nextIndex = currentIndex > 0 ? currentIndex - 1 : officeCards.length - 1;
  }

  officeCards[nextIndex].focus();
}

/**
 * Update contact form with selected office
 */
function updateContactForm(officeLocation) {
  const officeSelect = document.querySelector('select[name="office_location"]');
  if (officeSelect) {
    officeSelect.value = officeLocation;

    // Trigger change event for validation
    officeSelect.dispatchEvent(new Event('change'));
  }
}

/**
 * Mobile navigation functionality
 */
function initMobileNavigation() {
  const mobileBtn = document.getElementById('mobileBtn');
  const nav = document.getElementById('nav');
  const header = document.getElementById('header');

  if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      // Toggle aria-expanded
      this.setAttribute('aria-expanded', !isExpanded);

      // Toggle classes
      header.classList.toggle('mobile-active');
      nav.classList.toggle('open');
      this.classList.toggle('active');

      // Prevent body scroll when mobile nav is open
      if (!isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !mobileBtn.contains(e.target) && nav.classList.contains('open')) {
        closeMobileNav();
      }
    });

    // Close mobile nav on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeMobileNav();
      }
    });
  }
}

/**
 * Close mobile navigation
 */
function closeMobileNav() {
  const mobileBtn = document.getElementById('mobileBtn');
  const nav = document.getElementById('nav');
  const header = document.getElementById('header');

  if (mobileBtn && nav) {
    mobileBtn.setAttribute('aria-expanded', 'false');
    header.classList.remove('mobile-active');
    nav.classList.remove('open');
    mobileBtn.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * Enhanced contact form functionality with validation
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearFieldError);
    });

    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      if (validateForm()) {
        submitForm(this);
      }
    });
  }
}

/**
 * Validate individual field
 */
function validateField(e) {
  const field = e.target;
  const fieldGroup = field.closest('label') || field.parentElement;
  const errorElement = fieldGroup.querySelector('.field-error') || createErrorElement(fieldGroup);

  let isValid = true;
  let errorMessage = '';

  // Required field validation
  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
    errorMessage = 'This field is required';
  }

  // Email validation
  if (field.type === 'email' && field.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value.trim())) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
  }

  // Phone validation (basic)
  if (field.type === 'tel' && field.value.trim()) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(field.value.trim())) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number';
    }
  }

  // Update field appearance and error message
  if (isValid) {
    field.classList.remove('field-error');
    field.classList.add('field-valid');
    errorElement.textContent = '';
  } else {
    field.classList.remove('field-valid');
    field.classList.add('field-error');
    errorElement.textContent = errorMessage;
  }

  return isValid;
}

/**
 * Clear field error on input
 */
function clearFieldError(e) {
  const field = e.target;
  const fieldGroup = field.closest('label') || field.parentElement;
  const errorElement = fieldGroup.querySelector('.field-error');

  if (errorElement && field.classList.contains('field-error')) {
    field.classList.remove('field-error');
    field.classList.add('field-valid');
    errorElement.textContent = '';
  }
}

/**
 * Create error message element
 */
function createErrorElement(fieldGroup) {
  const errorElement = document.createElement('div');
  errorElement.className = 'field-error';
  errorElement.style.color = 'var(--accent)';
  errorElement.style.fontSize = '0.75rem';
  errorElement.style.marginTop = '0.25rem';
  fieldGroup.appendChild(errorElement);
  return errorElement;
}

/**
 * Validate entire form
 */
function validateForm() {
  const form = document.getElementById('contactForm');
  const requiredFields = form.querySelectorAll('[required]');
  let isFormValid = true;

  requiredFields.forEach(field => {
    if (!validateField({ target: field })) {
      isFormValid = false;
    }
  });

  return isFormValid;
}

/**
 * Submit form (demo functionality)
 */
function submitForm(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  // Show loading state
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    // Show success message
    showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');

    // Reset form
    form.reset();

    // Reset field states
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.classList.remove('field-valid', 'field-error');
    });

    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Close success message after 5 seconds
    setTimeout(() => {
      hideFormMessage();
    }, 5000);

  }, 1500);
}

/**
 * Show form message
 */
function showFormMessage(message, type) {
  const formContainer = document.querySelector('.contact-form-container');
  const existingMessage = formContainer.querySelector('.form-message');

  if (existingMessage) {
    existingMessage.remove();
  }

  const messageElement = document.createElement('div');
  messageElement.className = `form-message form-${type}`;
  messageElement.innerHTML = `
    <div class="message-content">
      <span class="message-icon">${type === 'success' ? '✓' : '⚠'}</span>
      <span class="message-text">${message}</span>
    </div>
  `;

  // Add styles
  messageElement.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${type === 'success' ? 'var(--accent)' : '#ffc107'};
    color: white;
    padding: 1.5rem 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-lg);
    z-index: 1001;
    max-width: 400px;
    text-align: center;
    animation: slideIn 0.3s ease-out;
  `;

  formContainer.appendChild(messageElement);

  // Add animation keyframes if not exists
  if (!document.querySelector('#message-animations')) {
    const style = document.createElement('style');
    style.id = 'message-animations';
    style.textContent = `
      @keyframes slideIn {
        from { opacity: 0; transform: translate(-50%, -60%); }
        to { opacity: 1; transform: translate(-50%, -50%); }
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Hide form message
 */
function hideFormMessage() {
  const message = document.querySelector('.form-message');
  if (message) {
    message.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => {
      message.remove();
    }, 300);
  }
}

/**
 * Initialize animations and scroll-triggered effects
 */
function initAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.service-card, .stat-item, .office-card, .credential-item');
  animateElements.forEach(element => {
    observer.observe(element);
  });

  // Add CSS for animations if not exists
  if (!document.querySelector('#scroll-animations')) {
    const style = document.createElement('style');
    style.id = 'scroll-animations';
    style.textContent = `
      .service-card, .stat-item, .office-card, .credential-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }

      .service-card.animate-in, .stat-item.animate-in, .office-card.animate-in, .credential-item.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Utility function to debounce scroll events
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Office Location Interactive Functionality
 */
function initOfficeInteraction() {
  const officeCards = document.querySelectorAll('.office-card');

  // Handle office card clicks
  officeCards.forEach(card => {
    card.addEventListener('click', function() {
      const details = this.querySelector('.office-details');
      
      // Close all other office details
      officeCards.forEach(otherCard => {
        if (otherCard !== this) {
          const otherDetails = otherCard.querySelector('.office-details');
          otherDetails.style.display = 'none';
          otherCard.classList.remove('active');
        }
      });

      // Toggle current office details
      if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        this.classList.add('active');
      } else {
        details.style.display = 'none';
        this.classList.remove('active');
      }
    });
  });

  // Close office details when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.office-card')) {
      officeCards.forEach(card => {
        const details = card.querySelector('.office-details');
        details.style.display = 'none';
        card.classList.remove('active');
      });
    }
  });
}
