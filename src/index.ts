import * as fs from 'fs';
import * as ts from 'typescript';
import OutputFilePathComputer from './OutputFilePathComputer';
import registerExtension from './registerExtension';
import SolutionBuilder from './SolutionBuilder';

const cwd = process.cwd();

const configFilePath = ts.findConfigFile(cwd, ts.sys.fileExists);
if (configFilePath === undefined) {
  throw new Error(
    `Could not find a tsconfig.json file in the current working directory (${cwd}) or in any parent directory`
  );
}

const solutionBuilder = new SolutionBuilder(configFilePath);
solutionBuilder.build();

const outputFilePathComputer = new OutputFilePathComputer(configFilePath);

registerExtension('.ts', (filePath) => {
  const outputFilePath = outputFilePathComputer.getOutputFilePath(filePath);
  return fs.readFileSync(outputFilePath, 'utf8');
});
