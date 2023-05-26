const {Question} = require('../models/models')

class QuestionController {
    async getByVacancy(req, res) {
        const {vacancyId} = req.params
        const questions = await Question.findAll({where: {vacancyId}})
        return res.json(questions)
    }
}

module.exports = new QuestionController()