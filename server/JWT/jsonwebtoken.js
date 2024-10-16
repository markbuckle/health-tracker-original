// JWT npm library integration file

const jwt = require('jsonwebtoken'); // install with npm install --save jsonwebtoken
const fs = require('fs');

// grab the public & private keys
const PUB_KEY = fs.readFileSync(__dirname + '/pub_key.pem', 'utf8');
const PRIV_KEY = fs.readFileSync(__dirname + '/priv_key.pem', 'utf8');


const payloadObj = {
    sub: '1234567890',
    name: 'John Doe',
    admin: true,
    iat: 1516239022
};

// the library abstracts the header and creates it on its own
const signedJWT = jwt.sign(payloadObj, PRIV_KEY, { algorithm: 'RS256'});

jwt.verify(signedJWT, PUB_KEY, { algorithms: ['RS256'] }, (err, payload) => {
    console.log(payload);
});