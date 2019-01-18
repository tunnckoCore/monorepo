import dedent from 'dedent';
import { Header, Commit } from './types';

export const errorMsg = dedent`parse-commit-message: expect \`commit\` to follow:
<type>[optional scope]: <description>

[optional body]

[optional footer]`;

export function isValidString(x?: string) {
  return Boolean(x && typeof x === 'string' && x.length > 0);
}

export function stringToHeader(val: string, caseSensitive?: boolean): Header {
  const sensitive = caseSensitive || false;
  /* eslint-disable unicorn/no-unsafe-regex */
  const regex = sensitive
    ? /^(\w+)(?:\((.+)\))?: (.+)/
    : /^(\w+)(?:\((.+)\))?: (.+)/i;

  if (!regex.test(val)) {
    throw new TypeError(errorMsg);
  }

  // Wtf? There's no RegExp type?
  // @ts-ignore
  const matches = regex.exec(val).slice(1);

  if (!matches) {
    throw new Error(errorMsg);
  }
  const [type, scope = null, subject] = matches;

  return {
    type,
    scope,
    subject,
  };
}

export function normalizeCommit(commit: Commit) {
  const { header } = commit;
  if (header && typeof header === 'object' && 'value' in header) {
    return Object.assign({}, commit, { header: stringToHeader(header.value) });
  }
  return commit;
}

// ! Bypass TypeScript shits
// ! complete non-sense but because TypeScript
export function getValue(obj: any, key: string) {
  return key in obj ? obj[key] : '';
}

export function toArray(val: any) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return [val];
}
