const Router = require('express')
const router = new Router()
const ContactController = require('../controllers/contactController')

router.get('/:contactId', ContactController.getOne)
router.get('/by_vacancy/:vacancyId', ContactController.getByVacancy)
router.get('/by_resume/:resumeId', ContactController.getByResume)
router.delete('/:contactId', ContactController.delete)

module.exports = router