'use strict';

const pkg = require('./package.json');

const EXTENSIONS = pkg.extensions.map((x) => x.slice(1));
const WORKSPACES = pkg.workspaces.map((x) => x.slice(0, -2));

module.exports = {
  rootDir: __dirname,

  displayName: 'lint',

  testEnvironment: 'node',
  testMatch: ['**/src/**/*'],
  testPathIgnorePatterns: ['.+\\.d\\.ts$'],

  moduleFileExtensions: EXTENSIONS.concat('json'),
  moduleNameMapper: WORKSPACES.reduce((acc, x) => {
    acc[`^${x}/(.+)`] = `<rootDir>/${x}/$1/src`;
    return acc;
  }, {}),

  runner: 'jest-runner-eslint',
};
