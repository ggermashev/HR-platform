const {Skill} = require('../models/models')

class SkillController {
    async getAll(req, res) {
        const skills = await Skill.findAll()
        return res.json(skills)
    }

    async getOne(req, res) {
        const {skillId} = req.params
        const skill = await Skill.findOne({where: {skillId}})
        return res.json(skill)
    }
}

module.exports = new SkillController()