const router = require('express').Router();
const pool = require('../database/db');
const Valid_Token = require('../middleware/authorization')

router.get(
    '/',
    Valid_Token,
    async(req, res) => {
        try 
        {
            const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user_id])
            res.json(user.rows[0]);
        } 
        catch (error) 
        {
            console.error(error.message);
            return res.status(500).json("Server Error");
        }
    }
)

module.exports = router;