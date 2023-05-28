const {NewMessage} = require('../models/models')
const ApiError = require("../error/ApiError");

class NewMessageController {

    async get(req, res, next) {
        try{
            const {userId} = req.params
            const newMessages = await NewMessage.findAll({where: {userId}})
            return res.json(newMessages)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }
    }

    async add(req, res, next) {
        try {
            const {contactId, userId} =  req.params
            const newMessage = await NewMessage.create({contactId, userId})
            return res.json(newMessage)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async delete(req, res, next) {
        try {
            const {contactId, userId} =  req.params
            const newMessage = await NewMessage.destroy({where: {contactId, userId}})
            return res.json(newMessage)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }
}

module.exports = new NewMessageController()