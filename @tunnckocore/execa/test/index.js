import proc from 'process';
import test from 'asia';
import { exec, shell } from '../src';

test('export an object with "exec" and "shell" functions', (t) => {
  t.strictEqual(typeof exec, 'function');
  t.strictEqual(typeof shell, 'function');
});

test('the `exec` accepts arguments with quotes', async (t) => {
  const results = await exec('echo "some content with spaces"');
  t.strictEqual(results[0].stdout, 'some content with spaces');
});

test('the `shell` should be able to access ENVs', async (t) => {
  const results = await shell('echo "foo-$HOME-bar"', { env: proc.env });

  t.ok(/^foo-.*-bar$/.test(results[0].stdout));
});
