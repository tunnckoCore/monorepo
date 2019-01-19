'use strict';

const pkg = require('./package.json');

const EXTENSIONS = pkg.extensions;
const WORKSPACES = pkg.workspaces.map((x) => x.slice(0, -2));

module.exports = {
  displayName: 'test',

  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*'],

  moduleFileExtensions: EXTENSIONS.concat('json'),
  moduleNameMapper: WORKSPACES.reduce((acc, x) => {
    acc[`^${x}/(.+)`] = `<rootDir>/${x}/$1/src`;
    return acc;
  }, {}),

  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },

  collectCoverage: false,
  collectCoverageFrom: [
    `**/src/**/*.{${EXTENSIONS.join(',')}}`,
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/dist/**',
  ],
};
