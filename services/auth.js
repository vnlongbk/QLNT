const crypto = require('crypto')

const algorithm = 'aes-256-ctr',
    key = 'd6F3Efeq';

module.exports = new class {

    sha512(password, salt) {
        const hash = crypto.createHmac('sha512', salt)
        hash.update(password)
        const value = hash.digest('hex')
        return value
    }

    encrypt(text) {
        var cipher = crypto.createCipher(algorithm, key)
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    }

    decrypt(text) {
        var decipher = crypto.createDecipher(algorithm, key)
        var dec = decipher.update(text, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
    }
}