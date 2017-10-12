import { NpmUtil } from "../utils/npmUtil";

const installModules = (answers: any) => {
  // install protractor by default as save dependency
  const saveModules: string[] = ["protractor"];
  const devModules: string[] = [];
  if (answers.framework === "jasmine") {
    if (answers.jasmineTStranspiler) {
      saveModules.push("typescript");
      devModules.push("@types/node", "@types/jasmine", "ts-node");
    }
    if (answers.reportType === "spec") {
      devModules.push("jasmine-spec-reporter");
    }
    if (answers.reportType === "html") {
      devModules.push("protractor-jasmine2-screenshot-reporter");
    }
  }
  if (answers.framework === "mocha") {
    if (answers.transpiler) {
      if (answers.transpilerType === "typescript") {
        saveModules.push("typescript");
        devModules.push("@types/node", "@types/mocha", "ts-node");
      } else {
        saveModules.push("coffee-script");
      }
    }
    if (answers.reportType === "html") {
      devModules.push("mochawesome");
    }
  }
  if (answers.framework === "cucumber") {
    devModules.push("cucumber", "protractor-cucumber-framework");
    if (answers.transpiler) {
      if (answers.transpilerType === "typescript") {
        saveModules.push("typescript");
        devModules.push("@types/node", "@types/cucumber", "ts-node");
      } else {
        saveModules.push("coffee-script");
      }
    }
    if (answers.cucumberReportType === "html") {
      devModules.push("cucumber-html-reporter");
    }
  }
  if (saveModules.length > 0) {
    NpmUtil.checkPackageJson();
    NpmUtil.installPkgs("Installing save dependencies...", saveModules, {
      save: true,
    });
  }
  if (devModules.length > 0) {
    NpmUtil.checkPackageJson();
    NpmUtil.installPkgs("Installing dev dependencies...", devModules, {
      saveDev: true,
    });
  }
};

/**
 * Public Interface
 */
export { installModules };
