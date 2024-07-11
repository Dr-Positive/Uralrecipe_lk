const { Sequelize } = require('../db');
const ApiError = require('../error/ApiError');
const { User } = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, compl, role) => {
  return jwt.sign(
    {id, compl, role}, 
    process.env.SECRET_KEY, 
    {expiresIn: '12h'}    )
}

class userController {
    async login(req, res, next) {      
      const {login, password} = req.body      
      const user = await User.findOne({where: {login}})
      if (!user) {
        return next(ApiError.internal('Пользователь не найден'))
    }
    let comparePassword = (password, user.password)
    if (!comparePassword) {
        return next(ApiError.internal('Указан неверный пароль'))
    }
    const token = generateJwt(user.id, user.compl, user.role)
    return res.json({token})
}

    async chech(req, res, next) {
        const token = generateJwt(req.user.id, req.user.compl,req.user.role)
        return res.json({token})
  
    }
    
    async getAll(req, res) {
        try {
          // Создайте экземпляр модели User
          const userModel = await User.findOne();
    
          // Выполните raw query через модель
        
    
          res.status(200).json({ data: users });
        } catch (error) {
          // Обработка ошибок
          console.error(error);
          res.status(500).json({ error: 'Произошла ошибка' });
        }
      }
    }
  
module.exports = new userController()