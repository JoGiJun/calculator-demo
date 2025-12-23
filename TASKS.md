# Development Tasks
## Engineering Calculator Web App

**프로젝트 상태**: 초기 설정 완료  
**개발 원칙**: TDD (Test-Driven Development) + SOLID Principles  
**마지막 업데이트**: 2025-12-23

---

## 📋 작업 진행 상황

- [x] 프로젝트 초기 설정
- [ ] Phase 1: 코어 로직 개발 (TDD)
- [ ] Phase 2: UI 구현
- [ ] Phase 3: 통합 및 고급 기능
- [ ] Phase 4: 테스트 및 배포

---

## ✅ 완료된 작업

### 프로젝트 초기 설정
- [x] PRD 작성
- [x] 기술 스택 문서 작성
- [x] 개발 가이드 작성 (TDD & SOLID)
- [x] Jest 테스트 환경 설정
- [x] ESLint, Prettier 설정
- [x] GitHub Actions 워크플로우 설정
- [x] 프로젝트 구조 정의
- [x] 디자인 파일 정리
- [x] 초기 커밋 완료

---

## 🔄 진행 중인 작업

없음

---

## 📝 예정된 작업

## Phase 1: 코어 로직 개발 (TDD) - 예상 2주

### 1.1 개발 환경 설정
- [ ] `npm install` 실행하여 의존성 설치
- [ ] VS Code 확장 프로그램 설치 확인
  - [ ] ESLint
  - [ ] Prettier
  - [ ] Jest Runner
  - [ ] Tailwind CSS IntelliSense
- [ ] Git 설정 확인 (user.name, user.email)
- [ ] 테스트 실행 확인 (`npm test`)

### 1.2 기본 연산 클래스 구현 (TDD)

#### 1.2.1 Operation 인터페이스 설계
- [ ] `tests/unit/operations/Operation.test.js` 작성
  - [ ] Operation 인터페이스 스펙 정의
  - [ ] execute 메서드 시그니처 테스트
- [ ] `js/core/calculator/Operation.js` 구현
  - [ ] 추상 클래스 구현
  - [ ] execute 메서드 정의
- [ ] 테스트 통과 확인
- [ ] 커밋: `feat: Add Operation interface`

#### 1.2.2 BasicOperation 구현 (덧셈, 뺄셈, 곱셈, 나눗셈)
- [ ] `tests/unit/operations/BasicOperation.test.js` 작성
  - [ ] Addition 클래스 테스트
    - [ ] 양수 덧셈
    - [ ] 음수 덧셈
    - [ ] 소수점 덧셈
    - [ ] 0과의 덧셈
  - [ ] Subtraction 클래스 테스트
  - [ ] Multiplication 클래스 테스트
  - [ ] Division 클래스 테스트
    - [ ] 정상 나눗셈
    - [ ] 0으로 나누기 에러 처리
    - [ ] 소수점 나눗셈
- [ ] `js/core/calculator/operations/BasicOperation.js` 구현
  - [ ] Addition 클래스
  - [ ] Subtraction 클래스
  - [ ] Multiplication 클래스
  - [ ] Division 클래스
- [ ] 모든 테스트 통과 확인
- [ ] 코드 리팩토링 (필요 시)
- [ ] 커밋: `feat: Implement basic arithmetic operations`

#### 1.2.3 ScientificOperation 구현
- [ ] `tests/unit/operations/ScientificOperation.test.js` 작성
  - [ ] Sin 클래스 테스트 (DEG/RAD)
  - [ ] Cos 클래스 테스트
  - [ ] Tan 클래스 테스트
  - [ ] Log 클래스 테스트 (log10)
  - [ ] Ln 클래스 테스트 (자연로그)
  - [ ] Power 클래스 테스트 (거듭제곱)
  - [ ] Sqrt 클래스 테스트 (제곱근)
- [ ] `js/core/calculator/operations/ScientificOperation.js` 구현
- [ ] 테스트 통과 확인
- [ ] 커밋: `feat: Implement scientific operations`

