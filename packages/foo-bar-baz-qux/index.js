'use strict';

// eslint-disable-next-line import/no-unresolved
const mod = require('./dist/cjs');

function interop(x) {
  if (Object.keys(x).length === 1 && x.default) {
    return x.default;
  }
  return x;
}

module.exports = interop(mod);
