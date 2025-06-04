const Router = require('express')
const router = new Router
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/СheckRoleMiddleware')

router.post('/reset-password', checkRole('ADMIN'), userController.resetPassword)
router.post('/forgot-password', userController.handleForgotPassword)
router.post('/verify-token', userController.verifyToken)


module.exports = router