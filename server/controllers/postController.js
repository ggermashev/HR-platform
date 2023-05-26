const {Post} = require('../models/models')

class PostController {
    async getAll(req, res) {
        const posts = await Post.findAll()
        return res.json(posts)
    }

    async getByProfession(req, res) {
        const {professionId} = req.params
        const posts = await Post.findAll({where: {professionId}})
        return res.json(posts)
    }
}

module.exports = new PostController()