### 1.3 각도 변환기 구현 (TDD)

#### 1.3.1 AngleConverter 인터페이스
- [ ] `tests/unit/converter/AngleConverter.test.js` 작성
- [ ] `js/core/converter/AngleConverter.js` 구현
- [ ] 커밋: `feat: Add AngleConverter interface`

#### 1.3.2 각도 변환 구현체
- [ ] `tests/unit/converter/DegreeToRadian.test.js` 작성
  - [ ] 0도 변환
  - [ ] 30도 변환
  - [ ] 90도 변환
  - [ ] 180도 변환
  - [ ] 360도 변환
  - [ ] 음수 각도 변환
- [ ] `js/core/converter/DegreeToRadian.js` 구현
- [ ] `tests/unit/converter/RadianToDegree.test.js` 작성
- [ ] `js/core/converter/RadianToDegree.js` 구현
- [ ] 테스트 통과 확인
- [ ] 커밋: `feat: Implement angle converters`

### 1.4 수식 파서 구현 (TDD)

#### 1.4.1 Token 클래스
- [ ] `tests/unit/parser/Token.test.js` 작성
  - [ ] 숫자 토큰
  - [ ] 연산자 토큰
  - [ ] 함수 토큰
  - [ ] 괄호 토큰
- [ ] `js/core/parser/Token.js` 구현
- [ ] 커밋: `feat: Add Token class`

#### 1.4.2 ExpressionParser 구현
- [ ] `tests/unit/parser/ExpressionParser.test.js` 작성
  - [ ] 단순 수식 파싱 (2+2)
  - [ ] 복합 수식 파싱 (2+3*4)
  - [ ] 괄호 포함 수식 ((2+3)*4)
  - [ ] 과학 함수 포함 (sin(30)+log(100))
  - [ ] 암묵적 곱셈 (2π, sin30)
  - [ ] 에러 케이스 (잘못된 수식)
- [ ] `js/core/parser/ExpressionParser.js` 구현
  - [ ] 토큰화 (Tokenization)
  - [ ] 중위 표기법 → 후위 표기법 변환 (Shunting Yard Algorithm)
  - [ ] 연산자 우선순위 처리
- [ ] 테스트 통과 확인
- [ ] 커밋: `feat: Implement expression parser`

### 1.5 Calculator 메인 클래스 구현 (TDD)

#### 1.5.1 Calculator 클래스 기본 구조
- [ ] `tests/unit/calculator/Calculator.test.js` 작성
  - [ ] 생성자 테스트 (의존성 주입)
  - [ ] 각도 모드 설정 테스트
  - [ ] 연산 등록 테스트
- [ ] `js/core/calculator/Calculator.js` 구현
  - [ ] 생성자 (의존성 주입)
  - [ ] 연산 레지스트리
  - [ ] 각도 모드 관리
- [ ] 커밋: `feat: Add Calculator class structure`

#### 1.5.2 Calculator 계산 기능
- [ ] `tests/unit/calculator/Calculator.test.js` 확장
  - [ ] evaluate 메서드 테스트
    - [ ] 기본 연산 (2+2=4)
    - [ ] 복합 연산 (2+3*4=14)
    - [ ] 과학 함수 (sin(30)=0.5 in DEG)
    - [ ] 각도 모드 전환 테스트
    - [ ] 에러 처리 테스트
- [ ] `js/core/calculator/Calculator.js` 구현
  - [ ] evaluate 메서드
  - [ ] 파서 통합
  - [ ] 연산 실행
  - [ ] 에러 핸들링
- [ ] 테스트 통과 확인
- [ ] 커밋: `feat: Implement Calculator evaluate method`

### 1.6 입력 검증기 구현 (TDD)

- [ ] `tests/unit/validator/InputValidator.test.js` 작성
  - [ ] 유효한 입력 테스트
  - [ ] 빈 문자열 거부
  - [ ] 잘못된 문자 거부
  - [ ] 연속된 연산자 거부
  - [ ] 괄호 매칭 검증
