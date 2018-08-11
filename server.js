const { createServer } = require('net');

const server = createServer();

let counter = 0;
const sockets = {};

server.on('connection', socket => {
  socket.id = counter++;
  socket.write('please enter your name: ');

  socket.setEncoding('utf8');

  socket.on('data', data => {
    if (!sockets[socket.id]) {
      socket.name = data.toString().trim();
      socket.write(`welcome ${socket.name}!\n`);
      sockets[socket.id] = socket;
      return;
    }
    Object.entries(sockets).forEach(([key, cs]) => {
      if(socket.id != key) {
        cs.write(`${socket.name}: `);
        cs.write(data);
      }
    });
  });
  
  socket.on('end', data => {
    delete sockets[socket.id];
    Object.entries(sockets).forEach(([key, cs]) => {
      cs.write(`${socket.name}: `);
      cs.write('has disconnected\n');
    });    
    console.log('client disconected');
  });
});

server.on('error', (err) => {
  console.log(err);
});

server.listen(5000, () => console.log('server listening'));

