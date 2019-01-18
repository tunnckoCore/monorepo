'use strict';

const path = require('path');
const pkg = require('./package.json');

const ROOT = __dirname;
const WORKSPACES = pkg.workspaces.map((x) => x.slice(0, -2));
const EXTENSIONS = pkg.extensions.map((x) => `.${x}`);

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
    // 'import/no-extraneous-dependencies': 'off',
    // 'import/no-unresolved': 'off',
  },
};
