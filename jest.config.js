export default {
  // 테스트 환경 설정 (브라우저 환경 시뮬레이션)
  testEnvironment: 'jsdom',
  
  // 커버리지 리포트 디렉토리
  coverageDirectory: 'coverage',
  
  // 커버리지 수집 대상
  collectCoverageFrom: [
    'js/core/**/*.js',           // 코어 로직만 커버리지 측정
    '!js/core/**/index.js',      // index.js 제외
    '!js/ui/**/*.js',            // UI 레이어 제외
    '!js/main.js'                // 진입점 제외
  ],
  
  // 커버리지 임계값 설정
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
  
  // 테스트 파일 패턴
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],
  
  // 모듈 경로 별칭 (선택적)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/js/$1',
    '^@core/(.*)$': '<rootDir>/js/core/$1',
    '^@ui/(.*)$': '<rootDir>/js/ui/$1'
  },
  
  // 변환 설정 (ES6 모듈 지원)
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  
  // 테스트 타임아웃 (밀리초)
  testTimeout: 5000,
  
  // 상세한 출력
  verbose: true,
  
  // 커버리지 리포터
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov'
  ]
};
