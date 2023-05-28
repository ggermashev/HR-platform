const {Skill} = require('../models/models')
const ApiError = require("../error/ApiError");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class SkillController {

    async getAll(req, res, next) {
        try {
            const skills = await Skill.findAll({limit: 10})
            return res.json(skills)
        } catch (e) {
            return next(ApiError.badRequest(e))
        }
    }

    async getOne(req, res, next) {
        try {
            const {skillId} = req.params
            const skill = await Skill.findOne({where: {id: skillId}})
            return res.json(skill)
        } catch (e) {
            return next(ApiError.badRequest(e))
        }
    }

    async getSimilar(req, res, next) {
        try {
            const {skill} = req.params
            const skills = await Skill.findAll({
                where: {
                    skill: {[Op.regexp]: `.*${skill}.*`}
                }
            })
            return res.json(skills)
        } catch (e) {
            return next(ApiError.badRequest(e))
        }

    }

}

module.exports = new SkillController()