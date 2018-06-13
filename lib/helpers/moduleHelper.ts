import {checkPackageJson, installPkgs} from '../utils/npmUtil';

// install protractor by default as dev dependency
const devModules: string[] = ['protractor'];

async function installModules(answers: any) {
  if (answers.framework === 'jasmine') {
    if (answers.transpilerType === 'typescript') {
      devModules.push('typescript', '@types/node', '@types/jasmine', 'ts-node');
    } else if (answers.transpilerType === 'coffeescript') {
      devModules.push('coffeescript');
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
      } else if (answers.transpilerType === 'coffeescript') {
        devModules.push('coffeescript');
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
      } else if (answers.transpilerType === 'coffeescript') {
        devModules.push('coffeescript');
      }
    }
    if (answers.cucumberReportType === 'html') {
      devModules.push('cucumber-html-reporter');
    }
  }
  if (answers.linter) {
    if (answers.linter === 'tslint') {
      devModules.push('tslint', 'tslint-eslint-rules');
    } else {
      devModules.push('eslint', 'eslint-plugin-protractor');
    }
  }

  if (devModules.length > 0) {
    try {
      await checkPackageJson();
      await installPkgs('Installing dev dependencies...', devModules, {
        saveDev: true,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

/**
 * Public Interface
 */
export {installModules, devModules};
