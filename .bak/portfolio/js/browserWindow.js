class BrowserWindow {
    constructor(url = 'https://jjh0204.github.io/JJH0204/blog/') {
        this.currentUrl = url;
        this.history = [url];
        this.currentIndex = 0;
        this.homeUrl = url;  // 홈 URL 저장
    }

    createBrowserContent() {
        const container = document.createElement('div');
        container.className = 'browser-container';
        
        // 브라우저 툴바
        const toolbar = document.createElement('div');
        toolbar.className = 'browser-toolbar';
        toolbar.innerHTML = `
            <div class="browser-controls">
                <button class="browser-back" ${this.currentIndex === 0 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="browser-forward" ${this.currentIndex === this.history.length - 1 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-right"></i>
                </button>
                <button class="browser-refresh">
                    <i class="fas fa-redo"></i>
                </button>
                <button class="browser-newtab" title="새 탭에서 열기">
                    <i class="fas fa-external-link-alt"></i>
                </button>
                <button class="browser-home" title="홈으로 가기">
                    <i class="fas fa-home"></i>
                </button>
            </div>
            <div class="browser-address-bar">
                <input type="text" value="${this.currentUrl}" />
            </div>
        `;

        // iframe 컨테이너
        const frame = document.createElement('div');
        frame.className = 'browser-frame';
        frame.innerHTML = `<iframe src="${this.currentUrl}" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>`;

        container.appendChild(toolbar);
        container.appendChild(frame);

        // 이벤트 리스너 추가
        this.addEventListeners(container);

        return container;
    }

    addEventListeners(container) {
        const backBtn = container.querySelector('.browser-back');
        const forwardBtn = container.querySelector('.browser-forward');
        const refreshBtn = container.querySelector('.browser-refresh');
        const addressInput = container.querySelector('.browser-address-bar input');
        const iframe = container.querySelector('iframe');
        const newTabButton = container.querySelector('.browser-newtab');
        const homeButton = container.querySelector('.browser-home');

        backBtn.addEventListener('click', () => this.goBack(container));
        forwardBtn.addEventListener('click', () => this.goForward(container));
        refreshBtn.addEventListener('click', () => this.refresh(container));

        addressInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.navigate(addressInput.value, container);
            }
        });

        // iframe 로드 완료 시 주소 업데이트
        iframe.addEventListener('load', () => {
            try {
                const newUrl = iframe.contentWindow.location.href;
                addressInput.value = newUrl;
                this.updateHistory(newUrl, container);
            } catch (e) {
                // 크로스 오리진 제한으로 인한 에러 처리
                console.log('Cannot access iframe content due to same-origin policy');
            }
        });

        // 새 탭에서 열기 버튼
        newTabButton.addEventListener('click', () => {
            this.openInNewTab(addressInput.value);
        });

        // 홈 버튼 클릭
        homeButton.addEventListener('click', () => {
            addressInput.value = this.homeUrl;
            this.navigate(this.homeUrl, container);
        });
    }

    goBack(container) {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateNavigation(this.history[this.currentIndex], container);
        }
    }

    goForward(container) {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            this.updateNavigation(this.history[this.currentIndex], container);
        }
    }

    refresh(container) {
        const iframe = container.querySelector('iframe');
        iframe.src = iframe.src;
    }

    navigate(url, container) {
        // URL이 프로토콜을 포함하지 않으면 추가
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        this.updateNavigation(url, container);
    }

    updateNavigation(url, container) {
        const iframe = container.querySelector('iframe');
        const addressInput = container.querySelector('.browser-address-bar input');
        
        iframe.src = url;
        addressInput.value = url;
        this.updateHistory(url, container);
    }

    updateHistory(url, container) {
        // 현재 위치 이후의 기록 제거
        this.history = this.history.slice(0, this.currentIndex + 1);
        // 새 URL 추가
        this.history.push(url);
        this.currentIndex = this.history.length - 1;
        
        // 네비게이션 버튼 상태 업데이트
        this.updateButtons(container);
    }

    updateButtons(container) {
        const backBtn = container.querySelector('.browser-back');
        const forwardBtn = container.querySelector('.browser-forward');
        
        backBtn.disabled = this.currentIndex === 0;
        forwardBtn.disabled = this.currentIndex === this.history.length - 1;
    }

    openInNewTab(url) {
        // URL이 프로토콜을 포함하지 않으면 추가
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        window.open(url, '_blank');
    }
}
