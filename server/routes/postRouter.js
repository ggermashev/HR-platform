const Router = require('express')
const router = new Router()
const PostController = require('../controllers/postController')

router.get('/', PostController.getAll)
router.get('/:professionId', PostController.getByProfession)

module.exports = router