#!/usr/bin/env node

import assert from 'assert/strict';

const [ COMMAND, ...rest ] = process.argv.splice(2);

try {
  assert.strictEqual(
    ['open', 'host'].includes(COMMAND),
    true,
    `
      Valid commands:


      - "host <port?> <max-listeners?>" // Invoke the chat server

      - "open <port?> <host?>" // Open a chat client
    `
  );

  const pathMap = {
    /**
     *
     */
    open: "./client",

    /**
     *
     */
    host: "./server",
  } as const;

  import(pathMap[COMMAND]).then((module) => module.app(...rest));

} catch (err) {
  process.stderr.write(err.message + '\n');
}

