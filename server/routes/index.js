const Router = require('express')
const router = new Router()
const professionRouter = require('./professionRouter')
const userRouter = require('./userRouter')

router.use('/professions', professionRouter)
router.use('/user', userRouter)

module.exports = router
