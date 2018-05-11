const chalk = require('chalk');
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as jsBeautify from 'js-beautify';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
const eslint = require('../../templates/.eslintrc.json');
const tsconfig = require('../../templates/tsconfig.e2e.json');
const tslint = require('../../templates/tslint.json');

export class FileHelper {
  public static createDirectory(filepath: string) {
    if (filepath.indexOf('*') > -1) {
      filepath = filepath.substring(0, filepath.indexOf('*'));
    }
    const dirname = path.join(process.cwd(), filepath);
    if (!fs.existsSync(dirname)) {
      mkdirp.sync(dirname);
    }
  }
  private readonly cukeJsonFormatter: string = `json:./reports/cucumber_report.json`;
  private beforeLaunchExpression: string;
  private formatExpression: string;
  private jasmineReportExpression: string;
  private logExpression: string;
  private mochaReportExpression: string;
  private onCompleteExpression: string;
  private onPrepareExpression: string;
  private renderedFile: any;
  private seleniumAddressExpression: string;
  private seleniumServerJarExpression: string;
  private transpilerExpression: string;
  private tmplFile: any;
  private tsconfigTypes: string[] = [];

  public createConfigFile(answers: any) {
    if (answers.backend.indexOf('local machine') > -1) {
      if (!answers.drivers && !answers.webdriver) {
        this.seleniumServerJarExpression = `seleniumServerjar: '${answers.seleniumJar}',`;
        this.seleniumAddressExpression = `seleniumAddress: '${answers.seleniumAddress}',`;
      }
      if (answers.webdriver) {
        this.seleniumAddressExpression = `seleniumAddress: '${answers.seleniumAddress}',`;
      }
    } else if (answers.backend.indexOf('remote selenium server') > -1) {
      this.seleniumAddressExpression = `seleniumAddress: '${answers.host}',`;
    }
    if (answers.framework === 'jasmine') {
      if (answers.transpilerType === 'typescript') {
        this.tsconfigTypes.push('jasmine', 'jasminewd2');
        this.beforeLaunchExpression = `require('ts-node').register({
            project: './tsconfig.e2e.json'
         });`;
      }
      if (answers.reportType === 'spec') {
        this.jasmineReportExpression = `const {SpecReporter} = require('jasmine-spec-reporter');`;
        this.onPrepareExpression = `jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
              displayStacktrace: true
            }
          }));
          `;
      } else if (answers.reportType === 'html') {
        this.jasmineReportExpression =
            `const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');`;
        this.onPrepareExpression = `jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
            dest: 'target/screenshots',
            filename: 'protractor_jasmine_report.html'
          }));
              `;
      }
    }
    if (answers.framework === 'mocha') {
      if (answers.transpilerType === 'typescript') {
        this.tsconfigTypes.push('mocha');
        this.transpilerExpression = `'ts:ts-node/register'`;
      } else if (answers.transpilerType === 'coffeescript') {
        this.transpilerExpression = `'coffee:coffeescript/register'`;
      }
      if (answers.reportType === 'html') {
        this.mochaReportExpression = `'mochawesome',
        reporterOptions : {
            reportDir: './reports',
            reportFileName: 'protractor_mocha_report',
            enableCharts: true
        }`;
      } else {
        this.mochaReportExpression = answers.reportType;
      }
    }
    if (answers.framework === 'cucumber') {
      if (answers.transpilerType === 'typescript') {
        this.tsconfigTypes.push('cucumber');
        this.transpilerExpression = `'ts:ts-node/register'`;
      } else if (answers.transpilerType === 'coffeescript') {
        this.transpilerExpression = `'coffee:coffeescript/register'`;
      }
      this.formatExpression = answers.cucumberReportType;
      if (answers.cucumberReportType === 'json') {
        this.formatExpression = this.cukeJsonFormatter;
      }
      if (answers.cucumberReportType === 'html') {
        this.formatExpression = this.cukeJsonFormatter;
        this.onCompleteExpression = `const cucumberReporterOptions = {
                  theme: 'bootstrap',
                  jsonFile: './reports/cucumber_report.json',
                  output: process.cwd() + './reports/cucumber_reporter.html',
                  reportSuiteAsScenarios: true
                  };
          reporter.generate(cucumberReporterOptions);
    `;
      }
    }
    if (answers.specPath) {
      FileHelper.createDirectory(answers.specs);
    }
    if (answers.featurePath) {
      FileHelper.createDirectory(answers.specs);
      FileHelper.createDirectory(answers.stepDefinitions);
    }
    if (answers.transpilerType === 'typescript') {
      this.createTSconfigfile(this.tsconfigTypes);
    }
    if (answers.linter === 'tslint') {
      this.createTSLintFile();
    }
    if (answers.linter === 'eslint-plugin-protractor') {
      this.createESLintRCFile();
    }
    if (answers.logging === 'error') {
      this.logExpression = answers.logging.toUpperCase();
    } else if (answers.logging === 'warn') {
      this.logExpression = answers.logging.toUpperCase();
    } else if (answers.logging === 'debug') {
      this.logExpression = answers.logging.toUpperCase();
    } else {
      this.logExpression = 'INFO';
    }
    if (answers.createReportPath) {
      FileHelper.createDirectory(answers.reportPath);
    }
    this.tmplFile =
        fs.readFileSync(path.join(__dirname, '../../templates/protractor.conf.ejs'), 'utf8');
    this.renderedFile = ejs.render(this.tmplFile, {
      answers,
      beforeLaunchExpression: this.beforeLaunchExpression,
      formatExpression: this.formatExpression,
      jasmineReportExpression: this.jasmineReportExpression,
      logExpression: this.logExpression,
      mochaReportExpression: this.mochaReportExpression,
      onCompleteExpression: this.onCompleteExpression,
      onPrepareExpression: this.onPrepareExpression,
      seleniumAddressExpression: this.seleniumAddressExpression,
      seleniumServerJarExpression: this.seleniumServerJarExpression,
      transpilerExpression: this.transpilerExpression,
    });
    fs.writeFileSync(
        path.join(process.cwd(), './protractor.conf.js'), jsBeautify(this.renderedFile));
    console.log(`
${chalk.green('Configuration file was created successfully!')}
${chalk.green('To run your tests, execute:')}

${chalk.green('$ protractor protractor.conf.js')}
        `);
  }

  private createTSconfigfile(options: string[]) {
    tsconfig.compilerOptions.types = tsconfig.compilerOptions.types.concat(options);
    fs.writeFileSync(
        path.join(process.cwd(), './tsconfig.e2e.json'), JSON.stringify(tsconfig, null, 4));
  }

  private createTSLintFile() {
    fs.writeFileSync(path.join(process.cwd(), './tslint.json'), JSON.stringify(tslint, null, 4));
  }

  private createESLintRCFile() {
    fs.writeFileSync(path.join(process.cwd(), './.eslintrc.json'), JSON.stringify(eslint, null, 4));
  }
}
