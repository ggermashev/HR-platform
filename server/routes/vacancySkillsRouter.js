const Router = require('express')
const router = new Router()
const VacancySkillsController = require('../controllers/vacancySkillsController')

router.get('/:vacancyId', VacancySkillsController.getByVacancy)
router.post('/', VacancySkillsController.create)

module.exports = router