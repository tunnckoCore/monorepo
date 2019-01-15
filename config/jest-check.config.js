'use strict';

/**
 * Type-checking (over the whole `src`) while developing,
 * if there is type error, it will not run
 * the tests, because we running `jest --watch --bail`
 */

const path = require('path');

module.exports = {
  rootDir: path.dirname(__dirname),
  displayName: 'tsc',
  testEnvironment: 'node',
  runner: 'jest-runner-tsc',
  moduleFileExtensions: ['ts', 'tsx'],
  roots: ['<rootDir>packages', '<rootDir>@tunnckocore'],
  testMatch: ['**/{src,test}/**/*'],
  // testMatch: ['**/__tests__/*.+(ts|tsx|js)', '**/*.test.+(ts|tsx|js)'],
  // transform: {
  //   '^.+\\.(ts|tsx|js|jsx|mjs)$': 'babel-jest',
  // },
};
