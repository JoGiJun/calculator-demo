# Tech Stack Document
## Engineering Calculator Web App

**문서 버전**: 1.0  
**작성일**: 2025-12-23  
**프로젝트**: 공학용 전자계산기 웹앱

---

## 1. 기술 스택 개요

### 1.1 아키텍처 패턴
- **Single Page Application (SPA)**: 단일 페이지 애플리케이션
- **Component-Based Architecture**: 재사용 가능한 컴포넌트 기반 구조
- **MVC Pattern**: Model-View-Controller 패턴 적용
  - **Model**: 계산 로직 및 데이터 관리
  - **View**: UI 렌더링
  - **Controller**: 사용자 입력 처리 및 이벤트 핸들링

### 1.2 개발 철학
- **Progressive Enhancement**: 기본 기능 우선, 점진적 향상
- **Mobile-First**: 모바일 우선 반응형 디자인
- **Accessibility-First**: 접근성을 최우선으로 고려
- **Performance-Oriented**: 성능 최적화 중심

---

## 2. 프론트엔드 기술 스택

### 2.1 코어 기술

#### 2.1.1 HTML5
```html
<!DOCTYPE html>
<html lang="ko">
```

**사용 이유**:
- 시맨틱 마크업으로 접근성 향상
- 최신 웹 표준 준수
- SEO 최적화

**주요 기능**:
- Semantic Elements: `<main>`, `<section>`, `<button>`, `<input>`
- ARIA Attributes: `aria-label`, `role`, `aria-live`
- Meta Tags: viewport, description, Open Graph

#### 2.1.2 CSS3 + Tailwind CSS
```javascript
// Tailwind CSS v3.x (CDN)
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
```

**Tailwind CSS 선택 이유**:
- ✅ 빠른 프로토타이핑 및 개발 속도
- ✅ 일관된 디자인 시스템 구축
- ✅ 반응형 디자인 간편화
- ✅ 다크모드 지원 (`class` strategy)
- ✅ 작은 번들 크기 (프로덕션 빌드 시 PurgeCSS)

**커스텀 Tailwind 설정**:
```javascript
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#135bec",
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
        "surface-dark": "#1e293b",
        "surface-darker": "#111827",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px"
      },
    },
  },
}
```

**Custom CSS**:
```css
/* 스크롤바 숨김 */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { 
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

#### 2.1.3 JavaScript (ES6+)
```javascript
// Vanilla JavaScript - No Framework
```

**선택 이유**:
- ✅ 프레임워크 오버헤드 없음 (작은 번들 크기)
- ✅ 빠른 초기 로딩 속도
- ✅ 직접적인 DOM 제어
- ✅ 학습 곡선 낮음
- ✅ 계산기 앱의 단순한 상태 관리에 적합

**사용할 ES6+ 기능**:
- `const`, `let`: 블록 스코프 변수
- Arrow Functions: `() => {}`
- Template Literals: `` `${expression}` ``
- Destructuring: `const { a, b } = obj`
- Modules: `import`, `export` (향후 빌드 도구 도입 시)
- Classes: 컴포넌트 구조화
- Async/Await: 비동기 처리 (필요 시)

---

### 2.2 외부 라이브러리 및 리소스

#### 2.2.1 폰트
```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet"/>
```

**Space Grotesk**:
- 용도: Display 폰트 (제목, 버튼, 숫자)
- 특징: 모던하고 기하학적인 디자인
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)

**Noto Sans**:
- 용도: Body 폰트 (본문, 설명)
- 특징: 한글 지원 우수, 가독성 높음
- Weights: 400 (Regular), 500 (Medium), 700 (Bold)

#### 2.2.2 아이콘
```html
<!-- Material Symbols Outlined -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
```

**사용 아이콘**:
- `history`: 계산 기록
- `settings`: 설정
- `backspace`: 백스페이스

**선택 이유**:
- Google Material Design 표준
- 다양한 아이콘 제공
- 웹폰트 방식으로 확장성 우수

#### 2.2.3 계산 엔진

**Option 1: Math.js (추천)**
```javascript
// CDN
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/12.2.1/math.min.js"></script>

