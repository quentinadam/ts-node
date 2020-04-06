import * as ts from 'typescript';
export default class ErrorHandler {
    private readonly diagnosticHost;
    private getErrorMessage;
    checkDiagnostics(diagnostics: ts.Diagnostic[]): void;
    checkDiagnostic(diagnostic: ts.Diagnostic | undefined): void;
}
