'use strict';

const pkg = require('./package.json');
const { createAliases } = require('./support');

const { exts, alias } = createAliases(pkg);

module.exports = {
  rootDir: __dirname,

  displayName: 'lint',

  testEnvironment: 'node',
  testMatch: ['**/src/**/*'],
  testPathIgnorePatterns: ['.+\\.d\\.ts$'],

  // resolver: require.resolve('jest-pnp-resolver'),
  moduleFileExtensions: exts.concat('json'),
  moduleNameMapper: alias,

  runner: 'jest-runner-eslint',
  watchPlugins: ['jest-runner-eslint/watch-fix'],
};
