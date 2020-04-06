export default class OutputFilePathComputer {
    private readonly configs;
    private errorHandler;
    private projects;
    constructor(configFilePath: string);
    private parseConfigFile;
    private findProjectReferenceConfigFile;
    private processConfigFile;
    getOutputFilePath(filePath: string): string;
}
