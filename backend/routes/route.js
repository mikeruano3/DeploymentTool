const authroute             = require('./route/authentication.route')
const repomanager           = require('./route/repomgr.route')
const datamgr               = require('./route/datamgr.route')
const getLoggedUser 	    = require('../services/auth.service').verifyToken

module.exports = (app) => {
    app.use('/api/auth', authroute)
    app.use('/api/repo', getLoggedUser, repomanager)
    app.use('/api/data', getLoggedUser, datamgr)
}