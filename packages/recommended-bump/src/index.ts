import {
  applyPlugins,
  plugins,
  parse,
  check,
  Commit,
} from 'parse-commit-message';

import {
  Commits,
  RecommendedBumpResult,
  RecommendedBumpOptions,
} from './types';

export * from './types';

/**
 * Calculates recommended bump (next version), based on given `commits`.
 * It always returns an object. If no commits are given it is `{ increment: false }`.
 * Otherwise it may contain `patch`, `minor`, or `major` properties which are
 * of `Array<Commit>` type, based on [parse-commit-message][].
 *
 * ProTip: Use `result[result.increment]` to get most meanigful result.
 *
 * Each item passed as `commits` is validated against the Convetional Comits Specification
 * and using [parse-commit-message][]. Commits can be string, array of commit message strings,
 * array of objects (of [type Commit as defined](https://github.com/tunnckoCoreLabs/parse-commit-message#type-definitions)) or mix of previous
 * posibilities.
 *
 * See the tests and examples for more clarity.
 *
 * @example
 * import recommendedBump from 'recommended-bump';
 *
 * const commits = [
 *   'chore: foo bar baz',
 *   `fix(cli): some bugfix msg here
 *
 * Some awesome body.
 *
 * Great footer and GPG sign off, yeah!
 * Signed-off-by: Awesome footer <foobar@gmail.com>`
 *   ];
 *
 * const { increment, isBreaking, patch } = recommendedBump(commits);
 *
 * console.log(isBreaking); // => false
 * console.log(increment); // => 'patch'
 * console.log(patch);
 * // => [{ header: { type, scope, subject }, body, footer }, { ... }]
 * console.log(patch[0].header.type); // => 'fix'
 * console.log(patch[0].header.scope); // => 'cli'
 * console.log(patch[0].header.subject); // => 'some bugfix msg here'
 * console.log(patch[0].body); // => 'Some awesome body.'
 * console.log(patch[0].footer);
 * // => 'Great footer and GPG sign off, yeah!\nSigned-off-by: Awesome footer <foobar@gmail.com>'
 *
 * @example
 * import { parse } from 'parse-commit-message';
 * import recommendedBump from 'recommended-bump';
 *
 * const commitOne = parse('fix: foo bar');
 * const commitTwo = parse('feat: some feature subject');
 *
 * const result = recommendedBump([commitOne, commitTwo]);
 * console.log(result.increment); // => 'minor'
 * console.log(result.isBreaking); // => false
 * console.log(result.minor); // => [{ ... }]
 *
 * @name recommendedBump
 * @param {string|Commit|Array<Commit>|Array<string>} commits commit messages one of `string`, `Commit`, `Array<string>` or `Array<Commit>`
 * @param {object} [options] pass additional `options.plugins` to be passed to [parse-commit-message][]
 * @returns {object} result like `{ increment: boolean | string, patch?, minor?, major? }` of type `BumpResult`
 * @public
 */
export default function recommendedBump(
  commits: Commits,
  options?: RecommendedBumpOptions,
): RecommendedBumpResult {
  const opts = Object.assign({ plugins: [] }, options);

  // weird problems today with typescript and eslint
  // some non logical problems with the arrayify/toArray
  // so this is the workaround
  const arr: Array<any> = [];

  const allCommits = arr
    .concat(commits)
    .filter(Boolean)
    .reduce(
      (acc: any, cmt: string | Commit) =>
        acc.concat(
          applyPlugins(plugins.concat(opts.plugins), check(parse(cmt))),
        ),
      [],
    );

  const cmts: Array<Commit> = allCommits.filter((cmt: Commit) => {
    if (typeof cmt.increment === 'string') {
      return /major|minor|patch/.test(cmt.increment);
    }
    return false;
  });

  if (cmts.length === 0) {
    return { increment: false, commits: allCommits, isBreaking: false };
  }

  const categorized: RecommendedBumpResult = cmts.reduce(
    (acc: RecommendedBumpResult | any, cmt: Commit) => {
      if (cmt.increment && typeof cmt.increment !== 'boolean') {
        acc[cmt.increment] = acc[cmt.increment] || [];
        acc[cmt.increment].push(cmt);
      }

      return acc;
    },
    {},
  );

  if (categorized.major) {
    return createReturn('major', categorized, allCommits);
  }
  if (categorized.minor) {
    return createReturn('minor', categorized, allCommits);
  }

  return createReturn('patch', categorized, allCommits);
}

function createReturn(
  type: boolean | string,
  categorized: RecommendedBumpResult,
  commits: Array<Commit>,
): RecommendedBumpResult {
  return Object.assign({}, categorized, {
    isBreaking: type === 'major',
    increment: type,
    commits,
  });
}
