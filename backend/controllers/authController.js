// const { response } = require("express");
// const { Sequelize } = require("../db");
// const ApiError = require("../error/ApiError");
// const { User } = require("../models/models");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");



// class authController {

//   async resetPassword(req, res, next) {


//     try {
//       const users = await User.findAll();

//       for (let user of users) {
//         if (
//           !user.password.startsWith("$2b$") &&
//           !user.password.startsWith("$2a$")
//         ) {
//           const hashedPassword = await bcrypt.hash(user.password, 5);
//           user.password = hashedPassword;
//           await user.save();
//         }
//       }

//       return res.json({ message: "Хеширование паролей завершено" });
//     } catch (err) {
//       console.error("Ошибка при хешировании паролей:", err);
//       return res.status(500).json({ message: "Ошибка при хешировании паролей" });
//     }
//   }

// };

// module.exports = new authController();
