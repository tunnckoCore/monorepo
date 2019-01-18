'use strict';

const path = require('path');

const ROOT = __dirname;
const WORKSPACES = ['packages', '@tunnckocore'];
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

module.exports = {
  ignore: process.env.BABEL_ENV === 'build' ? ['**/__tests__/**'] : [],
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        cwd: ROOT,
        extensions: EXTENSIONS,
        alias: WORKSPACES.reduce((acc, workspace) => {
          acc[`^${workspace}/(.+)`] = function func([, name]) {
            return path.join(ROOT, workspace, name, 'src');
          };

          return acc;
        }, {}),
      },
    ],
  ],
};
