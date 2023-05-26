const {VacancySkills} = require('../models/models')

class VacancySkillsController {
    async getByVacancy(req, res) {
        const {vacancyId} = req.params
        const vacancySkills = await VacancySkills.findAll({where: {vacancyId}})
        return res.json(vacancySkills)
    }

    async create(req, res) {
        const {vacancyId, skillId} = req.body
        const vacancySkill = await VacancySkills.create({vacancyId, skillId})
        return res.json(vacancySkill)
    }
}

module.exports = new VacancySkillsController()