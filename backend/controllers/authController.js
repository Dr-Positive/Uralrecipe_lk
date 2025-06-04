const { response } = require("express");
const { Sequelize } = require("../db");
const ApiError = require("../error/ApiError");
const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



class authController {

  async resetPassword(req, res, next) {


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

  // async forgotPassword(req, res, next) {

  //   const { email } = req.body;

  //   if (!email) {
  //     return res.status(400).json({ message: "Email не обнаружен" });
  //   } else {
  //     try {
  //       const existingUser = await User.findOne(login, tel);

  //       if (!existingUser) {
  //         res.status(401).json("Email adress not avaible")
  //       } else {
  //         const isHandled = await handleForgotPassword(login);
  //         if (isHandled) {
  //           res.starus(200).json("Reset instruction sent")
  //         }
  //       }
  //     } catch (error) {
  //       res.starus(500).json("Internet server error")
  //     }
  //   }
  // }
};

module.exports = new authController();
