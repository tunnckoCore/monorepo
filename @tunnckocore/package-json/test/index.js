import test from 'asia';
import packageJson from '../src';

test('should get package metadata from UNPKG by default', async (t) => {
  const pkg = await packageJson('@tunnckocore/package-json');

  t.strictEqual(pkg.name, '@tunnckocore/package-json');
});

test('get package metadata from npm registry', async (t) => {
  const endpoint = (name, tag) => `https://registry.npmjs.org/${name}/${tag}`;
  const pkg = await packageJson('package-json@4.0.0', endpoint);

  t.strictEqual(pkg.name, 'package-json');
});
