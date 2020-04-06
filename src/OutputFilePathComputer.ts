import * as ts from 'typescript';
import { join, resolve, dirname, relative, sep } from 'path';
import ErrorHandler from './ErrorHandler';

class Project {
  private readonly baseDirectory: string;
  private readonly baseDirectoryParts: string[];

  constructor(configFilePath: string, private readonly config: ts.ParsedCommandLine) {
    this.baseDirectory = dirname(configFilePath);
    this.baseDirectoryParts = this.baseDirectory.split(sep);
  }

  getOutputFilePath(filePath: string) {
    let outputFilePath = filePath.replace(/\.ts$/, '.js');
    const outDirectory = this.config.options.outDir;
    if (outDirectory !== undefined) {
      const rootDirectory = this.config.options.rootDir ?? this.baseDirectory;
      const relativeOutputFilePath = relative(rootDirectory, outputFilePath);
      outputFilePath = resolve(outDirectory, relativeOutputFilePath);
    }
    return outputFilePath;
  }

  contains(filePath: string) {
    const filePathParts = filePath.split(sep);
    return this.baseDirectoryParts.every((part, index) => filePathParts[index] === part);
  }
}

export default class OutputFilePathComputer {
  private readonly configs = new Map<string, ts.ParsedCommandLine>();
  private errorHandler = new ErrorHandler();
  private projects: Project[];

  constructor(configFilePath: string) {
    this.processConfigFile(configFilePath);
    this.projects = Array.from(this.configs).map(([configFilePath, config]) => new Project(configFilePath, config));
  }

  private parseConfigFile(path: string) {
    const { config: json, error } = ts.readConfigFile(path, ts.sys.readFile);
    this.errorHandler.checkDiagnostic(error);
    const host: ts.ParseConfigHost = {
      fileExists: ts.sys.fileExists,
      readFile: ts.sys.readFile,
      readDirectory: ts.sys.readDirectory,
      useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames,
    };
    return ts.parseJsonConfigFileContent(json, host, dirname(path), undefined, path);
  }

  private findProjectReferenceConfigFile(path: string) {
    if (ts.sys.fileExists(path)) {
      return path;
    }
    return join(path, 'tsconfig.json');
  }

  private processConfigFile(configFilePath: string) {
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

  getOutputFilePath(filePath: string) {
    for (const project of this.projects) {
      if (project.contains(filePath)) {
        return project.getOutputFilePath(filePath);
      }
    }
    throw new Error('Issue');
  }
}
