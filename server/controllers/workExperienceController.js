const {WorkExperience} = require('../models/models')
const ApiError = require("../error/ApiError");

class WorkExperienceController {
    async getAll(req, res, next) {
        try {
            const workExperiences = await WorkExperience.findAll()
            return res.json(workExperiences)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }
}

module.exports = new WorkExperienceController()