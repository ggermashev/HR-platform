const {Contact} = require('../models/models')
const ApiError = require('../error/ApiError')

class ContactController {
    async get(req, res, next) {
        const contacts = await Contact.findAll()
        return res.json(contacts)
    }

    async getByVacancy(req, res, next) {
        const {vacancyId} =  req.params
        const contacts = await Contact.findAll({where: {vacancyId}})
        return res.json(contacts)
    }

    async getByResume(req, res, next) {
        const {resumeId} =  req.params
        const contacts = await Contact.findAll({where: {resumeId}})
        return res.json(contacts)
    }

    async create(req, res) {
        const {vacancyId, resumeId} =  req.body
        const contact = await Contact.create({vacancyId, resumeId})
        return res.json(contact)
    }
}

module.exports = new ContactController()