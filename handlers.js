const { enc, dec } = require('./crypto.js')

module.exports = (username, secret, client) => ({

  /**
   * TODO:
   * @returns 
   */
  connection: () => client.write(`@${username}:${secret}`),

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
  input: async line => client.write(await enc(secret, `@${username}: ${line}`)),
  
  /**
   * TODO:
   * @param {*} data 
   * @returns 
   */
  message: async data => {
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