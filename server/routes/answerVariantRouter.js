const Router = require('express')
const router = new Router()
const AnswerVariantController = require('../controllers/answerVariantController')

router.get('/:questionId', AnswerVariantController.get)

module.exports = router