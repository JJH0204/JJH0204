// Portfolio Data
const portfolioData = {
    skills: {
        programming: {
            items: {
                0: { name: "Python", badge: "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white" },
                1: { name: "C", badge: "https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=C&logoColor=white" },
                2: { name: "C++", badge: "https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=C%2B%2B&logoColor=white" },
                3: { name: "C#", badge: "https://img.shields.io/badge/CSharp-239120?style=for-the-badge&logo=CSharp&logoColor=white" }
            }
        },
        devops: {
            items: {
                0: { name: "Docker", badge: "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white" },
                1: { name: "Kubernetes", badge: "https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=Kubernetes&logoColor=white" },
                2: { name: "Git", badge: "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white" },
                3: { name: "MySQL", badge: "https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white" }
            }
        }
    }
};

// Skills Data
const skillsData = {
    programming: {
        labels: ['C/C++', 'C#', 'Python', 'JavaScript', 'Bash', 'HTML/CSS'],
        data: [85, 80, 85, 80, 75, 85],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)'
    },
    webdev: {
        labels: ['HTML5', 'CSS3', 'PHP', 'Apache', 'GitHub Pages', 'JavaScript'],
        data: [90, 85, 75, 70, 85, 80],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)'
    },
    devops: {
        labels: ['Git/GitHub', 'GitHub Actions', 'Docker', 'Kubernetes', 'Jenkins', 'Linux'],
        data: [90, 85, 80, 75, 80, 85],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)'
    },
    environments: {
        labels: ['VS Code', 'Unity', 'Linux', 'MacOS', 'Docker', 'Git'],
        data: [95, 80, 85, 80, 80, 90],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)'
    },
    databases: {
        labels: ['MariaDB', 'MySQL', 'Database Design', 'SQL', 'Data Modeling', 'Performance'],
        data: [85, 85, 80, 85, 80, 75],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)'
    }
};

// Navigation Active State
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // 현재 스크롤 위치
    const scrollY = window.scrollY;
    
    // 각 섹션을 확인하여 현재 보이는 섹션 찾기
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // 네비게이션 높이만큼 오프셋
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            // 모든 링크에서 active 클래스 제거
            navLinks.forEach(link => link.classList.remove('active'));
            
            // 현재 섹션에 해당하는 링크에 active 클래스 추가
            document.querySelector(`nav ul li a[href="#${sectionId}"]`)?.classList.add('active');
        }
    });

    // 블로그 페이지 체크
    if (window.location.pathname.includes('/blog')) {
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector('nav ul li a[href$="/blog"]')?.classList.add('active');
    }
}

// Navigation scroll effect
function handleScroll() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    updateActiveNavigation();
}

// Initialize skills section
function initializeSkills() {
    const programmingSkills = document.getElementById('programming-skills');
    if (programmingSkills) {
        programmingSkills.innerHTML = Object.entries(portfolioData.skills.programming.items)
            .map(([key, item]) => `
                <div class="skill-bubble" style="--size: ${0.9 - key * 0.05};">
                    <img src="${item.badge}" alt="${item.name}">
                    <span class="skill-level">${Math.round((0.9 - key * 0.05) * 100)}%</span>
                </div>
            `).join('');
    }
}

// Initialize animations
function initializeAnimations() {
    document.querySelectorAll('.container, .skills-showcase, .skill-category').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
}

