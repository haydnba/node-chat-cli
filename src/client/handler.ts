import { enc, dec, key } from './utils';
import { ClientHandler, Message } from '@shared/types';

const { exit, stderr, stdout } = process;

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
      stdout.write('initialisation failed');
    }
  }

  /**
   * Output a disconnection message and exit.
   */
  function close (): void {
    stdout.write('disconnected from server');
    exit(1);
  }

  /**
   * Log message to standard error and exit.
   */
  function error (err: Error): void {
    stderr.write('connection error: ' + err.message);
    exit(1);
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
      stdout.write('message sending failed');
    }
  }

  /**
   * Attempt to decrypt the message data - deserialise and print on success.
   */
  function read (data: Buffer): void {
    try {
      const message: string = dec(derivedKey, data.toString('utf8'));
      const { username, line, ts }: Message = JSON.parse(message);

      stdout.write(
        `[${username} - ${new Date(ts).toLocaleTimeString()}]: ${line}\n`
      );
    } catch {
      // log / handle undeciphered message `data`
    }
  }

  return [ client, input, { open, close, error, read, write }];
}

export { clientHandler };
