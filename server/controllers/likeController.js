const {Like} = require('../models/models')
const {Contact} = require('../models/models')
const ApiError = require('../error/ApiError')

class LikeController {

    async set(req, res, next) {
        const {vacancyId, resumeId, status} =  req.body
        let like = Like.findOne({where: {vacancyId, resumeId}})
        if (!like) {
            like = Like.create({vacancyId, resumeId, status})
        } else {
            like = Like.destroy({where: {id: like.id}})
            if (like.status === 'like' && status === 'like') {
                const contact = Contact.create({vacancyId, resumeId})
            }
        }
        return res.json(like)
    }

}

module.exports = new LikeController()