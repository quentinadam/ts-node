"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const ErrorHandler_1 = require("./ErrorHandler");
class SolutionBuilder {
    constructor(configFilePath) {
        this.diagnostics = [];
        this.errorHandler = new ErrorHandler_1.default();
        const host = ts.createSolutionBuilderHost(undefined, undefined, (diagnostic) => this.diagnostics.push(diagnostic), (diagnostic) => this.diagnostics.push(diagnostic));
        this.solutionBuilder = ts.createSolutionBuilder(host, [configFilePath], {});
    }
    build() {
        this.solutionBuilder.build();
        this.errorHandler.checkDiagnostics(this.diagnostics);
    }
}
exports.default = SolutionBuilder;
