const bcrypt = require('bcrypt');
//const { User } = require('./models/models'); // Импортируйте вашу модель пользователя
const { User } = require('../models/models.js');

const hashPasswords = async () => {
    try {
        const users = await User.findAll();

        for (let user of users) {
            if (!user.password.startsWith('$2b$')) {
                // Хеширование пароля
                const hashedPassword = await bcrypt.hash(user.password, 5);
                user.password = hashedPassword;
                await user.save();
                console.log(`Пароль пользователя ${user.login} захеширован.`);
            }
        }

        console.log('Все пароли успешно захешированы.');
    } catch (err) {
        console.error('Ошибка при хешировании паролей:', err);
    }
};

hashPasswords();
