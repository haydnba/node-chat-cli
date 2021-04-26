
const { createCipheriv, createDecipheriv, scrypt } = require('crypto')

const ALGORITHM = 'aes-192-cbc'

/**
 * Generate cipher key from secret.
 *
 * @param {string} secret
 * @returns {Promise<string>}
 */
const key = async secret => new Promise(resolve => {
  scrypt(secret, 'salt', 24, (err, key) => {
    if (err) throw err

    resolve(key)
  })
})

/**
 * Encrypt a message using the AES cipher and a shared secret.
 *
 * @param {string} key
 * @param {string} message
 * @returns {string}
 */
const enc = (key, message) => {
  // Construct the cipher
  const cipher = createCipheriv(ALGORITHM, key, Buffer.alloc(16, 0))

  // Encrypt and return the message
  let result = cipher.update(message, 'utf8', 'hex')
  result += cipher.final('hex')

  return result
}

/**
 * Decrypt a message using the AES cipher and a shared secret.
 *
 * @param {string} key
 * @param {string} message
 * @returns {string}
 */
 const dec = (key, message) => {
  // Construct the decipher
  const decipher = createDecipheriv(ALGORITHM, key, Buffer.alloc(16, 0))

  // Decrypt and return the message
  let result = decipher.update(message, 'hex', 'utf8')
  result += decipher.final('utf8')

  return result
}

module.exports = { enc, dec, key }
