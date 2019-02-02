'use strict';

const fs = require('fs');
const path = require('path');
const proc = require('process');
const { exec } = require('@tunnckocore/execa');

function arrayify(x) {
  return [].concat(x || []);
}

/**
 * Create explicit alias key/value pair from the current
 * packages inside each workspace, because
 *
 * '^(.+)': '/path/to/package/src'
 *
 * can be very big mistake ;]
 * We just don't use regex, we precompute them.
 */
function createAliases(rootDir) {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const pkg = require(path.join(rootDir, 'package.json'));
  const defaultExtensions = ['ts', 'tsx', 'js', 'jsx', 'mjs'];

  let extensions = arrayify(pkg.extensions);
  extensions = extensions.length > 0 ? extensions : defaultExtensions;

  const exts = extensions.map((x) => `.${x}`);

  const alias = arrayify(pkg.workspaces)
    .map((x) => x.slice(0, -2))
    .filter(Boolean)
    .reduce((acc, ws) => {
      const workspace = path.join(rootDir, ws);
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

  return { cwd: rootDir, extensions: exts, exts: extensions, alias };
}

function createPartialConfig(rootDir) {
  const res = createAliases(rootDir);

  res.jestConfig = {
    rootDir,

    moduleFileExtensions: res.exts.concat('json'),
  };

  if (isObject(res.alias)) {
    res.jestConfig.moduleNameMapper = res.alias;
  }

  return res;
}
function isObject(val) {
  return val && typeof val === 'object' && !Array.isArray(val);
}

function createRunCommand(args, argv) {
  return (cmdName, configName) => {
    const configPath = path.join(__dirname, 'commands', cmdName, configName);
    const cmd = ['jest', '--config', configPath]
      .concat(args)
      .filter(Boolean)
      .join(' ');

    return exec(cmd, {
      env: proc.env,
      stdio: 'inherit',
      cwd: argv.cwd,
    });
  };
}

function createCommandConfig(fn) {
  return (argv) => {
    const res = createPartialConfig(argv.cwd);
    return Object.assign({}, res.jestConfig, fn(res));
  };
}

function runSetup(opts, configName) {
  const commandsDir = path.join(__dirname, 'commands');
  fs.readdirSync(commandsDir).forEach((name) => {
    const configFile = path.join(commandsDir, name, configName);

    // eslint-disable-next-line import/no-dynamic-require, global-require
    const createConfig = require(path.join(commandsDir, name));
    const config = createConfig(opts);

    const content = `module.exports = ${JSON.stringify(config)}`;

    fs.writeFileSync(configFile, content);
  });
}

module.exports = {
  createAliases,
  createPartialConfig,
  createCommandConfig,
  createRunCommand,
  runSetup,
};
