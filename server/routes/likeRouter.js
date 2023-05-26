const Router = require('express')
const router = new Router()
const LikeController = require('../controllers/likeController')

router.post('/', LikeController.set)

module.exports = router