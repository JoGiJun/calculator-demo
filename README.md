# 🧮 모던 바이오닉 계산기 (포트폴리오 프로젝트)

> **"단순한 계산기가 아닌, 견고한 소프트웨어 엔지니어링 원칙의 증명입니다."**

이 프로젝트는 **프론트엔드 엔지니어링** 역량을 증명하기 위해 제작된 고충실도(High-Fidelity) **공학용 계산기**입니다. React나 Vue 같은 프레임워크에 의존하지 않고 **Vanilla JavaScript** (ES Modules)로 구축되었으며, 다음과 같은 심도 있는 기술적 이해를 바탕으로 합니다:

-   **소프트웨어 아키텍처**: **MVC 패턴**과 **SOLID 원칙**을 엄격히 준수합니다.
-   **품질 보증 (QA)**: **TDD (테스트 주도 개발)** 방법론을 적용하여 핵심 로직 테스트 커버리지 100%를 달성했습니다.
-   **모던 UX**: 글래스모피즘(Glassmorphism) 디자인, 유려한 애니메이션, 그리고 강력한 입력 유효성 검사 기능을 제공합니다.

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://JoGiJun.github.io/calculator-demo/)
[![Build Status](https://github.com/JoGiJun/calculator-demo/actions/workflows/deploy.yml/badge.svg)](https://github.com/JoGiJun/calculator-demo/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Calculator Screenshot](./docs/screenshot.png)

## 🎯 설계 철학 및 기술적 핵심

이 프로젝트는 프레임워크 없이도 **확장 가능하고 유지보수가 용이한 코드**를 작성할 수 있음을 증명하기 위해, 엔지니어링의 기본 원칙을 철저히 지키며 개발되었습니다.

### 1. 프레임워크 없는 아키텍처 (Zero-Framework Architecture)
React나 Vue를 사용하는 대신, 커스텀 **컴포넌트 기반 MVC** 아키텍처를 직접 구현했습니다.
-   **이유**: DOM API, 이벤트 위임(Event Delegation), 상태 관리(State Management) 등 웹 개발의 본질적인 원리를 깊이 있게 이해하고 활용했음을 보여주기 위함입니다.

### 2. 테스트 주도 개발 (TDD)
모든 주요 기능은 실패하는 테스트를 먼저 작성하는 것에서 시작했습니다. 핵심 로직은 **Jest**를 통해 엄격하게 검증됩니다.
-   **커버리지**: 파서(Shunting-yard 알고리즘), 유효성 검사기(Validator), 연산 로직(Operation)에 대한 단위 테스트를 포함합니다.

### 3. SOLID 원칙 적용
-   **단일 책임 원칙 (SRP)**: `Parser`, `Validator`, `Formatter`, `Calculator` 클래스를 분리하여 각 모듈의 책임을 명확히 했습니다.
-   **개방-폐쇄 원칙 (OCP)**: 새로운 연산(예: `sin`, `log`) 추가 시, 기존 계산기 코드를 수정하지 않고 `Operation` 클래스만 확장하면 되도록 설계했습니다.
-   **의존성 역전 원칙 (DIP)**: 상위 모듈이 구체적인 구현체가 아닌 추상화(인터페이스)에 의존하도록 설계했습니다.

## ✨ 주요 기능

-   **공학용 연산**: 삼각함수(sin, cos, tan), 로그(log, ln), 거듭제곱, 제곱근 등 다양한 연산 지원.
-   **고급 기록 관리**: 슬라이드 패널을 통해 계산 기록을 확인, 복원 및 관리 가능.
-   **스마트 편집**:
    -   **정밀한 유효성 검사**: 계산 전 잘못된 문법을 사전에 차단.
    -   **자동 괄호 닫기**: 함수 입력 시 닫는 괄호를 자동으로 처리하여 사용성 개선.
    -   **시각적 서식**: 제곱근(√) 등의 기호가 숫자와 자연스럽게 연결되도록 시각적 표현 개선.
    -   **스마트 토글**: `+/-` 부호 변환 및 퍼센트 계산을 문맥에 맞게 처리.
-   **개인화**:
    -   **다크/라이트 테마**: 시스템 설정을 자동으로 따르며, 수동 전환도 가능.
    -   **설정 커스터마이징**: 기본 각도 모드(DEG/RAD) 및 소수점 정밀도 조절 가능.
-   **반응형 디자인**: 데스크탑과 모바일 모두에서 완벽하게 동작하는 글래스모피즘 UI.

## 🛠️ 기술 스택

-   **Core**: HTML5, CSS3, JavaScript (ES Modules)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (유틸리티 퍼스트 스타일링)
-   **Build Tool**: [Vite](https://vitejs.dev/) (빠른 개발 환경 및 최적화된 빌드)
-   **Testing**: [Jest](https://jestjs.io/) (TDD를 위한 단위 및 통합 테스트)
-   **Linting**: ESLint (v9 Flat Config) + Prettier
-   **CI/CD**: GitHub Actions (자동 배포)

## 🚀 시작하기

### 필수 요구사항
-   Node.js (v18 이상)
-   npm

### 설치

```bash
# 리포지토리 클론
git clone https://github.com/yourusername/calculator-demo.git

# 디렉토리 이동
cd calculator-demo

# 의존성 설치
npm install
```

### 개발 서버 실행

로컬 개발 서버를 시작합니다:

```bash
npm run dev
```

### 빌드

최적화된 프로덕션 빌드를 생성합니다:

```bash
npm run build
```

결과물은 `dist` 디렉토리에 생성됩니다.

### 테스트 실행

테스트 스위트를 실행합니다:

```bash
npm test
```

## 🏗️ 아키텍처

이 프로젝트는 컴포넌트 기반의 **MVC (Model-View-Controller)** 패턴을 따릅니다:

-   **Core (Model)**: 계산, 연산, 파싱을 담당하는 순수 로직.
    -   `Calculator`: 메인 진입점.
    -   `ExpressionParser`: 중위 표기법을 RPN(역폴란드 표기법)으로 토큰화 및 파싱.
    -   `Operation`: 모든 수학 연산의 기본이 되는 추상 클래스.
-   **UI (View/Controller)**: DOM 상호작용 및 사용자 이벤트 처리.
    -   `UIController`: 전체적인 상호작용 조율.
    -   `DisplayManager`: 화면 렌더링 담당.
    -   `ThemeManager`, `HistoryController`, `SettingsController`: 각 하위 기능 관리.

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 LICENSE 파일을 참조하세요.
