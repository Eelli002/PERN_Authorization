const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_Generator = (user_id) => {
    const payload = { user_id : user_id };
    return jwt.sign(payload, process.env.jwt_secret, {expiresIn: '1hr'});
}

module.exports = JWT_Generator;