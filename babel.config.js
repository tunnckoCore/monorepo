module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      '@babel/env',
      [
        '@babel/preset-react',
        {
          development: process.env.BABEL_ENV !== 'build',
        },
      ],
      '@babel/preset-typescript',
    ],
    env: {
      build: {
        ignore: ['**/__tests__/**', '**/test/**', '**/snapshots/**'],
      },
    },
    ignore: ['node_modules'],
  };
};
