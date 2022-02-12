import assert from 'assert/strict';
import * as net from 'net';
import * as rl from 'readline';
import { clientHandler } from '.';

const { env: { USER_NAME, SECRET }, stdin } = process;

/**
 * TODO
 * @param HOST
 * @param PORT
 */
function app (HOSTNAME = 'localhost', PORT = 8000): void {

  assert.strictEqual(typeof SECRET === 'string', true);
  assert.strictEqual(typeof USER_NAME === 'string', true);

  const input = { input: stdin };
  const config = { username: USER_NAME, secret: SECRET };
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
