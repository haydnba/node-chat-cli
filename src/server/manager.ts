import { Socket } from 'net';
import { EventEmitter } from 'stream';

type SocketManager = (bus: EventEmitter) => (socket: Socket) => void;

const socketManager: SocketManager = bus => socket => {
  // Initialisation flag
  let registered = false;

  socket
    .setEncoding('utf8')
    .on('data', dispatch)
    .on('end', discard);

  bus.on('message', broadcast);

  /**
   * Relay the message to all registered sockets barring sender.
   *
   * @param {*} message
   * @param {*} sender
   */
  function broadcast (message: Buffer, sender: Socket): void {
    sender === socket || socket.write(message);
  }

  /**
   * Pass the message on to event bus for broadcast (handle initialisation).
   *
   * @param {*} data
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
  }
}

export { socketManager };
