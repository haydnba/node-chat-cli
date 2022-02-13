import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
import { Cipherer, KeyGen } from '@shared/types';

const ALGORITHM = 'aes-192-cbc';
const SALT = Buffer.alloc(16, 0);

/**
 * Generate cipher key from secret.
 */
const key: KeyGen = async (secret) => new Promise(resolve => {
  scrypt(secret, SALT, 24, (err, key) => {
    if (err) throw err;

    resolve(key);
  });
});

/**
 * Encrypt a message using the AES cipher and a shared secret.
 */
const enc: Cipherer = (key, message) => {
  // Construct the cipher
  const cipher = createCipheriv(ALGORITHM, key, Buffer.alloc(16, 0));

  // Encrypt and return the message
  let result = cipher.update(message, 'utf8', 'hex');
  result += cipher.final('hex');

  return result;
};

/**
 * Decrypt a message using the AES cipher and a shared secret.
 */
const dec: Cipherer = (key, message) => {
  // Construct the decipher
  const decipher = createDecipheriv(ALGORITHM, key, Buffer.alloc(16, 0));

  // Decrypt and return the message
  let result = decipher.update(message, 'hex', 'utf8');
  result += decipher.final('utf8');

  return result;
};

export { enc, dec, key };
