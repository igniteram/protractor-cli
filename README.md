<p align="center">
  <img src="./images/shenron.gif" alt="shenron"/>
</p>

# <center>Cliptor</center>

<p align="center">
   An Interactive command line interface & config helper for ProtractorJS
<p>

**<center>[About](#about)** **|** **[To Get Started](#to-get-started)** **|** **[Installation](#installation)** **|** **[Commands](#commands)</center>**

## About

Cliptor is an interactive command line interface which helps in setting up hassle free protractor projects. It takes user's inputs for generating protractor config files and also downloads the dependencies needed for writing e2e tests.

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

### config

```sh
$ cliptor config
```
Starts protractor's interactive cli, generates config files & downloads protractor related dependencies!

<p>
  <img src="./images/cliptor.gif" alt="cliptor"/>
</p>

### install

```sh
$ cliptor install
```
This installs protractor & webdriver-manager globally, it also updates webdriver-manager which downloads **chrome**, **firefox** & **internet explorer** drivers. One can skip this step and use the `cliptor config` command if they want to run selenium server in other ways!