- [ ] `js/core/validator/InputValidator.js` 구현
- [ ] 테스트 통과 확인
- [ ] 커밋: `feat: Implement input validator`

### 1.7 결과 포맷터 구현 (TDD)

- [ ] `tests/unit/formatter/ResultFormatter.test.js` 작성
  - [ ] 정수 포맷팅
  - [ ] 소수점 포맷팅
  - [ ] 과학적 표기법 (큰 수)
  - [ ] 소수점 자릿수 제한
  - [ ] 천 단위 구분 기호 (선택적)
- [ ] `js/core/formatter/ResultFormatter.js` 구현
- [ ] 테스트 통과 확인
- [ ] 커밋: `feat: Implement result formatter`

### 1.8 저장소 구현 (TDD)

#### 1.8.1 StorageInterface
- [ ] `tests/unit/storage/StorageInterface.test.js` 작성
- [ ] `js/core/storage/StorageInterface.js` 구현
- [ ] 커밋: `feat: Add StorageInterface`

#### 1.8.2 LocalStorageAdapter
- [ ] `tests/unit/storage/LocalStorageAdapter.test.js` 작성
  - [ ] save 메서드 테스트
  - [ ] load 메서드 테스트
  - [ ] delete 메서드 테스트
  - [ ] clear 메서드 테스트
  - [ ] JSON 직렬화/역직렬화 테스트
- [ ] `js/core/storage/LocalStorageAdapter.js` 구현
- [ ] 테스트 통과 확인 (Mock localStorage 사용)
- [ ] 커밋: `feat: Implement LocalStorageAdapter`

#### 1.8.3 HistoryManager
- [ ] `tests/unit/storage/HistoryManager.test.js` 작성
  - [ ] 기록 추가 테스트
  - [ ] 기록 조회 테스트
  - [ ] 기록 삭제 테스트
  - [ ] 최대 개수 제한 테스트 (100개)
  - [ ] FIFO 동작 테스트
- [ ] `js/core/storage/HistoryManager.js` 구현
- [ ] 테스트 통과 확인
- [ ] 커밋: `feat: Implement HistoryManager`

### 1.9 통합 테스트 작성

- [ ] `tests/integration/calculator-flow.test.js` 작성
  - [ ] 전체 계산 플로우 테스트
  - [ ] 파서 → 계산기 → 포맷터 통합
  - [ ] 저장소 통합 테스트
  - [ ] 각도 변환 통합 테스트
- [ ] 모든 통합 테스트 통과 확인
- [ ] 커버리지 확인 (코어 로직 100% 목표)
- [ ] 커밋: `test: Add integration tests for core logic`

### 1.10 Phase 1 마무리

- [ ] 전체 테스트 실행 및 통과 확인
- [ ] 코드 리뷰 및 리팩토링
- [ ] ESLint 검사 (`npm run lint`)
- [ ] Prettier 포맷팅 (`npm run format`)
- [ ] 커버리지 리포트 생성 (`npm run test:coverage`)
- [ ] 문서 업데이트 (필요 시)
- [ ] 커밋: `chore: Complete Phase 1 - Core logic implementation`

---

## Phase 2: UI 구현 - 예상 1주

### 2.1 HTML 구조 구현

- [ ] `index.html` 생성
  - [ ] 기본 HTML5 구조
  - [ ] Meta 태그 (viewport, description, OG)
  - [ ] Tailwind CSS CDN 추가
  - [ ] Google Fonts 추가
  - [ ] Material Icons 추가
- [ ] 레이아웃 구조 작성
  - [ ] Top App Bar (History, Mode Indicator, Settings)
  - [ ] Display Area (Expression, Result)
  - [ ] Controls Container
    - [ ] Utility Bar (DEG/RAD, Backspace)
    - [ ] Scientific Functions Row
    - [ ] Main Keypad
- [ ] 접근성 속성 추가 (ARIA labels, roles)
- [ ] 커밋: `feat: Add HTML structure`

### 2.2 CSS 스타일링

