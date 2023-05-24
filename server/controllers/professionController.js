const {Profession} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProfessionController {
    async getAll(req, res, next) {
        const professions = await Profession.findAll()
        return res.json(professions)
    }
}

module.exports = new ProfessionController()