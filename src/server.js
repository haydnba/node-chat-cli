const { createServer } = require('net')
const socketManager = require('./manager.js')

// Invoke server instance
const server = createServer()

server
  .on('connection', socketManager)
  .on('error', console.error)

server.listen(5000, () => console.log('server listening'))
