import * as ts from 'typescript';
import ErrorHandler from './ErrorHandler';

export default class SolutionBuilder {
  private readonly diagnostics: ts.Diagnostic[] = [];
  private readonly solutionBuilder: ts.SolutionBuilder<ts.EmitAndSemanticDiagnosticsBuilderProgram>;
  private readonly errorHandler = new ErrorHandler();

  constructor(configFilePath: string) {
    const host = ts.createSolutionBuilderHost(
      undefined,
      undefined,
      (diagnostic) => this.diagnostics.push(diagnostic),
      (diagnostic) => this.diagnostics.push(diagnostic)
    );
    this.solutionBuilder = ts.createSolutionBuilder(host, [configFilePath], {});
  }

  build() {
    this.solutionBuilder.build();
    this.errorHandler.checkDiagnostics(this.diagnostics);
  }
}
