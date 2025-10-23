import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { render } from "@react-email/render";
import { ResetCodeEmail } from "../templates/emailTemplateResetEmail.js";
import { ResetCodePassword } from "../templates/emailTemplatePassword.js";
import transporter from "../utils/emailTransporter.js";
import { User } from "../models/models.js";
import * as React from "react";

// ============ Утилиты для токенов ============
const generateToken = (payload, expiresIn = "12h") => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });
};

const generateJwt = (id, login, email, tel, compl, role) => {
  return jwt.sign({id, login, email, tel, compl, role}, process.env.SECRET_KEY, {
    expiresIn: "12h",
  });
};


const verifyToken = async (token) => {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) resolve(false);
      else resolve(decoded);
    });
  });
};

// ============ Общие функции отправки писем ============

// 🔹 Письмо для сброса пароля
async function sendPasswordResetEmail(user, resetToken) {
  const resetLink = `${process.env.CLIENT_URL}/password_reset?resetToken=${resetToken}`;
  const html = await render(
    React.createElement(ResetCodePassword, { code: resetLink })
  );

  await transporter.sendMail({
    from: process.env.MAIL_LOGIN,
    to: user.email || user.login,
    subject: "Сброс пароля — U-RM",
    html,
  });

  console.log(`📩 Письмо для сброса пароля отправлено пользователю ${user.login}`);
  return resetLink;
}

// 🔹 Письмо для подтверждения нового email
async function sendEmailChangeEmail(user, newEmail, confirmToken) {
  const confirmLink = `${process.env.CLIENT_URL}/confirm_email?token=${confirmToken}`;
  const html = await render(
    React.createElement(ResetCodeEmail, { code: confirmLink })
  );

  await transporter.sendMail({
    from: process.env.MAIL_LOGIN,
    to: newEmail,
    subject: "Подтверждение изменения email — U-RM",
    html,
  });

  console.log(`📩 Письмо подтверждения отправлено на ${newEmail}`);
  return confirmLink;
}

// ============ Основной контроллер ============
class AuthController {
  /* ========== 🔐 ВОССТАНОВЛЕНИЕ ПАРОЛЯ ========== */

  // Авторизованный пользователь запрашивает сброс пароля
  async requestResetToken(req, res) {
    try {
      const { login, password } = req.body;

      if (!login || !password)
        return res.status(400).json({ message: "Логин и пароль обязательны." });

      const user = await User.findOne({ where: { login } });
      if (!user) return res.status(404).json({ message: "Пользователь не найден." });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(401).json({ message: "Неверный пароль." });

      if (!user.email)
        return res.status(400).json({ message: "У пользователя не указан email." });

      const resetToken = generateToken({ id: user.id, login: user.login });
      await user.update({ resetToken });

      const resetLink = await sendPasswordResetEmail(user, resetToken);
      return res.json({
        success: true,
        message: "Инструкция по смене пароля отправлена на вашу почту.",
        resetLink,
      });
    } catch (error) {
      console.error("Ошибка при генерации ссылки сброса:", error);
      return res.status(500).json({ message: "Ошибка сервера." });
    }
  }

  // Неавторизованный пользователь запрашивает сброс пароля
  async handleForgotPassword(req, res) {
    try {
      const { login, tel } = req.body;

      if (!login || !tel)
        return res.status(400).json({ message: "Логин и телефон обязательны." });

      const user = await User.findOne({ where: { login, tel } });
      if (!user) return res.status(404).json({ message: "Пользователь не найден." });

      const resetToken = generateToken({ id: user.id, login: user.login });
      await user.update({ resetToken });

      const resetLink = await sendPasswordResetEmail(user, resetToken);
      return res.json({
        success: true,
        message: "Инструкция по сбросу пароля отправлена на вашу почту.",
        resetLink,
      });
    } catch (error) {
      console.error("Ошибка при сбросе пароля:", error);
      return res.status(500).json({ message: "Ошибка сервера." });
    }
  }

