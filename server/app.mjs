import EventEmitter from 'events';
import { createServer } from 'net';
import { socketManager } from './manager.mjs';

const bus = new EventEmitter();
bus.setMaxListeners(Infinity);

const server = createServer();
const manager = socketManager(bus);

server
  .on('connection', manager)
  .on('error', console.error);

server.listen(8000, () => console.log('server listening'));
