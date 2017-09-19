import * as program from "commander";
import { config } from "./commands/config";
import { install } from "./commands/install";
const pkg = require("../package.json");

program
  .version(pkg.version)
  .description("Protractor's Interactive CLI")
  .command("*", "", { noHelp: true, isDefault: true })
  .action(() => {
    program.help();
  });

const cliArgs = Object.assign(program, config, install);
cliArgs.parse(process.argv);

if (!cliArgs.args.length) {
  cliArgs.help();
}

/**
 * Public Interface
 */
export { program };
