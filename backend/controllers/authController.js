const { response } = require("express");
const { Sequelize } = require("../db");
const ApiError = require("../error/ApiError");
const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAcessToken = (id, login, tel) => {
  return jwt.sign({ id, login, tel }, process.env.SECRET_KEY, {
    expiresIn: "12h",
  });
};

const generateResetToken = (id, login, tel) => {
  return jwt.sign({ id, login, tel }, process.env.SECRET_KEY, {
    expiresIn: "12h",
  });
};

const veryResetToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        resolve(false);
      } else {
        try {
          resolve(decoded.login);
        } catch (error) {
          resolve(false);
        }
      }
    }
    );
  });
};

const verifyAccessToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "") || "";

  if (!token) {
    return res.status(401).json({ message: "Нет токена" });
  }

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Неверный токен" });
    }

    try {
      const user = await User.findOne({ where: { login: decoded.login } });

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      req.user = user; // можно передать пользователя в следующий middleware
      next();
    } catch (error) {
      return res.status(500).json({ message: "Ошибка при проверке пользователя" });
    }
  });
};



class authController {
    
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

      const resetToken = generateResetToken(user.id, user.login, user.tel);

      await User.update({ resetToken }, { where: { id: user.id } });

      const resetLink = `${process.env.CLIENT_URL}/password_reset?resetToken=${resetToken}`;
      console.log("Reset link:", resetLink);

      // Здесь можно добавить отправку по SMS или email

      return res.json({ success: true, message: "Ссылка для сброса пароля отправлена.",resetLink });
    } catch (error) {
      console.error("Ошибка при отправке ссылки сброса:", error);
      return res.status(500).json({ success: false, message: "Ошибка сервера." });
    }
  }

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
  async verifyToken(req, res, next) {
    const { token } = req.body;
    console.log("Получено тело запроса:", req.body);
  
    if (!token) {
      console.warn("Токен отсутствует в запросе");
      return res.status(400).json({ success: false, message: "Токен обязателен." });
    }
  
    try {
      const login = await veryResetToken(token);
  
      if (!login) {
        console.warn("Токен не прошёл верификацию");
        return res.status(400).json({ success: false, message: "Неверный или просроченный токен." });
      }
  
      const user = await User.findOne({ where: { login } });
  
      if (!user) {
        console.warn("Пользователь по токену не найден");
        return res.status(404).json({ success: false, message: "Пользователь не найден." });
      }
  
      if (user.resetToken !== token) {
        console.warn("Токен не совпадает с сохранённым у пользователя");
        return res.status(400).json({ success: false, message: "Недействительный токен." });
      }
  
      return res.status(200).json({
        success: true,
        message: "Токен подтверждён",
        login,
      });
    } catch (error) {
      console.error("Ошибка при проверке токена:", error);
      return res.status(500).json({ success: false, message: "Ошибка сервера." });
    }
  }

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
  
      const resetToken = generateResetToken(user.id, user.login, user.tel);
      await User.update({ resetToken }, { where: { id: user.id } });
  
      const resetLink = `${process.env.CLIENT_URL}/password_reset?resetToken=${resetToken}`;
      console.log("Reset link:", resetLink);
  
      // По желанию: отправить ссылку на почту/SMS
  
      return res.status(200).json({
        success: true,
        message: "Ссылка для сброса пароля сгенерирована.",
        resetLink, // можно вернуть на frontend
      });
    } catch (error) {
      console.error("Ошибка при генерации ссылки сброса:", error);
      return res.status(500).json({ success: false, message: "Ошибка сервера." });
    }
  }
  


}

module.exports = new authController();