const {AnswerVariant} = require('../models/models')
const ApiError = require('../error/ApiError')

class AnswerVariantController {
    async getAll(req, res, next) {
        const {resumeId} = await req.query
        const answerVariants = await AnswerVariant.findAll()
        return res.json(answerVariants)
    }


}

module.exports = new AnswerVariantController()