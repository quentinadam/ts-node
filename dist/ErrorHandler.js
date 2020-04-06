"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
class ErrorHandler {
    constructor() {
        this.diagnosticHost = {
            getNewLine: () => ts.sys.newLine,
            getCurrentDirectory: ts.sys.getCurrentDirectory,
            getCanonicalFileName: ts.sys.useCaseSensitiveFileNames ? (x) => x : (x) => x.toLowerCase(),
        };
    }
    getErrorMessage(diagnostics) {
        const count = diagnostics.length;
        return [
            ts.formatDiagnosticsWithColorAndContext(diagnostics, this.diagnosticHost),
            count !== 1 ? `Found ${count} errors.` : 'Found 1 error.',
        ].join(this.diagnosticHost.getNewLine());
    }
    checkDiagnostics(diagnostics) {
        if (diagnostics.length > 0) {
            console.error(this.getErrorMessage(diagnostics));
            process.exit(1);
        }
    }
    checkDiagnostic(diagnostic) {
        if (diagnostic !== undefined) {
            console.error(this.getErrorMessage([diagnostic]));
            process.exit(1);
        }
    }
}
exports.default = ErrorHandler;