// Initialize Charts
function initializeCharts() {
    const chartOptions = {
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    stepSize: 20
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    // Programming Skills Chart
    new Chart(document.getElementById('programmingChart'), {
        type: 'radar',
        data: {
            labels: skillsData.programming.labels,
            datasets: [{
                data: skillsData.programming.data,
                backgroundColor: skillsData.programming.backgroundColor,
                borderColor: skillsData.programming.borderColor,
                borderWidth: 2,
                pointBackgroundColor: skillsData.programming.borderColor
            }]
        },
        options: chartOptions
    });

    // Web Development Chart
    new Chart(document.getElementById('webdevChart'), {
        type: 'radar',
        data: {
            labels: skillsData.webdev.labels,
            datasets: [{
                data: skillsData.webdev.data,
                backgroundColor: skillsData.webdev.backgroundColor,
                borderColor: skillsData.webdev.borderColor,
                borderWidth: 2,
                pointBackgroundColor: skillsData.webdev.borderColor
            }]
        },
        options: chartOptions
    });

    // DevOps Chart
    new Chart(document.getElementById('devopsChart'), {
        type: 'radar',
        data: {
            labels: skillsData.devops.labels,
            datasets: [{
                data: skillsData.devops.data,
                backgroundColor: skillsData.devops.backgroundColor,
                borderColor: skillsData.devops.borderColor,
                borderWidth: 2,
                pointBackgroundColor: skillsData.devops.borderColor
            }]
        },
        options: chartOptions
    });

    // Development Environments Chart
    new Chart(document.getElementById('environmentsChart'), {
        type: 'radar',
        data: {
            labels: skillsData.environments.labels,
            datasets: [{
                data: skillsData.environments.data,
                backgroundColor: skillsData.environments.backgroundColor,
                borderColor: skillsData.environments.borderColor,
                borderWidth: 2,
                pointBackgroundColor: skillsData.environments.borderColor
            }]
        },
        options: chartOptions
    });

    // Databases Chart
    new Chart(document.getElementById('databasesChart'), {
        type: 'radar',
        data: {
            labels: skillsData.databases.labels,
            datasets: [{
                data: skillsData.databases.data,
                backgroundColor: skillsData.databases.backgroundColor,
                borderColor: skillsData.databases.borderColor,
                borderWidth: 2,
                pointBackgroundColor: skillsData.databases.borderColor
            }]
        },
        options: chartOptions
    });
}

// 프로젝트 필터링 기능
document.querySelectorAll('.project-filters').forEach(filters => {
    const projectGrid = filters.closest('.project-category').querySelector('.project-grid');
    
    filters.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // 활성 버튼 스타일 변경
            filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const selectedFilter = btn.getAttribute('data-filter');
            const projectCards = projectGrid.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                const tags = Array.from(card.querySelectorAll('.tag'))
                    .map(tag => tag.textContent.slice(1)); // '#' 제거
                
                if (selectedFilter === 'all' || tags.includes(selectedFilter)) {
                    // GSAP로 카드 표시 애니메이션
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        display: 'block',
                        ease: 'back.out(1.7)'
                    });
                } else {
                    // GSAP로 카드 숨김 애니메이션
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.4,
                        display: 'none',
                        ease: 'back.in(1.7)'
                    });
                }
            });
        });
    });
});

// 비디오 모달 기능
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const closeModal = document.querySelector('.close-modal');
const videoButtons = document.querySelectorAll('.video-btn');

videoButtons.forEach(button => {
    button.addEventListener('click', () => {
        const videoId = button.getAttribute('data-video-id');
        videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
        videoModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 모달 열릴 때 스크롤 방지
    });
});

closeModal.addEventListener('click', () => {
    videoModal.style.display = 'none';
    videoFrame.src = ''; // iframe 소스 초기화
    document.body.style.overflow = ''; // 스크롤 복원
});

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        videoFrame.src = '';
        document.body.style.overflow = '';
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.style.display === 'block') {
        videoModal.style.display = 'none';
        videoFrame.src = '';
        document.body.style.overflow = '';
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// 섹션 타이틀 애니메이션
document.querySelectorAll('.section-title').forEach((title) => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "back.out(1.7)"
    });
});

// Introduction 섹션 애니메이션
gsap.from('#introduction .content', {
    scrollTrigger: {
        trigger: '#introduction',
        start: "top 80%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power2.out"
});

// About 섹션 애니메이션
gsap.from('#about .content', {
    scrollTrigger: {
        trigger: '#about',
        start: "top 80%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power2.out"
});

// 스킬 섹션 애니메이션
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    const progress = item.querySelector('.progress-bar');
    const percentage = progress.getAttribute('data-progress');
    
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 0.8,
        delay: index * 0.1
    });
    
    gsap.to(progress, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        width: percentage + "%",
        duration: 1.5,
        ease: "power2.out"
    });
});

// 타임라인 아이템 애니메이션
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 1,
        ease: "power2.out"
    });
});

// 프로젝트 섹션 애니메이션
const projectCategories = document.querySelectorAll('.project-category');
projectCategories.forEach((category) => {
    // 카테고리 제목 애니메이션
    const title = category.querySelector('h2');
    const text = title.textContent;
    const chars = text.split('');
    title.textContent = '';
    
    chars.forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        title.appendChild(span);
    });

    gsap.from(title.children, {
        scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        scale: 0,
        y: 50,
        rotateX: -90,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(2)"
    });

    // 필터 버튼 애니메이션
    const filters = category.querySelector('.project-filters');
    if (filters) {
        gsap.from(filters.children, {
            scrollTrigger: {
                trigger: filters,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
    }

    // 프로젝트 카드 애니메이션
    const cards = category.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            scale: 0.8,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.7)"
        });
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    initializeSkills();
    initializeAnimations();
    initializeCharts();
    window.addEventListener('scroll', handleScroll);
});
