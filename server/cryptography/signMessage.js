const crypto = require('crypto');
const hash = crypto.createHash('sha256'); // a trapdoor function 
const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

const myData = {
  firstName: 'Zach',
  lastName: 'Gollwitzer',
  socialSecurityNumber: 'NO NO NO.  Never put personal info in a digitally \
  signed message since this form of cryptography does not hide the data!'
};

// String version of our data that can be hashed
const myDataString = JSON.stringify(myData);

// Sets the value on the hash object: requires string format, so we must convert our object
hash.update(myDataString);

// // Hashed data in Hexidecimal format
const hashedData = hash.digest('hex');

// get access to the private key we created earlier
const senderPrivateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');

// store the signed message in a variable
const signedMessage = encrypt.encryptWithPrivateKey(senderPrivateKey, hashedData);

// with this package, the receiver of this data can tell if the data was tampered with and that you signed it
const packageOfDataToSend = {
    algorithm: 'sha256',
    originalData: myData,
    signedAndEncryptedData: signedMessage
};

module.exports.packageOfDataToSend = packageOfDataToSend;