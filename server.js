const { createServer } = require('net')
const socketManager = require('./manager.js')
const server = createServer()

let counter = 0
const sockets = {}

server
  .on('connection', socketManager(counter, sockets))
  .on('error', console.error)

server.listen(5000, () => console.log('server listening'))

