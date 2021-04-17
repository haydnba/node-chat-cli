const { enc, dec } = require('./crypto.js')

module.exports = (username, secret, client) => ({

  /**
   * TODO:
   * @returns 
   */
  connection: () => client.write(JSON.stringify({ username, ts: Date.now() })),

  /**
   * TODO:
   * @returns 
   */
  disconnect: () => process.stdout.write('disconnected from server'),
  
  /**
   * TODO:
   * @param {*} line 
   * @returns 
   */
  input: async line => {
    const message = JSON.stringify({
      username, line, ts: Date.now()
    })

    client.write(await enc(secret, message))
  },
  
  /**
   * TODO:
   * @param {*} data 
   * @returns 
   */
  message: async data => {
    if (data.toString().startsWith('§')) {
      return process.stdout.write(`[${data}]\n`)
    }
  
    try {
      const message = await dec(secret, data.toString('utf8'))
      const { username, line, ts } = JSON.parse(message)

      process.stdout.write(
        `[${username} - ${new Date(ts).toLocaleTimeString()}]: ${line}\n`
      )
    } catch (e) {
      process.stdout.write(`${data}\n`)
    }
  }
})