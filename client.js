const { createConnection } = require('net');
const { createInterface } = require('readline');
const { createCipher, createDecipher } = require('crypto');

const client = createConnection({ port: 5000 });
const rl = createInterface({ input: process.stdin });

client
  .on('connect', () => {
    console.log('connected to server');
  })
  .on('data', data => {
    if (data.toString().indexOf('§') == 0) {
      process.stdout.write(data);
    } else {
      const message = decrypt('password', data.toString('utf8'));
      process.stdout.write(message);
    }
  })
  .on('end', () => {
    console.log('disconnected from server');
  })

rl
  .on('line', line => {
    client.write(encrypt('password', line));
    rl.prompt(true);
  })

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