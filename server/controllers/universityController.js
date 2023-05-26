const {University} = require('../models/models')

class UniversityController {
    async getByResume(req, res) {
        const {resumeId} = req.params
        const universities = await University.findAll({where: {resumeId}})
        return res.json(universities)
    }
}

module.exports = new UniversityController()