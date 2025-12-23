# Development Guide
## Engineering Calculator Web App

**문서 버전**: 1.0  
**작성일**: 2025-12-23

---

## 📋 프로젝트 개발 원칙

이 프로젝트는 다음 두 가지 핵심 원칙을 따릅니다:

### 1. 🧪 TDD (Test-Driven Development)

**UI를 제외한 모든 코어 로직은 TDD로 구현합니다.**

#### TDD 사이클 (Red-Green-Refactor)

```
1. ❌ RED: 실패하는 테스트 작성
   ↓
2. ✅ GREEN: 테스트를 통과하는 최소한의 코드 작성
   ↓
3. ♻️ REFACTOR: 코드 개선 및 리팩토링
   ↓
   (반복)
```

#### TDD 적용 범위

**✅ TDD 적용 (자동화 테스트 필수)**:
- `calculator.js` - 계산 로직
- `expression-parser.js` - 수식 파싱
- `angle-converter.js` - 각도 변환
- `storage.js` - 데이터 저장/로드
- `validator.js` - 입력 검증
- `formatter.js` - 결과 포맷팅

**🔍 수동 테스트 (자동화 테스트 제외)**:
- `ui.js` - UI 렌더링 및 이벤트 핸들링
- `main.js` - 앱 초기화
- DOM 조작 관련 코드
- 브라우저 인터랙션
- 시각적 디자인 검증


#### TDD 워크플로우 예시

```javascript
// 1. RED: 테스트 먼저 작성
describe('Calculator', () => {
  test('should add two numbers', () => {
    const calc = new Calculator();
    expect(calc.add(2, 3)).toBe(5);
  });
});

// 2. GREEN: 최소한의 구현
class Calculator {
  add(a, b) {
    return a + b;
  }
}

// 3. REFACTOR: 개선 (필요 시)
class Calculator {
  add(a, b) {
    this.validateNumbers(a, b);
    return a + b;
  }
  
  validateNumbers(...nums) {
    nums.forEach(n => {
      if (typeof n !== 'number') {
        throw new TypeError('Arguments must be numbers');
      }
    });
  }
}
```

---

### 2. 🏛️ SOLID 원칙

**모든 코드는 SOLID 원칙을 따라 구현합니다.**

#### S - Single Responsibility Principle (단일 책임 원칙)

> 클래스는 하나의 책임만 가져야 한다.

**❌ 나쁜 예**:
```javascript
class Calculator {
  calculate(expression) { /* ... */ }
  saveToHistory(result) { /* ... */ }
  updateUI(result) { /* ... */ }
  validateInput(input) { /* ... */ }
}
```

**✅ 좋은 예**:
```javascript
class Calculator {
  calculate(expression) { /* ... */ }
}

class HistoryManager {
  save(item) { /* ... */ }
  load() { /* ... */ }
}

class UIRenderer {
  updateDisplay(result) { /* ... */ }
}

class InputValidator {
  validate(input) { /* ... */ }
}
```

#### O - Open/Closed Principle (개방-폐쇄 원칙)

> 확장에는 열려있고, 수정에는 닫혀있어야 한다.

**✅ 좋은 예**:
```javascript
// 기본 연산 인터페이스
class Operation {
  execute(a, b) {
    throw new Error('Must implement execute method');
  }
}

// 확장 가능한 구조
class Addition extends Operation {
  execute(a, b) { return a + b; }
}

class Multiplication extends Operation {
  execute(a, b) { return a * b; }
}

// 새로운 연산 추가 시 기존 코드 수정 불필요
class Power extends Operation {
  execute(a, b) { return Math.pow(a, b); }
}

class Calculator {
  constructor() {
    this.operations = new Map();
  }
  
  registerOperation(symbol, operation) {
    this.operations.set(symbol, operation);
  }
  
  execute(symbol, a, b) {
    const operation = this.operations.get(symbol);
    if (!operation) throw new Error(`Unknown operation: ${symbol}`);
    return operation.execute(a, b);
  }
}
```

