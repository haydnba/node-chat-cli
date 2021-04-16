const { enc, dec } = require('./crypto.js')

module.exports = (username, secret, client) => ({
  connect: () => client.write(`@${username}:${secret}`),

  disconnect: () => process.stdout.write('disconnected from server'),
  
  input: async line => client.write(await enc(secret, `@${username}: ${line}`)),
  
  data: async data => {
    if (data.toString().indexOf('§') == 0) {
      return process.stdout.write(`${data}\n`)
    }
  
    try {
      const message = await dec(secret, data.toString('utf8'))
      process.stdout.write(`${message}\n`)
    } catch (e) {
      process.stdout.write(`${data}\n`)
    }
  }
})