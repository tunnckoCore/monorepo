'use strict';

const pkg = require('./package.json');
const { createAliases } = require('./support');

const { exts, alias } = createAliases(pkg);

module.exports = {
  rootDir: __dirname,

  displayName: 'tsc',

  testEnvironment: 'node',
  testMatch: ['**/src/**/*'],

  moduleFileExtensions: exts.concat('json'),
  moduleNameMapper: alias,

  runner: 'jest-runner-tsc',
};
