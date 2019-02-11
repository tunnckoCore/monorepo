#!/usr/bin/env node

'use strict';

const rollup = require('rollup');
const argParser = require('mri');
const { createConfig, arrayify } = require('./index'); // eslint-disable-line import/no-unresolved

const argv = argParser(process.argv.slice(2), {
  default: {
    cwd: process.cwd(),
    // pkgDir: '.',
  },
  alias: {
    i: 'input',
    d: ['out-dir', 'outdir', 'outDir'],
    P: ['pkg-dir', 'pkgdir', 'pkgDir'],
    f: 'format',
    m: 'minify',
    x: ['ext', 'extensions'],
    l: ['license'],
  },
});

let ROLLUP_CACHE = null;

createConfig(argv.input || argv._[0], argv)
  .then(async (cfg) => {
    // console.log(cfg);
    const bundle = await rollup.rollup(
      Object.assign({}, cfg, { cache: ROLLUP_CACHE }),
    );

    ROLLUP_CACHE = bundle.cache;

    arrayify(cfg.output).map(async (outputOptions) => {
      await bundle.write(outputOptions);
    });
  })
  .catch((err) => {
    console.error(err);

    // wtf, why not?!
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  });
