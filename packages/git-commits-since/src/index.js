import util from 'util';
import gitSemverTags from 'git-semver-tags';
import gitRawCommits from 'git-raw-commits';
import { parse, plugins } from 'parse-commit-message';
import detectNextVersion from 'detect-next-version';

const getAllTags = async () => util.promisify(gitSemverTags)();

export default async function gitCommitsSince(options) {
  const opts = Object.assign({}, options);
  const tags = await getAllTags();
  const rawCommits = [];
  const commits = [];
  const from = opts.from || tags[0] || '';
  const to = opts.to || '@';

  const promise = new Promise((resolve, reject) => {
    gitRawCommits(Object.assign({ from, to }, opts))
      .on('data', (res) => {
        const rawCommit = res.toString();
        const commit = parse(
          rawCommit,
          plugins.concat(opts.plugins).filter(Boolean),
        );

        rawCommits.push(rawCommit);
        commits.push(commit);
      })
      .on('error', reject)
      .on('end', () => {
        resolve({ from, to, rawCommits, commits, options: opts });
      });
  });

  return promise.then(async (result) => {
    if (typeof opts.name === 'string') {
      const res = await detectNextVersion(opts.name, commits);
      return Object.assign({}, result, res);
    }
    return result;
  });
}
