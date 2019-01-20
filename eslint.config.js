'use strict';

const pkg = require('./package.json');
const support = require('./support');

module.exports = {
  extends: 'tunnckocore',
  settings: {
    'import/resolver': {
      'babel-module': support(pkg),
    },
  },

  rules: {
    // 'import/no-extraneous-dependencies': 'off',
    // 'import/no-unresolved': 'off',
  },
};
