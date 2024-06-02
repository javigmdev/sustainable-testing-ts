/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {}],
  },
  verbose: true,
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageThreshold: {
    'global': {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50,
    },
    './src/core/01-stats/stats.ts': {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
