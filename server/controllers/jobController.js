const {Job} = require('../models/models')
const ApiError = require('../error/ApiError')

class JobController {
    async get(req, res, next) {
        try {
            const {resumeId} =  req.params
            const jobs = await Job.findAll({where: {resumeId}})
            return res.json(jobs)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async set(req, res, next) {
        try {
            const body =  req.body
            const job = await Job.create(body)
            return res.json(job)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

}

module.exports = new JobController()