/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        useESM: true,
      },
    ],
  },
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: ['src/foundation/foundation.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  // Cleaner output in watch mode
  verbose: false,
  silent: false,
  bail: false,
  coverageReporters: ['text-summary', 'lcov', 'json'],
};
