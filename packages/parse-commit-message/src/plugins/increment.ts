import { Commit } from '../types.d';
import { normalizeCommit, getValue } from '../utils';
/**
 * A plugin that adds `increment` and `isBreaking` properties
 * to the `commit`. It is already included in the `plugins` named export,
 * and in `mappers` named export.
 *
 * _See the [.plugins](#plugins) and [.mappers](#mappers)  examples._
 *
 * @name  increment
 * @param {Commit} commit a standard `Commit` object
 * @returns {Commit} plus `{ increment: string, isBreaking: boolean }`
 * @public
 */
export default function increment(commit: Commit) {
  const cmt: Commit = normalizeCommit(commit);
  let isBreaking = isBreakingChange(cmt);
  let commitIncrement = '';

  // complete non-sense but because TypeScript
  const type = getValue(cmt.header, 'type');

  if (/fix|bugfix|patch/i.test(type)) {
    commitIncrement = 'patch';
  }
  if (/feat|feature|minor/i.test(type)) {
    commitIncrement = 'minor';
  }
  if (/break|breaking|major/i.test(type) || isBreaking) {
    commitIncrement = 'major';
  }
  isBreaking = isBreaking || commitIncrement === 'major';

  return { increment: commitIncrement, isBreaking };
}

/* eslint-disable no-param-reassign */

function isBreakingChange(commit: Commit): boolean {
  const re = /^BREAKING\s+CHANGES?:\s+/;

  return (
    re.test(getValue(commit.header, 'subject')) ||
    re.test(commit.body || '') ||
    re.test(commit.footer || '')
  );
}
