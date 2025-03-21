// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.navbar-container').appendChild(mobileMenuBtn);

    mobileMenuBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('show');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Donation Amount Selection
function setupDonationAmounts() {
    const amounts = [10, 25, 50, 100];
    const donationBtns = document.querySelectorAll('.donation-amount-btn');
    const customAmountInput = document.querySelector('.custom-amount');

    donationBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            donationBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (customAmountInput) {
                customAmountInput.value = amounts[index];
            }
        });
    });
}

// Campaign Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
}

// Counter Animation with Intersection Observer
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.counter-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target.id, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Donation Form Submission
function setupDonationForm() {
    const donationForm = document.querySelector('.donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(donationForm);
            
            try {
                // Show loading spinner
                showLoadingSpinner();
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                showToast('Donation successful! Thank you for your support.', 'success');
                donationForm.reset();
            } catch (error) {
                showToast('Error processing donation. Please try again.', 'error');
            } finally {
                hideLoadingSpinner();
            }
        });
    }
}

// Toast Notification System
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Loading Spinner
function showLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    document.body.appendChild(spinner);
}

function hideLoadingSpinner() {
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}

// Campaign Search and Filter
function setupCampaignFilter() {
    const searchInput = document.querySelector('.campaign-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const campaigns = document.querySelectorAll('.campaign-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            campaigns.forEach(campaign => {
                const title = campaign.querySelector('h3').textContent.toLowerCase();
                const description = campaign.querySelector('p').textContent.toLowerCase();
                const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
                campaign.style.display = isVisible ? 'block' : 'none';
            });
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            campaigns.forEach(campaign => {
                const campaignCategory = campaign.getAttribute('data-category');
                campaign.style.display = (category === 'all' || campaignCategory === category) ? 'block' : 'none';
            });
        });
    });
}

// Share Campaign
function setupSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = btn.getAttribute('data-platform');
            const campaignTitle = btn.closest('.campaign-card').querySelector('h3').textContent;
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(`Support this campaign: ${campaignTitle}`);
            
            let shareUrl = '';
            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
                    break;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
}

// Newsletter Subscription
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            try {
                showLoadingSpinner();
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                showToast('Thank you for subscribing to our newsletter!', 'success');
                newsletterForm.reset();
            } catch (error) {
                showToast('Error subscribing to newsletter. Please try again.', 'error');
            } finally {
                hideLoadingSpinner();
            }
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make all sections visible initially
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
        section.style.transform = 'translateY(0)';
    });

    setupDonationAmounts();
    animateProgressBars();
    setupCounterAnimation();
    setupDonationForm();
    setupCampaignFilter();
    setupSocialSharing();
    setupNewsletterForm();
    initScrollAnimations();
});

// Scroll-based animations using GSAP
gsap.registerPlugin(ScrollTrigger);

// Campaign cards animation
gsap.from('.campaign-card', {
    scrollTrigger: {
        trigger: '.campaign-section',
        start: 'top center',
        toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
});

// Counter items animation
gsap.from('.counter-item', {
    scrollTrigger: {
        trigger: '.counter-section',
        start: 'top center'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2
});

// Update scroll animations initialization
function initScrollAnimations() {
    // Counter Section Animation
    ScrollTrigger.create({
        trigger: '.counter-section',
        start: 'top center',
        once: true,
        onEnter: () => {
            counterNumbers.forEach(counter => animateCounter(counter));
        }
    });

    // Progress Bars Animation
    ScrollTrigger.create({
        trigger: '.campaign-section',
        start: 'top center',
        once: true,
        onEnter: animateProgressBars
    });

    // Fade In Animation for Elements
    document.querySelectorAll('.scroll-animate').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            once: true,
            onEnter: () => element.classList.add('visible')
        });
    });
}

// Update section observer
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    },
    {
        threshold: 0.2
    }
);

// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const customCursor = document.querySelector('.custom-cursor');
const donationModal = document.getElementById('donation-modal');
const closeModal = document.querySelector('.close-modal');
const loadingOverlay = document.querySelector('.loading-overlay');
const progressBars = document.querySelectorAll('.progress-fill');
const counterNumbers = document.querySelectorAll('.counter-number');
const campaignCards = document.querySelectorAll('.campaign-card');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.querySelector('.campaign-search');

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => customCursor.classList.add('active'));
document.addEventListener('mouseup', () => customCursor.classList.remove('active'));

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

// Modal Handling
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('show');
    });
    document.body.style.overflow = '';
}

document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', () => openModal(button.dataset.modal));
});

document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', closeModal);
});

