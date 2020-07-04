const Router 		        = require('express-promise-router')
const router 		        = new Router()
const accessCtrl	        = require('../../controllers/accessmanagement/access.controller')

module.exports = router

router.post('/login',       accessCtrl.login);