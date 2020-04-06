"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function registerExtension(extension, fn) {
    require.extensions[extension] = (module, fileName) => {
        module._compile(fn(fileName), fileName);
    };
}
exports.default = registerExtension;
