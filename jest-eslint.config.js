'use strict';

const pkg = require('./package.json');
const { exts, alias } = require('./support')(pkg);

module.exports = {
  rootDir: __dirname,

  displayName: 'lint',

  testEnvironment: 'node',
  testMatch: ['**/src/**/*'],
  testPathIgnorePatterns: ['.+\\.d\\.ts$'],

  moduleFileExtensions: exts.concat('json'),
  moduleNameMapper: alias,

  runner: 'jest-runner-eslint',
  watchPlugins: ['jest-runner-eslint/watch-fix'],
};
