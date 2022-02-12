#!/usr/bin/env node

import assert from 'assert/strict';

const pathMap = { open: "./client", host: "./server" } as const;

const [ COMMAND, ...rest ] = process.argv.splice(2);

try {
  assert.strictEqual(
    ['open', 'host'].includes(COMMAND),
    true,
    `
      Valid commands:

      - "host <options>" // Invoke the chat server

      - "open <options>" // Open a client connection
    `
  );

  import(pathMap[COMMAND]).then((module) => module.app(...rest));

} catch (err) {
  process.stderr.write(err.message + '\n');
}