#### L - Liskov Substitution Principle (리스코프 치환 원칙)

> 하위 타입은 상위 타입을 대체할 수 있어야 한다.

**✅ 좋은 예**:
```javascript
class AngleConverter {
  convert(value) {
    throw new Error('Must implement convert method');
  }
}

class DegreeToRadian extends AngleConverter {
  convert(degrees) {
    return degrees * (Math.PI / 180);
  }
}

class RadianToDegree extends AngleConverter {
  convert(radians) {
    return radians * (180 / Math.PI);
  }
}

// 어떤 변환기든 동일하게 사용 가능
function processAngle(converter, value) {
  return converter.convert(value);
}
```

#### I - Interface Segregation Principle (인터페이스 분리 원칙)

> 클라이언트는 사용하지 않는 인터페이스에 의존하지 않아야 한다.

**❌ 나쁜 예**:
```javascript
class Storage {
  save(key, value) { /* ... */ }
  load(key) { /* ... */ }
  delete(key) { /* ... */ }
  clear() { /* ... */ }
  export() { /* ... */ }
  import(data) { /* ... */ }
}
```

**✅ 좋은 예**:
```javascript
// 읽기 전용 인터페이스
class ReadableStorage {
  load(key) { /* ... */ }
}

// 쓰기 전용 인터페이스
class WritableStorage {
  save(key, value) { /* ... */ }
}

// 전체 기능
class FullStorage extends ReadableStorage {
  save(key, value) { /* ... */ }
  delete(key) { /* ... */ }
  clear() { /* ... */ }
}

// 클라이언트는 필요한 인터페이스만 사용
class HistoryViewer {
  constructor(storage) {
    this.storage = storage; // ReadableStorage만 필요
  }
  
  getHistory() {
    return this.storage.load('history');
  }
}
```

#### D - Dependency Inversion Principle (의존성 역전 원칙)

> 고수준 모듈은 저수준 모듈에 의존하지 않아야 한다. 둘 다 추상화에 의존해야 한다.

**❌ 나쁜 예**:
```javascript
class Calculator {
  constructor() {
    this.storage = new LocalStorage(); // 구체적인 구현에 의존
  }
  
  saveResult(result) {
    this.storage.save('result', result);
  }
}
```

**✅ 좋은 예**:
```javascript
// 추상화 (인터페이스)
class StorageInterface {
  save(key, value) {
    throw new Error('Must implement save method');
  }
  load(key) {
    throw new Error('Must implement load method');
  }
}

// 구체적인 구현들
class LocalStorage extends StorageInterface {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  load(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

class SessionStorage extends StorageInterface {
  save(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  load(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }
}

// 의존성 주입
class Calculator {
  constructor(storage) {
    this.storage = storage; // 추상화에 의존
  }
  
  saveResult(result) {
    this.storage.save('result', result);
  }
}

// 사용
const calc = new Calculator(new LocalStorage());
// 또는
const calc = new Calculator(new SessionStorage());
```

---

## 🧪 테스트 전략

### 테스트 구조

```
tests/
├── unit/                    # 단위 테스트
│   ├── calculator.test.js
│   ├── expression-parser.test.js
│   ├── angle-converter.test.js
│   ├── storage.test.js
│   ├── validator.test.js
│   └── formatter.test.js
├── integration/             # 통합 테스트
│   ├── calculator-flow.test.js
│   └── storage-integration.test.js
└── e2e/                     # E2E 테스트 (선택적)
    └── calculator.spec.js
```

### 테스트 커버리지 목표

- **코어 로직**: 100% 커버리지
- **전체 프로젝트**: 80% 이상

### 테스트 작성 가이드

#### 1. 테스트 네이밍

