const {Education} = require('../models/models')
const ApiError = require('../error/ApiError')

class EducationController {
    async getAll(req, res, next) {
        try {
            const educations = await Education.findAll()
            return res.json(educations)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async getOne(req, res, next) {
        try {
            const {educationId} =  req.params
            const education = await Education.findOne({where: {educationId}})
            return res.json(education)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

}

module.exports = new EducationController()