'use strict';

const { createCommandConfig } = require('../../support');

module.exports = createCommandConfig(({ exts }) => ({
  displayName: 'test',

  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/__tests__/**/*'],

  collectCoverage: false,
  collectCoverageFrom: [
    `<rootDir>/**/src/**/*.{${exts.join(',')}}`,
    '!<rootDir>/**/node_modules/**',
    '!<rootDir>/**/__tests__/**',
    '!<rootDir>/**/dist/**',
  ],
}));
