// Typing Animation for Name
const typingText = document.querySelector('.typing-text');
const name = 'Elisha Kigalave';
let charIndex = 0;
let isDeleting = false;

function typeName() {
    if (isDeleting) {
        typingText.textContent = name.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = name.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === name.length) {
        isDeleting = true;
        setTimeout(typeName, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        setTimeout(typeName, 500);
    } else {
        setTimeout(typeName, isDeleting ? 100 : 200);
    }
}

// Start typing animation
typeName();

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('#nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('#header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Scroll animation for sections
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.timeline-item, .interest-card, .project-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Form submission with validation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would typically send the form data to a server
    // For this example, we'll just log it and show an alert
    console.log({ name, email, subject, message });
    
    // Show success message with animation
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    contactForm.appendChild(successMessage);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
    
    // Reset form
    contactForm.reset();
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add CSS for success message animation
const style = document.createElement('style');
style.textContent = `
    .success-message {
        background-color: var(--primary-color);
        color: white;
        padding: 15px;
        border-radius: 5px;
        margin-top: 20px;
        text-align: center;
        animation: slideIn 0.5s ease forwards;
    }

    @keyframes slideIn {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .nav-active {
        transform: translateX(0%);
        opacity: 1;
        pointer-events: auto;
    }

    @media screen and (max-width: 768px) {
        #nav {
            position: fixed;
            right: 0;
            top: 0;
            height: 100vh;
            background: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            width: 50%;
            transform: translateX(100%);
            transition: transform 0.5s ease-in;
            opacity: 0;
            pointer-events: none;
        }

        #nav li {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add active class to navigation links on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('#nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Smooth Scroll for Navigation Links
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

// Education section animations
function animateEducation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const downloadCV = document.querySelector('.download-cv');
    
    // Animate timeline line first
    const timeline = document.querySelector('.timeline');
    timeline.style.opacity = '1';
    
    // Animate each timeline item with delay
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, 1000 + (index * 500)); // Start after 1s, then 500ms delay between each item
    });
    
    // Animate download CV button last
    setTimeout(() => {
        downloadCV.classList.add('visible');
    }, 1000 + (timelineItems.length * 500));
}

// Trigger animation when section is in view
const educationSection = document.querySelector('#education');
const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateEducation();
            educationObserver.unobserve(entry.target); // Only animate once
        }
    });
}, {
    threshold: 0.3 // Trigger when 30% of the section is visible
});

educationObserver.observe(educationSection);

// Add hover effect for timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Add pulse animation to the dot
        const dot = item.querySelector('::after');
        if (dot) {
            dot.style.animation = 'pulse 1s infinite';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        // Remove pulse animation
        const dot = item.querySelector('::after');
        if (dot) {
            dot.style.animation = 'none';
        }
    });
}); 