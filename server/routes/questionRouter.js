const Router = require('express')
const router = new Router()
const QuestionController = require('../controllers/questionController')

router.get('/:vacancyId', QuestionController.getByVacancy)

module.exports = router