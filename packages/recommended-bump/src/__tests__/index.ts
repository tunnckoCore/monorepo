import dedent from 'dedent';
import { parse, stringifyHeader } from 'packages/parse-commit-message';

import recommendedBump from '../index';

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

  // TODO: understand more better typescript
  // it make sense, but in testing environment... no so.
  // The thing is that in test env you know that it will be here...
  if (Array.isArray(patch)) {
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
  }
});

test('should recommend minor bump', () => {
  const [commitOne] = parse('fix: foo bar');
  const [commitTwo] = parse('feat: some feature subject');

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

  // TODO: understand more better typescript
  if (Array.isArray(result.major)) {
    expect(result.major[0].header.type).toStrictEqual('fix');
    expect(result.major[0].header.subject).toStrictEqual('foo bar baz');
    expect(result.major[0].body).toStrictEqual('BREAKING CHANGE: ouch!');
  }

  // TODO: understand more better typescript
  // @ts-ignore
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

// import test from 'ava';
// import dedent from 'dedent';
// import { parse, stringifyHeader } from 'parse-commit-message';

// import recommendedBump from '..';

// test('should recommended patch bump', (t) => {
//   const allCommits = [
//     'chore: foo bar baz',
//     dedent`fix(cli): some bugfix msg here
//     Some awesome body.
//     Great footer and GPG sign off, yeah!
//     Signed-off-by: Awesome footer <foobar@gmail.com>`,
//   ];

//   const { increment, isBreaking, patch, commits } = recommendedBump(allCommits);

//   t.is(Array.isArray(commits), true);
//   t.is(isBreaking, false);
//   t.is(increment, 'patch');

//   if (Array.isArray(patch)) {
//     t.is(patch[0].header.type, 'fix');
//     t.is(patch[0].header.scope, 'cli');
//     t.is(patch[0].header.subject, 'some bugfix msg here');
//     t.is(stringifyHeader(patch[0].header), 'fix(cli): some bugfix msg here');
//     t.is(patch[0].body, 'Some awesome body.');
//     t.is(
//       patch[0].footer,
//       'Great footer and GPG sign off, yeah!\nSigned-off-by: Awesome footer <foobar@gmail.com>',
//     );
//   }
// });

// test('should recommend minor bump', (t) => {
//   const [commitOne] = parse('fix: foo bar');
//   const [commitTwo] = parse('feat: some feature subject');

//   const result = recommendedBump([commitOne, commitTwo]);
//   t.is(result.increment, 'minor');
//   t.is(result.isBreaking, false);
// });

// test('should recommend major bump from `fix` type', (t) => {
//   const result = recommendedBump([
//     'feat: ho ho ho',
//     'fix: foo bar baz\n\nBREAKING CHANGE: ouch!',
//   ]);

//   t.is(Array.isArray(result.commits), true);
//   t.is(result.increment, 'major');
//   t.is(result.isBreaking, true);

//   if (Array.isArray(result.major)) {
//     t.is(result.major[0].header.type, 'fix');
//     t.is(result.major[0].header.subject, 'foo bar baz');
//     t.is(result.major[0].body, 'BREAKING CHANGE: ouch!');
//   }

//   // @ts-ignore
//   t.deepEqual(result.minor[0].header, {
//     type: 'feat',
//     scope: null,
//     subject: 'ho ho ho',
//   });
// });

// test('should return { increment: false, commits: Array<Commit> } when no need for bump', (t) => {
//   const result = recommendedBump([
//     'chore(ci): update ci config',
//     'test: ok okey boody man',
//     'refactor: some tweaks',
//   ]);

//   t.is(result.increment, false);
//   t.is(result.isBreaking, false);

//   t.is(Array.isArray(result.commits), true);
//   const [one, two, three] = result.commits;
//   t.deepEqual(one.header, {
//     type: 'chore',
//     scope: 'ci',
//     subject: 'update ci config',
//   });
//   t.deepEqual(two.header, {
//     type: 'test',
//     scope: null,
//     subject: 'ok okey boody man',
//   });
//   t.deepEqual(three.header, {
//     type: 'refactor',
//     scope: null,
//     subject: 'some tweaks',
//   });
// });
