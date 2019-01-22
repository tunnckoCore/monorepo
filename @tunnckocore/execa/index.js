'use strict';

const mod = require('./dist');

function interop(x) {
  if (Object.keys(x).length === 1 && x.default) {
    return x.default;
  }
  return x;
}

module.exports = interop(mod);
