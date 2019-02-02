#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const proc = require('process');
const mri = require('mri');

const { createRunCommand, runSetup } = require('./support');

const args = proc.argv.slice(2);
const argv = mri(args, {
  default: {
    cwd: proc.cwd(),
  },
});

const runCommand = createRunCommand(args.slice(1), argv);

const cmd = argv._[0];

if (!cmd) {
  console.log('show help ...');

  console.log('available:');
  console.log('  devest test');
  console.log('  devest lint');
  proc.exit(1);
}

const hash = Buffer.from(argv.cwd, 'base64')
  .toString('hex')
  .slice(-15, -2);

const configName = `.config-${hash}.js`;

if (!fs.existsSync(path.join(__dirname, 'commands', cmd, configName))) {
  console.log('Setting commands configs for', argv.cwd);
  runSetup(argv, configName);
}

runCommand(cmd, configName).catch((err) => proc.exit(err.code || 1));
