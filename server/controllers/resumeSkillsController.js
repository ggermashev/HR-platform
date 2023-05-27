const {ResumeSkills} = require('../models/models')
const {Skill} = require('../models/models')
const ApiError = require("../error/ApiError");

class ResumeSkillsController {
    async getByResume(req, res, next) {
        try {
            const {resumeId} =  req.params
            const resumeSkills = await ResumeSkills.findAll({where: {resumeId}})
            return res.json(resumeSkills)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async create(req, res, next) {
        try {
            const {resumeId, skillId} =  req.body
            const resumeSkill = await ResumeSkills.create({resumeId, skillId})
            return res.json(resumeSkill)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }
}

module.exports = new ResumeSkillsController()