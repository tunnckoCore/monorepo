const git = require('git-commits-since');

async function main() {
  const res = await git({ cwd: process.cwd(), lernaTags: true });
  console.log(res);
}

main();
