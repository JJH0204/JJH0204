class WindowManager {
    constructor() {
        this.windows = new Map();
        this.activeWindow = null;
        this.template = document.querySelector('.window');
        this.container = document.getElementById('windows-container');
        
        // 템플릿 창을 복제하고 원본은 제거
        this._templateHTML = this.template.outerHTML;
        this.template.remove();
        
        this.init();
    }

    init() {
        // 드래그 이벤트 초기화
        document.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    createWindow(options = {}) {
        const { title = 'New Window', content = '', width = '600px', height = '400px', isVisible = false } = options;
        
        // HTML 문자열로부터 새 창 요소 생성
        const temp = document.createElement('div');
        temp.innerHTML = this._templateHTML;
        const window = temp.firstElementChild;
        
        window.style.display = isVisible ? 'flex' : 'none';
        window.removeAttribute('hidden');
        
        // 윈도우 설정
        window.style.width = width;
        window.style.height = height;
        window.style.position = 'absolute';
        window.style.left = '50%';
        window.style.top = '50%';
        window.style.transform = 'translate(-50%, -50%)';
        
        // 제목 설정
        window.querySelector('.window-title').textContent = title;
        
        // 컨텐츠 설정
        const contentEl = window.querySelector('.window-content');
        if (typeof content === 'string') {
            contentEl.innerHTML = content;
        } else {
            contentEl.appendChild(content);
        }
        
        // 컨트롤 버튼 이벤트 (macOS 스타일)
        window.querySelector('.close').addEventListener('click', () => this.closeWindow(window));
        window.querySelector('.minimize').addEventListener('click', () => this.minimizeWindow(window));
        window.querySelector('.maximize').addEventListener('click', () => this.maximizeWindow(window));
        
        this.container.appendChild(window);
        this.windows.set(window, { 
            maximized: false,
            minimized: false,
            lastPosition: null,
            lastSize: null
        });
        
        if (isVisible) {
            this.focusWindow(window);
            
            // 애니메이션 효과
            requestAnimationFrame(() => {
                window.style.opacity = '0';
                window.style.transform = 'translate(-50%, -45%) scale(0.98)';
                requestAnimationFrame(() => {
                    window.style.transition = 'all 0.2s ease-out';
                    window.style.opacity = '1';
                    window.style.transform = 'translate(-50%, -50%) scale(1)';
                });
            });
        }
        
        return window;
    }

    // 윈도우 드래그 관련 메서드들
    handleMouseDown(e) {
        const header = e.target.closest('.window-header');
        if (!header || e.target.closest('.window-controls')) return;
        
        const window = header.closest('.window');
        if (!window) return;
        
        this.dragging = {
            window,
            startX: e.clientX,
            startY: e.clientY,
            initialLeft: window.offsetLeft,
            initialTop: window.offsetTop
        };
        
        this.focusWindow(window);
    }

    handleMouseMove(e) {
        if (!this.dragging) return;
        
        const dx = e.clientX - this.dragging.startX;
        const dy = e.clientY - this.dragging.startY;
        
        this.dragging.window.style.left = `${this.dragging.initialLeft + dx}px`;
        this.dragging.window.style.top = `${this.dragging.initialTop + dy}px`;
    }

    handleMouseUp() {
        this.dragging = null;
    }

    focusWindow(window) {
        if (this.activeWindow) {
            this.activeWindow.style.zIndex = '1';
        }
        window.style.zIndex = '2';
        this.activeWindow = window;
    }

    closeWindow(window) {
        // macOS 스타일 닫기 애니메이션
        window.style.transition = 'all 0.2s ease-in';
        window.style.opacity = '0';
        window.style.transform = 'translate(-50%, -45%) scale(0.98)';
        
        setTimeout(() => {
            window.remove();
            this.windows.delete(window);
            window.dispatchEvent(new Event('close'));
        }, 200);
    }

    minimizeWindow(window) {
        const windowState = this.windows.get(window);
        if (windowState.minimized) return;
        
        // 현재 위치 저장
        windowState.lastPosition = {
            left: window.style.left,
            top: window.style.top
        };
        
        // 최소화 애니메이션
        window.style.transition = 'all 0.3s ease-in';
        window.style.transform = 'scale(0.7)';
        window.style.opacity = '0';
        
        setTimeout(() => {
            window.style.display = 'none';
            windowState.minimized = true;
        }, 300);
    }

    maximizeWindow(window) {
        const windowState = this.windows.get(window);
        const menubarHeight = 25; // macOS 메뉴바 높이
        
        if (windowState.maximized) {
            // 원래 크기로 복원
            window.style.transition = 'all 0.3s ease-out';
            window.style.top = windowState.lastSize.top;
            window.style.left = windowState.lastSize.left;
            window.style.width = windowState.lastSize.width;
            window.style.height = windowState.lastSize.height;
            window.style.borderRadius = '8px';
        } else {
            // 현재 상태 저장
            windowState.lastSize = {
                top: window.style.top,
                left: window.style.left,
                width: window.style.width,
                height: window.style.height
            };
            
            // 최대화
            window.style.transition = 'all 0.3s ease-out';
            window.style.top = `${menubarHeight}px`;
            window.style.left = '0';
            window.style.width = '100%';
            window.style.height = `calc(100vh - ${menubarHeight}px)`;
            window.style.borderRadius = '0';
        }
        
        windowState.maximized = !windowState.maximized;
    }

    restoreWindow(window) {
        const windowState = this.windows.get(window);
        if (!windowState.minimized) return;
        
        window.style.display = '';
        requestAnimationFrame(() => {
            window.style.transform = 'scale(1)';
            window.style.opacity = '1';
        });
        
        windowState.minimized = false;
    }
}

// 윈도우 매니저 초기화
const windowManager = new WindowManager();
