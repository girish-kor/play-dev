/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Use ts-jest preset for TypeScript support
  preset: 'ts-jest',

  // jsdom environment for testing React components
  testEnvironment: 'jsdom',

  // Setup file to extend Jest with custom matchers and mocks
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],

  // Enable module paths for cleaner imports in tests
  modulePaths: ['<rootDir>'],

  // Mock static assets and styles
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Add mappers for images or other assets if needed
  },

  // Transform TypeScript files using ts-jest
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
  },

  // Define test file patterns
  testMatch: ['<rootDir>/tests/**/*.test.{ts,tsx}'],

  // Collect coverage from source files
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts', // Usually just exports
    '!src/**/index.ts',
    '!src/**/*.stories.tsx', // If you use Storybook
  ],

  // Coverage thresholds (optional but recommended)
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
