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

// Portfolio Data
const portfolioData = {
    introduction: {
        name: "정재호",
        birth: "1999.02.04",
        military: "2017.10.23 - 2019.07.01 (최전방 수호병, 병장 전역)"
    },
    education: [
        "SBS 게임 아카데미 게임 기획자/프로그래머 양성과정 수료 (2019.07.03 - 2020.02.18)",
        "Korea IT Academy DevSecOps를 활용한 클라우드 보안 전문가 양성과정 수료 (2024.08.21 - 2025.02.21)"
    ],
    career: [
        {
            company: "라온 엔터테인먼트",
            position: "게임 '테일즈런너' 라이브 서비스 기획 담당",
            period: "2020.08.12 - 2023.04.01"
        }
    ],
    skills: {
        documentation: ["MS Office", "Google Docs", "Notion", "Markdown"],
        programming: ["Python", "C", "C++", "C#", "JavaScript", "HTML", "CSS"],
        os: ["Windows", "Linux(Ubuntu, Kali Linux, RHEL)", "macOS"],
        devops: ["Git", "GitHub", "Docker", "Kubernetes"]
    },
    projects: {
        company: [
            {
                name: "테일즈런너",
                details: [
                    "2020 겨울 방학 이벤트 맵 2종 기획",
                    "2021 설 신규 BM 기획",
                    "2021 상반기 이벤트 기획",
                    "2021 여름방학 이벤트 맵 기획",
                    "2021 겨울방학 이벤트 메인 기획",
                    "2022 여름방학 이벤트 메인 기획",
                    "2022 겨울방학 이벤트 메인 기획",
                    "2022 겨울방학 이벤트 맵 기획",
                    "2023 신규 컨텐츠 기획"
                ]
            }
        ],
        team: [
            {
                name: "팀 방화벽",
                details: [
                    "Linux 시스템 점검 스크립트",
                    "정보보안 실습용 CTF '프로젝트 Ignite'",
                    "정보보안 학습용 wargame 웹 서비스 '프로젝트 Flame'"
                ]
            }
        ],
        personal: [
            "2D 모바일 게임 개발 (진행중)",
            "개인 포트폴리오 페이지 구현 (진행중)",
            "학점은행제 컴퓨터공학 학사 취득"
        ]
    }
};

