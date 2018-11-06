import { parse, plugins } from 'parse-commit-message';

/* eslint-disable consistent-return */

export default function recommendedBump(commitMessages) {
  const commits = []
    .concat(commitMessages)
    .filter(Boolean)
    .map((cmt) => parse(cmt, plugins))
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
  if (categorized.patch) {
    return { increment: 'patch', ...categorized };
  }
}
