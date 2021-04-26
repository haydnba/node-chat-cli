const { createConnection } = require('net')
const { createInterface } = require('readline')
const eventHandlers = require('./handlers.js')

// Client user args
const [ username, secret, port ] = process.argv.splice(2)

// Invoke client and input interface
const client = createConnection({ port })
const rl = createInterface({ input: process.stdin })

// Initialise handlers
const {
  connection,
  disconnect,
  input,
  message
} = eventHandlers(username, secret, client)

client
  .on('connect', connection)
  .on('end', disconnect)
  .on('data', message)

rl.on('line', input)
