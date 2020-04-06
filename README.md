# @quentinadam/tsc-node

[![npm version](https://img.shields.io/npm/v/@quentinadam/tsc-node.svg?style=flat-square)](https://www.npmjs.com/package/@quentinadam/tsc-node)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)

> TypeScript execution for node.js, that will build the project and run the compiled javascript files.

## Installation

Local installation:

```
npm install -D @quentinadam/tsc-node
```

Global installation:
```
npm install -g @quentinadam/tsc-node
```

## Usage

Executing a script with `tsc-node` will be equivalent to running `tsc -b` in the current directory to compile the whole TypeScript project (works with project references) and running the compiled `.js` file with `node`.

```
tsc-node script.ts
```

The handler can also be registered to the node binary.
```
node -r @quentinadam/tsc-node script.ts
```
