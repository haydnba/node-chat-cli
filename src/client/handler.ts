import { enc, dec, key } from './utils';
import { ClientHandler, Message } from './types';

const clientHandler: ClientHandler = (client, input, config) => {
  // Extract the user data.
  const { username, secret } = config;

  // Hold the secret key.
  let derivedKey: Buffer = undefined;

  /**
   * Initialize the secret key and ping the server.
   */
   async function open (): Promise<void> {
    try {
      derivedKey = await key(secret);

      client.write(JSON.stringify({ username, ts: Date.now() }));
    } catch {
      process.stdout.write('initialisation failed');
    }
  }

  /**
   * Output a disconnection message and exit.
   */
  function close (): void {
    process.stdout.write('disconnected from server');
    process.exit(1);
  }

  /**
   * Log message to standard error and exit.
   */
  function error (err: Error): void {
    process.stderr.write('connection error: ' + err.message);
    process.exit(1);
  }

  /**
   * Serialise, encrypt and dispatch the client input.
   */
  function write (line: string): void {
    try {
      const message: Message = {
        username, line, ts: Date.now()
      };

      client.write(enc(derivedKey, JSON.stringify(message)));
    } catch {
      process.stdout.write('message sending failed');
    }
  }

  /**
   * Attempt to decrypt the message data - deserialise and print on success.
   */
  function read (data: Buffer): void {
    try {
      const message: string = dec(derivedKey, data.toString('utf8'));
      const { username, line, ts }: Message = JSON.parse(message);

      process.stdout.write(
        `[${username} - ${new Date(ts).toLocaleTimeString()}]: ${line}\n`
      );
    } catch {
      // log / handle undeciphered message `data`
    }
  }

  return [ client, input, { open, close, error, read, write }];
}

export { clientHandler };
