// 카테고리 필터 기능
document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const postsGrid = document.querySelector('.posts-grid');

    // 카테고리 버튼 클릭 이벤트
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 활성 버튼 스타일 변경
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            filterPosts(category);
        });
    });

    // 포스트 필터링 함수
    function filterPosts(category) {
        const posts = document.querySelectorAll('.post-card');
        posts.forEach(post => {
            if (category === 'all' || post.dataset.categories.includes(category)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }

    // 마크다운 파일 목록 가져오기
    async function fetchPosts() {
        try {
            const response = await fetch('/blog/posts/index.json');
            const posts = await response.json();
            renderPosts(posts);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    }

    // 포스트 렌더링 함수
    function renderPosts(posts) {
        postsGrid.innerHTML = posts.map(post => `
            <article class="post-card" data-categories="${post.categories.join(' ')}">
                ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-image">` : ''}
                <div class="post-content">
                    <div class="post-date">${formatDate(post.date)}</div>
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-description">${post.description}</p>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                </div>
            </article>
        `).join('');
    }

    // 날짜 포맷팅 함수
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ko-KR', options);
    }

    // 초기 포스트 로드
    fetchPosts();
});
