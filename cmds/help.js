const menus = {
  main: `
    cu [container name] <options>

    klogs .............. shows kubectl logs for a namespace
    version ............ show package version
    help ............... show help menu for a command`,

  klogs: `
    cu klogs <options>

    -n ..... the namespace to use`
};

module.exports = args => {
  const subCmd = args._[0] === "help" ? args._[1] : args._[0];

  console.log(menus[subCmd] || menus.main);
};
