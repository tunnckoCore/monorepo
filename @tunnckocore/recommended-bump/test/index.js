import test from 'asia';
import { parse, plugins } from 'parse-commit-message';
import recommendedBump from '../src';

test('should recommend major', (t) => {
  const commits = [
    'fix(bar): quxxxxxxxx',
    'major: foo bar baz',
    'feat: some awesome feature',
    'fix: yeah great bugfix',
  ];

  const result = recommendedBump(commits);
  t.strictEqual(result.increment, 'major');

  t.ok(result.major);
  t.ok(result.minor);
  t.ok(result.patch);

  t.ok(Array.isArray(result.major));
  t.ok(Array.isArray(result.minor));
  t.ok(Array.isArray(result.patch));

  t.strictEqual(result.major.length, 1);
  t.strictEqual(result.minor.length, 1);
  t.strictEqual(result.patch.length, 2);

  t.strictEqual(result.major[0].header.type, 'major');
  t.strictEqual(result.major[0].header.scope, '');
  t.strictEqual(result.major[0].header.subject, 'foo bar baz');
  t.strictEqual(result.major[0].header.toString(), 'major: foo bar baz');
});

test('should recommend major when detect `BREAKING CHANGE:` somewhere', (t) => {
  const commits = [
    `fix: some awesome new major

BREAKING CHANGE: this is breaking, watch out!

Signed-off-by: Charlike Mike Reagent`,
    'feat: wooh hooo',
  ];
  const { major, increment } = recommendedBump(commits);

  t.strictEqual(increment, 'major');
  t.strictEqual(major[0].header.toString(), 'fix: some awesome new major');
  t.strictEqual(major[0].body, 'BREAKING CHANGE: this is breaking, watch out!');
  t.strictEqual(major[0].footer, 'Signed-off-by: Charlike Mike Reagent');
});

test('should recommend minor', (t) => {
  const { increment, minor } = recommendedBump([
    'fix(cli): okkkk',
    'feat(duh): yeapp',
    'chore: some non src changes',
  ]);

  t.strictEqual(increment, 'minor');
  t.strictEqual(minor[0].header.toString(), 'feat(duh): yeapp');
});

test('should recommend patch', (t) => {
  const { increment, patch } = recommendedBump([
    'chore(cli): okkkk',
    'chore(duh): yeapp',
    'fix: yeah some awesome bugfix',
  ]);

  t.strictEqual(increment, 'patch');
  t.strictEqual(patch[0].header.toString(), 'fix: yeah some awesome bugfix');
});

test('should return {increment: false} when no commits', (t) => {
  t.deepStrictEqual(recommendedBump(), { increment: false });
});

test('should be able to accept Array of Commit objects as commits', (t) => {
  const commitOne = parse('fix: foo bar baz', plugins);
  const commitTwo = parse('feat: quxie', plugins);

  const result = recommendedBump([commitOne, commitTwo]);
  t.strictEqual(result.increment, 'minor');
});