- [ ] `css/custom.css` 생성
  - [ ] 스크롤바 숨김 스타일
  - [ ] 커스텀 애니메이션
  - [ ] 추가 유틸리티 클래스
- [ ] Tailwind 커스텀 설정
  - [ ] 색상 팔레트
  - [ ] 폰트 패밀리
  - [ ] Border radius
- [ ] 다크모드 스타일 적용
- [ ] 반응형 디자인 구현
  - [ ] 모바일 (320px~768px)
  - [ ] 태블릿 (768px~1024px)
  - [ ] 데스크톱 (1024px+)
- [ ] 커밋: `style: Add CSS styling and responsive design`

### 2.3 UI 컨트롤러 구현

#### 2.3.1 DisplayManager
- [ ] `js/ui/DisplayManager.js` 생성
  - [ ] 수식 표시 업데이트
  - [ ] 결과 표시 업데이트
  - [ ] 애니메이션 효과
  - [ ] 텍스트 오버플로우 처리
- [ ] 커밋: `feat: Implement DisplayManager`

#### 2.3.2 EventHandler
- [ ] `js/ui/EventHandler.js` 생성
  - [ ] 버튼 클릭 이벤트
  - [ ] 키보드 입력 이벤트
    - [ ] 숫자 키 (0-9)
    - [ ] 연산자 키 (+, -, *, /)
    - [ ] Enter (계산)
    - [ ] Escape (초기화)
    - [ ] Backspace (삭제)
  - [ ] 터치 이벤트 (모바일)
  - [ ] 이벤트 위임 패턴 사용
- [ ] 커밋: `feat: Implement EventHandler`

#### 2.3.3 UIController
- [ ] `js/ui/UIController.js` 생성
  - [ ] Calculator 인스턴스 통합
  - [ ] DisplayManager 통합
  - [ ] EventHandler 통합
  - [ ] 사용자 입력 처리
  - [ ] 계산 결과 표시
  - [ ] 에러 메시지 표시
- [ ] 커밋: `feat: Implement UIController`

### 2.4 테마 관리자 구현

- [ ] `js/ui/ThemeManager.js` 생성
  - [ ] 다크/라이트 모드 전환
  - [ ] 시스템 테마 감지
  - [ ] 테마 설정 저장 (LocalStorage)
  - [ ] 테마 변경 애니메이션
- [ ] Settings 버튼 기능 연결
- [ ] 커밋: `feat: Implement ThemeManager`

### 2.5 메인 앱 초기화

- [ ] `js/main.js` 생성
  - [ ] 의존성 주입 설정
  - [ ] Calculator 인스턴스 생성
  - [ ] UIController 초기화
  - [ ] ThemeManager 초기화
  - [ ] 초기 상태 로드 (LocalStorage)
- [ ] 커밋: `feat: Implement main app initialization`

### 2.6 Phase 2 마무리

- [ ] 수동 브라우저 테스트
  - [ ] Chrome - 모든 기능 동작 확인
  - [ ] Firefox - 모든 기능 동작 확인
  - [ ] Safari - 모든 기능 동작 확인
  - [ ] Edge - 모든 기능 동작 확인
  - [ ] 모바일 브라우저 - 터치 인터랙션 확인
- [ ] 반응형 디자인 수동 테스트
  - [ ] 모바일 레이아웃 확인
  - [ ] 태블릿 레이아웃 확인
  - [ ] 데스크톱 레이아웃 확인
- [ ] 접근성 수동 테스트
  - [ ] 키보드 네비게이션 확인
  - [ ] 포커스 인디케이터 확인
- [ ] 성능 확인
  - [ ] 버튼 클릭 반응 속도
  - [ ] 애니메이션 부드러움
- [ ] 커밋: `chore: Complete Phase 2 - UI implementation`


---

## Phase 3: 고급 기능 및 통합 - 예상 1주

### 3.1 계산 기록 기능

#### 3.1.1 History UI
- [ ] History 패널 HTML 추가
- [ ] History 패널 스타일링
- [ ] 열기/닫기 애니메이션
- [ ] 커밋: `feat: Add history panel UI`

