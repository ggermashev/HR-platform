const Router = require('express')
const router = new Router()
const MessageController = require('../controllers/messageController')

router.get('/:contactId', MessageController.get)
router.post('/', MessageController.set)
router.delete('/:messageId', MessageController.put)
router.put('/:messageId', MessageController.destroy)

module.exports = router