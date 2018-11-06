import path from 'path';
import test from 'asia';
import fs from 'fs-extra';
import dedent from 'dedent';
import charlike from 'charlike';
import simpleGit from 'simple-git/promise';

import gitCommitsSince from '../src';
import { __dirname } from './cjs';

/* eslint-disable-next-line max-statements */
test('basic test', async (t) => {
  const fakeCwd = path.join(__dirname, 'fixtures', 'qq5');
  await fs.remove(fakeCwd);
  await charlike({
    project: { name: 'qq5' },
    locals: { version: '0.1.0' },
    cwd: path.join(__dirname, 'fixtures'),
  });
  const git = simpleGit(fakeCwd);

  await git.init();

  // All is the default execpt `[commit] gpgsign`,
  // because i'm using it on my machine
  const localGitConfig = dedent`[core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true
  [user]
    name = Foo Bar Baz
    email = foobar@example.com
  [commit]
    gpgsign = false`;

  await fs.writeFile(path.join(fakeCwd, '.git', 'config'), localGitConfig);

  await git.add('./*');
  await git.commit('feat: initial blank release');
  await git.addTag('v0.1.0');

  await fs.writeFile(path.join(fakeCwd, 'foobar.txt'), 'zzzzz');
  await git.add('./*');
  await git.commit('feat: implement');

  await fs.writeFile(path.join(fakeCwd, 'fix.txt'), 'fixfix');
  await git.add('./*');
  await git.commit('fix: foo bar baz');

  await fs.writeFile(path.join(fakeCwd, 'fix2.txt'), '222xasas');
  await git.add('./*');
  await git.commit('fix: fo222222o bar baz');

  await fs.writeFile(path.join(fakeCwd, 'chore.txt'), 'chore');
  await git.add('./*');
  await git.commit('chore: foo bar baz');

  const result = await gitCommitsSince({
    name: '@tunnckocore/qq5',
    cwd: fakeCwd,
  });

  t.ok(result.pkg);
  t.ok(result.minor);
  t.ok(result.patch);
  t.strictEqual(result.increment, 'minor');
  t.strictEqual(result.minor.length, 1);
  t.strictEqual(result.patch.length, 2);
  t.strictEqual(result.pkg.name, '@tunnckocore/qq5');
  t.strictEqual(result.from, 'v0.1.0');
  t.strictEqual(result.to, '@');
  t.strictEqual(result.lastVersion, '0.1.0');
  t.strictEqual(result.nextVersion, '0.2.0');

  await git.addTag(`v${result.nextVersion}`);

  await fs.writeFile(path.join(fakeCwd, 'breaking.txt'), 'breaking breaking');
  await git.add('./*');
  await git.commit('feat(api): awful change\n\nBREAKING CHANGE: yeah!');

  const res = await gitCommitsSince({
    cwd: fakeCwd,
  });

  t.ok(res.commits);
  t.ok(Array.isArray(res.commits));
  t.strictEqual(res.commits[0].increment, 'major');

  await fs.remove(fakeCwd);
});
