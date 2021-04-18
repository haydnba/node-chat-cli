const { createServer } = require('net')
const manager = require('./manager.js')

const server = createServer()

const registry = {
  counter: 0,
  sockets: {}
}

server
  .on('connection', manager(registry))
  .on('error', console.error)

server.listen(5000, () => console.log('server listening'))

