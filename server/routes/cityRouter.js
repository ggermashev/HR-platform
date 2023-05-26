const Router = require('express')
const router = new Router()
const CityController = require('../controllers/cityController')

router.get('/', CityController.get)

module.exports = router