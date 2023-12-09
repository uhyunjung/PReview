## ❤️ 오픈SW플랫폼 프로젝트

![6](https://user-images.githubusercontent.com/67186222/99868507-7d630780-2c06-11eb-9ef3-495048b7c05a.JPG)
<br/><br/>

## 📖 프로젝트 이름 : PReview(프리뷰)
PReview는 코딩 강의 및 코딩 캠프에 대한 리뷰, 코딩 문제 및 프로젝트에 대한 솔루션 등의 정보를 공유하는 커뮤니티를 제공하는 플랫폼입니다.
<br/><br/>

## 👨‍👩‍👦‍👦 팀원 소개
|학번|이름|
|------|---|
|1615068|조수희|
|1678181|송지현|
|1971003|강예진|
|1976253|윤수지|
|1971030|유현정|

<br/>

## 📲 기능 소개
1. Member Registration(회원 가입)
2. Coding Lecture Reviews(코딩 강의 리뷰)
3. Coding Camp Reviews(코딩 캠프 리뷰)
4. Community(커뮤니티)
5. Keyword Search(검색)-Search by tags and keywords
6. Visualization(시각화)-The number of reviews and average of star rating
<br/>

## 📽️ 발표 자료 및 데모 영상
|<div align="center"/>중간 발표| <div align="center"/>기말 발표|<div align="center"/>프로토타입|<div align="center"/>데모 영상|<div align="center"/>최종 영상|
| :------------------------ | :--------------------------- |:--------------------------- |:--------------------------- |:--------|
|🔗[**중간 발표**](https://drive.google.com/file/d/1o2WvCAlyi5EbhThbdL9dZpxas0ddrYH6/view?usp=sharing)|🔗[**기말 발표**](https://drive.google.com/file/d/15-w65Qmd0Yz7R1brTH43aB4kG4yhHscE/view?usp=share_link)|🔗[**프로토타입**](https://drive.google.com/file/d/1d-QxbySSE2yt8f5qI-rUwE_F4ExNk7sM/view?usp=sharing)|🔗[**데모 영상**](https://drive.google.com/file/d/1-dVBquSm6KsZyJJXENz4DREVepsbcSxs/view?usp=sharing)|🔗[**최종 영상**](https://drive.google.com/file/d/1wuepieW2DY6pPqMXcNicBvDdQDR_AkIx/view?usp=sharing)|

<br/>

## 💡 실행 방법
### 개발환경
**1. 원격 저장소 복제**
```bash
$ git clone https://github.com/yhyeonjg/PReview.git
```
**2. appID 설정**
```bash
$ npm install -g create-react-app
$ npm i react react-dom
$ npm run start
```
<br/>

## 📁 디렉토리 구조
```
PReview
├── public/
│   └── index.html                                     - 메인 html 파일
│
├── src/
│   ├── index.js                                       - 렌더링 파일
│   ├── App.js                                         - 메뉴 페이지
│   ├── firebase.js                                    - firebase config, firestore 접근(db)
│   ├── Main.js                                        - 메인 페이지
│   ├── Login.js                                       - 로그인 페이지
│   ├── Mypage.js                                      - 마이페이지
│   └── Lecture_review_main, detail, write, edit.js    - 강의 리뷰 페이지
│   ├── Camp_review_main, detail, write, edit.js       - 캠프 리뷰 페이지
│   ├── Solution_main, detail, write, edit.js          - 솔루션 페이지
│   ├── Community_view_main, detail, write, edit.js    - 커뮤니티 페이지
│   └── total.css                                      - css 파일
│
├── before/                                            - 수정 전 파일들(실행 파일X)
│ 
├── .gitignore
├── .firebaserc                                        - firebase 설정 파일
├── firebase.json
├── firestore.indexes.json
├── firestore.rules                                    - firebase 규칙 파일
├── package.json
└── README.md
```
<br/>

## ⚙️ 언어 및 환경
![image](https://user-images.githubusercontent.com/67186222/102082427-48d51b00-3e55-11eb-90a8-9f285b42512c.png)
![image](https://user-images.githubusercontent.com/67186222/102082473-61453580-3e55-11eb-8029-9aac0d8fda16.png)
![image](https://user-images.githubusercontent.com/67186222/102452300-79979900-407d-11eb-8630-3c25404fd143.png)
<br/><br/>

## 😀 개발 규칙
1. 개발하기 전 pull 필수
2. 코드에 주석 작성 ex) 함수 정의
3. 각자의 이름 branch에서 커밋하기(commit 메세지 : 기능 추가 / 기능 수정)
4. pull request 후 main branch에 merge 하기
5. Team Contribution 작성 및 수정
