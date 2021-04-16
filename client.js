const { createConnection } = require('net')
const { createInterface } = require('readline')

const [ _x, _y, username, secret, port ] = process.argv

const client = createConnection({ port })
const rl = createInterface({ input: process.stdin })

const handle = require('./handlers.js')(username, secret, client)

client
  .on('connect', handle.connection)
  .on('end', handle.disconnect)
  .on('data', handle.message)

rl.on('line', handle.input)
