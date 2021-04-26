const { createConnection } = require('net')
const { createInterface } = require('readline')

// Client user args
const [ username, secret, port ] = process.argv.splice(2)

// Invoke client and input interface
const client = createConnection({ port })
const rl = createInterface({ input: process.stdin })

// Initialise client event handlers
const on = require('./handlers.js')(username, secret, client)

client
  .on('connect', on.connection)
  .on('end', on.disconnect)
  .on('data', on.message)

rl.on('line', on.input)
