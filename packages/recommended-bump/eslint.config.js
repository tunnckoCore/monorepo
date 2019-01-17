'use strict';

module.exports = {
  extends: '../../config/eslint.config.js',
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/test/**', // tape, common npm pattern
          '**/tests/**', // also common npm pattern
          '**/spec/**', // mocha, rspec-like pattern
          '**/__tests__/**', // jest pattern
          '**/__mocks__/**', // jest pattern
          'test.*', // repos with a single test file
          'test-*.*', // repos with multiple top-level test files
          '**/*{.,_,-}{test,spec}.*', // tests where the extension or filename suffix denotes that it is a test
          '**/jest.config.js', // jest config
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
        peerDependencies: false,
        optionalDependencies: false,
      },
    ],
  },
};
