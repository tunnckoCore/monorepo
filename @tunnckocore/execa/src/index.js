/**
 * @copyright 2017-present, Charlike Mike Reagent <olsten.larck@gmail.com>
 * @license Apache-2.0
 */

const execa = require('execa')
const pMap = require('p-map-series')

module.exports = { exec, shell }

function exec (cmds, opts) {
  return factory('exec')(cmds, opts)
}

function shell (cmds, opts) {
  return factory('shell')(cmds, opts)
}

function factory (type) {
  const cmd = {
    exec: execa,
    shell: execa.shell,
  }

  return (cmds, opts) => {
    const commands = [].concat(cmds)
    const options = Object.assign({ cwd: process.cwd() }, opts)

    const mapper = (cmdLine) => {
      const run = cmd[type]

      if (type === 'shell') {
        return run(cmdLine, options)
      }

      const parts = cmdLine
        .split(' ')
        .map((x) => x.trim())
        .filter(Boolean)

      return run(parts.shift(), parts, options)
    }

    return pMap(commands, mapper)
  }
}
