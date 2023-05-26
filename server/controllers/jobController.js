const {Job} = require('../models/models')
const ApiError = require('../error/ApiError')

class JobController {
    async get(req, res, next) {
        const {resumeId} =  req.params
        const jobs = await Job.findAll({where: {resumeId}})
        return res.json(jobs)
    }

    async set(req, res, next) {
        const body =  req.body
        const job = await Job.create(body)
        return res.json(job)
    }

}

module.exports = new JobController()