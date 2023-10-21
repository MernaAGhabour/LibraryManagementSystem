
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const rateLimit = require('express-rate-limit');
const basicAuth = require('express-basic-auth');


const app = express();

// Define an authenticated user with username and password 
const users = {
    username: 'password',
};

// Configure basic authentication 
app.use(basicAuth({
    users,
    challenge: true, // Sends 401 Unauthorized response when authentication fails
}));


// Create a rate limiter for a specific endpoint
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 20, // Max requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

app.use('/book', limiter); // Apply rate limiting to the /book endpoint
app.use('/borrower', limiter); // Apply rate limiting to the /borrower endpoint

app.use(cors());
app.use(bodyParser.json());
app.use('/', apiRoutes);



app.listen(3000, (req, res) => {
    console.log("App is running on port 3000")
})


module.exports = app;
