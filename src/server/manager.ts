import * as net from 'net';
import { SocketManager } from '@shared/types';

const socketManager: SocketManager = bus => socket => {
  // Initialisation flag.
  let registered = false;

  socket
    .setEncoding('utf8')
    .on('data', dispatch)
    .on('end', discard)
    .on('error', log);

  bus.on('message', broadcast);

  log({ message: 'new connection' });

  /**
   * Log to the process console.
   */
  function log ({ message }: { message: string }): void {
    process.stdout.write('info: ' + message + '\n');
  }

  /**
   * Relay the message to all registered sockets barring sender.
   */
  function broadcast (message: Buffer, sender: net.Socket): void {
    sender === socket || socket.write(message);
  }

  /**
   * Pass the message on to event bus for broadcast (handle initialisation).
   */
  function dispatch (data: Buffer): void {
    registered ? bus.emit('message', data, socket) : registered = true;
  }

  /**
   * Deregister the socket and broadcast notification.
   */
  function discard (): void {
    bus.off('message', broadcast);
    bus.emit('message', 'user disconnected');
    log({ message: 'user disconnected' });
  }
}

export { socketManager };
