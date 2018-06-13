const chalk = require('chalk');

import {program} from '../cli';
import {checkPackageJson, installPkgs, updateWebdriver} from '../utils/npmUtil';
const pkgs = ['protractor', 'webdriver-manager'];

program.command('install')
    .alias('i')
    .description('Installs protractor and webdriver dependencies globally!')
    .action(async () => {
      if (!process.argv.slice(3).length) {
        try {
          await checkPackageJson();
          await installPkgs(
              'Installing Protractor & Webdriver-Manager Pkgs Globally!...', pkgs, {global: true});
          const updateWd: any = await updateWebdriver();
          console.log(updateWd);
        } catch (err) {
          throw new Error(err);
        }
      } else {
        console.error(chalk.red(`
${'Install command doesn\'t have any arguments! Try running the command only!'}`));
        process.exit(0);
      }
    });

/**
 * Public Interface
 */
export const install = {program};
