const {VacancySkills} = require('../models/models')
const ApiError = require("../error/ApiError");

class VacancySkillsController {
    async getByVacancy(req, res, next) {
        try {
            const {vacancyId} = req.params
            const vacancySkills = await VacancySkills.findAll({where: {vacancyId}})
            return res.json(vacancySkills)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async create(req, res, next) {
        try {
            const {vacancyId, skillId} = req.body
            const vacancySkill = await VacancySkills.create({vacancyId, skillId})
            return res.json(vacancySkill)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }
}

module.exports = new VacancySkillsController()