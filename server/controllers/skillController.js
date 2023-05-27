const {Skill} = require('../models/models')
const ApiError = require("../error/ApiError");

class SkillController {
    async getAll(req, res, next) {
        try {
            const skills = await Skill.findAll()
            return res.json(skills)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async getOne(req, res, next) {
        try {
            const {skillId} = req.params
            const skill = await Skill.findOne({where: {skillId}})
            return res.json(skill)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }
}

module.exports = new SkillController()