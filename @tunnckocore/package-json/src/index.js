import parse from 'parse-package-name';
import axios from 'axios';

// packageName: String, endpoint: (name: String, tag: String = 'latest'): String => {}
export default async function packageJson(packageName, endpoint) {
  const { name, version } = parse(packageName);
  const tag = version === '' ? 'latest' : version;
  const url =
    typeof endpoint === 'function'
      ? endpoint(name, tag)
      : `https://unpkg.com/${name}@${tag}/package.json`;

  return axios.get(url).then((res) => res.data);
}
