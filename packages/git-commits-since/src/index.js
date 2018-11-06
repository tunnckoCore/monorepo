import gitRawCommits from 'git-raw-commits';
import detectNextVersion from 'detect-next-version';
import { parse, plugins } from 'parse-commit-message';
import getAllTags from '@tunnckocore/git-semver-tags';

export default async function gitCommitsSince(options) {
  const tags = await getAllTags(options);

  const opts = Object.assign({ from: tags[0] || '', to: '@' }, options);
  const rawCommits = [];
  const commits = [];

  const promise = new Promise((resolve, reject) => {
    const { cwd, from, to } = opts;

    gitRawCommits({ from, to }, { cwd })
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
        resolve({
          from: opts.from,
          to: opts.to,
          cwd: opts.cwd,
          rawCommits,
          commits,
          options: opts,
        });
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
