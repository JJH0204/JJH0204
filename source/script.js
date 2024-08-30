// script.js
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.content');

    function checkVisibility() {
        const triggerPoint = window.innerHeight * 0.8;

        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < triggerPoint) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // 초기 페이지 로드 시에도 실행
});
