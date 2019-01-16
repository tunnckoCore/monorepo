// WHy tha heck does not recognizes the types?
import {
  applyPlugins,
  plugins,
  parse,
  check,
  Commit,
  Plugins,
} from 'parse-commit-message';

export type Commits = string | Array<string> | Array<Commit>;
export type BumpResult = {
  commits: Array<Commit>;
  increment: string | boolean;
  isBreaking: boolean;
  patch?: boolean;
  major?: boolean;
  minor?: boolean;
};

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
 * @param {string|Array<string>|Array<object>} commits commit messages one of `string`, `Array<string>` or `Array<Commit>`
 * @param {object} [options] pass additional `options.plugins` to be passed to [parse-commit-message][]
 * @returns {object} result like `{ increment: boolean | string, patch?, minor?, major? }`
 * @public
 */
export default function recommendedBump(
  commits: Commits,
  options?: { plugins: Plugins },
): BumpResult {
  const opts = Object.assign({ plugins: [] }, options);
  const allCommits = []
    // TODO: marker
    // @ts-ignore
    .concat(commits)
    .filter(Boolean)
    .reduce(
      (acc: any, cmt: any) =>
        acc.concat(
          applyPlugins(plugins.concat(opts.plugins), check(parse(cmt))),
        ),
      [],
    );

  const cmts: Array<Commit> = allCommits.filter((cmt: Commit) =>
    /major|minor|patch/.test(cmt.increment),
  );

  if (cmts.length === 0) {
    return { increment: false, commits: allCommits, isBreaking: false };
  }

  const categorized: BumpResult = cmts.reduce(
    (acc: BumpResult, cmt: Commit) => {
      // @ts-ignore
      acc[cmt.increment] = acc[cmt.increment] || [];
      // @ts-ignore
      acc[cmt.increment].push(cmt);

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
  categorized: BumpResult,
  commits: Commits,
): BumpResult {
  return Object.assign({}, categorized, {
    isBreaking: type === 'major',
    increment: type,
    commits,
  });
}
