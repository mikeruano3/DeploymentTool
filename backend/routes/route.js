const accessroute           = require('./route/access.route')
const getLoggedUser 	    = require('../services/auth.service').verifyToken;

module.exports = (app) => {
    app.use('/access', accessroute)
    app.use('/repo', getLoggedUser, accessroute)
}