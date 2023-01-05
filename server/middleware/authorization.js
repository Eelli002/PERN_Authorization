const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async(req, res, next) => {
    try 
    {
        console.log(req.header);
        const jwt_token = req.header("token");
        if (!jwt_token) {
            return res.status(403).send("Not Authorized")
        }
        const payload = jwt.verify(jwt_token, process.env.jwt_secret);

        return req.user = payload.user;
    } 
    catch (error) 
    {
        console.error(error.message);
        return res.status(403).send("Not Authorized");
    }
}