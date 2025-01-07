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

// Navigation scroll effect
function handleScroll() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    initializeSkills();
    initializeAnimations();
    initializeCharts();
    initializeVideoModal();
    window.addEventListener('scroll', handleScroll);
});
