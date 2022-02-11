import EventEmitter from 'events';
import * as net from 'net';
import { socketManager } from '.';

const { stderr, stdout } = process;

/**
 * TODO
 * @param PORT
 * @param limit
 */
function app (PORT = 8000, limit = Infinity): void {

  const server = net.createServer();
  const bus = new EventEmitter();
  const manager = socketManager(bus);

  bus.setMaxListeners(limit);

  server
    .on('connection', manager)
    .on('error', (err) => stderr.write('error: ' + err.message + '\n'));

  server.listen(PORT, () => stdout.write('listening on port ' + PORT + '\n'));
}

export { app };
