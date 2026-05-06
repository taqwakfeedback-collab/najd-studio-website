// Language and Currency Management
const langToggle = document.getElementById('langToggle');
const htmlElement = document.documentElement;
let currentLang = localStorage.getItem('language') || 'en';

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    updateScrollProgress();
    setupEventListeners();
});

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML lang attribute and direction
    htmlElement.lang = lang;
    if (lang === 'ar') {
        htmlElement.dir = 'rtl';
        document.body.classList.remove('ltr');
        document.body.classList.add('rtl');
        langToggle.textContent = 'English';
    } else {
        htmlElement.dir = 'ltr';
        document.body.classList.remove('rtl');
        document.body.classList.add('ltr');
        langToggle.textContent = 'العربية';
    }
    
    // Update all text content
    updateContent();
    updateCurrency();
}

function updateContent() {
    document.querySelectorAll('[data-en][data-ar]').forEach(element => {
        if (currentLang === 'ar') {
            element.textContent = element.getAttribute('data-ar');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-en-placeholder]').forEach(element => {
        if (currentLang === 'ar') {
            element.placeholder = element.getAttribute('data-ar-placeholder');
        } else {
            element.placeholder = element.getAttribute('data-en-placeholder');
        }
    });
}

function updateCurrency() {
    if (currentLang === 'ar') {
        // SAR Prices
        document.getElementById('basic-currency').textContent = '';
        document.getElementById('basic-price').textContent = '250';
        document.getElementById('standard-currency').textContent = '';
        document.getElementById('standard-price').textContent = '500';
        document.getElementById('premium-currency').textContent = '';
        document.getElementById('premium-price').textContent = '1,200';
    } else {
        // USD Prices
        document.getElementById('basic-currency').textContent = '$';
        document.getElementById('basic-price').textContent = '75';
        document.getElementById('standard-currency').textContent = '$';
        document.getElementById('standard-price').textContent = '150';
        document.getElementById('premium-currency').textContent = '$';
        document.getElementById('premium-price').textContent = '360';
    }
}

// Language toggle click
langToggle.addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'ar' : 'en');
});

// Setup event listeners
function setupEventListeners() {
    // Video Modal
    const videoBtn = document.getElementById('videoBtn');
    const videoModal = document.getElementById('videoModal');
    const modalClose = document.querySelector('.modal-close');

    if (videoBtn) {
        videoBtn.addEventListener('click', () => {
            videoModal.classList.remove('hidden');
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            videoModal.classList.add('hidden');
        });
    }

    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.add('hidden');
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Get WhatsApp message
    const nameInput = e.target.querySelector('input[type="text"]');
    const emailInput = e.target.querySelector('input[type="email"]');
    const serviceSelect = e.target.querySelector('select');
    const messageTextarea = e.target.querySelector('textarea');
    
    const message = `Hello Najd Studio,\n\nName: ${nameInput.value}\nEmail: ${emailInput.value}\nService: ${serviceSelect.value}\n\nMessage: ${messageTextarea.value}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/966539873384?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    e.target.reset();
}

// Scroll progress indicator
window.addEventListener('scroll', updateScrollProgress);

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

// Add animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .faq-item').forEach(el => {
    observer.observe(el);
});

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (if needed)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}
