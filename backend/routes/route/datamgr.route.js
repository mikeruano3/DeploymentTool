const Router 		        = require('express-promise-router')
const router 		        = new Router()
const dataCtrl	            = require('../../controllers/datamanagement/rawdata.controller')

module.exports = router

router.post('/:table/findone',               dataCtrl.findOne)
router.post('/:table/findmany/',             dataCtrl.findMany)
router.post('/:table/',                      dataCtrl.insertOne)

router.get('/:table/orderby/:orderby/',      dataCtrl.findAllOrderBy)
router.get('/:table/',                       dataCtrl.findAll)

router.put('/:table/',                       dataCtrl.update)

router.delete('/:table/',                    dataCtrl.deleteRow)

