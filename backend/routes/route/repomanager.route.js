const Router 		        = require('express-promise-router')
const router 		        = new Router()
const repoCtrl	            = require('../../controllers/repomanager.controller')

module.exports = router

router.post('/login',       repoCtrl.login);