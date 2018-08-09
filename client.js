const { createConnection } = require('net');

const client = createConnection({ port: 5000 });

client.on('connect', () => {
  console.log('connected to server');
  
  client.write('world!\r\n');
});

client.on('data', data => {
  console.log(data.toString());
  client.end();
});

client.on('end', () => {
  console.log('disconnected from server');
});