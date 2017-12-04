const spawn = require('cross-spawn');
import * as chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

export class NpmUtil {
  public static checkPackageJson() {
    const dir = path.resolve(process.cwd());
    const pkgJson = path.join(dir, 'package.json');
    if (!fs.existsSync(pkgJson)) {
      console.log(
          chalk.red('\nCould not find a package.json file! ') +
          chalk.green('Creating package.json...'));
      spawn.sync('npm', ['init', '--yes'], {stdio: 'pipe'});
    }
    try {
      const fileJson = JSON.parse(fs.readFileSync(pkgJson, 'utf8'));
    } catch (e) {
      console.log(chalk.red(
          'Could not read package.json file. Please check that the file contains valid JSON.'));
      throw new Error(e);
    }
  }

  public static installPkgs =
      (des: any, packages: string[], opts: any) => {
        const args: string[] = [];
        if (opts.save) {
          args.push('-S');
        }
        if (opts.saveDev) {
          args.push('-D');
        }
        if (opts.global) {
          args.push('-g');
        }
        const cliArgs: string[] = ['i'].concat(args, packages);
        if (typeof des === 'string') {
          process.stdout.write('\n' + chalk.yellow(des) + '\n');
        } else {
          process.stdout.write('');
        }
        spawn.sync('npm', cliArgs, {stdio: 'pipe'});
      }

  public static unInstallPkgs =
      (des: any, packages: string[], opts: any) => {
        const args: string[] = [];
        if (opts.save) {
          args.push('-S');
        }
        if (opts.saveDev) {
          args.push('-D');
        }
        if (opts.global) {
          args.push('-g');
        }
        const cliArgs: string[] = ['uninstall'].concat(args, packages);
        if (typeof des === 'string') {
          process.stdout.write('\n' + chalk.yellow(des) + '\n');
        } else {
          process.stdout.write('');
        }
        spawn.sync('npm', cliArgs, {stdio: 'pipe'});
      }

  public static updateWebdriver = () => {
    process.stdout.write(
        chalk.yellow('\nDownloading chrome, firefox & internet explorer drivers...\n'));
    spawn.sync('webdriver-manager', ['update', '--ie'], {stdio: 'pipe'});
    console.log(`
${chalk.green('Protractor & Webdriver-Manager dependencies installed successfully!')}
${chalk.green('To start the selenium server, execute:')}

${chalk.green('$ webdriver-manager start')}
            `);
  }
}