// 사용 예시
const result = math.evaluate('sin(30 deg) + log(100)');
```

**장점**:
- ✅ 정확한 부동소수점 계산
- ✅ 수식 파싱 및 평가 내장
- ✅ 단위 변환 지원 (deg, rad)
- ✅ 복잡한 수학 함수 지원
- ✅ 에러 핸들링 우수

**단점**:
- ❌ 번들 크기 증가 (~500KB)

**Option 2: Vanilla JavaScript Math**
```javascript
// 네이티브 Math 객체 사용
const result = Math.sin(30 * Math.PI / 180) + Math.log10(100);
```

**장점**:
- ✅ 추가 라이브러리 불필요
- ✅ 작은 번들 크기
- ✅ 빠른 성능

**단점**:
- ❌ 수식 파싱 직접 구현 필요
- ❌ 복잡한 수식 처리 어려움

**최종 선택**: **Math.js** (정확성과 개발 속도 우선)

---

## 3. 상태 관리

### 3.1 상태 관리 전략

**로컬 상태 관리 (Vanilla JavaScript)**:
```javascript
class CalculatorState {
  constructor() {
    this.currentExpression = '';
    this.result = '0';
    this.angleMode = 'DEG'; // 'DEG' or 'RAD'
    this.history = [];
    this.theme = 'dark'; // 'light' or 'dark'
  }
  
  // State mutation methods
  updateExpression(value) { /* ... */ }
  calculate() { /* ... */ }
  clear() { /* ... */ }
  toggleAngleMode() { /* ... */ }
}

const state = new CalculatorState();
```

**선택 이유**:
- 단순한 앱 구조에 Redux/MobX 불필요
- 클래스 기반 상태 관리로 충분
- 메모리 효율적

### 3.2 영구 저장소 (LocalStorage)

```javascript
class StorageManager {
  static KEYS = {
    HISTORY: 'calc_history',
    THEME: 'calc_theme',
    ANGLE_MODE: 'calc_angle_mode',
    SETTINGS: 'calc_settings'
  };
  
  static save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  static load(key, defaultValue = null) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  }
  
  static clear(key) {
    localStorage.removeItem(key);
  }
}
```

**저장 데이터**:
- **계산 기록**: 최대 100개 (FIFO)
- **사용자 설정**: 테마, 각도 모드, 소수점 자릿수
- **데이터 크기 제한**: < 1MB

---

## 4. 프로젝트 구조

### 4.1 파일 구조
```
calculator-demo/
├── index.html              # 메인 HTML 파일
├── css/
│   ├── tailwind.config.js  # Tailwind 설정 (인라인 또는 별도 파일)
│   └── custom.css          # 커스텀 CSS
├── js/
│   ├── main.js             # 앱 진입점
│   ├── calculator.js       # 계산 로직
│   ├── ui.js               # UI 렌더링 및 이벤트 핸들링
│   ├── storage.js          # LocalStorage 관리
│   └── utils.js            # 유틸리티 함수
├── assets/
│   ├── icons/              # 커스텀 아이콘 (필요 시)
│   └── images/             # 이미지 리소스
├── docs/
│   ├── PRD.md              # Product Requirements Document
│   ├── TECH_STACK.md       # 이 문서
│   └── API.md              # API 문서 (내부 함수)
├── tests/
│   ├── calculator.test.js  # 계산 로직 테스트
│   └── ui.test.js          # UI 테스트
├── .gitignore
├── README.md
└── package.json            # (향후 빌드 도구 도입 시)
```

### 4.2 모듈 구조

#### calculator.js
```javascript
export class Calculator {
  constructor(angleMode = 'DEG') {
    this.angleMode = angleMode;
    this.expression = '';
  }
  
  // 수식 평가
  evaluate(expression) { /* ... */ }
  
  // 각도 변환
  convertAngle(value) { /* ... */ }
  
  // 에러 핸들링
  handleError(error) { /* ... */ }
}
```

#### ui.js
```javascript
export class UI {
  constructor(calculator) {
    this.calculator = calculator;
    this.initElements();
    this.attachEventListeners();
  }
  
  // DOM 요소 초기화
  initElements() { /* ... */ }
  
  // 이벤트 리스너 연결
  attachEventListeners() { /* ... */ }
  
