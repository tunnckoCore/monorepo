'use strict';

const pkg = require('./package.json');
const support = require('./support');

module.exports = {
  ignore:
    process.env.BABEL_ENV === 'build'
      ? ['**/__tests__/**', '**/types.ts', '**/*.d.ts']
      : [],
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [['module-resolver', support(pkg)]],
};
