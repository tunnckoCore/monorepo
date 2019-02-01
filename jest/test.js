'use strict';

const path = require('path');
const pkg = require('../package.json');
const { createAliases } = require('../support');

const { exts, alias } = createAliases(pkg);

module.exports = {
  rootDir: path.dirname(__dirname),
  displayName: 'test',

  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/__tests__/**/*'],

  moduleFileExtensions: exts.concat('json'),
  moduleNameMapper: alias,

  collectCoverage: false,
  collectCoverageFrom: [
    `<rootDir>/**/src/**/*.{${exts.join(',')}}`,
    '!<rootDir>/**/node_modules/**',
    '!<rootDir>/**/__tests__/**',
    '!<rootDir>/**/dist/**',
  ],
};
