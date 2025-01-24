class Taskbar {
    constructor() {
        this.startMenu = document.getElementById('start-menu');
        this.startButton = document.getElementById('start-menu-btn');
        this.clock = document.getElementById('clock');
        this.runningApps = document.getElementById('running-apps');
        
        this.init();
    }

    init() {
        // 시작 메뉴 토글
        this.startButton.addEventListener('click', () => this.toggleStartMenu());
        
        // 시계 업데이트
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
        
        // 바탕화면 클릭 시 시작 메뉴 닫기
        document.addEventListener('click', (e) => {
            if (!this.startMenu.contains(e.target) && 
                !this.startButton.contains(e.target)) {
                this.startMenu.setAttribute('hidden', '');
            }
        });
    }

    toggleStartMenu() {
        if (this.startMenu.hasAttribute('hidden')) {
            this.startMenu.removeAttribute('hidden');
        } else {
            this.startMenu.setAttribute('hidden', '');
        }
    }

    updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        this.clock.textContent = `${hours}:${minutes}`;
    }

    addRunningApp(appName, icon) {
        const appButton = document.createElement('button');
        appButton.className = 'running-app';
        appButton.innerHTML = `
            <img src="${icon}" alt="${appName}">
            <span>${appName}</span>
        `;
        this.runningApps.appendChild(appButton);
        return appButton;
    }

    removeRunningApp(appButton) {
        appButton.remove();
    }
}

// 태스크바 초기화
const taskbar = new Taskbar();
