const {Contact} = require('../models/models')
const ApiError = require('../error/ApiError')

class ContactController {
    async getOne(req, res, next) {
        try {
            const {contactId} = req.params
            const contact = await Contact.findOne({where: {id: contactId}})
            return res.json(contact)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async getByVacancy(req, res, next) {
        try {
            const {vacancyId} =  req.params
            const contacts = await Contact.findAll({where: {vacancyId}})
            return res.json(contacts)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async getByResume(req, res, next) {
        try {
            const {resumeId} =  req.params
            const contacts = await Contact.findAll({where: {resumeId}})
            return res.json(contacts)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async create(req, res, next) {
        try {
            const {vacancyId, resumeId} =  req.body
            const contact = await Contact.create({vacancyId, resumeId})
            return res.json(contact)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async delete(req, res, next) {
        try {
            const {contactId} = req.params
            const contact = Contact.destroy({where: {id: contactId}})
            return res.json(contact)
        } catch {

        }
    }
}

module.exports = new ContactController()