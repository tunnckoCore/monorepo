'use strict';

const pkg = require('./package.json');
const { exts, alias } = require('./support')(pkg);

module.exports = {
  rootDir: __dirname,

  displayName: 'tsc',

  testEnvironment: 'node',
  testMatch: ['**/src/**/*'],

  moduleFileExtensions: exts.concat('json'),
  moduleNameMapper: alias,

  runner: 'jest-runner-tsc',
};