// Counter Animation
function animateCounter(counter) {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = current.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        }
    };

    updateCounter();
}

// Progress Bar Animation
function animateProgressBars() {
    progressBars.forEach(bar => {
        const width = bar.dataset.width;
        bar.style.width = width + '%';
    });
}

// Campaign Filtering
function filterCampaigns(category) {
    campaignCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterCampaigns(button.dataset.category);
    });
});

// Campaign Search
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    campaignCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Share Buttons
document.querySelectorAll('.share-btn').forEach(button => {
    button.addEventListener('click', () => {
        const platform = button.dataset.platform;
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('Check out this amazing campaign!');
        
        let shareUrl;
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
                break;
        }
        
        window.open(shareUrl, '_blank', 'width=600,height=400');
    });
});

// Toast Notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="toast-icon fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.getElementById('toast-container').appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Form Submissions
document.querySelector('.newsletter-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    loadingOverlay.style.display = 'flex';
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        showToast('Successfully subscribed to newsletter!');
        e.target.reset();
    } catch (error) {
        showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
        loadingOverlay.style.display = 'none';
    }
});

document.querySelector('.donation-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    loadingOverlay.style.display = 'flex';
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        showToast('Thank you for your donation!');
        closeModal();
        e.target.reset();
    } catch (error) {
        showToast('Failed to process donation. Please try again.', 'error');
    } finally {
        loadingOverlay.style.display = 'none';
    }
});

// Donation Amount Buttons
document.querySelectorAll('.donation-amount-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.donation-amount-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        document.querySelector('.custom-amount').value = button.dataset.amount;
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Enhanced Navigation Functionality
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    // Smooth scroll function
    function smoothScroll(target, duration = 1000) {
        const targetPosition = target.offsetTop - navbar.offsetHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing function
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Handle navigation click
    function handleNavClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Add click animation
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 300);

            // Smooth scroll to section
            smoothScroll(targetSection);

            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';

            // Update active states
            updateActiveStates(targetId);
        }
    }

    // Update active states based on scroll position
    function updateActiveStates(sectionId) {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Update navigation links
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });

                // Update mobile navigation links
                mobileNavLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });

                // Add animation class to section
                section.classList.add('active');
            }
        });

        // Update navbar background
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Mobile menu functionality
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Update active states on scroll
    window.addEventListener('scroll', updateActiveStates);

    // Initial active state check
    updateActiveStates();
});

// Enhanced Donation Section Functionality
function initializeDonationSection() {
    const donationCards = document.querySelectorAll('.donation-card');
    const donationButtons = document.querySelectorAll('.donation-card .btn');

    donationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    donationButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const amount = button.getAttribute('data-amount') || '10';
            openDonationModal(amount);
        });
    });
}

// Enhanced Volunteer Section Functionality
function initializeVolunteerSection() {
    const volunteerCards = document.querySelectorAll('.volunteer-card');
    
    volunteerCards.forEach(card => {
        const button = card.querySelector('.btn');
        
        // Hover animation
        card.addEventListener('mouseenter', () => {
            gsap.to(button, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(button, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        // Click animation
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            gsap.to(card, {
                scale: 0.95,
                duration: 0.1,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });

            // Show success message
            showToast('Thank you for your interest! We will contact you soon.', 'success');
        });
    });
}

// Enhanced Contact Section Functionality
function initializeContactSection() {
    const contactForm = document.querySelector('.contact-form');
    const contactItems = document.querySelectorAll('.contact-item');

    // Animate contact items on scroll
    gsap.from(contactItems, {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });

    // Form validation and submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');

            try {
                // Add loading state
                submitButton.classList.add('loading');
                submitButton.disabled = true;

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success message
                showToast('Message sent successfully! We will get back to you soon.', 'success');
                contactForm.reset();

            } catch (error) {
                showToast('Failed to send message. Please try again.', 'error');
            } finally {
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
            }
        });

        // Real-time form validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(input);
            });

            input.addEventListener('blur', () => {
                validateInput(input);
            });
        });
    }
}

// Input validation helper
function validateInput(input) {
    const value = input.value.trim();
    const errorClass = 'error';

    if (input.required && !value) {
        input.classList.add(errorClass);
        return false;
    }

    if (input.type === 'email' && !isValidEmail(value)) {
        input.classList.add(errorClass);
        return false;
    }

    input.classList.remove(errorClass);
    return true;
}

// Email validation helper
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Initialize all enhanced sections
document.addEventListener('DOMContentLoaded', () => {
    initializeDonationSection();
    initializeVolunteerSection();
    initializeContactSection();
}); 