```javascript
// 패턴: describe('클래스/함수명', () => { test('should 동작설명', () => {}) })

describe('Calculator', () => {
  describe('add', () => {
    test('should add two positive numbers', () => {});
    test('should add negative numbers', () => {});
    test('should handle decimal numbers', () => {});
  });
  
  describe('divide', () => {
    test('should divide two numbers',### 6.2 테스트 유형

#### 단위 테스트 (Unit Tests) - 코어 로직만
- 계산 함수 테스트
- 각도 변환 테스트
- 에러 핸들링 테스트
- 수식 파싱 테스트
- 저장소 로직 테스트

#### 통합 테스트 (Integration Tests) - 코어 로직만
- Calculator와 Parser 통합
- Calculator와 Storage 통합
- 전체 계산 플로우 테스트

#### 수동 테스트 (Manual Tests) - UI 레이어
- 브라우저에서 직접 테스트
- 버튼 클릭 동작 확인
- 키보드 입력 확인
- 반응형 디자인 확인
- 다크/라이트 모드 전환 확인
- 애니메이션 동작 확인
- 크로스 브라우저 테스트

> [!NOTE]
> **UI 테스트는 자동화하지 않습니다**
> - E2E 테스트 도구(Playwright, Cypress) 사용 안 함
> - UI 컴포넌트 테스트 없음
> - 모든 UI 기능은 수동으로 검증


#### 3. 테스트 격리

```javascript
describe('HistoryManager', () => {
  let historyManager;
  
  beforeEach(() => {
    // 각 테스트마다 새로운 인스턴스 생성
    historyManager = new HistoryManager();
    localStorage.clear();
  });
  
  afterEach(() => {
    // 테스트 후 정리
    localStorage.clear();
  });
  
  test('should save history item', () => {
    historyManager.save({ expression: '2+2', result: 4 });
    expect(historyManager.getAll()).toHaveLength(1);
  });
});
```

#### 4. 경계값 테스트

```javascript
describe('InputValidator', () => {
  const validator = new InputValidator();
  
  test('should accept valid expressions', () => {
    expect(validator.validate('2+2')).toBe(true);
    expect(validator.validate('sin(30)')).toBe(true);
  });
  
  test('should reject invalid expressions', () => {
    expect(validator.validate('')).toBe(false);
    expect(validator.validate('2++2')).toBe(false);
    expect(validator.validate('abc')).toBe(false);
  });
  
  test('should handle edge cases', () => {
    expect(validator.validate('0')).toBe(true);
    expect(validator.validate('0.0')).toBe(true);
    expect(validator.validate('-1')).toBe(true);
  });
});
```

#### 5. Mock 사용

```javascript
describe('Calculator with Storage', () => {
  test('should save result to storage', () => {
    // Mock storage
    const mockStorage = {
      save: jest.fn(),
      load: jest.fn()
    };
    
    const calc = new Calculator(mockStorage);
    calc.calculate('2+2');
    
    // Mock 호출 검증
    expect(mockStorage.save).toHaveBeenCalledWith(
      'lastResult',
      expect.objectContaining({ result: 4 })
    );
  });
});
```

---

## 📁 프로젝트 구조 (SOLID 적용)

```
js/
├── core/                           # 코어 로직 (TDD 적용)
│   ├── calculator/
│   │   ├── Calculator.js           # 메인 계산기 클래스
│   │   ├── Operation.js            # 연산 인터페이스
│   │   ├── operations/
│   │   │   ├── BasicOperation.js   # 기본 연산 (+, -, *, /)
│   │   │   ├── ScientificOperation.js  # 과학 함수
│   │   │   └── index.js
│   │   └── index.js
│   ├── parser/
│   │   ├── ExpressionParser.js     # 수식 파싱
│   │   ├── Token.js                # 토큰 클래스
│   │   └── index.js
│   ├── converter/
│   │   ├── AngleConverter.js       # 각도 변환 인터페이스
│   │   ├── DegreeToRadian.js
│   │   ├── RadianToDegree.js
│   │   └── index.js
│   ├── storage/
│   │   ├── StorageInterface.js     # 저장소 인터페이스
│   │   ├── LocalStorageAdapter.js  # LocalStorage 구현
│   │   ├── HistoryManager.js       # 기록 관리
│   │   └── index.js
│   ├── validator/
│   │   ├── InputValidator.js       # 입력 검증
│   │   └── index.js
│   └── formatter/
│       ├── ResultFormatter.js      # 결과 포맷팅
│       └── index.js
├── ui/                             # UI 레이어 (TDD 제외)
│   ├── UIController.js             # UI 컨트롤러
│   ├── DisplayManager.js           # 디스플레이 관리
│   ├── EventHandler.js             # 이벤트 핸들러
│   └── ThemeManager.js             # 테마 관리
├── config/
│   └── constants.js                # 상수 정의
└── main.js                         # 앱 진입점
```

---

## 🔄 개발 워크플로우

### 1. 새로운 기능 개발 시

```bash
# 1. 브랜치 생성
git checkout -b feature/calculator-add-operation

