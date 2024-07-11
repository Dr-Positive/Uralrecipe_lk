const Router = require('express')
const router = new Router
const alertRouter = require('./alertRouter')
const mailingRouter = require('./mailingRouter')
const userRouter = require('./userRouter')

router.use('/alert', alertRouter )
router.use('/mailing', mailingRouter )
router.use('/user', userRouter )



module.exports = router