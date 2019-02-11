'use strict';

const { createCommandConfig } = require('../../support');

module.exports = createCommandConfig(({ exts }) => ({
  displayName: 'test',

  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/__tests__/**/*'],

  transform: {
    // constructing `^.+\\.(js|mjs|jsx|ts|tsx)$` regex, dynamically
    [`^.+\\.(${exts.join('|')})$`]: 'babel-jest',
  },
  collectCoverage: false,
  collectCoverageFrom: [
    `<rootDir>/**/src/**/*.{${exts.join(',')}}`,
    '!<rootDir>/**/node_modules/**',
    '!<rootDir>/**/__tests__/**',
    '!<rootDir>/**/dist/**',
  ],
}));
