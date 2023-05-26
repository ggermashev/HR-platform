const Router = require('express')
const router = new Router()
const ResumeSkillsController = require('../controllers/resumeSkillsController')

router.get('/:resumeId', ResumeSkillsController.getByResume)

module.exports = router