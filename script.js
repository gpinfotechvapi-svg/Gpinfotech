// Service Toggle Function
function openService(index) {
    const cards = document.querySelectorAll(".service-card");
    
    cards.forEach((card, i) => {
        if (i === index) {
            card.classList.toggle("active");
            
            // Add animation when opening
            if (card.classList.contains("active")) {
                card.style.animation = "pulse 0.5s ease";
                setTimeout(() => {
                    card.style.animation = "";
                }, 500);
            }
        } else {
            card.classList.remove("active");
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

// Formspree Form Handling - Updated for label-based form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Get the submit button
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Let the form submit normally to Formspree
        // The page will redirect to Formspree success page
        
        // Note: The timeout below is a backup in case something goes wrong
        // It won't execute if the form submits and redirects successfully
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 5000);
    });
}

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
    z-index: 99;
    transition: all 0.3s;
`;

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
    scrollTopBtn.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.6)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
    scrollTopBtn.style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.4)';
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.animation = 'fadeIn 0.3s ease';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Add hover effect for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('active')) {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('active')) {
            card.style.transform = 'translateY(0) scale(1)';
        } else {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        }
    });
});

// Update copyright year
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
}

// Form field animations and validation
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(field => {
    // Add focus effects
    field.addEventListener('focus', () => {
        field.parentElement.style.transform = 'translateY(-2px)';
        field.parentElement.style.transition = 'transform 0.3s';
    });
    
    field.addEventListener('blur', () => {
        field.parentElement.style.transform = 'translateY(0)';
    });
    
    // Simple validation styling
    field.addEventListener('invalid', (e) => {
        e.preventDefault();
        field.style.borderColor = '#ef4444';
    });
    
    field.addEventListener('input', () => {
        if (field.validity.valid) {
            field.style.borderColor = '#22c55e';
        } else {
            field.style.borderColor = '#e2e8f0';
        }
    });
});

// Prevent multiple service cards from being open at once
document.addEventListener('click', (e) => {
    if (!e.target.closest('.service-card')) {
        document.querySelectorAll('.service-card').forEach(card => {
            card.classList.remove('active');
        });
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.service-card').forEach(card => {
            card.classList.remove('active');
        });
    }
});

// Add loading animation on page load
window.addEventListener('load', () => {
    // Create loading element
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);
    
    // Remove loading after page loads
    setTimeout(() => {
        loading.classList.add('hide');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }, 500);
});

// Intersection Observer for scroll animations
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
document.querySelectorAll('.service-card, .stat-item, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Track WhatsApp button clicks
document.querySelector('.whatsapp-btn').addEventListener('click', function() {
    console.log('WhatsApp button clicked - redirecting to chat');
    // You can add analytics tracking here
});

// Form submission tracking
if (contactForm) {
    contactForm.addEventListener('submit', function() {
        console.log('Form submitted to Formspree');
    });
}
