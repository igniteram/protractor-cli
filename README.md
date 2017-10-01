<p align="center">
<img src= "./images/cliptor.png" height=150 alt="cliptor.png"/>
</p>

---

<p align="center">
   <i><strong>An Interactive command line interface & config helper for ProtractorJS</strong></i>
<p>

<p align="center">
<a href="https://circleci.com/gh/igniteram/Cliptor.js/tree/master"><img alt="circleCI Status" src="https://circleci.com/gh/igniteram/Cliptor.js/tree/master.svg?style=shield"></a>
<a href="https://david-dm.org/igniteram/Cliptor.js"><img alt="dependencies status" src="https://david-dm.org/igniteram/Cliptor.js/status.svg"></a>
<a href="https://badge.fury.io/js/cliptor"><img src="https://badge.fury.io/js/cliptor.svg" alt="npm version" height="18"></a>
<a href="https://github.com/facebook/jest"><img alt="JEST" src="https://img.shields.io/badge/tested_with-jest-99424f.svg"></a>
<a href="https://opensource.org/licenses/MIT"><img alt="MIT License" src="https://img.shields.io/dub/l/vibe-d.svg"></a>
</p>

---

### <p align="center"> [About](#about) **|** [To Get Started](#to-get-started) **|** [Installation](#installation) **|** [Commands](#commands) </p>

## About

Cliptor is an interactive command line interface which helps in setting up hassle free protractor projects. It takes user's inputs for generating protractor config files and also downloads the dependencies needed for writing e2e tests.

<p>
  <img src="./images/cliptor.gif" alt="cliptor.gif"/>
</p>

### What Cliptor is trying to solve?

Since protractor supports multiple frameworks and has many functionalities associated with them , users face it quite challenging to know the config options and experience a hard time to choose the right library to use in their e2e projects. 

Cliptor focuses primarily to solve these issues by generating config files based on user's input and downloads the respective dependencies automatically.

## To Get Started

#### Pre-requisites
1.NodeJS installed globally in the system.
https://nodejs.org/en/download/

## Installation

Let's start by installing Cliptor globally with [npm](https://www.npmjs.com/).

```sh
$ npm install --global cliptor
```
## Commands

Cliptor currently supports two primary commands - **config** & **install** with no arguments.
`cliptor --help` will show these list commands. `cliptor --version` will show the current version of cliptor. 

### config

```sh
$ cliptor config
```
Starts protractor's interactive cli, generates config files & downloads protractor related dependencies!

### install

```sh
$ cliptor install
```
This installs protractor & webdriver-manager globally, it also updates webdriver-manager which downloads **chrome**, **firefox** & **internet explorer** drivers. One can skip this step and use the `cliptor config` command if they want to run selenium server in other ways!

## Library Support

Cliptor supports s all the major libraries and frameworks that **Protractor** currently supports, let us have a look-

### Browser Support

Cliptor supports all three major browsers -
<style>
div.images img{
    margin:10px;
}
</style>
<div class="images">
<img src="./images/chrome.png" height=60>
<img src="./images/firefox.jpg" height=60>
<img src="./images/IE.jpg" height=60>
</div>

### Test Frameworks

* [jasmine](https://jasmine.github.io/) (default)
* [mocha](https://mochajs.org/)
* [cucumber](https://github.com/cucumber/cucumber-js)
 
 ### Test Environments 

 * **Local Machine** - It is your local test development environment
 * **Cloud Service** - If you want to develop and maintain your test scripts in cloud services like - **Sauce Labs** & **BrowserStack**.
 * **Remote Machine** - If you know the address of a remote machine where selenium server resides you could use this environment configuration.

### Transpilers
<div class="images">
<img src="./images/typescript.png" height=60>
<img src="./images/coffeeScript.png" height=70>
</div>

Since cliptor has been entirely written using [TypeScript](https://www.typescriptlang.org/). You would find extensive support for it. Protractor also has recently migrated to typescript.

You could use the typescript features by simply selecting your specific framework & transpiler option provided by cliptor. 

Jasmine being the default framework , cliptor asks whether you would want to use typescript as a transpiler which then installs **typescript**, **jasmine types** and also generates **tsconfig.json** automatically!

[Coffee-Script](http://coffeescript.org/) support has also been provided with **mocha** & **cucumber** frameworks. You could write your scripts using coffee-script and the above frameworks will auto-compile them. The best part is you don't have to do it manaully as cliptor does it for you!

### Logging

Protractor has 4 types of logging mechanism - 
* **info** (default)
* **warn**
* **debug**
* **error**

One could refer this [StackOverFlow link](https://stackoverflow.com/questions/2031163/when-to-use-the-different-log-levels) to understand what they are and when to use them. Normally you would have to configure these in your config file manually but now cliptor does it for you.

### Reports

Cliptor installs & configures one of the popular & well maintained report modules which could be integrated with protractor.

Framework | Report Types | Report Module
---       | ---          | ---
`Jasmine` | `dot`        | Protractor's default dot console reporter      
          |`spec`        | [jasmine-spec-reporter](https://github.com/bcaudan/jasmine-spec-reporter) generates flashy console spec reporter
          |`json`        | Protractor's `resultJsonOutputFile` config option generates json reports
          |`html`       | [protractor-jasmine2-screenshot-reporter](protractor-jasmine2-screenshot-reporter) generates html reports.    


## Contributions

## Attributions

### Logo