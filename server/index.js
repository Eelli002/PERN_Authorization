const express = require('express');
const app = express();
const cors = require('cors');

/**** Middleware ****/
app.use(cors());
app.use(express.json());

/**** Routes ****/
app.use('/auth', require('./routes/jwtAuth'));



app.listen(3002, () => {
    console.log("Server is running on port 3002!");
})