<div style="text-align: left;">
  <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;"> 📁 디렉토리 구조 </h2>
  <div style="margin: 0; text-align: left;">
    <pre>
# JJH0204 Blog

마크다운 기반의 개인 기술 블로그입니다.

## 디렉토리 구조

```
blog/
├── index.html              # 블로그 메인 페이지
├── posts.html             # 포스트 표시 페이지
├── posts/                 # 블로그 포스트 디렉터리
│   ├── etc/              # 일상 노트
│   ├── game-dev/         # 게임 개발
│   │   ├── game-design/  # 게임 디자인
│   │   ├── unity-project/# 유니티 프로젝트
│   │   ├── game-server/  # 게임 서버
│   │   └── devlog/       # 개발 일지
│   ├── system-arch/      # 시스템 & 아키텍처
│   │   ├── server-arch/  # 서버 아키텍처
│   │   ├── network/      # 네트워크 프로그래밍
│   │   ├── security/     # 시스템 보안
│   │   └── optimization/ # 성능 최적화
│   └── study-notes/      # 학습 노트
│       ├── computer-science/ # 컴퓨터 과학
│       ├── algorithms/    # 알고리즘
│       ├── books-review/  # 도서 리뷰
│       └── tech-trends/   # 기술 트렌드
└── assets/               # 정적 자원
    ├── css/             # 스타일시트
    │   └── main.css     # 메인 스타일
    ├── js/              # 자바스크립트
    │   ├── main.js      # 메인 스크립트
    │   ├── util.js      # 유틸리티 함수
    │   └── post-loader.js # 포스트 로딩 스크립트
    ├── sass/            # SASS 소스 파일
    ├── webfonts/        # 웹폰트
    └── images/          # 이미지 파일

```

## 블로그 포스트 작성 가이드

1. 새 포스트 작성하기
   - 해당 카테고리 디렉터리에 새 마크다운 파일 생성
   - 파일명 형식: `YYYY-MM-DD-title.md`
   - 포스트 상단에 제목(h1)을 반드시 포함

2. posts.json 업데이트
   각 카테고리 디렉터리의 posts.json 파일에 포스트 메타데이터 추가
   ```json
   {
     "posts": [
       {
         "id": "YYYY-MM-DD-title",
         "title": "포스트 제목",
         "date": "YYYY-MM-DD",
         "tags": ["태그1", "태그2"],
         "file": "YYYY-MM-DD-title.md"
       }
     ]
   }
   ```

3. 마크다운 파일 작성 예시
   ```markdown
   # 포스트 제목

   포스트 내용을 여기에 작성합니다.
   첫 번째 h1 태그는 제목으로 사용되며 본문에서는 제외됩니다.

   ## 소제목

   ### 작은 제목

   - 목록 항목 1
   - 목록 항목 2

   ```python
   # 코드 블록
   def hello():
       print("Hello, World!")
   ```
   ```

4. 이미지 추가
   - 이미지 파일: `assets/images/` 에 저장
   - 마크다운에서 참조: `![이미지 설명](/assets/images/파일명)`

## 사용된 라이브러리
- [Marked.js](https://marked.js.org/): 마크다운 파싱
- [Highlight.js](https://highlightjs.org/): 코드 구문 강조
- [jQuery](https://jquery.com/): DOM 조작
- [Editorial HTML5 UP](https://html5up.net/editorial): 기본 템플릿
    </pre>
  </div>