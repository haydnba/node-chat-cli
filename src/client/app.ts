import { createConnection } from 'net';
import { createInterface } from 'readline';
import { clientHandler } from '.';

function app (name: string, secret: string, PORT = 8000): void {
  // Invoke client, interface and handlers
  const [ client, readline, handlers ] = clientHandler(
    createConnection({ port: PORT }),
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
}

export { app };
