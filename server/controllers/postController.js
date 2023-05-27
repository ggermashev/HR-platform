const {Post} = require('../models/models')
const ApiError = require("../error/ApiError");

class PostController {
    async getAll(req, res, next) {
        try {
            const posts = await Post.findAll()
            return res.json(posts)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }

    async getByProfession(req, res, next) {
        try {
            const {professionId} = req.params
            const posts = await Post.findAll({where: {professionId}})
            return res.json(posts)
        } catch (e) {
            return next( ApiError.badRequest(e))
        }

    }
}

module.exports = new PostController()