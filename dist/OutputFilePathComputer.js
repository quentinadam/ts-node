"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const path_1 = require("path");
const ErrorHandler_1 = require("./ErrorHandler");
class Project {
    constructor(configFilePath, config) {
        this.config = config;
        this.baseDirectory = path_1.dirname(configFilePath);
        this.baseDirectoryParts = this.baseDirectory.split(path_1.sep);
    }
    getOutputFilePath(filePath) {
        var _a;
        let outputFilePath = filePath.replace(/\.ts$/, '.js');
        const outDirectory = this.config.options.outDir;
        if (outDirectory !== undefined) {
            const rootDirectory = (_a = this.config.options.rootDir) !== null && _a !== void 0 ? _a : this.baseDirectory;
            const relativeOutputFilePath = path_1.relative(rootDirectory, outputFilePath);
            outputFilePath = path_1.resolve(outDirectory, relativeOutputFilePath);
        }
        return outputFilePath;
    }
    contains(filePath) {
        const filePathParts = filePath.split(path_1.sep);
        return this.baseDirectoryParts.every((part, index) => filePathParts[index] === part);
    }
}
class OutputFilePathComputer {
    constructor(configFilePath) {
        this.configs = new Map();
        this.errorHandler = new ErrorHandler_1.default();
        this.processConfigFile(configFilePath);
        this.projects = Array.from(this.configs).map(([configFilePath, config]) => new Project(configFilePath, config));
    }
    parseConfigFile(path) {
        const { config: json, error } = ts.readConfigFile(path, ts.sys.readFile);
        this.errorHandler.checkDiagnostic(error);
        const host = {
            fileExists: ts.sys.fileExists,
            readFile: ts.sys.readFile,
            readDirectory: ts.sys.readDirectory,
            useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames,
        };
        return ts.parseJsonConfigFileContent(json, host, path_1.dirname(path), undefined, path);
    }
    findProjectReferenceConfigFile(path) {
        if (ts.sys.fileExists(path)) {
            return path;
        }
        return path_1.join(path, 'tsconfig.json');
    }
    processConfigFile(configFilePath) {
        if (!this.configs.has(configFilePath)) {
            const config = this.parseConfigFile(configFilePath);
            this.configs.set(configFilePath, config);
            const projectReferences = config.projectReferences;
            if (projectReferences !== undefined) {
                for (const projectReference of projectReferences) {
                    const configFilePath = this.findProjectReferenceConfigFile(projectReference.path);
                    this.processConfigFile(configFilePath);
                }
            }
        }
    }
    getOutputFilePath(filePath) {
        for (const project of this.projects) {
            if (project.contains(filePath)) {
                return project.getOutputFilePath(filePath);
            }
        }
        throw new Error('Issue');
    }
}
exports.default = OutputFilePathComputer;
