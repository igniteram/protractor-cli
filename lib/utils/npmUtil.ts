import {existsAsync} from '../helpers/fileHelper';
const {spawn} = require('child_process');
const chalk = require('chalk');

import * as path from 'path';

async function checkPackageJson() {
  const dir = path.resolve(process.cwd());
  const pkgJson = path.join(dir, 'package.json');
  if (!await (existsAsync(pkgJson))) {
    console.log(
        chalk.red('\nCould not find a package.json file! ') +
        chalk.green('Creating package.json...'));

    const initPkg = spawn('npm', ['init', '--yes'], {stdio: 'pipe'});

    let stderr = '';

    initPkg.stderr.on('data', (data: any) => {
      stderr += data;
    });

    initPkg.on('close', (code: number) => {
      if (code !== 0) {
        console.log(chalk.red(
            '\nUnable to create package.json! ' +
            `${stderr}`));
      }
    });
  }
}

async function installPkgs(des: string, packages: string[], opts: any) {
  return new Promise((resolve, reject) => {
    const args: string[] = ['--loglevel=error'];
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

    process.stdout.write('\n' + chalk.yellow(des) + '\n');

    const install = spawn('npm', cliArgs, {stdio: 'inherit'});

    install.on('error', (err: Error) => {
      if (err) {
        reject(err);
      }
    });

    install.on('exit', (code: any) => {
      if (code === 0) {
        resolve('successfully installed packages!');
      }
    });
  });
}

async function unInstallPkgs(des: string, packages: string[], opts: any) {
  return new Promise((resolve, reject) => {
    const args: string[] = ['--loglevel=error'];
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

    process.stdout.write('\n' + chalk.yellow(des) + '\n');

    const install = spawn('npm', cliArgs, {stdio: 'inherit'});

    install.on('error', (err: Error) => {
      if (err) {
        reject(err);
      }
    });

    install.on('exit', (code: any) => {
      if (code === 0) {
        resolve('successfully unInstalled packages!');
      }
    });
  });
}

async function updateWebdriver() {
  return new Promise((resolve, reject) => {
    process.stdout.write(
        chalk.yellow('\nDownloading chrome, firefox & internet explorer drivers...\n'));
    const install = spawn('webdriver-manager', ['update', '--ie'], {stdio: 'inherit'});

    install.on('error', (err: Error) => {
      if (err) {
        reject(err);
      }
    });

    install.on('exit', (code: any) => {
      if (code === 0) {
        resolve(`
${chalk.green('Protractor & Webdriver-Manager dependencies installed successfully!')}
${chalk.green('To start the selenium server, execute:')}
${chalk.green('$ webdriver-manager start')}
`);
      }
    });
  });
}

export {checkPackageJson, installPkgs, unInstallPkgs, updateWebdriver};
