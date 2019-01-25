'use strict';

const pkg = require('./package.json');
const { createAliases } = require('./support');

const { exts, alias } = createAliases(pkg);

module.exports = {
  displayName: 'test',

  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*'],

  moduleFileExtensions: exts.concat('json'),
  moduleNameMapper: alias,

  collectCoverage: false,
  collectCoverageFrom: [
    `**/src/**/*.{${exts.join(',')}}`,
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/dist/**',
  ],
};
