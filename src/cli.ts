#!/usr/bin/env node --trace-warnings

import assert from 'assert/strict';
import { app as open } from './client';
import { app as host } from './server';

const help = `
  [Help]

  Valid commands:

  - "host <options>"    // Invoke the chat server
  - "open <options>"    // Open a client connection

  Valid options:

  - "host <port? or connections:port?>"   // Optional, defaults: 8000, Infinity
  - "open <port? or hostname:port?>"      // Optional, defaults: 8000, localhost

  Examples:

  - "host 8080"             // Host chat server on port 8080
  - "host 3:5678"           // Host chat server on port 5678 connections capped at 3
  - "open 8080"             // Open connection on localhost port 8080
  - "open 127.0.0.1:3000"   // Open connection on localhost port 3000
`;

const run = { open, host };

try {
  const [ COMMAND, ...args ] = process.argv.slice(2);

  assert.strictEqual(
    ['open', 'host'].includes(COMMAND),
    true,
    help,
  );

  const options = args
    .flatMap(transformOptions)
    .map(castNumericIfValid)
    .slice(0, 2);

  run[COMMAND](...options);

} catch (err) {
  process.stderr.write(err.message + '\n');
}

/**
 * Casts string input to number; if result is a valid number, returns result
 * else returns original input value
 */
function castNumericIfValid (value: string): string | number {
  const numeric = Number(value);
  return Number.isNaN(numeric) ? value : numeric;
}

/**
 * Value of "a" returns ["a"]
 * Value of "a:b" returns ["b", "a"]
 * Value of "a:b:c:d" returns ["b", "a"]
 */
function transformOptions (value: string): string[] {
  return value.split(':').slice(0, 2).reverse();
}
