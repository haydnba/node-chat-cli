const { createServer } = require('net');

const server = createServer();

server.on('connection', client => {
  console.log('client connected');
  
  client.on('end', () => {
    console.log('client disconected');
  })

  client.write('hello\r\n');
  client.pipe(client);
});

server.on('error', (err) => {
  console.log(err);
});

server.listen(5000, () => {
  console.log('server bound');
});

