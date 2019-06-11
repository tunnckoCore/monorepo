const fs = require('fs');
const path = require('path');
const builtins = require('builtin-modules');
const commonjs = require('rollup-plugin-commonjs');
// const progress = require('rollup-plugin-progress');
const filesize = require('rollup-plugin-filesize');
const resolve = require('rollup-plugin-node-resolve');
const terser = require('rollup-plugin-terser');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');

async function createConfig(input, options) {
  const opts = Object.assign({}, options);
  const extMap = {
    esm: '.mjs',
    cjs: '.js',
  };

  opts.cwd = path.resolve(opts.cwd);

  // ? might reconsider separating them on `dist/esm` and `dist/cjs` folders
  const outDir = (/* ...args */) => {
    let pkgDir = null;
    if (opts.cwd && opts.pkgDir) {
      pkgDir = path.relative(opts.cwd, opts.pkgDir);
    }

    return (
      opts.outDir ||
      path.resolve(
        opts.cwd,
        ...[]
          .concat(pkgDir, 'dist')
          .concat(/* , ...args */)
          .filter(Boolean),
      )
    );
  };

  // TODO: mostly duplicate of outDir()
  const join = (...x) => {
    let pkgDir = null;

    if (opts.cwd && opts.pkgDir) {
      pkgDir = path.relative(opts.cwd, opts.pkgDir);
    }

    return path.resolve(
      opts.cwd,
      ...[]
        .concat(pkgDir)
        .concat(x)
        .filter(Boolean),
    );
  };

  const outFile = (x) => path.join(outDir(x), `index${extMap[x]}`);

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const pkg = require(join('package.json'));
  const deps = Object.keys(Object.assign({}, pkg.dependencies));

  const exts = arrayify(opts.extensions);
  const extensions =
    exts.length > 0
      ? exts
      : ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.node', '.json'];

  const possibleInputs = [
    input,
    join('src', 'index.js'),
    join('src', 'index.mjs'),
    join('src', 'index.ts'),
    join('index.js'),
  ];

  // first existing, for now
  const [inputFile] = possibleInputs
    .filter(Boolean)
    .filter((x) => fs.existsSync(x));

  const isCLI = inputFile.includes('cli');
  const license = `/** Released under the ${opts.license ||
    pkg.license} License, @tunnckoCore <opensource@tunnckocore.com> & contributors. */`;

  const outMap = {
    cjs: {
      exports: 'named',
      banner: isCLI ? `#!/usr/bin/env node\n${license}` : license,

      file: outFile('cjs'),
      format: 'cjs',
      preferConst: true,

      // don't break oldschool/classic/normal node.js
      outro: isCLI ? '' : (opts.classic ? 'module.exports = exports.default || exports;' : ''),
    },
    esm: {
      exports: 'named',
      banner: license,
      file: outFile('esm'),
      format: 'esm',
      preferConst: true,
    },
  };

  let formats = arrayify(opts.format)
    .reduce((acc, x) => acc.concat(x.indexOf(',') > -1 ? x.split(',') : x), [])
    .filter(Boolean);

  let output = null;

  if (formats.length === 0) {
    formats = ['cjs', 'esm'];
  }
  if (formats.length === 1) {
    output = outMap[formats[0]];
  } else {
    output = formats.map((x) => outMap[x]);
  }

  let workspaces = [];

  if (typeof opts.workspaces === 'string') {
    workspaces = opts.workspaces.split(',').map((x) => x.trim());
  }
  if (typeof opts.workspaces === 'boolean') {
    workspaces = ['@tunnckocore', 'packages'];
  }

  return {
    input: inputFile,
    output,

    external: builtins.concat(deps),

    inlineDynamicImports: true,
    experimentalTopLevelAwait: true,

    plugins: [
      // progress(),
      resolve({
        preferBuiltins: true,

        mainFields: ['module', 'main'],
        // module: true,
        // jsnext: true,
        // main: true,
        extensions,
        customResolveOptions: {
          extensions,
          basedir: opts.cwd,

          /**
           * ! Black magic ONE.
           *
           * There's actually an easy way. Just run the build in series, not in parallel.
           * From doing this we'll have 2 drawbacks: a) slower build times,
           * and b) lerna will run them in alphabetical order, which isn't always the case,
           * so we need to rely on the source directly. We also need all that,
           * because we have typescript source.
           * For example, `recommended-bump` depends on `parse-commit-message`
           * and running the build in series will give correct results. But what
           * if it was depending on package whose name starts with "x" - it will fail,
           * because that package won't be build yet
           * when the `recommended-bump` build is triggered.
           *
           * ! Black magic TWO:
           *
           * 1) Problem one: we are bundling dependencies, and so
           * we even doninclude them in the `dependencies` object,
           * but in the `devDependencies`
           *
           * 2) Problem two: Because we are exposing `main: dist/` and `module: dist/`
           * from all packages package.json files, we getting incorrect results,
           * rollup cannot resolve them and treats them as external deps.
           * So we need to override (in memory) the main/module fields
           * loaded from package.json (only if the package is from some workspace)
           * and make them to point to the source.
           * And the way we know what is the source is what is put as `input` to rollup,
           * few (10-20) lines above.
           *
           * 3) Problem three: That's not enough. We also need to enable the
           * Babel to know what is happening, and so we use `babel-plugin-module-resolver`
           */

          packageFilter(pkgJson, pkgfile) {
            const pkgDir = path.dirname(pkgfile);
            const pkgWorkspace = path.basename(path.dirname(pkgDir));

            if (workspaces.includes(pkgWorkspace)) {
              pkgJson.main = inputFile; // eslint-disable-line no-param-reassign
              pkgJson.module = inputFile; // eslint-disable-line no-param-reassign
            }

            return pkgJson;
          },
          moduleDirectory: path.join(opts.cwd, 'node_modules'),
          paths: workspaces.map((ws) => path.join(opts.cwd, ws)),
        },
      }),
      json({ preferConst: true }),
      opts.babel && babel({
        exclude: 'node_modules/**',
        externalHelpers: true,
        extensions,
      }),
      commonjs({
        extensions,
      }),
      opts.minify && terser.terser(),
      filesize({
        showBrotliSize: true,
        showGzippedSize: true,
        showMinifiedSize: true,
      }),
    ].filter(Boolean),
  };
}

function arrayify(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return [val];
}

module.exports = { createConfig, arrayify };
