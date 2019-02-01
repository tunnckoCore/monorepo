'use strict';

const path = require('path');
const pkg = require('../package.json');
const { createAliases } = require('../support');

const { exts, alias } = createAliases(pkg);

module.exports = {
  rootDir: path.dirname(__dirname),
  displayName: 'lint',

  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/src/**/*'],
  testPathIgnorePatterns: ['.+\\.d\\.ts$'],

  moduleFileExtensions: exts.concat('json'),
  moduleNameMapper: alias,

  runner: 'jest-runner-eslint',
  watchPlugins: ['jest-runner-eslint/watch-fix'],
};
