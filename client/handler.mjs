import { enc, dec, key } from './utils.mjs';

const clientHandler = (client, readline, user) => {
  // Extract the user data.
  const { name: username, secret } = user;

  // Hold the secret key.
  let derivedKey = undefined;

  /**
   * Derive the secret key and ping the server.
   */
   async function connect () {
    try {
      derivedKey = await key(secret);

      client.write(JSON.stringify({ username, ts: Date.now() }));
    } catch (e) {
      process.stdout.write('initialisation failed');
    }
  }

  /**
   * Output a disconnection message.
   */
  function disconnect () {
    process.stdout.write('disconnected from server');
  }

  /**
   * Serialise, encrypt and dispatch the client input.
   *
   * @param {*} line
   * @returns
   */
  function input (line) {
    try {
      const message = JSON.stringify({
        username, line, ts: Date.now()
      });

      client.write(enc(derivedKey, message));
    } catch (e) {
      process.stdout.write('message sending failed');
    }
  }

  /**
   * Attempt to decrypt the message data - deserialise and print on success.
   *
   * @param {*} data
   * @returns
   */
  function message (data) {
    try {
      const message = dec(derivedKey, data.toString('utf8'));
      const { username, line, ts } = JSON.parse(message);

      process.stdout.write(
        `[${username} - ${new Date(ts).toLocaleTimeString()}]: ${line}\n`
      );
    } catch (e) {
      process.stdout.write(`${data}\n`);
    }
  }

  return [ client, readline, { connect, disconnect, input, message }];
}

export { clientHandler };
