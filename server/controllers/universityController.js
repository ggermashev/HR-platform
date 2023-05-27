const {University} = require('../models/models')
const ApiError = require("../error/ApiError");

class UniversityController {
    async getByResume(req, res, next) {
        try {
            const {resumeId} = req.params
            const universities = await University.findAll({where: {resumeId}})
            return res.json(universities)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }
}

module.exports = new UniversityController()