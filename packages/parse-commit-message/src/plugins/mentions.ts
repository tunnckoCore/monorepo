// @ts-ignore
import getMentions from 'collect-mentions';

import { normalizeCommit, getValue } from '../utils';
import { Commit } from '../types.d';

/**
 * A plugin that adds `mentions` array property to the `commit`.
 * It is already included in the `plugins` named export,
 * and in `mappers` named export.
 * Basically each entry in that array is an object,
 * directly returned from the [collect-mentions][].
 *
 * _See the [.plugins](#plugins) and [.mappers](#mappers)  examples._
 *
 * @name  mentions
 * @param {Commit} commit a standard `Commit` object
 * @returns {Commit} plus `{ mentions: Array<Mention> }`
 * @public
 */
export default function mentions(commit: Commit) {
  const cmt = normalizeCommit(commit);

  const commitMentions = []
    .concat(getMentions(getValue(cmt.header, 'subject')))
    .concat(getMentions(cmt.body))
    .concat(getMentions(cmt.footer));

  return { mentions: commitMentions };
}
