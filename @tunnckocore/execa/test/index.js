/**
 * @copyright 2017-present, Charlike Mike Reagent <olsten.larck@gmail.com>
 * @license Apache-2.0
 */

const test = require('mukla')
const execaPro = require('../src/index.js')

test('export an object with "exec" and "shell" functions', (done) => {
  test.strictEqual(typeof execaPro, 'object')
  test.strictEqual(typeof execaPro.exec, 'function')
  test.strictEqual(typeof execaPro.shell, 'function')
  done()
})

test('exec accepts arguments with quotes', async () => {
  const results = await execaPro.exec('echo "some content with spaces"')
  test.strictEqual(results[0].stdout, 'some content with spaces')
})
