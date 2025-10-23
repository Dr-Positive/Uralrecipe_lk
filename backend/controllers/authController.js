import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { render } from "@react-email/render";
import { ResetCodeEmail } from "../templates/emailTemplate.js";
import transporter from "../utils/emailTransporter.js";
import { User } from "../models/models.js";
import * as React from "react";

// ============ Утилиты для токенов ============
const generateResetToken = (id, login, tel) => {
  return jwt.sign({ id, login, tel }, process.env.SECRET_KEY, { expiresIn: "12h" });
};

const veryResetToken = async (token) => {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) resolve(false);
      else resolve(decoded.login || false);
    });
  });
};

// ============ Общая функция отправки письма ============
async function sendResetEmail(user, resetToken) {
  const resetLink = `${process.env.CLIENT_URL}/password_reset?resetToken=${resetToken}`;
  const html = await  render(
    React.createElement(ResetCodeEmail, { code: resetLink })
  );

  await transporter.sendMail({
    from: process.env.MAIL_LOGIN,
    to: user.email || user.login, // login используется, если это email
    subject: "Сброс пароля — U-RM",
    html,
  });

  console.log(`📩 Письмо отправлено пользователю ${user.login} (${user.email})`);
  return resetLink;
}

// ============ Основной контроллер ============
class AuthController {

  // 🔹 Сценарий 1: авторизованный пользователь (через ProfilePage)
  async requestResetToken(req, res) {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        return res.status(400).json({ success: false, message: "Логин и пароль обязательны." });
      }

      const user = await User.findOne({ where: { login } });
      if (!user) {
        return res.status(404).json({ success: false, message: "Пользователь не найден." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: "Неверный пароль." });
      }

      if (!user.email) {
        return res.status(400).json({ success: false, message: "У пользователя не указан email." });
      }

      const resetToken = generateResetToken(user.id, user.login, user.tel);
      await User.update({ resetToken }, { where: { id: user.id } });

      const resetLink = await sendResetEmail(user, resetToken);

      return res.status(200).json({
        success: true,
        message: "Инструкция по сбросу пароля отправлена на вашу почту. В случае отсутствия письма рекомендуем проверить спам.",
        resetLink,
      });
    } catch (error) {
      console.error("Ошибка при генерации ссылки сброса:", error);
      return res.status(500).json({ success: false, message: "Ошибка сервера." });
    }
  }

  // 🔹 Сценарий 2: неавторизованный пользователь (через «Забыли пароль»)
  async handleForgotPassword(req, res) {
    try {
      const { login, tel } = req.body;

      if (!login || !tel) {
        return res.status(400).json({ success: false, message: "Логин и номер телефона обязательны." });
      }

      const user = await User.findOne({ where: { login, tel } });
      if (!user) {
        return res.status(404).json({ success: false, message: "Пользователь не найден." });
      }

      if (!user.email) {
        return res.status(400).json({ success: false, message: "У пользователя не указан email." });
      }

      const resetToken = generateResetToken(user.id, user.login, user.tel);
      await User.update({ resetToken }, { where: { id: user.id } });

      const resetLink = await sendResetEmail(user, resetToken);

      return res.json({
        success: true,
        message: "Инструкция по сбросу пароля отправлена на вашу почту. В случае отсутствия письма рекомендуем проверить спам.",
        resetLink,
      });
    } catch (error) {
      console.error("Ошибка при отправке ссылки сброса:", error);
      return res.status(500).json({ success: false, message: "Ошибка сервера." });
    }
  }

  // 🔹 Проверка токена
  async verifyToken(req, res) {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, message: "Токен обязателен." });
    }

    try {
      const login = await veryResetToken(token);
      if (!login) {
        return res.status(400).json({ success: false, message: "Неверный или просроченный токен." });
      }

      const user = await User.findOne({ where: { login } });
      if (!user || user.resetToken !== token) {
        return res.status(400).json({ success: false, message: "Недействительный токен." });
      }

      return res.status(200).json({ success: true, message: "Токен подтверждён", login });
    } catch (error) {
      console.error("Ошибка при проверке токена:", error);
      return res.status(500).json({ success: false, message: "Ошибка сервера." });
    }
  }

  // 🔹 Сброс пароля
  async resetPassword(req, res) {
    try {
      const { token, password } = req.body;

      if (!token || !password) {
        return res.status(400).json({ success: false, message: "Токен и новый пароль обязательны." });
      }

      const login = await veryResetToken(token);
      if (!login) {
        return res.status(400).json({ success: false, message: "Недействительный токен." });
      }

      const user = await User.findOne({ where: { login } });
      if (!user || user.resetToken !== token) {
        return res.status(400).json({ success: false, message: "Токен не соответствует пользователю." });
      }

      const hashedPassword = await bcrypt.hash(password, 5);
      await User.update({ password: hashedPassword, resetToken: null }, { where: { id: user.id } });

      return res.status(200).json({ success: true, message: "Пароль успешно обновлён." });
    } catch (error) {
      console.error("Ошибка при сбросе пароля:", error);
      return res.status(500).json({ success: false, message: "Ошибка сервера." });
    }
  }
}

export default new AuthController();
