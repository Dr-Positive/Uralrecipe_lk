const { response } = require("express");
const { Sequelize } = require("../db");
const ApiError = require("../error/ApiError");
const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, compl, role) => {
  return jwt.sign({ id, compl, role }, process.env.SECRET_KEY, {
    expiresIn: "12h",
  });
};

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
    jwt.verify(token,process.env.SECRET_KEY, async (err,decoded) => {
      if  (err ) {
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

// const veryResetToken = async (token) => {
//   try {
//     // Проверяем токен
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     // Извлекаем login из декодированного токена
//     const { login } = decoded; // Предполагается, что login есть в токене

//     // Ищем пользователя по логину
//     const user = await User.findOne({ where: { login } });

//     if (!user) {
//       return { success: false, message: "Invalid user" }; // Если пользователь не найден
//     }

//     console.log('Decoded token data:', { login, id: decoded.id });
//     return { success: true, user }; // Возвращаем успешный результат и данные пользователя

//   } catch (error) {
//     console.error('Token verification failed:', error);
//     return { success: false, message: "Invalid token" }; // Если токен не валиден
//   }
// };

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



class userController {
  async logining(req, res, next) {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });

    if (!user) {
      return next(ApiError.internal("Пользователь не найден"));
    }
    console.log(`Пароль из запроса: ${password}`);
    console.log(`Хеш пароля из базы данных: ${user.password}`);
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль"));
    }
    const token = generateJwt(user.id, user.compl, user.role);
    return res.json({ token });
  }

  async handleForgotPassword(req, res, next) {
    try {
      const { login, tel } = req.body;
  
      if (!login || !tel) {
        return res.status(400).json({ success: false, message: "Логин и номер телефона обязательны." });
      }
  
      const user = await User.findOne({ where: { login, tel } });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "Пользователь не найден." });
      }
  
      const resetToken = generateResetToken(user.id, user.login, user.role);
  
      await User.update({ resetToken }, { where: { id: user.id } });
  
      const resetLink = `http://localhost:3000/password_reset?resetToken=${resetToken}`;
      console.log("Reset link:", resetLink);
  
      return res.json({ success: true, message: "Ссылка для сброса отправлена." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Ошибка сервера." });
    }
  }



  async getAll(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async chech(req, res, next) {
    const token = generateJwt(req.user.id, req.user.compl, req.user.role);
    return res.json({ token });
  }

  async hashPasswords(req, res, next) {
    try {
      const users = await User.findAll();

      for (let user of users) {
        if (
          !user.password.startsWith("$2b$") &&
          !user.password.startsWith("$2a$")
        ) {
          const hashedPassword = await bcrypt.hash(user.password, 5);
          user.password = hashedPassword;
          await user.save();
        }
      }

      return res.json({ message: "Хеширование паролей завершено" });
    } catch (err) {
      console.error("Ошибка при хешировании паролей:", err);
      return res.status(500).json({ message: "Ошибка при хешировании паролей" });
    }
  }

  async resetPassword(req, res, next) {
    const token = req.body.token;
    if (!token) {
      res.status(400).json("Missing reuired params");
    } else {
      try {
        const isTokenValid = await veryResetToken(token)
        if (!isTokenValid) {
          res.status(400).json("Invalid token");
        } else {
          res.status(400).json("Token is valid");
        }
      } catch (error) {
        res.status(500).json("Internet server error")
      }
    }
  }
  
  async verifyToken(req, res, next) {
    const token = req.body.token;
    if (!token) {
      return res.status(400).json({ message: "Missing required params" });
    }
  
    try {
      const isTokenValid = await veryResetToken(token);
      if (!isTokenValid) {
        return res.status(400).json({ message: "Invalid token" });
      }
  
      return res.status(200).json({ message: "Token is valid", login: isTokenValid });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }


}

module.exports = new userController();