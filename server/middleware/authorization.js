const jwt = require('jsonwebtoken');
require('dotenv').config();

// Checks the validity of JWT passed as the token header of our HTTP request
const Valid_Token = async(req, res, next) => {
    try 
    {
        const jwt_token = req.header("token");
        if (!jwt_token) {
            return res.status(403).send("Not Authorized")
        }
        const payload = jwt.verify(jwt_token, process.env.jwt_secret);
        req.user_id = payload.user_id;
        next();
    } 
    catch (error) 
    {
        console.error(error.message);
        return res.status(403).send("Not Authorized");
    }
}

module.exports = Valid_Token;