const { createServer } = require('net');

const server = createServer();

let counter = 0;
const sockets = {};

server
  .on('connection', socket => {
    socket.id = counter++;
    socket
      .setEncoding('utf8')
      .on('data', data => {
        if (!sockets[socket.id]) {
          [ socket.name, socket.secret ] = data.toString().split(':');
          socket.time = new Date().getTime();
          sockets[socket.id] = socket;
          socket.write(`§ welcome ${socket.name}/${socket.time}`);
          console.log(`${socket.name}/${socket.time} connected`);
          return;
        }
        Object.entries(sockets).forEach(([key, client]) => {
          if (socket.id != key) client.write(data);
        });
      })
      .on('end', _data => {
        delete sockets[socket.id];
        Object.entries(sockets).forEach(([_key, client]) => {
          client.write(`§ ${socket.name}: has disconnected`);
        });
        console.log(`${socket.name}/${socket.time} disconnected`);
      });
  })
  .on('error', (err) => {
    console.log(err);
  });

server.listen(5000, () => console.log('server listening'));

