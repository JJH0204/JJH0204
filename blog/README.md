<div style="text-align: left;">
  <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;"> 📁 디렉토리 구조 </h2>
  <div style="margin: 0; text-align: left;">
    <pre>
# JJH0204 Portfolio & Blog

포트폴리오와 기술 블로그를 위한 개인 웹사이트입니다.

## 디렉토리 구조

```
JJH0204/
├── index.html              # 메인 포트폴리오 페이지
├── blog/                   # 블로그 관련 파일들
│   ├── index.html         # 블로그 메인 페이지
│   ├── posts/             # 블로그 포스트 파일들
│   │   ├── 2024/         # 연도별 포스트
│   │   └── categories/    # 카테고리별 포스트 목록
│   └── assets/            # 블로그 전용 이미지 등
├── assets/                # 공통 에셋 파일들
│   ├── images/           # 이미지 파일
│   └── documents/        # 문서 파일
├── css/                   # 스타일시트
│   ├── styles.css        # 메인 스타일
│   └── blog.css          # 블로그 전용 스타일
└── js/                    # 자바스크립트
    ├── main.js           # 메인 스크립트
    └── blog.js           # 블로그 전용 스크립트
```

## 블로그 포스트 작성 가이드

1. 새 포스트 작성하기
   - `blog/posts/[년도]/` 디렉토리에 새 마크다운 파일 생성
   - 파일명 형식: `YYYY-MM-DD-title.md`
   - 포스트 상단에 YAML 프론트매터 작성

2. 프론트매터 예시
   ```yaml
   ---
   layout: post
   title: "포스트 제목"
   date: 2024-01-10
   categories: [Web, Development]
   tags: [JavaScript, React]
   description: "포스트 요약 내용"
   ---
   ```

3. 이미지 추가
   - 블로그 관련 이미지: `blog/assets/images/` 에 저장
   - 포스트에서 참조: `![이미지 설명](/blog/assets/images/파일명)`

## 로컬에서 실행하기

```bash
# 로컬 서버 실행
python -m http.server 8000
```

브라우저에서 `http://localhost:8000` 접속
    </pre>
  </div>
</div>