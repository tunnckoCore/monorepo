'use strict';

module.exports = {
  projects: ['./config/jest-check.config.js', './config/jest-dev.config.js'],
  moduleNameMapper: {
    '@tunnckocore/(.+)$': '<rootDir>@tunnckocore/$1/src',
  },
  // displayName: 'test',
  // testEnvironment: 'node',
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mjs'],
  // roots: ['<rootDir>packages', '<rootDir>@tunnckocore'],
  // testMatch: ['**/test/**/*'],
  // // testMatch: ['**/__tests__/*.+(ts|tsx|js)', '**/*.test.+(ts|tsx|js)'],
  // transform: {
  //   '^.+\\.(ts|tsx|js|jsx|mjs)$': 'babel-jest',
  // },
};
