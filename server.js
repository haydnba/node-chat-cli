const { createServer } = require('net');

const server = createServer();

let counter = 0;
const sockets = {};

server
  .on('connection', socket => {
    socket.setEncoding('utf8');
    socket.id = counter++;
    
    socket
      .on('data', data => {
        if (!sockets[socket.id]) {
          console.log(data);
          [ socket.name, socket.secret ] = data.toString().split(':');
          socket.time = new Date().getTime();
          socket.write(`§ welcome ${socket.name} (${socket.time})`);
          sockets[socket.id] = socket;
          return;
        }
        Object.entries(sockets).forEach(([key, cs]) => {
          if(socket.id != key) {
            console.log(data);
            cs.write(data);
          }
        });
      })
      .on('end', _data => {
        delete sockets[socket.id];
        Object.entries(sockets).forEach(([_key, cs]) => {
          cs.write(`${socket.name}: has disconnected`);
        });    
        console.log(`${socket.name}/${socket.time} disconnected`);
      });

  })
  .on('error', (err) => {
    console.log(err);
  });

server.listen(5000, () => console.log('server listening'));

