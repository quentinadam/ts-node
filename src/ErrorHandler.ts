import * as ts from 'typescript';

export default class ErrorHandler {
  private readonly diagnosticHost: ts.FormatDiagnosticsHost = {
    getNewLine: () => ts.sys.newLine,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getCanonicalFileName: ts.sys.useCaseSensitiveFileNames ? (x) => x : (x) => x.toLowerCase(),
  };

  private getErrorMessage(diagnostics: ts.Diagnostic[]) {
    const count = diagnostics.length;
    return [
      ts.formatDiagnosticsWithColorAndContext(diagnostics, this.diagnosticHost),
      count !== 1 ? `Found ${count} errors.` : 'Found 1 error.',
    ].join(this.diagnosticHost.getNewLine());
  }

  checkDiagnostics(diagnostics: ts.Diagnostic[]) {
    if (diagnostics.length > 0) {
      console.error(this.getErrorMessage(diagnostics));
      process.exit(1);
    }
  }

  checkDiagnostic(diagnostic: ts.Diagnostic | undefined) {
    if (diagnostic !== undefined) {
      console.error(this.getErrorMessage([diagnostic]));
      process.exit(1);
    }
  }
}
