const { createCipher, createDecipher } = require('crypto');

module.exports.encrypt = function(secret, message) {
  const cipher = createCipher('aes192', secret);
  let encrypted = cipher.update(message, 'utf8', 'hex');
  return encrypted += cipher.final('hex');
}

module.exports.decrypt = function(secret, message) {
  const decipher = createDecipher('aes192', secret);
  let decrypted = decipher.update(message, 'hex', 'utf8');
  return decrypted += decipher.final('utf8');
}