## Building and Testing Protractor-CLI

This document describes building, testing, releasing Protractor-CLI and provides an overview of
the repository layout.

### Prerequisite software

The prerequisite software - Node.js, npm, git, jdk

### Getting the source code

Fork Protractor-CLI from github, then clone your fork with:

```shell
git clone git@github.com:<github username>/protractor-cli.git

# Go to the Protractor-CLI directory:
cd protractor-cli/

# Add the main protractor-cli repository as an upstream remote to your repository:
git remote add upstream https://github.com/igniteram/protractor-cli.git
```

## Installing and Building

All Protractor-CLI dependencies come from npm. Install with:

```shell
npm install
```
One could also make use of yarn package manager as this repository is integrated with yarn.lock file.

This will also trigger our build step. The build step runs the TypeScript compiler
and copies necessary files into the output `built` directory. To run the build step
independently, run:

```shell
npm run prepublish
```

### Installing Cliptor binary globally

`npm link` is very similar to `npm install -g` except that instead of downloading the package from the repo, the just cloned protractor-cli folder becomes the global package.

`cliptor` binary will be available to you globally and any changes you make in this folder could be verified by running binary from anywhere.

You can see the other available npm scripts in `package.json`.

## Formatting

Protractor-CLI uses clang-format to format the source code. If the source code is not properly formatted,
the CI will fail and the PR can not be merged.

You can automatically format your code by running:

```shell
npm run format
```

You can check that you will pass lint tests with:

```shell
npm run lint

```

## Code layout

`bin/` contains cliptor binary.
`images/` contains the repo images.
`lib/` contains the actual Protractor-CLI typescript code.
`templates/` contains the templates used for generating config , tslint & json files.
`test/` contains unit tests and configuration files for tests.

Most of the code is written in TypeScript, with the exception of a few js files.

`lib/commands` consist of cliptor commands i.e. install & config.
`lib/helpers`  consist helper files for file generation, module installation & command line questions.
`utils` contains npm utility file - wrapper around npm installation for protractor-cli.
`cli.ts` invokes the commander module and integrates the commands.


## Testing

Run `npm test` to run the full test suite. This project uses [Jest](https://github.com/facebook/jest)

## Important dependencies

[TypeScript](https://github.com/Microsoft/TypeScript): This project is entirely written using typescript inline with protractor & angular projects.

[Inquirer](https://github.com/SBoudrias/Inquirer.js): This is used to generate the protractor-cli's interactive cli.

[Commander](https://github.com/tj/commander.js): This is used to integrate all protractor-cli commands in a nead command line interface.

[EJS](https://github.com/mde/ejs): This is used to generated the protractor.config.js file from the template protractor.config.ejs.

[Chalk](https://github.com/chalk/chalk): Helps console logging in a colorful way.

[Jest](https://github.com/facebook/jest): The popular unit testing framework by facebook, protractor-cli's unit tests are being written using jest.

[JS-beautify](https://github.com/beautify-web/js-beautify): It beautifies your javascript, protractor-cli uses this to beautify config and json files programatically.

## Commit by Commitizen

This project has been integrated by commitizen, one can invoke the commitizen cli by running `npm run commit` before any commit , it would run a clean build and lint all files.

## Continuous Integration

PRs or changes submitted to master will automatically trigger continuous integration Circle CI. 

Circle CI runs a slightly modified version of `npm test` in a single VM. It installs
the modules it needs locally.

## Changelog

See [CHANGELOG.md](https://github.com/angular/protractor/blob/master/CHANGELOG.md) for detailed changelog.