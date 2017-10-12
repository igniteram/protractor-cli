import * as chalk from 'chalk';
import * as inquirer from 'inquirer';
import {program} from '../cli';
import {FileHelper} from '../helpers/fileHelper';
import {installModules} from '../helpers/moduleHelper';
import {questions} from '../helpers/questions';

program.command('config')
    .alias('c')
    .description('Starts protractor\'s interactive cli')
    .action((options) => {
      if (!process.argv.slice(3).length) {
        console.log(`
============================
${chalk.red.bold('PROTRACTOR\'s INTERACTIVE CLI')}
============================

`);
        return inquirer.prompt(questions).then((answers: any) => {
          installModules(answers);
          new FileHelper().createConfigFile(answers);
        });
      } else {
        console.error(chalk.red(`
${'Config command doesn\'t have any arguments! Try running the command only!'}`));
        process.exit(0);
      }
    });

/**
 * Public Interface
 */
export const config = {program};
