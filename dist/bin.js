#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
require(".");
if (process.argv.length !== 3) {
    throw new Error('tsc-node command requires exactly one file argument');
}
const fileName = path_1.resolve(process.cwd(), process.argv[2]);
process.argv.splice(1, process.argv.length - 1, fileName);
require(fileName);
