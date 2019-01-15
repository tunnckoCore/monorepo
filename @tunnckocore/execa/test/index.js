import proc from 'process';

import { exec, shell } from '../src';

/* eslint-disable jest/expect-expect */

test('export an object with "exec" and "shell" functions', () => {
  expect(typeof exec).toStrictEqual('function');
  expect(typeof shell).toStrictEqual('function');
});

test('the `exec` accepts arguments with quotes', async () => {
  const results = await exec('echo "some content with spaces"');
  expect(results[0].stdout).toStrictEqual('some content with spaces');
});

test('the `shell` should be able to access ENVs', async () => {
  const results = await shell('echo "foo-$HOME-bar"', { env: proc.env });

  expect(results[0].stdout).toMatch(/^foo-.*-bar$/);
});