#### 3.1.2 History 기능 통합
- [ ] History 버튼 이벤트 연결
- [ ] 기록 목록 렌더링
- [ ] 기록 항목 클릭 → 수식 재사용
- [ ] 기록 삭제 기능
- [ ] 기록 전체 삭제 기능
- [ ] 커밋: `feat: Implement history functionality`

### 3.2 설정 패널

#### 3.2.1 Settings UI
- [ ] Settings 패널 HTML 추가
- [ ] Settings 패널 스타일링
- [ ] 모달/사이드바 형태 구현
- [ ] 커밋: `feat: Add settings panel UI`

#### 3.2.2 Settings 기능
- [ ] 테마 설정 (다크/라이트/시스템)
- [ ] 기본 각도 모드 설정
- [ ] 소수점 자릿수 설정
- [ ] 설정 저장 및 로드
- [ ] 커밋: `feat: Implement settings functionality`

### 3.3 추가 기능

- [ ] 백스페이스 기능 구현
- [ ] AC (All Clear) 기능 구현
- [ ] +/- (부호 변경) 기능 구현
- [ ] % (백분율) 기능 구현
- [ ] 연속 계산 기능 (이전 결과 사용)
- [ ] 커밋: `feat: Implement additional calculator features`

### 3.4 에러 처리 개선

- [ ] 사용자 친화적 에러 메시지
- [ ] 에러 애니메이션
- [ ] 에러 자동 복구
- [ ] 커밋: `feat: Improve error handling`

### 3.5 Phase 3 마무리

- [ ] 전체 기능 수동 테스트
  - [ ] 모든 버튼 동작 확인
  - [ ] 계산 기록 기능 확인
  - [ ] 설정 패널 동작 확인
  - [ ] 에러 메시지 표시 확인
- [ ] 사용자 시나리오 테스트
  - [ ] 시나리오 1: 기본 계산 → 기록 저장 → 재사용
  - [ ] 시나리오 2: 과학 함수 → 각도 모드 전환 → 재계산
  - [ ] 시나리오 3: 테마 변경 → 설정 저장 → 새로고침 후 확인
- [ ] 버그 수정
- [ ] 커밋: `chore: Complete Phase 3 - Advanced features`


---

## Phase 4: 테스트 및 배포 - 예상 3일

### 4.1 수동 UI 테스트

#### 4.1.1 기능 테스트
- [ ] 기본 계산 기능
  - [ ] 숫자 입력 (0-9)
  - [ ] 사칙연산 (+, -, ×, ÷)
  - [ ] 등호(=) 계산
  - [ ] AC (초기화)
  - [ ] 백스페이스
- [ ] 과학 함수
  - [ ] sin, cos, tan
  - [ ] log, ln
  - [ ] 거듭제곱, 제곱근
  - [ ] π 상수
  - [ ] 괄호
- [ ] 각도 모드
  - [ ] DEG/RAD 전환
  - [ ] 각도 모드별 계산 결과 확인
- [ ] 계산 기록
  - [ ] 기록 저장 확인
  - [ ] 기록 조회
  - [ ] 기록 재사용
  - [ ] 기록 삭제
- [ ] 설정
  - [ ] 테마 전환 (다크/라이트)
  - [ ] 설정 저장 확인

#### 4.1.2 키보드 입력 테스트
- [ ] 숫자 키 (0-9)
- [ ] 연산자 키 (+, -, *, /)
- [ ] Enter (계산)
- [ ] Escape (초기화)
- [ ] Backspace (삭제)

#### 4.1.3 크로스 브라우저 테스트
- [ ] Chrome (최신 버전)
- [ ] Firefox (최신 버전)
- [ ] Safari (최신 버전)
- [ ] Edge (최신 버전)
- [ ] 모바일 Chrome (Android)
- [ ] 모바일 Safari (iOS)

