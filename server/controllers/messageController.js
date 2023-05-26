const {Message} = require('../models/models')

class MessageController {
    async get(req, res) {
        const {contactId} =  req.params
        const messages = await Message.findAll({where: {contactId}})
        return res.json(messages)
    }

    async set(req, res) {
        const body =  req.body
        const message = await Message.create(body)
        return res.json(message)
    }

    async put(req, res) {
        const {messageId} =  req.params
        const {message} =  req.body
        const msg = await Message.update({message}, {where: {messageId}})
        return res.json(msg)
    }

    async destroy(req, res) {
        const {messageId} =  req.params
        const msg = await Message.destroy({where: {messageId}})
        return res.json(msg)
    }
}

module.exports = new MessageController()