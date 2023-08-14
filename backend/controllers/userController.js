const { Sequelize } = require('../db');
const apiError = require('../error/apiError');
const { User } = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, compl, role) => {
  return jwt.sign(
    {id, compl, role}, 
    process.env.SECRET_KEY, 
    {expiresIn: '24h'}
    
    )
}

class userController {
    async login(req, res, next) {      
      const {login, password} = req.body      
      const user = await User.findOne({where: {login}})
      if (!user) {
        return next(apiError.internal('Пользователь не найден'))
      }     
      if (!user.password) {
        return next(apiError.internal('Неверный пароль'), console.log (password, user.password,passwordMatch) )
      }

      const token = generateJwt(user.id, user.compl,user.role)
      return res.json({token})
    }

    async chech(req, res, next) {
        const token = generateJwt(req.user.id, req.user.compl,req.user.role)
        return res.json({token})

          // const {id} = req.query
          // if (!id) {
          //     return next(apiError.badRequest('не задан id'))
          // }
          // res.json(id)        
    }
    
    async getAll(req, res) {
        try {
          // Создайте экземпляр модели User
          const userModel = await User.findOne();
    
          // Выполните raw query через модель
          const users = await userModel.sequelize.query('SELECT 2*6', {
            type: Sequelize.QueryTypes.SELECT,
          });
    
          res.status(200).json({ data: users });
        } catch (error) {
          // Обработка ошибок
          console.error(error);
          res.status(500).json({ error: 'Произошла ошибка' });
        }
      }
    }
  
module.exports = new userController()