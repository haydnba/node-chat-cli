import { createConnection } from 'net';
import { createInterface } from 'readline';
import { clientHandler } from './handler.mjs';

// Client user args
const [ name, secret, port ] = process.argv.splice(2);

// Invoke client, interface and handlers
const [ client, readline, handlers ] = clientHandler(
  createConnection({ port }),
  createInterface({ input: process.stdin }),
  { name, secret }
)

// Register client listeners
client
  .on('connect', handlers.connect)
  .on('data', handlers.message)
  .on('end', handlers.disconnect);

// Register interface listeners
readline.on('line', handlers.input);
