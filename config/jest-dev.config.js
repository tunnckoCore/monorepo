/**
 * Testing and test coverage.
 * Uses `testMatch` to only run the test files.
 */

const path = require('path');

module.exports = {
  rootDir: path.dirname(__dirname),
  displayName: 'test',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mjs'],
  roots: ['<rootDir>packages', '<rootDir>@tunnckocore'],
  testMatch: ['**/test/**/*'],
  // testMatch: ['**/__tests__/*.+(ts|tsx|js)', '**/*.test.+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx|mjs)$': 'babel-jest',
  },
};
