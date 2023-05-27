const {Message} = require('../models/models')
const ApiError = require("../error/ApiError");

class MessageController {
    async get(req, res, next) {
        try {
            const {contactId} =  req.params
            const messages = await Message.findAll({where: {contactId}})
            return res.json(messages)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async set(req, res, next) {
        try {
            const body =  req.body
            const message = await Message.create(body)
            return res.json(message)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async put(req, res, next) {
        try {
            const {messageId} =  req.params
            const {message} =  req.body
            const msg = await Message.update({message}, {where: {messageId}})
            return res.json(msg)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async destroy(req, res, next) {
        try {
            const {messageId} =  req.params
            const msg = await Message.destroy({where: {messageId}})
            return res.json(msg)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }
}

module.exports = new MessageController()