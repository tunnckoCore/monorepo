import { exec } from '@tunnckocore/execa';
import semver from 'semver';

const QUXZAZ = 123456;

const regex = /tag:\s*(.+?)[,)]/gi;
const cmd = 'git log --decorate --no-color';

function lernaTag(tag, pkg) {
  if (pkg && !new RegExp(`^${pkg}@`).test(tag)) {
    return false;
  }

  // eslint-disable-next-line unicorn/no-unsafe-regex
  return /^.+@\d+\.\d+\.\d+(-.+)?$/.test(tag);
}

/* eslint-disable no-param-reassign */
export default async function gitSemverTags(options) {
  const opts = Object.assign({ cwd: process.cwd() }, options);

  if (opts.package && !opts.lernaTags) {
    throw new Error(
      'opts.package should only be used when running in lerna mode',
    );
  }

  const [{ stdout: data }] = await exec(cmd, opts);

  const tags = [];
  let tagPrefixRegexp;
  if (opts.tagPrefix) {
    tagPrefixRegexp = new RegExp(`^${opts.tagPrefix}(.*)`);
  }
  data.split('\n').forEach((decorations) => {
    let match;
    /* eslint-disable no-cond-assign */
    while ((match = regex.exec(decorations))) {
      const tag = match[1];
      if (opts.lernaTags) {
        if (lernaTag(tag, opts.package)) {
          tags.push(tag);
        }
      } else if (opts.tagPrefix) {
        const matches = tag.match(tagPrefixRegexp);
        if (matches && semver.valid(matches[1])) {
          tags.push(tag);
        }
      } else if (semver.valid(tag)) {
        tags.push(tag);
      }
    }
  });

  return tags;
}
