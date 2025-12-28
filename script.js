// Footer element
class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <p>&copy; 2025 QHR team</p>
                <p>Made by Tungstenfur</p>
            </div>
        </div>
    </footer>`;
    }
}

customElements.define('site-footer', Footer);

// Header element
class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<header class="header">
        <div class="container">
            <div class="header-content">
                <h1 class="logo"> QHR Wiki</h1>
                <nav class="nav">
                    <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-list">
                        <li><a href="index.html" class="nav-link active">Home</a></li>
                        <li class="nav-item-dropdown">
                            <a href="#" class="nav-link nav-dropdown-toggle">Blocks</a>
                            <ul class="nav-dropdown">
                                <li><a href="https://example.com" class="nav-dropdown-link">Page 1</a></li>
                                <li><a href="https://example.com" class="nav-dropdown-link">Page 2</a></li>
                                <li><a href="https://example.com" class="nav-dropdown-link">Page 3</a></li>
                            </ul>
                        </li>
                        <li class="nav-item-dropdown">
                            <a href="#" class="nav-link nav-dropdown-toggle">Items</a>
                            <ul class="nav-dropdown">
                                <li><a href="https://example.com" class="nav-dropdown-link">Page 1</a></li>
                                <li><a href="https://example.com" class="nav-dropdown-link">Page 2</a></li>
                                <li><a href="https://example.com" class="nav-dropdown-link">Page 3</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <div class="header-actions">
                    <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
                        <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                        <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </header>`;
    }
}

customElements.define('site-header', Header);

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a smooth transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
}

// Navigation Toggle (Mobile)
function initNavToggle() {
    const navToggle = document.getElementById('navToggle');
    const navList = document.querySelector('.nav-list');
    
    navToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        if (navList.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
            navList.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Sidebar Toggle (Mobile)
function initSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    // Check if we're on mobile
    const isMobile = () => window.innerWidth <= 768;
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-hidden');
        });
    }
    
    // Hide sidebar by default on mobile
    if (isMobile()) {
        sidebar.classList.add('mobile-hidden');
    }
    
    // Update on resize
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            sidebar.classList.remove('mobile-hidden');
        }
    });
}
// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 90; // Header height + some padding
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
                
                // Highlight the target section briefly
                targetElement.style.transition = 'background-color 0.3s ease';
                const originalBg = targetElement.style.backgroundColor;
                targetElement.style.backgroundColor = 'var(--accent-light)';
                
                setTimeout(() => {
                    targetElement.style.backgroundColor = originalBg;
                }, 1000);
            }
        });
    });
}


// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--accent-primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
        box-shadow: 0 4px 6px var(--shadow);
        z-index: 999;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    }
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.backgroundColor = 'var(--accent-hover)';
        backToTopBtn.style.transform = 'scale(1.1)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.backgroundColor = 'var(--accent-primary)';
        backToTopBtn.style.transform = 'scale(1)';
    });
    
    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();
}

// Navigation Dropdown
function initNavDropdown() {
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = toggle.closest('.nav-item-dropdown');
            
            // Close other dropdowns
            document.querySelectorAll('.nav-item-dropdown').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            parent.classList.toggle('active');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item-dropdown')) {
            document.querySelectorAll('.nav-item-dropdown').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    
    initThemeToggle();
    initNavToggle();
    initNavDropdown();
    initSidebarToggle();
    initSmoothScroll();
    initBackToTop();
    
    console.log('JS loaded');
});
