const {Like, Contact, WatchedResumes, WatchedVacancies} = require('../models/models')
const ApiError = require('../error/ApiError')

class LikeController {

    async set(req, res, next) {
        try {
            const {vacancyId, resumeId, status, role} =  req.body
            console.log("status:::::", status)
            console.log("role::::", role)
            let like = await Like.findOne({where: {vacancyId, resumeId}})
            let watched = null
            if (role === 'USER') {
                watched = await WatchedVacancies.create({vacancyId, resumeId})
            } else if (role === 'HR') {
                watched = await WatchedResumes.create({vacancyId, resumeId})
            }
            if (!like) {
                like = await Like.create({vacancyId, resumeId, status})
            } else {
                if (like.status === 'like' && status === 'like') {
                    console.log('match')
                    const contact = await Contact.create({vacancyId, resumeId})
                }
                like = Like.destroy({where: {id: like.id}})
            }
            return res.json(like)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

}

module.exports = new LikeController()