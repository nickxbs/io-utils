#!/usr/bin/env node

import yargs = require("yargs");
import { generateSdk } from ".";

//
// parse command line
//

const PACKAGE_GROUP = "Package options:";
const CODE_GROUP = "Code generation options:";

const argv = yargs
  .option("package-name", {
    alias: ["n", "name"],
    demandOption: true,
    description: "Name of the generated package",
    normalize: true,
    string: true,
    group: PACKAGE_GROUP
  })
  .option("package-version", {
    alias: "V",
    demandOption: true,
    description: "Version of the generated package",
    string: true,
    group: PACKAGE_GROUP
  })
  .option("package-description", {
    alias: ["d", "desc"],
    demandOption: true,
    description: "Description of the package",
    string: true,
    group: PACKAGE_GROUP
  })
  .option("package-registry", {
    alias: ["r", "registry"],
    description: "Url of the registry the package is published in",
    string: true,
    group: PACKAGE_GROUP
  })
  .option("package-access", {
    alias: ["x", "access"],
    description:
      "Either 'public' or 'private', depending of the accessibility of the package in the registry",
    choices: ["public", "private"],
    string: true,
    group: PACKAGE_GROUP
  })
  .implies("package-registry", "package-access")
  .option("package-author", {
    alias: ["a", "author"],
    demandOption: true,
    description: "The author of the API exposed",
    string: true,
    group: PACKAGE_GROUP
  })
  .option("package-license", {
    alias: ["L", "license"],
    demandOption: true,
    description: "The license of the API Exposed",
    string: true,
    group: PACKAGE_GROUP
  })
  .option("api-spec", {
    alias: "i",
    demandOption: true,
    description: "Path to input OpenAPI spec file",
    normalize: true,
    string: true,
    group: CODE_GROUP
  })
  .option("strict", {
    boolean: false,
    default: true,
    description: "Generate strict interfaces (default: true)",
    group: CODE_GROUP
  })
  .option("out-dir", {
    alias: "o",
    demandOption: true,
    description: "Output directory to store generated definition files",
    normalize: true,
    string: true,
    group: CODE_GROUP
  })
  .option("default-success-type", {
    default: "undefined",
    description:
      "Default type for success responses (experimental, default: 'undefined')",
    normalize: true,
    string: true,
    group: CODE_GROUP
  })
  .option("default-error-type", {
    default: "undefined",
    description:
      "Default type for error responses (experimental, default: 'undefined')",
    normalize: true,
    string: true,
    group: CODE_GROUP
  })
  .option("camel-cased", {
    boolean: false,
    default: false,
    description: "Generate camelCased properties name (default: false)",
    group: CODE_GROUP
  })
  .help().argv;

//
// Generate APIs
//
generateSdk({
  camelCasedPropNames: argv["camel-cased"],
  name: argv["package-name"],
  version: argv["package-version"],
  description: argv["package-description"],
  author: argv["package-author"],
  license: argv["package-license"],
  registry: argv["package-registry"],
  access: argv["package-access"],
  defaultErrorType: argv["default-error-type"],
  defaultSuccessType: argv["default-success-type"],
  outPath: argv["out-dir"],
  specFilePath: argv["api-spec"],
  strictInterfaces: argv.strict
}).then(
  () => console.log("done"),
  err => console.log(`Error: ${err}`)
);
