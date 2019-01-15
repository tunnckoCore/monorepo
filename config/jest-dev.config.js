/**
 * Testing and test coverage.
 * Uses `testMatch` to only run the test files.
 */

const path = require('path');

module.exports = {
  rootDir: path.dirname(__dirname),
  displayName: 'test',
  transform: { '^.+\\.js$': 'babel-jest' },
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // collectCoverage: true,
  // coverageThreshold: {
  //   global: {
  //     statements: 100,
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //   },
  // },
  // collectCoverageFrom: [
  //   '**/src/**/*.{ts,tsx,js,jsx}',
  //   '!**/*.{js,jsx,ts,tsx}',
  //   '!**/test/**',
  // ],
};