  // 디스플레이 업데이트
  updateDisplay(expression, result) { /* ... */ }
  
  // 테마 전환
  toggleTheme() { /* ... */ }
}
```

#### storage.js
```javascript
export class StorageManager {
  static save(key, value) { /* ... */ }
  static load(key, defaultValue) { /* ... */ }
  static saveHistory(item) { /* ... */ }
  static loadHistory() { /* ... */ }
}
```

---

## 5. 개발 도구 및 환경

### 5.1 개발 환경

#### 코드 에디터
- **VS Code** (추천)
  - Extensions:
    - Tailwind CSS IntelliSense
    - ESLint
    - Prettier
    - Live Server

#### 브라우저 개발 도구
- **Chrome DevTools**
  - Elements: DOM 검사
  - Console: 디버깅
  - Network: 성능 분석
  - Lighthouse: 성능/접근성 감사

### 5.2 빌드 도구 (선택 사항)

**Phase 1 (MVP)**: 빌드 도구 없이 개발
- 직접 HTML 파일 열기
- Live Server로 로컬 서버 실행

**Phase 2 (최적화)**: Vite 도입
```bash
npm create vite@latest calculator-app -- --template vanilla
```

**Vite 선택 이유**:
- ✅ 빠른 HMR (Hot Module Replacement)
- ✅ 최적화된 프로덕션 빌드
- ✅ ES Modules 네이티브 지원
- ✅ 설정 간단

**package.json** (Vite 도입 시):
```json
{
  "name": "engineering-calculator",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  },
  "dependencies": {
    "mathjs": "^12.2.1"
  }
}
```

### 5.3 코드 품질 도구

#### ESLint
```json
// .eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off"
  }
}
```

#### Prettier
```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

---

## 6. 테스트 전략

### 6.1 테스트 프레임워크

**Jest** (JavaScript 테스트)
```bash
npm install --save-dev jest
```

**테스트 구조**:
```javascript
// tests/calculator.test.js
import { Calculator } from '../js/calculator.js';

describe('Calculator', () => {
  let calc;
  
  beforeEach(() => {
    calc = new Calculator('DEG');
  });
  
  test('should calculate basic arithmetic', () => {
    expect(calc.evaluate('2 + 2')).toBe(4);
  });
  
  test('should calculate sin(30) in DEG mode', () => {
    expect(calc.evaluate('sin(30)')).toBeCloseTo(0.5);
  });
});
```

### 6.2 테스트 유형

#### 단위 테스트 (Unit Tests)
- 계산 함수 테스트
- 각도 변환 테스트
- 에러 핸들링 테스트

#### 통합 테스트 (Integration Tests)
- UI와 계산 로직 통합
- LocalStorage 저장/로드

#### E2E 테스트 (End-to-End)
- **Playwright** 또는 **Cypress**
```javascript
// e2e/calculator.spec.js
test('should perform calculation', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.click('button:has-text("7")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("=")');
  await expect(page.locator('.result')).toHaveText('10');
});
```

---

## 7. 성능 최적화

### 7.1 최적화 전략

#### 번들 크기 최적화
- **Tailwind CSS PurgeCSS**: 미사용 CSS 제거
- **Tree Shaking**: 미사용 JavaScript 코드 제거
- **Code Splitting**: 필요 시 동적 import

#### 로딩 성능
- **CDN 사용**: Tailwind, Math.js
- **Font Display Swap**: `&display=swap`
- **Lazy Loading**: 이미지, 아이콘

#### 런타임 성능
- **Debounce**: 입력 이벤트 최적화
- **Virtual Scrolling**: 긴 계산 기록 (필요 시)
- **RequestAnimationFrame**: 애니메이션 최적화

### 7.2 성능 모니터링

**Lighthouse CI**:
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://your-app.vercel.app
          uploadArtifacts: true
