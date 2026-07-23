# 📚 EduCat

AI 기반 맞춤형 영어 학습 플랫폼

학생의 학습 데이터를 기반으로 AI가 개인 맞춤형 학습 콘텐츠를 추천하고, 학생·학부모·교사가 학습 현황을 한눈에 확인할 수 있도록 개발한 영어 교육 웹 서비스입니다.


---


# 📖 프로젝트 소개

기존 영어 교육 서비스는 모든 학생에게 동일한 학습 콘텐츠를 제공하는 경우가 많아 학생별 학습 수준과 취약 영역을 반영하기 어려웠습니다.

EduCat은 이러한 문제를 해결하기 위해 학습 데이터를 분석하여 개인별 맞춤 콘텐츠를 제공하고, 학습 결과를 시각화하여 효율적인 학습이 가능하도록 기획한 프로젝트입니다.


---


# ✨ 주요 기능
## 🤖 AI 맞춤형 학습
AI 기반 개인별 영어 학습 콘텐츠 추천
학습 수준에 따른 맞춤형 콘텐츠 제공

## 📊 학습 대시보드
학생 / 학부모 / 교사별 대시보드
학습 현황 및 진도 확인
학습 결과 시각화

## 📚 영어 학습 콘텐츠
단어
문법
듣기
쓰기

## 👨‍🏫 학습 관리
학습 진도 관리
사용자별 학습 이력 조회
학습 데이터 확인


---


## 🖥️ 담당 역할 (Frontend)
구현
React 기반 메인 페이지 UI 구현
학습 콘텐츠 페이지 구현
학습 데이터 화면 렌더링
REST API 연동
반응형 UI 구현

## 📊 Contribution

| Feature | Contribution |
|---------|-------------:|
| Main Page | 70% |
| Learning Content Page | 30% |

---

## 🛠 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

### API
![REST API](https://img.shields.io/badge/REST_API-4CAF50?style=flat-square)

### Collaboration
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)

### Development
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)


---


## ⚙️ 주요 구현 내용
학습 콘텐츠 조회

REST API를 통해 사용자별 학습 데이터를 조회하고 화면에 렌더링했습니다.

사용자 맞춤 화면 구성

학생별 학습 데이터를 기반으로 콘텐츠와 학습 현황을 동적으로 출력하도록 구현했습니다.

반응형 UI

PC와 태블릿 환경에서도 사용할 수 있도록 반응형 레이아웃을 적용했습니다.


---


## 🚀 기술적 고민

프로젝트에는 다양한 학습 콘텐츠 화면이 존재했으며, 여러 페이지가 비슷한 구조를 가지고 있었습니다.

초기에는 페이지마다 개별적으로 구현하면서 코드 중복이 많이 발생했습니다.

프로젝트를 진행하면서 공통 UI를 컴포넌트로 분리하고 재사용하는 방식이 유지보수성과 개발 효율성을 크게 높일 수 있다는 점을 경험했습니다.

이 경험을 통해 기능 구현뿐 아니라 초기 설계 단계에서 컴포넌트 구조와 재사용성을 고려하는 것이 중요하다는 점을 배울 수 있었습니다.


---


## 🌱 프로젝트를 통해 배운 점

이번 프로젝트를 통해 단순히 화면을 구현하는 것을 넘어,

사용자에게 데이터를 어떻게 전달하면 더 직관적인지 고민하는 경험을 했습니다.
REST API를 활용하며 프론트엔드와 백엔드 간 데이터 흐름을 이해할 수 있었습니다.
컴포넌트 재사용성과 유지보수성을 고려한 설계의 중요성을 배웠습니다.
협업 과정에서 Git과 GitHub를 활용한 버전 관리 경험을 쌓았습니다.


## 📷 Screenshots
메인 화면	학습 대시보드
이미지	이미지
학습 콘텐츠	학습 결과
이미지	이미지
