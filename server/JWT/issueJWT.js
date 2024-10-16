// you can use the code below to sign & verify JWT tokens
// But using the JWT npm library would be easier. See jsonwebtoken.js file

const base64url = require('base64url'); //converter
const crypto = require('crypto');
const signatureFunction = crypto.createSign('RSA-SHA256'); // JWT signature algorithm
const verifyFunction = crypto.createVerify('RSA-SHA256'); // JWT verification algorithm
const fs = require('fs'); // Node.js file system for accessing public key

/** ------ ISSUANCE ------- */

const headerObj = {
    alg: 'RS256',
    typ: 'JWT'
};

const payloadObj = {
    sub: '1234567890',
    name: 'John Doe',
    admin: true,
    iat: 1516239022
};

// convert to Json format
const headerObjString = JSON.stringify(headerObj);
const payloadObjString = JSON.stringify(payloadObj);

// convert to the base64url type
const base64UrlHeader = base64url(headerObjString);
const base64UrlPayload = base64url(payloadObjString);

// sign the base64 data
signatureFunction.write(base64UrlHeader + '.' + base64UrlPayload);
signatureFunction.end();

// load private key
const PRIV_KEY = fs.readFileSync(__dirname + '/priv_key.pem', 'utf8');
// sign data to give us a base64 encoded signature
const signatureBase64 = signatureFunction.sign(PRIV_KEY, 'base64');

const signatureBase64Url = base64url.fromBase64(signatureBase64);

console.log(signatureBase64Url);

// END ISSUANCE

/** ------ VERIFICATION ------- */

const JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA';

const jwtParts = JWT.split('.'); // split the JWT into a 3-part array

// split JWT into parts
const headerInBase64UrlFormat = jwtParts[0];
const payloadInBase64UrlFormat = jwtParts[1];
const signatureInBase64UrlFormat = jwtParts[2];

// append the header and payload
verifyFunction.write(headerInBase64UrlFormat + '.' + payloadInBase64UrlFormat);
verifyFunction.end();

// convert signature to base64
const jwtSignatureBase64 = base64url.toBase64(signatureInBase64UrlFormat);

// get public key
const PUB_KEY = fs.readFileSync(__dirname + '/pub_key.pem', 'utf8');

// decrypt signature with the imported verify function
const signatureIsValid = verifyFunction.verify(PUB_KEY, jwtSignatureBase64, 'base64');

console.log(signatureIsValid);