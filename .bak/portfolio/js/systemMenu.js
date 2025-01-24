class SystemMenu {
    constructor() {
        this.initializeMenuItems();
        this.updateBatteryStatus();
        this.initializeControlCenter();
    }

    initializeMenuItems() {
        // Spotlight 검색
        const searchIcon = document.getElementById('search-icon');
        searchIcon.addEventListener('click', () => {
            // Spotlight 검색 기능 구현
            console.log('Spotlight 검색');
        });

        // WiFi 상태
        const wifiStatus = document.getElementById('wifi-status');
        wifiStatus.addEventListener('click', () => {
            // WiFi 상태 패널
            console.log('WiFi 상태');
        });

        // 배터리 상태 업데이트
        setInterval(() => this.updateBatteryStatus(), 60000); // 1분마다 업데이트
    }

    updateBatteryStatus() {
        const batteryIcon = document.querySelector('#battery-status i');
        
        // 배터리 API가 지원되는 경우
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                const level = battery.level * 100;
                this.updateBatteryIcon(batteryIcon, level);
                
                // 배터리 상태 변경 이벤트 리스너
                battery.addEventListener('levelchange', () => {
                    this.updateBatteryIcon(batteryIcon, battery.level * 100);
                });
            });
        }
    }

    updateBatteryIcon(icon, level) {
        // 배터리 레벨에 따라 아이콘 변경
        if (level >= 90) {
            icon.className = 'fas fa-battery-full';
        } else if (level >= 70) {
            icon.className = 'fas fa-battery-three-quarters';
        } else if (level >= 40) {
            icon.className = 'fas fa-battery-half';
        } else if (level >= 20) {
            icon.className = 'fas fa-battery-quarter';
        } else {
            icon.className = 'fas fa-battery-empty';
        }
        icon.title = `배터리: ${Math.round(level)}%`;
    }

    initializeControlCenter() {
        const controlCenter = document.getElementById('control-center');
        
        // 제어 센터 패널 생성
        const panel = document.createElement('div');
        panel.className = 'control-center-panel';
        panel.innerHTML = `
            <div class="control-center-section">
                <h3>디스플레이</h3>
                <input type="range" min="0" max="100" value="100" id="brightness-slider">
            </div>
            <div class="control-center-section">
                <h3>음량</h3>
                <input type="range" min="0" max="100" value="50" id="volume-slider">
            </div>
        `;
        document.body.appendChild(panel);

        // 제어 센터 토글
        controlCenter.addEventListener('click', (e) => {
            e.stopPropagation();
            panel.classList.toggle('visible');
        });

        // 패널 외부 클릭 시 닫기
        document.addEventListener('click', (e) => {
            if (!panel.contains(e.target) && !controlCenter.contains(e.target)) {
                panel.classList.remove('visible');
            }
        });
    }
}

// 시스템 메뉴 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.systemMenu = new SystemMenu();
});
