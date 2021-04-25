const EventEmitter = require('events')

const bus = new EventEmitter()
bus.setMaxListeners(0)

module.exports = socket => {

  const handler = (message, sender) => {
    sender === socket || socket.write(message)
  }
  
  bus.on('message', handler)

  socket
    .setEncoding('utf8')
    .on('data', data => bus.emit('message', data, socket))
    .on('end', () => {
      bus.removeListener('message', handler)
      bus.emit('message', 'user disconnected')
    })
}