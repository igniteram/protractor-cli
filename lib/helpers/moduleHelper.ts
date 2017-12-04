import {NpmUtil} from '../utils/npmUtil';

// install protractor by default as save dependency
const devModules: string[] = ['protractor'];

const installModules = (answers: any) => {

  if (answers.framework === 'jasmine') {
    if (answers.jasmineTStranspiler) {
      devModules.push('typescript', '@types/node', '@types/jasmine', 'ts-node');
    }
    if (answers.reportType === 'spec') {
      devModules.push('jasmine-spec-reporter');
    }
    if (answers.reportType === 'html') {
      devModules.push('protractor-jasmine2-screenshot-reporter');
    }
  }
  if (answers.framework === 'mocha') {
    if (answers.transpiler) {
      if (answers.transpilerType === 'typescript') {
        devModules.push('typescript', '@types/node', '@types/mocha', 'ts-node');
      } else {
        devModules.push('coffee-script');
      }
    }
    if (answers.reportType === 'html') {
      devModules.push('mochawesome');
    }
  }
  if (answers.framework === 'cucumber') {
    devModules.push('cucumber', 'protractor-cucumber-framework');
    if (answers.transpiler) {
      if (answers.transpilerType === 'typescript') {
        devModules.push('typescript', '@types/node', '@types/cucumber', 'ts-node');
      } else {
        devModules.push('coffee-script');
      }
    }
    if (answers.cucumberReportType === 'html') {
      devModules.push('cucumber-html-reporter');
    }
  }

  if (devModules.length > 0) {
    NpmUtil.checkPackageJson();
    NpmUtil.installPkgs('Installing dev dependencies...', devModules, {
      saveDev: true,
    });
  }
};

/**
 * Public Interface
 */
export {installModules, devModules};
