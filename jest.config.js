'use strict';

module.exports = {
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