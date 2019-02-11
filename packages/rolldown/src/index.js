const fs = require('fs');
const path = require('path');
const builtins = require('builtin-modules');
const commonjs = require('rollup-plugin-commonjs');
const progress = require('rollup-plugin-progress');
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

  // ? might reconsider separating them on `dist/esm` and `dist/cjs` folders
  const outDir = (/* ...args */) =>
    opts.outDir || path.join(opts.cwd, 'dist' /* , ...args */);

  const outFile = (x) => path.join(outDir(x), `index${extMap[x]}`);

  const join = (...x) => path.join(opts.cwd, ...x);

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
    pkg.license} License, @tunnckoCore & contributors. */`;

  const outMap = {
    cjs: {
      exports: 'named',
      banner: isCLI ? `#!/usr/bin/env node\n${license}` : license,

      file: outFile('cjs'),
      format: 'cjs',
      preferConst: true,

      // don't break oldschool/classic/normal node.js
      outro: isCLI ? '' : 'module.exports = exports.default || exports;',
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

  return {
    input: inputFile,
    output,

    external: builtins.concat(deps),

    inlineDynamicImports: true,
    experimentalTopLevelAwait: true,

    plugins: [
      progress(),
      resolve({
        preferBuiltins: true,
        module: true,
        jsnext: true,
        main: true,
      }),
      json({ preferConst: true }),
      babel({
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
    ],
  };
}

function arrayify(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return [val];
}

module.exports = { createConfig, arrayify };
