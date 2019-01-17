'use strict';

const path = require('path');

const ROOT = path.dirname(__dirname);
const CUSTOM_RESOLVER = path.join(
  ROOT,
  'config',
  'import-resolver-monorepo.js',
);

module.exports = {
  // the `(<FooType>someObj).someVar` throw parse errors with all parsers?!
  // parser: '@typescript-eslint/parser',
  // parser: 'pluggable-babel-eslint',
  // parserOptions: {
  //   plugins: ['typescript'],
  // },
  extends: 'tunnckocore',
  settings: {
    'import/resolver': {
      [CUSTOM_RESOLVER]: {
        cwd: ROOT,
        packages: ['@tunnckocore', 'packages'],
      },
    },
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'test/**', // tape, common npm pattern
          'tests/**', // also common npm pattern
          'spec/**', // mocha, rspec-like pattern
          '**/{__tests__,__mocks__,test,tests}/**', // patterns
          'test.{js,jsx,ts,tsx,mdx,mjs}', // repos with a single test file
          'test-*.{js,jsx,ts,tsx,mdx,mjs}', // repos with multiple top-level test files
          '**/*{.,_,-}{test,spec}.{js,jsx,ts,tsx,mdx,mjs}', // tests where the extension or filename suffix denotes that it is a test
          '**/jest.config.js', // jest config
          '**/jest.config.*.js', // jest config
          '**/vue.config.js', // vue-cli config
          '**/webpack.config.js', // webpack config
          '**/webpack.config.*.js', // webpack config
          '**/rollup.config.js', // rollup config
          '**/rollup.config.*.js', // rollup config
          '**/gulpfile.js', // gulp config
          '**/gulpfile.*.js', // gulp config
          '**/Gruntfile{,.js}', // grunt config
          '**/protractor.conf.js', // protractor config
          '**/protractor.conf.*.js', // protractor config
        ],
        optionalDependencies: false,
      },
    ],
  },
};
