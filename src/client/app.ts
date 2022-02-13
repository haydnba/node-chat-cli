import assert from 'assert/strict';
import * as net from 'net';
import * as rl from 'readline';
import { clientHandler } from './handler';

const { env: { USERNAME, SECRET }, stdin } = process;

/**
 * TODO
 * @param PORT
 * @param HOSTNAME
 */
function app (PORT = 8000, HOSTNAME = 'localhost'): void {

  assert.strictEqual(typeof SECRET === 'string', true);
  assert.strictEqual(typeof USERNAME === 'string', true);

  const input = { input: stdin };
  const config = { username: USERNAME, secret: SECRET };
  const connection = { host: HOSTNAME, port: PORT };

  const [ client, readline, handlers ] = clientHandler(
    net.createConnection(connection),
    rl.createInterface(input),
    config
  );

  const { open, close, error, read, write } = handlers;

  client
    .on('connect', open)
    .on('data', read)
    .on('error', error)
    .on('end', close);

  readline.on('line', write);
}

export { app };
