import EventEmitter from 'events';
import * as net from 'net';
import { socketManager } from '.';

function app (PORT = 8000): void {

  const server = net.createServer();
  const bus = new EventEmitter();
  const manager = socketManager(bus);

  bus.setMaxListeners(Infinity);

  server
    .on('connection', manager)
    .on('error', console.error);

  server.listen(PORT, () => console.info('server listening on', PORT));
}

export { app };
