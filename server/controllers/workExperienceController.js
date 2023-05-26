const {WorkExperience} = require('../models/models')

class WorkExperienceController {
    async getAll(req, res) {
        const workExperiences = await WorkExperience.findAll()
        return res.json(workExperiences)
    }
}

module.exports = new WorkExperienceController()