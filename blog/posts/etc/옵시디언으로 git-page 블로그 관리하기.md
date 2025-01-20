[이전 포스팅](./20250120.md)의 내용을 이어 옵시디언으로 블로그 관리를 할 수 있도록 시스템을 구축하려 한다.
<br>

---
## 1. 옵시디언 vault 추가
<br>

![](posts/attachments/Pasted%20image%2020250120164406.png)
이 블로그의 페이지를 옵시디언의 vault로 추가했다.
<br>

---
## 2. gitignore 파일 추가
아래 옵시디언의 vault로 추가하면 하위에 숨긴 폴더로 옵시디언 설정 파일들이 생성된다.
<br>

옵시디언에서는 설정파일을 식별할 수 없다.
<br>

대신 github에 커밋할 때 불필요한 정보를 커밋하기에 추후에 보안상 취약해질 수 있다.(플러그인 때문에 더더욱)
<br>

![](posts/attachments/Pasted%20image%2020250120165458.png)
<br>

.gitignore 파일을 작성하면 옵시디언 설정 과정에서 발생하는 파일들을 커밋 리스트에서 제외할 수 있다.
<br>

```.gitignore
# Thumbnails
._*

# Files that might appear in the root of a volume
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
.com.apple.timemachine.donotpresent

# Directories potentially created on remote AFP share
.AppleDB
.AppleDesktop
Network Trash Folder
Temporary Items
.apdisk

# Obsidian specific files
.obsidian
.obsidian/workspace
.space
.makemd
```
<br>
위 파일 내용으로 .gitignore 파일을 블로그 디렉터리에 추가하면 된다.
<br>

---
## 3. 옵시디언 설정
초기 옵시디언 설정을 그대로 사용하면 아무래도 파일 구조나 기타 설정들이 마음에 들지 않을 수도 있다.
<br>

![](posts/attachments/Pasted%20image%2020250120171110.png)
<br>

위 설정 중 붉은 색으로 표시한 설정은 무조건 자신의 환경에 맞게 수정해 줘야 한다.
<br>

이렇게 하면 마크다운 확장을 이용한 파일에 첨부된 파일을 웹 페이지에서 찾아서 출력하기 쉬워진다.
<br>

---
## 4. 마크다운 줄 바꿈 문법 적용
옵시디언에서 사용되는 마크다운 문법에는 줄바꿈 문자가 따로 없다.
<br>

엔터 한번이면 충분한데 이게 다른 마크다운을 사용한 어플리케이션에서 열람하면 줄 바꿈이 제대로 적용되어 있지 않는다.
<br>

이걸 해결하기 위한 방법으로 아래 링크에서 제안한 방법을 사용했다.
<br>

[커뮤니티 질문](https://arca.live/b/obsidian/118369253)
<br>

이 정도까지는 선택의 영역이라 따로 할 것이 없다.
<br>

추가로 구축한 블로그에는 게시물을 각 디렉터리 마다 `posts.json`으로 관리하기 때문에
<br>

설정에서 .json 을 볼 수 있도록 설정하면 게시물 수정 시 해당 파일을 수정하기 쉬워진다.
<br>

---
## 5. 깃 익스텐션 설치
옵시디언의 강점은 확장(익스텐션)을 추가할 수 있다는 것이다.
<br>

[옵시디언 깃 익스텐션 추가](https://alive-wong.tistory.com/65)
<br>

이미 좋은 자료가 많기에 따로 설명을 하는 것을 불필요해보인다.
<br>

이렇게 설정하면 마크다운 파일로 작성중인 포스팅을 자동으로 블로그에 게시할 수 있게된다.
<br>

---
## 6. 개선안
이렇게 옵시디언으로 블로그 포스팅을 관리할 수 있게 되었다.
<br>

하지만 불편함은 아직도 있다.
<br>

`posts.json`을 관리하는 것을 어떻게 자동화 하면 좋을지 고민이다.
<br>
![](posts/attachments/스크린샷%202025-01-20%2017.31.19.png)
<br>
이 파일을 수정하려면 vscode 또는 텍스트 편집기를 따로 실행해야 한다.
<br>

옵시디언을 사용하기로 한 현재 이렇게 되면 직점 확장을 구현해서 json파일을 관리해보면 좋을 것 같다.
<br>

아래는 추후에 참고해서 작업하면 좋을 자료들이다.
<br>

[옵시디언 플러그인 개발](https://steemit.com/hive-137029/@anpigon/started-obsidian-plugin-development)