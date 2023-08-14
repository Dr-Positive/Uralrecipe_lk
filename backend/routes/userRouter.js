const Router = require('express')
const router = new Router
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/login',userController.login)
router.get('/auth',authMiddleware, userController.chech)
router.get('/1337', userController.getAll)
module.exports = router