  // Проверка токена для сброса пароля
  async verifyToken(req, res) {
    const { token } = req.body;
    if (!token)
      return res.status(400).json({ message: "Токен обязателен." });

    const decoded = await verifyToken(token);
    if (!decoded)
      return res.status(400).json({ message: "Неверный или просроченный токен." });

    const user = await User.findOne({ where: { login: decoded.login } });
    if (!user || user.resetToken !== token)
      return res.status(400).json({ message: "Недействительный токен." });

    return res.json({ success: true, message: "Токен подтверждён", login: decoded.login });
  }

  // Сброс пароля
  async resetPassword(req, res) {
    try {
      const { token, password } = req.body;

      if (!token || !password)
        return res.status(400).json({ message: "Токен и пароль обязательны." });

      const decoded = await verifyToken(token);
      if (!decoded)
        return res.status(400).json({ message: "Недействительный токен." });

      const user = await User.findOne({ where: { login: decoded.login } });
      if (!user || user.resetToken !== token)
        return res.status(400).json({ message: "Токен не соответствует пользователю." });

      const hashedPassword = await bcrypt.hash(password, 5);
      await user.update({ password: hashedPassword, resetToken: null });

      return res.json({ success: true, message: "Пароль успешно обновлён." });
    } catch (error) {
      console.error("Ошибка при сбросе пароля:", error);
      return res.status(500).json({ message: "Ошибка сервера." });
    }
  }

  /* ========== 📧 СМЕНА EMAIL ========== */

  async requestEmailChange(req, res) {
    try {
      const { login, password, newEmail } = req.body;

      if (!login || !password || !newEmail)
        return res.status(400).json({ message: "Логин, пароль и новый email обязательны." });

      const user = await User.findOne({ where: { login } });
      if (!user)
        return res.status(404).json({ message: "Пользователь не найден." });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(401).json({ message: "Неверный пароль." });

      const confirmToken = generateToken({ id: user.id, login, newEmail });
      await user.update({ pendingEmail: newEmail, resetToken: confirmToken });

      const confirmLink = await sendEmailChangeEmail(user, newEmail, confirmToken);
      return res.json({
        success: true,
        message: "Письмо для подтверждения нового email отправлено.",
        confirmLink,
      });
    } catch (error) {
      console.error("Ошибка при смене email:", error);
      return res.status(500).json({ message: "Ошибка сервера." });
    }
  }

  async verifyEmailChange(req, res) {
  try {
    const { token } = req.body;

    if (!token)
      return res.status(400).json({ message: "Токен обязателен." });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user || user.resetToken !== token)
      return res.status(400).json({ message: "Недействительный токен или пользователь." });

    await user.update({
      email: user.pendingEmail,
      pendingEmail: null,
      emailVerified: true,
      resetToken: null,
    });

    // 🟢 Генерируем новый токен с обновлённым email
    const newToken = generateJwt(user);

    return res.json({
      success: true,
      message: "Email успешно подтверждён.",
      token: newToken,
      user, // вернём пользователя
    });
  } catch (error) {
    console.error("Ошибка при подтверждении email:", error);
    return res.status(500).json({ message: "Ошибка сервера." });
  }
}
  async confirmEmailChange(req, res) {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, message: "Токен обязателен." });
    }

    // Расшифровываем токен
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { id, login, newEmail } = decoded;

    if (!id || !newEmail) {
      return res.status(400).json({ success: false, message: "Недействительный токен." });
    }

    // Ищем пользователя
    const user = await User.findOne({ where: { id, login } });
    if (!user) {
      return res.status(404).json({ success: false, message: "Пользователь не найден." });
    }

    // Проверяем совпадение с pendingEmail
    if (user.pendingEmail !== newEmail) {
      return res.status(400).json({ success: false, message: "Email для подтверждения не совпадает." });
    }

    // Обновляем email
    await user.update({
      email: newEmail,
      emailVerified: true,
      pendingEmail: null,
      resetToken: null
    });

    return res.status(200).json({ success: true, message: "Email успешно подтверждён и обновлён." });
  } catch (error) {
    console.error("Ошибка при подтверждении email:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ success: false, message: "Срок действия ссылки истёк." });
    }
    return res.status(500).json({ success: false, message: "Ошибка сервера при подтверждении email." });
  }
}


}

export default new AuthController();
