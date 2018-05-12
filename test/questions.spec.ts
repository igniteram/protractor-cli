import {questions} from '../lib/helpers/questions';
const totalQuestions: number = questions.length;

describe('To test the questions object and verify its contents', () => {
  it('should verify the length of questions', () => {
    expect(questions).toHaveLength(totalQuestions);
  });

  it('should verify the baseUrl object', () => {
    expect(questions[0]).toEqual({
      default: 'http://localhost',
      message: 'What is the base url of your application?',
      name: 'baseURL',
      type: 'input',
    });
  });

  it('should verify the backend object', () => {
    expect(questions[1]).toEqual({
      choices: [
        'My local machine',
        'In cloud services like Sauce Labs or Browserstack',
        'I know a remote selenium server',
      ],
      default: 'My local machine',
      message: 'What is your test environment?',
      name: 'backend',
      type: 'list',
    });
  });

  it('should verify the host object', () => {
    expect(questions[2].name).toBe('host');
    expect(questions[2].message).toBe('What is the host address of that remote server?');
    expect(questions[2].default).toBe('http://127.0.0.1:4444/wd/hub');
    expect(questions[2].type).toBe('input');
    const answers = {
      backend: 'remote selenium',
    };
    expect(questions[2].when(answers)).toBe(true);
  });

  it('should verify the services object', () => {
    expect(questions[3].choices).toEqual(['sauce labs', 'browserstack']);
    expect(questions[3].name).toBe('services');
    expect(questions[3].message).toBe('Please select the could service: ');
    expect(questions[3].default).toBe('sauce labs');
    expect(questions[3].type).toBe('list');
    const answers = {
      backend: 'In cloud services ',
    };
    expect(questions[3].when(answers)).toBe(true);
  });

  it('should verify sauceUser object', () => {
    expect(questions[4].name).toBe('sauceUser');
    expect(questions[4].message).toBe('Environment variable for sauce labs username');
    expect(questions[4].default).toBe('SAUCE_USERNAME');
    expect(questions[4].type).toBe('input');
    const answers = {
      services: 'sauce labs',
    };
    expect(questions[4].when(answers)).toBe(true);
  });

  it('should verify sauceKey object', () => {
    expect(questions[5].name).toBe('sauceKey');
    expect(questions[5].message).toBe('Environment variable for sauce labs access key');
    expect(questions[5].default).toBe('SAUCE_ACCESS_KEY');
    expect(questions[5].type).toBe('input');
    const answers = {
      services: 'sauce labs',
    };
    expect(questions[5].when(answers)).toBe(true);
  });

  it('should verify the browserstackUser object', () => {
    expect(questions[6].name).toBe('browserstackUser');
    expect(questions[6].message).toBe('Environment variable for Browserstack username');
    expect(questions[6].default).toBe('BROWSER_STACK_USERNAME');
    expect(questions[6].type).toBe('input');
    const answers = {
      services: 'browserstack',
    };
    expect(questions[6].when(answers)).toBe(true);
  });

  it('should verify the browserstackKey object', () => {
    expect(questions[7].name).toBe('browserstackKey');
    expect(questions[7].message).toBe('Environment variable for Browserstack access key');
    expect(questions[7].default).toBe('BROWSER_STACK_ACCESS_KEY');
    expect(questions[7].type).toBe('input');
    const answers = {
      services: 'browserstack',
    };
    expect(questions[7].when(answers)).toBe(true);
  });

  it('should verify webdriver object', () => {
    expect(questions[8].name).toBe('webdriver');
    expect(questions[8].message).toBe('Do you want to use webdriver-manager\'s drivers?');
    expect(questions[8].default).toBe(true);
    expect(questions[8].type).toBe('confirm');
    const answers = {
      backend: 'local machine',
    };
    expect(questions[8].when(answers)).toBe(true);
  });

  it('should verify drivers object', () => {
    expect(questions[9].name).toBe('drivers');
    expect(questions[9].message).toBe('Do you want to use built in browser drivers?');
    expect(questions[9].default).toBe(false);
    expect(questions[9].type).toBe('confirm');
    const answers = {
      backend: 'local machine',
      webdriver: false,
    };
    expect(questions[9].when(answers)).toBe(true);
  });

  it('should verify seleniumJar object', () => {
    expect(questions[10].name).toBe('seleniumJar');
    expect(questions[10].message).toBe('Please enter the selenium jar file location:');
    expect(questions[10].default).toBe('./selenium/*.jar');
    expect(questions[10].type).toBe('input');
    const answers = {
      backend: 'local machine',
      drivers: false,
      webdriver: false,
    };
    expect(questions[10].when(answers)).toBe(true);
  });

  it('should verify seleniumAddress object', () => {
    expect(questions[11].name).toBe('seleniumAddress');
    expect(questions[11].message).toBe('Please enter the local selenium server address:');
    expect(questions[11].default).toBe('http://localhost:4444/wd/hub');
    expect(questions[11].type).toBe('input');
    const answers = {
      backend: 'local machine',
      drivers: false,
    };
    expect(questions[11].when(answers)).toBe(true);
  });

  it('should verify browser object', () => {
    expect(questions[12].choices).toEqual(['chrome', 'firefox', 'internet explorer']);
    expect(questions[12].name).toBe('browser');
    expect(questions[12].message).toBe('Select the choice of your browser:');
    expect(questions[12].default).toBe('chrome');
    expect(questions[12].type).toBe('list');
  });

  it('should verify framework object', () => {
    expect(questions[13].choices).toEqual(['jasmine', 'mocha', 'cucumber']);
    expect(questions[13].name).toBe('framework');
    expect(questions[13].message).toBe('Which framework do you want to use?');
    expect(questions[13].default).toBe('jasmine');
    expect(questions[13].type).toBe('list');
  });
  it('should verify transpiler object', () => {
    expect(questions[14].name).toBe('transpiler');
    expect(questions[14].message).toBe('Do you want to use a transpiler?');
    expect(questions[14].default).toBe(true);
    expect(questions[14].type).toBe('confirm');
  });

  it('should verify transpilerType object', () => {
    expect(questions[15].choices).toEqual(['typescript', 'coffeescript']);
    expect(questions[15].name).toBe('transpilerType');
    expect(questions[15].message).toBe('Please select the transpiler:');
    expect(questions[15].default).toBe('typescript');
    expect(questions[15].type).toBe('list');
    const answers = {
      transpiler: true,
    };
    expect(questions[15].when(answers)).toBe(true);
  });

  it('should verify specs object', () => {
    expect(questions[16].name).toBe('specs');
    expect(questions[16].message).toBe('Where are your test specs located?');
    expect(questions[16].type).toBe('input');
    const answers = {
      framework: 'jasmine',
      transpilerType: 'typescript',
    };
    expect(questions[16].default(answers)).toBe('./test/specs/**/*.ts');
    answers.transpilerType = 'coffeescript';
    expect(questions[16].default(answers)).toBe('./test/specs/**/*.coffee');
    delete answers.transpilerType;
    expect(questions[16].default(answers)).toBe('./test/specs/**/*.js');
    expect(questions[16].when(answers)).toContain('jasmine');
    answers.framework = 'mocha';
    expect(questions[16].when(answers)).toContain('mocha');
  });

  it('should verify specPath object', () => {
    expect(questions[17].name).toBe('specPath');
    expect(questions[17].default).toBe(true);
    expect(questions[17].type).toBe('confirm');
    const answers = {
      framework: 'jasmine',
      specs: './tests/**/*.js',
    };
    expect(questions[17].message(answers)).toBe('Do you want to create ./tests/ folder?');
    expect(questions[17].when(answers)).toContain('jasmine');
    answers.framework = 'mocha';
    expect(questions[17].when(answers)).toContain('mocha');
  });

  it('should verify feature files object', () => {
    expect(questions[18].name).toBe('specs');
    expect(questions[18].default).toBe('./features/**/*.feature');
    expect(questions[18].type).toBe('input');
    expect(questions[18].message).toBe('Where are your feature files located?');
    const answers = {
      framework: 'cucumber',
    };
    expect(questions[18].when(answers)).toBe(true);
  });

  it('should verify stepDefinitions object', () => {
    expect(questions[19].name).toBe('stepDefinitions');
    const answers = {
      framework: 'cucumber',
      transpilerType: 'typescript',
    };
    expect(questions[19].default(answers)).toBe('./features/stepDefinitions/**/*.ts');
    answers.transpilerType = 'coffeescript';
    expect(questions[19].default(answers)).toBe('./features/stepDefinitions/**/*.coffee');
    delete answers.transpilerType;
    expect(questions[19].default(answers)).toBe('./features/stepDefinitions/**/*.js');
    expect(questions[19].type).toBe('input');
    expect(questions[19].message).toBe('Where are your step definitions located?');
    expect(questions[19].when(answers)).toBe(true);
  });

  it('should verify featurePath object', () => {
    expect(questions[20].name).toBe('featurePath');
    expect(questions[20].default).toBe(true);
    expect(questions[20].type).toBe('confirm');
    expect(questions[20].message).toBe('Do you want to create the above folders?');
    const answers = {
      framework: 'cucumber',
    };
    expect(questions[20].when(answers)).toBe(true);
  });

  it('should verify logging object', () => {
    expect(questions[21].choices).toEqual(['info', 'error', 'warn', 'debug']);
    expect(questions[21].name).toBe('logging');
    expect(questions[21].default).toBe('info');
    expect(questions[21].type).toBe('list');
    expect(questions[21].message).toBe('Level of logging verbosity:');
  });

  it('should verify linters objects', () => {
    expect(questions[22].name).toBe('linter');
    expect(questions[22].default).toBe(true);
    expect(questions[22].type).toBe('list');
    expect(questions[22].message).toBe('Please select the following linters to install:');
    const answers = {
      transpilerType: 'typescript',
    };
    expect(questions[22].when(answers)).not.toBe('coffeescript');
  });

  it('should verify reports objects', () => {
    expect(questions[23].name).toBe('reports');
    expect(questions[23].default).toBe(true);
    expect(questions[23].type).toBe('confirm');
    expect(questions[23].message).toBe('Do you want to generate reports of your tests?');
  });

  it('should verify reportType object', () => {
    expect(questions[24].choices).toEqual(['dot', 'spec', 'json', 'html']);
    expect(questions[24].name).toBe('reportType');
    expect(questions[24].default).toBe('dot');
    expect(questions[24].type).toBe('list');
    expect(questions[24].message).toBe('Please select the type of report:');
    const answers = {
      framework: 'jasmine',
      reports: true,
    };
    expect(questions[24].when(answers)).toContain('jasmine');
    answers.framework = 'mocha';
    expect(questions[24].when(answers)).toContain('mocha');
  });

  it('should verify cucumberReportType object', () => {
    expect(questions[25].choices).toEqual(['progress', 'summary', 'json', 'html']);
    expect(questions[25].name).toBe('cucumberReportType');
    expect(questions[25].default).toBe('progress');
    expect(questions[25].type).toBe('list');
    expect(questions[25].message).toBe('Please select the type of report:');
    const answers = {
      framework: 'cucumber',
      reports: true,
    };
    expect(questions[25].when(answers)).toBe(true);
  });

  it('should verify reportPath object', () => {
    expect(questions[26].name).toBe('reportPath');
    expect(questions[26].default).toBe('./reports');
    expect(questions[26].type).toBe('input');
    expect(questions[26].message).toBe('Where do you want to store your reports?');
    const answers = {
      reports: true,
    };
    expect(questions[26].when(answers)).toBe(true);
  });

  it('should verify createReportPath object', () => {
    expect(questions[27].name).toBe('createReportPath');
    expect(questions[27].default).toBe(true);
    expect(questions[27].type).toBe('confirm');
    const answers = {
      reportPath: './reports',
      reports: true,
    };
    expect(questions[27].message(answers)).toBe('Do you want to create ./reports folder?');
    expect(questions[27].when(answers)).toBe(true);
  });
});
