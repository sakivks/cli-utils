const util = require("util");
const minimist = require("minimist");
const { exec, execFile } = require("child_process");
const execP = util.promisify(exec);
const clipboardy = require("clipboardy");

async function main(args) {
  try {
    const getPodscommand = `kubectl get pods -n ${args.n}`;
    console.log(getPodscommand);
    const { stdout: getPods } = await execP(getPodscommand);
    const pod = getPod(getPods);
    const getLogsCommand = `kubectl logs -f -n ${args.n} ${pod} ${args.n}`;
    console.log(getLogsCommand);
    clipboardy.writeSync(getLogsCommand);
    // const kubectlLogs = execFile(
    //   "./kubectlLogsCmd",
    //   [`${args.n} ${pod} ${args.n}`],
    //   { detached: true }
    // );
    // logIt(kubectlLogs);
  } catch (e) {
    console.log("something went wrong", { e });
  }
}

module.exports = argsPassed => {
  let args;
  if (!argsPassed) args = minimist(process.argv.slice(2));
  main(args);
};

const getPod = stdout => {
  return stdout.split("\n")[1].split(" ")[0];
};

const logIt = stream => {
  // console.log({ stream });
  stream.stdout.pipe(process.stdout);
  stream.stderr.pipe(process.stdout);
  stream.on("close", function(code, signal) {
    console.log("Goodbye!! " + `code ${code} and signal ${signal}`);
  });
};
