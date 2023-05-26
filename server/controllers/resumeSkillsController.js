const {ResumeSkills} = require('../models/models')
const {Skill} = require('../models/models')

class ResumeSkillsController {
    async getByResume(req, res) {
        const {resumeId} =  req.params
        const resumeSkills = await ResumeSkills.findAll({where: {resumeId}})
        return res.json(resumeSkills)
    }

    async create(req, res) {
        const {resumeId, skillId} =  req.body
        const resumeSkill = await ResumeSkills.create({resumeId, skillId})
        return res.json(resumeSkill)
    }
}

module.exports = new ResumeSkillsController()