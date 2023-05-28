const Router = require('express')
const router = new Router()
const NewMessageController = require('../controllers/newMessageController')

router.get('/:userId', NewMessageController.get)
router.post('/:contactId/:userId', NewMessageController.add)
router.delete('/:contactId/:userId', NewMessageController.delete)

module.exports = router