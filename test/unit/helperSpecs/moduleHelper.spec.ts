import {devModules, installModules} from '../../../lib/helpers/moduleHelper';
import {NpmUtil} from '../../../lib/utils/npmUtil';

const removeDevModule = (element: string) => {
  const devIndex = devModules.indexOf(element);
  if (devModules.indexOf(element) > -1) {
    devModules.splice(devIndex, 1);
  }
};

const removeDevModules = (elements: any) => {
  if (Array.isArray(elements)) {
    elements.forEach((element) => {
      removeDevModule(element);
    });
  }
};

describe('To test the install module function and verify its installation process', () => {
  it('Verify module installation if framework is jasmine with typescript', () => {
    const answers = {
      framework: 'jasmine',
      transpilerType: 'typescript',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).toEqual([
      'protractor',
      'typescript',
      '@types/node',
      '@types/jasmine',
      'ts-node',
    ]);
    NpmUtil.unInstallPkgs('', ['protractor', '@types/jasmine', 'ts-node'], {saveDev: true});
    removeDevModules(['@types/jasmine', 'typescript', '@types/node', 'ts-node']);
  });

  it('Verify module installation if framework is jasmine with coffee-script', () => {
    const answers = {
      framework: 'jasmine',
      transpilerType: 'coffee-script',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).toEqual([
      'protractor',
      'coffee-script',
    ]);
    NpmUtil.unInstallPkgs('', ['protractor', 'coffee-script'], {saveDev: true});
    removeDevModules(['coffee-script']);
  });

  it('Verify module installation if framework is jasmine with spec reporter', () => {
    const answers = {
      framework: 'jasmine',
      reportType: 'spec',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('typescript');
    expect(devModules).toContain('jasmine-spec-reporter');
    NpmUtil.unInstallPkgs('', devModules, {saveDev: true});
    removeDevModule('jasmine-spec-reporter');
  });

  it('Verify module installation if framework is jasmine with html reporter', () => {
    const answers = {
      framework: 'jasmine',
      reportType: 'html',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('typescript');
    expect(devModules).toContain('protractor-jasmine2-screenshot-reporter');
    NpmUtil.unInstallPkgs('', devModules, {saveDev: true});
    removeDevModule('protractor-jasmine2-screenshot-reporter');
  });

  it('Verify module installation if framework is mocha with typescript', () => {
    const answers = {
      framework: 'mocha',
      transpiler: true,
      transpilerType: 'typescript',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('coffee-script');
    expect(devModules).toEqual([
      'protractor',
      'typescript',
      '@types/node',
      '@types/mocha',
      'ts-node',
    ]);
    NpmUtil.unInstallPkgs('', ['protractor', '@types/mocha', 'ts-node'], {saveDev: true});
    removeDevModules(['typescript', '@types/node', '@types/mocha', 'ts-node']);
  });

  it('Verify module installation if framework is mocha with coffee-script', () => {
    const answers = {
      framework: 'mocha',
      transpiler: true,
      transpilerType: 'coffee-script',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('typescript');
    expect(devModules).toContain('coffee-script');
    expect(devModules.length).toEqual(2);
    NpmUtil.unInstallPkgs('', devModules, {saveDev: true});
    removeDevModule('coffee-script');
  });

  it('Verify module installation if framework is mocha with html report', () => {
    const answers = {
      framework: 'mocha',
      reportType: 'html',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('typescript');
    expect(devModules).not.toContain('coffee-script');
    expect(devModules).toContain('mochawesome');
    NpmUtil.unInstallPkgs('', devModules, {saveDev: true});
    removeDevModule('mochawesome');
  });

  it('Verify module installation if framework is cucumber', () => {
    const answers = {
      framework: 'cucumber',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('typescript');
    expect(devModules).not.toContain('coffee-script');
    expect(devModules).toEqual(['protractor', 'cucumber', 'protractor-cucumber-framework']);
    NpmUtil.unInstallPkgs('', devModules, {saveDev: true});
    removeDevModules(['cucumber', 'protractor-cucumber-framework']);
  });

  it('Verify module installation if framework is cucumber with typescript', () => {
    const answers = {
      framework: 'cucumber',
      transpiler: true,
      transpilerType: 'typescript',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('coffee-script');
    expect(devModules).toEqual([
      'protractor',
      'cucumber',
      'protractor-cucumber-framework',
      'typescript',
      '@types/node',
      '@types/cucumber',
      'ts-node',
    ]);
    NpmUtil.unInstallPkgs(
        '',
        ['protractor', 'cucumber', 'protractor-cucumber-framework', '@types/cucumber', 'ts-node'],
        {saveDev: true});
    removeDevModules([
      'typescript',
      'cucumber',
      'protractor-cucumber-framework',
      '@types/node',
      '@types/cucumber',
      'ts-node',
    ]);
  });

  it('Verify module installation if framework is cucumber with coffee-script', () => {
    const answers = {
      framework: 'cucumber',
      transpiler: true,
      transpilerType: 'coffee-script',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('typescript');
    expect(devModules).toEqual([
      'protractor',
      'cucumber',
      'protractor-cucumber-framework',
      'coffee-script',
    ]);
    NpmUtil.unInstallPkgs('', devModules, {saveDev: true});
    removeDevModules(['cucumber', 'protractor-cucumber-framework', 'coffee-script']);
  });

  it('Verify module installation if framework is cucumber with html report', () => {
    const answers = {
      cucumberReportType: 'html',
      framework: 'cucumber',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('typescript');
    expect(devModules).not.toContain('coffee-script');
    expect(devModules).toContain('cucumber-html-reporter');
    NpmUtil.unInstallPkgs('', devModules, {saveDev: true});
    removeDevModules(['cucumber', 'protractor-cucumber-framework', 'cucumber-html-reporter']);
  });

  it('Verify module installation if linter is eslint-plugin-protractor', () => {
    const answers = {
      linter: 'eslint-plugin-protractor',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('coffee-script');
    expect(devModules).toEqual(['protractor', 'eslint', 'eslint-plugin-protractor']);
    NpmUtil.unInstallPkgs('', devModules, {saveDev: true});
    removeDevModules(['eslint', 'eslint-plugin-protractor']);
  });

  it('Verify module installation if linter is tslint', () => {
    const answers = {
      linter: 'tslint',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('coffee-script');
    expect(devModules).toEqual(['protractor', 'tslint', 'tslint-eslint-rules']);
    NpmUtil.unInstallPkgs('', ['protractor', 'tslint-eslint-rules'], {saveDev: true});
    removeDevModules(['protractor', 'tslint', 'tslint-eslint-rules']);
  });
});
