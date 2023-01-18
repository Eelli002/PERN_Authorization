const jwt = require('jsonwebtoken');
require('dotenv').config();

// Checks the validity of JWT passed as the token header of our HTTP request
const Valid_Token = async(req, res, next) => {
    try 
    {
        // console.log("Validating token: server/middleware/authorization:: Valid_Token()")
        const jwt_token = req.header("token");
        // console.log(jwt_token);
        if (jwt_token == undefined) {
            // console.log("There was no valid token found in the request header:: Valid_Token()")
            return res.status(403).json("Not Authorized")
        }
        else {
            // console.log("Token Found")
            const payload = jwt.verify(jwt_token, process.env.jwt_secret);
            // console.log("verification response: ", payload)
            req.user_id = payload.user_id;
        }
        next();
    } 
    catch (error) 
    {
        console.error(error.message);
        return res.status(403).json("Not Authorized");
    }
}

module.exports = Valid_Token;