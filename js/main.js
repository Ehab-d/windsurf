// Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // State page functionality
    initStatePageFunctionality();
});

// State page functionality
function initStatePageFunctionality() {
    // Only run on state.html page
    if (!window.location.pathname.includes('state.html')) return;
    
    // Counter functionality
    let count = 0;
    const counterDisplay = document.getElementById('counter-display');
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');
    const resetBtn = document.getElementById('reset');
    
    if (counterDisplay && incrementBtn && decrementBtn && resetBtn) {
        // Initialize counter from localStorage if available
        if (localStorage.getItem('counter')) {
            count = parseInt(localStorage.getItem('counter'));
            counterDisplay.textContent = count;
        }
        
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
    
    // Theme color functionality
    const themeButtons = document.querySelectorAll('.theme-btn');
    const root = document.documentElement;
    
    // Initialize theme from localStorage if available
    if (localStorage.getItem('primaryColor')) {
        root.style.setProperty('--primary-color', localStorage.getItem('primaryColor'));
    }
    
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            let color;
            
            if (btn.classList.contains('blue')) {
                color = '#3498db';
            } else if (btn.classList.contains('green')) {
                color = '#2ecc71';
            } else if (btn.classList.contains('purple')) {
                color = '#9b59b6';
            } else if (btn.classList.contains('orange')) {
                color = '#e67e22';
            }
            
            if (color) {
                root.style.setProperty('--primary-color', color);
                localStorage.setItem('primaryColor', color);
            }
        });
    });
}
