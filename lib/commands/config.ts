const chalk = require('chalk');
import * as inquirer from 'inquirer';
import {program} from '../cli';
import {createConfigFile} from '../helpers/fileHelper';
import {installModules} from '../helpers/moduleHelper';
import {questions} from '../helpers/questions';

program.command('config')
    .alias('c')
    .description('Starts protractor\'s interactive cli')
    .action(async () => {
      if (!process.argv.slice(3).length) {
        console.log(`
============================
${chalk.red.bold('PROTRACTOR\'s INTERACTIVE CLI')}
============================

`);
        const answers = await inquirer.prompt(questions);
        try {
          await installModules(answers);
        } catch (err) {
          throw new Error(err);
        }
        await createConfigFile(answers);

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
