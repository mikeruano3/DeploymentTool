const expressJwt = require('express-jwt');
require('dotenv').config();

module.exports = jwt;

function jwt() {
    const secret = process.env.TOKEN_SECRET;
    return expressJwt({ secret: secret, algorithms: [process.env.ALGORITHMS] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/auth/signin'
        ]
    });
}