// Initialize content
function initializeContent() {
    console.log('Initializing content...');
    
    // Introduction Section
    const welcomeText = document.querySelector('.welcome-text');
    if (welcomeText) {
        welcomeText.innerHTML = `
            <h1>${portfolioData.introduction.name}</h1>
            <p class="subtitle">Web Developer & Game Planner</p>
        `;
    }

    // About Section - Education Timeline
    const educationTimeline = document.querySelector('.education-timeline .timeline');
    if (educationTimeline) {
        educationTimeline.innerHTML = portfolioData.education.map(edu => {
            const [title, period] = edu.split(' (');
            return `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h4>${title}</h4>
                        <span class="date">${period.replace(')', '')}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    // About Section - Profile Info
    const infoGrid = document.querySelector('.info-grid');
    if (infoGrid) {
        infoGrid.innerHTML = `
            <div class="info-item">
                <i class="fas fa-calendar"></i>
                <span>${portfolioData.introduction.birth} (만 26세)</span>
            </div>
            <div class="info-item">
                <i class="fas fa-flag"></i>
                <span>${portfolioData.introduction.military.split('(')[0]}</span>
            </div>
            <div class="info-item">
                <i class="fas fa-star"></i>
                <span>${portfolioData.introduction.military.split('(')[1].replace(')', '')}</span>
            </div>
        `;
    }

    // Career Section
    const careerTimeline = document.querySelector('.career-timeline');
    if (careerTimeline) {
        careerTimeline.innerHTML = portfolioData.projects.company[0].details.map((detail, index) => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="date">${getCareerDate(index)}</span>
                    <div class="event">${detail}</div>
                </div>
            </div>
        `).join('');
    }

    // Tech Stack Section
    const skillsShowcase = document.querySelector('.skills-showcase');
    if (skillsShowcase) {
        const categories = {
            programming: {
                icon: 'fas fa-code',
                title: 'Programming Languages'
            },
            devops: {
                icon: 'fas fa-tools',
                title: 'Development Tools'
            },
            documentation: {
                icon: 'fas fa-file-alt',
                title: 'Documentation'
            },
            os: {
                icon: 'fas fa-desktop',
                title: 'Operating Systems'
            }
        };

        skillsShowcase.innerHTML = Object.entries(portfolioData.skills).map(([category, skills]) => `
            <div class="skill-category" data-scroll>
                <div class="category-icon">
                    <i class="${categories[category]?.icon || 'fas fa-code'}"></i>
                </div>
                <h3>${categories[category]?.title || category}</h3>
                <ul>
                    ${skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    // Projects Section
    const projectsShowcase = document.querySelector('.projects-showcase');
    if (projectsShowcase) {
        projectsShowcase.innerHTML = `
            <div class="project-category" data-scroll>
                <h3>Company Projects</h3>
                ${renderProjects(portfolioData.projects.company)}
            </div>
            <div class="project-category" data-scroll>
                <h3>Team Projects</h3>
                ${renderProjects(portfolioData.projects.team)}
            </div>
            <div class="project-category" data-scroll>
                <h3>Personal Projects</h3>
                <ul>
                    ${portfolioData.projects.personal.map(project => `<li>${project}</li>`).join('')}
                </ul>
            </div>
        `;
    }
}

// Helper function to generate career dates
function getCareerDate(index) {
    const startDate = new Date(2020, 7, 12); // 2020.08.12
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + (index * 3)); // Assuming each project is roughly 3 months apart
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });
}

// Helper function to render projects
function renderProjects(projects) {
    return projects.map(project => `
        <div class="project-item">
            <h4>${project.name}</h4>
            <ul>
                ${project.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    initializeContent();
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

// Initialize content
function initializeContent() {
    try {
        // Introduction Section
        const welcomeText = document.querySelector('.welcome-text');
        if (welcomeText) {
            welcomeText.innerHTML = `
                <h1>${portfolioData.introduction.name}</h1>
                <p class="subtitle">Web Developer & Game Planner</p>
            `;
        }

        // About Section - Education Timeline
        const educationTimeline = document.querySelector('.education-timeline .timeline');
        if (educationTimeline) {
            educationTimeline.innerHTML = portfolioData.education.map(edu => {
                const [title, period] = edu.split(' (');
                return `
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <h4>${title}</h4>
                            <span class="date">${period.replace(')', '')}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // About Section - Profile Info
        const infoGrid = document.querySelector('.info-grid');
        if (infoGrid) {
            infoGrid.innerHTML = `
                <div class="info-item">
                    <i class="fas fa-calendar"></i>
                    <span>${portfolioData.introduction.birth} (만 26세)</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-flag"></i>
                    <span>${portfolioData.introduction.military.split('(')[0]}</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-star"></i>
                    <span>${portfolioData.introduction.military.split('(')[1].replace(')', '')}</span>
                </div>
            `;
        }

        // Career Section
        const careerTimeline = document.querySelector('.career-timeline');
        if (careerTimeline) {
            const timelineItems = portfolioData.projects.company[0].details.map((detail, index) => `
                <div class="timeline-item">
                    <span class="date">${getCareerDate(index)}</span>
                    <div class="event">${detail}</div>
                </div>
            `).join('');
            careerTimeline.innerHTML = timelineItems;
        }

        // Tech Stack Section
        const skillsShowcase = document.querySelector('.skills-showcase');
        if (skillsShowcase) {
            const categories = {
                programming: {
                    icon: 'fas fa-code',
                    title: 'Programming Languages'
                },
                devops: {
                    icon: 'fas fa-tools',
                    title: 'Development Tools'
                },
                documentation: {
                    icon: 'fas fa-file-alt',
                    title: 'Documentation'
                },
                os: {
                    icon: 'fas fa-desktop',
                    title: 'Operating Systems'
                }
            };

            skillsShowcase.innerHTML = Object.entries(portfolioData.skills).map(([category, skills]) => `
                <div class="skill-category" data-scroll>
                    <div class="category-icon">
                        <i class="${categories[category]?.icon || 'fas fa-code'}"></i>
                    </div>
                    <h3>${categories[category]?.title || category}</h3>
                    <ul>
                        ${skills.map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                </div>
            `).join('');
        }

        // Projects Section
        const projectsShowcase = document.querySelector('.projects-showcase');
        if (projectsShowcase) {
            projectsShowcase.innerHTML = `
                <div class="project-category" data-scroll>
                    <h3>Company Projects</h3>
                    ${renderProjects(portfolioData.projects.company)}
                </div>
                <div class="project-category" data-scroll>
                    <h3>Team Projects</h3>
                    ${renderProjects(portfolioData.projects.team)}
                </div>
                <div class="project-category" data-scroll>
                    <h3>Personal Projects</h3>
                    <ul>
                        ${portfolioData.projects.personal.map(project => `<li>${project}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error initializing content:', error);
    }
}

// Helper function to generate career dates
function getCareerDate(index) {
    const dates = [
        "2020.08 - 2020.10",
        "2020.10 - 2021.02",
        "2021.02 - 2021.08",
        "2021.05 - 2021.08",
        "2021.08 - 2021.11",
        "2022.01 - 2022.07",
        "2022.07 - 2022.11",
        "2022.10 - 2022.11",
        "2022.12 - 2023.04"
    ];
    return dates[index] || "";
}

// Helper function to render projects
function renderProjects(projects) {
    if (!Array.isArray(projects)) return '';
    
    return projects.map(project => `
        <div class="project-item">
            <h4>${project.name}</h4>
            <ul>
                ${project.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
        </div>
    `).join('');
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
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
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

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, {
    threshold: 0.1
});

// Setup animations
function setupAnimations() {
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Setup navigation
function setupNavigation() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// GSAP 초기화
gsap.registerPlugin(ScrollTrigger);

// 커스텀 커서
const cursor = document.querySelector('.cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
const easing = 0.1;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 커서 애니메이션
function animateCursor() {
    cursorX += (mouseX - cursorX) * easing;
    cursorY += (mouseY - cursorY) * easing;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animateCursor);
}

animateCursor();

// 링크에 호버 효과 추가
document.querySelectorAll('a, button').forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.mixBlendMode = 'difference';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.mixBlendMode = 'difference';
    });
});

// 네비게이션 스크롤 효과
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// 인트로 애니메이션
function initIntroAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('.welcome-text h1', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.5
    })
    .from('.welcome-text .subtitle', {
        y: 50,
        opacity: 0,
        duration: 1
    }, '-=0.8')
    .from('.scroll-indicator', {
        y: 30,
        opacity: 0,
        duration: 1
    }, '-=0.5');
}

// 스크롤 애니메이션
function initScrollAnimations() {
    // 프로필 카드 애니메이션
    gsap.from('.profile-card', {
        scrollTrigger: {
            trigger: '.profile-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
    
    // 교육 타임라인 애니메이션
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.education-timeline',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });
    
    // 스킬 카테고리 애니메이션
    gsap.from('.skill-category', {
        scrollTrigger: {
            trigger: '.skills-showcase',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });
    
    // 프로젝트 아이템 애니메이션
    gsap.from('.project-item', {
        scrollTrigger: {
            trigger: '.project-gallery',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });
    
    // 컨택트 섹션 애니메이션
    gsap.from('.contact-content', {
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 1
    });
}

// 스크롤 이벤트
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
        });
    });
});

// 현재 연도 업데이트
document.getElementById('current-year').textContent = new Date().getFullYear();

// 페이지 로드 시 애니메이션 초기화
window.addEventListener('load', () => {
    initIntroAnimation();
    initScrollAnimations();
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Initialize content first
    initializeContent();
    
    // Then setup other features
    setupAnimations();
    setupNavigation();
    initializeSections();
    setupEventListeners();
    updateNavigation(currentSection);
});
