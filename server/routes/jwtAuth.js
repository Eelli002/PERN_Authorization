const router = require('express').Router();
const pool = require('./../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

// Register New User
router.post('/register', async (req, res) => {
    try 
    {
        // Destructure our req object for user name, email, & password.
        const { name, email, password } = req.body;


        // Check if the user exists, else throw error.
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length) {
            return res.status(401).send("User already exists");
        }


        // Hash the users password before saving in postgres using Bcrypt
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound); // Create a salt(string appended to password before hashing)
        const hashedPassword = await bcrypt.hash(password, salt); // Append salt to user password and Hash together


        // Insert user info into postgres.
        const newUser = 
            await pool.query(
                "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
                [name, email, hashedPassword]
            );


        // Generate our JWT
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token})
    } 
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;