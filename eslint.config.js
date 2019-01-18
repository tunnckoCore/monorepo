'use strict';

const path = require('path');

const ROOT = path.dirname(__dirname);
const WORKSPACES = ['packages'];
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

module.exports = {
  extends: 'tunnckocore',
  settings: {
    'import/resolver': {
      'babel-module': {
        cwd: ROOT,
        extensions: EXTENSIONS,
        alias: WORKSPACES.reduce((acc, workspace) => {
          acc[`^${workspace}/(.+)`] = function func([, name]) {
            return path.join(ROOT, workspace, name, 'src');
          };

          return acc;
        }, {}),
      },
    },
  },

  rules: {
    'jest/expect-expect': 'off',
    'import/no-extraneous-dependencies': 'off',
    // 'import/no-unresolved': 'off',
  },
};
