const { resetPassword, handleForgotPassword, verifyToken } = require("../controllers/userController");


const Router = require('express')
const router = new Router
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/СheckRoleMiddleware')

// Сброс пароля
router.post("/forgot-password", userController.handleForgotPassword);

// Проверка токена
router.post("/verify-token", userController.verifyToken);

// Смена пароля
router.post("/reset-password", userController.resetPassword);


module.exports = router