const browsers = ['chrome', 'firefox', 'internet explorer'];
const cloudServices = ['sauce labs', 'browserstack'];
const frameworks = ['jasmine', 'mocha', 'cucumber'];
const logType = ['info', 'error', 'warn', 'debug'];
const reportTypes = ['dot', 'spec', 'json', 'html'];
const cucumberReportTypes = ['progress', 'summary', 'json', 'html'];
const transpilers = ['typescript', 'coffee-script'];

const questions: any[] = [
  {
    default: 'http://localhost',
    message: 'What is the base url of your application?',
    name: 'baseURL',
    type: 'input',
  },
  {
    choices: [
      'My local machine',
      'In cloud services like Sauce Labs or Browserstack',
      'I know a remote selenium server',
    ],
    default: 'My local machine',
    message: 'What is your test environment?',
    name: 'backend',
    type: 'list',
  },
  {
    default: 'http://127.0.0.1:4444/wd/hub',
    message: 'What is the host address of that remote server?',
    name: 'host',
    type: 'input',
    when: (answers: any) => answers.backend.indexOf('remote selenium') > -1,
  },
  {
    choices: cloudServices,
    default: 'sauce labs',
    message: 'Please select the could service: ',
    name: 'services',
    type: 'list',
    when: (answers: any) => answers.backend.indexOf('In cloud services ') > -1,
  },
  {
    default: 'SAUCE_USERNAME',
    message: 'Environment variable for sauce labs username',
    name: 'sauceUser',
    type: 'input',
    when: (answers: any) => answers.services === 'sauce labs',
  },
  {
    default: 'SAUCE_ACCESS_KEY',
    message: 'Environment variable for sauce labs access key',
    name: 'sauceKey',
    type: 'input',
    when: (answers: any) => answers.services === 'sauce labs',
  },
  {
    default: 'BROWSER_STACK_USERNAME',
    message: 'Environment variable for Browserstack username',
    name: 'browserstackUser',
    type: 'input',
    when: (answers: any) => answers.services === 'browserstack',
  },
  {
    default: 'BROWSER_STACK_ACCESS_KEY',
    message: 'Environment variable for Browserstack access key',
    name: 'browserstackKey',
    type: 'input',
    when: (answers: any) => answers.services === 'browserstack',
  },
  {
    default: true,
    message: 'Do you want to use webdriver-manager\'s drivers?',
    name: 'webdriver',
    type: 'confirm',
    when: (answers: any) => answers.backend.indexOf('local machine') > -1,
  },
  {
    default: false,
    message: 'Do you want to use built in browser drivers?',
    name: 'drivers',
    type: 'confirm',
    when: (answers: any) => !answers.webdriver && answers.backend.indexOf('local machine') > -1,
  },
  {
    default: './selenium/*.jar',
    message: 'Please enter the selenium jar file location:',
    name: 'seleniumJar',
    type: 'input',
    when: (answers: any) =>
        !answers.drivers && !answers.webdriver && answers.backend.indexOf('local machine') > -1,
  },
  {
    default: 'http://localhost:4444/wd/hub',
    message: 'Please enter the local selenium server address:',
    name: 'seleniumAddress',
    type: 'input',
    when: (answers: any) => !answers.drivers && answers.backend.indexOf('local machine') > -1,
  },
  {
    choices: browsers,
    default: 'chrome',
    message: 'Select the choice of your browser:',
    name: 'browser',
    type: 'list',
  },
  {
    choices: frameworks,
    default: 'jasmine',
    message: 'Which framework do you want to use?',
    name: 'framework',
    type: 'list',
  },
  {
    default: true,
    message: 'Do you want to use typescript transpiler?',
    name: 'jasmineTStranspiler',
    type: 'confirm',
    when: (answers: any) => answers.framework === 'jasmine',
  },
  {
    default: true,
    message: 'Do you want to use a transpiler?',
    name: 'transpiler',
    type: 'confirm',
    when: (answers: any) => answers.framework.match(/(mocha|cucumber)/),
  },
  {
    choices: transpilers,
    default: 'typescript',
    message: 'Please select the transpiler:',
    name: 'transpilerType',
    type: 'list',
    when: (answers: any) => answers.transpiler,
  },
  {
    default: (answers: any) => {
      if (answers.jasmineTStranspiler || answers.transpilerType === 'typescript') {
        return './test/specs/**/*.ts';
      } else if (answers.transpilerType === 'coffee-script') {
        return './test/specs/**/*.coffee';
      } else {
        return './test/specs/**/*.js';
      }
    },
    message: 'Where are your test specs located?',
    name: 'specs',
    type: 'input',
    when: (answers: any) => answers.framework.match(/(jasmine|mocha)/),
  },
  {
    default: true,
    message: (answers: any) => {
      let folderPath: string;
      if (answers.specs.indexOf('*') > -1) {
        folderPath = answers.specs.substring(0, answers.specs.indexOf('*'));
      }
      return `Do you want to create ${folderPath} folder?`;
    },
    name: 'specPath',
    type: 'confirm',
    when: (answers: any) => answers.framework.match(/(jasmine|mocha)/),

  },
  {
    default: './features/**/*.feature',
    message: 'Where are your feature files located?',
    name: 'specs',
    type: 'input',
    when: (answers: any) => answers.framework === 'cucumber',
  },
  {
    default: (answers: any) => {
      if (answers.transpilerType === 'typescript') {
        return './features/stepDefinitions/**/*.ts';
      } else if (answers.transpilerType === 'coffee-script') {
        return './features/stepDefinitions/**/*.coffee';
      } else {
        return './features/stepDefinitions/**/*.js';
      }
    },
    message: 'Where are your step definitions located?',
    name: 'stepDefinitions',
    type: 'input',
    when: (answers: any) => answers.framework === 'cucumber',
  },
  {
    default: true,
    message: 'Do you want to create the above folders?',
    name: 'featurePath',
    type: 'confirm',
    when: (answers: any) => answers.framework === 'cucumber',

  },
  {
    choices: logType,
    default: 'info',
    message: 'Level of logging verbosity:',
    name: 'logging',
    type: 'list',
  },
  {
    default: true,
    message: 'Do you want to generate reports of your tests?',
    name: 'reports',
    type: 'confirm',
  },
  {
    choices: reportTypes,
    default: 'dot',
    message: 'Please select the type of report:',
    name: 'reportType',
    type: 'list',
    when: (answers: any) => answers.reports && answers.framework.match(/(jasmine|mocha)/),
  },
  {
    choices: cucumberReportTypes,
    default: 'progress',
    message: 'Please select the type of report:',
    name: 'cucumberReportType',
    type: 'list',
    when: (answers: any) => answers.reports && answers.framework === 'cucumber',
  },
  {
    default: './reports',
    message: 'Where do you want to store your reports?',
    name: 'reportPath',
    type: 'input',
    when: (answers: any) => answers.reports,
  },
  {
    default: true,
    message: (answers: any) => {
      return `Do you want to create ${answers.reportPath} folder?`;
    },
    name: 'createReportPath',
    type: 'confirm',
    when: (answers: any) => answers.reports,
  },
];

/**
 * Public Inteface
 */
export {questions};
