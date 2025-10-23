import Router from 'express';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import authController from '../controllers/authController.js';

const router = Router();

// Сброс пароля
router.post("/forgot-password", authController.handleForgotPassword);

// Проверка токена
router.post("/verify-token", authController.verifyToken);

// Смена пароля
router.post("/reset-password", authController.resetPassword);

router.post("/request-reset-password", authController.requestResetToken);
//




export default  router