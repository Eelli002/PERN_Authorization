const router = require('express').Router();
const { application } = require('express');
const pool = require('../database/db');
const bcrypt = require('bcrypt');
const JWT_Generator = require('../utils/jwtGenerator');
const Valid_Info = require('../middleware/validInfo');
const Valid_Token = require('../middleware/authorization');

// Register New User
router.post(
    '/register',
    Valid_Info,
    async (req, res) => {
        try 
        {
            // Destructure our req object for user name, email, & password.
            const { name, email, password } = req.body;


            // Check if the user exists, else throw error.
            const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
            if (user.rows.length) {
                return res.status(401).json("Email in use");
            }


            // Hash the users password before saving in postgres using Bcrypt
            const salt_round = 10;
            const salt = await bcrypt.genSalt(salt_round); // Generate salt
            const hashed_password = await bcrypt.hash(password, salt); // Salt password & hash.


            // Insert user info into postgres.
            const new_user = 
                await pool.query(
                    "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
                    [name, email, hashed_password]
                );


            // Generate our JWT
            const token = JWT_Generator(new_user.rows[0].user_id);
            return res.json({token});
        } 
        catch (error) 
        {
            console.error(error.message);
            return res.status(500).json("Server Error");
        }
    }
);

// Login User
router.post(
    '/login',
    Valid_Info,
    async(req, res) => {
        try 
        {
            // console.log("\nStarting POST request on login: server/routes/jwtAuth")
            // 1. Destructure req.body
            const { email, password } = req.body;
            // console.log("email: ", email);
            // console.log("password: ", password);


            // 2. If user does not exist, throw error.
            const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
            if (!(user.rows.length)) {
                return res.status(401).json("Email Not In Use");
            }


            // 3. Else check if incoming password is same as DB password
            // console.log("Checking password")
            const hashed_password = user.rows[0].user_password;
            const password_match = await bcrypt.compare(password, hashed_password);
            // console.log("password_matched: ", password_match);
            if (!password_match) {
                return res.status(401).json("Password Is Incorrect");
            }


            // 4. Return the JWT token
            const token = JWT_Generator(user.rows[0].user_id);
            // console.log('generated JWT: ', token, '\n');
            return res.json({token});
        } 
        catch (error) 
        {
            console.error(error.message);
            return res.status(500).json("Server Error");
        }
    }
);

// Check validity of user token
router.get(
    '/is-verify',
    Valid_Token,
    async(req, res) => {
        try {
            // console.log("Verifying Route: server/routes/get/is-verify")
            return res.json(true);
        } 
        catch (error) 
        {
            console.error(error.message);
            return res.status(500).json("Server Error");
        }
    }
);

module.exports = router;