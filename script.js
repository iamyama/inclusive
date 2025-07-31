// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-card, .service-card, .community-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
const animateCounter = (element, target, suffix = '') => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        if (suffix === 'billion') {
            element.textContent = `£${Math.floor(current)} billion`;
        } else if (suffix === '+') {
            element.textContent = `${Math.floor(current)}+`;
        } else if (suffix === 'in6') {
            element.textContent = `1 in ${Math.floor(current)}`;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 20);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statCards = entry.target.querySelectorAll('.stat-card');
            statCards.forEach((card, index) => {
                const h3 = card.querySelector('h3');
                const originalText = h3.textContent;
                
                setTimeout(() => {
                    if (index === 0) { // 1 in 6 UK
                        animateCounter(h3, 6, 'in6');
                    } else if (index === 1) { // £48 billion
                        animateCounter(h3, 48, 'billion');
                    } else if (index === 2) { // Cultural (no animation)
                        // Keep original text
                    } else if (index === 3) { // 300+
                        animateCounter(h3, 300, '+');
                    }
                }, index * 200);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Add click handlers for contact methods
document.addEventListener('DOMContentLoaded', () => {
    // Phone number click handler
    const phoneElements = document.querySelectorAll('[href^="tel:"]');
    phoneElements.forEach(el => {
        el.addEventListener('click', (e) => {
            // Allow default behavior for tel: links
        });
    });

    // WhatsApp link simulation
    const whatsappLinks = document.querySelectorAll('.social-link');
    whatsappLinks.forEach(link => {
        if (link.textContent.includes('WhatsApp')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // In a real implementation, this would open WhatsApp
                alert('WhatsApp integration would open here');
            });
        }
    });
});