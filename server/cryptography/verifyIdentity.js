const crypto = require('crypto');
const fs = require('fs');
const decrypt = require('./decrypt');

// This is the data that we are receiving from the sender
const receivedData = require('./signMessage').packageOfDataToSend;

const hash = crypto.createHash(receivedData.algorithm);

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');

// take the signed data and decrypt it
const decryptedMessage = decrypt.decryptWithPublicKey(publicKey, receivedData.signedAndEncryptedData);

// turn decrypted message into a string
const decryptedMessageHex = decryptedMessage.toString();

// look at the hash of the original data and turn that into a hex value
const hashOfOriginal = hash.update(JSON.stringify(receivedData.originalData));
const hashOfOriginalHex = hash.digest('hex');

// verification
if (hashOfOriginalHex === decryptedMessageHex) {
    console.log('Success! The data has not been tampered with and the sender is valid.')
} else {
    console.log('Uh oh... Someone is trying to manipulate the data or someone else is sending this!  Do not use!');
}