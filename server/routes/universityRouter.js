const Router = require('express')
const router = new Router()
const UniversityController = require('../controllers/universityController')

router.get('/:resumeId', UniversityController.getByResume)

module.exports = router