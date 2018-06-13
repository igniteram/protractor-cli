import {devModules, installModules} from '../lib/helpers/moduleHelper';
import {unInstallPkgs} from '../lib/utils/npmUtil';

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

describe('To test the install module function and verify its installation process', async () => {
  it('Verify module installation if framework is jasmine with typescript', async () => {
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
    await unInstallPkgs('', ['protractor', '@types/jasmine', 'ts-node'], {saveDev: true});
    removeDevModules(['@types/jasmine', 'typescript', '@types/node', 'ts-node']);
  });

  it('Verify module installation if framework is jasmine with coffeescript', async () => {
    const answers = {
      framework: 'jasmine',
      transpilerType: 'coffeescript',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).toEqual([
      'protractor',
      'coffeescript',
    ]);
    await unInstallPkgs('', ['protractor', 'coffeescript'], {saveDev: true});
    removeDevModules(['coffeescript']);
  });

  it('Verify module installation if framework is jasmine with spec reporter', async () => {
    const answers = {
      framework: 'jasmine',
      reportType: 'spec',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('typescript');
    expect(devModules).toContain('jasmine-spec-reporter');
    await unInstallPkgs('', devModules, {saveDev: true});
    removeDevModule('jasmine-spec-reporter');
  });

  it('Verify module installation if framework is jasmine with html reporter', async () => {
    const answers = {
      framework: 'jasmine',
      reportType: 'html',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('typescript');
    expect(devModules).toContain('protractor-jasmine2-screenshot-reporter');
    await unInstallPkgs('', devModules, {saveDev: true});
    removeDevModule('protractor-jasmine2-screenshot-reporter');
  });

  it('Verify module installation if framework is mocha with typescript', async () => {
    const answers = {
      framework: 'mocha',
      transpiler: true,
      transpilerType: 'typescript',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('coffeescript');
    expect(devModules).toEqual([
      'protractor',
      'typescript',
      '@types/node',
      '@types/mocha',
      'ts-node',
    ]);
    await unInstallPkgs('', ['protractor', '@types/mocha', 'ts-node'], {saveDev: true});
    removeDevModules(['typescript', '@types/node', '@types/mocha', 'ts-node']);
  });

  it('Verify module installation if framework is mocha with coffeescript', async () => {
    const answers = {
      framework: 'mocha',
      transpiler: true,
      transpilerType: 'coffeescript',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('typescript');
    expect(devModules).toContain('coffeescript');
    expect(devModules.length).toEqual(2);
    await unInstallPkgs('', devModules, {saveDev: true});
    removeDevModule('coffeescript');
  });

  it('Verify module installation if framework is mocha with html report', async () => {
    const answers = {
      framework: 'mocha',
      reportType: 'html',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('typescript');
    expect(devModules).not.toContain('coffeescript');
    expect(devModules).toContain('mochawesome');
    await unInstallPkgs('', devModules, {saveDev: true});
    removeDevModule('mochawesome');
  });

  it('Verify module installation if framework is cucumber', async () => {
    const answers = {
      framework: 'cucumber',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('typescript');
    expect(devModules).not.toContain('coffeescript');
    expect(devModules).toEqual(['protractor', 'cucumber', 'protractor-cucumber-framework']);
    await unInstallPkgs('', devModules, {saveDev: true});
    removeDevModules(['cucumber', 'protractor-cucumber-framework']);
  });

  it('Verify module installation if framework is cucumber with typescript', async () => {
    const answers = {
      framework: 'cucumber',
      transpiler: true,
      transpilerType: 'typescript',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('coffeescript');
    expect(devModules).toEqual([
      'protractor',
      'cucumber',
      'protractor-cucumber-framework',
      'typescript',
      '@types/node',
      '@types/cucumber',
      'ts-node',
    ]);
    await unInstallPkgs(
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

  it('Verify module installation if framework is cucumber with coffeescript', async () => {
    const answers = {
      framework: 'cucumber',
      transpiler: true,
      transpilerType: 'coffeescript',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('typescript');
    expect(devModules).toEqual([
      'protractor',
      'cucumber',
      'protractor-cucumber-framework',
      'coffeescript',
    ]);
    await unInstallPkgs('', devModules, {saveDev: true});
    removeDevModules(['cucumber', 'protractor-cucumber-framework', 'coffeescript']);
  });

  it('Verify module installation if framework is cucumber with html report', async () => {
    const answers = {
      cucumberReportType: 'html',
      framework: 'cucumber',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('typescript');
    expect(devModules).not.toContain('coffeescript');
    expect(devModules).toContain('cucumber-html-reporter');
    await unInstallPkgs('', devModules, {saveDev: true});
    removeDevModules(['cucumber', 'protractor-cucumber-framework', 'cucumber-html-reporter']);
  });

  it('Verify module installation if linter is eslint-plugin-protractor', async () => {
    const answers = {
      linter: 'eslint-plugin-protractor',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('coffeescript');
    expect(devModules).toEqual(['protractor', 'eslint', 'eslint-plugin-protractor']);
    await unInstallPkgs('', devModules, {saveDev: true});
    removeDevModules(['eslint', 'eslint-plugin-protractor']);
  });

  it('Verify module installation if linter is tslint', async () => {
    const answers = {
      linter: 'tslint',
    };
    const mockFn = jest.fn(installModules);
    mockFn(answers);
    expect(devModules).not.toContain('coffeescript');
    expect(devModules).toEqual(['protractor', 'tslint', 'tslint-eslint-rules']);
    await unInstallPkgs('', ['protractor', 'tslint-eslint-rules'], {saveDev: true});
    removeDevModules(['protractor', 'tslint', 'tslint-eslint-rules']);
  });
});
