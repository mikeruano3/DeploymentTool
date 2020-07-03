const expressJwt = require('express-jwt');
require('dotenv').config();

module.exports = jwt;

function jwt() {
    const secret = process.env.TOKEN_SECRET;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/access/login'
        ]
    });
}