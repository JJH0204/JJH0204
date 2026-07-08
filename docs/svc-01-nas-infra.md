# 오픈소스 기반 팀 협업 인프라 구축·운영

**프로젝트**: 재조합 (블루이글루) 게임 개발 · 인디 게임 개발 · 2026.02 ~ 현재

## 개요

iptime NAS 서버 위에 Docker 컨테이너로 Gitea·Plane을 구동하고, Focalboard로 통합 대시보드를 구현해 팀원이 한 곳에서 효율적으로 접속·관리하도록 설계했습니다.

## 상세 설명

iptime NAS의 Docker 환경에 각 서비스를 독립 컨테이너로 배포했습니다.

- **Focalboard** (`:8080`) — 팀 진입점 대시보드
- **Gitea** (`:3000`) — 형상관리
- **Plane** (`:8888`) — 프로젝트·이슈 트래킹
- **NAS 자체 파일 스토리지** (`:9800`) — 리소스 백업 및 대용량 에셋 공유

각 서비스는 내부망에서 포트 포워딩으로 팀원 누구나 URL 접속만으로 이용할 수 있도록 구성했습니다.

## 아키텍처

```mermaid
flowchart TB
    U["사용자 (팀원) 브라우저"] -->|웹 접속| FB

    subgraph NAS["iptime NAS 서버 · 호스트"]
        subgraph DOCKER["Docker Engine · 컨테이너"]
            FB["Focalboard<br/>통합 대시보드 · 진입점<br/>:8080"]
            GITEA["Gitea<br/>Git 서버 · 형상관리<br/>:3000"]
            PLANE["Plane<br/>프로젝트 관리 · Notion 대체<br/>:8888"]
            FB --> GITEA
            FB --> PLANE
        end
        NASD["NAS 저장소<br/>파일 스토리지 · 호스트 네이티브<br/>:9800"]
        DOCKER -.-> NASD
    end
```

## 스크린샷

![스크린샷 1](../images/Screenshot%202026-07-06%20at%2023.47.26.png)
![스크린샷 2](../images/Screenshot%202026-07-06%20at%2023.47.54.png)
![스크린샷 3](../images/Screenshot%202026-07-06%20at%2023.49.23.png)
![스크린샷 4](../images/Screenshot%202026-07-06%20at%2023.49.59.png)
![스크린샷 5](../images/Screenshot%202026-07-07%20at%2009.18.32.png)

---
[← 포트폴리오로 돌아가기](../index.html)
