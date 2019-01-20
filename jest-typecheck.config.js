'use strict';

const pkg = require('./package.json');

const EXTENSIONS = pkg.extensions;
const WORKSPACES = pkg.workspaces.map((x) => x.slice(0, -2));

module.exports = {
  rootDir: __dirname,

  displayName: 'tsc',

  testEnvironment: 'node',
  testMatch: ['**/src/**/*'],

  moduleFileExtensions: ['ts', 'tsx'].concat('json'),
  moduleNameMapper: WORKSPACES.reduce((acc, x) => {
    acc[`^${x}/(.+)`] = `<rootDir>/${x}/$1/src`;
    return acc;
  }, {}),

  runner: 'jest-runner-tsc',
};
