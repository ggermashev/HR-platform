const Router = require('express')
const router = new Router()
const JobController = require('../controllers/jobController')

router.get('/:resumeId', JobController.get)

module.exports = router