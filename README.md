# @quentinadam/tsc-node

[![npm version](https://img.shields.io/npm/v/@quentinadam/tsc-node.svg?style=flat-square)](https://www.npmjs.com/package/@quentinadam/tsc-node)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)

> TypeScript execution for node.js, that will build the project and run the compiled javascript files.

## Installation

```
# Install locally.
npm install -D @quentinadam/tsc-node

# Install globally.
npm install -g @quentinadam/tsc-node
```

## Usage

```
# Will be equivalent to running `tsc -b` in the current directory to compile the script and running the corresponding .js file with `node`.
tsc-node script.ts
```