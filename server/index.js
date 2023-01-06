const express = require('express');
const app = express();
const cors = require('cors');

/**** Middleware ****/
app.use(cors());
app.use(express.json());

/**** Routes ****/

// Registration and login routes
app.use('/auth', require('./routes/jwtAuth'));

// Dashboard routes
app.use('/dashboard', require('./routes/dashboard'));



app.listen(3002, () => {
    console.log("Server is running on port 3002!");
})