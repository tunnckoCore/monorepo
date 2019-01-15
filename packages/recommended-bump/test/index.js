import dedent from 'dedent';
import { parse, stringifyHeader } from 'parse-commit-message';
import recommendedBump from '../src';

test('should recommended patch bump', () => {
  const allCommits = [
    'chore: foo bar baz',
    dedent`fix(cli): some bugfix msg here

    Some awesome body.

    Great footer and GPG sign off, yeah!
    Signed-off-by: Awesome footer <foobar@gmail.com>`,
  ];

  const { increment, isBreaking, patch, commits } = recommendedBump(allCommits);

  expect(Array.isArray(commits)).toStrictEqual(true);
  expect(isBreaking).toStrictEqual(false);
  expect(increment).toStrictEqual('patch');
  expect(patch[0].header.type).toStrictEqual('fix');
  expect(patch[0].header.scope).toStrictEqual('cli');
  expect(patch[0].header.subject).toStrictEqual('some bugfix msg here');
  expect(stringifyHeader(patch[0].header)).toStrictEqual(
    'fix(cli): some bugfix msg here',
  );
  expect(patch[0].body).toStrictEqual('Some awesome body.');
  expect(patch[0].footer).toStrictEqual(
    'Great footer and GPG sign off, yeah!\nSigned-off-by: Awesome footer <foobar@gmail.com>',
  );
});

test('should recommend minor bump', () => {
  const commitOne = parse('fix: foo bar');
  const commitTwo = parse('feat: some feature subject');

  const result = recommendedBump([commitOne, commitTwo]);
  expect(result.increment).toStrictEqual('minor');
  expect(result.isBreaking).toStrictEqual(false);
});

test('should recommend major bump from `fix` type', () => {
  const result = recommendedBump([
    'feat: ho ho ho',
    'fix: foo bar baz\n\nBREAKING CHANGE: ouch!',
  ]);

  expect(Array.isArray(result.commits)).toStrictEqual(true);
  expect(result.increment).toStrictEqual('major');
  expect(result.isBreaking).toStrictEqual(true);
  expect(result.major[0].header.type).toStrictEqual('fix');
  expect(result.major[0].header.subject).toStrictEqual('foo bar baz');
  expect(result.major[0].body).toStrictEqual('BREAKING CHANGE: ouch!');

  expect(result.minor[0].header).toMatchObject({
    type: 'feat',
    scope: null,
    subject: 'ho ho ho',
  });
});

test('should return { increment: false, commits: Array<Commit> } when no need for bump', () => {
  const result = recommendedBump([
    'chore(ci): update ci config',
    'test: ok okey boody man',
    'refactor: some tweaks',
  ]);

  expect(result.increment).toStrictEqual(false);
  expect(result.isBreaking).toStrictEqual(false);

  expect(Array.isArray(result.commits)).toStrictEqual(true);
  const [one, two, three] = result.commits;
  expect(one.header).toMatchObject({
    type: 'chore',
    scope: 'ci',
    subject: 'update ci config',
  });
  expect(two.header).toMatchObject({
    type: 'test',
    scope: null,
    subject: 'ok okey boody man',
  });
  expect(three.header).toMatchObject({
    type: 'refactor',
    scope: null,
    subject: 'some tweaks',
  });
});
