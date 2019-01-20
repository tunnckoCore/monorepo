'use strict';

const pkg = require('./package.json');
const { exts, alias } = require('./support')(pkg);

module.exports = {
  displayName: 'test',

  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*'],

  moduleFileExtensions: exts.concat('json'),
  moduleNameMapper: alias,

  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },

  collectCoverage: false,
  collectCoverageFrom: [
    `**/src/**/*.{${exts.join(',')}}`,
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/dist/**',
  ],
};
