const EventEmitter = require('events')

const bus = new EventEmitter()
bus.setMaxListeners(Infinity)

module.exports = socket => {
  // Flag to allow for setup
  let confirmed = false

  socket
    .setEncoding('utf8')
    .on('data', transmit)
    .on('end', discard)

  bus.on('message', broadcast)

  /**
   * Relay the message to all registered sockets but sender.
   *
   * @param {*} message
   * @param {*} sender
   */
  function broadcast (message, sender) {
    sender === socket || socket.write(message)
  }

  /**
   * Pass the message on to event bus for broadcast (handle initialisation).
   *
   * @param {*} data
   */
  function transmit (data) {
    confirmed && bus.emit('message', data, socket)
    confirmed = true
  }

  /**
   * Deregister the socket and broadcast notification.
   */
  function discard () {
    bus.off('message', broadcast)
    bus.emit('message', 'user disconnected')
  }
}
