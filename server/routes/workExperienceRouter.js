const Router = require('express')
const router = new Router()
const WorkExperienceController = require('../controllers/workExperienceController')

router.get('/', WorkExperienceController.getAll)

module.exports = router