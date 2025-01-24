// 시계 업데이트 함수
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    
    // 시간과 분을 2자리 숫자로 표시
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    // 시계 표시
    clockElement.textContent = `${hours}:${minutes}`;
}

// 페이지 로드 시 시계 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 초기 시계 설정
    updateClock();
    
    // 1분마다 시계 업데이트
    setInterval(updateClock, 60000);
});
