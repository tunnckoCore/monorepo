'use strict';

const jestConfig = require('../../jest.config');

module.exports = Object.assign({}, jestConfig, {
  collectCoverage: true,
});
