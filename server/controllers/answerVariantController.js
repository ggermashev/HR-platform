const {AnswerVariant} = require('../models/models')
const ApiError = require('../error/ApiError')

class AnswerVariantController {
    async get(req, res, next) {
        try {
            const {questionId} =  req.params
            const answerVariants = await AnswerVariant.findAll({where: {questionId}})
            return res.json(answerVariants)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }
}

module.exports = new AnswerVariantController()