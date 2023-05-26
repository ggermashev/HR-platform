const {AnswerVariant} = require('../models/models')
const ApiError = require('../error/ApiError')

class AnswerVariantController {
    async get(req, res, next) {
        const {questionId} =  req.params
        const answerVariants = await AnswerVariant.findAll({where: {questionId}})
        return res.json(answerVariants)
    }
}

module.exports = new AnswerVariantController()