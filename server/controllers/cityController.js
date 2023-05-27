const {City} = require('../models/models')
const ApiError = require('../error/ApiError')

class CityController {
    async get(req, res, next) {
        try {
            const cities = await City.findAll()
            return res.json(cities)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }
}

module.exports = new CityController()