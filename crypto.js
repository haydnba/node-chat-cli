
const { createCipheriv, createDecipheriv, scrypt } = require('crypto')

const ALGORITHM = 'aes-192-cbc'

/**
 * Generate a cipher key from secret.
 * 
 * @param {string} secret 
 * @returns {Promise<string>}
 */
const keyGen = secret => new Promise(resolve => {
  scrypt(secret, 'salt', 24, (err, key) => {
    if (err) throw err

    resolve(key)
  })
})

/**
 * Encrypt a message using the AES cipher and a shared secret.
 * 
 * @param {string} secret 
 * @param {string} message 
 * @returns {string}
 */
const enc = async (secret, message) => {
  // generate key and initialization vector
  const key = await keyGen(secret).catch(null)
  const iv = Buffer.alloc(16, 0)

  // Construct the cipher
  const cipher = createCipheriv(ALGORITHM, key, iv)

  // Encrypt and return the message
  let result = cipher.update(message, 'utf8', 'hex')
  result += cipher.final('hex')

  return result
}

/**
 * Decrypt a message using the AES cipher and a shared secret.
 * 
 * @param {string} secret 
 * @param {string} message 
 * @returns {string}
 */
 const dec = async (secret, message) => {
  // generate key and initialization vector
  const key = await keyGen(secret).catch(null)
  const iv = Buffer.alloc(16, 0)

  // Construct the decipherment
  const decipher = createDecipheriv(ALGORITHM, key, iv)

  // Decrypt and return the message
  let result = decipher.update(message, 'hex', 'utf8')
  result += decipher.final('utf8')

  return result
}

module.exports = {
  enc,
  dec
}
