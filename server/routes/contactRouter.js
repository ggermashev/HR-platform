const Router = require('express')
const router = new Router()
const ContactController = require('../controllers/contactController')

router.get('/:contactId', ContactController.get)
router.get('/by_vacancy/:vacancyId', ContactController.getByVacancy)
router.get('/by_resume/:resumeId', ContactController.getByResume)

module.exports = router