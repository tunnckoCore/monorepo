'use strict';

/**
 * A bit modified eslint-import-resolver-lerna
 * TODO: Should go as PR
 */

const fs = require('fs');
const proc = require('process');
const path = require('path');

exports.resolve = function resolve(importPath, _, opts) {
  const config = Object.assign(
    { cwd: proc.cwd(), packages: 'packages', src: null },
    opts,
  );
  const pkgRootFolder = pkgBaseName(importPath);

  const packagesDirs = arrayify(config.packages)
    .filter(Boolean)
    .map((rootDir) => path.join(config.cwd, rootDir));

  const index = new Map();

  packagesDirs.forEach((pkgDir) => {
    // could `eslint-plugin-import` resolvers be async functions?!
    fs.readdirSync(pkgDir)
      .map((packageFolder) => path.join(pkgDir, packageFolder))
      .forEach((pkgRoot) => {
        /* eslint-disable-next-line global-require, import/no-dynamic-require */
        const pkg = require(path.join(pkgRoot, 'package.json'));
        index.set(pkg.name, pkgRoot);
      });
  });

  return index.has(pkgRootFolder)
    ? { found: true, path: index.get(pkgRootFolder) }
    : { found: false };
};

function arrayify(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return [val];
}

function pkgBaseName(identifier) {
  const parts = identifier.split('/');

  return identifier.startsWith('@')
    ? // Scoped package name - pick first two parts (the scope and the package name)
      parts.slice(0, 2).join('/')
    : // Regular package name - pick just the first part (the package name)
      parts[0];
}

exports.interfaceVersion = 2;
