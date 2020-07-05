const Router 		        = require('express-promise-router')
const router 		        = new Router()
const authCtrl	            = require('../../controllers/auth/auth.controller')

module.exports = router

router.post('/signin',       authCtrl.signin);