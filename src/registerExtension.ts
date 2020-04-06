export default function registerExtension(extension: string, fn: (fileName: string) => string) {
  require.extensions[extension] = (module, fileName) => {
    (<any>module)._compile(fn(fileName), fileName);
  };
}
