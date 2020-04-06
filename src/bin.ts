#!/usr/bin/env node

import { resolve } from 'path';
import '.';

if (process.argv.length !== 3) {
  throw new Error('tsc-node command requires exactly one file argument');
}

const fileName = resolve(process.cwd(), process.argv[2]);
process.argv.splice(1, process.argv.length - 1, fileName);
require(fileName);
