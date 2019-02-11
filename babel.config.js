'use strict';

const pkg = require('./package.json');
const { createAliases } = require('./config/support');

module.exports = {
  ignore: process.env.BABEL_ENV === 'build' ? ['**/__tests__/**'] : [],
  presets: [
    [
      '@babel/preset-env',
      // { modules: process.env.BABEL_ENV === 'build' ? false : 'commonjs' },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  comments: false,
  // ! important, we need that because the rollup resolving
  plugins: [['module-resolver', createAliases(pkg)]],
};
