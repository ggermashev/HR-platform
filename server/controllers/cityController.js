const {City} = require('../models/models')
const ApiError = require('../error/ApiError')

class CityController {
    async get(req, res, next) {
        const cities = await City.findAll()
        return res.json(cities)
    }
}

module.exports = new CityController()