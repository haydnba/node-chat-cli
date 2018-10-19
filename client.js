const { createConnection } = require('net');
const { createInterface } = require('readline');
const { createCipher, createDecipher } = require('crypto');

console.log(process.argv);

const username = process.argv[2];
const secret = process.argv[3];
const port = process.argv[4];

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
    process.stdout.write('§ disconnected from §');
  })

rl.on('line', line => {
  client.write(encrypt(secret, `@${username}: ${line}`));
});

const encrypt = function(secret, message) {
  const cipher = createCipher('aes192', secret);
  let encrypted = cipher.update(message, 'utf8', 'hex');
  return encrypted += cipher.final('hex');
}

const decrypt = function(secret, message) {
  const decipher = createDecipher('aes192', secret);
  let decrypted = decipher.update(message, 'hex', 'utf8');
  return decrypted += decipher.final('utf8');
}