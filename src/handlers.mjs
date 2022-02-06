import { enc, dec, key } from './crypto.mjs';

export default (
  username,
  secret,
  client,
  derivedKey = undefined
) => ({
  /**
   * Derive the secret key and ping the server.
   */
   connect: async function () {
    try {
      derivedKey = await key(secret)

      client.write(JSON.stringify({ username, ts: Date.now() }))
    } catch (e) {
      process.stdout.write('initialisation failed')
    }
  },

  /**
   * Output a disconnection message.
   */
  disconnect: function () {
    process.stdout.write('disconnected from server')
  },

  /**
   * Serialise, encrypt and dispatch the client input.
   *
   * @param {*} line
   * @returns
   */
  input: function (line) {
    try {
      const message = JSON.stringify({
        username, line, ts: Date.now()
      })

      client.write(enc(derivedKey, message))
    } catch (e) {
      process.stdout.write('message sending failed')
    }
  },

  /**
   * Attempt to decrypt the message data - deserialise and print on success.
   *
   * @param {*} data
   * @returns
   */
  message: function (data) {
    try {
      const message = dec(derivedKey, data.toString('utf8'))
      const { username, line, ts } = JSON.parse(message)

      process.stdout.write(
        `[${username} - ${new Date(ts).toLocaleTimeString()}]: ${line}\n`
      )
    } catch (e) {
      process.stdout.write(`${data}\n`)
    }
  }
})

// module.exports = (
//     username,
//     secret,
//     client,
//     derivedKey = undefined
//   ) => ({

//   /**
//    * Derive the secret key and ping the server.
//    */
//   connection: async function () {
//     try {
//       derivedKey = await key(secret)

//       client.write(JSON.stringify({ username, ts: Date.now() }))
//     } catch (e) {
//       process.stdout.write('initialisation failed')
//     }
//   },

//   /**
//    * Output a disconnection message.
//    */
//   disconnect: function () {
//     process.stdout.write('disconnected from server')
//   },

//   /**
//    * Serialise, encrypt and dispatch the client input.
//    *
//    * @param {*} line
//    * @returns
//    */
//   input: function (line) {
//     try {
//       const message = JSON.stringify({
//         username, line, ts: Date.now()
//       })

//       client.write(enc(derivedKey, message))
//     } catch (e) {
//       process.stdout.write('message sending failed')
//     }
//   },

//   /**
//    * Attempt to decrypt the message data - deserialise and print on success.
//    *
//    * @param {*} data
//    * @returns
//    */
//   message: function (data) {
//     try {
//       const message = dec(derivedKey, data.toString('utf8'))
//       const { username, line, ts } = JSON.parse(message)

//       process.stdout.write(
//         `[${username} - ${new Date(ts).toLocaleTimeString()}]: ${line}\n`
//       )
//     } catch (e) {
//       process.stdout.write(`${data}\n`)
//     }
//   }
// })
