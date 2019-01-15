import gitRawCommits from 'git-raw-commits';
import getAllTags from '@tunnckocore/git-semver-tags';

/**
 * Gets all commits since given `options.from` or since last semver tag (by default).
 * In return you will get useful metadata and `rawCommits`.
 * Where `rawCommits` is an array of commit message strings. Optionally you can pass
 * a `options.plugin` functin which is passed with `(rawCommit: string, result: object)`
 * signature and will be called on each commit. This behavior can be used
 * to do fun stuff on per each project basis. Such as parsing each rawCommit or whatever.
 *
 * @example
 * import gitCommitsSince from 'git-commits-since';
 *
 * async function main() {
 *   const result = await gitCommitsSince({ cwd: 'path/to/git/repository' });
 *
 *   console.log(result);
 *   // the @ means HEAD or the latest commit
 *   // => { from: 'v0.1.0', to: '@', cwd: 'path/to/cwd', rawCommits, options }
 * }
 *
 * main().catch(console.error);
 *
 * @example
 * import gitCommitsSince from 'git-commits-since';
 *
 * // Using the plugin API
 * async function main() {
 *   const plugin = (rawCommitString, result) => {
 *     console.log(rawCommitString);
 *     // log each commit
 *
 *     result.qux = 12345;
 *
 *     return { foo: 'bar' };
 *   };
 *
 *   const res = await gitCommitsSince({ plugin });
 *   console.log(res);
 *   console.log(res.rawCommits);
 *   console.log(res.foo); // => 'bar'
 *   console.log(res.qux); // => 12345
 * }
 *
 * main().catch(console.error);
 *
 * @name  gitCommitsSince
 * @param {object} options basically passed to [git-raw-commits][] and [git-semver-tags][]
 * @returns {Promise<object>} resolves to an object with `{ from, to, cwd, rawCommits }`
 * @public
 */
export default async function gitCommitsSince(options) {
  const tags = await getAllTags(options);

  const opts = Object.assign({ from: tags[0] || '', to: '@' }, options);

  let result = {
    from: opts.from,
    to: opts.to,
    cwd: opts.cwd,
    rawCommits: [],
    options: opts,
  };

  const promise = new Promise((resolve, reject) => {
    const { cwd, from, to } = opts;

    gitRawCommits({ from, to }, { cwd })
      .on('data', (res) => {
        const rawCommit = res.toString();
        result.rawCommits.push(rawCommit.trim());

        if (typeof opts.plugin === 'function') {
          result = Object.assign({}, result, opts.plugin(rawCommit, result));
        }
      })
      .on('error', reject)
      .on('end', () => {
        resolve(result);
      });
  });

  return promise;
}
