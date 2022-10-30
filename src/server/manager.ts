import * as net from 'net';
import { SocketManager } from '@shared/types';
import { EventEmitter } from 'stream';


/**
 * Log to the process console.
 */
function log ({ message }: { message: string }): void {
  process.stdout.write('info: ' + message + '\n');
}

/**
 * Relay the message to all registered sockets barring sender.
 */
function broadcast ({
  socket,
  message,
  sender,
} : {
  socket: net.Socket,
  message: Buffer,
  sender: net.Socket,
}): void {
  sender === socket || socket.write(message);
}

/**
 * Pass the message on to event bus for broadcast (handle initialisation).
 */
function dispatch ({
  bus,
  data,
  socket,
} :{
  bus: EventEmitter,
  data: Buffer,
  socket: net.Socket,
}): void {
  bus.emit('message', data, socket);
}


const socketManager: SocketManager = bus => socket => {
  const [ max, current ] = [
    bus.getMaxListeners(),
    bus.listenerCount('message')
  ];

  // If max listeners are already registered on the bus, kill socket.
  if (max === current) return socket.destroy();

  // Initialisation flag.
  let registered = false;

  const handleMessageEvent = (message: Buffer, sender: net.Socket) => (
    broadcast({
      socket,
      message,
      sender,
    })
  );

  const handleSocketData = (data: Buffer) => (
    registered ? dispatch({
      bus,
      data,
      socket,
    }) : registered = true
  )

  const handleSocketEnd = () => {
    bus.off('message', handleMessageEvent);
    bus.emit('message', 'user disconnect');
    log({ message: 'user disconnect' });
  }

  socket
    .setEncoding('utf8')
    .on('data', handleSocketData)
    .on('end', handleSocketEnd)
    .on('error', log);

  bus.on('message', handleMessageEvent);

  log({ message: 'new connection' });

}

export { socketManager };
