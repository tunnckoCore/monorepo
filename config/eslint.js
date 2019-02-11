'use strict';

const path = require('path');
const pkg = require('../package.json');
const { createAliases } = require('./support');

module.exports = {
  extends: path.join(
    path.dirname(__dirname),
    'packages',
    'eslint-config-tunnckocore',
    'src',
    'index.js',
  ),
  settings: {
    'import/resolver': {
      'babel-module': createAliases(pkg),
    },
  },

  rules: {
    'import/no-extraneous-dependencies': 'off',
    // 'import/no-unresolved': 'off',
  },
};
