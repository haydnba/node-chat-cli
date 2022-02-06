import EventEmitter from 'events';

const bus = new EventEmitter();
bus.setMaxListeners(Infinity);

const socketManager = socket => {
  // Initialisation flag
  let registered = false;

  socket
    .setEncoding('utf8')
    .on('data', dispatch)
    .on('end', discard);

  bus.on('message', broadcast);

  /**
   * Relay the message to all registered sockets but sender.
   *
   * @param {*} message
   * @param {*} sender
   */
  function broadcast (message, sender) {
    sender === socket || socket.write(message);
  }

  /**
   * Pass the message on to event bus for broadcast (handle initialisation).
   *
   * @param {*} data
   */
  function dispatch (data) {
    registered && bus.emit('message', data, socket);
    registered = true;
  }

  /**
   * Deregister the socket and broadcast notification.
   */
  function discard () {
    bus.off('message', broadcast);
    bus.emit('message', 'user disconnected');
  }
}

export { socketManager };
