const Router = require('express')
const router = new Router()
const ResumeController = require('../controllers/resumeController')

router.get('/', ResumeController.getAll)
router.get('/by_user/:userId', ResumeController.getByUser)
router.get('/:resumeId', ResumeController.getOne)
router.post('/', ResumeController.create)
router.put('/:resumeId', ResumeController.update)
router.delete('/:resumeId', ResumeController.delete)

module.exports = router