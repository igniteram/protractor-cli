const chalk = require('chalk');
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as jsBeautify from 'js-beautify';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
const tsconfig = require('../../templates/tsconfig.e2e.json');
import {promisify} from 'util';

const mkdirpAsync = promisify(mkdirp);
const readFileAsync = promisify(fs.readFile.bind(fs));
const writeFileAsync = promisify(fs.writeFile.bind(fs));

const cukeJsonFormatter: string = `json:./reports/cucumber_report.json`;
let beforeLaunchExpression: string;
let formatExpression: string;
let jasmineReportExpression: string;
let logExpression: string;
let mochaReportExpression: string;
let onCompleteExpression: string;
let onPrepareExpression: string;
let seleniumAddressExpression: string;
let seleniumServerJarExpression: string;
let transpilerExpression: string;
const tsconfigTypes: string[] = [];

function existsAsync(filePath: string) {
  let fulfill: any = null;
  const promise = new Promise((x) => {
    fulfill = x;
  });
  fs.access(filePath, (err) => {
    fulfill(!err);
  });
  return promise;
}

async function createDirectory(filepath: string) {
  if (filepath.indexOf('*') > -1) {
    filepath = filepath.substring(0, filepath.indexOf('*'));
  }
  const dirname = path.join(process.cwd(), filepath);
  try {
    if (!(await existsAsync(dirname))) {
      mkdirpAsync(dirname);
    }
  } catch (err) {
    throw new Error(err.toString());
  }
}

async function createTSconfigfile(options: string[]) {
  tsconfig.compilerOptions.types = tsconfig.compilerOptions.types.concat(options);
  try {
    await writeFileAsync(
        path.join(process.cwd(), './tsconfig.e2e.json'), JSON.stringify(tsconfig, null, 4));
  } catch (err) {
    throw new Error(err.toString());
  }
}

async function createTSLintFile() {
  try {
    await writeFileAsync(
        path.join(process.cwd(), './tslint.json'), JSON.stringify(tsconfig, null, 4));
  } catch (err) {
    throw new Error(err.toString());
  }
}

async function createESLintRCFile() {
  try {
    await writeFileAsync(
        path.join(process.cwd(), './.eslintrc.json'), JSON.stringify(tsconfig, null, 4));
  } catch (err) {
    throw new Error(err.toString());
  }
}

async function createConfigFile(answers: any) {
  if (answers.backend.indexOf('local machine') > -1) {
    if (!answers.drivers && !answers.webdriver) {
      seleniumServerJarExpression = `seleniumServerjar: '${answers.seleniumJar}',`;
      seleniumAddressExpression = `seleniumAddress: '${answers.seleniumAddress}',`;
    }
    if (answers.webdriver) {
      seleniumAddressExpression = `seleniumAddress: '${answers.seleniumAddress}',`;
    }
  } else if (answers.backend.indexOf('remote selenium server') > -1) {
    seleniumAddressExpression = `seleniumAddress: '${answers.host}',`;
  }
  if (answers.framework === 'jasmine') {
    if (answers.transpilerType === 'typescript') {
      tsconfigTypes.push('jasmine', 'jasminewd2');
      beforeLaunchExpression = `require('ts-node').register({
            project: './tsconfig.e2e.json'
         });`;
    }
    if (answers.reportType === 'spec') {
      jasmineReportExpression = `const {SpecReporter} = require('jasmine-spec-reporter');`;
      onPrepareExpression = `jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
              displayStacktrace: true
            }
          }));
          `;
    } else if (answers.reportType === 'html') {
      jasmineReportExpression =
          `const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');`;
      onPrepareExpression = `jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
            dest: 'target/screenshots',
            filename: 'protractor_jasmine_report.html'
          }));
              `;
    }
  }
  if (answers.framework === 'mocha') {
    if (answers.transpilerType === 'typescript') {
      tsconfigTypes.push('mocha');
      transpilerExpression = `'ts:ts-node/register'`;
    } else if (answers.transpilerType === 'coffeescript') {
      transpilerExpression = `'coffee:coffeescript/register'`;
    }
    if (answers.reportType === 'html') {
      mochaReportExpression = `'mochawesome',
        reporterOptions : {
            reportDir: './reports',
            reportFileName: 'protractor_mocha_report',
            enableCharts: true
        }`;
    } else {
      mochaReportExpression = answers.reportType;
    }
  }
  if (answers.framework === 'cucumber') {
    if (answers.transpilerType === 'typescript') {
      tsconfigTypes.push('cucumber');
      transpilerExpression = `'ts:ts-node/register'`;
    } else if (answers.transpilerType === 'coffeescript') {
      transpilerExpression = `'coffee:coffeescript/register'`;
    }
    formatExpression = answers.cucumberReportType;
    if (answers.cucumberReportType === 'json') {
      formatExpression = cukeJsonFormatter;
    }
    if (answers.cucumberReportType === 'html') {
      formatExpression = cukeJsonFormatter;
      onCompleteExpression = `const cucumberReporterOptions = {
                  theme: 'bootstrap',
                  jsonFile: './reports/cucumber_report.json',
                  output: process.cwd() + './reports/cucumber_reporter.html',
                  reportSuiteAsScenarios: true
                  };
          reporter.generate(cucumberReporterOptions);
    `;
    }
  }
  try {
    if (answers.specPath) {
      await createDirectory(answers.specs);
    }
    if (answers.featurePath) {
      await createDirectory(answers.specs);
      await createDirectory(answers.stepDefinitions);
    }
    if (answers.transpilerType === 'typescript') {
      await createTSconfigfile(tsconfigTypes);
    }
    if (answers.linter === 'tslint') {
      await createTSLintFile();
    }
    if (answers.linter === 'eslint-plugin-protractor') {
      await createESLintRCFile();
    }
  } catch (err) {
    throw new Error(err);
  }

  if (answers.logging === 'error') {
    logExpression = answers.logging.toUpperCase();
  } else if (answers.logging === 'warn') {
    logExpression = answers.logging.toUpperCase();
  } else if (answers.logging === 'debug') {
    logExpression = answers.logging.toUpperCase();
  } else {
    logExpression = 'INFO';
  }
  if (answers.createReportPath) {
    await createDirectory(answers.reportPath);
  }

  try {
    const templateData =
        await readFileAsync(path.join(__dirname, '../../templates/protractor.conf.ejs'), 'utf8');
    const renderedFile = ejs.render(templateData, {
      answers,
      beforeLaunchExpression,
      formatExpression,
      jasmineReportExpression,
      logExpression,
      mochaReportExpression,
      onCompleteExpression,
      onPrepareExpression,
      seleniumAddressExpression,
      seleniumServerJarExpression,
      transpilerExpression,
    });
    await writeFileAsync(
        path.join(process.cwd(), './protractor.conf.js'), jsBeautify(renderedFile));
    console.log(`
${chalk.green('Configuration file was created successfully!')}
${chalk.green('To run your tests, execute:')}
${chalk.green('$ protractor protractor.conf.js')}
`);
  } catch (err) {
    throw new Error(err.toString());
  }
}

export {existsAsync, createConfigFile};
