const Router = require('express')
const router = new Router
const alertRouter = require('./alertRouter')
const informRouter = require('./informRouter')
const userRouter = require('./userRouter')

router.use('/alert', alertRouter )
router.use('/inform', informRouter )
router.use('/user', userRouter )



module.exports = router