import test from 'asia';
import dedent from 'dedent';
import { parse, stringifyHeader } from 'parse-commit-message';
import recommendedBump from '../src';

test('should recommended patch bump', (t) => {
  const allCommits = [
    'chore: foo bar baz',
    dedent`fix(cli): some bugfix msg here

    Some awesome body.

    Great footer and GPG sign off, yeah!
    Signed-off-by: Awesome footer <foobar@gmail.com>`,
  ];

  const { increment, isBreaking, patch, commits } = recommendedBump(allCommits);

  t.strictEqual(Array.isArray(commits), true);
  t.strictEqual(isBreaking, false);
  t.strictEqual(increment, 'patch');
  t.strictEqual(patch[0].header.type, 'fix');
  t.strictEqual(patch[0].header.scope, 'cli');
  t.strictEqual(patch[0].header.subject, 'some bugfix msg here');
  t.strictEqual(
    stringifyHeader(patch[0].header),
    'fix(cli): some bugfix msg here',
  );
  t.strictEqual(patch[0].body, 'Some awesome body.');
  t.strictEqual(
    patch[0].footer,
    'Great footer and GPG sign off, yeah!\nSigned-off-by: Awesome footer <foobar@gmail.com>',
  );
});

test('should recommend minor bump', (t) => {
  const commitOne = parse('fix: foo bar');
  const commitTwo = parse('feat: some feature subject');

  const result = recommendedBump([commitOne, commitTwo]);
  t.strictEqual(result.increment, 'minor');
  t.strictEqual(result.isBreaking, false);
});

test('should recommend major bump from `fix` type', (t) => {
  const result = recommendedBump([
    'feat: ho ho ho',
    'fix: foo bar baz\n\nBREAKING CHANGE: ouch!',
  ]);

  t.strictEqual(Array.isArray(result.commits), true);
  t.strictEqual(result.increment, 'major');
  t.strictEqual(result.isBreaking, true);
  t.strictEqual(result.major[0].header.type, 'fix');
  t.strictEqual(result.major[0].header.subject, 'foo bar baz');
  t.strictEqual(result.major[0].body, 'BREAKING CHANGE: ouch!');

  t.deepStrictEqual(result.minor[0].header, {
    type: 'feat',
    scope: null,
    subject: 'ho ho ho',
  });
});

test('should return { increment: false, commits: Array<Commit> } when no need for bump', (t) => {
  const result = recommendedBump([
    'chore(ci): update ci config',
    'test: ok okey boody man',
    'refactor: some tweaks',
  ]);

  t.strictEqual(result.increment, false);
  t.strictEqual(result.isBreaking, false);

  t.strictEqual(Array.isArray(result.commits), true);
  const [one, two, three] = result.commits;
  t.deepStrictEqual(one.header, {
    type: 'chore',
    scope: 'ci',
    subject: 'update ci config',
  });
  t.deepStrictEqual(two.header, {
    type: 'test',
    scope: null,
    subject: 'ok okey boody man',
  });
  t.deepStrictEqual(three.header, {
    type: 'refactor',
    scope: null,
    subject: 'some tweaks',
  });
});
