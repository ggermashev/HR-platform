const Router = require('express')
const router = new Router()
const professionController = require('../controllers/professionController')

router.get('/', professionController.getAll)

module.exports = router