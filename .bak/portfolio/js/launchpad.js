class Launchpad {
    constructor() {
        this.launchpad = document.getElementById('launchpad');
        this.trigger = document.getElementById('launchpad-trigger');
        this.grid = document.querySelector('.launchpad-grid');
        this.searchInput = document.querySelector('.launchpad-search input');
        this.projects = [
            {
                name: "프로젝트 1",
                icon: "🚀",
                description: "프로젝트 1 설명",
                technologies: ["React", "Node.js"],
                link: "#"
            },
            {
                name: "프로젝트 2",
                icon: "💻",
                description: "프로젝트 2 설명",
                technologies: ["Vue.js", "Firebase"],
                link: "#"
            },
            {
                name: "프로젝트 3",
                icon: "🎮",
                description: "프로젝트 3 설명",
                technologies: ["Unity", "C#"],
                link: "#"
            },
            // 더 많은 프로젝트 추가 가능
        ];

        this.init();
    }

    init() {
        // 트리거 클릭 이벤트
        this.trigger.addEventListener('click', () => this.toggle());

        // ESC 키로 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.launchpad.classList.contains('hidden')) {
                this.hide();
            }
        });

        // 배경 클릭으로 닫기
        this.launchpad.addEventListener('click', (e) => {
            // grid나 검색창을 클릭한 경우가 아닐 때만 닫기
            if (e.target === this.launchpad) {
                this.hide();
            }
        });

        // 검색창과 그리드는 클릭 이벤트 전파 중단
        this.grid.addEventListener('click', (e) => e.stopPropagation());
        this.searchInput.addEventListener('click', (e) => e.stopPropagation());

        // 검색 기능
        this.searchInput.addEventListener('input', (e) => {
            this.filterProjects(e.target.value);
        });

        // 초기 프로젝트 로드
        this.renderProjects();
    }

    toggle() {
        if (this.launchpad.classList.contains('hidden')) {
            this.show();
        } else {
            this.hide();
        }
    }

    show() {
        this.launchpad.classList.remove('hidden');
        setTimeout(() => {
            this.launchpad.classList.add('visible');
        }, 50);
        this.searchInput.value = '';
        this.searchInput.focus();
    }

    hide() {
        this.launchpad.classList.remove('visible');
        setTimeout(() => {
            this.launchpad.classList.add('hidden');
        }, 300);
    }

    renderProjects(projects = this.projects) {
        this.grid.innerHTML = '';
        projects.forEach(project => {
            const item = document.createElement('div');
            item.className = 'project-item';
            item.innerHTML = `
                <div class="project-icon">${project.icon}</div>
                <div class="project-name">${project.name}</div>
            `;

            item.addEventListener('click', (e) => {
                e.stopPropagation(); // 클릭 이벤트 전파 중단
                this.openProject(project);
            });

            this.grid.appendChild(item);
        });
    }

    filterProjects(query) {
        const filtered = this.projects.filter(project => 
            project.name.toLowerCase().includes(query.toLowerCase()) ||
            project.description.toLowerCase().includes(query.toLowerCase()) ||
            project.technologies.some(tech => 
                tech.toLowerCase().includes(query.toLowerCase())
            )
        );
        this.renderProjects(filtered);
    }

    openProject(project) {
        // 프로젝트 창 열기
        const content = `
            <div class="project-detail">
                <h2>${project.name}</h2>
                <p>${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" target="_blank">프로젝트 보기</a>
            </div>
        `;

        windowManager.createWindow({
            title: project.name,
            content: content,
            width: '700px',
            height: '500px'
        });

        this.hide();
    }
}

// 런치패드 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.launchpad = new Launchpad();
});
