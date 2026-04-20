# 홀로그램 웹앱 배포 가이드

이 프로젝트는 정적 파일(`index.html`, `styles.css`, `script.js`, `samples/`, `preview/`)로 구성되어서 배포가 쉽습니다.

## 1) 가장 쉬운 방법: Vercel (권장)

1. [Vercel](https://vercel.com/) 로그인
2. `Add New Project` -> Git 저장소 연결 또는 `hologram` 폴더 업로드
3. Framework Preset은 `Other`로 두고 배포
4. 배포 완료 후 발급된 URL 공유

## 2) GitHub Pages

1. 이 폴더를 새 GitHub 저장소로 업로드
2. 저장소 `Settings` -> `Pages`
3. `Deploy from a branch` 선택
4. `main` 브랜치와 `/ (root)` 선택 후 저장
5. 1~2분 후 `https://<계정명>.github.io/<저장소명>/`에서 접속

## 3) Netlify Drop (초간단)

1. [Netlify Drop](https://app.netlify.com/drop) 접속
2. `hologram` 폴더를 브라우저에 드래그 앤 드롭
3. 즉시 임시 배포 URL 생성

---

## 배포 전 체크리스트

- `index.html`에서 샘플/미리보기 경로가 상대경로(`./samples/...`)인지 확인
- 모바일에서 밝기 100%로 테스트
- iOS Safari, Android Chrome에서 각각 1회 확인
