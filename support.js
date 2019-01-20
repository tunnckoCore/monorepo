'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Create explicit alias key/value pair from the current
 * packages inside each workspace, because
 *
 * '^(.+)': '/path/to/package/src'
 *
 * can be very big mistake ;]
 * We just don't use regex, we precompute them.
 */
function createAliases(pkg) {
  const cwd = __dirname;
  const exts = pkg.extensions.map((x) => `.${x}`);

  const alias = pkg.workspaces
    .map((x) => x.slice(0, -2))
    .filter(Boolean)
    .reduce((acc, ws) => {
      const workspace = path.join(cwd, ws);
      const packages = fs
        .readdirSync(workspace)
        .map((dir) => {
          const pkgDir = path.join(workspace, dir);
          const pkgJsonPath = path.join(pkgDir, 'package.json');

          return { pkgDir, pkgJsonPath };
        })
        .map(({ pkgDir, pkgJsonPath }) => {
          // eslint-disable-next-line global-require, import/no-dynamic-require
          const pkgJson = require(pkgJsonPath);
          return [pkgDir, pkgJson];
        });

      return acc.concat(packages);
    }, [])
    .reduce((acc, [pkgDir, pkgJson]) => {
      acc[pkgJson.name] = path.join(pkgDir, 'src');
      return acc;
    }, {});

  return { cwd, extensions: exts, exts: pkg.extensions, alias };
}

module.exports = { createAliases };
