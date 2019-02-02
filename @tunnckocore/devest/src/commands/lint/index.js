'use strict';

const { createCommandConfig } = require('../../support');

module.exports = createCommandConfig(() => ({
  displayName: 'lint',

  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/src/**/*'],
  testPathIgnorePatterns: ['.+\\.d\\.ts$'],

  runner: 'jest-runner-eslint',
  watchPlugins: ['jest-runner-eslint/watch-fix'],
}));
