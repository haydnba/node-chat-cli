const { createConnection } = require('net');
const { createInterface } = require('readline');
const { encrypt, decrypt } = require('./crypt.js');
const [ x, y, username, secret, port ] = process.argv;
const client = createConnection({ port: port });
const rl = createInterface({ input: process.stdin });

client
  .on('connect', () => {
    console.log('connected to chat §erver');
    client.write(`@${username}:${secret}`);
  })
  .on('data', data => {
    if (data.toString().indexOf('§') == 0) {
      process.stdout.write(`${data}\n`);
    } else {
      try {
        const message = decrypt(secret, data.toString('utf8'));
        process.stdout.write(`${message}\n`);
      }
      catch(e) {
        console.log(e.message);
        process.stdout.write(`${data}\n`);
      }
    }
  })
  .on('end', () => {
    process.stdout.write('§ disconnected from server');
  })

rl.on('line', line => {
  client.write(encrypt(secret, `@${username}: ${line}`));
});