'use strict';

module.exports = {
  rootDir: __dirname,
  displayName: 'lint',
  runner: 'jest-runner-eslint',
  testEnvironment: 'node',
  testMatch: ['**/src/**/*'],
  testPathIgnorePatterns: ['.+\\.d\\.ts$'],
  moduleNameMapper: {
    '^packages/(.+)': '<rootDir>/packages/$1/src',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'json'],
};
