const Router = require('express')
const router = new Router
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/logining',userController.logining)
router.get('/auth',authMiddleware, userController.chech)
router.get('/',userController.getAll)
module.exports = router