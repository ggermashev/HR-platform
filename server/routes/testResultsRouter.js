const Router = require('express')
const router = new Router()
const TestResultController = require('../controllers/testResultController')

router.get('/:vacancyId/:userId', TestResultController.getResult)
router.post('/', TestResultController.addResult)

module.exports = router