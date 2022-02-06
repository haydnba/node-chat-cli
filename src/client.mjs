import { createConnection } from 'net';
import { createInterface } from 'readline';
import EventHandlers from './handlers.mjs';

// Client user args
const [ username, secret, port ] = process.argv.splice(2);

// Invoke client and input interface
const client = createConnection({ port });
const rl = createInterface({ input: process.stdin });

// Initialise handlers
const Handlers = EventHandlers(username, secret, client);

client
  .on('connect', Handlers.connect)
  .on('end', Handlers.disconnect)
  .on('data', Handlers.message);

rl.on('line', Handlers.input);
