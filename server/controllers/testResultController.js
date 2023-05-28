const {TestResults, Question} = require('../models/models')
const ApiError = require("../error/ApiError");

class TestResultController {
    async getResult(req, res, next) {
        try {
            const {vacancyId, userId} = req.params
            const testResult = await TestResults.findOne({where: {vacancyId, userId}})
            console.log(testResult)
            return res.json(testResult)
        } catch (e) {
            return next(ApiError.badRequest(e))
        }
    }

    async addResult(req, res, next) {
        try {
            const {vacancyId, userId, answers} = req.body
            console.log(answers, userId, vacancyId)
            const questions = await Question.findAll({where:{vacancyId}})
            let points = 0
            for (let a of answers) {
                if (questions.find(q => q.id === a.questionId).answer === (a.variant)) {
                    points += 1
                }
            }
            const testResult = TestResults.create({points, maxPoints: answers.length, userId, vacancyId})
            return res.json(testResult)
        } catch (e) {
            return next(ApiError.badRequest(e))
        }
    }
}

module.exports = new TestResultController()