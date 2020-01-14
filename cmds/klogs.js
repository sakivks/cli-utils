const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function main() {
  const { stdout, stderr } = await exec('ls');
  console.log('stdout:', stdout);
  console.log({stderr});
}

module.exports = (args) => {
  main(args)
}