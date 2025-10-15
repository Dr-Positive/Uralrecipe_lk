const express = require('express');
const nodemailer = require('nodemailer');
const { render } = require('@react-email/render');
// const { ResetCodeEmail } = require('../emails/ResetCodeEmail.js');

const Router = require('express')
const router = new Router
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/СheckRoleMiddleware')


// Сброс пароля
router.post("/forgot-password", authController.handleForgotPassword);

// Проверка токена
router.post("/verify-token", authController.verifyToken);

// Смена пароля
router.post("/reset-password", authController.resetPassword);

router.post("/request-reset-password", authController.requestResetToken);



module.exports = router