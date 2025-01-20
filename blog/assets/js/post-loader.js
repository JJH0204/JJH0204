// 마크다운 파일 목록을 가져오는 함수
async function getMarkdownFiles(category) {
    try {
        const response = await fetch(`/posts/${category}`);
        const files = await response.json();
        return files;
    } catch (error) {
        console.error('Error fetching markdown files:', error);
        return [];
    }
}

// PostManager 객체 정의
const PostManager = {
    posts: [],
    
    // 포스트 목록 로드
    async loadPosts(category) {
        try {
            const response = await fetch(`posts/${category}/posts.json`);
            if (!response.ok) throw new Error('Failed to load posts');
            const data = await response.json();
            this.posts = data.posts;
            
            // 날짜순으로 정렬
            this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            return this.posts;
        } catch (error) {
            console.error('Error loading posts:', error);
            return [];
        }
    }
};

// URL에서 포스트 정보 가져오기
function getPostInfoFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return {
        category: params.get('category') || 'etc',
        post: params.get('post')
    };
}

// 마크다운 포스트 로드
async function loadMarkdownPost(category, postId) {
    try {
        // 포스트 메타데이터 찾기
        const postData = PostManager.posts.find(p => p.id === postId);
        if (!postData) throw new Error('Post not found');

        // 마크다운 파일 로드
        const response = await fetch(`posts/${category}/${postData.file}`);
        if (!response.ok) throw new Error('Post file not found');
        
        const markdown = await response.text();
        const html = marked.parse(markdown);
        
        // 첫 번째 h1 태그를 제외한 내용만 표시
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const firstH1 = tempDiv.querySelector('h1');
        if (firstH1) firstH1.remove();
        
        // 포스트 내용 표시
        document.getElementById('post-content').innerHTML = `
            <header class="main">
                <h1>${postData.title}</h1>
                <div class="post-meta">
                    <span class="date">${formatDate(postData.date)}</span>
                    ${postData.tags ? `<span class="tags">${postData.tags.join(', ')}</span>` : ''}
                </div>
            </header>
            ${tempDiv.innerHTML}
        `;
        
        // 코드 하이라이팅 적용
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });

        // 네비게이션 렌더링
        renderNavigation(postId);
    } catch (error) {
        console.error('Error loading post:', error);
        document.getElementById('post-content').innerHTML = '<p>포스트를 찾을 수 없습니다.</p>';
    }
}

// 최근 게시물 목록을 생성하는 함수
function displayRecentPosts(posts) {
    const postsHtml = posts.map(post => `
        <article class="post">
            <a href="posts.html?category=${getPostInfoFromUrl().category}&post=${post.id}" class="post-link">
                <h3>${post.title}</h3>
                <div class="post-meta">
                    <span class="date">${formatDate(post.date)}</span>
                    ${post.tags ? `<span class="tags">${post.tags.join(', ')}</span>` : ''}
                </div>
            </a>
        </article>
    `).join('');

    return `
        <section class="recent-posts">
            <h2>게시물</h2>
            <div class="posts">
                ${postsHtml}
            </div>
        </section>
    `;
}

// 날짜 포맷팅 함수
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 현재 포스트의 이전/다음 포스트 가져오기
function getNavigation(currentId) {
    const currentIndex = PostManager.posts.findIndex(post => post.id === currentId);
    return {
        prev: PostManager.posts[currentIndex - 1],
        next: PostManager.posts[currentIndex + 1]
    };
}

// 네비게이션 UI 렌더링
function renderNavigation(currentId) {
    const { prev, next } = getNavigation(currentId);
    const navHtml = `
        <hr class="major" />
        <div class="post-navigation">
            ${prev ? `<a href="?category=${getPostInfoFromUrl().category}&post=${prev.id}" class="button">← ${prev.title}</a>` : ''}
            ${next ? `<a href="?category=${getPostInfoFromUrl().category}&post=${next.id}" class="button">${next.title} →</a>` : ''}
        </div>
    `;
    
    document.getElementById('post-content').insertAdjacentHTML('beforeend', navHtml);
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', async () => {
    const { category, post } = getPostInfoFromUrl();
    
    // 해당 카테고리의 posts.json 로드
    await PostManager.loadPosts(category);
    
    if (post) {
        // 특정 포스트 표시
        await loadMarkdownPost(category, post);
    } else {
        // 카테고리의 포스트 목록 표시
        document.getElementById('post-content').innerHTML = displayRecentPosts(PostManager.posts);
    }
});
