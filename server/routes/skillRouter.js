const Router = require('express')
const router = new Router()
const SkillController = require('../controllers/skillController')

router.get('/', SkillController.getAll)
router.get('/:skill', SkillController.getSimilar)
router.get('/by_id/:skillId', SkillController.getOne)

module.exports = router