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
  runner: 'jest-runner-tsc',
  testMatch: ['**/{src,test}/**/*'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
