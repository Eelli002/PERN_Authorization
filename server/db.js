const Pool = require('pg').Pool;

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const pool = new Pool({
    user:'postgres',
    password: config.DB_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'jwttutorial'
})

module.exports = pool;