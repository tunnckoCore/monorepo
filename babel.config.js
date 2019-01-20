'use strict';

// const pkg = require('./package.json');
// const { createAliases } = require('./support');

module.exports = {
  ignore:
    process.env.BABEL_ENV === 'build'
      ? ['**/__tests__/**', '**/types.ts', '**/*.d.ts']
      : [],
  presets: [
    [
      '@babel/preset-env',
      { modules: process.env.BABEL_ENV === 'build' ? false : 'commonjs' },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  comments: false,
  // plugins: [['module-resolver', createAliases(pkg)]],
};
