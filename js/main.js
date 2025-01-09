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

// 프로젝트 필터링
document.querySelectorAll('.project-category').forEach(category => {
    const filterButtons = category.querySelectorAll('.filter-btn');
    const projectCards = category.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 현재 카테고리 내의 버튼들만 활성 상태 변경
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const tags = card.querySelectorAll('.tag');
                    const hasTag = Array.from(tags).some(tag => 
                        tag.textContent.slice(1) === filter
                    );
                    
                    if (hasTag) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
});

// Video Modal Functionality
function initializeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeBtn = document.querySelector('.close-modal');
    const videoBtns = document.querySelectorAll('.video-btn');

    videoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const videoId = btn.dataset.videoId;
            videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // 스크롤 방지
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        videoFrame.src = '';
        document.body.style.overflow = ''; // 스크롤 복원
    }
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// 타임라인 아이템 애니메이션
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 1,
        ease: "power2.out"
    });
});

// 프로젝트 카드 애니메이션
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 60%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.2,
        ease: "back.out(1.2)"
    });
});

// 필터 버튼 애니메이션
const filterButtons = document.querySelectorAll('.filter-btn');
gsap.from(filterButtons, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: '.project-filters',
        start: "top 90%"
    }
});

// 스킬 섹션 애니메이션
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item) => {
    const progress = item.querySelector('.progress-bar');
    const percentage = progress.getAttribute('data-progress');
    
    gsap.from(progress, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
        },
        width: "0%",
        duration: 1.5,
        ease: "power2.out"
    });
    
    gsap.to(progress, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%"
        },
        width: percentage + "%",
        duration: 1.5,
        ease: "power2.out"
    });
});

// 태그 애니메이션
const tags = document.querySelectorAll('.tag');
tags.forEach((tag) => {
    tag.addEventListener('mouseenter', () => {
        gsap.to(tag, {
            scale: 1.1,
            duration: 0.3,
            ease: "back.out(1.5)"
        });
    });
    
    tag.addEventListener('mouseleave', () => {
        gsap.to(tag, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// 프로젝트 섹션 제목 애니메이션
const projectTitles = document.querySelectorAll('.project-category h2');
projectTitles.forEach((title) => {
    // 텍스트를 글자 단위로 분리
    const text = title.textContent;
    const chars = text.split('');
    title.textContent = '';
    
    // 각 글자를 span으로 감싸기
    chars.forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        title.appendChild(span);
    });

    // 글자별 애니메이션
    gsap.from(title.children, {
        scrollTrigger: {
            trigger: title,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        scale: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(2)",
    });
});

// 프로젝트 카드 애니메이션 강화
projectCards.forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 60%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        scale: 0.8,
        y: 100,
        rotation: -5,
        duration: 1,
        delay: index * 0.2,
        ease: "elastic.out(1, 0.5)"
    });
});

// 필터 버튼 애니메이션 강화
filterButtons.forEach((button) => {
    gsap.from(button, {
        opacity: 0,
        scale: 0.5,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: {
            trigger: '.project-filters',
            start: "top 90%"
        }
    });
});

// 필터 버튼 호버 효과
filterButtons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.1,
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            duration: 0.3,
            ease: "back.out(2)"
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        if (!btn.classList.contains('active')) {
            gsap.to(btn, {
                scale: 1,
                backgroundColor: 'transparent',
                color: 'var(--primary-color)',
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
});

// 태그 애니메이션 강화
tags.forEach((tag) => {
    tag.addEventListener('mouseenter', () => {
        gsap.to(tag, {
            scale: 1.2,
            rotation: 5,
            duration: 0.4,
            ease: "back.out(2)"
        });
    });
    
    tag.addEventListener('mouseleave', () => {
        gsap.to(tag, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "power2.out"
        });
    });
});

// 페이지 로드 애니메이션
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    tl.from('nav', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
    .from('.section-title', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
    }, "-=0.5")
    .from('.timeline-dot', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
    }, "-=0.5");
});

// 비디오 버튼 호버 애니메이션
const videoButtons = document.querySelectorAll('.video-btn');
videoButtons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    initializeSkills();
    initializeAnimations();
    initializeCharts();
    initializeVideoModal();
    window.addEventListener('scroll', handleScroll);
});