```

**목표 점수**:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

---

## 8. 배포 및 호스팅

### 8.1 호스팅 플랫폼

**GitHub Pages** (선택)
```bash
# GitHub Pages 설정
# Repository Settings > Pages > Source: GitHub Actions
```

**장점**:
- ✅ 완전 무료 호스팅
- ✅ 자동 HTTPS (*.github.io)
- ✅ GitHub 통합 (자동 배포)
- ✅ 커스텀 도메인 지원
- ✅ 빌드 프로세스 완전 제어

**설정 방법**:
1. Repository > Settings > Pages
2. Source: **GitHub Actions** 선택
3. GitHub Actions workflow 파일 생성 (아래 참조)

**대안**:
- **Vercel**: 더 빠른 CDN, 프리뷰 배포
- **Netlify**: 유사한 기능
- **Cloudflare Pages**: 빠른 CDN

### 8.2 CI/CD 파이프라인

**GitHub Actions for GitHub Pages**:
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**MVP Phase (빌드 도구 없이)**:
```yaml
# .github/workflows/deploy-simple.yml
name: Deploy to GitHub Pages (Simple)

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

---

## 9. 보안 고려사항

### 9.1 보안 조치

#### Content Security Policy (CSP)
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com 'unsafe-inline'; 
               style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; 
               font-src 'self' https://fonts.gstatic.com;">
```

#### Input Sanitization
```javascript
function sanitizeInput(input) {
  // 허용된 문자만 통과
  const allowedChars = /^[0-9+\-*/().sincotanlgπ√^%\s]+$/;
  return allowedChars.test(input) ? input : '';
}
```

#### XSS 방지
```javascript
// textContent 사용 (innerHTML 대신)
displayElement.textContent = userInput;
```

### 9.2 데이터 프라이버시
- 모든 데이터 로컬 저장 (서버 전송 없음)
- 개인정보 수집 없음
- 쿠키 사용 없음

---

## 10. 접근성 (A11y)

### 10.1 WCAG 2.1 준수

#### 키보드 네비게이션
```javascript
// 키보드 이벤트 핸들링
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    handleNumberInput(e.key);
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Escape') {
    clear();
  }
});
```

#### ARIA 레이블
```html
<button aria-label="7을 입력합니다">7</button>
<div role="status" aria-live="polite" aria-atomic="true">
  결과: 5.65
</div>
```

#### 색상 대비
- 텍스트/배경 대비율: 최소 4.5:1 (AA 기준)
- Primary 색상 `#135bec`: 충분한 대비 확보

---

## 11. 브라우저 호환성

### 11.1 지원 브라우저
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- iOS Safari 14+ ✅
- Chrome Mobile 90+ ✅

### 11.2 Polyfills (필요 시)
```javascript
// core-js (ES6+ 기능 폴리필)
import 'core-js/stable';
```

---

## 12. 모니터링 및 분석

### 12.1 에러 트래킹

**Sentry** (선택 사항)
```javascript
Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

### 12.2 사용자 분석

**Google Analytics 4** (선택 사항)
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

**프라이버시 우선**: 사용자 동의 없이 분석 도구 사용 금지

---

## 13. 향후 기술 로드맵

### Phase 1 (MVP) - 현재
- ✅ Vanilla JavaScript
- ✅ Tailwind CSS (CDN)
- ✅ Math.js

### Phase 2 (최적화)
- 🔄 Vite 빌드 도구
- 🔄 PostCSS + Tailwind (로컬)
- 🔄 Jest 테스트

### Phase 3 (확장)
- 📅 TypeScript 마이그레이션
- 📅 Web Components
- 📅 Service Worker (PWA)

### Phase 4 (고급)
- 📅 WebAssembly (고성능 계산)
- 📅 React/Vue (복잡한 UI)
- 📅 GraphQL (서버 연동 시)

---

## 14. 참고 자료

### 14.1 공식 문서
- [MDN Web Docs](https://developer.mozilla.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Math.js Docs](https://mathjs.org/docs/)
- [Vite Docs](https://vitejs.dev/)

### 14.2 커뮤니티
- [Stack Overflow](https://stackoverflow.com/)
- [GitHub Discussions](https://github.com/)
- [Dev.to](https://dev.to/)

### 14.3 도구
- [Can I Use](https://caniuse.com/) - 브라우저 호환성
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - 성능 감사
- [WebPageTest](https://www.webpagetest.org/) - 성능 테스트

---

**문서 관리**:
- 최종 업데이트: 2025-12-23
- 다음 리뷰: 개발 Phase 변경 시
- 담당자: Engineering Team
