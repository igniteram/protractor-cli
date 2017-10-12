import * as chalk from 'chalk';
import * as inquirer from 'inquirer';
import {program} from '../cli';
import {NpmUtil} from '../utils/npmUtil';
const pkgs = ['protractor', 'webdriver-manager'];

program.command('install')
    .alias('i')
    .description('Installs protractor and webdriver dependencies globally!')
    .action(() => {
      if (!process.argv.slice(3).length) {
        NpmUtil.checkPackageJson();
        NpmUtil.installPkgs(
            'Installing Protractor & Webdriver-Manager Pkgs...', pkgs, {global: true});
        NpmUtil.updateWebdriver();
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
