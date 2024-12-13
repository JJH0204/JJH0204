// Global variables
const header = document.querySelector('header');
const sections = Array.from(document.querySelectorAll('section'));
const nav = document.querySelector('nav');
const navLinks = Array.from(document.querySelectorAll('nav a'));
let currentSection = 0;
let isScrolling = false;
let isAnimating = false;
let lastScrollTime = Date.now();
const scrollDelay = 1000;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeSections();
    setupEventListeners();
    updateNavigation(currentSection);
});

// Initialize sections
function initializeSections() {
    sections.forEach((section, index) => {
        // Only wrap content if it hasn't been wrapped already
        if (!section.querySelector('.section-content')) {
            const container = section.querySelector('.container');
            if (container) {
                container.classList.add('section-content');
            }
        }
        
        if (index === 0) {
            section.classList.add('active');
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
    
    // Set initial state
    updateSectionStates();
}

// Setup event listeners
function setupEventListeners() {
    // Wheel event
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Touch events
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: false });
    
    window.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touchEndY = e.touches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                scrollToSection(currentSection + 1);
            } else {
                scrollToSection(currentSection - 1);
            }
            touchStartY = touchEndY;
        }
    }, { passive: false });
    
    // Navigation click events
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(index + 1);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                scrollToSection(currentSection - 1);
                break;
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                scrollToSection(currentSection + 1);
                break;
            case 'Home':
                e.preventDefault();
                scrollToSection(0);
                break;
            case 'End':
                e.preventDefault();
                scrollToSection(sections.length);
                break;
        }
    });
    
    // Header click event
    header.querySelector('h1').addEventListener('click', () => {
        scrollToSection(0);
    });
}

// Handle mouse wheel events
function handleWheel(e) {
    e.preventDefault();
    
    if (isScrolling || isAnimating) return;
    
    const now = Date.now();
    if (now - lastScrollTime < scrollDelay) return;
    
    lastScrollTime = now;
    
    if (e.deltaY > 0) {
        scrollToSection(currentSection + 1);
    } else {
        scrollToSection(currentSection - 1);
    }
}

// Scroll to specific section
function scrollToSection(index) {
    if (isAnimating || index === currentSection) return;
    
    const maxSection = sections.length;
    if (index < 0 || index > maxSection) return;
    
    isScrolling = true;
    const previousSection = currentSection;
    currentSection = index;
    
    updateNavigation(currentSection);
    transitionToSection(currentSection, previousSection);
}

// Update navigation state
function updateNavigation(index) {
    const categoryText = index === 0 ? 'Welcome' : 
        document.querySelector(`section:nth-of-type(${index}) h2`)?.textContent || '';
    document.querySelector('.current-category').textContent = categoryText;
    
    navLinks.forEach((link, i) => {
        link.classList.toggle('active', i + 1 === index);
    });
}

// Update section states
function updateSectionStates() {
    sections.forEach((section, index) => {
        const isActive = index + 1 === currentSection;
        section.classList.toggle('active', isActive);
        section.style.display = isActive ? 'block' : 'none';
        
        if (isActive) {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        } else {
            section.style.opacity = 0;
            section.style.transform = 'translateY(50px)';
        }
    });
}

// Transition between sections
function transitionToSection(newIndex, oldIndex) {
    const currentSectionEl = oldIndex === 0 ? header : sections[oldIndex - 1];
    const nextSectionEl = newIndex === 0 ? header : sections[newIndex - 1];
    
    if (!currentSectionEl || !nextSectionEl) {
        isScrolling = false;
        isAnimating = false;
        return;
    }
    
    // Kill any existing animations
    gsap.killTweensOf([currentSectionEl, nextSectionEl]);
    
    isAnimating = true;
    
    const direction = newIndex > oldIndex ? 1 : -1;
    const tl = gsap.timeline({
        onStart: () => {
            nextSectionEl.style.display = 'block';
            if (nextSectionEl !== header) {
                nextSectionEl.classList.add('active');
            }
        },
        onComplete: () => {
            if (currentSectionEl !== header) {
                currentSectionEl.classList.remove('active');
                currentSectionEl.style.display = 'none';
            }
            isAnimating = false;
            isScrolling = false;
            updateSectionStates();
        }
    });
    
    // Animate out current section
    tl.to(currentSectionEl, {
        opacity: 0,
        y: -30 * direction,
        duration: 0.4,
        ease: 'power2.inOut'
    });
    
    // Animate in next section
    tl.fromTo(nextSectionEl,
        {
            opacity: 0,
            y: 30 * direction,
            display: 'block'
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.inOut'
        },
        '-=0.2'
    );
    
    // Animate section content
    const content = nextSectionEl.querySelector('.section-content');
    if (content) {
        tl.fromTo(content,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            },
            '-=0.2'
        );
    }
}