# 2. 테스트 작성 (RED)
# tests/unit/calculator.test.js 작성

# 3. 테스트 실행 (실패 확인)
npm test

# 4. 구현 (GREEN)
# js/core/calculator/Calculator.js 구현

# 5. 테스트 실행 (성공 확인)
npm test

# 6. 리팩토링 (REFACTOR)
# 코드 개선

# 7. 테스트 재실행
npm test

# 8. 커밋
git add .
git commit -m "feat: Add addition operation with tests"

# 9. 푸시 및 PR
git push origin feature/calculator-add-operation
```

### 2. 커밋 메시지 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
test: 테스트 추가/수정
refactor: 리팩토링
docs: 문서 수정
style: 코드 포맷팅
chore: 빌드/설정 변경
```

**예시**:
```
feat: Implement basic arithmetic operations
test: Add unit tests for Calculator class
refactor: Extract operation logic to separate classes
fix: Handle division by zero error
```

---

## ✅ 코드 리뷰 체크리스트

### TDD 준수
- [ ] 테스트가 먼저 작성되었는가?
- [ ] 모든 테스트가 통과하는가?
- [ ] 테스트 커버리지가 충분한가? (80% 이상)
- [ ] 경계값 테스트가 포함되어 있는가?

### SOLID 원칙
- [ ] 각 클래스가 단일 책임을 가지는가? (SRP)
- [ ] 확장 가능한 구조인가? (OCP)
- [ ] 상속 관계가 올바른가? (LSP)
- [ ] 인터페이스가 적절히 분리되어 있는가? (ISP)
- [ ] 의존성 주입을 사용하는가? (DIP)

### 코드 품질
- [ ] 변수/함수명이 명확한가?
- [ ] 주석이 필요한 곳에 작성되었는가?
- [ ] 매직 넘버가 상수로 정의되었는가?
- [ ] 에러 핸들링이 적절한가?

---

## 🛠️ 개발 도구 설정

### Jest 설정

```javascript
// jest.config.js
export default {
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'js/core/**/*.js',
    '!js/core/**/index.js',
    '!js/ui/**/*.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    './js/core/': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  testMatch: [
    '**/tests/**/*.test.js'
  ]
};
```

### ESLint 규칙

```javascript
// .eslintrc.json
{
  "rules": {
    "max-lines-per-function": ["warn", 50],
    "max-params": ["warn", 3],
    "complexity": ["warn", 10],
    "no-magic-numbers": ["warn", { "ignore": [0, 1, -1] }]
  }
}
```

---

## 📚 참고 자료

### TDD
- [Test Driven Development by Kent Beck](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

### SOLID
- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

### JavaScript Best Practices
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

---

**문서 관리**:
- 최종 업데이트: 2025-12-23
- 다음 리뷰: 개발 시작 전
- 담당자: Development Team
