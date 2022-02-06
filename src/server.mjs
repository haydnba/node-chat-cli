import { createServer } from 'net';
import { socketManager } from './manager.mjs';

// Invoke server instance
const server = createServer();

server
  .on('connection', socketManager)
  .on('error', console.error);

server.listen(8000, () => console.log('server listening'));
