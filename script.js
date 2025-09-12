// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // Smooth scrolling for all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Animate elements when they come into view
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.problem-card, .feature-item, .benefit-card, .stat-item, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });

    // Animate numbers in stats sections
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current).toLocaleString();
            }, 16);
        });
    }

    // Observe stats sections for number animation
    const statsSections = document.querySelectorAll('.stats-section');
    statsSections.forEach(section => {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(section);
    });

    // Parallax effect for floating orbs
    function handleParallax() {
        const orbs = document.querySelectorAll('.floating-orb');
        const scrolled = window.pageYOffset;
        
        orbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            orb.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Add scroll event listener with throttling
    window.addEventListener('scroll', throttle(handleParallax, 16));

    // Form submission handlers
    function joinWaitingList(event) {
        event.preventDefault();
        const form = event.target;
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.innerHTML;
        
        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        button.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success notification
            showSuccessNotification();
            
            // Reset form
            form.reset();
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1500);
    }

    function joinFinalWaitlist(event) {
        event.preventDefault();
        const form = event.target;
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.innerHTML;
        
        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        button.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success notification
            showSuccessNotification();
            
            // Reset form
            form.reset();
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1500);
    }

    // Success notification functions
    function showSuccessNotification() {
        const notification = document.getElementById('successNotification');
        notification.classList.add('show');
        
        // Auto-hide after 6 seconds
        setTimeout(() => {
            closeNotification();
        }, 6000);
    }

    function closeNotification() {
        const notification = document.getElementById('successNotification');
        notification.classList.remove('show');
    }

    // Make closeNotification globally available
    window.closeNotification = closeNotification;
    
    // Logo click handler - scroll to hero section
    function scrollToHero() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Make scrollToHero globally available
    window.scrollToHero = scrollToHero;
    
    // Enhanced mobile autocomplete for better UX
    function enhanceMobileAutocomplete() {
        const emailInputs = document.querySelectorAll('input[type="email"]');
        
        emailInputs.forEach(input => {
            // Skip the hero email input to avoid scroll sensitivity
            if (input.id === 'heroEmailInput') {
                return;
            }
            
            // Add focus event to trigger autocomplete
            input.addEventListener('focus', function() {
                // For iOS Safari - trigger autocomplete suggestions
                if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                    // Force focus to trigger keyboard suggestions
                    this.click();
                }
            });
            
            // Add touch event for better mobile interaction
            input.addEventListener('touchstart', function() {
                this.focus();
            });
            
            // Visual feedback when email is autofilled
            input.addEventListener('input', function() {
                if (this.value && this.value.includes('@')) {
                    this.style.borderColor = '#44CC44';
                    this.style.boxShadow = '0 0 10px rgba(68, 204, 68, 0.3)';
                    
                    // Reset styling after 2 seconds
                    setTimeout(() => {
                        this.style.borderColor = '';
                        this.style.boxShadow = '';
                    }, 2000);
                }
            });
        });
    }
    
    // Initialize mobile autocomplete enhancement
    enhanceMobileAutocomplete();
    

    // Add form event listeners
    const heroForm = document.getElementById('heroForm');
    const finalForm = document.getElementById('finalForm');
    
    if (heroForm) {
        heroForm.addEventListener('submit', joinWaitingList);
    }
    
    if (finalForm) {
        finalForm.addEventListener('submit', joinFinalWaitlist);
    }

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.problem-card, .benefit-card, .feature-item, .testimonial-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects for buttons
    const buttons = document.querySelectorAll('.cta-button, .final-cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .cta-button, .final-cta-button {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Add scroll-triggered animations for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Add CSS for section animations
    const sectionStyle = document.createElement('style');
    sectionStyle.textContent = `
        section {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        section.section-visible {
            opacity: 1;
            transform: translateY(0);
        }

        .hero {
            opacity: 1;
            transform: none;
        }
    `;
    document.head.appendChild(sectionStyle);

    // Add floating animation to orbs
    const orbs = document.querySelectorAll('.floating-orb');
    orbs.forEach((orb, index) => {
        orb.style.animationDelay = `${index * 2}s`;
    });

    // Add progress bar animation
    const progressBars = document.querySelectorAll('.progress-fill, .level-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width') || '75%';
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        bar.style.width = '0%';
        bar.setAttribute('data-width', bar.style.width || '75%');
        progressObserver.observe(bar);
    });

    // Add typing effect to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect when hero section is visible
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const originalText = heroTitle.textContent;
                    typeWriter(heroTitle, originalText, 50);
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        heroObserver.observe(heroTitle);
    }

    // Add particle effect to background
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }

    // Create particles periodically
    setInterval(createParticle, 3000);

    // Add CSS for particles
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        .particle {
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--gradient-primary);
            border-radius: 50%;
            pointer-events: none;
            animation: particle-float 5s linear infinite;
            z-index: 1;
        }

        @keyframes particle-float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Add smooth reveal animation for content
    const revealElements = document.querySelectorAll('.section-title, .section-description, .hero-subtitle');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.5 });

    revealElements.forEach(el => {
        el.classList.add('reveal-element');
        revealObserver.observe(el);
    });

    // Add CSS for reveal animation
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .reveal-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .reveal-element.reveal {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(revealStyle);

    // Add gradient animation to gradient text
    const gradientTexts = document.querySelectorAll('.gradient-text');
    gradientTexts.forEach(text => {
        text.style.animation = 'gradient-shift 3s ease-in-out infinite';
    });

    // Add CSS for gradient animation
    const gradientStyle = document.createElement('style');
    gradientStyle.textContent = `
        @keyframes gradient-shift {
            0%, 100% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(30deg); }
        }
    `;
    document.head.appendChild(gradientStyle);

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', throttle(() => {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    }, 16));

    // Add CSS for scroll progress
    const progressStyle = document.createElement('style');
    progressStyle.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--gradient-primary);
            z-index: 9999;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(progressStyle);

    // Add color cycling animation to feature icons
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach((icon, index) => {
        const gradients = [
            'var(--gradient-primary)',
            'var(--gradient-secondary)',
            'var(--gradient-tertiary)',
            'var(--gradient-accent)',
            'var(--gradient-orange)',
            'var(--gradient-yellow)',
            'var(--gradient-cyan)',
            'var(--gradient-magenta)'
        ];
        
        icon.style.background = gradients[index % gradients.length];
        icon.style.animation = `pulse 2s ease-in-out infinite ${index * 0.5}s`;
    });

    // Add CSS for pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }
    `;
    document.head.appendChild(pulseStyle);

    // Add staggered animation for testimonials
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    console.log('🚀 FinnVest Website Loaded Successfully!');
    console.log('📱 Mobile-friendly design with smooth animations');
    console.log('🎨 Dark theme with vibrant gradients');
    console.log('⚡ Optimized for performance');
}); 