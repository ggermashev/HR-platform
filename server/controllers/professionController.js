const {Profession} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProfessionController {
    async getAll(req, res, next) {
        try {
            const professions = await Profession.findAll()
            return res.json(professions)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }
}

module.exports = new ProfessionController()