class DockManager {
    constructor() {
        this.dock = document.querySelector('.dock-container');
        this.apps = new Map();
        this.initDockEffects();
    }

    initDockEffects() {
        const items = document.querySelectorAll('.dock-item');
        
        // 마우스 움직임에 따른 Dock 아이콘 크기 조절
        this.dock.addEventListener('mousemove', (e) => {
            const rect = this.dock.getBoundingClientRect();
            const x = e.clientX - rect.left;
            
            items.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const itemX = itemRect.left - rect.left + itemRect.width / 2;
                
                const distance = Math.abs(x - itemX);
                const scale = Math.max(1, 1.5 - (distance / 100));
                
                item.style.transform = `scale(${scale})`;
            });
        });

        // 마우스가 Dock을 벗어날 때 원래 크기로 복원
        this.dock.addEventListener('mouseleave', () => {
            items.forEach(item => {
                item.style.transform = '';
            });
        });

        // 클릭 이벤트 처리
        items.forEach(item => {
            item.addEventListener('click', () => {
                const appName = item.getAttribute('title');
                this.launchApp(appName.toLowerCase());
            });
        });
    }

    launchApp(appName) {
        // Projects는 런치패드만 열기
        if (appName === 'projects') {
            return;
        }

        // 이미 실행 중인 앱이면 포커스
        if (this.apps.has(appName)) {
            const window = this.apps.get(appName);
            if (window) {
                const windowState = windowManager.windows.get(window);
                if (windowState && windowState.minimized) {
                    window.style.display = 'flex';
                    window.style.transform = 'translate(-50%, -50%) scale(1)';
                    window.style.opacity = '1';
                    windowState.minimized = false;
                }
                windowManager.focusWindow(window);
            }
            return;
        }

        let content, title;
        switch (appName) {
            case 'about':
                title = 'Apple 계정';
                content = `
                    <div class="profile-container">
                        <div class="profile-header">
                            <div class="profile-image">재</div>
                            <div class="profile-info">
                                <div class="profile-name">정재호</div>
                                <div class="profile-email">jaeho6627@icloud.com</div>
                            </div>
                        </div>
                        <div class="profile-sections">
                            <div class="profile-section">
                                <div class="profile-section-item">
                                    <div class="icon blue">
                                        <i class="fas fa-user"></i>
                                    </div>
                                    <div class="text">개인정보</div>
                                    <div class="arrow">
                                        <i class="fas fa-chevron-right"></i>
                                    </div>
                                </div>
                                <div class="profile-section-item">
                                    <div class="icon blue">
                                        <i class="fas fa-shield-alt"></i>
                                    </div>
                                    <div class="text">로그인 및 보안</div>
                                    <div class="arrow">
                                        <i class="fas fa-chevron-right"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="profile-section">
                                <div class="profile-section-item">
                                    <div class="icon gray">
                                        <i class="fas fa-cloud"></i>
                                    </div>
                                    <div class="text">iCloud</div>
                                    <div class="arrow">
                                        <i class="fas fa-chevron-right"></i>
                                    </div>
                                </div>
                                <div class="profile-section-item">
                                    <div class="icon gray">
                                        <i class="fas fa-mobile-alt"></i>
                                    </div>
                                    <div class="text">미디어 및 구입 항목</div>
                                    <div class="arrow">
                                        <i class="fas fa-chevron-right"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="profile-section">
                                <div class="profile-section-item">
                                    <div class="icon blue">
                                        <i class="fab fa-github"></i>
                                    </div>
                                    <div class="text">GitHub</div>
                                    <div class="arrow">
                                        <i class="fas fa-chevron-right"></i>
                                    </div>
                                </div>
                                <div class="profile-section-item">
                                    <div class="icon blue">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                    <div class="text">Contact</div>
                                    <div class="arrow">
                                        <i class="fas fa-chevron-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 'blog':
                title = 'Web Browser';
                const browserWindow = new BrowserWindow();
                content = browserWindow.createBrowserContent();
                break;
            case 'contact':
                title = 'Contact';
                content = '<div class="contact-content">연락처 정보</div>';
                break;
            default:
                return;
        }

        const window = windowManager.createWindow({ 
            title, 
            content,
            width: '700px',
            height: '500px',
            isVisible: true 
        });
        
        if (appName === 'blog') {
            window.querySelector('.window-content').classList.add('browser');
        } else if (appName === 'about') {
            window.querySelector('.window-content').classList.add('about');
        }
        
        this.apps.set(appName, window);
        
        // 창이 닫힐 때 앱 상태 업데이트
        window.addEventListener('close', () => {
            this.apps.delete(appName);
        });
    }
}

// Dock 매니저 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.dockManager = new DockManager();
});
