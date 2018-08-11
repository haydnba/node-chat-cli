const { createConnection } = require('net');
const { createInterface } = require('readline');

const client = createConnection({ port: 5000 });
const rl = createInterface({
  input: process.stdin,
  // output: process.stdout
});

client.on('connect', () => {
  console.log('connected to server');
});

client.setEncoding('utf8');

client.pipe(process.stdout);



client.on('end', () => {
  console.log('disconnected from server');
});

rl.on('line', line => {
  client.write(`${line}\n`);
  rl.prompt(true);
})