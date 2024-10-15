const crypto = require('crypto');
const jwt_secret = crypto.randomBytes(64).toString('hex');
console.log('Your JWT_SECRET is:', jwt_secret);
