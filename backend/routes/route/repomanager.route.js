const Router 		        = require('express-promise-router')
const router 		        = new Router()
const backCtrl	            = require('../../controllers/repomanagement/backend.controller')
const frontCtrl	            = require('../../controllers/repomanagement/frontend.controller')

module.exports = router

router.post('/pullchangesbackend',          backCtrl.pullChanges)
router.post('/installpackagesbackend',      backCtrl.installPackages)
router.post('/runtestsbackend',             backCtrl.runTests)
router.post('/reloadpm2proj',               backCtrl.reloadPM2Proj)
router.post('/startpm2proj',                backCtrl.startPM2Proj)

router.post('/pullchangesfrontend',         frontCtrl.pullChanges)
router.post('/movedisttoserver',            frontCtrl.moveDistToServerFolder)
router.post('/deleteserverfolder',          frontCtrl.deleteServerFolder)
router.post('/buildprod',                   frontCtrl.buildProd)




