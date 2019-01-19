'use strict';

const jestConfig = require('../../jest.config');

module.exports = Object.assign({}, jestConfig, {
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
});
