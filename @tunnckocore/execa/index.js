'use strict';

const path = require('path');
const esmLoader = require('esm');
const pkg = require('./package.json');

const esmRequire = esmLoader(module);

module.exports = esmRequire(path.join(__dirname, pkg.module));
