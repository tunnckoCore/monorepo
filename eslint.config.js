'use strict';

const pkg = require('./package.json');
const { createAliases } = require('./support');

module.exports = {
  extends: 'tunnckocore',
  settings: {
    'import/resolver': {
      'babel-module': createAliases(pkg),
    },
  },

  rules: {
    // 'import/no-extraneous-dependencies': 'off',
    // 'import/no-unresolved': 'off',
  },
};
