const {Education} = require('../models/models')
const ApiError = require('../error/ApiError')

class EducationController {
    async getAll(req, res, next) {
        const educations = await Education.findAll()
        return res.json(educations)
    }

    async getOne(req, res, next) {
        const {educationId} =  req.params
        const education = await Education.findOne({where: {educationId}})
        return res.json(education)
    }

}

module.exports = new EducationController()