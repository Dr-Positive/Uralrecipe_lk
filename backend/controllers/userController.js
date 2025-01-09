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

class userController {
  async logining(req, res, next) {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login} });

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
      return res
        .status(500)
        .json({ message: "Ошибка при хешировании паролей" });
    }
  }
}

module.exports = new userController();
