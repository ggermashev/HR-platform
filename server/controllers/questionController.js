const {Question} = require('../models/models')
const ApiError = require("../error/ApiError");

class QuestionController {
    async getByVacancy(req, res, next) {
        try {
            const {vacancyId} = req.params
            const questions = await Question.findAll({where: {vacancyId}})
            return res.json(questions)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }
    }
}

module.exports = new QuestionController()