const Router = require('express')
const router = new Router()
const EducationController = require('../controllers/educationController')

router.get('/', EducationController.getAll)

module.exports = router