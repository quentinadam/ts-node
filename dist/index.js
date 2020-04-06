"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const ts = require("typescript");
const OutputFilePathComputer_1 = require("./OutputFilePathComputer");
const registerExtension_1 = require("./registerExtension");
const SolutionBuilder_1 = require("./SolutionBuilder");
const cwd = process.cwd();
const configFilePath = ts.findConfigFile(cwd, ts.sys.fileExists);
if (configFilePath === undefined) {
    throw new Error(`Could not find a tsconfig.json file in the current working directory (${cwd}) or in any parent directory`);
}
const solutionBuilder = new SolutionBuilder_1.default(configFilePath);
solutionBuilder.build();
const outputFilePathComputer = new OutputFilePathComputer_1.default(configFilePath);
registerExtension_1.default('.ts', (filePath) => {
    const outputFilePath = outputFilePathComputer.getOutputFilePath(filePath);
    return fs.readFileSync(outputFilePath, 'utf8');
});
