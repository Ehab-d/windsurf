// Main JavaScript file for Ehab's personal website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initPortfolioFilter();
    initStateManagement();
    initContactForm();
    initThemeSwitch();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navList.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
}

// Scroll effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    const scrollElements = document.querySelectorAll('.scroll-element');
    
    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Scroll reveal effect
    if (scrollElements.length > 0) {
        const elementInView = (el, dividend = 1) => {
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop <=
                (window.innerHeight || document.documentElement.clientHeight) / dividend
            );
        };

        const displayScrollElement = (element) => {
            element.classList.add('scrolled');
        };

        const hideScrollElement = (element) => {
            element.classList.remove('scrolled');
        };

        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 1.25)) {
                    displayScrollElement(el);
                } else {
                    hideScrollElement(el);
                }
            });
        };

        window.addEventListener('scroll', () => {
            handleScrollAnimation();
        });
        
        // Initialize on page load
        handleScrollAnimation();
    }
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// State management functionality
function initStateManagement() {
    // Only run on state.html page
    if (!window.location.pathname.includes('state.html')) return;
    
    // Counter functionality
    const counterDisplay = document.getElementById('counter-display');
    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    if (counterDisplay && incrementBtn && decrementBtn && resetBtn) {
        let count = localStorage.getItem('counter') ? parseInt(localStorage.getItem('counter')) : 0;
        counterDisplay.textContent = count;
        
        incrementBtn.addEventListener('click', () => {
            count++;
            counterDisplay.textContent = count;
            localStorage.setItem('counter', count);
        });
        
        decrementBtn.addEventListener('click', () => {
            count--;
            counterDisplay.textContent = count;
            localStorage.setItem('counter', count);
        });
        
        resetBtn.addEventListener('click', () => {
            count = 0;
            counterDisplay.textContent = count;
            localStorage.setItem('counter', count);
        });
    }
    
    // Notes functionality
    const notesTextarea = document.getElementById('notes-textarea');
    const saveNotesBtn = document.getElementById('save-notes');
    const clearNotesBtn = document.getElementById('clear-notes');
    
    if (notesTextarea && saveNotesBtn && clearNotesBtn) {
        // Load saved notes if they exist
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            notesTextarea.value = savedNotes;
        }
        
        saveNotesBtn.addEventListener('click', () => {
            localStorage.setItem('notes', notesTextarea.value);
            alert('Notes saved successfully!');
        });
        
        clearNotesBtn.addEventListener('click', () => {
            localStorage.removeItem('notes');
            notesTextarea.value = '';
            alert('Notes cleared!');
        });
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server
            // This is just a simulation
            const formData = new FormData(this);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Form submitted with values:', formValues);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
}

// Make theme functions globally accessible
window.themeManager = {
    // Apply theme colors
    applyTheme: function(theme) {
        const root = document.documentElement;
        
        // Apply theme colors to all CSS variables that use the accent color
        switch (theme) {
            case 'red':
                root.style.setProperty('--accent', '#ff6b6b');
                root.style.setProperty('--accent-hover', '#ff8e8e');
                break;
            case 'blue':
                root.style.setProperty('--accent', '#4d79ff');
                root.style.setProperty('--accent-hover', '#6b8fff');
                break;
            case 'green':
                root.style.setProperty('--accent', '#4ecdc4');
                root.style.setProperty('--accent-hover', '#6bd9d1');
                break;
            case 'purple':
                root.style.setProperty('--accent', '#a78bfa');
                root.style.setProperty('--accent-hover', '#b9a4fb');
                break;
            default:
                // Default is red
                root.style.setProperty('--accent', '#ff6b6b');
                root.style.setProperty('--accent-hover', '#ff8e8e');
        }
        
        // Update any current theme display
        const currentThemeElement = document.getElementById('current-theme');
        if (currentThemeElement) {
            currentThemeElement.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
        }
        
        // Update all elements that use the accent color
        this.updateElements();
        
        // Save theme preference
        localStorage.setItem('theme', theme);
        
        console.log('Theme applied:', theme);
    },
    
    // Update elements that use accent color
    updateElements: function() {
        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
        console.log('Updating elements with accent color:', accentColor);
        
        // Update various elements that use accent color
        const elementsToUpdate = [
            '.index-skill-fill',
            '.btn',
            '.timeline-date',
            '.theme-option.active',
            '.nav-link.active::after',
            '.portfolio-title',
            '.testimonial-rating i'
        ];
        
        elementsToUpdate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                elements.forEach(el => {
                    if (selector === '.index-skill-fill' || selector === '.btn') {
                        el.style.backgroundColor = accentColor;
                    } else if (selector === '.timeline-date') {
                        el.style.backgroundColor = accentColor;
                    } else if (selector === '.theme-option.active') {
                        el.style.borderColor = accentColor;
                    } else if (selector === '.testimonial-rating i') {
                        el.style.color = accentColor;
                    }
                });
            }
        });
    },
    
    // Initialize theme from localStorage
    initialize: function() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.applyTheme(savedTheme);
            
            // Mark the correct theme option as active
            const themeOptions = document.querySelectorAll('.theme-option');
            if (themeOptions.length > 0) {
                themeOptions.forEach(option => {
                    if (option.classList.contains(`theme-${savedTheme}`)) {
                        option.classList.add('active');
                    } else {
                        option.classList.remove('active');
                    }
                });
            }
        }
    }
};

// Theme switching functionality
function initThemeSwitch() {
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Initialize theme from localStorage
    window.themeManager.initialize();
    
    // Theme switching
    if (themeOptions.length > 0) {
        themeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Get theme color from class
                const themeClasses = Array.from(this.classList);
                const themeClass = themeClasses.find(cls => cls.startsWith('theme-'));
                
                if (themeClass) {
                    // Update active state
                    themeOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Apply theme
                    const theme = themeClass.replace('theme-', '');
                    window.themeManager.applyTheme(theme);
                }
            });
        });
    }
}
