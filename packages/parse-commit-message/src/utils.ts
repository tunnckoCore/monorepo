import dedent from 'dedent';

export type Result = {
  error?: Error;
  value?: any;
};

export function tryCatch(fn: Function, ret: any) {
  const result: Result = {};
  try {
    result.value = fn();
  } catch (err) {
    result.error = err;
  }

  return ret ? result : !result.error;
}

export const errorMsg = dedent`parse-commit-message: expect \`commit\` to follow:
<type>[optional scope]: <description>

[optional body]

[optional footer]`;

export function isObject(val: any) {
  return val && typeof val === 'object' && !Array.isArray(val);
}

export function isValidString(x?: string) {
  return Boolean(x && typeof x === 'string' && x.length > 0);
}
