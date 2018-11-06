import { parse, plugins } from 'parse-commit-message';

/**
 * Calculates recommended bump (next version), based on given `commitMessages`.
 * It always returns an object. If no commits are given it is `{ increment: false }`.
 * Otherwise it may contain `patch`, `minor`, or `major` properties which are
 * of `Array<Commit>` type, based on [parse-commit-message][].
 *
 * ProTip: Use `result[result.increment]` to get most meanigful result.
 *
 * See the tests and examples for more clarity.
 * It understands and follows [Conventional Commits Specification](https://www.conventionalcommits.org/).
 *
 * @example ts
 * type Commit = {
 *   header: {
 *     type: string,
 *     scope: string,
 *     subject: string,
 *     toString: Function,
 *   },
 *   body: string | null,
 *   footer: string | null
 * }
 *
 * @example
 * import recommendedBump from 'recommended-bump';
 *
 * async function main() {
 *   const commits = [
 *     'chore: foo bar baz',
 *     `fix(cli): some bugfix msg here
 *
 * Some awesome body.
 *
 * Great footer and GPG sign off, yeah!
 * Signed-off-by: Awesome footer <foobar@gmail.com>
 * `
 *   ];
 *
 *   const { increment, minor } = recommendedBump(commits);
 *
 *   console.log(increment); // => 'minor'
 *   console.log(minor);
 *   // => [{ header: { type, scope, subject, toString() }, body, footer }]
 *   console.log(minor[0].header.type); // => 'fix'
 *   console.log(minor[0].header.scope); // => 'cli'
 *   console.log(minor[0].header.subject); // => 'some bugfix msg here'
 *   console.log(minor[0].header.toString()); // => 'fix(cli): some bugfix msg here'
 *   console.log(minor[0].body); // => 'Some awesome body.'
 *   console.log(minor[0].footer);
 *   // => 'Great footer and GPG sign off, yeah!\nSigned-off-by: Awesome footer <foobar@gmail.com>'
 * }
 *
 * main().catch(console.error);
 *
 * @example
 * import { parse, plugins } from 'parse-commit-message';
 * import recommendedBump from 'recommended-bump';
 *
 * async function main() {
 *   const commitOne = parse('fix: foo bar', plugins);
 *   const commitTwo = parse('feat: some feature subject', plugins);
 *
 *   const result = recommendedBump([commitOne, commitTwo]);
 *   console.log(result.increment); // => 'minor'
 * }
 *
 * main().catch(console.error);
 *
 * @name recommendedBump
 * @param {string[]} commitMessages commit messages: one of `string`, `Array<string>` or `Array<Commit>`
 * @returns {object} result like `{ increment: boolean, patch?, minor?, major? }`
 * @public
 */
export default function recommendedBump(commitMessages) {
  const commits = []
    .concat(commitMessages)
    .filter(Boolean)
    .map((cmt) => (cmt && typeof cmt === 'object' ? cmt : parse(cmt, plugins)))
    .filter((cmt) => /major|minor|patch/.test(cmt.increment));

  if (commits.length === 0) return { increment: false };

  const categorized = commits.reduce((acc, cmt) => {
    acc[cmt.increment] = acc[cmt.increment] || [];
    acc[cmt.increment].push(cmt);

    return acc;
  }, {});

  if (categorized.major) {
    return { increment: 'major', ...categorized };
  }
  if (categorized.minor) {
    return { increment: 'minor', ...categorized };
  }

  // then it is `categorized.patch`
  return { increment: 'patch', ...categorized };
}