#### 4.1.4 반응형 디자인 테스트
- [ ] 모바일 (320px, 375px, 414px)
- [ ] 태블릿 (768px, 1024px)
- [ ] 데스크톱 (1280px, 1920px)
- [ ] 가로/세로 모드 전환

#### 4.1.5 접근성 테스트
- [ ] 키보드 네비게이션
- [ ] 스크린 리더 호환성
- [ ] 색상 대비 확인
- [ ] 포커스 인디케이터 확인

### 4.2 성능 최적화


- [ ] Lighthouse 감사 실행
- [ ] 성능 점수 90+ 달성
  - [ ] 이미지 최적화
  - [ ] CSS/JS 최소화
  - [ ] 불필요한 코드 제거
- [ ] 접근성 점수 95+ 달성
- [ ] SEO 점수 90+ 달성
- [ ] 커밋: `perf: Optimize performance`

### 4.3 문서 업데이트

- [ ] README.md 업데이트
  - [ ] 스크린샷 추가
  - [ ] 사용 방법 추가
  - [ ] 라이브 데모 링크 추가
- [ ] CHANGELOG.md 생성
- [ ] 커밋: `docs: Update documentation`

### 4.4 배포 준비

- [ ] 프로덕션 빌드 테스트 (Vite 사용 시)
- [ ] GitHub Pages 배포 테스트
- [ ] 커스텀 도메인 설정 (선택적)
- [ ] 커밋: `chore: Prepare for deployment`

### 4.5 최종 배포

- [ ] GitHub에 푸시
- [ ] GitHub Pages 활성화
- [ ] 배포 확인
- [ ] 라이브 사이트 테스트
- [ ] 커밋: `chore: Deploy to GitHub Pages`

### 4.6 Phase 4 마무리

- [ ] 최종 테스트
- [ ] 버그 수정
- [ ] v1.0.0 릴리스 태그 생성
- [ ] 릴리스 노트 작성

---

## 🔮 향후 확장 계획 (Post-MVP)

### 추가 기능
- [ ] 단위 변환기
- [ ] 그래프 기능 (함수 시각화)
- [ ] 프로그래머 모드 (2진수, 16진수)
- [ ] 통계 함수 (평균, 표준편차)
- [ ] 수식 공유 기능
- [ ] 오프라인 지원 (PWA)

### 기술 개선
- [ ] TypeScript 마이그레이션
- [ ] Web Components 도입
- [ ] Service Worker 추가
- [ ] WebAssembly 계산 엔진 (고성능)

### 플랫폼 확장
- [ ] 모바일 앱 (React Native/Flutter)
- [ ] 데스크톱 앱 (Electron)
- [ ] 브라우저 확장 프로그램

---

## 📊 진행률 추적

### 전체 진행률
- **완료**: 9 / 100+ 작업 (9%)
- **진행 중**: 0
- **예정**: 91+

### Phase별 진행률
- **Phase 0 (설정)**: ✅ 100% (9/9)
- **Phase 1 (코어)**: ⏳ 0% (0/40)
- **Phase 2 (UI)**: ⏳ 0% (0/20)
- **Phase 3 (고급)**: ⏳ 0% (0/15)
- **Phase 4 (배포)**: ⏳ 0% (0/20)


---

## 📝 작업 규칙

### TDD 워크플로우
1. ❌ **RED**: 실패하는 테스트 작성
2. ✅ **GREEN**: 테스트 통과하는 최소 코드 작성
3. ♻️ **REFACTOR**: 코드 개선
4. 🔄 반복

### 커밋 규칙
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `test`: 테스트 추가/수정
- `refactor`: 리팩토링
- `style`: 코드 포맷팅
- `docs`: 문서 수정
- `chore`: 빌드/설정 변경
- `perf`: 성능 개선

### 코드 리뷰 체크리스트
- [ ] TDD 준수 (테스트 먼저 작성)
- [ ] SOLID 원칙 준수
- [ ] 테스트 커버리지 충족
- [ ] ESLint 통과
- [ ] Prettier 포맷팅 완료

---

**다음 작업**: Phase 1.1 - 개발 환경 설정
