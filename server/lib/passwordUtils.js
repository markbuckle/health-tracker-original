const crypto = require('crypto');

// password based cryptography from https://datatracker.ietf.org/doc/html/rfc8018#section-5.2
function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    };
}

function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password,salt, 10000, 64, 'sha512').toString('hex');
    // verify that the hash in the database equals the hash from the genPassword function
    return hash === hashVerify;
}

module.exports.validPassword = validPassword; // validate password function
module.exports.genPassword = genPassword; // create password function