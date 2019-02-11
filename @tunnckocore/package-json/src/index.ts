import nodeFetch from 'node-fetch';

// @ts-ignore
import parse from 'parse-package-name';

/**
 * Get package metadata from the Unpkg instead of NPM registry.
 * Optionally you can pass `endpoint` function and return the build
 * the registry url. See the second test in `test/index.js`.
 *
 * @example
 * import packageJson from '@tunnckocore/package-json';
 *
 * async function main() {
 *   console.log(await packageJson('eslint'));
 *   console.log(await packageJson('package-json@4.0.0'));
 *   console.log(await packageJson('ava@next'));
 * }
 *
 * main().catch(console.error);
 *
 * @name  packageJson
 * @param {string} packageName the package name, supports `pkg-name@1.2.2` and `pkg-name@next`
 * @param {function} endpoint like `(name, tag) => url`
 * @returns {object} package metadata object
 * @public
 */
export default async function packageJson(
  packageName: string,
  endpoint?: (name: string, tag: string) => string,
) {
  const { name, version } = parse(packageName);
  const tag = version === '' ? 'latest' : version;

  const url =
    typeof endpoint === 'function'
      ? endpoint(name, tag)
      : `https://unpkg.com/${name}@${tag}/package.json`;

  return nodeFetch(url).then((res) => res.json());
}
