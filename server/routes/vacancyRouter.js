const Router = require('express')
const router = new Router()
const VacancyController = require('../controllers/vacancyController')

router.get('/', VacancyController.getAll)
router.get('/:vacancyId', VacancyController.getOne)
router.get('/by_user/:userId', VacancyController.getByUser)
router.get('/for_likes/:resumeId', VacancyController.getForLikes)
router.post('/', VacancyController.create)
router.put('/:vacancyId', VacancyController.update)
router.delete('/:vacancyId', VacancyController.delete)

module.exports = router