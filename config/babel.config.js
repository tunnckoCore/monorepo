'use strict';

module.exports = (api) => {
  api.cache(true);

  // ? just a backup reference
  // "browserslist": [
  //   "node 8",
  //   "node 10",
  //   "not dead",
  //   ">= 1%",
  //   "last 2 Opera versions"
  // ],

  return {
    // env: {
    //   build: {
    //     ignore: ['**/node_modules/**', '**/src/__tests__/**', '**/*.d.ts'],
    //   },
    // },
    // plugins: ['babel-plugin-module-resolver'],
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          shippedProposals: true,
          // Do not compile to CJS, when "build" because
          // we use `esm` loader bridge file
          modules: process.env.BABEL_ENV === 'build' ? false : 'commonjs',
        },
      ],
      [
        '@babel/preset-react',
        {
          development: process.env.BABEL_ENV !== 'build',
        },
      ],
      '@babel/preset-typescript',
    ],

    sourceMaps: process.env.BABEL_ENV !== 'build',
    comments: false,
  };
};
