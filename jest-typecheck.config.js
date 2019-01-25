'use strict';

const pkg = require('./package.json');
const { createAliases } = require('./support');

const { exts, alias } = createAliases(pkg);

module.exports = {
  rootDir: __dirname,

  displayName: 'tsc',

  testEnvironment: 'node',
  testMatch: ['**/src/**/*'],

  // resolver: require.resolve('jest-pnp-resolver'),
  moduleFileExtensions: exts.concat('json'),
  moduleNameMapper: alias,

  runner: 'jest-runner-tsc',
};
